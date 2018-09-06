import { registerModel } from './../constants';
module.exports = {
	path: 'newstoregc',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [{
				path: 'approval/:orderid',
				indexRoute: {
					onEnter(){
						jw.setTitle({title:'DOA审批'});
					},
					getComponent(location, callback) {
						require.ensure([], (require) => {
							let model = require('../models/NewstoreGC/Approval')["default"];
							registerModel(app,model);
							callback(null, require('../chunk/NewstoreGC/Approval')["default"]);
						}, 'chunk/NewstoreGC/Approval.js')
					}
				}
			},{
				path: 'view/:orderid',
				indexRoute: {
					onEnter(location){
						// jw.setTitle({title:'途中订单'});
						if(location.location.query&&location.location.query.sta){
              switch(location.location.query.sta){
                case '1':
                  jw.setTitle({title:'在途订单'});
                  break;
                case '2':
                  jw.setTitle({title:'历史订单'});
                  break;
              }
            }
					},
					getComponent(location, callback) {
						require.ensure([], (require) => {
							let model = require('../models/NewstoreGC/Approval')["default"];
							registerModel(app,model);
							callback(null, require('../chunk/NewstoreGC/Approval')["default"]);
						}, 'chunk/NewstoreGC/Approval.js')
					}
				}
			}])
		})
	}
}
