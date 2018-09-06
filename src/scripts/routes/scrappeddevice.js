import { registerModel } from './../constants';
module.exports = {
	path: 'scrappeddevice',
	indexRoute: {
		onEnter(){
			jw.setTitle({title:'挑选资产报废'});
		},
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				let model = require('../models/Scrapped')["default"];
				registerModel(app,model);
				cb(null, require('../chunk/Log/ScrappedDevice')["default"]);
			}, 'chunk/Log/ScrappedDevice.js')
		}
	}
}
