/**
 * 餐厅卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';

/**
 * 选择餐厅卡片
 */
export class StoreCardSelect extends Component{

	constructor(props) {
		super(props);
		this.selectHandler = this.selectHandler.bind(this);
	}

	selectHandler(){
		let willbe = !this.props.itemdata.checked;
		typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id'],{ checked: willbe }) : '';
	}

	render(){
		let itemdata = this.props.itemdata;
		itemdata.longSiteDesc = (itemdata.longSiteDesc=='' || _.isNull(itemdata.longSiteDesc))?'-':itemdata.longSiteDesc;
		console.log('itemdata.longSiteDesc ['+itemdata.longSiteDesc+']')
		return (
			<div className="eps-device-card-select eps-store-card-select">
				<div className="eps-list-card animated zoomIn" onClick={ this.selectHandler }>
					<div className="eps-item-info"><dt><label>餐厅名称</label></dt><dd><font>{ itemdata.longSiteDesc }</font></dd></div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>餐厅编号</label></dt><dd><font>{ itemdata.usCode }</font></dd></div>
						<div className="eps-item-info"><dt><label>省市</label></dt><dd><font>{ itemdata.provinceNameCn }{ itemdata.cityNameCn }</font></dd></div>
					</div>
				</div>
			</div>
		)
	}

};






