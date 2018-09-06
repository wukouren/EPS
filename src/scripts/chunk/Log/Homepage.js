import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import { orderStatus } from '../../constants';
import EmptyView from '../../components/Common/EmptyView';
import {getUsers} from '../../constants';
 
let statusRoutes = {};
class Log extends Component{
	render(){
		let data = this.props.log;
		return (
			<div className="root-container">
				<div className="root-container-w">
					<div className="loading-bounce-w fix">
						<div className="loading-bounce-bg"></div>
						<div className="loading-bounce-main">
							<div className="loading-gif">
								<img src="images/loading.gif" />
							</div>
							<div className="loading-bounce-tip">
								正在跳转,请稍后……	
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let orderid = window.location.href.split('?')[1].split('&')[0].split('=')[1];
		request('/McdEpsApi/joywok/common/getOrderinfoForMobile',{
    	method:'POST',
    	body:JSON.stringify({
    		param:{
    			eid:eid,
    			condition: {
			      orderNumber: orderid
			    }
    		}
		  })
    }).then(function(resp){
    	if(resp['data']['success']==false){
    	}else{
    		NProgress.done();
    		let data = resp['data']['body']['orderInfo'];
    		console.log(resp['data']['body']['orderInfo'],'12312312312312312312312');
    		self.openWebView(resp['data']['body']['orderInfo'])
    		return ;
    		setTimeout(function(){
					let a = data["url"] || 'http://jmistest.mcd.com.cn/eps/#/repairing/process/it/RP170007420?type=1&updateDate=2017-11-18 18:43:16';
					let url = a.split('?')[0];
					let object = a.split('?')[1].split('&');
					object = _.map(object,function(i,index){
						let str = '';
						let nowData = i.split('=');
						if (nowData[0] == 'updateDate'){
							// encodeURIComponent(encodeURIComponent(encodeURIComponent("2017-11-18 18:43:16")))
							str = nowData[0] + '=' + nowData[1]
						}else{
							str = nowData[0]+'='+nowData[1];
						}
						if(index == 0 ){
							str = '?'+str;
						}
						return str
					})

					url = url + object.join('&');
					console.log(url, object);
					// window.location.href = url;
					history.pushState({},'',url.split(window.location.origin)[1]);
					window.location.reload();
    		})
    	}
    })
  }
	componentDidUpdate(){
	}
	getStatusRoutes(orderId){
		console.log('orderId',orderId)
		let EpsWebRoot = '/eps';
		statusRoutes={
			'11':{
				//2:供应商响应，3：供应商评估 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：调整后再审批
				'2':EpsWebRoot+'/#/repairing/response/equipment/'+orderId,
				'3':EpsWebRoot+'/#/repairing/assess/equipment/'+orderId+'?type=1',//供应商评估
				'4':EpsWebRoot+'/#/repairing/process/equipment/'+orderId+'?type=1',//餐厅确认1
				'5':EpsWebRoot+'/#/repairing/process/equipment/'+orderId+'?type=2',//doa审批2
				'6':EpsWebRoot+'/#/repairing/assess/equipment/'+orderId+'?type=2',//供应商确认
				'7':EpsWebRoot+'/#/repairing/process/equipment/'+orderId+'?type=4',//餐厅确认评价4
				'8':EpsWebRoot+'/#/repairing/process/equipment/'+orderId+'?type=3',//调整后再审批
			},
			'12':{
				//2:供应商响应，   5： doa审批  7： 餐厅确认及评价 8：再次审批 
				'2':EpsWebRoot+'/#/repairing/response/project/'+orderId,
				'4':EpsWebRoot+'/#/repairing/process/project/'+orderId+'?type=1',//餐厅确认1
				'5':EpsWebRoot+'/#/repairing/process/project/'+orderId+'?type=2',
				'7':EpsWebRoot+'/#/repairing/process/project/'+orderId+'?type=4',
				'8':EpsWebRoot+'/#/repairing/process/project/'+orderId+'?type=3',
			},
			'13':{
				// 3：供应商重新评估IT维修（餐厅确认节点退回后的状态） 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：再次审批
				'3':EpsWebRoot+'/#/repairing/assess/it/'+orderId+'?type=1',
				'4':EpsWebRoot+'/#/repairing/process/it/'+orderId+'?type=1',
				'5':EpsWebRoot+'/#/repairing/process/it/'+orderId+'?type=2',
				'6':EpsWebRoot+'/#/repairing/assess/it/'+orderId+'?type=2',
				'7':EpsWebRoot+'/#/repairing/process/it/'+orderId+'?type=4',
				'8':EpsWebRoot+'/#/repairing/process/it/'+orderId+'?type=3',
			},
			'21':{  //保养 设备年度 2：DO审批
				// '2':'/#/repairing/response/equipment/,
				'2':EpsWebRoot+'/#/maintenance/equipment/approval/'+orderId+'?type=year'
			},
			'22':{ //保养设备月度审核 2： 已提交待审批
				'2':EpsWebRoot+'/#/maintenance/equipment/approval/'+orderId+'?type=month'
			},
			'23':{ // 设备保养订单 1:已提交待响应 3：已确认待服务 4：已服务待评价
				'1':EpsWebRoot+'/#/maintenance/equipment/reply/'+orderId,
				'3':EpsWebRoot+'/#/maintenance/equipment/confirm/'+orderId,
				'4':EpsWebRoot+'/#/maintenance/equipment/assess/'+orderId
			},
			'24':{ // 工程年度保养计划
				'2':EpsWebRoot+'/#/maintenance/project/approval/'+orderId+'?type=year',
			},
			'25':{ // 工程月度保养计划
				'2':EpsWebRoot+'/#/maintenance/project/approval/'+orderId+'?type=month',
			},
			'26':{ // 工程保养订单
				'1':EpsWebRoot+'/#/maintenance/project/reply/'+orderId,
				'3':EpsWebRoot+'/#/maintenance/project/confirm/'+orderId,
				'4':EpsWebRoot+'/#/maintenance/project/assess/'+orderId
			},
			'31':{ // 非项目设备采购需求 只有创建
				'1':EpsWebRoot+'/#/nonproject/createpo/equipment/'+orderId,
				'5':EpsWebRoot+'/#/nonproject/approval/equipment/'+orderId+'?type=10'
			},
			'32':{ // 非项目设备采购  1：已创建待审批(DOA) 3：已服务待签收(餐厅) 4：已收货待审批(DOA)
				'1':EpsWebRoot+'/#/nonproject/approval/equipment/'+orderId+'?type=1',
				'3':EpsWebRoot+'/#/nonproject/approval/equipment/'+orderId+'?type=4',
				'4':EpsWebRoot+'/#/nonproject/approval/equipment/'+orderId+'?type=3',
			},
			'33':{ //非项目工程  1：  3：  4：同上
				'1':EpsWebRoot+'/#/nonproject/approval/project/'+orderId+'?type=1',
				'3':EpsWebRoot+'/#/nonproject/approval/project/'+orderId+'?type=4',
				'4':EpsWebRoot+'/#/nonproject/approval/project/'+orderId+'?type=3',
			},
			'34':{//非项目it 1:已创建待审批 3:已服务待签收 4:餐厅已确认(DOA审批) 5:IT PM已确认(DOA审批)
				'1':EpsWebRoot+'/#/nonproject/approval/it/'+orderId+'?type=1',
				'3':EpsWebRoot+'/#/nonproject/approval/it/'+orderId+'?type=4',
				'4':EpsWebRoot+'/#/nonproject/approval/it/'+orderId+'?type=1',
				'5':EpsWebRoot+'/#/nonproject/approval/it/'+orderId+'?type=1'
			},
			'35':{// 非项目工程采购需求 只有创建
				'1':EpsWebRoot+'/#/nonproject/createpo/project/'+orderId,
				'5':EpsWebRoot+'/#/nonproject/approval/project/'+orderId+'?type=10',
			},
			'36':{// 非项目it采购需求 只有创建
				'1':EpsWebRoot+'/#/nonproject/createpo/it/'+orderId,
				'5':EpsWebRoot+'/#/nonproject/approval/it/'+orderId+'?type=10',
			},
			'41':{//项目采购需求
				// PM确认供应商的需求明细
				'3':EpsWebRoot+'/#/project/pmconfirm/'+orderId,
				'4':EpsWebRoot+'/#/project/approval/'+orderId+'?type=1',
			},
			/*'42':{// 项目型供应商采购订单
				// 项目采购-供应商确认PO/填写服务信息/调整送货信息，这个节点是42，移动端不支持操作
				'1':'/#/project/approval/equipment/'+orderId+'?type=4',
				'2':'/#/project/approval/equipment/'+orderId+'?type=1',
			},*/
			'43-1':{//项目型采购订单-设备
				'1':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=4',
				'2':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=1',
			},
			'43-2':{//项目型采购订单-工程
				'1':EpsWebRoot+'/#/project/approval/project/'+orderId+'?type=4',
				'2':EpsWebRoot+'/#/project/approval/project/'+orderId+'?type=1',
			},
			'43-3':{//项目型采购订单-IT
				'1':EpsWebRoot+'/#/project/approval/it/'+orderId+'?type=4',
				'2':EpsWebRoot+'/#/project/approval/it/'+orderId+'?type=1',
			},
			'51':{ //新店/改造设备/工程订单
				// 已确认待审批
				'4':EpsWebRoot+'/#/minorpurchase/approval/equipment/'+orderId+'?type=1',
				// 已调整待审批
				'8':EpsWebRoot+'/#/minorpurchase/approval/equipment/'+orderId+'?type=2',
			},
			'53':{ //新店/改造IT采购需求
				// TSI确认供应商的需求明细
				'3':EpsWebRoot+'/#/newstoreit/pmconfirm/'+orderId,
				// DOA审批（IT Func/Dept）
				'4':EpsWebRoot+'/#/newstoreit/approval/'+orderId+'?type=1'
			},
			'55':{ //新店/改造IT采购订单
				// 餐厅确认评价（IT)
				'1':EpsWebRoot+'/#/newstoreit/approvalorder/'+orderId+'?type=4',
				// DOA送货调整审批 （IT）
				'2':EpsWebRoot+'/#/newstoreit/approvalorder/'+orderId+'?type=1'
			},
			'61':{ //新店/改造GC采购
				// 6 - 已确认待审批
				'6':EpsWebRoot+'/#/newstoregc/approval/'+orderId+'?type=1',
				// 11 - 已调整待审批
				'10':EpsWebRoot+'/#/newstoregc/approval/'+orderId+'?type=2'
			}
		}
	}
	getViewRoutes(subProcess, statusCode, orderId){
		let EpsWebRoot = '/eps';
		let viewRoutes = {
			'11':function(statusCode){
				return statusCode=='2'?EpsWebRoot+'/#/repairing/vieworder/equipment/'+orderId:
							EpsWebRoot+'/#/repairing/view/equipment/'+orderId;
			},//EpsWebRoot+'/#/repairing/view/equipment/'+orderId,
			'12':function(statusCode){
				return statusCode=='2'?EpsWebRoot+'/#/repairing/vieworder/project/'+orderId:
							EpsWebRoot+'/#/repairing/view/project/'+orderId;
			},/*{
				'2':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
				'':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
			},*/
			'13':EpsWebRoot+'/#/repairing/view/it/'+orderId+'?unfinished=1',
			'21':EpsWebRoot+'/#/maintenance/view/equipment/'+orderId+'?type=year',//年度-设备
			'24':EpsWebRoot+'/#/maintenance/view/project/'+orderId+'?type=year',//年度-工程
			'22':EpsWebRoot+'/#/maintenance/view/equipment/'+orderId+'?type=month',//月度-设备
			'25':EpsWebRoot+'/#/maintenance/view/project/'+orderId+'?type=month',//月度-工程
			'23':EpsWebRoot+'/#/maintenance/vieworder/equipment/'+orderId,//设备-保养
			'26':EpsWebRoot+'/#/maintenance/vieworder/project/'+orderId,//工程-保养
			// 非项目设备采购需求
			'31':EpsWebRoot+'/#/nonproject/view-info/view/equipment/'+orderId,
			// 非项目设备采购
			'32':EpsWebRoot+'/#/nonproject/view-info/vieworder/equipment/'+orderId,
			// 非项目工程采购
			'33':EpsWebRoot+'/#/nonproject/view-info/vieworder/project/'+orderId,
			// 非项目IT采购
			'34':EpsWebRoot+'/#/nonproject/view-info/vieworder/it/'+orderId,
			// 非项目工程采购需求
			'35':EpsWebRoot+'/#/nonproject/view-info/view/project/'+orderId,
			// 非项目IT采购需求
			'36':EpsWebRoot+'/#/nonproject/view-info/view/it/'+orderId,
			// 项目采购需求
			'41':EpsWebRoot+'/#/project/view/'+orderId,
			// 项目型供应商采购订单
			'42':EpsWebRoot+'/#/project/vieworder/'+orderId,
			// 项目型采购订单
			'43-1':EpsWebRoot+'/#/project/vieworder/equipment/'+orderId,
			'43-2':EpsWebRoot+'/#/project/vieworder/project/'+orderId,
			'43-3':EpsWebRoot+'/#/project/vieworder/it/'+orderId,
			// 新店/改造设备/工程订单
			'51':EpsWebRoot+'/#/minorpurchase/vieworder/equipment/'+orderId,
			// 新店/改造IT采购需求
			'53':EpsWebRoot+'/#/newstoreit/view/it/'+orderId,
			// 新店/改造IT采购订单
			'55':EpsWebRoot+'/#/newstoreit/vieworder/it/'+orderId,
			// 新店/改造GC采购
			'61':EpsWebRoot+'/#/newstoregc/view/'+orderId
		};
		return viewRoutes[subProcess]?(typeof viewRoutes[subProcess]=='function'?viewRoutes[subProcess](statusCode):viewRoutes[subProcess])
					:'';
	}
	openWebView(data){
		if(data['orderType'] == '-1'){
			// confirm("您没有权限查看该订单！");
			// jw.closeWebView();
			window.location.replace('/eps/#/nopermiss');
			return;
		}
		if(data["mobileOperationFlag"]!='1'){
			confirm("该订单不可在移动端处理，请到 PC 端处理");
			jw.closeWebView();
			return;
		}
		let updateDate = data["updateDate"];
		// let a = data["url"]
		// let url = a.split('?')[0];
		// let object = a.split('?')[1].split('&');
		// _.each(object,function(i,index){
		// 	let str = '';
		// 	let nowData = i.split('=');
		// 	if (nowData[0] == 'updateDate'){
		// 		updateDate =  nowData[1]
		// 	}
		// })
		if(data['orderType'] == '1'){
			this.getStatusRoutes(data['orderNumber']);
			if(statusRoutes[data["flowType"]]&&statusRoutes[data["flowType"]][data["orderState"]]){
				let url = statusRoutes[data["flowType"]][data["orderState"]];
				url += (url.indexOf('?')>0?'&':'?')+'updateDate='+encodeURIComponent(updateDate);
				console.log(updateDate,url,'这个url是什么');
				// setTimeout(function(){
				// 	history.pushState({},'',url)
				// 	window.location.reload();	
				// })
				window.location.replace(url)
				setTimeout(function(){
					window.location.reload();	
				},0)
			}
		}else{
			let url = this.getViewRoutes( data["flowType"], data["orderState"], data['orderNumber'] );
			if(!url){
				alert('未知业务类型['+data["orderState"]+'] 订单号['+data['orderNumber']+']');
				jw.closeWebView();
				return;
			}
			url += (url.indexOf('?')>0?'&':'?')+'sta='+(Number(data["orderType"])-1)+'&'+'updateDate='+encodeURIComponent(updateDate);
			console.log(updateDate,url,'这个url是什么');
			// history.pushState({},'',url)
			
			// window.location.href = url;
			window.location.replace(url);
			setTimeout(function(){
				window.location.reload();	
			},0)
		}
		// if(data["visitFlag"]){
	  	 // this.openWebViewDetail(data.todoCol2,data.todoCol4,data.todoCol6,data.todoCol3);
	  // }else{
	  	// this.getRouter(data.todoCol2,data.todoCol4,data.todoCol6,data.todoCol3);
	  	/*if(data.todoCol2=='12'&&data.todoCol6=='6'){
	  		confirm("该订单不可在移动端处理，请到 PC 端处理");
	  	}*/
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(Log);