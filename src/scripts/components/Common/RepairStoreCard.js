/**
 * 供应商卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import { DataLength} from '../../constants';
import { AlertInfoBase} from './EpsModal';

/**
 * 选择供应商卡片
 */
export class RepairStoreCardSelect extends Component{

	constructor(props) {
		super(props);
		this.selectHandler = this.selectHandler.bind(this);
	}
	NameInfo(name){ 
		if(DataLength(name)>12){
			AlertInfoBase({
        text: name,
     });
		}   
  }
	selectHandler(){
		let willbe = !this.props.itemdata.checked;
		typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id'],{ checked: willbe }) : '';
	}

	render(){
		let self = this;
		let itemdata = this.props.itemdata;
		return (
			<div className="eps-device-card-select eps-store-card-select">
				<div className="eps-list-card animated zoomIn" onClick={ this.selectHandler }>
					<div className="eps-item-info"><dt><label>供应商名称</label></dt><dd><font>{ itemdata.vendorName?itemdata.vendorName:'无' }</font></dd></div>
				</div>
			</div>
		)
	}

};






