/**
 * 设备卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { openWebView ,getDict,DataLength} from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

let fittingOperation = getDict('fittingOperation'); // 配件操作建议
let equipmentOperation = getDict('equipmentOperation'); // 设备操作建议
/*
 * 设备卡片的公共展示部分
 */
class DeviceCardCommon extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	render(){
		let data = this.props.itemdata;
		console.log('data.showCardIcon:',this.props.showCardIcon)
		/*
			<div className="eps-item-info-inline">
				<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.deviceName }</font></dd></div>
				<div className="eps-item-info"><dt><label>维修商</label></dt><dd><font className="ellipsis">{data["vendorName"]}</font></dd></div>
			</div>
		 */
		return (
			<div className="eps-list-card ">
				{ this.props.showCardIcon==true ? (<i className="eps-list-card-bgicon"></i>) : '' }
				{ this.props.children || ''}
				<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.deviceName }</font></dd></div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>设备型号</label></dt><dd><font className="ellipsis">{ data.equipmentType || '无' }</font></dd></div>
					<div className="eps-item-info"><dt><label>品牌</label></dt><dd><font className="ellipsis">{ data.equipmentBrand || '无' }</font></dd></div>
				</div>
				<div className="eps-item-info"><dt><label>维修商</label></dt><dd><font className="ellipsis">{data["vendorName"]}</font></dd></div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis">{ data.faCategory || data.categoryCode }</font></dd></div>
					<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis">{ data.subCategory || data.subCategoryCode }</font></dd></div>
				</div>
			</div>
		)
	}
}

/**
 * 选择设备卡片
 */
export class DeviceCardSelect extends Component{
	constructor(props) {
		super(props);
		this.selectHandler = this.selectHandler.bind(this);
	}
	selectHandler(){
		let willbe = !this.props.itemdata.checked;
		typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id'],{ checked: willbe }) : '';
	}

	render(){
		console.log('devicecard==========:',this.props.itemdata)
		return (
			<div className="eps-device-card-select" onClick={ this.selectHandler }>
				<DeviceCardCommon itemdata={ this.props.itemdata } />
				<div className="checked-btn-wrap"><i className={ this.props.itemdata.checked==true ? "icon-check-active" : "icon-check-normal"}></i></div>
			</div>
		)
	}

};


/**
 * 已添加设备卡片
 */
export class DeviceCardListShow extends Component{

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		// console.log('DeviceCardSelect card====',this.props)
		this.selectHandler = this.selectHandler.bind(this);
	}

	selectHandler(){
		this.setState({'checked': !this.state.checked});
		typeof(this.props.selectHandler)=='function' ? this.props.selectHandler(this.props.itemdata['id']) : '';
	}

	deleteItem(itemdata){
		// console.log(1111)
		let self=this;
		if(confirm("是否确认删除该条记录？")){
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
	  	self.props.delDeviceItem(itemdata)
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
			'line-height':(height-20)+'px'
		})
		if(this.props.deleteBtnShow != true) return;

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
			deleteBtn = (<div className="eps-swipe-delete" ref="delBtn" onClick={ ()=>this.deleteItem(this.props.itemdata) }><div className="eps-swipe-wrap"><font>删除</font></div></div>);
		}
		return (
			<div className="eps-device-card-select " ref="cardwrap">
				{ deleteBtn }
				<DeviceCardCommon  itemdata={ this.props.itemdata } showCardIcon={ true } ref="card"/>
			</div>
		)
	}

};


//供应商响应卡片

	export class DeviceCardResponse extends Component{
		constructor(props) {
			super(props);
			this.state={}
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
			let self=this;
			return (
				<div className="eps-device-card-select" >
					<div className="eps-list-card ">
						{ this.props.showCardIcon==true ? (<i className="eps-list-card-bgicon"></i>) : '' }
						{ this.props.children || ''}
						<div className="eps-item-info" onClick={()=>self.NameInfo(data.deviceName )}><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.deviceName }</font></dd></div>
						<div className="eps-item-info ellipsis" onClick={()=>self.NameInfo(data["vendorName"])}><dt><label>维修商</label></dt><dd><font className="ellipsis">{data["vendorName"]}</font></dd></div>
						<div className="eps-item-info-inline">
							<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis">{ data.faCategory || data.categoryCode }</font></dd></div>
							<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis">{ data.subCategory || data.subCategoryCode }</font></dd></div>
						</div>
						<div className="eps-item-info"><dt><label>设备ID</label></dt><dd><font className="ellipsis">{data["deviceNumber"]||''}</font></dd></div>
					</div>
				</div>
			)
		}
	}


/**
 * 供应商评估/确认 设备卡片
 */
export class DeviceCardAssess extends Component{

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		console.log('DeviceCardAssess card====',this.props)
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(){
		this.setState({'checked': !this.state.checked});
		typeof(this.props.onClick)=='function' ? this.props.onClick(this.props.itemdata['id']) : '';
	}
	openWebView(data){
		if(this.props.noClick){
			return 
		}
		var url =EpsWebRoot+'/#'+data;
		let datas = this.props.itemdata;
		datas['orderid'] = this.props.orderid;
		console.log(datas,'这个里面有什么数据呢');
		window.upTabsData('details:device:card','cache',datas);
		jw.pushWebView(url);
	}
	//删除设备信息
	deleteItem(itemdata){
		console.log("删除设备信息")
		let self=this;
		if(confirm("是否确认删除该条记录？")){
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
	  	self.props.delDeviceItem(itemdata)
	  }
	  else{
			$(ReactDOM.findDOMNode(this.refs.card)).animate({left: 0},'100');
		  console.log("点击了取消按钮");
	  }
	}
  componentDidUpdate(){
		let height = $(ReactDOM.findDOMNode(this.refs.cardwrap)).height();
		
		$(ReactDOM.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
			'margin-top':'0',
			'line-height':(height)+'px'
		})
	}
	//组件加载完毕
	componentDidMount(){
		let height = $(ReactDOM.findDOMNode(this.refs.cardwrap)).height();
		
		$(ReactDOM.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
			'margin-top':'0',
			'line-height':(height)+'px'
		})
		if(this.props.deleteBtnShow != true) return;

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
	NameInfo(name){ 
	  AlertInfoBase({
			text: name,
		});
	}
	render(props){
		let data = this.props.itemdata;
		let orderid = this.props.orderid;
		let deviceid =data['id'];
		let deleteBtn = '',
				self = this;
		if(this.props.deleteBtnShow == true){
			deleteBtn = (<div className="eps-swipe-delete" ref="delBtn" onClick={ ()=>this.deleteItem(this.props.itemdata) }><div className="eps-swipe-wrap"><font>删除</font></div></div>);
		}
		console.log(data,'单条的信息','设置的总数据');
		if(typeof (this.props.showMore)!='undefined'){
			//订单详情部分
			console.log("123")
			let maintainer = '';
			if(data.maintainer != false){
				maintainer = (<div className="eps-item-info"  onClick={(e)=>{ e.stopPropagation();self.NameInfo(data["vendorName"])}}>
								<dt><label>维修商</label></dt><dd className="ellipsis" ><font className="ellipsis" title={data["vendorName"]}>{data["vendorName"]}</font></dd>
							</div>);
			}

			let deviceOperate = data['deviceOperate']?_.findWhere(equipmentOperation,{value:data.deviceOperate})["label"]:'-'
			return (
				<div className="eps-device-card-select" onClick={(e)=>this.openWebView('/repairing/maintenance-details/equipment/'+orderid+'/'+deviceid)}>
					<div className={ this.props.animated==false ? "eps-list-card" : "eps-list-card animated zoom" }>
						{ this.props.showCardIcon==false ? '' : (<i className="eps-list-card-bgicon"></i>) }
						{ this.props.children }
						<div className="eps-item-info-inline">
							<div className="eps-item-info" onClick={(e)=>{ e.stopPropagation();self.NameInfo(data.name)}}><dt><label>设备名称</label></dt><dd><font className="ellipsis eps-swipe-wrap">{ data.name }</font></dd></div>
							<div className="eps-item-info" onClick={(e)=>{ e.stopPropagation();self.NameInfo(data["deviceSerialNumber"] || "-")}}><dt><label>序列号</label></dt><dd><font className="ellipsis" title={data["deviceSerialNumber"]}>{data["deviceSerialNumber"] || "-"}</font></dd></div>
						</div>
						<div className="eps-item-info-inline">
							<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font>{ data.faCategory }</font></dd></div>
							<div className="eps-item-info"><dt><label>操作建议</label></dt><dd><font>{deviceOperate}</font></dd></div>
						</div>
						<div className="eps-item-info-inline">
							<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font>{ data.subCategory }</font></dd></div>
							{ maintainer }
						</div>
						<div className="eps-item-info-inline">
							<div className="eps-item-info">
								<dt><label>维修数量</label></dt>
								<dd>{data['repairnum']?<font className="eps-badge">{data['repairnum']}</font>:<font>-</font>
								}</dd>
							</div>
							<div className="eps-item-info" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceMark) } }>
								<dt><label>维修描述</label></dt>
								<dd><font className="ellipsis" >{data['deviceMark']}</font></dd>
							</div>
						</div>
						{ data.deviceList && data.deviceList.length!=0 ? (<div className="eps-list-item-parts border-line-h before"><i className="icon-parts"></i>该设备包含{data.deviceList.length}个配件</div>) : ''}
					</div>
				</div>
			)
		}else{
			console.log("走这里了吗?")
			/*
			if( (data.deviceList && data.deviceList.length!=0)||data.deviceSerialNumber||data.repairnum){
				//左边的图设备维修单
				console.log("bfiwyqbtrwueitvgverw:确认一下是不是走这里了？")
				let maintainer = '';
				if(data.maintainer != false){
					maintainer = (<div className="eps-item-info">
						<dt><label>维修商</label></dt><dd><font className="ellipsis" title={data["vendorName"]}>{data["vendorName"]}</font></dd>
					</div>);
				}
				let deviceOperate = data['deviceOperate']?_.findWhere(equipmentOperation,{value:data.deviceOperate})["label"]:'-'
				return (
				 <div className="eps-device-evaluation-list" ref="cardwrap">
						{ deleteBtn }
					<div className="eps-device-card-select" ref="card" onClick={(e)=>this.openWebView('/repairing/maintenance-details/equipment/'+orderid+'/'+deviceid)}>
						<div className={ this.props.animated==false ? "eps-list-card" : "eps-list-card animated zoom" }>
							{ this.props.showCardIcon==false ? '' : (<i className="eps-list-card-bgicon"></i>) }
							{ this.props.children }
							<div className="eps-item-info-inline">
								<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.name?data.name:"" }</font></dd></div>
								<div className="eps-item-info"><dt><label>序列号</label></dt><dd><font className="ellipsis" title={data["deviceSerialNumber"]}>{data["deviceSerialNumber"] || "-"}</font></dd></div>
							</div>
							<div className="eps-item-info-inline">
								<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font>{ data.faCategory }</font></dd></div>
								<div className="eps-item-info"><dt><label>操作建议</label></dt><dd><font>{deviceOperate}</font></dd></div>
							</div>
							<div className="eps-item-info-inline">
								<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font>{ data.subCategory }</font></dd></div>
								{ maintainer }
							</div>
							<div className="eps-item-info-inline">
								<div className="eps-item-info"><dt><label>维修数量</label></dt><dd>{
									data['repairnum']?<font className="eps-badge">{data['repairnum']}</font>:<font>-</font>
								}</dd></div>
								<div className="eps-item-info"><dt><label>维修描述</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceMark) } }>{data['deviceMark']}</font></dd></div>
							</div>
							{ data.deviceList && data.deviceList.length!=0 ? (<div className="eps-list-item-parts border-line-h before"><i className="icon-parts"></i>该设备包含{data.deviceList.length}个配件</div>) : ''}
						</div>
					</div>
				 </div>
				)
			}else{
			*/
				return (
					<div className="eps-device-evaluation-list" ref="cardwrap">
						{ deleteBtn }
						<div className="eps-device-card-select" ref="card" onClick={(e)=>this.openWebView('/repairing/maintenance-details/equipment/'+orderid+'/'+deviceid)} >

						 <div className="eps-list-card ">
							{ this.props.showCardIcon==true ? (<i className="eps-list-card-bgicon"></i>) : '' }
							{ this.props.children || ''}
							
							<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.deviceName }</font></dd></div>
							<div className="eps-item-info"><dt><label>维修商</label></dt><dd onClick={(e)=>{ e.stopPropagation();self.NameInfo(data["vendorName"])}}><font className="ellipsis">{data["vendorName"]}</font></dd></div>
							<div className="eps-item-info-inline">
								<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis">{ data.faCategory || data.categoryCode }</font></dd></div>
								<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis">{ data.subCategory || data.subCategoryCode }</font></dd></div>
							</div>
							<div className="eps-item-info"><dt><label>设备ID</label></dt><dd><font className="ellipsis">{data["deviceNumber"]}</font></dd></div>
						</div>
					 </div>
					</div>
				)
			// }
		}
	}

};


/**
 * 供应商评估/确认 IT设备卡片
 */
export class DeviceCardAssessToIT extends Component{

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(){
		this.setState({'checked': !this.state.checked});
		typeof(this.props.onClick)=='function' ? this.props.onClick(this.props.itemdata['id']) : '';
	}

	NameInfo(name){ 
		 AlertInfoBase({
				text: name,
		 });
	}

	render(props){
		let self = this;
		let data = this.props.itemdata;
		let deviceOperate;
		console.log('render=======:',data)
		if(data['deviceOperate'] && data['deviceOperate']!='-1'){
			deviceOperate = data['deviceOperate']?equipmentOperation[data['deviceOperate']]['label']:'';
		}else{
			deviceOperate = '无';
		}
		// console.log('render=======:'+deviceOperate)
		return (
			<div className="eps-device-card-select">
				<div className={ this.props.animated==false ? "eps-list-card" : "eps-list-card animated zoomIn" }>
					{ this.props.showCardIcon==false ? '' : (<i className="eps-list-card-bgicon"></i>) }
					{ this.props.children }
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>{ data.deviceName }</font></dd></div>
						<div className="eps-item-info"><dt><label>序列号</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceCode) } }>{ data.deviceCode }</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font>{ data.categoryCode }</font></dd></div>
						<div className="eps-item-info"><dt><label>操作建议</label></dt><dd><font>{ deviceOperate }</font></dd></div>
					</div>
					<div className="eps-item-info-inline">
						<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font>{ data.subCategoryCode }</font></dd></div>
						<div className="eps-item-info"><dt><label>维修描述</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.maintenanceRemarks) } }>{ data.maintenanceRemarks }</font></dd></div>
					</div>
					{ this.props.showpartsnum==false ? '' : ( data.partsnum ? (<div className="eps-list-item-parts border-line-h before"><i className="icon-parts"></i>该设备包含{data.partsnum}个配件</div>) : '')}
				</div>
			</div>
		)
	}

};

/*
* 审批需要的卡片
* */

export class DeviceCardMore extends Component{

	constructor(props) {
		super(props);
		this.state = {
			checked: false
		}
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(){
		this.setState({'checked': !this.state.checked});
		typeof(this.props.onClick)=='function' ? this.props.onClick(this.props.itemdata['id']) : '';
	}

	render(){
		let data = this.props.itemdata;
		let showAllData = this.props.showAllData;
		return (
			<div className="eps-device-card-select">
				<div className={ this.props.animated==false ? "eps-list-card" : "eps-list-card animated zoomIn" }>
					{ this.props.showCardIcon==false ? '' : (<i className="eps-list-card-bgicon"></i>) }
					<div className="eps-list-inline device-assess">
						<div className="eps-list-item">
							<label>设备名称</label>
							<font>{ data.name }</font>
						</div>
						<div className="eps-list-item">
							<label>设备序列号</label>
							<font>96731</font>
						</div>
					</div>
					<div className="eps-list-inline device-assess">
						<div className="eps-list-item">
							<label>FA Code</label>
							<font>{ data.facode }</font>
						</div>
						<div className="eps-list-item">
							<label>操作建议</label>
							<font>保内维修</font>
						</div>
					</div>
					<div className="eps-list-inline device-assess">
						<div className="eps-list-item">
							<label>FA Code2</label>
							<font>{ data.facode2 }</font>
						</div>
						<div className="eps-list-item">
							<label>维修商</label>
							<font>维修商A</font>
						</div>
					</div>
					{
						showAllData?<div className="eps-list-item-parts border-line-h before specail-color" onClick={(e)=>this.props.openView(e)}>查看更多设备信息</div>:''
					}
				</div>
			</div>
		)
	}

};