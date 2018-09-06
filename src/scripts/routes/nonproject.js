// 非项目页面相关路由
import { registerModel, MAINTYPE_DICTS, isRightRoter } from '../constants';

module.exports = {
  path: 'nonproject',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
      	{
      		// 新建维修流程 objecttype可以为 equipment project it
					path: 'createpo/:objecttype(/:orderid)',
					indexRoute: {
            onEnter(location,hashHistory){
            	console.log('location:',location,hashHistory)
              NProgress.done();
              let title;
              if(isRightRoter(location.params.objecttype)){
                title = location.params.orderid ? ('调整'+MAINTYPE_DICTS[location.params.objecttype]+'采购需求') : ('创建'+MAINTYPE_DICTS[location.params.objecttype]+'采购需求');
              }else{
                title = '404';
              }
              jw.setTitle({title:title});
            },
          	getComponent(location, callback) {
              if(isRightRoter(location.params.objecttype)){
                require.ensure([], function (require) {
                  let model = require('../models/NonProject/Create')["default"];
                  registerModel(app,model);
                  callback(null, require('../chunk/NonProject/Create')["default"]);
                },'../chunk/NonProject/Create.js')
              }else{
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                },'../chunk/NotFound.js')
              }
			      }
          }
        },
        {
          // 审批 （含设备／工程／IT）(审批节点含： OC审批，OM审批，DO审批，GM审批，DOA审批，送货调整DOA审批) 送货调整DOA审批-deliverdoa
          // objecttype可以为 equipment project it
          // type=1  代表普通审批    type=4  表示餐厅提交
          path: 'approval/:objecttype/:orderid',
          indexRoute: {
            onEnter(location,hashHistory){
              console.log('location:',location,hashHistory)
              NProgress.done();
              if(location.location.query.type){
                console.log('走这里了吗')
                let type=location.location.query.type;
                if(type=='4'){
                  jw.setTitle({title:'餐厅确认'})
                }else if(type=='10'){
                  jw.setTitle({title:'审批'});
                }else if(type=='1'){
                  jw.setTitle({title:'DOA审批'})
                }else if(type=='3'){
                  jw.setTitle({title:'调整后审批'})
                }
              }else{
                jw.setTitle( '404' );
              }
            },
            getComponent(location, callback) {
              if(isRightRoter(location.params.objecttype)){
                require.ensure([], function (require) {
                  let model = require('../models/NonProject/Approval')["default"];
                  let objecttype=location.params.objecttype;
                  let type=location.query.type;
                  let subProcessList={
                    'equipment':{
                      '1':'32',
                      '3':'32',
                      '4':'32',
                      '10':'31'
                    },
                    'it':{
                      '1':'33',
                      '3':'33',
                      '4':'33',
                      '10':'36'
                    },
                    'project':{
                      '1':'34',
                      '3':'34',
                      '4':'34',
                      '10':'36'
                    }
                  }
                  // console.log(objecttype,'objecttypeobjecttypeobjecttypeobjecttypeobjecttype');
                  model.state['objecttype'] = objecttype;
                  model.state['subProcess'] = subProcessList[objecttype][type];
                  registerModel(app,model);
                  callback(null, require('../chunk/NonProject/Approval')["default"]);
                },'../chunk/NonProject/Approval.js')
              }else{
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                },'../chunk/NotFound.js')
              }
            }
          }
        },
        {
          //查看更多供应商信息
          path: 'vendor-info/:orderid/:objecttype/:type',
          indexRoute: {
            onEnter(location,hashHistory){
               NProgress.done();
               console.log(location,"location")
              if(location.params.orderid){
                switch(location.params.objecttype){
                  case 'equipment':
                  jw.setTitle({title:'设备明细'});
                  break;
                  case 'project':
                  jw.setTitle({title:'工程明细'});
                  break;
                  case 'it':
                  jw.setTitle({title:'IT明细'});
                  break;
                }
              }else{
                jw.setTitle( '404' );
              }
            },
            getComponent(location, callback) {
              console.log(location,"location")
              if(location.params.orderid){
                require.ensure([], function (require) {
                  let model = require('../models/NonProject/NoProjectInfo')["default"];

                  registerModel(app,model);
                  callback(null, require('../chunk/NonProject/NoProjectInfo')["default"]);
                },'../chunk/NonProject/NoProjectInfo.js')
              }else{
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                },'../chunk/NotFound.js')
              }
            }
          }
        },
         {
          //查看在途、历史订单信息
          path: 'view-info/:view/:objecttype/:orderid',
          indexRoute: {
            onEnter(location,hashHistory){
              NProgress.done();
              if(location.location.query&&location.location.query.sta){
                switch(location.location.query.sta){
                  case '1':
                    jw.setTitle({title:'在途订单'});
                    break;
                  case '2':
                    jw.setTitle({title:'历史订单'});
                    break;
                }
              }else{
                jw.setTitle( '404' );
              }
              /*if(location.params.view){
                switch(location.params.view){
                  case 'view':
                  jw.setTitle({title:'在途订单'});
                  break;
                  case 'vieworder':
                  jw.setTitle({title:'在途订单'});
                  break;
                }
              }else{
                jw.setTitle( '404' );
              }*/
            },
            getComponent(location, callback) {
              console.log(location,"location")
              if(location.params.orderid){
                require.ensure([], function (require) {
                  let objecttype=location.params.objecttype;
                  let view=location.params.view;
                  let subProcessList={
                    'view':{
                      'equipment':'31',
                      'project':'35',
                      'it':'36'
                    },
                    'vieworder':{
                      'equipment':'32',
                      'project':'33',
                      'it':'34'
                    }
                  }
                  let model = require('../models/NonProject/Approval')["default"];
                  model.state['subProcess'] = subProcessList[view][objecttype];
                  model.state['objecttype'] = objecttype;
                  registerModel(app,model);
                  callback(null, require('../chunk/NonProject/Approval')["default"]);
                },'../chunk/NonProject/Approval.js')
              }else{
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                },'../chunk/NotFound.js')
              }
            }
          }
        }
        ]
      )
					
    })
  }
}
