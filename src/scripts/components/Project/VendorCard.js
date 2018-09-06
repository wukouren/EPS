/**
 * 拆单前 供应商卡片
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import { openWebView, DataLength } from '../../constants';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';
import { InputItem } from 'jw-components-mobile';

/*
 * 供应商卡片展示
 */
export class VendorCardShow extends Component {
	constructor(props) {
		super(props);
		this.state = {}
		this.gotoStoreList = this.gotoStoreList.bind(this);
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
	gotoStoreList() {
		console.log('gotoStoreList=====')
		var url = EpsWebRoot + '/#project/pmstore-list/' + this.props.orderid + '/' + this.props.itemdata['vendorNumber'] + '/' + this.props.itemdata['rpType'];
		jw.pushWebView(url);
	}
	render() {
		let data = this.props.itemdata;
		console.log('dddd55', data);
		let self = this;
		return (
			<div className="eps-device-card-select" onClick={this.gotoStoreList}>
				<div className="eps-list-card ">
					<div className="eps-item-info"><dt><label>供应商名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName, 10) }}>{data.vendorName}</font></dd></div>
					<div className="eps-item-info"><dt><label>供货商类型</label></dt><dd><font className="ellipsis">{data.rpTypeCn}</font></dd></div>
					<div className="eps-item-info"><dt><label>总价(¥)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.price + ' ¥', 6) }}>{this.turnMoney(data.price)} ¥</font></dd></div>
				</div>
			</div>
		)
	}
}


/**
 * 供应商卡片选择
 */
export class VendorCardSelect extends Component {
	constructor(props) {
		super(props);
		this.selectHandler = this.selectHandler.bind(this);
		this.gotoStoreList = this.gotoStoreList.bind(this);
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
	gotoStoreList() {
		console.log('gotoStoreList=====', this.props)
		var url = EpsWebRoot + '/#project/pmstore-list/' + this.props.orderid + '/' + this.props.itemdata['vendorNumber'] + '/' + this.props.itemdata['rpType'];
		jw.pushWebView(url);
	}
	selectHandler() {
		let willbe = !this.props.itemdata.checked;
		this.props.isNotChecked ? '' : (typeof (this.props.selectHandler) == 'function' ? this.props.selectHandler(this.props.itemdata['eps_id'], { checked: willbe }) : '');
		// typeof (this.props.selectHandler) == 'function' ? this.props.selectHandler(this.props.itemdata['eps_id'], { checked: willbe }) : '';
	}
	inputRemark(v) {
		console.log('v:==', v)
		typeof (this.props.changeRefuseRemark) == 'function' ? this.props.changeRefuseRemark(this.props.itemdata['eps_id'], { refuseRemark: v }) : '';
	}
	componentDidMount() {
		let self = this;
		// 安卓兼容 
		if (isAndroid()) {
			let inputItem = $(ReactDOM.findDOMNode(self.refs.markInput));
			let curWrapHeight = inputItem.closest('.eps-device-card-select').height();
			let wrapHeight;
			let inputOffset;
			let footerOffset;
			let wrapOldScrollTop;
			let oldHeight = inputItem.closest('.eps-pmconfirm-body').height();
			let windowHeight = $(window).height();
			$(window).resize(function () {
				if (inputItem.find('input').is(':focus')) {
					setTimeout(() => {
						wrapHeight = inputItem.closest('.eps-pmconfirm-body').height();
						inputOffset = inputItem.offset();
						console.log('inputOffsetL:', inputOffset, 'wrapHeight:', wrapHeight, inputOffset.top > (wrapHeight - 10))
						if (inputOffset.top > (wrapHeight - 10)) {
							wrapOldScrollTop = inputItem.closest('.eps-pmconfirm-body').scrollTop();
							console.log('==========inputItem:=========:::::', wrapOldScrollTop, inputItem.offset().top, wrapOldScrollTop + windowHeight - $(window).height());
							inputItem.closest('.eps-pmconfirm-body').scrollTop(wrapOldScrollTop + windowHeight - $(window).height());
							// inputItem.closest('.eps-pmconfirm-body').scrollTop(wrapOldScrollTop+windowHeight-$(window).height()-curWrapHeight/2);
						}
					}, 0)
				}
			});
		}
	}
	render() {
		let data = this.props.itemdata;
		let self = this;
		return (
			<div className="eps-device-card-select">
				<div className="eps-list-card ">
					<div onClick={this.gotoStoreList}>
						<div className="eps-item-info"><dt><label>供应商名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.vendorName, 10) }}>{data.vendorName}</font></dd></div>
						<div className="eps-item-info"><dt><label>供货商类型</label></dt><dd><font className="ellipsis">{data.rpTypeCn}</font></dd></div>
						{/* 这个确定还是总价，不用改成价税合计（包括设备工程it还有新店it） */}
						<div className="eps-item-info"><dt><label>总价(¥)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(data.price + ' ¥', 6) }}>{this.turnMoney(data.price)} ¥</font></dd></div>
					</div>
					<div className="eps-item-info">
						<InputItem
							ref="markInput"
							className="jw-inline eps-inline"
							value={data.refuseRemark || ''}
							onChange={(v) => self.inputRemark(v)}
							onClick={(e) => { e.stopPropagation() }}
						>拒绝备注</InputItem>
					</div>
				</div>
				<div className="checked-btn-wrap-area"><div className="checked-btn-wrap" onClick={(e) => { e.stopPropagation(); self.selectHandler(); }}><i className={this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal"}></i></div></div>
			</div>
		)
	}

};
