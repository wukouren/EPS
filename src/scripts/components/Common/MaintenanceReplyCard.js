import React,{ Component } from 'react';
import { connect } from 'dva';
class MaintenanceReplyCard extends Component{
	openFileView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.data;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	render(){
		let data = this.props.data;
		let showAllData = this.props.showAllData;
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		return (<div className="maintenance-card animated zoomIn">
			<div className="maintenance-card-c">
				<div className="maintenance-card-info clear-margin">
					<div className="maintenance-card-i">
						<div className="maintenance-card-label ">流程单号</div>
						<div className="maintenance-card-val ellipsis more">{data["orderNumber"]}</div>
					</div>
					<div className="maintenance-card-i">
						<div className="maintenance-card-label ">下单日期</div>
						<div className="maintenance-card-val ellipsis more">{data["createDate"]}</div>
					</div>
					<div className="maintenance-card-i">
						<div className="maintenance-card-label ">餐厅名称</div>
						<div className="maintenance-card-val ellipsis more">{data["storeName"]}</div>
					</div>
					<div className="maintenance-card-i">
						<div className="maintenance-card-label ">餐厅编号</div>
						<div className="maintenance-card-val ellipsis more">{data["usCode"]}</div>
					</div>
					<div className="maintenance-card-i">
						<div className="maintenance-card-label ">联系电话</div>
						<a href={'tel:'+data["vendorTel"]} className="phone-number"><div className="maintenance-card-val ellipsis more " style={{
							color:'#F55928',
						}}>{data["vendorTel"]}</div></a>
					</div>
				</div>
			</div>
		</div>)
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
	componentDidMount(){
		
	}
};

export default connect((state)=>{return state})(MaintenanceReplyCard);
