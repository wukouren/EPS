import { registerModel } from './../constants';
module.exports = {
	path: 'log/:orderid',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'流程日志'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/Log')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/Log/Log')["default"]);
			}, 'chunk/Log/Log.js')
		}
	}
}
