import { registerModel } from './../constants';
module.exports = {
	path: 'scrapped/:orderid',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'资产报废'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/Scrapped')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/Log/Scrapped')["default"]);
			}, 'chunk/Log/Scrapped.js')
		}
	}
}
