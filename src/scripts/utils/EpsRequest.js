import fetch from 'dva/fetch';
import { AlertBase, ConfirmBase } from '../components/Common/EpsModal';
let requestError;
function checkStatus(response,url,requestParams) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }else{
  	// 请求路径：https://jmis.mcd.com.cn/jmis/ WriteLog
  	fetch('/jmis/WriteLog',{
  		method:'POST',
  		body:JSON.stringify({
  			type:'1',
  			url:_.clone(url),
  			requestParams:(requestParams['body']?JSON.parse(requestParams['body']):{}),
  			response:(response || {}),
	  		time:Date.parse(new Date())/1000
  		})
  	})
		if(response['statusText']){
			AlertBase({
				tip: response["statusText"] || response['errmemo'],
				icon: 'icon-save-error',
				onOk:()=>{
					window.upTabsData('get:child:todos:updateTodoList','publish',{
		        data:'success'
		      })
					jw.closeWebView();
				}
			});
		}
		return {
			data:{
				success:false	
			}
		}
  }

 //  AlertBase({
	// 	tip: response.statusText,
	// 	icon: 'icon-save-error',
	// 	onOk:()=>{
	// 		// jw.closeWebView();
	// 	}
	// });
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}
// <<<<<<< HEAD
// function checkError(response){
// 	console.log(response,'这个里面有啥呢');
// =======
function checkError(response,url,requestParams){
	if(response['msg']){
		// alert('xxxxxx')
		// requestError = true
		if(response['success'] == false){
			console.log(response['errorCode'],'这个里面是啥呢');
			fetch('/jmis/WriteLog',{
	  		method:'POST',
	  		body:JSON.stringify({
	  			type:'2',
	  			url:_.clone(url),
	  			requestParams:(requestParams['body']?JSON.parse(requestParams['body']):{}),
	  			response:(response || {}),
		  		time:Date.parse(new Date())/1000
	  		})
	  	})
			if(response['errorCode'] == '10001' || response['msg'] == '数据已经修改,请重新加载数据'){
				AlertBase({
					tip: '订单状态已变更，请刷新页面!',
					icon: 'icon-error-tip',
					onOk:()=>{

						window.upTabsData('get:child:todos:updateTodoList','publish',{
			        data:'success'
			      })
						jw.closeWebView();
					}
				});
			}else{
				AlertBase({
					tip: response["msg"],
					icon: 'icon-save-error',
					onOk:()=>{
						if(response['errorCode'] != '10002'){
							window.upTabsData('get:child:todos:updateTodoList','publish',{
				        data:'success'
				      })
							jw.closeWebView();	
						}
					}
				});
			}
		}
	}
}

/**
 * 将参数拼装为链接参数格式
 */
function combineUrlParam(params){
	return _(params).map(function(item,key){
			return key+'='+item;
		}).join('&');
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

	let urlList=['submitSupplierResponse','submitSupplierEvaluate','submitOrderInfo','submitSupplierEvaluate','submitStoreEvaluate','submitCoSupplierResponse','submitCOSupplierEvaluate','submitCOSupplierEvaluateAdjust','submitITSupplierEvaluateAdjust','submitItOrderInfo','submitCOStoreEvaluate','common/evaluate','repair/evaluate','submitNonOrderInfo','noproject/submitNonOrderInfo','noproject/submitOrderInfo','noproject/submitITPRInfo','noproject/submitEQPRInfo','noproject/submitCOPRInfo','noproject/submitEQStoreEvaluate','noproject/submitCOStoreEvaluate','noproject/submitITStoreEvaluate','maintenance/submitYearPlan','maintenance/submitMonthPlan','maintenance/submitOrderInfo','maintenance/confirmOrderInfo','reimage/submitECOrderInfo','repair/submitITStoreOrderInfo','project/submitStoreOrderInfo','repair/submitITStoreOrderInfo','gc/submitOrder','gc/submitAddOrder','reimage/submitITOrderInfo','newstoreit/submitOrderInfo','newstoreit/submitStoreOrderInfo','cancelEquipmentRepairPo','cancelItRepairPo','cancelSave'];

	let is_publish=false;
	// console.log(url,"url:evaluate")
	_.map(urlList,function(item){
		if(url.indexOf(item)>0){
			is_publish=true;
		}
	})
	let isAddTime = false;
	let addList=['maintenance/getYearPlan','maintenance/getMonthPlan','maintenance/getYearPlanAttach','maintenance/getMonthPlanAttach','maintenance/getYearPlanStore','maintenance/getMonthPlanStore','maintenance/getOrderInfo','maintenance/getOrderInfo','maintenance/getOrderInfo','reimage/getECOrderAdjustInfo','reimage/getITOrderInfo','gc/getOrderInfo','repair/getEquipmentList','repair/getCOOrderInfo','repair/getEquipmentList','repair/getITOrderInfo','repair/getMaintainerList','repair/get','noproject/get','project/get','newstoreit/get'];
	_.each(addList,function(item){
		if(url.indexOf(item)>=0){
			isAddTime=true;
		}
	})
	let requestParams;
	// 给url链接拼装access_token
	// url = url+'?access_token='+pmatk;
	// get方法，需将请求参数拼装到链接上， 其他方法通过 body:JSON.stringify(values) 方式传递;
	switch (options.method){
		case 'POST':
			requestParams = _.extend({
				headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json; charset=utf-8'
		    }
			},options);
			break;
		case 'PUT':
		case 'PATCH':
		case 'DELETE':
			requestParams = options;
			break;
		default:
			requestParams = {
				method: 'GET'
			}
			url += ( (typeof(options.body)=='object') ? ('&'+combineUrlParam(options.body)) : '');
			break;
	}
	try{
		// 发起请求
		if(isAddTime && window.updatetime){
			let body = JSON.parse(requestParams['body']);
			if(body['param']['condition'] && !body['param']['condition']['updateDate']){
				// 
				if(window.updatetime.length>20) window.updatetime = window.updatetime.substring(0,19);
				body['param']['condition']['updateDate'] = window.updatetime;
			}
			requestParams.body = JSON.stringify(body);
		}
		let location = (window.location.host!='jmis.mcd.com.cn'?'':'http://jmis.mcd.com.cn')

	  const response = await fetch(location+url, requestParams);
	  // 校验返回状态
	  checkStatus(response,url,requestParams);
	  const data = await response.json();
	  console.log('请求的接口是：',url,'请求的数据：',requestParams,'服务器返回的数据:',data['body']);
	  checkError(data,url,requestParams);
	  // 拼装返回值
	  // console.log(url,url.indexOf('getToDoList'),'index')
	  if(is_publish){
	  	window.upTabsData('get:child:todos:updateTodoList','publish',{
        data:'success'
      })
	  }
	  const ret = {
	    data,
	    headers: {},
	  };

		return ret;
	}
	catch(err){
		return {
			data: {
				errcode: 'no-network',
				errmemo: '请求失败，请检查网络连接',
				errinfo: err,
				success:false,
				statusText:'请求失败，请检查网络连接'
			},
			headers: {},
		}
	}
}