/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import MaintenanceCard from '../../components/Common/MaintenanceCard';
import MaintenanceRestaurant from '../../components/Common/MaintenanceRestaurant';
import MoneyShowItem from '../../components/Common/MoneyShowItem';
import request from './../../utils/EpsRequest';
import { MemoDialog } from '../../components/Common/EpsModal';
import { AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import { openChart, orderStatus } from '../../constants';
import LoadMore from './../../components/Common/LoadMore';


class Approval extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	changeData(data) {
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

		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length - 1];
		let fileUrl = '/file/' + orderid;
		if (window.isUnfinishedOrHistory()) {
			fileUrl = '/filehistory/' + orderid
		}
		let btn = '';
		let strOrderSta = data['orderState'] && orderStatus["maintenanceBefore"][data['orderState']] ? orderStatus["maintenanceBefore"][data['orderState']] : { 'label': '' };
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
		console.log(data['list'], '这个里面有什么啊');
		let cancelMoneyHtml = '';
		if (data['type'] != 'year') {
			cancelMoneyHtml = (<div className="money-show-item-w">
				<div className="money-show-item-c">
					<div className="money-show-item-val">
						<i className="icon-money"></i>
						<span>{Number(data["cancelMoney"]).formatMoney(2, '', '')}</span>
					</div>
					<div className="money-show-item-label">取消保养的费用总计</div>
				</div>
			</div>);
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
						<div className="main-c ">
							<MaintenanceCard data={data}></MaintenanceCard>
							{
								data['list'] && data['list'].length != 0 ? <MaintenanceRestaurant modelType={self.props.maintenance["model_type"]} data={data}></MaintenanceRestaurant> : ''
							}
						</div>
					</sesstion>
					<div className={data['type'] != 'year' ? 'money-show-item specail' : 'money-show-item specail-fix'}>
						{cancelMoneyHtml}
						<div className="money-show-item-w">
							<div className="money-show-item-c">
								<div className="money-show-item-val">
									<i className="icon-money"></i>
									<span>{Number(data["orderMoney"]).formatMoney(2, '', '')}</span>
								</div>
								<div className="money-show-item-label">总价</div>
							</div>
							{/*  */}
						</div>
						<div className="money-text margin-bmin">
							<i className="text-icon"></i>
							<span>在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</span>
						</div>
					</div>
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
		dispatch({ type: 'maintenance/fetch', payload: orderid, dispatch: dispatch });
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
				openChart(modelData['creaeBy'], modelData['orderNumber'], '测试');
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
		let datas = this.props.maintenance;
		var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"]
		datas['logType'] = 'maintenanceBefore';
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
		let epsDialog = MemoDialog({
			title: '请输入备注',
			btnIconClass: 'icon-check',
			btnVal: '通过',
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
	upData(data, callback) {
		let url = '';
		let modelData = this.props.maintenance;
		if (modelData['type'] == 'year') {
			url = '/McdEpsApi/joywok/maintenance/submitYearPlan'
		} else {
			url = '/McdEpsApi/joywok/maintenance/submitMonthPlan'
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
						jw.closeWebView()
					}
				});
			}
		})
	}
}
export default connect(function (state) {
	let hash = window.location.hash.split('?')[1].split('&');
	let nowHash = {};
	_.each(hash, (i) => {
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})
	state['maintenance']['type'] = nowHash['type']
	return state
})(Approval);