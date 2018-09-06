// 项目采购相关路由
import { registerModel, MAINTYPE_DICTS, isRightRoter } from '../constants';

module.exports = {
  path: 'project',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        {
          // PM确认供应商的需求明细（含设备／工程／IT），不需要区分
          path: 'pmconfirm/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              jw.setTitle({ title: '确认明细' });
            },
            getComponent(location, callback) {
              require.ensure([], function (require) {
                let model = require('../models/Project/PMConfirm')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/Project/PMConfirm')["default"]);
              }, '../chunk/Project/PMConfirm.js')
            }
          }
        },
        {
          /* 
            项目采购需求：
            1. Local PM确认供应商的需求明细： 设备／工程／IT 获取供应商需求明细 接口中，返回字段中都会加一个市场信息的list，待后面出图排产
            2. DOA审批 设备／工程／IT 页面，也会增加市场信息的list展示，待后面出图排产,和1共用一个页面
            3. 餐厅确认评价（设备／工程）／餐厅确认收货（IT）,页面不会展示市场信息list,但和4是共用的一个页面
            4. 送货调整，DOA审批：（设备／工程），会增加市场信息的list展示，（IT）是否有市场信息的list展示，待德勤 确认？
          */
          // 审批 （含设备／工程／IT）(审批节点： DOA审批) (拆单前的)
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
                  let model = require('../models/Project/PMConfirm')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/Project/PMConfirm')["default"]);
                }, '../chunk/Project/PMConfirm.js')
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
          // 调整审批 type=1 （含设备／工程／IT）(审批节：送货调整DOA审批) (拆单后的)
          // 餐厅确认评价(设备，工程)／ 餐厅确认收货(IT) type=4 (含设备／工程／IT)
          // objecttype可以为 equipment project it
          path: 'approval/:objecttype/:orderid',
          indexRoute: {
            onEnter(location, hashHistory) {
              // 审批／调整审批 具体是审批还是调整审批，需要拿到订单信息以后通过节点状态来重新设置 
              if (location.location.query.type == '1') {
                jw.setTitle({ title: '调整审批' });
                // 餐厅确认评价(设备，工程)／ 餐厅确认收货(IT)
              } else if (location.location.query.type == '4') {
                jw.setTitle({ title: '确认评价' });
                // jw.setTitle({title:(location.params.objecttype=='it' ? '确认收货' : '确认评价')});
              } else {
                jw.setTitle({ title: '404' });
              }
            },
            getComponent(location, callback) {
              // 审批／调整审批 具体是审批还是调整审批，需要拿到订单信息以后通过节点状态来重新设置 
              if (location.location.query.type == '1' || location.location.query.type == '4') {
                require.ensure([], function (require) {
                  let model = require('../models/Project/Approval')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/Project/Approval')["default"]);
                }, '../chunk/Project/Approval.js')
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
          // 设备，工程，IT 列表页面
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
                  let model = require('../models/Project/Approval')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/Project/InfoList')["default"]);
                }, '../chunk/Project/InfoList.js')
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
                let model = require('../models/Project/PMStoreList')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/Project/PMStoreList')["default"]);
              }, '../chunk/Project/PMStoreList.js')
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
                let model = require('../models/Project/PMInfoList')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/Project/PMInfoList')["default"]);
              }, '../chunk/Project/PMInfoList.js')
            }
          }
        },
        {
          // 项目需求在途详情页面
          path: 'view/:orderid',
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
                let model = require('../models/Project/PMConfirm')["default"];
                registerModel(app, model);
                callback(null, require('../chunk/Project/PMConfirm')["default"]);
              }, '../chunk/Project/PMConfirm.js')
            }
          }
        },
        {
          /** 项目订单在途详情页面
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
              if (_.indexOf(['equipment', 'project', 'it'], location.params.objecttype) != -1) {
                require.ensure([], function (require) {
                  let model = require('../models/Project/Approval')["default"];
                  registerModel(app, model);
                  callback(null, require('../chunk/Project/Approval')["default"]);
                }, '../chunk/Project/Approval.js')
              }
            }
          }
        },
      ]
      )

    })
  }
}
