/**
 * IT设备配件卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';

/*
 * IT设备配件卡片的公共展示部分
 */
class ItpartsCardCommon extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}

	render(){
		let data = this.props.itemdata;
		console.log('data:========',data);
		console.log('data.showCardIcon:',this.props.showCardIcon)
		return (
			<div className="eps-list-card">
				{ this.props.showCardIcon==true ? (<i className="eps-list-card-bgicon"></i>) : '' }
				<div className="eps-list-item eps-lsparts-item">
					<label>配件名称</label>
					<font className="ellipsis">{ data.name }</font>
				</div>
				<div className="eps-list-item eps-lsparts-item">
					<label>是否固定资产</label>
					<font>{ data.isFa }</font>
				</div>
				<div className="eps-list-item eps-lsparts-item">
					<label>维修价格</label>
					<font>{ data.referencePrice }</font>
				</div>
			</div>
		)
	}
}

/**
 * 选择IT设备配件卡片
 */
export class ItpartsCardSelect extends Component{

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
			<div className="eps-device-card-select itparts-card" onClick={ this.selectHandler }>
				<ItpartsCardCommon itemdata={ this.props.itemdata } />
				<div className="checked-btn-wrap"><i className={ this.props.itemdata.checked==true ? "icon-check-active" : "icon-check-normal"}></i></div>
			</div>
		)
	}

};