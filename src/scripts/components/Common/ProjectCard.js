/**
 * 工程卡片
 */
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { connect } from 'dva';
import { getDict,getDictVal } from './../../constants';

import {AlertInfoBase} from '../../components/Common/EpsModal';
let ProjectOperate = getDict('equipmentOperation');
/*
 * 工程卡片的公共展示部分
 */
class ProjectCardCommon extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	render(){
		let data = this.props.itemdata;
		return (
			<div className="eps-list-card">
				<div className="eps-list-item">
					<label>工程名称</label>
					<font>{ data.projectName }</font>
				</div>
				<div className="eps-list-inline">
					<div className="eps-list-item">
						<label>FA Code</label>
						<font>{ data.categoryCode }</font>
					</div>
					<div className="eps-list-item">
						<label>FA Code2</label>
						<font>{ data.subCategoryCode }</font>
					</div>
				</div>
			</div>
		)
	}
}

/**
 * 选择工程卡片
 */
export class ProjectCardSelect extends Component{

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
			<div className="eps-device-card-select eps-project-card" onClick={ this.selectHandler }>
				<ProjectCardCommon itemdata={ this.props.itemdata } />
				<div className="checked-btn-wrap"><i className={ this.props.itemdata.checked==true ? "icon-check-active" : "icon-check-normal"}></i></div>
			</div>
		)
	}

};


/**
 * 已添加工程卡片 工程卡片展示
 */
export class ProjectCardListShow extends Component{

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
	}
	deleteItem(){
		if(confirm("是否确认删除该条记录？")){
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
			if(typeof(this.props.removeItem) == 'function'){
				this.props.removeItem(this.props.itemdata);
			}
	  	console.log("点击了确认按钮");
	  }
	  else{
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
		  console.log("点击了取消按钮");
	  }
	}

	componentDidMount(){
		let height = $(ReactDOM.findDOMNode(this.refs.cardwrap)).height();
		$(ReactDOM.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
			'margin-top':'0',
			// 'line-height':(height-20)+'px'
		})

		if(this.props.deleteBtnShow != true) return;
		// 显示删除按钮时才绑定hammer事件
		let hammertime = new Hammer(ReactDOM.findDOMNode(this.refs.card));
		let card = $(ReactDOM.findDOMNode(this.refs.card));
		let delBtn = ReactDOM.findDOMNode(this.refs.delBtn);
		let btnWidth = $(delBtn).width();
		let cardLeft;
		let isMinus; // 是否负数  true 负数  false 正数
		let cardStartLeft;
		hammertime.on( "panstart", (e)=>{
			cardStartLeft = card.offset().left;
		})
		// hammertime.on( "pan", (e)=>{
		// 	isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
		// 	cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
		// 	cardLeft = cardLeft > 0 ? 0 : cardLeft;
		// 	card.css({left:cardLeft});
		// 	console.log(e.deltaX,btnWidth);
		// })
		hammertime.on('panleft',(e)=>{
			card.stop().animate({left:-btnWidth+'px'},200);
		})
		hammertime.on('panright',(e)=>{
			card.stop().animate({left:'0px'},200);
		})
	}

	render(){
		let deleteBtn = '';
		if(this.props.deleteBtnShow == true){
			deleteBtn = (<div className="eps-swipe-delete" ref="delBtn" onClick={ (e)=>this.deleteItem(e) }><div className="eps-swipe-wrap"><font>删除</font></div></div>);
		}
		return (
			<div className="eps-device-card-select eps-project-card" ref="cardwrap">
				{ deleteBtn }
				<i className="eps-list-card-bgicon"></i>
				<ProjectCardCommon itemdata={ this.props.itemdata } showCardIcon={ true } ref="card"/>
			</div>
		)
	}
};



/*
* 审批需要的卡片
* */

export class ProjectCardMore extends Component{
	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		// console.log('ProjectCardAssess card====',this.props)
		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(){
		this.setState({'checked': !this.state.checked});
		typeof(this.props.onClick)=='function' ? this.props.onClick(this.props.itemdata['id']) : '';
	}
	render(){
		let data = this.props.itemdata;
		let showAllData = this.props.showAllData;
		console.log(data,'Marlin 1 这个里面卡片的样式是什么呢',ProjectOperate);
		let str_operate = data['operate']?getDictVal('fittingOperation',data['operate']):' - ';
    console.log('Marlin 2');
		return (
			<div className="eps-device-card-select eps-device-card-select-specail">
				<div className={ this.props.animated==false ? "eps-list-card" : "eps-list-card animated zoomIn" }>
					{ this.props.showCardIcon==false ? '' : (<i className="eps-list-card-bgicon"></i>) }
					{this._init_name()}
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis">{ data.faCategory }</font></dd></div>
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis">{ data.subCategory }</font></dd></div>
					</div>
					{
						data['operate']!=-1?<div className="eps-item-info"><dt><label>建议操作</label></dt><dd><font className="ellipsis">{ str_operate }</font></dd></div>:''
					}
					{
						showAllData?<div className="eps-list-item-parts border-line-h before specail-color" onClick={(e)=>this.props.openView(e)}>查看更多工程信息</div>:''
					}
				</div>
			</div>
		)
	}
	_init_name(){
		let data = this.props.itemdata;
		if(data["totalMaintenanceCost"]){
			return <div className="eps-item-info-inline">
				<div className="eps-item-info"><dt><label>工程名称</label></dt><dd><font className="ellipsis">{ data.name }</font></dd></div>
				<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis">{Number(data["totalMaintenanceCost"]).formatMoney(2,'','')}</font></dd></div>
			</div>
		}else{
			return <div className="eps-item-info"><dt><label>工程名称</label></dt><dd><font className="ellipsis">{ data.name }</font></dd></div>
		}
	}
};


export class ProjectCardInfo extends Component{
	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		// console.log('ProjectCardAssess card====',this.props)
		this.clickHandler = this.clickHandler.bind(this);
	}
	NameInfo(name){
		let data = this.props.itemdata;
		let incidentalList = this.props.incidentalList;
		if(name == '1'){
			name = Number(incidentalList["materialCost"]).formatMoney(2,'','')+'('+(incidentalList["materialCostTax"] || '-')+')'
		}
		if(name == '2'){
			name = Number(incidentalList["installationFee"]).formatMoney(2,'','')+'('+(incidentalList["installationFeeRate"] || '-')+')'
		}
		if(name == '3'){
			name = Number(incidentalList["carCost"]).formatMoney(2,'','')+'('+(incidentalList["carCostTax"] || '-')+')'
		}
		if(name == '4'){
			name = Number(incidentalList["hotelCost"]).formatMoney(2,'','')+'('+(incidentalList["hotelCostTax"] || '-')+')'
		}
		if(name == '5'){
			name = Number(incidentalList["testCost"]).formatMoney(2,'','')+'('+(incidentalList["testCostTax"] || '-')+')'
		}
		if(name == '6'){
			name = Number(incidentalList["distributionCost"]).formatMoney(2,'','')+'('+(incidentalList["distributionCostRate"] || '-')+')'
		}
		if(name == '7'){
			name = Number(incidentalList["highCost"]).formatMoney(2,'','')+'('+(incidentalList["highCostTax"] || '-')+')'
		}
		if(name == '8'){
			name = Number(incidentalList["otherCost"]).formatMoney(2,'','')+'('+(incidentalList["otherCostTax"] || '-')+')'
		}
    if(name == '9'){
      name = incidentalList["otherCostRemark"];
    }

	  // if(DataLength(name)>10){
		AlertInfoBase({
      text: name,
    });
		// }   
	}
	clickHandler(){
		this.setState({'checked': !this.state.checked});
		typeof(this.props.onClick)=='function' ? this.props.onClick(this.props.itemdata['id']) : '';
	}
	render(){
		let self = this;
		let data = this.props.itemdata;
		let showAllData = this.props.showAllData;
		let incidentalList = this.props.incidentalList;
		console.log(data,incidentalList,'这个里面有什么呢');
		let label = ProjectOperate[parseInt(data['operate'])]['label'];
		let allMoney =0;
		allMoney+=(Number(incidentalList['materialCost'])+Number(incidentalList['installationFee'])+Number(incidentalList['carCost'])+Number(incidentalList['hotelCost'])+Number(incidentalList['testCost'])+Number(incidentalList['distributionCost'])+Number(incidentalList['highCost'])+Number(incidentalList['otherCost']))

		// let Tax = '';
		// Tax = incidentalList["materialCostTax"];
		// Tax = (?'-')

		return (
			<div className="todo-card zoomIn specail-zhailei">
				<div className="todo-card-index">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
        <div className="todo-card-c">
          <div className="todo-info">
            <div className="todo-info-i border-line-h after specail">
              <div className="todo-info-l">
                <span className="todo-info-label ellipsis">工程名称</span>
                <span className="todo-info-val ellipsis">{data["name"]}</span>
              </div>
            </div>
            <div className="todo-info-i border-line-h after">
              <div className="todo-info-l">
                <span className="todo-info-label ellipsis">FA Code</span>
                <span className="todo-info-val ellipsis">{ data.faCategory }</span>
              </div>
              <div className="todo-info-l">
                <span className="todo-info-label ellipsis">FA Code2</span>
                <span className="todo-info-val ellipsis">{ data.subCategory }</span>
              </div>
            </div>
            <div className="todo-info-i border-line-h after">
              <div className="todo-info-l">
                <span className="todo-info-label ellipsis">操作建议</span>
                <span className="todo-info-val ellipsis">{label}</span>
              </div>
            </div>
            <div className="todo-info-i todo-info-money">
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">材料费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["materialCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["materialCostTax"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["materialCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">人工费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["installationFeeNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["installationFeeRate"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["installationFee"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">交通费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["carCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["carCostTax"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["carCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">住宿费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["hotelCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["hotelCostTax"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["hotelCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">检测费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["testCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["testCostTax"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["testCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">运输费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["distributionCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["distributionCostRate"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["distributionCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">登高费</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["highCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["highCostTax"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["highCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">其他费用</div>
            		<div className="todo-info-money-i-l-val">
            			<span class="ellipsis"> {Number(incidentalList["otherCostNotax"] || 0).formatMoney(2,'','')}(不含税)</span>
            			<span class="ellipsis">{incidentalList["otherCostTax"] || '-'}</span>
            			<span class="ellipsis">{Number(incidentalList["otherCost"]).formatMoney(2,'','')}(含税)</span>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail">
            		<div className="todo-info-money-i-l">
            			<div className="todo-info-money-i-l-label">其他费用备注</div>
            			<div className="todo-info-money-i-l-value ellipsis" onClick={()=>self.NameInfo(9)}>{incidentalList["otherCostRemark"]}</div>
            		</div>
            	</div>
            	<div className="todo-info-money-i specail-item">
            		<div className="todo-info-money-i-l-label">总价(含税)</div>
            		<div className="todo-info-money-i-l-val">
            			{Number(allMoney).formatMoney(2,'','')}
            		</div>
            	</div>
            </div>
          </div>
        </div>
      </div>
		)
	}
	_init_name(){
		let data = this.props.itemdata;
		if(data["totalMaintenanceCost"]){
			return <div className="eps-item-info-inline">
				<div className="eps-item-info"><dt><label>工程名称</label></dt><dd><font className="ellipsis">{ data.name }</font></dd></div>
				<div className="eps-item-info"><dt><label>总价</label></dt><dd><font className="ellipsis">{Number(data["totalMaintenanceCost"]).formatMoney(2,'','')}</font></dd></div>
			</div>
		}else{
			return <div className="eps-item-info"><dt><label>工程名称</label></dt><dd><font className="ellipsis">{ data.name }</font></dd></div>
		}
	}
}
