/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import MaintenanceReplyCard from '../../components/Common/MaintenanceReplyCard';
import MaintenanceConfirmDevice from '../../components/Common/MaintenanceConfirmDevice';
import { MemoDialog, EvaluateDialog, AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import request from './../../utils/EpsRequest';
import LoadMore from './../../components/Common/LoadMore';
import { openChart, orderStatus } from '../../constants';

class Assess extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	openFileView(data) {
		var url = EpsWebRoot + '/#' + data;
		let datas = this.props.maintenance;
		window.upTabsData('file', 'cache', datas);
		jw.pushWebView(url);
	}
	openMoreView(data) {
		let datas = this.props.maintenance;
		// let datas = this.props.processdevice;
		let time = datas['updateDate'].split('.')[0];
		let updateDate = encodeURIComponent(time);
		var url = EpsWebRoot + '/#/maintenance/' + datas["model_type"] + '/device-list/' + this.props.params['orderid'] + '?updateDate=' + updateDate
		window.upTabsData('MaintenanceDeviceList', 'cache', {
			list: datas["list"],
		});
		jw.pushWebView(url);
	}
	render() {
		let self = this;
		let data = this.props.maintenance
		let btn = '';
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length - 1];
		let fileUrl = '/file/' + orderid;
		if (window.isUnfinishedOrHistory()) {
			fileUrl = '/filehistory/' + orderid
		}
		let strOrderSta = data['orderState'] && orderStatus["maintenanceAfter"][data['orderState']] ? orderStatus["repair"][data['orderState']] : { 'label': '' };
		if (data['loading']['loading']) {
			btn = <div className="todo-info-status"><div className="eps-btn eps-btn-default-small">加载中…</div></div>
		} else {
			if (isUnfinishedOrHistory()) {
				btn = <div className="todo-info-status" onClick={(e) => this.openView('/approval')}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			} else {
				btn = <div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>
					<i className="icon-reply-check"></i>
					<span>确认</span>
				</div>
			}
		}
		console.log('rrppvvvvv', data)
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
						<div className="main-c ">
							<div className="maintenance-card animated zoomIn">
								<div className="maintenance-card-c">
									<div className="maintenance-card-info clear-margin">
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">流程单号</div>
											<div className="maintenance-card-val ellipsis more">{data["orderNumber"] || '-'}</div>
										</div>
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">下单日期</div>
											<div className="maintenance-card-val ellipsis more">{data["createDate"] || '-'}</div>
										</div>
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">服务商</div>
											<div className="maintenance-card-val ellipsis more">{data["vendorName"] || '-'}</div>
										</div>
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">联系电话</div>
											<div className="maintenance-card-val ellipsis more">{
												data["vendorTel"] ? <a href={'tel:' + data["vendorTel"]} className="phone-number">{data["vendorTel"]}</a> : ''
											}</div>
										</div>
									</div>
								</div>
							</div>
							{
								data["list"] && data["list"].length != 0 ? <MaintenanceConfirmDevice modelType={self.props.maintenance["model_type"]} disabledAbovetime={true} openView={(e) => self.openMoreView(e)} index={0} data={_.extend({}, { showMoreBtn: true }, data['list'][0])}></MaintenanceConfirmDevice> : ''
							}
							{/* {
								_.map(data['list'], function (i, index) {
									return <MaintenanceConfirmDevice modelType={self.props.maintenance["model_type"]} openView={(e) => self.openMoreView(e)} disabledAbovetime={true} index={0} data={_.extend({}, { showMoreBtn: true }, data['list'][0])}></MaintenanceConfirmDevice>
								})
							} */}
						</div>
					</sesstion>
					<div className="money-show-item specail-fix padding-b">
						<div className="money-text margin-b">
							<i className="text-icon"></i>
							<span>在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</span>
						</div>
					</div>
					<LoadMore data={data['loading']} />
					<div className="file-num-specail border-line-h before" onClick={(e) => this.openFileView(fileUrl)}>
						<i className="icon-file"></i>
						<span className="preview-file">查看附件{data['fileCount'] && data['fileCount'] != 0 ? ('(' + data['fileCount'] + ')') : ''}</span>
					</div>
					<footer className="footer">
						<div className="log-btn" onClick={(e) => this.openView('/log')}>
							<i className="icon-log"></i>
							<span>流程日志</span>
						</div>
						{btn}
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
		request('/McdEpsApi/joywok/common/getEvaluate', {
			method: 'POST',
			body: JSON.stringify({
				param: {
					eid: window.eid,
					condition: {
						orderNumber: orderid,
					}
				}
			})
		}).then(function (resp) {
			window.Evaluate = resp['data']['body'];
			dispatch({ type: 'maintenance/fetch', payload: orderid, dispatch: dispatch });
		})
		this.setHeight();
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
		setTimeout(function () {
			// 	let modelData = self.props.maintenance;
			// 	console.log(modelData["fileList"]);
			// 	jw.previewImages({
			//       current: modelData["fileList"][0]['url'], // 当前显示图片的http链接
			//       urls:_.map( modelData["fileList"],function(i){
			//       	return i['url']
			//       })  // 需要预览的图片http链接列表
			//     });
			// jw.previewDoc({
			//   url:'https://www.joywok.com/public/images/test.docx',
			//   name:'',
			//   type:'application/msword'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
			// },{
			//   success:function(){
			//   }
			// })
			// 
			// 
			// 
			// jw.previewDoc({
			//      url:'http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/maintenance/getYearPlanAttach?eid=E5001162&orderNumber=MT170001048',
			//      name:'xxxxxxxxxxxxx',
			//      type:'application/vnd.ms-excel'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
			//    },{
			//      success:function(){
			//      }
			//    })
		}, 1500)
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
	openPicView() {
		let modelData = this.props.maintenance;
		// console.log(modelData["fileList"],'123123123123');
		jw.previewImages({
			current: modelData["fileList"][0]['url'], // 当前显示图片的http链接
			urls: _.map(modelData["fileList"], function (i) {
				return i['url']
			})  // 需要预览的图片http链接列表
		});
	}
	openView(data) {
		let datas = this.props.maintenance;
		var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"]
		datas['logType'] = 'maintenanceAfter';
		window.upTabsData('log', 'cache', datas);
		jw.pushWebView(url);
	}
	changeData(data) {
	}
	agree() {
		let modelData = this.props.maintenance;
		EvaluateDialog({
			title: '请输入评价',
			btnVal: '完成',
			memorequired: false,
			formData: {
				schema: _.map(window.Evaluate, function (val, key) {
					return {
						name: key, element: 'Rate',
						label: val,
						defaultValue: (typeof (window.EvaluateCache) != 'undefined' ? window.EvaluateCache[key] : 0),
						attr: {
							empty: <i className="icon-star"></i>,
							full: <i className="icon-star-active"></i>
						},
						rules: []
					}
				}).concat({
					name: 'operateMarks', element: 'Textarea',
					defaultValue: (typeof (window.EvaluateCache) != 'undefined' ? window.EvaluateCache['operateMarks'] : ''),
					attr: {
						className: 'appraisal-form-feedback',
						placeholder: '请输入备注...'
					},
					rules: []
				}),
				buttons: false,
				changeData: this.changeData.bind(this)
			},
			rules: function (data) {
				for (var i in window.Evaluate) {
					if (data[i] == 0) {
						AlertBase({
							tip: '请输入' + window.Evaluate[i] + '的评价!',
							icon: 'icon-save-error',
							onOk: () => { }
						});
						return false;
					}
				}
				let hasOne = false;
				_.each(window.Evaluate, function (i, key) {
					if (data[key] <= 2) {
						hasOne = true
					}
				})
				if (hasOne && data['operateMarks'].length == 0) {
					AlertBase({
						tip: '由于评星较低，请输入备注！！',
						icon: 'icon-save-error',
						onOk: () => { }
					});
					return false
				}
				return true
			},
			onBtnClick: (data) => {
				data['maintenanceStaffDressStandard'] = data['maintenanceStaffDressStandard'] + '';
				data['maintenanceResponseTime'] = data['maintenanceResponseTime'] + '';
				data['serviceAttitude'] = data['serviceAttitude'] + '';
				data['serviceQuality'] = data['serviceQuality'] + '';
				data['siteCleaning'] = data['siteCleaning'] + '';

				let hasOne = false;
				// _.each(dat)

				request('/McdEpsApi/joywok/maintenance/submitStoreEvaluate', {
					method: 'POST',
					body: JSON.stringify({
						param: {
							eid: window.eid,
							record: _.extend({
								orderNumber: modelData['orderNumber'],
								updateDate: modelData['updateDate'],
								orderState: modelData['orderState']
							}, data)
						}
					})
				}).then(function (resp) {
					console.log(JSON.stringify({
						param: {
							eid: window.eid,
							record: _.extend({
								orderNumber: modelData['orderNumber'],
								updateDate: modelData['updateDate'],
								orderState: modelData['orderState']
							}, data)
						}
					}), resp['data'], '反悔了什么呢');
					// return 
					if (resp['data']['success'] == false) {
					} else {
						AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: () => {
								jw.closeWebView()
							}
						});
					}
				})
			},
			onClose: (memo) => {
				self.rejectMemo = memo;
				console.log('approve reject onClose:')
			},
		});
	}
}
export default connect(function (state) {
	return state
})(Assess);