/**
 * 此js含以下页面(拆单后的，订单阶段所用页面)：
 *
 * 1. 调整审批（含设备／工程／IT）(审批节：送货调整DOA审批) (拆单后的)
 * 		路由： /project/approval/:objecttype/orderid?type=1
 * 2. 餐厅确认评价(设备，工程,有五星评价)／ 餐厅确认收货(IT，只有设备) 
 * 		路由：/project/approval/:objecttype/orderid?type=4 
 * 		
 * objecttype可以为 equipment project it 
 *
 * 项目采购需求：
		1. Local PM确认供应商的需求明细： 设备／工程／IT 获取供应商需求明细 接口中，返回字段中都会加一个市场信息的list，待后面出图排产
		2. DOA审批 设备／工程／IT 页面，也会增加市场信息的list展示，待后面出图排产,和1共用一个页面
		3. 餐厅确认评价（设备／工程）／餐厅确认收货（IT）,页面不会展示市场信息list,但和4是共用的一个页面
		4. 送货调整，DOA审批：（设备／工程），会增加市场信息的list展示，（IT）是否有市场信息的list展示，待德勤	确认？
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import HeaderCard from './../../components/Project/HeaderCardApproval';
import { DeviceCard, ProjectCard, ITCard } from './../../components/Project/ProjectCard';
import Form from "jw-form/dist/mobile";
import { List } from 'jw-components-mobile';
import { MemoDialog, EvaluateDialog, AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';
import request from '../../utils/EpsRequest';
import { getUsers, openChart, orderStatus, DataLength } from '../../constants';

class Approval extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	// 拒绝订单（含餐厅拒绝（设备，工程，IT）和DOA送货调整拒绝）
	reject() {
		console.log('reject', this.rejectMemo)
		let self = this;
		let type = this.props.location.query.type;
		let rejectDialog = MemoDialog({
			title: '是否拒绝该订单?',
			defaultValue: self.rejectMemo ? self.rejectMemo : '',
			btnIconClass: 'icon-reject',
			btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...',
			memorequired: true,
			onBtnClick: (memo, callback) => {
				self.rejectMemo = memo;
				let approveFlg = 'REFUSE';
				console.log('approve reject onBtnClick:', memo);
				// 餐厅评价和DOA审批都用这个
				self.submitStoreOrder(memo, approveFlg, callback);
			},
			onClose: (memo) => {
				self.rejectMemo = memo;
				console.log('approve reject onClose:')
			},
		});
	}

	// 通过订单 含IT类通过和DOA送货调整通过
	agree() {
		let self = this;
		let type = this.props.location.query.type;
		let agreeDialog = MemoDialog({
			title: '是否确认通过？',
			defaultValue: self.agreeMemo ? self.agreeMemo : '',
			btnVal: '通过',
			placeholder: '选择输入备注...',
			memorequired: false,
			onBtnClick: (memo, callback) => {
				self.agreeMemo = memo;
				let approveFlg = 'PASS';
				// 餐厅评价和DOA审批都用这个
				self.submitStoreOrder(memo, approveFlg, callback);
			},
			onClose: (memo) => {
				//   	self.agreeMemo = memo;
				// console.log('approve agree onClose:',memo)
			},
		});
	}

	//提交餐厅审批订单 提交DOA审批
	submitStoreOrder(memo, approveFlg, callback) {
		console.log('submitStoreOrder:==========', memo, approveFlg)
		let self = this;

		request('/McdEpsApi/joywok/project/submitStoreOrderInfo', {
			method: 'POST',
			body: JSON.stringify({
				param: {
					eid: userinfo.employee_id,
					record: {
						orderNumber: self.props.approval.originaldata.orderNumber,
						updateDate: self.props.approval.originaldata.updateDate,
						orderState: self.props.approval.originaldata.orderState,
						approveFlg: approveFlg,
						operateMarks: memo,
					}
				}
			})
		}).then(function (resp) {
			// 把提交中按钮置为原样
			if (typeof (callback) == 'function') {
				callback(true);
			}
			if (resp.data.success) {
				AlertBase({
					tip: '已成功提交',
					icon: 'icon-save-success',
					onOk: () => {
						jw.closeWebView()
					}
				});
			} else {
				self.rejectMemo = memo;
			}
		})
	}

	// 餐厅确认 评分页面
	EvaluateAgree(data) {
		let self = this;
		console.log('window.Evaluate:==========', window.Evaluate)
		EvaluateDialog({
			title: '请输入评价',
			btnIconClass: 'icon-check',
			btnVal: '确认',
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
				let hasOne = false
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
			onBtnClick: (data, callback) => {
				console.log(data, "data");
				let orderid = self.props.params.orderid;
				let updateDate = self.props.approval['updateDate'];
				setTimeout(function () {
					let saving = AlertBase({
						tip: '正在提交评价',
						icon: 'icon-saving',
						okBtn: {
							text: '提交中...'
						},
						onOk: () => {
							console.log('onOk')
						}
					});
					// 提交评价
					request('/McdEpsApi/joywok/project/submitStoreOrderInfo', {
						method: 'POST',
						body: JSON.stringify({
							param: {
								eid: eid,
								record: _.extend({
									approveFlg: 'PASS',
									orderNumber: self.props.approval.originaldata.orderNumber,
									updateDate: self.props.approval.originaldata.updateDate,
									orderState: self.props.approval.originaldata.orderState,
								}, data)
							}
						})
					}).then(function (resp) {
						// 把提交中按钮置为原样
						if (typeof (callback) == 'function') {
							callback(true);
						}
						if (resp['data']['success'] == false) {
							saving.close();
						} else {
							saving.close();
							AlertBase({
								tip: '已成功提交',
								icon: 'icon-save-success',
								onOk: () => {
									jw.closeWebView();
								}
							});
						}
					})
				}, 500)

			},
			onClose: (memo) => {
				self.rejectMemo = memo;
				console.log('approve reject onClose:')
			},
		});
	}

	openLog() {
		let url = EpsWebRoot + '/#/log/' + this.props.params['orderid'];
		let data = this.props.approval.originaldata;
		console.log('Marlin', data);
		data['logType'] = { key: 'project', subkey: '43' };
		window.upTabsData('log', 'cache', data)
		jw.pushWebView(url);
	}

	openProcessTable() {
		let data = this.props.approval.originaldata;
		data['logType'] = { key: 'project', subkey: '43' };
		window.upTabsData('log', 'cache', data)
		var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
		jw.pushWebView(url);
	}

	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}

	changeData(data) {
		// let dispatch = this.props.dispatch;
		// dispatch({
		// 	type:'form/changeData',
		// 	data:{
		// 		schema:data
		// 	}
		// })
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}

	NameInfo(name, length) {
		let len = length ? length : 8;
		if (DataLength(name) > len) {
			AlertInfoBase({
				text: name,
			});
		}
	}

	// 计算设备税率
	calculationEquipmentRates(data) {
		console.log('data.list:======', data, data.pageInfo.list);
		let rates = {};
		let datalist = data.pageInfo.list;
		let listNums = datalist.length;
		if (listNums > 0) {
			let firstdata = datalist[0];
			// 采购费税率
			rates.taxRate = (_.where(datalist, { taxRate: firstdata.taxRate }).length == listNums) ? (typeof (firstdata.taxRate) == 'string' ? firstdata.taxRate : '-') : '-';
			// 辅料费税率
			rates.accessoriesFeeTax = (_.where(datalist, { accessoriesFeeTax: firstdata.accessoriesFeeTax }).length == listNums) ? (typeof (firstdata.accessoriesFeeTax) == 'string' ? firstdata.accessoriesFeeTax : '-') : '-';
			// 安装费税率
			rates.installationTax = (_.where(datalist, { installationTax: firstdata.installationTax }).length == listNums) ? (typeof (firstdata.installationTax) == 'string' ? firstdata.installationTax : '-') : '-';
			// 配送费税率
			rates.deliveryFeeTax = (_.where(datalist, { deliveryFeeTax: firstdata.deliveryFeeTax }).length == listNums) ? (typeof (firstdata.deliveryFeeTax) == 'string' ? firstdata.deliveryFeeTax : '-') : '-';
			// 住宿费税率
			rates.hotelCostTax = (_.where(datalist, { hotelCostTax: firstdata.hotelCostTax }).length == listNums) ? (typeof (firstdata.hotelCostTax) == 'string' ? firstdata.hotelCostTax : '-') : '-';
			// 其他费税率
			rates.otherCostTax = (_.where(datalist, { otherCostTax: firstdata.otherCostTax }).length == listNums) ? (typeof (firstdata.otherCostTax) == 'string' ? firstdata.otherCostTax : '-') : '-';
			// 车费税率
			rates.carCostTax = (_.where(datalist, { carCostTax: firstdata.carCostTax }).length == listNums) ? (typeof (firstdata.carCostTax) == 'string' ? firstdata.carCostTax : '-') : '-';
		}
		return rates;
	}
	// 计算IT设备税率
	calculationITRates(data) {
		console.log('data.list:======', data, data.pageInfo.list);
		let rates = {};
		let datalist = data.pageInfo.list;
		let listNums = datalist.length;
		if (listNums > 0) {
			let firstdata = datalist[0];
			// 采购费税率
			rates.taxRate = (_.where(datalist, { taxRate: firstdata.taxRate }).length == listNums) ? (typeof (firstdata.taxRate) == 'string' ? firstdata.taxRate : '-') : '-';
			// 特批费用税率  需要横向比较“特批硬件费税率”和“特批人工费税率”，纵向比较“特批硬件费税率”，纵向比较“特批人工费税率”
			// specialExpensesTax;特批硬件费税率
			// specialLaborCostsTax;特批人工费税率
			if (firstdata.specialExpensesTax != firstdata.specialLaborCostsTax) {
				rates.specialTax = '-';
			} else {
				rates.specialTax = (_.where(datalist, { specialExpensesTax: firstdata.specialExpensesTax }).length == listNums) ? (typeof (firstdata.specialExpensesTax) == 'string' ? firstdata.specialExpensesTax : '-') : '-';
				if (rates.specialTax != '-') {
					rates.specialLaborCostsTax = (_.where(datalist, { specialLaborCostsTax: firstdata.specialLaborCostsTax }).length == listNums) ? (typeof (firstdata.specialLaborCostsTax) == 'string' ? firstdata.specialLaborCostsTax : '-') : '-';
					rates.specialTax = (rates.specialTax == rates.specialLaborCostsTax) ? rates.specialTax : '-';
				}
			}
			// 差旅费税率
			rates.travelExpensesTax = (_.where(datalist, { travelExpensesTax: firstdata.travelExpensesTax }).length == listNums) ? (typeof (firstdata.travelExpensesTax) == 'string' ? firstdata.travelExpensesTax : '-') : '-';
			// 人工费税率
			rates.labourCostTax = (_.where(datalist, { labourCostTax: firstdata.labourCostTax }).length == listNums) ? (typeof (firstdata.labourCostTax) == 'string' ? firstdata.labourCostTax : '-') : '-';
		}
		return rates;
	}
	// 项目类型费用信息
	projectPriceInfo() {
		let data = this.props.approval.originaldata;
		return (
			// <div className="np-total-price">
			// 	<label>总价</label>
			// 	<span><i className="icon-sprice"></i><font>{this.turnMoney(data.LumpSumPrice)}</font></span>
			// </div>
			<div className="np-total-price">
				<div className="total-p-cell">
					<label>总价(含税)</label>
					<span><i className="icon-sprice"></i><font>{this.turnMoney(data.LumpSumPrice)}</font></span>
				</div>
				<div className="money-show-other-tip">
					<i className="icon-money-tips"></i>
					<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
				</div>
			</div>

		);
	}
	// 设备类型费用信息
	equipmentPriceInfo() {
		let self = this;
		// type:供应商或者服务商或者同时都是(supplier,service,all),
		// equipmentPrice:采购小计（供应商）,
		// accessoriesFee:辅料费小计（服务商）,
		// installationFee:安装费小计（服务商）,
		// equipmentType:配送费小计（供应商）,
		// hotelCost:住宿费小计（服务商）,
		// otherCost:其他费小计（服务商）,
		// carCost:车费小计（服务商）,
		// this.deviceRoleType = 'all'; 
		let data = this.props.approval.originaldata;
		// 计算设备税率
		let rates = this.calculationEquipmentRates(this.props.approval.originaldata);
		// 供应商
		if (this.deviceRoleType == 'supplier') {
			return (<div className="money-show eps-project-equipment-money">
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.equipmentPrice) + ' (' + rates.taxRate + ')') }}>
							{this.turnMoney(data.equipmentPrice)}{' (' + rates.taxRate + ')'}
						</div>
						<div className="money-show-tip">采购费小计(含税)</div>
						{/* <div className="money-show-tip">采购费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.equipmentType) + ' (' + rates.deliveryFeeTax + ')') }}>
							{this.turnMoney(data.equipmentType)}{' (' + rates.deliveryFeeTax + ')'}
						</div>
						<div className="money-show-tip">配送费小计(含税)</div>
						{/* <div className="money-show-tip">配送费小计(税率)</div> */}
					</div>
					<div className="money-show-i specail">
						<div className="money-specail">
							<i className="icon-money"></i>
							<span className="ellipsis p-totalprice" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.LumpSumPrice)) }}>
								{self.turnMoney(data.LumpSumPrice)}
							</span>
						</div>
						<div className="money-show-tip">(含税)</div>
					</div>
				</div>
				{/* 新加的 */}
				<div className="money-show-other-tip">
					<i className="icon-money-tips"></i>
					<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
				</div>
			</div>);
			// 服务商
		} else if (this.deviceRoleType == 'service') {
			return (<div className="money-show eps-project-equipment-money">
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFee) + ' (' + rates.accessoriesFeeTax + ')') }}>
							{this.turnMoney(data.accessoriesFee)}{' (' + rates.accessoriesFeeTax + ')'}
						</div>
						<div className="money-show-tip">辅料费小计(含税)</div>
						{/* <div className="money-show-tip">辅料费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installationFee) + ' (' + rates.installationTax + ')') }}>
							{this.turnMoney(data.installationFee)}{' (' + rates.installationTax + ')'}
						</div>
						<div className="money-show-tip">安装费小计(含税)</div>
						{/* <div className="money-show-tip">安装费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCost) + ' (' + rates.hotelCostTax + ')') }}>
							{this.turnMoney(data.hotelCost)}{' (' + rates.hotelCostTax + ')'}
						</div>
						<div className="money-show-tip">住宿费小计(含税)</div>
						{/* <div className="money-show-tip">住宿费小计(税率)</div> */}
					</div>
				</div>
				<div className="money-show-c">

					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCost) + ' (' + rates.otherCostTax + ')') }}>
							{this.turnMoney(data.otherCost)}{' (' + rates.otherCostTax + ')'}
						</div>
						<div className="money-show-tip">其他费小计(含税)</div>
						{/* <div className="money-show-tip">其他费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCost) + ' (' + rates.carCostTax + ')') }}>
							{this.turnMoney(data.carCost)}{' (' + rates.carCostTax + ')'}
						</div>
						<div className="money-show-tip">车费小计(含税)</div>
						{/* <div className="money-show-tip">车费小计(税率)</div> */}
					</div>
					<div className="money-show-i specail">
						<div className="money-specail">
							<i className="icon-money"></i>
							<span className="ellipsis p-totalprice" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.LumpSumPrice)) }}>
								{this.turnMoney(data.LumpSumPrice)}
							</span>
						</div>
						<div className="money-show-tip">(含税)</div>
					</div>

				</div>
				{/* 新加的 */}
				<div className="money-show-other-tip">
					<i className="icon-money-tips"></i>
					<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
				</div>
			</div>);
			// 既是供应商，又是服务商
		} else {
			return (<div className="money-show eps-project-equipment-money">
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.equipmentPrice) + ' (' + rates.taxRate + ')') }}>
							{this.turnMoney(data.equipmentPrice)}{' (' + rates.taxRate + ')'}
						</div>
						<div className="money-show-tip">采购费小计(含税)</div>
						{/* <div className="money-show-tip">采购费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFee) + ' (' + rates.accessoriesFeeTax + ')') }}>
							{this.turnMoney(data.accessoriesFee)}{' (' + rates.accessoriesFeeTax + ')'}
						</div>
						<div className="money-show-tip">辅料费小计(含税)</div>
						{/* <div className="money-show-tip">辅料费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installationFee) + ' (' + rates.installationTax + ')') }}>
							{this.turnMoney(data.installationFee)}{' (' + rates.installationTax + ')'}
						</div>
						<div className="money-show-tip">安装费小计(含税)</div>
						{/* <div className="money-show-tip">安装费小计(税率)</div> */}
					</div>
				</div>
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.equipmentType) + ' (' + rates.deliveryFeeTax + ')') }}>
							{this.turnMoney(data.equipmentType)}{' (' + rates.deliveryFeeTax + ')'}
						</div>
						<div className="money-show-tip">配送费小计(含税)</div>
						{/* <div className="money-show-tip">配送费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCost) + ' (' + rates.hotelCostTax + ')') }}>
							{this.turnMoney(data.hotelCost)}{' (' + rates.hotelCostTax + ')'}
						</div>
						<div className="money-show-tip">住宿费小计(含税)</div>
						{/* <div className="money-show-tip">住宿费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCost) + ' (' + rates.otherCostTax + ')') }}>
							{this.turnMoney(data.otherCost)}{' (' + rates.otherCostTax + ')'}
						</div>
						<div className="money-show-tip">其他费小计(含税)</div>
						{/* <div className="money-show-tip">其他费小计(税率)</div> */}
					</div>
				</div>
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCost) + ' (' + rates.carCostTax + ')') }}>
							{this.turnMoney(data.carCost)}{' (' + rates.carCostTax + ')'}
						</div>
						<div className="money-show-tip">车费小计(含税)</div>
						{/* <div className="money-show-tip">车费小计(税率)</div> */}
					</div>
					<div className="money-show-i specail">
						<div className="money-specail">
							<i className="icon-money"></i>
							<span className="ellipsis p-totalprice" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.LumpSumPrice)) }}>
								{this.turnMoney(data.LumpSumPrice)}
							</span>
						</div>
						<div className="money-show-tip">(含税)</div>
					</div>
				</div>
				{/* 新加的 */}
				<div className="money-show-other-tip">
					<i className="icon-money-tips"></i>
					<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
				</div>
			</div>);
		}
	}
	// it设备类型费用信息
	itPriceInfo() {
		let self = this;
		let data = this.props.approval.originaldata;
		// isTsi:是否是TSI（tsi：true,直采：false）,
		// storeAll:餐厅采购总价(直采不显示),
		// labourCost:人工费(直采不显示),
		// travelExpenses:差旅费(直采不显示),
		// special:特批费用(直采不显示),
		// 直采只显示总价
		if (data.isTsi == false) {
			return (
				<div className="np-total-price">
					<div className="total-p-cell">
						<label>总价(含税)</label>
						<span><i className="icon-sprice"></i><font>{this.turnMoney(data.directCost)}</font></span>
						{/* <span><font>{data.pmtotal?data.pmtotal.toFixed(2):'-'}</font><i className="icon-sprice"></i></span> */}
					</div>
					<div className="money-show-other-tip">
						<i className="icon-money-tips"></i>
						<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
					</div>
				</div>
			);
		} else {
			// 计算IT设备税率
			let rates = this.calculationITRates(this.props.approval.originaldata);
			return (<div className="money-show">
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.tsiPrriceAll) + ' (' + rates.taxRate + ')') }}>
							{this.turnMoney(data.tsiPrriceAll)}{' (' + rates.taxRate + ')'}
						</div>
						<div className="money-show-tip">采购费小计(含税)</div>
						{/* <div className="money-show-tip">采购费小计(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.special) + ' (' + rates.specialTax + ')') }}>
							{this.turnMoney(data.special)}{' (' + rates.specialTax + ')'}
						</div>
						<div className="money-show-tip">特批费用(含税)</div>
						{/* <div className="money-show-tip">特批费用(税率)</div> */}
					</div>
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.travelExpenses) + ' (' + rates.travelExpensesTax + ')') }}>
							{this.turnMoney(data.travelExpenses)}{' (' + rates.travelExpensesTax + ')'}
						</div>
						<div className="money-show-tip">差旅费(含税)</div>
						{/* <div className="money-show-tip">差旅费(税率)</div> */}
					</div>
				</div>
				<div className="money-show-c">
					<div className="money-show-i">
						<div className="money-show-num ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.labourCost) + ' (' + rates.labourCostTax + ')') }}>
							{this.turnMoney(data.labourCost)}{' (' + rates.labourCostTax + ')'}
						</div>
						<div className="money-show-tip">人工费(含税)</div>
						{/* <div className="money-show-tip">人工费(税率)</div> */}
					</div>
					<div className="money-show-i specail">
						<div className="money-specail">
							<i className="icon-money"></i>
							<span className="ellipsis p-totalprice" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.LumpSumPrice)) }}>
								{this.turnMoney(data.LumpSumPrice)}
							</span>
						</div>
						<div className="money-show-tip">(含税)</div>
					</div>
				</div>
				<div className="money-show-other-tip">
					<i className="icon-money-tips"></i>
					<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
				</div>
			</div>);
		}
	}
	setHeight() {
		let self = this;
		setTimeout(function () {
			let footerheight = typeof ($('.footer').outerHeight()) != 'undefined' ? $('.footer').outerHeight() : 0;
			let ListHeight = $(window).height() - $(ReactDOM.findDOMNode(self.refs.listWrap)).offset().top - footerheight;
			$(ReactDOM.findDOMNode(self.refs.listWrap)).find('.eps-project-approval-body').css({ 'min-height': (ListHeight - $(ReactDOM.findDOMNode(self.refs.priceWrap)).height()) });
			$(ReactDOM.findDOMNode(self.refs.listWrap)).css({ 'max-height': ListHeight });
		}, 100)
	}
	componentDidMount() {
		NProgress.done();
		if (JWReady == true) {
			jw.setFuncBtns([{ type: 4 }]);
		} else {
			window.EpsEvents.off('jwready:ok').on('jwready:ok', () => {
				jw.setFuncBtns([{ type: 4 }]);
			})
		}
		let dispatch = this.props.dispatch;
		let self = this;
		let eid = userinfo.employee_id;
		let objecttype = this.props.params.objecttype;
		// 设备／工程的餐厅评价有评价项，获取评价项
		if (this.props.location.query.type == '4' && _.indexOf(['equipment', 'project', 'it'], objecttype) != '-1') {
			request('/McdEpsApi/joywok/common/getEvaluate', {
				method: 'POST',
				body: JSON.stringify({
					param: {
						eid: window.eid,
						condition: {
							orderNumber: this.props.params['orderid'],
						}
					}
				})
			}).then(function (resp) {
				window.Evaluate = resp['data']['body'];
			})
		}
		// 获取餐厅评价信息
		console.log('componentDidMount:====', this.props)

		request('/McdEpsApi/joywok/project/getStoreInfo', {
			method: 'POST',
			body: JSON.stringify({
				param: {
					eid: userinfo.employee_id,
					condition: {
						orderNumber: this.props.params.orderid,
					},
					pager: {
						pageNum: 1,
						pageSize: 200 //写200的原因 是想将所有数据取回来，以用来比对税率
					}
				}
			})
		}).then(function (resp) {
			if (resp['data']['success'] == false) {
			} else {
				let data = resp['data']['body'];
				dispatch({
					type: 'approval/changeData',
					payload: {
						list: data['pageInfo']['list'],
						originaldata: data,
						loading: false,
					}
				})
				if (data['createBy']) {
					getUsers(data['createBy'], 'num', function (resp) {
						let userdata = resp['data'][0];
						dispatch({
							type: 'approval/changeData',
							payload: {
								avatar: userdata['avatar'],
								loading: false,
							}
						})
					})
				}
			}
		})
		//打开群聊
		window.onJwNavBtnClick = function (data) {
			if (data['type'] == '4') {
				let modelData = self.props.approval.originaldata;
				console.log('self.props.approval.originaldata:====', self.props.approval.originaldata, modelData.createBy)
				openChart(modelData.createBy, modelData['orderNumber'], '测试')
			}
		}
		// 设置高度
		if (isAndroid()) {
			$(window).resize(function () {
				console.log('window resize')
				self.setHeight();
			});
		}
	}
	// 页面渲染
	render() {
		let self = this;
		let data = this.props.approval;
		console.log('approvalrr', data)
		let objecttype = this.props.params.objecttype;
		// type:供应商或者服务商或者同时都是(supplier,service,all), deviceRoleType
		this.deviceRoleType = data.originaldata.type ? data.originaldata.type : '';
		// 组织显示内容
		if (data.loading.loading) {
			return (<div className="todos-loading">
				<img src="images/loading.gif" />
				<span>加载中</span>
			</div>)
		} else {
			console.log('approval:=========,data list 0 =======', this.props, data['list'][0]);
			// 设置高度
			this.setHeight();
			let headerBox;
			if (typeof (data['list'][0]) == 'object') {
				// 组织审批内容和餐厅确认内容
				if (objecttype == 'equipment') {
					headerBox = (<DeviceCard orderid={this.props.params.orderid} updateDate={encodeURIComponent(this.props.location.query.updateDate)} itemdata={data['list'][0]} deviceRoleType={this.deviceRoleType} animated={false} viewmore={true} />);
					// headerBox = (<DeviceCard orderid={this.props.params.orderid} updateDate={this.props.location.query.updateDate} itemdata={data['list'][0]} deviceRoleType={this.deviceRoleType} animated={false} viewmore={true} />);
				} else if (objecttype == 'project') {
					headerBox = (<ProjectCard orderid={this.props.params.orderid} updateDate={decodeURIComponent(this.props.location.query.updateDate)} itemdata={data['list'][0]} animated={false} viewmore={true} />);
					// headerBox = (<ProjectCard orderid={this.props.params.orderid} updateDate={this.props.location.query.updateDate} itemdata={data['list'][0]} animated={false} viewmore={true} />);
				} else if (objecttype == 'it') {
					headerBox = (<ITCard isTsi={data['originaldata']['isTsi']} orderid={this.props.params.orderid} updateDate={decodeURIComponent(this.props.location.query.updateDate)} itemdata={data['list'][0]} animated={false} viewmore={true} />);
					// headerBox = (<ITCard isTsi={data['originaldata']['isTsi']} orderid={this.props.params.orderid} updateDate={this.props.location.query.updateDate} itemdata={data['list'][0]} animated={false} viewmore={true} />);
				}
			} else {
				headerBox = (<div className="eps-list-card eps-project eps-empty">
					暂无数据
				</div>);
			}

			// 组织价格信息
			let priceInfo;
			if (objecttype == 'equipment') {
				priceInfo = this.equipmentPriceInfo();
			} else if (objecttype == 'project') {
				priceInfo = this.projectPriceInfo();
			} else if (objecttype == 'it') {
				priceInfo = this.itPriceInfo();
			}
			// 组织button
			// 这里按照43小流程号设置流程状态
			let buttons = '',
				project = data['originaldata'],
				strOrderSta = project['orderState'] && orderStatus["project"]['43'][project['orderState']] ? orderStatus["project"]['43'][project['orderState']] : { 'label': '' };
			if (isUnfinishedOrHistory()) {
				buttons = <div className="todo-info-status" onClick={(e) => this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
			} else {
				buttons = (
					<div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-small" onClick={(e) => this.reject(e)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>确认</div>
					</div>
				);
				if (this.props.location.query.type == '4' && _.indexOf(['equipment', 'project', 'it'], objecttype) != '-1') {
					buttons = (
						<div className="eps-btn-wrap">
							<div className="eps-btn eps-btn-default-small" onClick={(e) => this.reject(e)}>拒绝</div>
							<div className="eps-btn eps-btn-warning-large" onClick={(e) => this.EvaluateAgree(e)}>确认</div>
						</div>
					);
				}
			}
			/*let buttons = (
				<div className="eps-btn-wrap">
					<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.reject(e)}>拒绝</div>
					<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.agree(e)}>确认</div>
				</div>
			);
			if(this.props.location.query.type == '4' && _.indexOf(['equipment','project'],objecttype)!='-1'){
				buttons = (
					<div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.reject(e)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.EvaluateAgree(e)}>确认</div>
					</div>
				);
			}*/

			const Item = List.Item;
			let headerinfo = {
				avatar: data.avatar ? data.avatar.avatar_l : 'https://www.joywok.com/public/images/avatar/l.jpg',
				requirementsPerson: data.originaldata.requirementsPerson,
				storeName: data.originaldata.storeName,
				storeNumber: data.originaldata.storeNumber,
				// isTsi: true
				isTsi: data.originaldata.isTsi
			};
			if (data.originaldata && data.originaldata.isTsi == true) {
				headerinfo.vendorName = data.originaldata.vendorName;
			}
			// 将内容组合
			return (
				<div className="eps-nonproject-approval eps-project-approval">
					<header className="header" ref="header">
						<div className="header-bg-specail">
							<div className="header-bg"></div>
							<div className="header-bg-2"></div>
						</div>
						<div className="header-c">
							<HeaderCard orderdata={_.extend({}, headerinfo, {
								fileCount: data['fileCount'] || 0,
								uploadPhaseName: data['uploadPhaseName'] || ''
							})}></HeaderCard>
						</div>
					</header>
					<div className="eps-project-approval-listwrap" ref="listWrap">
						<div className="eps-np-approval-body eps-project-approval-body">
							<div className="eps-box-wrap">
								<div className="eps-box zoomIn">
									{headerBox}
								</div>
							</div>
							<div className="eps-box-wrap eps-box-item zoomIn">
								<div className="eps-box">
									<List className="my-list jw-list">
										<Item extra={data.originaldata.estimatedRoi ? parseFloat(data.originaldata.estimatedRoi).toFixed(2) + '%' : '-'}>预计投资回报率(ROI%)</Item>
										<Item extra={data.originaldata.estimatedIncrease ? parseFloat(data.originaldata.estimatedIncrease).toFixed(2) + ' ¥' : '-'}>预计销售增长总金额</Item>
									</List>
								</div>
							</div>
							<div style={{ display: 'none' }}> 这里可能会增加市场信息list的展示,还有可能引申出二级页面 </div>
						</div>
						<div ref="priceWrap">
							{priceInfo}
						</div>
					</div>
					<footer className="footer">
						<div className="log-btn" onClick={(e) => this.openLog()}>
							<i className="icon-log"></i>
							<span>流程日志</span>
						</div>
						{buttons}
					</footer>
				</div>);
		}
	}
}

function mapStateToProps(state) {
	console.log('state:', state)
	return state
}
export default connect(mapStateToProps)(Approval);