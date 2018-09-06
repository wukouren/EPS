/**
 * It卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { openWebView } from '../../constants';
import { getDict, getDictVal, DataLength } from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';


// 配件操作建议
let fittingOperation = getDict('fittingOperation');
// 设备操作建议
let equipmentOperation = getDict('equipmentOperation');

/*
 * It设备卡片的公共展示部分
 */
class ItCardCommon extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
  NameInfo(name,length){ 
		let len = length?length:8;
		if(DataLength(name)>len){
			AlertInfoBase({
        text: name,
     });
		}   
	}
	render(){
		let self = this;
		let data = this.props.itemdata;
		let typeDescription = data.typeDescription ? (<div className="eps-item-info"><dt><label>型号描述</label></dt><dd><font onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.typeDescription) } } className="eps-name-special ellipsis">{ data.typeDescription }</font></dd></div>) : '';
		// console.log(getDict('equipmentOperation'),"equipmentOperation")
		return (
			<div className="eps-list-card eps-list-itdevice-card">
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>IT设备名称</label></dt><dd><font  onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } } className="ellipsis">{ data.deviceName }</font></dd></div>
					<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font>{ data.categoryCode }</font></dd></div>
				</div>
				<div className="eps-item-info"><dt><label>型号代码</label></dt><dd><font>{ data.typeCode }</font></dd></div>
				{ typeDescription }
			</div>
		)
	}
}

/*
 * 带配件数量的It设备卡片
 */
class ItCardWithParts extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}

	NameInfo(name,length){ 
		let len = length?length:8;
		if(DataLength(name)>len){
			AlertInfoBase({
        text: name,
     });
		}   
	}

	render(){
		let self = this;
		let data = this.props.itemdata;
		// console.log('ItCardWithParts:',data,data.deviceOperate)
		let operateValue = _.findWhere(equipmentOperation,{value:data.deviceOperate})["label"];
		return (
			<div className="eps-list-card">
				<div className="eps-list-inline">
					<div className="eps-list-item" >
						<label>IT设备名称</label>
						<font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( data.name || data.deviceName ) } }>{ data.name || data.deviceName }</font>
					</div>
					<div className="eps-list-item">
						<label>维修描述</label>
						<font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( data.maintenanceRemarks||'无' ) } }>{ data.maintenanceRemarks || '无' }</font>
					</div>
				</div>
				<div className="eps-list-inline">
					<div className="eps-list-item">
						<label>FA Code</label>
						<font>{ data.categoryCode }</font>
					</div>
					<div className="eps-list-item">
						<label>操作建议</label>
						<font>{ operateValue ? operateValue : '无' }</font>
					</div>
				</div>
				<div className="eps-list-inline">
					<div className="eps-list-item">
						<label>型号代码</label>
						<font>{ data.typeCode }</font>
					</div>
					<div className="eps-list-item">
						<label>型号描述</label>
						<font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( data.typeDescription ) } }>{ data.typeDescription }</font>
					</div>
				</div>
				{ data.partsnum ? (<div className="eps-list-item-parts border-line-h before"><i className="icon-parts"></i>该设备包含{data.partsnum}个配件</div>) : ''}
			</div>
		)
	}
}

/**
 * 选择IT设备卡片
 */
export class ItCardSelect extends Component{

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
			<div className="eps-device-card-select eps-list-itdevice-card-wrap animated zoomIn" onClick={ this.selectHandler }>
				<ItCardCommon itemdata={ this.props.itemdata } />
				<div className="checked-btn-wrap" ><i className={ this.props.itemdata.checked==true ? "icon-check-active" : "icon-check-normal"}></i></div>
			</div>
		)
	}

};

/**
 * 选择IT设备卡片
 */
export class ItDeviceCard extends Component{
	NameInfo(name,length){ 
		let len = length?length:3;
		if(DataLength(name)>len){
			AlertInfoBase({
        text: name,
     });
		}   
	}
	render(){
		/*let orderdata = this.props.data && this.props.data.process ? this.props.data && this.props.data.process:{},
				devices = orderdata.pageInfo && orderdata.pageInfo.list ? orderdata.pageInfo.list:[],
				fittings = orderdata.costList?orderdata.costList:[],
				device = devices[0]||{itDeviceName:'',mark:'',faCategory:'',operate:'',mark:'',typeCode:''};
		*/
		// return (<h1>XXX</h1>)
	  let self=this;
		let device = this.props.device,
		fittings = this.props.fittings;
		let equipmentOperation=getDict('equipmentOperation');

		return (<div className="todo-card animated zoomIn">
			<div className="todo-card-c">
				<div className="todo-info todo-info-l-xpadding todo-info-it">
					<div className="todo-info-i border-line-h after">
						<i></i>
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis" >IT设备名称</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.itDeviceName )} }>{device.itDeviceName}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r">维修描述</span>
							<span className="todo-info-val ellipsis">{device.mark||'无'}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label">FA Code</span>
							<span className="todo-info-val ellipsis">{device.faCategory}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r ellipsis">操作建议</span>
							<span className="todo-info-val">{device.operate?getDictVal('equipmentOperation',device.operate):''}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label">型号代码</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.typeNumber )} }>{device.typeNumber}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r">型号描述</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.typeCode )} }>{device.typeCode}</span>
						</div>
					</div>
				</div>
				<div className="todo-fitting">
					{_.map(fittings,function(cost, key){
					  	return (<div className="todo-fitting-i">
						<div className="todo-fitting-info">
							<div className="todo-fitting-title">
								<i></i>
								<span className="todo-info-label" >配件名称</span>
								<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(cost.partsName) } }>{cost.partsName}</span>
							</div>
							<div className="todo-fitting-num">
								<span className="todo-info-label">维修数量</span>
								<span className="todo-info-val">{cost.maintenanceNum}</span>
							</div>
						</div>
						<div className="todo-fitting-info">
							<div className="todo-fitting-msg">
								<span className="todo-info-label">维修描述</span>
								<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(cost.maintenanceRemarks) } }>{cost.maintenanceRemarks||'无'}</span>
							</div>
							<div className="todo-fitting-msg">
								<span className="todo-info-label">操作建议</span>
								<span className="todo-info-val">{cost.operate?getDictVal('fittingOperation',cost.operate):'无'}</span>
							</div>
						</div>
					</div>)
				  })}
				</div>
			</div>
		</div>)
	}
};

/**
 * 已添加IT设备卡片 IT设备卡片显示
 */
export class ItCardListShow extends Component{

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		console.log('ItCardSelect card====',this.props)
		this.selectHandler = this.selectHandler.bind(this);
	}

	selectHandler(){
		typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id']) : '';
	}

	deleteItem(e){
		e.stopPropagation();
		if(confirm("是否确认删除该条记录？")){
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
	  	console.log("点击了确认按钮");
	  	typeof(this.props.onDelete) == 'function' ? this.props.onDelete(this.props.itemdata) : '';
	  }else{
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
		  console.log("点击了取消按钮");
	  }
	}

	componentDidMount(){
		// console.log('ItCardListShow=====componentDidMount============')
		// let height = $(ReactDOM.findDOMNode(this.refs.cardwrap)).height();
		// $(ReactDOM.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
		// 	'margin-top':'0',
		// 	'line-height':(height-20)+'px'
		// })
	}

	openDetail(){
		console.log('odsfposdpfs:====')
		if(this.props.editable == true){
			// 保存即将编辑的IT设备信息
			window.upTabsData('willEditITEquipment','cache',this.props.itemdata)
			// 保存该IT设备下的配件list
			window.upTabsData('willEditITParts','cache',this.props.partslist)
			openWebView('/repairing/maintenance-details/it');
		}
	}
	bindHammer(){
		let self = this;
		setTimeout(()=>{
			let hammertime = new Hammer(ReactDOM.findDOMNode(self.refs.card));
			let card = $(ReactDOM.findDOMNode(self.refs.card));
			let delBtn = ReactDOM.findDOMNode(self.refs.delBtn);
			let btnWidth = $(delBtn).width();
			let cardLeft;
			let isMinus; // 是否负数  true 负数  false 正数
			let cardStartLeft;
			hammertime.on( "panstart", (e)=>{
				console.log('hammertime.on panstart=====')
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
		},200);
	}
	setDelBtnHeight(){
		return;
		// let self = this;
		// setTimeout(()=>{
		// 	let height = $(ReactDOM.findDOMNode(self.refs.cardwrap)).height();
		// 	$(ReactDOM.findDOMNode(self.refs.cardwrap)).find('.eps-swipe-wrap').css({
		// 		'margin-top':'0',
		// 		'line-height':(height-20)+'px'
		// 	})
		// });
	}
	render(){
		this.setDelBtnHeight();
		this.bindHammer();
		// 创建和评估时，IT设备卡片采用展示内容多的这种  2017/10/10日
		// 含配件的卡片
		// if(this.props.itemdata['partsnum']){
			return (
				<div className="eps-device-card-select animated zoomIn" ref="cardwrap" onClick={(e)=>{this.openDetail()}}>
					<div className="eps-swipe-delete" ref="delBtn" onClick={ (e)=>this.deleteItem(e) }><div className="eps-swipe-wrap"><font>删除</font></div></div>
					<ItCardWithParts itemdata={ this.props.itemdata } ref="card"/>
				</div>
			)
		// }else{
		// 	return (
		// 		<div className="eps-device-card-select animated zoomIn" ref="cardwrap" onClick={(e)=>{this.openDetail()}}>
		// 			<div className="eps-swipe-delete" ref="delBtn" onClick={ (e)=>this.deleteItem(e) }><div className="eps-swipe-wrap"><font>删除</font></div></div>
		// 			<ItCardCommon itemdata={ this.props.itemdata } ref="card"/>
		// 		</div>
		// 	)	
		// }
		
	}

};




