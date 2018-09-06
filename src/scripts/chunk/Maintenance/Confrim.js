/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import MaintenanceReplyCard from '../../components/Common/MaintenanceReplyCard';
import MaintenanceConfirmDevice from '../../components/Common/MaintenanceConfirmDevice';
import MoneyShowItem from '../../components/Common/MoneyShowItem';
import { MemoDialog, EvaluateDialog, AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import UploadFile from '../../components/Common/UploadFile';
import request from '../../utils/EpsRequest';
import LoadMore from './../../components/Common/LoadMore';
import { openChart, orderStatus } from '../../constants';

class Confrim extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	changeData(targetIndex, data) {
		let dispatch = this.props.dispatch;
		let dataList = _.clone(this.props.maintenance["list"]);
		_.each(dataList, function (i, index) {
			if (targetIndex == index) {
				_.extend(i, data)
			}
		})
		dispatch({
			type: 'maintenance/changeData',
			data: {
				list: dataList
			}
		})
	}
	openFileView(data) {
		var url = EpsWebRoot + '/#' + data;
		let datas = this.props.maintenance;
		window.upTabsData('file', 'cache', datas);
		jw.pushWebView(url);
	}
	render() {
		let self = this;
		let data = this.props.maintenance;
		console.log('rrr2', data);
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length - 1];
		let fileUrl = '/file/' + orderid;
		if (window.isUnfinishedOrHistory()) {
			fileUrl = '/filehistory/' + orderid
		}
		let isConfirm = /confirm/.test(location.href);
		console.log('ccc', isConfirm)
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header specail">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c ">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c maintenance-confrim">
							<div className="main-w">
								<MaintenanceReplyCard data={data}></MaintenanceReplyCard>
								{
									data["list"] && data["list"].length != 0 ? <MaintenanceConfirmDevice isConfirm={isConfirm} modelType={self.props.maintenance["model_type"]} changeData={(index, data) => self.changeData(index, data)} openView={(e) => self.openMoreView(e)} index={0} data={_.extend({}, { showMoreBtn: true }, data["list"][0])}></MaintenanceConfirmDevice> : ''
								}
							</div>
							<UploadFile className="hahahah" fix={false} fileData={data["files"]} addPic={(e) => this.addPic(e)} removePic={(e) => this.removePic(e)} changePic={(index, id) => this.changePic(index, id)}></UploadFile>
						</div>
					</sesstion>
					<MoneyShowItem data={{
						label: '订单总价',
						money: data["orderMoney"]
					}} showText={true} styleClass={'specail-fix'}></MoneyShowItem>
					<div className="file-num-specail border-line-h before" onClick={(e) => this.openFileView(fileUrl)}>
						<i className="icon-file"></i>
						<span className="preview-file">查看附件{data['fileCount'] && data['fileCount'] != 0 ? ('(' + data['fileCount'] + ')') : ''}</span>
					</div>
					<LoadMore data={data['loading']} />
					<footer className="footer">
						<div className="log-btn" onClick={(e) => this.openView('/log')}>
							<i className="icon-log"></i>
							<span>流程日志</span>
						</div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>
							<i className="icon-reply-check"></i>
							<span>完成服务</span>
						</div>
					</footer>
				</div>
			</div>
		);
	}
	// 组件加载完毕
	componentDidMount() {
		let self = this;
		let modelData = this.props.maintenance;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
		dispatch({ type: 'maintenance/fetch', payload: orderid, dispatch: dispatch });
		this.setHeight();
		PubSub.subscribe('editmaintenancereplyDevice', function (evt, data) {
			console.log(data['list'], '这个里面有什么呢');
			dispatch({
				type: 'maintenance/changeData',
				payload: {
					list: data['list']
				}
			})
		});
		if (JWReady == true) {
			jw.setFuncBtns([{ type: 4 }]);
		} else {
			window.EpsEvents.off('jwready:ok').on('jwready:ok', () => {
				jw.setFuncBtns([{ type: 4 }]);
			})
		}
		window.onJwNavBtnClick = function (data) {
			if (data['type'] == '4') {
				let modelData = self.props.maintenance;
				openChart(modelData['creaeBy'], modelData['orderNumber'], '测试')
			}
		}
	}
	setHeight() {
		let self = this;
		setTimeout(function () {
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			let money = $('.money-show-item').height() || 0;
			let upload = $('.upload-file').height() || 0;
			let footer = $('.footer').height() || 0;
			let file = $('.file-num-specail').height() || 0;
			$('.main-c').css({ height: clientHeight - header - money - footer - file + 'px' });
			$('.main-w').css({ minHeight: clientHeight - header - upload - money - footer - file + 'px' })
		}, 0)
	}
	openMoreView(data) {
		let datas = this.props.maintenance;
		// let datas = this.props.processdevice;
		let time = datas['updateDate'].split('.')[0];
		let updateDate = encodeURIComponent(time);
		var url = EpsWebRoot + '/#/maintenance/' + datas["model_type"] + '/device-list/' + this.props.params['orderid'] + '?updateDate=' + updateDate
		window.upTabsData('MaintenanceDeviceList', 'cache', {
			list: datas["list"],
			isConfirm: /confirm/.test(location.href)
		});
		jw.pushWebView(url);
	}
	openView(data) {
		let datas = this.props.maintenance;
		var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"]
		datas['logType'] = 'maintenanceAfter';
		window.upTabsData('log', 'cache', datas);
		jw.pushWebView(url);
	}
	addPic(datas) {
		let dispatch = this.props.dispatch;
		let data = this.props.maintenance;
		let files = data['files'];
		files = files.concat(datas);
		dispatch({
			type: 'maintenance/changeData',
			payload: {
				files: files
			}
		})
	}
	removePic(resid) {
		let dispatch = this.props.dispatch;
		let data = this.props.maintenance;
		let files = data['files'];
		let nowData = []
		_.each(files, function (i, index) {
			if (resid != i['resid']) {
				nowData.push(i)
			}
		})
		files = nowData;
		dispatch({
			type: 'maintenance/changeData',
			payload: {
				files: files
			}
		})
	}
	changePic(resid, id) {
		let dispatch = this.props.dispatch;
		let data = this.props.maintenance;
		let files = data['files'];
		let nowData = []
		_.each(files, function (i, index) {
			if (resid == i['resid']) {
				i['serverId'] = id
				i['url'] = window.jwurl + '/file/download?code=' + window.code + '&file_id=' + id;
			}
			nowData.push(i);
		})
		files = nowData;
		dispatch({
			type: 'maintenance/changeData',
			payload: {
				files: files
			}
		})
	}
	agree() {
		let self = this;
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.maintenance;
		let newList = [];
		for (var i = 0; i < modelData['list'].length; i++) {
			newList.push({
				id: modelData['list'][i]['id'],
				aboveMaintenanceTime: moment(modelData['list'][i]['aboveMaintenanceTime']).format("YYYY-MM-DD"),
			})
		}
		let epsDialog = MemoDialog({
			title: '整单备注?',
			btnIconClass: 'icon-check',
			btnVal: '确认',
			placeholder: '请输入备注...',
			changeData: function () { },
			memorequired: false,
			onBtnClick: (memo, callback) => {
				let datas = {
					param: {
						eid: window.eid,
						record: {
							orderNumber: orderid,
							updateDate: modelData["updateDate"],
							orderState: modelData["orderState"],
							operateMarks: memo || '',
							listStr: JSON.stringify(newList),
							file: modelData['files']
						}
					}
				}
				console.log(JSON.stringify(datas), 'filefilefilefile')
				self.upData(datas, callback);
			}
		});
	}
	upData(data, callback) {
		let url = '/McdEpsApi/joywok/maintenance/confirmOrderInfo';
		let modelData = this.props.maintenance;
		request(url, {
			method: 'POST',
			body: JSON.stringify(data)
		}).then(function (resp) {
			if (resp['data']['success'] == false) {
				if (typeof (callback) != 'undefined') {
					callback(true);
				}
			} else {
				AlertBase({
					tip: '已成功提交',
					icon: 'icon-save-success',
					onOk: () => {
						jw.closeWebView();
					}
				});
			}
		})
	}
}
export default connect(function (state) {
	return state
})(Confrim);