import React, { Component} from 'react';
import PropTypes from "prop-types";
import { Router,hashHistory,browserHistory} from 'dva/router';
import { registerModel, initCommonDict } from './constants';
import NotFound from './chunk/NotFound';

module.exports = function({hashHistory,app}){
  const routeConfig = [
    {
      path:'/',
      indexRoute: {
        getComponents(location, callback) {
	        require.ensure([], function (require) {
	          let model = require('./models/IndexPage')["default"];
	          registerModel(app,model);
	          callback(null, require('./chunk/IndexPage')["default"]);
	        },'chunk/IndexPage.js')
	      },
	      onEnter:function(){
					jw.setTitle({title:'EPS'});
					
	        NProgress.start();
	      },
      },
			getChildRoutes(partialNextState, cb) {
				require.ensure([], (require) => {
					cb(null,[
						require('./routes/todos'),//待办列表
						require('./routes/todo-info'),//待办详情
						require('./routes/repairing'),//维修流程
						require('./routes/nonproject'),//非项目流程
						require('./routes/maintenance'), //保养流程
						require('./routes/project'), //项目采购流程
						require('./routes/minorpurchase'), //零星采购
						require('./routes/newstoreit'), //零星采购－IT(新店／改造非GC-IT)
						require('./routes/newstoregc'), //新店CG
						// require('./routes/create-service'), //新建
						// require('./routes/add-edit'), //添加维修
						// require('./routes/add-restaurant'), //添加餐厅
						// require('./routes/reply'), //供应商响应
						// require('./routes/assess'), //供应商评估和确认
						// require('./routes/confrim-order'), //订单明细
						// require('./routes/equipment-info'), //订单明细
						require('./routes/log'),//流程日志
						require('./routes/file'),//附件- 图片
						require('./routes/filehistory'),//附件- 历史订单图片
						require('./routes/scrapped'),//资产报废
						require('./routes/scrappeddevice'),//资产报废
						require('./routes/approval'),//审批流程
						require('./routes/remarksdetail'),//备注详情
					])
				})
			}
		},{
			// 仅pc端操作的订单，统一待办地址
			path: '/todopc/:orderid',
			getComponents(location, callback) {
				require.ensure([], function (require) {
					callback(null, require('./chunk/TodoPC')["default"]);
				},'chunk/TodoPC.js')
			},
			onEnter:function(){
				jw.setTitle({title:'EPS提示'});
        NProgress.start();
      },
		},{
			// 仅pc端操作的订单，统一待办地址
			path: '/nopermiss',
			getComponents(location, callback) {
				require.ensure([], function (require) {
					callback(null, require('./chunk/Nopermiss')["default"]);
				},'chunk/Nopermiss.js')
			},
			onEnter:function(){
				jw.setTitle({title:'EPS提示'});
        NProgress.start();
      },
		},{
			path: '/test',
			getComponents(location, callback) {
				require.ensure([], function (require) {
					callback(null, require('./chunk/Test')["default"]);
				},'chunk/Test.js')
			},
		},{
			path:'/orderHomepage',
			getComponents(location, callback) {
				require.ensure([], function (require) {
					callback(null, require('./chunk/Log/Homepage')["default"]);
				}, 'chunk/Log/Homepage.js')
			}
		},{
      path: '*',
      component: NotFound,
			onEnter:function(){
				jw.setTitle({title:'404'});
				NProgress.done();
			}
    }
  ]
  return (
    <Router routes={routeConfig} history={hashHistory}/>
  );
};



