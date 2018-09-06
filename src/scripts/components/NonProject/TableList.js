/**
 * 非项目维修商列表
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import EmptyView from '../Common/EmptyView';
import { openWebView ,getDict,DataLength} from '../../constants';

import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

class TableList extends Component{

	constructor(props) {
		super(props);
		this.state = {};
	}
	NameInfo(name){ 
		console.log(1111)
		if(DataLength(name)>8){
			AlertInfoBase({
        text: name,
     });
		}   
	}
	MoneyInfo(){ 
		 let name="总价=采购费用+其他费用"
			AlertInfoBase({
        text: name,
     });
	}
	turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }
	openWebView(objecttype,type){
    let orderid=this.props.approval.orderNumber;
    var url ='';
    let data = this.props.approval;
    // let updateDate = encodeURIComponent(data['updateDate']);
    let time = data['updateDate'].split('.')[0];
		let updateDate = encodeURIComponent(time);
    if(this.props.approval.view=='vieworder'){
    	url= EpsWebRoot+'/#/nonproject/vendor-info/'+orderid+'/'+objecttype+'/4?updateDate='+updateDate;
    }else if(this.props.approval.view=='view'){
    	url = EpsWebRoot+'/#/nonproject/vendor-info/'+orderid+'/'+objecttype+'/10?updateDate='+updateDate;
    }else{
    	url = EpsWebRoot+'/#/nonproject/vendor-info/'+orderid+'/'+objecttype+'/'+type+'?updateDate='+updateDate;
    }
		// console.log(url,"url")
		jw.pushWebView(url);
	}
	equipmentItemRender(data){
		let self=this;
		console.log(data,'123123123123123123123123123123123');
		if(data.type=='service'){
			return <tr>
				 <td onClick={()=>self.NameInfo(data.vendorName)}>
				 <font className="ellipsis-1l ">{ data.vendorName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(data.deviceName)}>
				 <font className="ellipsis-1l ">{ data.deviceName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(this.turnMoney(data.otherCostAll)+' ¥')}>
					<font className="ellipsis-1l ">{ this.turnMoney(data.otherCostAll) }</font>
				 </td>
				</tr>
		}else if(data.type=='supplier'){
			return <tr>
				 <td onClick={()=>self.NameInfo(data.vendorName)}>
				 <font className="ellipsis-1l ">{ data.vendorName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(data.deviceName)}>
				 <font className="ellipsis-1l ">{ data.deviceName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(this.turnMoney(data.deviceCostAll)+' ¥')}>
					<font className="ellipsis-1l ">{ this.turnMoney(data.deviceCostAll) }</font>
				 </td>
				</tr>
		}else {
			return <tr>
				 <td onClick={()=>self.NameInfo(data.vendorName)}>
				 <font className="ellipsis-1l ">{ data.vendorName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(data.deviceName)}>
				 <font className="ellipsis-1l ">{ data.deviceName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(this.turnMoney(data.deviceCostAll)+' ¥')}>
					<font className="ellipsis-1l ">{ this.turnMoney(data.deviceCostAll) }</font>
				 </td>
				</tr>
		}
	}
	ITItemRender(data){
		let self=this;
		if(data.tsiType&&data.isDirectMining=='Y'){
			console.log(111111,data.tsiType)
			return <tr>
				 <td onClick={()=>self.NameInfo(data.serviceVendorName)}>
				 <font className="ellipsis-1l ">{ data.serviceVendorName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(data.deviceName)}>
				 <font className="ellipsis-1l ">{ data.deviceName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(this.turnMoney(data.lumpSumPrice)+' ¥')}>
					<font className="ellipsis-1l ">{ this.turnMoney(data.lumpSumPrice) }</font>
				 </td>
				</tr>
		}else if(data.tsiType&&data.isDirectMining=='N'){
			return <tr>
				 <td onClick={()=>self.NameInfo(data.serviceVendorName)}>
				 <font className="ellipsis-1l ">{ data.serviceVendorName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(data.deviceName)}>
				 <font className="ellipsis-1l ">{ data.deviceName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(this.turnMoney(data.lumpSumPrice)+' ¥')}>
					<font className="ellipsis-1l ">{ this.turnMoney(data.lumpSumPrice) }</font>
				 </td>
				</tr>
		}else{
			return <tr>
				 <td onClick={()=>self.NameInfo(data.vendorName)}>
				 <font className="ellipsis-1l ">{ data.vendorName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(data.deviceName)}>
				 <font className="ellipsis-1l ">{ data.deviceName }</font>
				 </td>
				 <td onClick={()=>self.NameInfo(this.turnMoney(data.lumpSumPrice)+' ¥')}>
					<font className="ellipsis-1l ">{ this.turnMoney(data.lumpSumPrice) }</font>
				 </td>
				</tr>
		}
	}
	render(){
		let list=this.props.list;
		let objecttype=this.props.objecttype;
		let type=this.props.type;
		let data=this.props.data;
		let self=this;
		let showMoreBtn=false;
		console.log(list,data,this.props.showBtn,"btn")
    
    if(objecttype=='it'){
    	list=list.slice(0,5);
    }else if(list.length>2){
	    list=list.slice(0,2);
	   }
    let tableHtml='';
    let MoreBtn="";
   if(this.props.hideBtn){
   		MoreBtn='';
   }else{
   		MoreBtn=<div className="todo-card">
   			<div className="todo-btn border-line-h before specail-color" onClick={(e)=>this.openWebView(objecttype,type)}>查看更多明细</div>
   		</div>;
   }
    if(this.props.objecttype=='project'){
      tableHtml=<table>
				<thead>
					<tr>
						<td>供应商名</td>
						<td>设备名称</td>
						<td>总价</td>
					</tr>
				</thead>
				<tbody>
					{
						list.map( (item) => (
							<tr>
								<td onClick={()=>self.NameInfo(item.vendorName)}><font className="ellipsis-1l">{ item.vendorName }</font></td>
								<td onClick={()=>self.NameInfo(item.deviceName)}> <font className="ellipsis-1l">{ item.deviceName }</font></td>
								<td>{ item.cost.toFixed(2) }</td>
						 </tr>
						))
					}
				</tbody>
			</table>
		}else if(objecttype=='equipment'){
			tableHtml=<table>
					<thead>
						<tr><td>供应商名</td><td>设备名称</td><td onClick={()=>self.MoneyInfo()}>总价<i className="icon-noproject-cost-tip"></i></td></tr>
					</thead>
					<tbody>
						{
							_.map(list,function(item){
								return self.equipmentItemRender(item)
							})
						}
					</tbody>
				</table>
		}else{

			//IT 的tabel 展示 
				tableHtml=<table>
					<thead>
						<tr>
							<td>供应商名称</td><td>设备名称</td>
							<td onClick={()=>self.MoneyInfo()}>总价<i className="icon-noproject-cost-tip"></i></td>
						</tr>
					</thead>
					<tbody>
						{
							_.map(list,function(item){
								return self.ITItemRender(item)
							})
						}
					</tbody>
				</table>
		}		
		if(list && list.length>0){
			return (
				<div className="header-nonproject-table">
					{tableHtml}
					{MoreBtn}
				</div>
	  	);	
		}else{
			return (<div  className="nonproject-empty"><EmptyView  tip="暂无数据"/></div>)
		}
	}

};

TableList.propTypes = {
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(TableList);