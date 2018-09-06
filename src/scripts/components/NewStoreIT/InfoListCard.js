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
			return (
				<div className={this.props.animated == false ? ("eps-list-card eps-project" + indexClass) : ("eps-list-card eps-project animated zoomIn" + indexClass)}>
					{indexhtml}
					<div className="eps-item-info firstline"><dt><label>供应商</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName) }}>{data.vendorName}</font></dd></div>
					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>杂费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice) + ' ¥', 6) }}>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
					</div>
				</div>
			)
			// 供应商 || 既是供应商，又是服务商
		} else {
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
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>采购价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.purchasePrice) + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.num}</span></font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>小计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost) + ' ¥', 6) }}>{this.turnMoney(sumCost)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>杂费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice) + ' ¥', 6) }}>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(data.eqTotalAll) + ' ¥', 6) }}>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div>
					</div>
				</div>
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
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>金额</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
					<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
				</div>
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
		let isTsi = this.props.isTsi;
		// 是否显示书签
		let indexhtml = '';
		let indexClass = '';
		if (this.props.showIndex == true) {
			indexhtml = (<div className="todo-card-index">{this.props.index}/{this.props.total}</div>);
			indexClass = ' eps-bookmark-wrap';
		}
		// isTsi:是否是TSI（tsi：true,直采：false）,
		// Tsi
		if (isTsi) {
			// 小计 设备单价＊设备数量  nonDirectMiningQuantity非直采数量
			let sumCost = data.purchasePrice * data.nonDirectMiningQuantity;
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
						<div className="eps-item-info"><dt><label>采购价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.nonDirectMiningQuantity}</span></font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>小计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.sumCost + ' ¥', 6) }}>{this.turnMoney(sumCost)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>是否直采</label></dt><dd><font className="ellipsis">{'N'}</font></dd></div>
						<div className="eps-item-info"><dt><label>Markup费</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.markupCost + ' ¥', 6) }}>{this.turnMoney(data.markupCost)} ¥</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.lumpSumPrice + ' ¥', 6) }}>{this.turnMoney(data.lumpSumPrice)} ¥</font></dd></div>
					</div>
				</div>
			);
			// 直采
		} else {
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
						<div className="eps-item-info"><dt><label>采购价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
						<div className="eps-item-info"><dt><label>数量</label></dt><dd><font className="ellipsis"><span className="eps-badge">{data.directMiningQuantity}</span></font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>是否直采</label></dt><dd><font className="ellipsis">{'Y'}</font></dd></div>
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.mdcSumCost + ' ¥', 6) }}>{this.turnMoney(data.mdcSumCost)} ¥</font></dd></div>
					</div>
				</div>
			);
		}
	}

};

