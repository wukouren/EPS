/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import MoneyShowItem from '../../components/Common/MoneyShowItem';
import request from './../../utils/EpsRequest';
import { MemoDialog } from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase,AlertInfoBase} from '../../components/Common/EpsModal';
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
	openFileView(data) {
		var url = EpsWebRoot + '/#' + data;
		let datas = this.props.store;
		window.upTabsData('file', 'cache', datas);
		jw.pushWebView(url);
	}
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
	NameInfoSpecail(name){
    AlertInfoBase({
      text: name,
    })  
  }
	render() {
		let self = this;
		let data = this.props.store;
		console.log('rrr', data);
		let strOrderSta = data['orderState'] && orderStatus["newstoregc"][data['orderState']] ? orderStatus["newstoregc"][data['orderState']] : { 'label': '-', val: '-' };
		let btn = ''
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length - 1];
		let fileUrl = '/file/' + orderid;
		if (window.isUnfinishedOrHistory()) {
			fileUrl = '/filehistory/' + orderid
		}
		if (data['loading']['loading']) {
			btn = <div className="todo-info-status"><div className="eps-btn eps-btn-default-small">加载中…</div></div>
		} else {
			if (isUnfinishedOrHistory()) {
				btn = <div className="todo-info-status" onClick={(e) => this.openView('/approval')}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			} else {
				btn = <div className="eps-btn-wrap">
					<div className="eps-btn eps-btn-default-small" onClick={(e) => this.reject(e)}>拒绝</div>
					<div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>通过</div>
				</div>
			}
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
							<div className="maintenance-card animated zoomIn">
								<div className="maintenance-card-c">
									<div className="maintenance-card-title">
										<i></i>
										<div className="maintenance-card-t-v">新店CG</div>
										<div className="maintenance-card-time">
											<i className="icon-time"></i>
											<span>{data['createDate']}</span>
										</div>
									</div>
									<div className="maintenance-card-info">
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">餐厅名称</div>
											<div className="maintenance-card-val ellipsis more">{data["storeName"] || '-'}</div>
										</div>
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">餐厅编号</div>
											<div className="maintenance-card-val ellipsis more">{data["usCode"] || '-'}</div>
										</div>
										<div className="maintenance-card-i">
											<div className="maintenance-card-label ">订单编号</div>
											<div className="maintenance-card-val ellipsis more">{data["orderNumber"] || '-'}</div>
										</div>
										<div className="maintenance-card-i hide">
											<div className="maintenance-card-label ">备注</div>
											<div className="maintenance-card-val ellipsis more">上海浦东店发起GC需求，详情已备注，请查看</div>
										</div>
									</div>
								</div>
							</div>
							<div className="gc-card-list">
							{
								_.map(data['list'],function(i){
									console.log(i,'zzzzzzzzzzzzz')
									return <div className="gc-item-card">
													<div className="gc-item-card-c">
														<div className="gc-item-card-h">
															<div className="gc-item-card-label">GC工程报价单模版</div>
														</div>
														<div className="gc-item-card-info">
															<div className="gc-item-card-i">
																<div className="gc-item-card-sep" onClick={()=>self.NameInfoSpecail('金额(不含税)：'+self.turnMoney(i['costNotax'] || 0))}>
																	<div className="gc-item-card-label ellipsis">金额(不含税)</div>
																	<div className="gc-item-card-val ellipsis">{self.turnMoney(i['costNotax'] || 0)}</div>
																</div>
																<div className="gc-item-card-sep">
																		<div className="gc-item-card-label">税率</div>
																		<div className="gc-item-card-val ellipsis">{i['rate'] || '-'}</div>
																</div>
															</div>
															<div className="gc-item-card-i">
																<div className="gc-item-card-sep" onClick={()=>self.NameInfoSpecail('税额：'+self.turnMoney(i['taxes']|| 0))}>
																	<div className="gc-item-card-label">税额</div>
																	<div className="gc-item-card-val ellipsis">{self.turnMoney(i['taxes']|| 0)}</div>
																</div>
																<div className="gc-item-card-sep" onClick={()=>self.NameInfoSpecail('价税合计：'+self.turnMoney(i['cost']|| 0))}>
																		<div className="gc-item-card-label">价税合计</div>
																		<div className="gc-item-card-val ellipsis">{self.turnMoney(i['cost']|| 0)}</div>
																</div>
															</div>
														</div>
													</div>
												</div>
								})
							}
							</div>
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
						money: data["orderMoney"] || 0
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
		dispatch({ type: 'store/fetch', payload: orderid, dispatch: dispatch });
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
				let modelData = self.props.store;
				openChart(modelData['creaeBy'], modelData['orderNumber'], '测试')
			}
		}
		if (isUnfinishedOrHistory()) {
		} else {
			if (modelData['type'] == '1') {
				jw.setTitle({ title: 'DOA审批' });
			} else {
				jw.setTitle({ title: '调整后审批' });
			}
		}
		setTimeout(function(){
			self.setHeight()	
		},200)
	}
	setHeight() {
		let self = this;
		setTimeout(function () {
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			// let header = $('.maintenance-card').height() ||0;
			let money = $('.money-show-item').height() || 0;
			let footer = $('.footer').height() || 0;
			let file = $('.file-num-specail').height() || 0;
			$('.main-c').css({height:clientHeight-money-footer-file - 30+'px'});
		},0)
	}
	openView(data) {
		let datas = this.props.store;
		var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"];
		datas['logType'] = 'newstoregc';
		window.upTabsData('log', 'cache', datas);
		jw.pushWebView(url);
	}
	reject() {
		let self = this;
		let orderid = this.props.params.orderid.split("&")[0];
		let modelData = this.props.store;
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
		let modelData = this.props.store;
		let epsDialog = MemoDialog({
			title: '请输入备注！',
			btnVal: '完成',
			placeholder: '请输入备注...',
			changeData: function () { },
			memorequired: false,
			onBtnClick: (memo, callback) => {
				let datas = {
					param: {
						eid: window.eid,
						record: {
							updateDate: modelData["updateDate"],
							orderNumber: modelData["orderNumber"],
							approveFlg: 'PASS',
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
	upData(data) {
		let url = '';
		let modelData = this.props.store;
		if (modelData['type'] == '1') {
			url = '/McdEpsApi/joywok/gc/submitOrder'
		} else {
			url = '/McdEpsApi/joywok/gc/submitAddOrder'
		}
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
	let hash = window.location.hash.split('?').length != 0 ? window.location.hash.split('?')[1].split('&') : [];
	let nowHash = {};
	_.each(hash, (i) => {
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})
	state['store']['type'] = nowHash['type']
	return state
})(Approval);