import React,{ Component } from 'react';
import { connect } from 'dva';
import { getDict, getDictVal } from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

class TodoCard extends Component{

	NameInfo(name){ 
		console.log('name',name)
		 AlertInfoBase({
				text: name,
		 });
	}
	render(){
		let self=this;
		let orderdata =  this.props.data,
				devices = orderdata.pageInfo && orderdata.pageInfo.list ? orderdata.pageInfo.list:[],
				device = devices[0]||{itDeviceName:'',mark:'',faCategory:'',operate:'',mark:'',typeCode:''};
		// console.log('Marlin 3', this.props)

		let showAllData = this.props.viewmore ? this.props.viewmore : (devices.length>1?true:false); //this.props.showAllData;
		let fittings = [];
		let fittingsHtml = '';
		if( device.itDeviceName!='' && orderdata.costList.length>0){
			fittings = _.filter(orderdata.costList, function(item,key){
									return item['itDeviceNumber'] == device['itDeviceNumber'];
								});
			if(fittings.length>0){ 
				fittingsHtml = (<div className="todo-fitting">
						<div className="border-wrap"><div className="border-line-h before"></div></div>
						{_.map(fittings,function(cost, key){
						  	return (<div className="todo-fitting-i">
							<div className="todo-fitting-info">
								<div className="todo-fitting-title" onClick={()=>self.NameInfo(cost.partsName)}>
									<i></i>
									<span className="todo-info-label" >配件名称</span>
									<span className="todo-info-val ellipsis">{cost.partsName}</span>
								</div>
								<div className="todo-fitting-num">
									<span className="todo-info-label">维修数量</span>
									<span className="todo-info-val">{cost.maintenanceNum}</span>
								</div>
							</div>
							<div className="todo-fitting-info">
								<div className="todo-fitting-msg" onClick={()=>self.NameInfo(cost.maintenanceRemarks)}>
									<span className="todo-info-label">维修描述</span>
									<span className="todo-info-val ellipsis">{cost.maintenanceRemarks}</span>
								</div>
								<div className="todo-fitting-msg">
									<span className="todo-info-label">操作建议</span>
									<span className="todo-info-val">{cost.operate?getDictVal('fittingOperation',cost.operate):''}</span>
								</div>
							</div>
						</div>)
					  })}
					</div>);
			}
		}
		return (<div className="todo-card todo-card-it animated fadeIn">
			<div className="todo-card-c">
				<div className="todo-info todo-info-l-xpadding todo-info-it">
					<div className="todo-info-i border-line-h after">
						<i></i>
						<div className="todo-info-l" onClick={()=>this.NameInfo(device.itDeviceName)}>
							<span className="todo-info-label ellipsis" >IT设备名称</span>
							<span className="todo-info-val ellipsis">{device.itDeviceName}</span>
						</div>
						<div className="todo-info-r" onClick={()=>this.NameInfo(device.mark?device.mark:'无')}>
							<span className="todo-info-label todo-info-label-r ellipsis">维修描述</span>
							<span className="todo-info-val ellipsis">{device.mark?device.mark:'无'}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis">FA Code</span>
							<span className="todo-info-val">{device.faCategory}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label todo-info-label-r ellipsis">操作建议</span>
							<span className="todo-info-val">{device.operate?getDictVal('equipmentOperation',device.operate):''}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis">型号代码</span>
							<span className="todo-info-val">{device.typeNumber}</span>
						</div>
						<div className="todo-info-r" onClick={()=>this.NameInfo(device.typeCode)}>
							<span className="todo-info-label todo-info-label-r ellipsis">型号描述</span>
							<span className="todo-info-val ellipsis">{device.typeCode}</span>
						</div>
					</div>
				</div>
				{ fittingsHtml }
			</div>
			{
				showAllData?<div className="todo-btn border-line-h before  specail-color" onClick={(e)=>this.props.openView(e)}>查看更多设备信息</div>:''
			}
		</div>)
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
};

export default connect((state)=>{return state})(TodoCard);
