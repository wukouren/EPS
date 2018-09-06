/**
 * IT设备明细页面卡片
 */
import React,{ Component } from 'react';
import { getDict, getDictVal, openWebView, DataLength } from '../../constants';
import { AlertInfoBase} from '../Common/EpsModal';

export class InfoCardIT extends Component{
	NameInfo(name,length){ 
		let len = length?length:8;
		if(DataLength(name)>len){
			AlertInfoBase({
        text: name,
     });
		}   
	}
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
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
		let fittingsHtml = '';
		let sumPrice = 0;
		if(fittings.length>0){
			fittingsHtml = (<div className="todo-fitting">
					<div className="border-wrap"><div className="border-line-h before"></div></div>
					{_.map(fittings,function(cost, key){
						// 维修总价，只有保外维修的时候要计算
						let fitPrice = (cost.operate == '2') ? cost.purchasingPrice*cost.maintenanceNum : 0;
						sumPrice += fitPrice;
						let fitRate = getDictVal('taxlist',(cost.rate+''));
						fitRate = (fitRate==0||fitRate=='0') ? '-' : fitRate;
					console.log(cost, fitPrice,'这个里面的数据是什么');
					  	return (<div className="todo-fitting-i">
						<div className="todo-fitting-info">
							<div className="todo-fitting-title">
								<i></i>
								<span className="todo-info-label" >配件名称</span>
								<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(cost.partsName) } }>{cost.partsName}</span>
							</div>
							<div className="todo-fitting-msg">
								<span className="todo-info-label">操作建议</span>
								<span className="todo-info-val">{cost.operate?getDictVal('fittingOperation',cost.operate):''}</span>
							</div>
						</div>
						<div className="todo-fitting-info">
							<div className="todo-fitting-msg">
								<span className="todo-info-label">配件参考价</span>
								<span className="todo-info-val">{self.turnMoney(cost.accessoriesReferencePrice)}</span>
							</div>
							<div className="todo-fitting-num">
								<span className="todo-info-label">维修数量</span>
								<span className="todo-info-val">{cost.maintenanceNum}</span>
							</div>
						</div>
						<div className="todo-fitting-info custom-specail2">
							<span className="todo-info-label">实际维修价格(不含税)</span>
							<span className="todo-info-val ellipsis">{self.turnMoney(cost.purchasingPriceNotax || 0)+' ('+fitRate+')'}</span>
						</div>
						<div className="todo-fitting-info ">
							<div className="todo-fitting-msg">
								<span className="todo-info-label">税金</span>
								<span className="todo-info-val">{self.turnMoney(cost.taxes)}</span>
							</div>
							<div className="todo-fitting-msg">
								<span className="todo-info-label">价税合计</span>
								<span className="todo-info-val">{self.turnMoney(fitPrice)}</span>
							</div>
						</div>
						<div className="todo-fitting-info fitting-info-block">
							<div className="todo-fitting-msg">
								<span className="todo-info-label">固定资产</span>
								<span className="todo-info-val ellipsis">{cost.isFa || '-'}</span>
							</div>
						</div>
						<div className="todo-fitting-info fitting-info-block">
							<div className="todo-fitting-msg">
								<span className="todo-info-label">维修描述</span>
								<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(cost.maintenanceRemarks) } }>{cost.maintenanceRemarks || '无'}</span>
							</div>
						</div>
					</div>)
				  })}
				</div>);
		}
		console.log('dsadasdasdasdasdasdas', sumPrice)
		return (<div className="todo-card todo-card-it zoomIn specail-zhailei">
			<div className="todo-card-index">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
			<div className="todo-card-c">
				<div className="todo-info todo-info-l-xpadding todo-info-it" style={{ 'padding-bottom':'0' }}>
					<div className="todo-info-i todo-info-block border-line-h after">
							<span className="todo-info-label ellipsis" >设备名称</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.itDeviceName )} }>{device.itDeviceName}</span>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label">FA Code</span>
							<span className="todo-info-val ellipsis">{device.faCategory}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r ellipsis">FA Code2</span>
							<span className="todo-info-val">{device.subCategory}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label">型号代码</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.typeNumber )} }>{device.typeNumber || '无'}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r">型号描述</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.typeCode )} }>{device.typeCode || '无'}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis">操作建议</span>
							<span className="todo-info-val">{device.operate?getDictVal('equipmentOperation',device.operate):''}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r">维修描述</span>
							<span className="todo-info-val ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo( device.mark||'无' )} }>{device.mark||'无'}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after specail-item">
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis">总价(含税)</span>
							<span className="todo-info-val ellipsis">{self.turnMoney(sumPrice,6)}</span>
						</div>
					</div>
				</div>
				{ fittingsHtml }
			</div>
		</div>)
	}
};