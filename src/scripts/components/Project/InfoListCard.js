/**
 * 项目采购的明细页面卡片
 * 设备卡片
 * 工程卡片
 * IT设备卡片
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { openWebView, getDict, DataLength } from '../../constants';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';

/*
 * 设备卡片
 * 需区分供应商，服务商，或all（同时为供应商和服务商）
 */
export class DeviceCard extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	NameInfo(name, length) {
		let len = length ? length : 8;
		if (DataLength(name) > len) {
			AlertInfoBase({
				text: name,
			});
		}
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	render() {
		let self = this;
		let data = this.props.itemdata;
		console.log('222', data, this.props);
		// 是否显示书签
		let indexhtml = '';
		let indexClass = '';
		if (this.props.showIndex == true) {
			indexhtml = (<div className="todo-card-index">{this.props.index}/{this.props.total}</div>);
			indexClass = ' eps-bookmark-wrap';
		}
		// 服务商
		// purchasePrice：采购单价（服务商没有）
		// taxRate：税率（服务商没有）
		// eqPriceAll：设备总价（服务商没有）
		if (this.props.deviceRoleType == 'service') {
			// alert('1--=service')
			return (
				<div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
					{indexhtml}
					<div className="eps-item-info firstline"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div>
					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					</div>
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>杂费</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥',6) } }>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
					</div> */}
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.num}</span></font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>安装费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installationNotax) + '', 6) }}>{this.turnMoney(data.installationNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>安装费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installation) + '', 6) }}>{this.turnMoney(data.installation)} ({data.installationTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>辅料费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFeeNotax) + '', 6) }}>{this.turnMoney(data.accessoriesFeeNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>辅料费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFee) + '', 6) }}>{this.turnMoney(data.accessoriesFee)} ({data.accessoriesFeeTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>车资(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCostNotax) + '', 6) }}>{this.turnMoney(data.carCostNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>车资(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCost) + '', 6) }}>{this.turnMoney(data.carCost)} ({data.carCostTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>住宿(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCostNotax) + '', 6) }}>{this.turnMoney(data.hotelCostNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>住宿(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCost) + '', 6) }}>{this.turnMoney(data.hotelCost)} ({data.hotelCostTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>其他(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCostNotax) + '', 6) }}>{this.turnMoney(data.otherCostNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>其他(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCost) + '', 6) }}>{this.turnMoney(data.otherCost)} ({data.otherCostTax || '-'})</font></dd></div>
					</div>

					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>安装费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installationNotax) + '(不含税)', 6) }}>{this.turnMoney(data.installationNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.installationTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installation) + '(含税)', 6) }}>{this.turnMoney(data.installation)}(含税)</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>辅料费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFeeNotax) + '(不含税)', 6) }}>{this.turnMoney(data.accessoriesFeeNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.accessoriesFeeTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFee) + '(含税)', 6) }}>{this.turnMoney(data.accessoriesFee)}(含税)</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>车资</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCostNotax) + '(不含税)', 6) }}>{this.turnMoney(data.carCostNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.carCostTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCost) + '(含税)', 6) }}>{this.turnMoney(data.carCost)}(含税)</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>住宿</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCostNotax) + '(不含税)', 6) }}>{this.turnMoney(data.hotelCostNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.hotelCostTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCost) + '(含税)', 6) }}>{this.turnMoney(data.hotelCost)}(含税)</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>其他</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCostNotax) + '(不含税)', 6) }}>{this.turnMoney(data.otherCostNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.otherCostTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCost) + '(含税)', 6) }}>{this.turnMoney(data.otherCost)}(含税)</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>配送费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice) + '(不含税)', 6) }}>{this.turnMoney(data.lumpSumPrice)}(不含税) </font></dd></div>
						<div className="eps-item-info"><dt><label>3%</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll) + '(含税)', 6) }}>{this.turnMoney(data.eqTotalAll)}(含税)</font></dd></div>
					</div> */}

					<div className="eps-item-info flex-two">
						<div><dt className="dt-width"><label>其他费用备注</label></dt></div>
						<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.otherCostRemark) }}>{data.otherCostRemark || '-'}</font></dd></div>
					</div>
					{/* <div className="eps-item-info"><dt className="dt-width"><label>其他费用备注</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.otherCostRemark) }}>{data.otherCostRemark}</font></dd></div> */}
					<div className="eps-item-info flex-two"><div><dt><label>总价(含税)</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice) + ' ¥', 6) }}>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div></div>
				</div>
			)
			// 供应商 || 既是供应商，又是服务商
			//这个是供应商
		} else if (this.props.deviceRoleType == 'supplier') {
			// alert('2supplier--')
			// 小计 设备单价＊设备数量
			let sumCost = data.purchasePrice * data.num;
			return (
				<div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
					{indexhtml}
					<div className="eps-item-info firstline"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div>
					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two"><div><dt className="dt-width"><label>采购价(不含税)</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.purchasePriceNotax) + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div></div>
					<div className="eps-item-info flex-two"><div><dt><label>税金</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.taxes) + ' ¥', 6) }}>{this.turnMoney(data.taxes)} ¥</font></dd></div></div>
					{/* <div className="eps-item-info-inline"> */}
					{/* <div className="eps-item-info"><dt className="dt-width"><label>采购价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.purchasePriceNotax) + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div> */}
					{/* <div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.num}</span></font></dd></div> */}
					{/* </div> */}
					{/* <div className="eps-item-info">sss</div> */}
					<div className="eps-item-info-inline ">
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.num}</span></font></dd></div>
						{/* <div className="eps-item-info"><dt><label>税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.taxes) + ' ¥', 6) }}>{this.turnMoney(data.taxes)} ¥</font></dd></div> */}
					</div>
					{/* <div className="eps-item-info-inline aa" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<div>ddd</div>
						<div>ddd</div>
					</div> */}
					{!self.props.isInfoList && <div className="eps-item-info flex-two"><div><dt><label>价税合计</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.equipmentPrice) + ' ¥', 6) }}>{this.turnMoney(data.equipmentPrice)} ¥</font></dd></div></div>}
					{self.props.isInfoList && <div className="eps-item-info flex-two"><div><dt><label>价税合计</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqPriceAll) + ' ¥', 6) }}>{this.turnMoney(data.eqPriceAll)} ¥</font></dd></div></div>}
					{/* 把下面的杂费换成下面的几种 */}
					<div className="eps-item-info flex-two" >
						<div><dt className="dt-width"><label>配送费(不含税)</label></dt></div>
						<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFeeNotax) + '', 6) }}>{this.turnMoney(data.deliveryFeeNotax)}</font></dd></div>
					</div >
					<div className="eps-item-info flex-two">
						<div><dt className="dt-width"><label>配送费(含税)</label></dt></div>
						<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFee) + '', 6) }}>{this.turnMoney(data.deliveryFee)}({data.deliveryFeeTax || '-'})</font></dd></div>
					</div >
					{/* <div className="eps-item-info-inline">
					<div className="eps-item-info  w60"><dt><label>配送费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFeeNotax) + '(不含税)', 6) }}>{this.turnMoney(data.deliveryFeeNotax)}(不含税)</font></dd></div>
					<div className="eps-item-info  w40"><dt className="width-left"><label>{data.deliveryFeeTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFee) + '(含税)', 6) }}>{this.turnMoney(data.deliveryFee)}(含税)</font></dd></div>
				</div> */}
					<div className="eps-item-info flex-two">
						<div><dt><label>总价(含税)</label></dt></div>
						<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll) + ' ¥', 6) }}>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div>
					</div>
					{/* <div className="eps-item-info"><dt><label>总价(含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll) + ' ¥', 6) }}>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>杂费</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥',6) } }>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll)+' ¥',6) } }>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div>
					</div> */}
				</div >
			)
		} else {
			// alert('all')
			//两个都是
			return (
				< div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)} >
					{indexhtml}
					< div className="eps-item-info firstline" > <dt><label>供应商</label></dt> <dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div >
					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two" >
						<div><dt className="dt-width"><label>采购价(不含税)</label></dt> </div>
						<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.purchasePriceNotax) + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div>
					</div >
					{/* < div className="eps-item-info firstline" > <dt className="dt-width"><label>采购价(不含税)</label></dt> <dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.purchasePriceNotax) + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div > */}
					<div className="eps-item-info flex-two" >
						<div> <dt ><label>税金</label></dt></div>
						<div> <dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.taxes) + ' ¥', 6) }}>{this.turnMoney(data.taxes)} ¥</font></dd></div >
					</div>
					{/* < div className="eps-item-info firstline" > <dt ><label>税金</label></dt> <dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.taxes) + ' ¥', 6) }}>{this.turnMoney(data.taxes)} ¥</font></dd></div > */}
					<div className="eps-item-info-inline">
						{/* <div className="eps-item-info"><dt className="dt-width"><label>采购价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.purchasePriceNotax) + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div> */}
						{/* <div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.num}</span></font></dd></div> */}
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.num}</span></font></dd></div>
					</div>
					{!self.props.isInfoList && <div className="eps-item-info flex-two"><div><dt><label>价税合计</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.equipmentPrice) + ' ¥', 6) }}>{this.turnMoney(data.equipmentPrice)} ¥</font></dd></div></div>}
					{self.props.isInfoList && <div className="eps-item-info flex-two"><div><dt><label>价税合计</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqPriceAll) + ' ¥', 6) }}>{this.turnMoney(data.eqPriceAll)} ¥</font></dd></div></div>}
					{/* 把下面的杂费换成下面的几种 */}

					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>配送费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFeeNotax) + '(不含税)', 6) }}>{this.turnMoney(data.deliveryFeeNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.deliveryFeeTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFee) + '(含税)', 6) }}>{this.turnMoney(data.deliveryFee)}(含税)</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>安装费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installationNotax) + '(不含税)', 6) }}>{this.turnMoney(data.installationNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.installationTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installation) + '(含税)', 6) }}>{this.turnMoney(data.installation)}(含税)</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>辅料费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFeeNotax) + '(不含税)', 6) }}>{this.turnMoney(data.accessoriesFeeNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.accessoriesFeeTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFee) + '(含税)', 6) }}>{this.turnMoney(data.accessoriesFee)}(含税)</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>车资</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCostNotax) + '(不含税)', 6) }}>{this.turnMoney(data.carCostNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.carCostTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCost) + '(含税)', 6) }}>{this.turnMoney(data.carCost)}(含税)</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>住宿</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCostNotax) + '(不含税)', 6) }}>{this.turnMoney(data.hotelCostNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.hotelCostTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCost) + '(含税)', 6) }}>{this.turnMoney(data.hotelCost)}(含税)</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt><label>其他</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCostNotax) + '(不含税)', 6) }}>{this.turnMoney(data.otherCostNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.otherCostTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCost) + '(含税)', 6) }}>{this.turnMoney(data.otherCost)}(含税)</font></dd></div>
					</div> */}
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>配送费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFeeNotax) + '', 6) }}>{this.turnMoney(data.deliveryFeeNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>配送费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.deliveryFee) + '', 6) }}>{this.turnMoney(data.deliveryFee)} ({data.deliveryFeeTax || '-'})</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>安装费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installationNotax) + '', 6) }}>{this.turnMoney(data.installationNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>安装费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.installation) + '', 6) }}>{this.turnMoney(data.installation)} ({data.installationTax || '-'})</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>辅料费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFeeNotax) + '', 6) }}>{this.turnMoney(data.accessoriesFeeNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>辅料费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.accessoriesFee) + '', 6) }}>{this.turnMoney(data.accessoriesFee)} ({data.accessoriesFeeTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>车资(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCostNotax) + '', 6) }}>{this.turnMoney(data.carCostNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>车资(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.carCost) + '', 6) }}>{this.turnMoney(data.carCost)} ({data.carCostTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>住宿(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCostNotax) + '', 6) }}>{this.turnMoney(data.hotelCostNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>住宿(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.hotelCost) + '', 6) }}>{this.turnMoney(data.hotelCost)} ({data.hotelCostTax || '-'})</font></dd></div>
					</div>

					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>其他(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCostNotax) + '', 6) }}>{this.turnMoney(data.otherCostNotax)}</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="dt-width"><label>其他(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCost) + '', 6) }}>{this.turnMoney(data.otherCost)} ({data.otherCostTax || '-'})</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div><dt className="dt-width"><label>其他费用备注</label></dt></div>
						<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.otherCostRemark) }}>{data.otherCostRemark || '-'}</font></dd></div>
					</div>
					{/* <div className="eps-item-info "><dt className="dt-width"><label>其他费用备注</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.otherCostRemark) }}>{data.otherCostRemark}</font></dd></div> */}
					{/* 上面的字段都需要看接口来确认 */}
					<div className="eps-item-info flex-two"><div><dt><label>总价(含税)</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll) + ' ¥', 6) }}>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div></div>
					{/* <div className="eps-item-info-inline">
				<div className="eps-item-info"><dt><label>杂费</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥',6) } }>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
				<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll)+' ¥',6) } }>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div>
			</div> */}
				</div >
			)
		}
	}
}

/**
 * 工程卡片
 */
export class ProjectCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
	}
	NameInfo(name, length) {
		let len = length ? length : 8;
		if (DataLength(name) > len) {
			AlertInfoBase({
				text: name,
			});
		}
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	render(props) {
		let self = this;
		let data = this.props.itemdata;
		// 是否显示书签
		let indexhtml = '';
		let indexClass = '';
		if (this.props.showIndex == true) {
			indexhtml = (<div className="todo-card-index">{this.props.index}/{this.props.total}</div>);
			indexClass = ' eps-bookmark-wrap';
		}
		return (
			<div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
				{indexhtml}
				<div className="eps-item-info"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div>
				<div className="eps-item-info"><dt><label>工程名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
					<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
				</div>
				{/* 新增 */}
				<div className="eps-item-info flex-two"><div><dt className="dt-width"><label>总价(不含税)</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePriceNotax + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div></div>
				<div className="eps-item-info  flex-two"><div><dt><label>工程税率</label></dt></div><div><dd><font className="ellipsis" >{data.taxRate}</font></dd></div></div>
				<div className="eps-item-info  flex-two"><div><dt><label>工程税金</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.taxes + ' ¥', 6) }}>{this.turnMoney(data.taxes)} ¥</font></dd></div></div>
				<div className="eps-item-info  flex-two"><div><dt><label>价税合计</label></dt></div><div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div></div>
				{/* <div className="eps-item-info-inline">
					<div className="eps-item-info"><dt className="dt-width"><label>总价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePriceNotax + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div>
					<div className="eps-item-info"><dt><label>工程税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
				</div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>工程税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.taxes + ' ¥', 6) }}>{this.turnMoney(data.taxes)} ¥</font></dd></div>
					<div className="eps-item-info"><dt><label>价税合计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
				</div> */}
				{/* 都换成一行显示的 */}
				{/* <div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>金额</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.purchasePrice+' ¥',6) } }>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
					<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
				</div> */}
			</div>
		)
	}
};

/**
 * IT设备卡片
 */
export class ITCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
	}
	NameInfo(name, length) {
		console.log('11', length);
		let len = length ? length : 8;
		console.log(name, len, DataLength(name))

		if (DataLength(name) > len) {
			AlertInfoBase({
				text: name,
			});
		}
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	render(props) {
		let self = this;
		let data = this.props.itemdata;
		let isTsi = this.props.isTsi;
		// 是否显示书签
		let indexhtml = '';
		let indexClass = '';
		if (this.props.showIndex == true) {
			indexhtml = (<div className="todo-card-index">{this.props.index}/{this.props.total}</div>);
			indexClass = ' eps-bookmark-wrap';
		}
		let isInfoList = self.props.isInfoList && self.props.isInfoList;
		console.log('rrr', data, '2', isInfoList, '3333', this.props.isTsi);
		if (isTsi) {
			// alert('tsi');
			// alert(isInfoList)
			// 非直采
			// 小计 设备单价＊设备数量  nonDirectMiningQuantity非直采数量
			let sumCost = data.purchasePrice * data.nonDirectMiningQuantity;
			return (
				<div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
					{indexhtml}
					<div className="eps-item-info"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(isInfoList ? data.serviceVendorName : data.vendorName) }}>{isInfoList ? data.serviceVendorName : data.vendorName}</font></dd></div>
					{/* <div className="eps-item-info"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div> */}
					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					</div>
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>是否直采</label></dt><dd><font className="ellipsis">{'N'}</font></dd></div>
					</div> */}
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>直采数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.directMiningQuantity}</span></font></dd></div>
						<div className="eps-item-info"><dt className="width-min"><label>非直采数量 &nbsp;</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.nonDirectMiningQuantity}</span></font></dd></div>
					</div>

					<div className="eps-item-info flex-two"><dt className="width-max"><label>采购价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.tsiEquipmentCostNotax + ' ¥', 6) }}>{this.turnMoney(data.tsiEquipmentCostNotax)} ¥</font></dd></div>
					<div className="eps-item-info  flex-two"><dt className="width-max"><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
					<div className="eps-item-info  flex-two"><dt className="width-max"><label>税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.itTsiTaxes + ' ¥', 6) }}>{this.turnMoney(data.itTsiTaxes)} ¥</font></dd></div>

					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt className="dt-width"><label>采购价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.tsiEquipmentCostNotax + ' ¥', 6) }}>{this.turnMoney(data.tsiEquipmentCostNotax)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis" >{data.taxRate} </font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.itTsiTaxes + ' ¥', 6) }}>{this.turnMoney(data.itTsiTaxes)} ¥</font></dd></div>
					</div> */}
					<div className="eps-item-info  flex-two"><dt className="width-max"><label>设备费用(含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.tsiSumCost + ' ¥', 10) }}>{this.turnMoney(data.tsiSumCost)} ¥</font></dd></div>
					<div className="eps-item-info  flex-two"><dt className="width-max"><label>Markup费用(含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.markupCost + ' ¥') }}>{this.turnMoney(data.markupCost)} ¥</font></dd></div>
					{isInfoList && <div className="eps-item-info  flex-two"><dt className="width-maxs"><label>总价(Markup费用)(含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.lumpSumPrice + ' ¥') }}>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>}
					{!isInfoList && <div className="eps-item-info  flex-two"><dt className="width-maxs"><label>总价(Markup费用)(含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.eqPriceAll + ' ¥') }}>{this.turnMoney(data.eqPriceAll)} ¥</font></dd></div>}

					<div className="eps-item-info flex-two">
						<div ><dt className="width-mmax"><label>特批硬件费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.otherCostNotax) + ' ¥', 6) }}>{this.turnMoney(data.specialExpensesNotax)} ¥</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="width-mmax"><label>特批硬件费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialExpenses) + ' ¥', 6) }}>{this.turnMoney(data.specialExpenses)} ({data.specialExpensesTax || '-'}) ¥</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="width-mmax"><label>特批人工费(不含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialLaborCostsNotax) + ' ¥', 6) }}>{this.turnMoney(data.specialLaborCostsNotax)} ¥</font></dd></div>
					</div>
					<div className="eps-item-info flex-two">
						<div ><dt className="width-mmax"><label>特批人工费(含税)</label></dt></div>
						<div ><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialLaborCosts) + ' ¥', 6) }}>{this.turnMoney(data.specialLaborCosts)} ({data.specialLaborCostsTax || '-'}) ¥</font></dd></div>
					</div>
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info  w60"><dt className="width-max"><label>特批硬件费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialExpensesNotax) + '(不含税)', 6) }}>{this.turnMoney(data.specialExpensesNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info  w40"><dt className="width-left"><label>{data.specialExpensesTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialExpenses) + '(含税)', 6) }}>{this.turnMoney(data.specialExpenses)}(含税)</font></dd></div>
					</div>

					<div className="eps-item-info-inline">
						<div className="eps-item-info w60"><dt className="width-max"><label>特批人工费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialLaborCostsNotax) + '(不含税)', 6) }}>{this.turnMoney(data.specialLaborCostsNotax)}(不含税)</font></dd></div>
						<div className="eps-item-info w40"><dt className="width-left"><label>{data.specialLaborCostsTax}</label></dt><dd><font className="ellipsis margin-left" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.specialLaborCosts) + '(含税)', 6) }}>{this.turnMoney(data.specialLaborCosts)}(含税)</font></dd></div>
					</div> */}
				</div>
				// <div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
				// 	{indexhtml}
				// 	<div className="eps-item-info"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div>
				// 	<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
				// 	<div className="eps-item-info-inline">
				// 		<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
				// 		<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
				// 	</div>
				// 	<div className="eps-item-info-inline">
				// 		<div className="eps-item-info"><dt><label>采购价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
				// 		<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.nonDirectMiningQuantity}</span></font></dd></div>
				// 	</div>
				// 	<div className="eps-item-info-inline">
				// 		<div className="eps-item-info"><dt><label>小计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.sumCost + ' ¥', 6) }}>{this.turnMoney(sumCost)} ¥</font></dd></div>
				// 		<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
				// 	</div>
				// 	<div className="eps-item-info-inline">
				// 		<div className="eps-item-info"><dt><label>是否直采</label></dt><dd><font className="ellipsis">{'N'}</font></dd></div>
				// 		<div className="eps-item-info"><dt><label>Markup费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.markupCost + ' ¥', 6) }}>{this.turnMoney(data.markupCost)} ¥</font></dd></div>
				// 	</div>
				// 	<div className="eps-item-info-inline">
				// 		<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.lumpSumPrice + ' ¥', 6) }}>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
				// 	</div>
				// </div>
			);
			// 直采
		} else {
			// alert('直采')
			return (
				<div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
					{indexhtml}
					<div className="eps-item-info"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div>
					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>是否直采</label></dt><dd><font className="ellipsis">{'Y'}</font></dd></div>
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.directMiningQuantity}</span></font></dd></div>
					</div>

					<div className="eps-item-info flex-two"><dt className="dt-width"><label>采购价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePriceNotax + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div>
					<div className="eps-item-info flex-two"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.itSupplierRate}</font></dd></div>
					<div className="eps-item-info flex-two"><dt><label>税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.itMdcTaxes + ' ¥', 6) }}>{this.turnMoney(data.itMdcTaxes)} ¥</font></dd></div>
					<div className="eps-item-info flex-two"><dt><label>价税合计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.mdcSumCost + ' ¥', 6) }}>{this.turnMoney(data.mdcSumCost)} ¥</font></dd></div>

					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt className="dt-width"><label>采购价(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePriceNotax + ' ¥', 6) }}>{this.turnMoney(data.purchasePriceNotax)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.itSupplierRate}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.itMdcTaxes + ' ¥', 6) }}>{this.turnMoney(data.itMdcTaxes)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>价税合计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.mdcSumCost + ' ¥', 6) }}>{this.turnMoney(data.mdcSumCost)} ¥</font></dd></div>
					</div> */}
					{/* <div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.mdcSumCost + ' ¥', 6) }}>{this.turnMoney(data.mdcSumCost)} ¥</font></dd></div>
					</div> */}
				</div>
			);
		}
	}

};

