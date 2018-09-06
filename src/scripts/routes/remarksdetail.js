import { registerModel } from './../constants';
// 备注详情
module.exports = {
	// 备注详情
	path: 'remarksdetail',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'备注详情'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/RemarksDetail')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/RemarksDetail')["default"])
			}, 'chunk/RemarksDetail.js')
		}
	}
}
