import { registerModel } from './../constants';
// 待办路由
module.exports = {
	// 待办列表，状态(0-我的待办／1-途中订单/2-历史订单)，类别（全部／维修／非项目／新店日常／保养／项目／新店GC）
  path: 'todos(/type/:type/status/:status)',
  indexRoute: {
  	onEnter(){
			/*jw.showTabs({
				tabs:[
					"我的待办","在途订单","历史订单"
				],
				position:'top',//是否设置在顶部
				style:"F55928",
        focusidx:status
			});
      // 过滤按钮
      jw.setFuncBtns([{type:0}]);*/
      typeof(jw.setHeaderLine)=='function' ? jw.setHeaderLine({status:0}) : '';
		},
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
				let model = require('./../models/Todos')["default"],
          params = nextState.query;
        model.state.status = typeof params.status=='undefined'?0:params.status;
        model.state.businessType = typeof params.type=='undefined'?'all':params.type;
				registerModel(app,model);
        cb(null, require('./../chunk/Todos/Index')["default"])
      }, 'chunk/Todos/Index.js')
    } 
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {cb(null, [
        {
          path: 'filter',
          indexRoute: {
            onEnter(location,hashHistory){
              jw.setTitle({title:'筛选'});
            },
            getComponent(location, callback) {
              require.ensure([], function (require) {
                // let model = require('../models/todosFilter')["default"];
                let model = require('../models/Todos')["default"];
                registerModel(app,model);
                callback(null, require('../chunk/Todos/Filter')["default"]);
              },'../chunk/Todos/filter.js')
            }
          }
        },
      ])
    })
  }
}
