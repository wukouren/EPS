import { registerModel } from './../constants';
module.exports = {
	path: 'file/:orderid',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'附件'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/File')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/Log/File')["default"]);
			}, 'chunk/Log/File.js')
		}
	}
}
