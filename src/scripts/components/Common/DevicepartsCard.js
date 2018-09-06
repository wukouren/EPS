/**
 * 设备配件卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';
import { openWebView ,getDict,DataLength} from '../../constants';

/*
 * 设备配件卡片的公共展示部分
 */
class DevicepartsCardCommon extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}

	NameInfo(name){ 
		if(DataLength(name)>10){
			AlertInfoBase({
        text: name,
     });
		}   
  }

	render(){
		let data = this.props.itemdata;
		let self = this;
		console.log('data.showCardIcon:',this.props.showCardIcon)
		return (
			<div className="eps-list-card">
				{ this.props.showCardIcon==true ? (<i className="eps-list-card-bgicon"></i>) : '' }
				<div className="eps-list-item eps-lsparts-item">
					<label>配件名称</label>
					<font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(data["partNameCn"])}}>{ data.partNameCn }</font>
				</div>
				<div className="eps-list-item eps-lsparts-item">
					<label>配件编号</label>
					<font>{ data.partNumber }</font>
				</div>
				<div className="eps-list-item eps-lsparts-item">
					<label>配件固保期</label>
					<font>{ data.warrantyPeriod } { data.warrantyPeriodNuit }</font>
				</div>
				<div className="eps-list-item eps-lsparts-item">
					<label>是否固定资产</label>
					<font>{ data.accessoriesIntoFixedAssets }</font>
				</div>
				<div className="eps-list-item eps-lsparts-item">
					<label>维修价格</label>
					<font>{ data.maintenancePriceNotax }</font>
				</div>
			</div>
		)
	}
}

/**
 * 选择设备配件卡片
 */
export class DevicepartsCardSelect extends Component{

	constructor(props) {
		super(props);
		this.selectHandler = this.selectHandler.bind(this);
	}

	selectHandler(){
		let willbe = !this.props.itemdata.checked;
		typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id'],{ checked: willbe }) : '';
	}

	render(){
		return (
			<div className="eps-device-card-select" onClick={ this.selectHandler }>
				<DevicepartsCardCommon itemdata={ this.props.itemdata } />
				<div className="checked-btn-wrap"><i className={ this.props.itemdata.checked==true ? "icon-check-active" : "icon-check-normal"}></i></div>
			</div>
		)
	}

};