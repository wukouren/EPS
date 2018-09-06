// 保养页面相关路由
import { registerModel } from '../constants';
module.exports = {
	path: 'maintenance',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [{
				path: 'equipment',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [
							{
								path: 'approval/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '审批' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/Approval')["default"];
											model.state['model_type'] = 'equipment';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Approval')["default"]);
										}, '../chunk/Maintenance/Approval.js')
									}
								}
							}, {
								path: 'reply/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '供应商回复' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/Reply')["default"];
											model.state['model_type'] = 'equipment';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Reply')["default"]);
										}, '../chunk/Maintenance/Reply.js')
									}
								}
							}, {
								path: 'reply-list/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '设备明细' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/ReplyList')["default"];
											model.state['model_type'] = 'equipment';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/ReplyList')["default"]);
										}, '../chunk/Maintenance/ReplyList.js')
									}
								}
							}, {
								path: 'confirm/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '保养确认' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											// let model = require('../models/Maintenance/Confrim')["default"];
											// registerModel(app,model);
											let model = require('../models/Maintenance/Confirm')['default'];
											model.state['model_type'] = 'equipment';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Confrim')["default"]);
										}, '../chunk/Maintenance/Confrim.js')
									}
								}
							}, {
								path: 'device-list/:orderid',
								//Assess
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '设备明细' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/DeviceList')['default'];
											model.state['model_type'] = 'equipment';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/DeviceList')["default"]);
										}, '../chunk/Maintenance/DeviceList.js')
									}
								}
							}, {
								path: 'assess/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '订单确认评价' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/Assess')['default'];
											model.state['model_type'] = 'equipment';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Assess')["default"]);
										}, '../chunk/Maintenance/Assess.js')
									}
								}
							}
						])
					})
				}
			}, {
				path: 'project',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [
							{
								path: 'approval/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '审批' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/Approval')["default"];
											model.state['model_type'] = 'project';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Approval')["default"]);
										}, '../chunk/Maintenance/Approval.js')
									}
								}
							}, {
								path: 'reply/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '供应商回复' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/Reply')["default"];
											model.state['model_type'] = 'project';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Reply')["default"]);
										}, '../chunk/Maintenance/Reply.js')
									}
								}
							}, {
								path: 'reply-list/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '设备明细' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/ReplyList')["default"];
											model.state['model_type'] = 'project';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/ReplyList')["default"]);
										}, '../chunk/Maintenance/ReplyList.js')
									}
								}
							}, {
								path: 'confirm/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '保养确认' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											// let model = require('../models/Maintenance/Confrim')["default"];
											// registerModel(app,model);
											let model = require('../models/Maintenance/Confirm')['default'];
											model.state['model_type'] = 'project';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Confrim')["default"]);
										}, '../chunk/Maintenance/Confrim.js')
									}
								}
							}, {
								path: 'device-list/:orderid',
								//Assess
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '设备明细' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/DeviceList')['default'];
											model.state['model_type'] = 'project';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/DeviceList')["default"]);
										}, '../chunk/Maintenance/DeviceList.js')
									}
								}
							}, {
								path: 'assess/:orderid',
								indexRoute: {
									onEnter() {
										// NProgress.done();
										jw.setTitle({ title: '订单确认评价' });
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Maintenance/Assess')['default'];
											model.state['model_type'] = 'project';
											registerModel(app, model);
											callback(null, require('../chunk/Maintenance/Assess')["default"]);
										}, '../chunk/Maintenance/Assess.js')
									}
								}
							}
						])
					})
				}
			}, {
				path: 'view',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [{
							path: 'equipment/:orderid',
							indexRoute: {
								onEnter(location) {
									// jw.setTitle({title:'途中订单'});
									if (location.location.query && location.location.query.sta) {
										switch (location.location.query.sta) {
											case '1':
												jw.setTitle({ title: '在途订单' });
												break;
											case '2':
												jw.setTitle({ title: '历史订单' });
												break;
										}
									}
								},
								getComponent(location, callback) {
									require.ensure([], function (require) {
										let model = require('../models/Maintenance/Approval')["default"];
										model.state['model_type'] = 'equipment';
										registerModel(app, model);
										callback(null, require('../chunk/Maintenance/Approval')["default"]);
									}, '../chunk/Maintenance/Approval.js')
								}
							}
						}, {
							path: 'project/:orderid',
							indexRoute: {
								onEnter(location) {
									// jw.setTitle({title:'途中订单'});
									if (location.location.query && location.location.query.sta) {
										switch (location.location.query.sta) {
											case '1':
												jw.setTitle({ title: '在途订单' });
												break;
											case '2':
												jw.setTitle({ title: '历史订单' });
												break;
										}
									}
								},
								getComponent(location, callback) {
									require.ensure([], function (require) {
										let model = require('../models/Maintenance/Approval')["default"];
										model.state['model_type'] = 'project';
										registerModel(app, model);
										callback(null, require('../chunk/Maintenance/Approval')["default"]);
									}, '../chunk/Maintenance/Approval.js')
								}
							}
						}])
					})
				}
			}, {
				path: 'vieworder',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [{
							path: 'equipment/:orderid',
							indexRoute: {
								onEnter(location) {
									if (location.location.query && location.location.query.sta) {
										switch (location.location.query.sta) {
											case '1':
												jw.setTitle({ title: '在途订单' });
												break;
											case '2':
												jw.setTitle({ title: '历史订单' });
												break;
										}
									}
								},
								getComponent(location, callback) {
									require.ensure([], function (require) {
										let model = require('../models/Maintenance/Assess')['default'];
										model.state['model_type'] = 'equipment';
										registerModel(app, model);
										callback(null, require('../chunk/Maintenance/Assess')["default"]);
									}, '../chunk/Maintenance/Assess.js')
								}
							}
						}, {
							path: 'project/:orderid',
							indexRoute: {
								onEnter(location) {
									if (location.location.query && location.location.query.sta) {
										switch (location.location.query.sta) {
											case '1':
												jw.setTitle({ title: '在途订单' });
												break;
											case '2':
												jw.setTitle({ title: '历史订单' });
												break;
										}
									}
								},
								getComponent(location, callback) {
									require.ensure([], function (require) {
										let model = require('../models/Maintenance/Assess')['default'];
										model.state['model_type'] = 'project';
										registerModel(app, model);
										callback(null, require('../chunk/Maintenance/Assess')["default"]);
									}, '../chunk/Maintenance/Assess.js')
								}
							}
						}])
					})
				}
			}])
		})
	}
}
