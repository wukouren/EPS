import request from './../../utils/EpsRequest';
import * as ITService from './../../services/RepairIt';
import {getUsers} from '../../constants';

function FirstFetch(parame) {
  return request('/McdEpsApi/joywok/repair/getEquipmentList', {
    method: 'POST',
    body:JSON.stringify({
    	param:{
    		eid:window.eid,
    		condition: {
		      orderNumber: parame
		    },
		    pager:{'pageNum':'1','pageSize':'1000'}
	    }
    })
  });
}
function SecondFetch(parame) {
  return request('/McdEpsApi/joywok/repair/getCOOrderInfo', {
    method: 'POST',
    body:JSON.stringify({
    	param:{
        eid:window.eid,
    		condition: {
		      orderNumber: parame
		    },
		    pager:{'pageNum':'1','pageSize':'1'}
	    }
    })
  });
}
function getEvaluate(param){
	return request('/McdEpsApi/joywok/common/getEvaluate',{
		method: 'POST',
    body:JSON.stringify({
    	param:{
    		eid:window.eid,
    		condition: {
		      orderNumber: param
		    }
	    }
    })
	})
}
export default {
	namespace: 'process',
	state: {
    avatar:{
      avatar_l:'https://www.joywok.com/public/images/avatar/l.jpg',
      avatar_s:'https://www.joywok.com/public/images/avatar/s.jpg'
    },
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
		form:{},
		epsDialog:{
			title:'请输入备注',
			buttonIconClass:'icon-check-i',
			buttonVal:'确认',
			fix:true,
			show:false,
		},
		epsTip:{
			show:true
		}
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
		*fetch({ payload,dispatch}, { call, put ,select}) {
      let datas = yield select();
      // let firstData = yield call(FirstFetch,payload);
      let secondData = yield call(SecondFetch,payload);
			let type = datas["process"]['type'];
      let loading = datas["process"]['loading'];
  		loading['loading'] = false;
  		loading['hide'] = true;
      let partList = [];
      let deviceList = [];
      _.each((secondData['data']['body']["detailList"].length==0?secondData['data']['body']["orderList"]:secondData['data']['body']["detailList"]),function(i){
        partList.push(i)
      })
      // if()
      let allData = _.extend({
      	loading:loading,
        partList:partList,
        storeScrapList:secondData['data']['body']['scrapPageInfo']?secondData['data']['body']['scrapPageInfo']['list']:[]
      },secondData['data']['body'],{
      	list:(secondData['data']['body']["detailList"].length==0?secondData['data']['body']["orderList"]:secondData['data']['body']["detailList"])
        // list:(secondData['data']['body']["detailList"])//上面的代码存疑，开始说读取orderList里面的
      })
      console.log(secondData['data']['body'],'这个里面返回什么数据呢');
      getUsers(allData['storeMan'],'num',function(resp){
        let userdata = resp['data'][0];
        dispatch({
          type: 'process/changeData',
          payload: {
            avatar:userdata['avatar']
          },
        });
      })
      NProgress.done();
      yield put({
        type: 'changeData',
        payload: allData,
      });
    },
    *getITOrderInfo({ payload,dispatch }, { call, put ,select}) {
      let datas = yield select();
      let secondData = yield call(ITService.getITOrderInfo, payload);
      let loading = datas["process"]['loading'];
      loading['loading'] = false;
      loading['hide'] = true;
      let partList = [];
      let deviceList = [];
      _.each(secondData['data']['body']['costList'],function(i){
        if(i['partsName']){
          partList.push(i)
        }else{
          deviceList.push(i)
        }
      })
      if(datas["process"]['processType'] == 'it'){
        _.each(partList,function(i){
          let device = _.findWhere(secondData['data']['body']['pageInfo']['list'],{itDeviceName:i['itDeviceName'],itDeviceNumber:i['itDeviceNumber']})
          if(device){
            i['faCategory'] = device["faCategory"];
            i['subCategory'] = device["subCategory"];  
          }
        })  
      }else{
         _.each(partList,function(i){
          let device = _.findWhere(secondData['data']['body']['pageInfo']['list'],{deviceName:i['deviceName'],deviceNumber:i['deviceNumber']})
          if(device){
            i['faCategory'] = device["faCategory"];
            i['subCategory'] = device["subCategory"];  
          }
        })  
      }
      let storeScrapList = [];
      if(datas['process']['type'] == '1' || datas['process']['type'] == '4'){
        if(datas["process"]['processType'] == 'it'){
          _.each(secondData['data']['body']['scrapPageInfo']['list'],function(i){
            if(_.findWhere(secondData['data']['body']["pageInfo"]["list"],{itDeviceName:i['deviceName']})){
              storeScrapList.push(i)
            }
          })
        }else{
          _.each(secondData['data']['body']['scrapPageInfo']['list'],function(i){
            if(_.findWhere(secondData['data']['body']["pageInfo"]["list"],{deviceName:i['deviceName']})){
              storeScrapList.push(i)
            }
          })
        }
      }else{
        storeScrapList = secondData['data']['body']['scrapPageInfo']['list']
      }

      
      let allData = _.extend({
        loading:loading,
        partList:partList,
        deviceList:deviceList,
        storeScrapList:storeScrapList,
      },secondData['data']['body'])
      console.log(datas,allData,'12312312312312313');
      // 获取用户头像
      getUsers(allData['createEid'],'num',function(resp){
        let userdata = resp['data'][0];
        dispatch({
          type: 'process/changeData',
          payload: {
            avatar:userdata['avatar']
          },
        });
      })
      NProgress.done();
      yield put({
        type: 'changeData',
        payload: allData,
      });
    }
	},
	subscriptions: {
	}
};
