/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import request from './../../utils/EpsRequest';
import MaintenanceReplyCard from '../../components/Common/MaintenanceReplyCard';
import MaintenanceReplyDeviceDetail from '../../components/Common/MaintenanceReplyDeviceDetail';
import MoneyShowItem from '../../components/Common/MoneyShowItem';
import { MemoDialog, EvaluateDialog, AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import { openChart, orderStatus } from '../../constants';
import LoadMore from './../../components/Common/LoadMore';
import EpsDialog from '../../components/Common/EpsDialog';

class Reply extends Component {
	changeData(targetIndex, data) {
		let dispatch = this.props.dispatch;
		let dataList = _.clone(this.props.maintenance["list"]);
		// console.log('111', dataList, targetIndex, data);
		_.each(dataList, function (i, index) {
			console.log(targetIndex, index, '这俩index是啥呢');
			if (targetIndex == index) {
				_.extend(i, data)
			}
		})
		// console.log('222', dataList);

		dispatch({
			type: 'maintenance/changeData',
			data: {
				list: dataList
			}
		})
		// dispatch({
		// 	type: 'maintenance/changeData',
		// 	payload: data
		// })
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
		let money = 0;
		console.log('111rr', data);
		data["list"] && _.each(data["list"], function (i) {
			money += Number(i['accessoriesCost'])
		})
		let sumData = 0;
		if (data["list"] && data["list"].length) {
			let dataList = data["list"][0];
			let labourCostNotax = dataList['labourCostNotax'];
			let accessoriesCostNotax = dataList['accessoriesCostNotax'];
			let labourTaxNew = dataList['labourTaxNew'];
			let accessoriesTaxNew = dataList['accessoriesTaxNew'];
			sumData = (labourTaxNew ? (labourCostNotax || 0) : 0) + (accessoriesTaxNew ? (accessoriesCostNotax || 0) : 0) + (labourTaxNew ? parseInt(labourTaxNew) * labourCostNotax / 100 : 0) + (accessoriesTaxNew ? parseInt(accessoriesTaxNew) * accessoriesCostNotax / 100 : 0);
			//  console.log('1',(labourTaxNew ? (labourCostNotax || 0) : 0),'accessoriesCostNotax',)
		}
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length - 1];
		let fileUrl = '/file/' + orderid;
		if (window.isUnfinishedOrHistory()) {
			fileUrl = '/filehistory/' + orderid
		}
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header" ref="header">
						<div className="header-bg-specail">
							<div className="header-bg"></div>
							<div className="header-bg-2"></div>
						</div>
						<div className="header-c">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c maintenance-replay">
							<MaintenanceReplyCard data={data}></MaintenanceReplyCard>
							{
								data["list"] && data["list"].length != 0 ? <MaintenanceReplyDeviceDetail modelType={self.props.maintenance["model_type"]} changeData={(index, data) => self.changeData(index, data)} openView={(e) => self.openMoreView(e)} index={0} data={_.extend({}, { showMoreBtn: true }, data["list"][0])}></MaintenanceReplyDeviceDetail> : ''
							}
						</div>
					</sesstion>
					<LoadMore data={data['loading']} />
					{/* money: data["orderMoney"] */}
					<MoneyShowItem data={{
						label: '保养订单总价',
						money: sumData
					}} showText={true} styleClass={'specail-fix'}></MoneyShowItem>
					<div className="file-num-specail border-line-h before" onClick={(e) => this.openFileView(fileUrl)}>
						<i className="icon-file"></i>
						<span className="preview-file">查看附件{data['fileCount'] && data['fileCount'] != 0 ? ('(' + data['fileCount'] + ')') : ''}</span>
					</div>
					<footer className="footer">
						<div className="log-btn" onClick={(e) => this.openView('/log')}>
							<i className="icon-log"></i>
							<span>流程日志</span>
						</div>
						<div className="eps-btn-wrap">
							<div className="eps-btn eps-btn-default-small" onClick={(e) => this.reject(e)}>拒绝</div>
							<div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>确认</div>
						</div>
					</footer>
				</div>
			</div>
		);
	}
	componentDidMount() {
		let self = this;
		let modelData = this.props.maintenance;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
		this.setHeight();
		dispatch({ type: 'maintenance/fetch', payload: orderid, dispatch: dispatch });
		PubSub.subscribe('editmaintenancereplyDevice', function (evt, data) {
			console.log(data['list'], '这个里面有什么呢');
			dispatch({
				type: 'maintenance/changeData',
				payload: {
					list: data['list'],
					labourTaxNew: data['list']['labourTaxNew'] || '',
					accessoriesTaxNew: data['list']['accessoriesTaxNew'] || ''
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

		$(window).resize(function () { self.setHeight() });
	}
	setHeight() {
		let self = this;
		setTimeout(function () {
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			let money = $('.money-show-item').height() || 0;
			let footer = $('.footer').height() || 0;
			let file = $('.file-num-specail').height() || 0;
			$('.main-c').css({ height: clientHeight - header - money - footer - file + 'px' });
		}, 0)
	}
	openMoreView(data) {
		let datas = this.props.maintenance
		let time = datas['updateDate'].split('.')[0];
		let updateDate = encodeURIComponent(time);
		let url = EpsWebRoot + '/#/maintenance/' + datas["model_type"] + '/reply-list/' + this.props.params['orderid'] + '?updateDate=' + updateDate
		// let transData = _.extend(datas["list"], { labourTaxNew: datas.labourTaxNew }, { accessoriesTaxNew: datas.accessoriesTaxNew });
		console.log('tttt', datas);
		// return;
		window.upTabsData('MaintenanceReplyList', 'cache', {
			// list: transData
			list: datas["list"]
		});
		jw.pushWebView(url);
	}
	openView(data) {
		let datas = this.props.maintenance;
		var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"];
		datas['logType'] = 'maintenanceAfter';
		window.upTabsData('log', 'cache', datas);
		jw.pushWebView(url);
	}
	reject() {
		let self = this;
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.maintenance;
		let rejectDialog = MemoDialog({
			title: '是否拒绝该订单?',
			btnIconClass: 'icon-reject',
			btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...',
			memorequired: true,
			changeData: function () { },
			onBtnClick: (memo, callback) => {
				let datas = {
					param: {
						eid: window.eid,
						record: {
							updateDate: modelData["updateDate"],
							orderNumber: orderid,
							approveFlg: 'REFUSE',
							orderState: modelData["orderState"],
							operateMarks: memo || ''
						}
					}
				}
				self.upData(datas, callback)
			},
			onClose: (memo) => {
				self.rejectMemo = memo;
				console.log('approve reject onClose:')
			},
		});
	}
	agree() {
		let self = this;
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.maintenance;
		console.log(modelData, '这个里面是什么呢');
		let error;
		let newList = [];
		for (var i = 0; i < modelData['list'].length; i++) {
			console.log(modelData['list'][i], '提交的数据', i)
			if (typeof (modelData['list'][i]['labourTaxNew']) == 'undefined' || !modelData['list'][i]['labourTaxNew'] || modelData['list'][i]['labourTaxNew'] == '请选择') {
				// if (typeof (modelData['list'][i]['labourTax']) == 'undefined' || !modelData['list'][i]['labourTax'] || modelData['list'][i]['labourTax'] == '请选择') {
				error = '请选择' + (modelData['list'][i]["equipmentName"]) + '的人工费税率!';
				break;
			}
			if (typeof (modelData['list'][i]['accessoriesTaxNew']) == 'undefined' || !modelData['list'][i]['accessoriesTaxNew'] || modelData['list'][i]['labourTaxNew'] == '请选择') {
				error = '请选择' + (modelData['list'][i]["equipmentName"]) + '的' + (modelData.model_type == 'project' ? '材料费' : '配件费') + '税率!';
				break;
			}
			if (typeof (modelData['list'][i]['aboveMaintenanceTime']) == 'undefined' || !modelData['list'][i]['aboveMaintenanceTime']) {
				error = '请正确选择' + (modelData['list'][i]["equipmentName"]) + '的上门保养日期!';
				break;
			}
			if (typeof (modelData['list'][i]['contactsMans']) == 'undefined' || !modelData['list'][i]['contactsMans'] || modelData['list'][i]['contactsMans'].length == 0) {
				error = '请输入' + (modelData['list'][i]["equipmentName"]) + '的联系人!';
				break;
			}
			if (typeof (modelData['list'][i]['tel']) == 'undefined' || !modelData['list'][i]['tel'] || modelData['list'][i]['tel'].length == 0) {
				error = '请输入' + (modelData['list'][i]["equipmentName"]) + '的电话!';
				break;
			}
			if (modelData['list'][i]['tel'].length < 8 || modelData['list'][i]['tel'].length > 11) {
				error = '请正确输入' + (modelData['list'][i]["equipmentName"]) + '的电话!';
				break;
			}
			newList.push({
				id: modelData['list'][i]['id'],
				labourTax: modelData['list'][i]['labourTax'],
				accessoriesTax: modelData['list'][i]['accessoriesTax'],
				aboveMaintenanceTime: moment(modelData['list'][i]['aboveMaintenanceTime'] * 1000).format("YYYY-MM-DD"),
				contactsMans: modelData['list'][i]['contactsMans'],
				tel: modelData['list'][i]['tel']
			})
		}
		if (error) {
			AlertBase({
				tip: error, icon: 'icon-save-error',
			});
			return
		}
		let epsDialog = MemoDialog({
			title: '请输入备注',
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
							updateDate: modelData["updateDate"],
							orderNumber: orderid,
							approveFlg: 'PASS',
							orderState: modelData["orderState"],
							operateMarks: memo || '',
							listStr: JSON.stringify(newList)
						}
					}
				}
				self.upData(datas, callback)
			},
			onClose: (memo) => {
				self.rejectMemo = memo;
				console.log('approve reject onClose:')
			},
		});
	}
	upData(data, callback) {
		let url = '/McdEpsApi/joywok/maintenance/submitOrderInfo';
		console.log('提交的数据', JSON.stringify(data), data);
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
				console.log(resp['data']['success'], '这个里面会返回什么呢');
				AlertBase({
					tip: '已成功提交',
					icon: 'icon-save-success',
					onOk: () => {
						jw.closeWebView()
					}
				});
			}
		})
	}
}
export default connect(function (state) {
	return state
})(Reply);