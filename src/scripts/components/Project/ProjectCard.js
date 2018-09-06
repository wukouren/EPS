/**
 * 项目采购的头部卡片
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
		console.log('render DeviceCard:====', data);
		let viewmore = '';
		if (this.props.viewmore == true) {
			viewmore = (<div className="todo-card">
				<div
					className="todo-btn border-line-h before specail-color"
					onClick={(e) => {
						e.stopPropagation();
						openWebView('/project/info-list/equipment/' + this.props.orderid + '?updateDate=' + encodeURIComponent(self.props.updateDate))
						{/* openWebView('/project/info-list/equipment/' + this.props.orderid + '?updateDate=' + self.props.updateDate) */ }
					}}
				>查看更多明细</div>
			</div>);
		}
		// 服务商
		if (this.props.deviceRoleType == 'service') {
			return (
				<div className={this.props.animated == false ? "eps-list-card eps-project" : "eps-list-card eps-project animated zoomIn"}>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName, 6) }}>{data.deviceName}</font></dd></div>
						<div className="eps-item-info"><dt><label>采购数量</label></dt><dd><font className="eps-badge ellipsis">{data.num}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory}</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory}</font></dd></div>
					</div>
					{viewmore}
				</div>
			)
			// 供应商 || 既是供应商，又是服务商
		} else {
			return (
				<div className={this.props.animated == false ? "eps-list-card eps-project" : "eps-list-card eps-project animated zoomIn"}>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName, 6) }}>{data.deviceName}</font></dd></div>
						<div className="eps-item-info"><dt><label>采购数量</label></dt><dd><font className="eps-badge ellipsis">{data.num}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis">{data.taxRate}</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
						<div className="eps-item-info"><dt><label>总价</label></dt><dd><font onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.eqTotalAll)} ¥</font></dd></div>
						{/* 或者改成“价税合计” */}
						{/* <div className="eps-item-info"><dt><label>采购价</label></dt><dd><font onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div> */}
					</div>
					{viewmore}
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
		let viewmore = '';
		if (this.props.viewmore == true) {
			viewmore = (<div className="todo-card">
				<div
					className="todo-btn border-line-h before specail-color"
					onClick={(e) => {
						e.stopPropagation();
						openWebView('/project/info-list/project/' + this.props.orderid + '?updateDate=' + encodeURIComponent(self.props.updateDate))
						{/* openWebView('/project/info-list/project/' + this.props.orderid + '?updateDate=' + self.props.updateDate) */ }
					}} >查看更多明细</div>
			</div>);
		}
		return (
			<div className={this.props.animated == false ? "eps-list-card eps-project" : "eps-list-card eps-project animated zoomIn"}>
				<div className="eps-item-info"><dt><label>工程名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font></dd></div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory ? data.faCategory : '-'}</font></dd></div>
					<div className="eps-item-info"><dt><label>税率</label></dt><dd><font>{data.taxRate ? data.taxRate : '-'}</font></dd></div>
				</div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.subCategory) }}>{data.subCategory ? data.subCategory : '-'}</font></dd></div>
					<div className="eps-item-info"><dt><label>价税合计</label></dt><dd><font onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div>
					{/* <div className="eps-item-info"><dt><label>总价</label></dt><dd><font onClick={(e) => { e.stopPropagation(); self.NameInfo(data.purchasePrice + ' ¥', 6) }}>{this.turnMoney(data.purchasePrice)} ¥</font></dd></div> */}
				</div>
				{viewmore}
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
		let viewmore = '';
		console.log('itttt', this.props);
		if (this.props.viewmore == true) {
			viewmore = (<div className="todo-card">
				<div
					className="todo-btn border-line-h before specail-color"
					onClick={(e) => {
						e.stopPropagation();
						openWebView('/project/info-list/it/' + this.props.orderid + '?updateDate=' + encodeURIComponent(self.props.updateDate))
						{/* openWebView('/project/info-list/it/' + this.props.orderid + '?updateDate=' + self.props.updateDate) */ }
					}} >查看更多明细</div>
			</div>);
		}
		return (
			<div className={this.props.animated == false ? "eps-list-card eps-project" : "eps-list-card eps-project animated zoomIn"}>
				<div className="eps-list-item">
					<label>IT设备名称</label>
					<font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.deviceName) }}>{data.deviceName}</font>
				</div>
				<div className="eps-list-inline">
					<div className="eps-list-item">
						<label>型号代码</label>
						<font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.equipmentType) }}>{data.equipmentType}</font>
					</div>
					<div className="eps-list-item">
						<label>型号描述</label>
						<font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.typeDescription) }}>{data.typeDescription}</font>
					</div>
				</div>
				<div className="eps-list-inline">
					<div className="eps-list-item">
						<label>FA Code</label>
						<font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.faCategory) }}>{data.faCategory}</font>
					</div>
					<div className="eps-list-item">
						<label>{self.props.isTsi ? '设备费用 ' : '价税合计'}</label>
						{/* <label>设备单价</label> */}
						{self.props.isTsi && <font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.tsiSumCost + ' ¥', 4) }}>{this.turnMoney(data.tsiSumCost)} ¥</font>}
						{!self.props.isTsi && <font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.mdcSumCost + ' ¥', 4) }}>{this.turnMoney(data.mdcSumCost)} ¥</font>}
						{/* <font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.mdcSumCost + ' ¥', 4) }}>{this.turnMoney(data.purchasePrice)} ¥</font> */}
					</div>
				</div>
				{viewmore}
			</div>
		)
	}

};

