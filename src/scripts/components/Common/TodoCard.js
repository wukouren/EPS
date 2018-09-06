import React,{ Component } from 'react';
import { connect } from 'dva';
import { getDict, getDictVal,DataLength } from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

let fittingOperation = getDict('fittingOperation');
let equipmentOperation = getDict('equipmentOperation');
 console.log(equipmentOperation,"equipmentOperation")
class TodoCard extends Component{
  constructor(props){
		super(props);
		this.state = {
			visible:false,
		}
	}
	operationType(type){
		if(type){
			return _.filter(fittingOperation,function(item){return item.label==type})[0]['value'];
		}else{
			return '';
		}
	}
	equipmentType(type){
		if(type){
				return _.filter(equipmentOperation,function(item){return item.label==type})[0]['value'];
		}else{
			 return '';
		}
	}
	NameInfo(name){ 
		 if(DataLength(name)>10){
				AlertInfoBase({
	        text: name,
	     });
			}   
	}
	render(){
		let devicedata = this.props.devicedata;
		let showAllData = this.props.showAllData;
		let deviceDetailInfo=this.props.deviceDetailInfo;
		console.log(devicedata,'devicedata')
		let self=this;
		let partHtml='';
		let btn='';
		if(deviceDetailInfo&&devicedata.partList.length>0){
			console.log(1111)
			 partHtml=_.map(devicedata.partList,function(item){
							return <div className="todo-fitting">
								<div className="todo-fitting-i">
									<div className="todo-fitting-info">
										<div className="todo-fitting-title" onClick={()=>self.NameInfo(item.partName)}>
											<i></i>
											<span className="todo-info-label">配件名称</span>
											<span className="todo-info-val ellipsis">{item.partName}</span>
										</div>
										<div className="todo-fitting-num">
											<span className="todo-info-label">维修数量</span>
											<span className="todo-info-val">{item.maintenanceNum}</span>
										</div>
									</div>
									<div className="todo-fitting-info">
										<div className="todo-fitting-msg" onClick={()=>self.NameInfo(item.mark)}>
											<span className="todo-info-label">维修描述</span>
											<span className="todo-info-val ellipsis">{item.mark?item.mark:'无'}</span>
										</div>
										<div className="todo-fitting-msg">
											<span className="todo-info-label">操作建议</span>
											<span className="todo-info-val">{item.operate?getDictVal('fittingOperation',item.operate):'无'}</span>
										</div>
									</div>
								</div>
							</div>
					})
			 partHtml = ''
		}else if((!deviceDetailInfo)&&devicedata.partList.length>0){

			let item=devicedata.partList[0];
			console.log(item,"item")
			partHtml= <div className="todo-fitting">
								<div className="todo-fitting-i">
									<div className="todo-fitting-info">
										<div className="todo-fitting-title" onClick={()=>self.NameInfo(item.partName)}>
											<i></i>
											<span className="todo-info-label">配件名称</span>
											<span className="todo-info-val ellipsis">{item.partName}</span>
										</div>
										<div className="todo-fitting-num">
											<span className="todo-info-label">维修数量</span>
											<span className="todo-info-val">{item.maintenanceNum}</span>
										</div>
									</div>
									<div className="todo-fitting-info">
										<div className="todo-fitting-msg" onClick={()=>self.NameInfo(item.mark)}>
											<span className="todo-info-label">维修描述</span>
											<span className="todo-info-val ellipsis">{item.mark?item.mark:'无'}</span>
										</div>
										<div className="todo-fitting-msg">
											<span className="todo-info-label">操作建议</span>
											<span className="todo-info-val">{item.operate?getDictVal('fittingOperation',item.operate):'无'}</span>
										</div>
									</div>
								</div>
							</div>;
			partHtml = ''
			btn=<div className="todo-btn showLine specail-color" onClick={(e)=>this.props.openView('/repairing/equipment-info/')}>查看更多设备信息</div>

		}else{
			partHtml='';
			btn=<div className="todo-btn specail-color" onClick={(e)=>this.props.openView('/repairing/equipment-info/')}>查看更多设备信息</div>
		}
		return (<div className="todo-card  zoomIn">
			<div className="todo-card-c">
				<div className="todo-info">
					<div className="todo-info-i border-line-h after">
						<i></i>
						<div className="todo-info-l" onClick={()=>this.NameInfo(devicedata.deviceName)}>
							<span className="todo-info-label ellipsis" >设备名称</span>
							<span className="todo-info-val ellipsis">{devicedata.deviceName}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label ellipsis">序列号</span>
							<span className="todo-info-val ellipsis">{devicedata.deviceSerialNumber}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis">FA Code</span>
							<span className="todo-info-val">{devicedata.faCategory}</span>
						</div>
						<div className="todo-info-r">
							<span className="todo-info-label ellipsis">操作建议</span>
							<span className="todo-info-val">{devicedata.operate?getDictVal('equipmentOperation',devicedata.operate):'无'}</span>
						</div>
					</div>
					<div className="todo-info-i border-line-h after">
						<div className="todo-info-l">
							<span className="todo-info-label ellipsis">FA Code2</span>
							<span className="todo-info-val">{devicedata.subCategory}</span>
						</div>
						<div className="todo-info-r"  onClick={()=>this.NameInfo(devicedata.vendorName)}>
							<span className="todo-info-label ellipsis">维修商</span>
							<span className="todo-info-val ellipsis">{devicedata.vendorName}</span>
						</div>
					</div>
					<div className="todo-info-i ">
						<div className="todo-info-l todo-fitting-num">
							<span className="todo-info-label ellipsis">维修数量</span>
							<span className="todo-info-val"><font className="eps-badge">{devicedata.maintenanceNum}</font></span>
						</div>
						<div className="todo-info-r" onClick={()=>this.NameInfo(devicedata.mark)}>
							<span className="todo-info-label ellipsis"  >维修描述</span>
							<span className="todo-info-val ellipsis">{devicedata.mark?devicedata.mark:'无'}</span>
						</div>
					</div>
				</div>
				{
					partHtml
				}
			</div>
			{
				showAllData?btn:''
			}
		</div>)
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
};

export default connect((state)=>{return state})(TodoCard);
