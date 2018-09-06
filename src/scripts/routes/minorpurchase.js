import { registerModel } from './../constants';
module.exports = {
	path: 'minorpurchase',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [{
				path: 'approval',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [
							{
								path: 'equipment/:orderid',
								indexRoute: {
									onEnter(){
										// NProgress.done();
										jw.setTitle({title:'DOA审批'});
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Minorpurchase/Approval')["default"];
											model.state['model_type'] = 'equipment';
											registerModel(app,model);
											callback(null, require('../chunk/Minorpurchase/Approval')["default"]);
										},'../chunk/Minorpurchase/Approval.js')
									}
								}
							},{
								path:'equipmentDetail',
								indexRoute:{
									onEnter(){
										jw.setTitle({title:'工程明细'});
									},
								getComponent(location,callback){
									require.ensure([],function(require){
										// let model=require('../models/Minorpurchase/equipmentDetail')["default"];
										// registerModel(app,model);
										callback(null,require('../chunk/Minorpurchase/equipmentDetail')["default"]);
									},'../chunk//Minorpurchase/equipmentDetail.js')
								}
								}
							},
							{
								path: 'it/:orderid',
								indexRoute: {
									onEnter(){
										// NProgress.done();
										jw.setTitle({title:'DOA审批'});
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Minorpurchase/Approval')["default"];
											model.state['model_type'] = 'it';
											registerModel(app,model);
											callback(null, require('../chunk/Minorpurchase/Approval')["default"]);
										},'../chunk/Minorpurchase/Approval.js')
									}
								}
							}
			      ])
					})
				}
			},{
				path: 'vieworder',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [
							{
								path: 'equipment/:orderid',
								indexRoute: {
									onEnter(location){
										// NProgress.done();
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
										// jw.setTitle({title:'途中订单'});
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Minorpurchase/Approval')["default"];
											model.state['model_type'] = 'equipment';
											registerModel(app,model);
											callback(null, require('../chunk/Minorpurchase/Approval')["default"]);
										},'../chunk/Minorpurchase/Approval.js')
									}
								}
							},
							{
								path: 'it/:orderid',
								indexRoute: {
									onEnter(location){
										// NProgress.done();
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
										require.ensure([], function (require) {
											let model = require('../models/Minorpurchase/Approval')["default"];
											model.state['model_type'] = 'it';
											registerModel(app,model);
											callback(null, require('../chunk/Minorpurchase/Approval')["default"]);
										},'../chunk/Minorpurchase/Approval.js')
									}
								}
							}
			      ])
					})
				}
			},{
				path: 'view',
				getChildRoutes(partialNextState, cb) {
					require.ensure([], (require) => {
						cb(null, [
							{
								path: 'it/:orderid',
								indexRoute: {
									onEnter(){
										// NProgress.done();
										jw.setTitle({title:'途中订单'});
									},
									getComponent(location, callback) {
										require.ensure([], function (require) {
											let model = require('../models/Minorpurchase/Approval')["default"];
											model.state['model_type'] = 'it';
											registerModel(app,model);
											callback(null, require('../chunk/Minorpurchase/Approval')["default"]);
										},'../chunk/Minorpurchase/Approval.js')
									}
								}
							}
			      ])
					})
				}
			}])
		})
	}
}
