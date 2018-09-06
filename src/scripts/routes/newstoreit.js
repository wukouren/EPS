// 新店／改造非GC IT流程整体改造，单独拆出一套路由
import { registerModel } from './../constants';

module.exports = {
  path: 'newstoreit',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        {
          //新店非GC的PM审核，不能进行操作（不知道以后会不会打开6,4）
          // 需求阶段－Local PM确认（IT TSI确认）
          path: 'pmconfirm/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              jw.setTitle({ title: '确认明细' });
            },
            getComponent(location, callback) {
              require.ensure([], function (require) {
                let model = require('../models/NewStoreIT/PMConfirm')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/NewStoreIT/PMConfirm')["default"]);
              }, '../chunk/NewStoreIT/PMConfirm.js')
            }
          }
        },
        {
          // 需求阶段-DOA审批 （IT Func/Dept）	
          // type=1  代表普通审批
          path: 'approval/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              // 审批
              if (location.location.query.type == '1') {
                jw.setTitle({ title: '审批' });
              } else {
                jw.setTitle({ title: '404' });
              }
            },
            getComponent(location, callback) {
              // 审批
              if (location.location.query.type == '1') {
                require.ensure([], function (require) {
                  let model = require('../models/NewStoreIT/PMConfirm')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/NewStoreIT/PMConfirm')["default"]);
                }, '../chunk/NewStoreIT/PMConfirm.js')
                // 404
              } else {
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                }, '../chunk/NotFound.js')
              }
            }
          }
        },
        {
          // 订单阶段－DOA送货调整审批 type=1 （IT） (拆单后的)
          // 订单阶段－餐厅确认评价 type=4 （IT） (拆单后的)
          path: 'approvalorder/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              // 审批／调整审批 具体是审批还是调整审批，需要拿到订单信息以后通过节点状态来重新设置 
              if (location.location.query.type == '1') {
                jw.setTitle({ title: '调整审批' });
                // 餐厅确认收货(IT)
              } else if (location.location.query.type == '4') {
                jw.setTitle({ title: '确认收货' });
              } else {
                jw.setTitle({ title: '404' });
              }
            },
            getComponent(location, callback) {
              // 审批／调整审批 具体是审批还是调整审批，需要拿到订单信息以后通过节点状态来重新设置 
              if (location.location.query.type == '1' || location.location.query.type == '4') {
                require.ensure([], function (require) {
                  let model = require('../models/NewStoreIT/Approval')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/NewStoreIT/Approval')["default"]);
                }, '../chunk/NewStoreIT/Approval.js')
                // 404
              } else {
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                }, '../chunk/NotFound.js')
              }
            }
          }
        },
        {
          // 订单阶段－IT设备 列表页面
          // objecttype可以为 equipment project it
          path: 'info-list/:objecttype/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              let titles = { 'equipment': '设备明细', 'project': '工程明细', 'it': 'IT设备明细' };
              let title = titles[location.params.objecttype];
              jw.setTitle({ title: _.isUndefined(title) ? '404' : title });
            },
            getComponent(location, callback) {
              if (_.indexOf(['equipment', 'project', 'it'], location.params.objecttype) != -1) {
                require.ensure([], function (require) {
                  let model = require('../models/NewStoreIT/Approval')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/NewStoreIT/InfoList')["default"]);
                }, '../chunk/NewStoreIT/InfoList.js')
                // 404
              } else {
                require.ensure([], function (require) {
                  callback(null, require('../chunk/NotFound')["default"]);
                }, '../chunk/NotFound.js')
              }
            }
          }
        },
        {
          // PM确认供应商的需求明细－－餐厅列表
          path: 'pmstore-list/:orderid/:vendorNumber/:vendorType',
          indexRoute: {
            onEnter(location, hashHistory) {
              jw.setTitle({ title: '餐厅信息' });
            },
            getComponent(location, callback) {
              require.ensure([], function (require) {
                let model = require('../models/NewStoreIT/PMStoreList')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/NewStoreIT/PMStoreList')["default"]);
              }, '../chunk/NewStoreIT/PMStoreList.js')
            }
          }
        },
        {
          // PM确认供应商的需求明细－－采购明细列表（含设备,工程,IT）
          path: 'pminfo-list/:orderid/:vendorNumber/:storeNumber/:vendorType',
          indexRoute: {
            onEnter(location, hashHistory) {
              jw.setTitle({ title: '采购明细' });
            },
            getComponent(location, callback) {
              require.ensure([], function (require) {
                let model = require('../models/NewStoreIT/PMInfoList')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/NewStoreIT/PMInfoList')["default"]);
              }, '../chunk/NewStoreIT/PMInfoList.js')
            }
          }
        },
        {
          // 需求阶段-在途详情页面
          path: 'view/it/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              // jw.setTitle({title:'在途订单'});
              if (location.location.query && location.location.query.sta) {
                switch (location.location.query.sta) {
                  case '1':
                    jw.setTitle({ title: '在途订单' });
                    break;
                  case '2':
                    jw.setTitle({ title: '历史订单' });
                    break;
                }
              } else {
                jw.setTitle('404');
              }
            },
            getComponent(location, callback) {
              require.ensure([], function (require) {
                let model = require('../models/NewStoreIT/PMConfirm')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/NewStoreIT/PMConfirm')["default"]);
              }, '../chunk/NewStoreIT/PMConfirm.js')
            }
          }
        },
        {
          /** 订单阶段-在途详情页面
           *
           * @param objecttype: equipment project it
           * @param orderid 订单ID
           */
          path: 'vieworder/:objecttype/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              // jw.setTitle({title:'在途订单'});
              if (location.location.query && location.location.query.sta) {
                switch (location.location.query.sta) {
                  case '1':
                    jw.setTitle({ title: '在途订单' });
                    break;
                  case '2':
                    jw.setTitle({ title: '历史订单' });
                    break;
                }
              } else {
                jw.setTitle('404');
              }
            },
            getComponent(location, callback) {
              if (_.indexOf(['it'], location.params.objecttype) != -1) {
                require.ensure([], function (require) {
                  let model = require('../models/NewStoreIT/Approval')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/NewStoreIT/Approval')["default"]);
                }, '../chunk/NewStoreIT/Approval.js')
              }
            }
          }
        },
      ]
      )

    })
  }
}
