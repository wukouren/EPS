import { AlertInfoBase} from './../../components/Common/EpsModal';
import React,{ Component } from 'react';
import { connect } from 'dva';
class MaintenanceRestaurant extends Component{
	alertInfo(data){
		AlertInfoBase({
      text:data
 		})
	}
	render(){
		let self = this;
		let data = this.props.data;
		console.log(data,'这个里面有什么呢')
		let showAllData = this.props.showAllData;
		return (<div className="maintenance-restaurant animated zoomIn">
			<div className="maintenance-restaurant-c">
				<div className="maintenance-restaurant-title">
					<i></i>
					<div className="maintenance-restaurant-title-num">餐厅编号</div>
					<div className="maintenance-restaurant-title-name">餐厅名称</div>
					<div className="maintenance-restaurant-title-money">金额</div>
				</div>
				<div className="maintenance-restaurant-list">
					{
						_.map(data['list'],function(i){
							return <div className="maintenance-restaurant-i border-line-h before">
											<div className="maintenance-restaurant-i-num">{i["storeNumber"]}</div>
											<div className="maintenance-restaurant-i-name ellipsis" onClick={(e)=>self.alertInfo(i["storeName"])}>{i["storeName"]}</div>
											<div className="maintenance-restaurant-i-money">{Number(i["sumCost"]).formatMoney(2,'','')}</div>
										</div>
						})
					}
				</div>
				<div className="maintenance-restaurant-btn border-line-h before" onClick={(e)=>this.showDoc(e)}>
					<i className="icon-file"></i>
					<span>查看保养明细</span>
				</div>
			</div>
		</div>)
	}
	showDoc(){
		let data = this.props.data;
		jw.previewDoc({
       url:window.location.origin+'/McdEpsApi/joywok/maintenance/'+(data["type"]=='year'?'getYearPlanAttach':'getMonthPlanAttach')+'?eid='+window.eid+'&orderNumber='+data['orderNumber'],
       name:'附件',
       type:'application/vnd.ms-excel'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
     },{
       success:function(){
       }
     })
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
};

export default connect((state)=>{return state})(MaintenanceRestaurant);
