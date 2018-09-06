/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import MoneyShowItem from '../../components/Common/MoneyShowItem';
import request from './../../utils/EpsRequest';
import { MemoDialog } from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';
import { openChart, orderStatus } from '../../constants';
import LoadMore from './../../components/Common/LoadMore';
import { List } from 'jw-components-mobile';
const Item = List.Item;

class Approval extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	changeData(data) {
	}
	alertInfo(data) {
		if (data.length == 0) return
		AlertInfoBase({
			text: data
		})
	}
	openFileView(data) {
		var url = EpsWebRoot + '/#' + data;
		let datas = this.props.store;
		window.upTabsData('file', 'cache', datas);
		jw.pushWebView(url);
	}
	render() {
		let self = this;
		let data = this.props.store;
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length - 1];
		let fileUrl = '/file/' + orderid;
		if (window.isUnfinishedOrHistory()) {
			fileUrl = '/filehistory/' + orderid
		}
		console.log(data, '这个里面返回什么数据了ne')
		let btn = '';
		if (data['loading']['loading']) {
			btn = <div className="todo-info-status"><div className="eps-btn eps-btn-default-small">加载中…</div></div>
		} else {
			if (isUnfinishedOrHistory()) {
				let strOrderSta = ''
				if (data['model_type'] == 'equipment') {
					strOrderSta = data['orderState'] && orderStatus["minorputchaseProject"][data['orderState']] ? orderStatus["minorputchaseProject"][data['orderState']] : { 'label': '', val: '' };
				} else {
					if (data['type'] == '1') {
						strOrderSta = data['orderState'] && orderStatus["minorputchaseIt"][data['orderState']] ? orderStatus["minorputchaseIt"][data['orderState']] : { 'label': '', val: '' };
					} else {
						strOrderSta = data['orderState'] && orderStatus["minorputchaseIt2"][data['orderState']] ? orderStatus["minorputchaseIt2"][data['orderState']] : { 'label': '', val: '' };
					}
				}
				btn = <div className="todo-info-status" onClick={(e) => this.openView('/approval')}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			} else {
				btn = <div className="eps-btn-wrap">
					<div className="eps-btn eps-btn-default-small" onClick={(e) => this.reject(e)}>拒绝</div>
					<div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>通过</div>
				</div>
			}
		}

		let orderMoney = 0;
		if (data["model_type"] == 'equipment') {
			orderMoney = data['orderMoney']
		} else {
			_.each(data['supplierList'], function (i) {
				orderMoney += Number(i["equipmentCostTotal"])
			})
		}
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header clear-margin specail" ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c eps-nonproject-approval">
							{this._init_header()}
							{this._init_list()}
							<div className="eps-box-wrap eps-box-item animated zoomIn hide">
								<i className="eps-list-card-bgicon"></i>
								<div className="eps-box">
									<div className="purchase-box-title"><font>Business Case</font></div>
									<div className="purchase-show">
										<List className="my-list jw-list">
											<Item extra={"¥ " + 10000} onClick={() => { }}>预估固定资产投资总金额</Item>
											<Item extra={"¥ " + 10000} onClick={() => { }}>预计旧资产报废</Item>
											<Item extra={"¥ " + 10000} onClick={() => { }}>是否增加销售额？</Item>
											<Item extra={"¥ " + 10000} onClick={() => { }}>预计增加销售额</Item>
											<Item extra={"¥ " + 10000} onClick={() => { }}>预计增加年利润额</Item>
											<Item extra={"¥ " + 10000} onClick={() => { }}>预计投资回报率(ROI%)</Item>
										</List>
									</div>
								</div>
							</div>
						</div>
					</sesstion>
					<MoneyShowItem data={{
						money: orderMoney || 0
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
						{
							btn
						}
					</footer>
				</div>
			</div>
		);
	}
	// 组件加载完毕
	componentDidMount() {
		let self = this;
		let modelData = this.props.store;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
		console.log(modelData, '这个里面有什么值呢');
		dispatch({ type: 'store/fetch', payload: orderid, dispatch: dispatch });
		this.setHeight();

		if (isUnfinishedOrHistory()) {
		} else {
			if (modelData['type'] == '1') {
				jw.setTitle({ title: 'DOA审批' });
			} else {
				jw.setTitle({ title: '调整后审批' });
			}
		}
		jw.setFuncBtns([{ type: 4 }]);
		window.onJwNavBtnClick = function (data) {
			if (data['type'] == '4') {
				let modelData = self.props.store;
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
			let footer = $('.footer').height() || 0;
			let file = $('.file-num-specail').height() || 0;
			$('.main-c').css({ height: clientHeight - header - money - footer - file + 'px' });
		}, 0)
	}
	openView(data) {
		let datas = this.props.store;
		let orderid = this.props.params.orderid.split("&")[0];
		var url = EpsWebRoot + '/#' + data + '/' + orderid;
		if (datas["model_type"] == 'equipment') {
			datas['logType'] = 'minorputchaseProject';
		} else {
			if (datas['type'] == '1') {
				datas['logType'] = 'minorputchaseIt';
			} else {
				datas['logType'] = 'minorputchaseIt2';
			}
		}
		window.upTabsData('log', 'cache', datas);
		jw.pushWebView(url);
	}
	handelToDetail(data) {
		window.upTabsData('equiqmentDetail', 'cache', data);
		let url = EpsWebRoot + '/#/minorpurchase/approval/equipmentDetail';
		jw.pushWebView(url);
	}
	_init_header() {
		let data = this.props.store;
		if (data["model_type"] == 'equipment') {
			return <div className="maintenance-card animated zoomIn">
				<div className="maintenance-card-c">
					<div className="maintenance-card-title">
						<i></i>
						<div className="maintenance-card-t-v">零星采购-{(data["model_type"] == 'equipment' ? '设备·工程' : 'IT')}</div>
						<div className="maintenance-card-time">
							<i className="icon-time"></i>
							<span>{data["ldwInfo"] ? moment(data["ldwInfo"]['createDate']).format('YYYY-MM-DD') : '-'}</span>
						</div>
					</div>
					<div className="maintenance-card-info">
						<div className="maintenance-card-i">
							<div className="maintenance-card-label ">餐厅名称</div>
							<div className="maintenance-card-val ellipsis more">{data['ldwInfo'] ? data['ldwInfo']['storeName'] : '-'}</div>
						</div>
						<div className="maintenance-card-i">
							<div className="maintenance-card-label ">餐厅编号</div>
							<div className="maintenance-card-val ellipsis more">{data['ldwInfo'] ? data['ldwInfo']['uscode'] : '-'}</div>
						</div>
						<div className="maintenance-card-i">
							<div className="maintenance-card-label ">订单编号</div>
							<div className="maintenance-card-val ellipsis more">{data['ldwInfo'] ? data['ldwInfo']['demandNumber'] : '-'}</div>
						</div>
						{
							data['ldwInfo'] && data['ldwInfo']['orderDescription'] ? <div className="maintenance-card-i">
								<div className="maintenance-card-label ">备注</div>
								<div className="maintenance-card-val ellipsis more">{data['ldwInfo']['orderDescription']}</div>
							</div> : ''
						}
					</div>
				</div>
			</div>
		} else {
			let orderid = this.props.params.orderid.split("&")[0];
			return <div className="maintenance-card animated zoomIn">
				<div className="maintenance-card-c">
					<div className="maintenance-card-title">
						<i></i>
						<div className="maintenance-card-t-v">零星采购-{(data["model_type"] == 'equipment' ? '设备·工程' : 'IT')}</div>
						<div className="maintenance-card-time">
							<i className="icon-time"></i>
							<span>{data["orderDate"] ? moment(data["orderDate"]).format('YYYY-MM-DD') : '-'}</span>
						</div>
					</div>
					<div className="maintenance-card-info">
						<div className="maintenance-card-i">
							<div className="maintenance-card-label ">餐厅名称</div>
							<div className="maintenance-card-val ellipsis more">{data['storeName'] ? data['storeName'] : '-'}</div>
						</div>
						<div className="maintenance-card-i">
							<div className="maintenance-card-label ">餐厅编号</div>
							<div className="maintenance-card-val ellipsis more">{data['storeNumber'] ? data['storeNumber'] : '-'}</div>
						</div>
						<div className="maintenance-card-i">
							<div className="maintenance-card-label ">订单编号</div>
							<div className="maintenance-card-val ellipsis more">{orderid ? orderid : '-'}</div>
						</div>
						{
							data['orderDescription'] ? <div className="maintenance-card-i">
								<div className="maintenance-card-label ">备注</div>
								<div className="maintenance-card-val ellipsis more">{data['orderDescription']}</div>
							</div> : ''
						}
					</div>
				</div>
			</div>
		}
	}
	_init_list() {
		let self = this;
		let data = this.props.store;
		if (data["model_type"] == 'equipment') {
			return <div className="maintenance-restaurant animated zoomIn">
				<div className="maintenance-restaurant-c">
					<div className="maintenance-restaurant-title">
						<i></i>
						<div className="maintenance-restaurant-title-num">供应商编号</div>
						<div className="maintenance-restaurant-title-name">供应商名称</div>
						<div className="maintenance-restaurant-title-money">总价(RMB)</div>
						{/* <div className="maintenance-restaurant-title-money">金额(RMB)</div> */}
					</div>
					<div className="maintenance-restaurant-list">
						<div className="maintenance-restaurant-i border-line-h before">
							<div className="maintenance-restaurant-i-num">{data["vendorInfoList"] ? data["vendorInfoList"]["vendorNumber"] : '-'}</div>
							<div className="maintenance-restaurant-i-name ellipsis" onClick={(e) => self.alertInfo(data["vendorInfoList"] ? data["vendorInfoList"]["vendorName"] : '')}>{data["vendorInfoList"] ? data["vendorInfoList"]["vendorName"] : '-'}</div>
							<div className="maintenance-restaurant-i-money">{Number(data["orderMoney"]).formatMoney(2, '', '')}</div>
						</div>
					</div>
				</div>
				<div className="get-more border-line-h before" onClick={() => self.handelToDetail(data)}>查看更多明细</div>
			</div>
		} else {
			return <div className="maintenance-restaurant animated zoomIn">
				<div className="maintenance-restaurant-c">
					<div className="maintenance-restaurant-title">
						<i></i>
						<div className="maintenance-restaurant-title-num">供应商编号</div>
						<div className="maintenance-restaurant-title-name">供应商名称</div>
						<div className="maintenance-restaurant-title-money">金额(RMB)</div>
					</div>
					<div className="maintenance-restaurant-list">
						{_.map(data['supplierList'], function (i) {
							return <div className="maintenance-restaurant-i border-line-h before">
								<div className="maintenance-restaurant-i-num">{i["vendorNumber"] ? i["vendorNumber"] : '-'}</div>
								<div className="maintenance-restaurant-i-name ellipsis" onClick={(e) => self.alertInfo(i["vendorName"] ? i["vendorName"] : '')}>{i["vendorName"] ? i["vendorName"] : '-'}</div>
								<div className="maintenance-restaurant-i-money">{Number(i["equipmentCostTotal"]).formatMoney(2, '', '')}</div>
							</div>
						})}
					</div>
				</div>
				<div className="get-more border-line-h before" onClick={() => self.handelToDetail(data)}>查看更多明细</div>
			</div>
		}
	}
	reject() {
		let self = this;
		let modelData = this.props.store;
		let orderid = this.props.params.orderid.split("&")[0];
		let rejectDialog = MemoDialog({
			title: '是否拒绝该订单?',
			btnIconClass: 'icon-reject',
			btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...',
			memorequired: true,
			changeData: function () { },
			onBtnClick: (memo, callback) => {
				let datas = {}
				if (modelData['model_type'] == 'equipment') {
					datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderState: modelData["orderState"],
								createBy: modelData['ldwInfo']['createBy'],
								orderNumber: modelData["ldwInfo"]['demandNumber'],
								confirmFlag: 'REFUSE',
								refuseRemarks: memo || '',
								orderMoney: modelData['orderMoney']
							}
						}
					}
				} else {
					datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderState: modelData["orderState"],
								createBy: modelData['createBy'],
								orderNumber: modelData['orderNumber'],
								confirmFlag: 'REFUSE',
								doaRemark: memo || '',
								orderMoney: modelData['orderMoney']
							}
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
		let modelData = this.props.store;
		console.log(modelData, '这个里面有啥呢')
		let epsDialog = MemoDialog({
			title: '请输入备注?',
			btnVal: '通过',
			placeholder: '请输入备注...',
			changeData: function () { },
			memorequired: false,
			onBtnClick: (memo, callback) => {
				let datas = {}
				if (modelData['model_type'] == 'equipment') {
					datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderState: modelData["orderState"],
								orderNumber: modelData["ldwInfo"]["demandNumber"],
								confirmFlag: 'Approve',
								refuseRemarks: memo || '',
								orderMoney: modelData['orderMoney']
							}
						}
					}
				} else {
					datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderState: modelData["orderState"],
								orderNumber: orderid,
								confirmFlag: 'PASS',
								doaRemark: memo || '',
								orderMoney: modelData['orderMoney']
							}
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
		let url = '';
		let modelData = this.props.store;
		if (modelData['model_type'] == 'equipment') {
			url = '/McdEpsApi/joywok/reimage/submitECOrderInfo';
		} else {
			url = '/McdEpsApi/joywok/reimage/submitITOrderInfo';
		}
		console.log(JSON.stringify(data), url, '提交的数据');
		request(url, {
			method: 'POST',
			body: JSON.stringify(data)
		}).then(function (resp) {
			console.log('看看这个里面有什么呢', resp);
			if (resp['data']['success'] == false) {
				if (typeof (callback) != 'undefined') {
					callback(true);
				}
			} else {
				console.log(resp['data'], '返回的数据')
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
	let hash = window.location.hash.split('?').length != 0 ? window.location.hash.split('?')[1].split('&') : [];
	let nowHash = {};
	_.each(hash, (i) => {
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})
	state['store']['type'] = nowHash['type']
	return state
})(Approval);