import { registerModel } from './../constants';
// 待办路由
module.exports = {
	// 待办列表，状态(我的待办／未完结)，类别（全部／维修／非项目／新店日常／保养／项目／新店GC）
	path: 'todo-info',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'订单详情'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/TodoInfo')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/Todos/Info')["default"])
			}, 'chunk/Todos/Index.js')
		}
	}
}
