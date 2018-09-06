import { registerModel } from './../constants';
module.exports = {
	path: 'approval/:orderid',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'审批流程'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/Approval')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/Log/Approval')["default"]);
			}, 'chunk/Log/Approval.js')
		}
	}
}
