 import * as NonProjectOnWayService from '../../services/NonProjectOnWayInfo';
import { getDict,getUsers,openChart} from '../../constants';


export default {
	namespace: 'approval',
	state: {
		loading:{
			loading:true,
			fix:true,
			hide:false
		},
		loading1:true,
		loading2:true,
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
			console.log('changeData:',action)
			return { ...state, ...action.data };
		}
	},
	effects: {
		*viewInfo({ payload,objecttype ,callback }, { call, put }){

			let requestUrl1='';
			let requestUrl2='/McdEpsApi/joywok/noproject/getOrderInfo';
			switch(objecttype){
				case 'equipment':
				requestUrl1='/McdEpsApi/joywok/noproject/getEQSupplierInfo';
				break;
				case 'project':
				requestUrl1='/McdEpsApi/joywok/noproject/getCOSupplierInfo';
				break;
				case 'it':
				requestUrl1='/McdEpsApi/joywok/noproject/getITSupplierInfo';
				break;
			};
			const data1=yield call(NonProjectOnWayService.getDeviceList,{requestUrl1,payload});
			if(data1.data.body.pageInfo){
				 yield put({
            type: 'changeData',
            data: _.extend({
	            vendorList:data1.data.body.pageInfo.list,
	          },data1.data.body)
          });
			}

			const data2=yield call(NonProjectOnWayService.getDOAOrderInfo,{requestUrl2,payload});
		    let Data=data2['data']['body'];
        let BusinessInfo={};
        let creatorinfo={};
        creatorinfo.eid=Data.createBy;
        creatorinfo.createName=Data.storeMan;
        creatorinfo.isoc=Data.isoc;
        creatorinfo.storeNumber=Data.storeNumber;
        creatorinfo.storeName=Data.storeName;
        let isoc=Data.isoc?Data.isoc:false;
        let avatar;
        //判断是否IT的oc审批，IT的oc审批无返回BusinessInfo，需要填写表单数据（BusinessInfo信息）
        if(objecttype=='it'&&isoc){
        	yield put({
	          type:'changeData',
	          data:_.extend({
	            creatorinfo:creatorinfo,
	            view:'view'
	            },Data)
          })
        	if(Data['createBy']){
	          getUsers(Data['createBy'],'num',function(resp){
	            let userdata = resp['data'][0];
	            console.log(userdata,"userdata")
	            avatar=userdata['avatar'];
	            callback(avatar)
	          })
	        }
        	
        }else{
          console.log(Data,'Data.LumpSumPrice');
         
          //获取创建人的头像信息
        	
          BusinessInfo.LumpSumPrice=Data.LumpSumPrice.toFixed(2);
          BusinessInfo.fixedAssets=Data.fixedAssets?Data.fixedAssets.toFixed(2):'0.00';
          BusinessInfo.oldAssets=Data.oldAssets?Data.oldAssets.toFixed(2):'0.00';
          BusinessInfo.inSales=Data.inSales=='1'?'是':'否';
          BusinessInfo.toIncrease=Data.toIncrease?Data.toIncrease.toFixed(2):'0.00';
          BusinessInfo.profitIncrease=Data.profitIncrease?Data.profitIncrease.toFixed(2):'0.00';
          BusinessInfo.toBeROI=Data.toBeROI?Data.toBeROI:'0';
          if(Data['createBy']){
	          getUsers(Data['createBy'],'num',function(resp){
	            let userdata = resp['data'][0];
	            console.log(userdata,"userdata")
	            avatar=userdata['avatar'];
	            callback(avatar)
	          })
	        }
        	yield put({
	          type:'changeData',
	          data:_.extend({
	            BusinessInfo:BusinessInfo,
	            creatorinfo:creatorinfo,
	             view:'view'
	            },Data)
          })
        }
        
		},

		*viewOrderInfo({ payload,objecttype ,callback}, { call, put }){
			console.log(111111,"payload",objecttype);
			let requestUrl1='';
			let requestUrl2='';
			requestUrl2='/McdEpsApi/joywok/noproject/getDOAOrderInfo';
			switch(objecttype){
				case 'equipment':
				requestUrl1='/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo';
				break;
				case 'project':
				requestUrl1='/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo';
				break;
				case 'it':
				requestUrl1='/McdEpsApi/joywok/noproject/getITSupplierDOAInfo';
				break;
			};
			const data1=yield call(NonProjectOnWayService.getDeviceList,{requestUrl1,payload});
			// console.log(data1,'dsadasdasdasdasdasdasdas');
			if(data1.data.body.pageInfo){
			  yield put({
          type: 'changeData',
          data: _.extend({
            vendorList:data1.data.body.pageInfo.list,
            storeScrapList:data1.data.body['scrapPageInfo']['list']
          },data1.data.body)
        });
			}
			const data2=yield call(NonProjectOnWayService.getDOAOrderInfo,{requestUrl2,payload});
	    let Data=data2['data']['body'];
      let BusinessInfo={};
      let creatorinfo={};
      creatorinfo.eid=Data.createBy;
      creatorinfo.createName=Data.storeMan;
      creatorinfo.isoc=Data.isoc;
      creatorinfo.storeNumber=Data.storeNumber;
      creatorinfo.storeName=Data.storeName;
      let isoc=Data.isoc?Data.isoc:false;
      let avatar;
      //判断是否IT的oc审批，IT的oc审批无返回BusinessInfo，需要填写表单数据（BusinessInfo信息）
      if(objecttype=='it'&&isoc){
      	//获取创建人的头像信息
        if(Data['createBy']){
          getUsers(Data['createBy'],'num',function(resp){
            let userdata = resp['data'][0];
            console.log(userdata,"userdata")
            avatar=userdata['avatar'];
            callback(avatar)
          })
        }
      }else{
        console.log(Data,'Data.LumpSumPrice');
        //获取创建人的头像信息
      	
        BusinessInfo.LumpSumPrice=Data.LumpSumPrice.toFixed(2);
        BusinessInfo.fixedAssets=Data.fixedAssets?Data.fixedAssets.toFixed(2):'0.00';
        BusinessInfo.oldAssets=Data.oldAssets?Data.oldAssets.toFixed(2):'0.00';
        BusinessInfo.inSales=Data.inSales=='1'?'是':'否';
        BusinessInfo.toIncrease=Data.toIncrease?Data.toIncrease.toFixed(2):'0.00';
        BusinessInfo.profitIncrease=Data.profitIncrease?Data.profitIncrease.toFixed(2):'0.00';
        BusinessInfo.toBeROI=Data.toBeROI?Data.toBeROI:'0';
        if(Data['createBy']){
          getUsers(Data['createBy'],'num',function(resp){
            let userdata = resp['data'][0];
            console.log(userdata,"userdata")
            avatar=userdata['avatar'];
            callback(avatar)
          })
        }
      	yield put({
          type:'changeData',
          data:_.extend({
            BusinessInfo:BusinessInfo,
            creatorinfo:creatorinfo,
            view:'vieworder',
            // storeScrapList:Data['scrapPageInfo']['list']
          },Data)
        })
     
      }
		},
	},
	subscriptions: {
	}
};
