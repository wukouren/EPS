import { registerModel } from './../constants';
module.exports = {
	path: 'orderHomepage(/:id)',
	indexRoute: {
		onEnter(){
			// jw.setTitle({title:'流程日志'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				// let model = require('../models/Log')["default"];
				// registerModel(app,model);
				cb(null, require('../chunk/Log/Homepage')["default"]);
			}, 'chunk/Log/Homepage.js')
		}
	}
}
