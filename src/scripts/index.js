import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import { initCommonDict } from './constants';
import request from './utils/EpsRequest';
import EventsTrigger from 'events-trigger';
import { EpsEnvConfig } from '../config';

import { AlertBase} from './components/Common/EpsModal';



// _ = window.back_underscore;
// console.log(_,'这个是啥呢');
// import _ from 'underscore';
const app = dva();
window.app = app;
window.JWReady = false;
// 全局广播事件
window.EpsEvents = new EventsTrigger();
// 初始化eps配置信息，并设置appid
window.EPSConfig = EpsEnvConfig;
window.appid = EPSConfig.appid;

let windowUrl = window.location.hash.split('?');
windowUrl = _.filter(windowUrl,function(i){return i});
console.log(windowUrl,'这个url里面有啥呀:开始');
if(windowUrl.length==2){
	windowUrl = windowUrl[1].split('&');
	for(var i=0;i<windowUrl.length;i++){
		// console.log(windowUrl[i])
		let datas = windowUrl[i];
		if(datas.indexOf('updateDate')>-1){
			window.updatetime = datas.replace(/updateDate=/,'');
			window.updatetime = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(window.updatetime))))
			break;
		}
	}
}
console.log(windowUrl,window.updatetime,'这个url里面有啥呀:结束');
if(window.location.pathname.charAt(window.location.pathname.length-1)=='/'){
	 window.EpsWebRoot=window.location.origin+window.location.pathname.substring(0,window.location.pathname.length-1);
}else{
	 window.EpsWebRoot=window.location.origin+window.location.pathname;
}
NProgress.configure({ showSpinner: false });
NProgress.start();




window.id = window.generateMixed(16);
window.localstoreTime = new Store('Joywok:cache:time');
window.localstoreUserinfo = new Store('Joywok:cache:userinfo');
window.localCode = new Store('Joywok:cache:code');
window.testaa = new Store('Joywok:cache:testaa');
window.upTabsData = function(namespace,type,data){
	if(type == 'publish'){
		let datas = {
			events:namespace,
			uid:window.id,
			type:'publish',
			data:_.extend({},data),
		}
		jw.shareData(datas)
	}else if(type=='cache'){
		let datas = {
			namespace:namespace,
			uid:window.id,
			type:type || 'publish',
			id:'tab:cache',
			data:data,
		}
		window.localstore = new Store('Joywok:cache:tabs:'+namespace);
		window.localstore.update(datas);
	}else{
		let nowApplyData = window.dvaApp._store.getState()[namespace];
		let datas = {
			namespace:namespace,
			uid:window.id,
			type:type || 'publish',
			id:'cache',
			data:_.extend({},nowApplyData,data),
		}
		window.localstore = new Store('Joywok:cache:'+namespace);
		window.localstore.update(datas);
		jw.shareData(datas)
	}
}
window.subShareData = function(data){
	if(typeof(data) == 'string'){
		data = JSON.parse(data);
	}
	if(data['uid']!=window.id){
		if(data['type'] == 'publish'){
			console.log(data['events'],data['data'],'events');
			PubSub.publish(data['events'],data['data']);
		}else{
			if(data['data']["targetModel"]){
				let newData = {};
				_.each(data["data"],function(i,key){
					if(key!='targetModel'){
						newData[key]=i
					}
				})
				app._store.dispatch({
					type:data['data']["targetModel"]+"/resetAllData",
					data:newData
				})
			}
			let datas = {
				uid:window.id,
				id:'cache',
				data:data['data']
			}
			window.localstore = new Store('Joywok:cache:'+data['namespace']);
			window.localstore.update(datas);
			app._store.dispatch({
				type:data["type"],
				data:data['data']
			})
		}
	}
}

PubSub.subscribe('changefilenum',function(evt,data){
	if(data["length"]!=0){
		$('.preview-file').html('查看附件('+data["length"]+')')
	}else{
		$('.preview-file').html('查看附件')
	}
});


app.router(require('./router'));
function getCode(url){
	console.log('getAuthCode',url)
	jw.getAuthCode({
		url:url
	},{
		success: function(res) {
			window.localstoreTime.update({id:'cache',data:Date.parse(new Date())/1000});
			console.log(res,'免等码是多少');
			window.code = res.code;
			window.localCode.update({id:'cache',data:code});
			request('/McdEpsApi/joywokapi/getUserInfo',{
				method:'POST',
				body: JSON.stringify({
			    code:window.code
			  })
			}).then(function(resp){
				console.log(resp,"getAuthCode:resp")
				window.userinfo = resp['data'];
				console.log(JSON.stringify(resp['data']),'用户信息');
				window.eid = window.userinfo["employee_id"]
				window.localstoreUserinfo.update({
					id:'cache',
					data:window.userinfo
				});

				console.log(JSON.stringify(window.userinfo),window.code);
				
				app.start('#root');
				// 获取公共字典
				setTimeout(()=>{
					initCommonDict();
				// 给首页获取数据预留些时间
				},200)
			});
		},
		fail:function (data) {
			// let datas = JSON.parse(data);
			alert(data["desc"]);
			/*AlertBase({
				tip: data["desc"],
				icon: 'icon-save-error',
				onOk:()=>{
					// jw.closeWebView();
				}
			});*/
			console.log('getAuthCode fail', data);
			// for(var i in data){
			// 	alert(i+'-----'+data[i])
			// }
		}
	});
}
request('/McdEpsApi/joywokapi/login',{
	method:'POST'
}).then(function(data){
	console.log('/McdEpsApi/joywokapi/login',data);
	if(navigator['platform'].indexOf('Intel')>-1){
		let cache = localstoreUserinfo.find({id:'cache'})
		window.userinfo = cache["data"];
    window.eid = window.userinfo["employee_id"]
		app.start('#root');
		// 获取公共字典
		setTimeout(()=>{
			initCommonDict();
		// 给首页获取数据预留些时间
		},200)
	}else{
		jw.ready = function(){
			console.log('event:jw.ready');
			typeof(jw.setHeaderLine)=='function' ? jw.setHeaderLine({status:0}) : '';
			jw.setBarBg({
				background:'F55928'
			})
			let url = data['data']['url'].split("?")[0];
			let timeCache = localstoreTime.find({id:'cache'});
			let nowDate = Date.parse(new Date())/1000;
			jw.getInfo({
				success:function(resp){
					console.log("jw.getInfo",resp);
					let cache = localstoreUserinfo.find({id:'cache'});
					if(typeof(cache)!='undefined'){
						cache = cache["data"];
					}else{
						cache = {};
					}
					if(cache['id'] && cache['id'] == resp['info']['id']){
						if(nowDate - timeCache['data'] > 60*60*2){
							localStorage.clear();
							getCode(url);
						}else{
							let cache = localstoreUserinfo.find({id:'cache'});
							cache = cache["data"];
							window.userinfo = cache;
							window.eid = window.userinfo["employee_id"];
							window.code = window.localCode.find({id:'cache'})['data'];
							console.log(window.code,'code是谁啊呀');
							app.start('#root');
							// 获取公共字典
							setTimeout(()=>{
								initCommonDict();
							// 给首页获取数据预留些时间
							},200)
						}
					}else{
						localStorage.clear();
						getCode(url);
					}
				}
			});
			setTimeout(()=>{
				window.JWReady = true;
				console.log('Mengying trigger jwready:ok');
				EpsEvents.trigger('jwready:ok','dddddd')
			},0);
		}
		console.log('Mengying subscribe jw.ready',JWReady,PubSub);
		let newData = data["data"];
		newData['timeStamp'] = parseFloat(newData['timeStamp']);
		newData['timestamp'] = Number(newData['timeStamp']);
		console.log('JS SDK Init', newData)
		window.configData = newData;
		jw.config(newData);
	}
})



