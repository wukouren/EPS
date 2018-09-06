// 维修页面相关路由
import { registerModel } from '../constants';

module.exports = {
  path: 'repairing',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
      	{
      		// 新建维修流程
					path: 'createpo',
					getChildRoutes(partialNextState, cb) {
				    require.ensure([], (require) => {
				      cb(null, [
				        {
				        	// 新建设备维修
				          path: 'equipment',
				          indexRoute: {
				            onEnter(){
											NProgress.done();
				              jw.setTitle({title:'创建设备维修'});
				            },
				          	getComponent(location, callback) {
							        require.ensure([], function (require) {
							          let model = require('../models/Repair/Device')["default"];
							          registerModel(app,model);
							          callback(null, require('../chunk/Repair/CreateDevice')["default"]);
							        },'../chunk/Repair/CreateDevice.js')
							      }
				          }
				        },
				        {
				        	// 新建工程维修 todo
				          path: 'project',
				          indexRoute: {
										onEnter(){
				              jw.setTitle({title:'创建工程维修'});
				            },
				            getComponent(location, callback) {
							        require.ensure([], function (require) {
							          let model = require('../models/Repair/Project')["default"];
							          registerModel(app,model);
							          callback(null, require('../chunk/Repair/CreateProject')["default"]);
							        },'../chunk/Repair/CreateProject.js')
							      }
				          }
				        },
				        {
				        	// 新建IT维修 
				          path: 'it',
				          indexRoute: {
				          	onEnter(){
				              jw.setTitle({title:'创建IT维修'});
				            },
				            getComponent(location, callback) {
							        require.ensure([], function (require) {
							          let model = require('../models/Repair/IT')["default"];
							          registerModel(app,model);
							          callback(null, require('../chunk/Repair/CreateIT')["default"]);
							        },'../chunk/Repair/CreateIT.js')
							      }
				          }
				        },
				      ])
						})
					}
				},{
					// 选择对象 设备／配件／工程／餐厅
					path: 'add-edit',
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [{
				          // 选择设备
				          path: 'equipment',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'添加维修设备'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/DeviceSearch')["default"]);
				              },'../chunk/Repair/DeviceSearch.js')
				            }
				          }
				        },
				        {
				          // 选择设备配件 设备信息等通过cache传递到PartsSearch组件
				          path: 'parts',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'添加设备配件'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/PartsSearch')["default"]);
				              },'../chunk/Repair/PartsSearch.js')
				            }
				          }
				        },
				        {
				          // 选择IT设备配件 it设备信息等通过cache传递到ItPartsSearch组件
				          path: 'itparts',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'添加设备配件'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/ItPartsSearch')["default"]);
				              },'../chunk/Repair/ItPartsSearch.js')
				            }
				          }
				        },
				        {
				          // 选择工程
				          path: 'project',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'添加维修工程'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/ProjectSearch')["default"]);
				              },'../chunk/Repair/ProjectSearch.js')
				            }
				          }
				        },
				        {
				          // 选择IT设备
				          path: 'it',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'添加维修IT设备'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/ItSearch')["default"]);
				              },'../chunk/Repair/ItSearch.js')
				            }
				          }
				        },
				        {
				          // 选择餐厅
				          path: 'store',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'添加餐厅'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/StoreSearch')["default"]);
				              },'../chunk/Repair/StoreSearch.js')
				            }
				          }
				        },{
				          // 选择供应商
				          path: 'repairstore',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'选择供应商'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/RepairStoreSearch')["default"]);
				              },'../chunk/Repair/RepairStoreSearch.js')
				            }
				          }
				        },{
				          // 选择资产报废
				          path: 'scrapped',
				          indexRoute: {
				            onEnter(){
				              jw.setTitle({title:'挑选资产报废'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], function (require) {
				                let searchModel = require('../models/ObjectSelectList')["default"];
				                registerModel(app,searchModel);
				                callback(null, require('../chunk/Repair/ScrappedSearch')["default"]);
				              },'../chunk/Repair/ScrappedSearch.js')
				            }
				          }
				        }
				      ])
						})
					}
				},{
					// 供应商评估/确认 type=1 供应商评估  2 供应商确认订单 
					path: 'assess',
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [{
				        // 供应商评估-设备  注：工程类维修无评估／确认
				        path: 'equipment/:orderid',
								indexRoute: {
									onEnter(location){
										if(location.location.query.type == 1){
											jw.setTitle({title:'供应商评估'});
										}else if(location.location.query.type == 2){
											jw.setTitle({title:'维修确认'});
										}else{
											jw.setTitle({title:'404'});
										}
										NProgress.done();
										jw.setFuncBtns([{type:4}]);
									},
									getComponent(location, callback) {
										if( location.location.query.type == 1 || location.location.query.type == 2 ){
			                require.ensure([], function (require) {
					              let model = require('../models/Repair/SupplierEvaluation')["default"];
					              registerModel(app,model);
					              callback(null, require('../chunk/Repair/SupplierEvaluation')["default"]);
					            },'../chunk/Repair/SupplierEvaluation.js')
			              }else{
			                require.ensure([], function (require) {
			                  callback(null, require('../chunk/NotFound')["default"]);
			                },'../chunk/NotFound.js')
			              }
				          }
								}
							},
			        {
			        	// 餐厅拒绝后，供应商重新评估订单，也是此组件，调用时，需传type=1
				        // 供应商确认-IT 同createpo/it共用同一组件 此组件修改时需做判断  真正调用时 需传 ?type=2
				        path: 'it/:orderid',
								indexRoute: {
									onEnter(location){
										if(location.location.query.type == 1){
											jw.setTitle({title:'重新评估IT维修'});
										}else if(location.location.query.type == 2){
											jw.setTitle({title:'订单确认'});
										}else{
											jw.setTitle({title:'404'});
										}
										jw.setFuncBtns([{type:4}]);
									},
									getComponent(location, callback) {
						        require.ensure([], function (require) {
						          let model = require('../models/Repair/IT')["default"];
						          registerModel(app,model);
						          callback(null, require('../chunk/Repair/CreateIT')["default"]);
						        },'../chunk/Repair/CreateIT.js')
						      }
								}
							}
							])
						})
					}
				},{
					// 供应商响应
					path: 'response',
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [{
				        // 供应商响应-设备
				        path: 'equipment/:orderid',
								indexRoute: {
									onEnter(){
										jw.setTitle({title:'供应商响应'});
										jw.setFuncBtns([{type:4}]);
									},
									getComponent(location, callback) {
				            require.ensure([], function (require) {
				              let model = require('../models/Repair/SupplierResponseDevice')["default"];
				              registerModel(app,model);
				              callback(null, require('../chunk/Repair/SupplierResponse')["default"]);
				            },'../chunk/Repair/SupplierResponse.js')
				          }
								}
							},
			        {
				        // 供应商响应-工程 
				        path: 'project/:orderid',
								indexRoute: {
									onEnter(){
										
										jw.setTitle({title:'供应商响应'});
										jw.setFuncBtns([{type:4}]);
									},
									getComponent(location, callback) {
				            require.ensure([], function (require) {
				              let model = require('../models/Repair/SupplierResponse')["default"];
				              registerModel(app,model);
				              callback(null, require('../chunk/Repair/SupplierResponseProject')["default"]);
				            },'../chunk/Repair/SupplierResponseProject.js')
				          }
								}
							},
							])
						})
					}
				},{
					// 供应商-设备维修详单
					path: 'maintenance-details/equipment/:orderid/:equipmentid',
				  indexRoute: {
				    onEnter(){
							NProgress.done();
				      jw.setTitle({title:'设备维修详单'});
				    },
				    getComponent(location, callback) {
				      require.ensure([], function (require) {
				        let model = require('../models/Repair/MaintenanceDetailsDevice')["default"];
				        registerModel(app,model);
				        callback(null, require('../chunk/Repair/MaintenanceDetailsDevice')["default"]);
				      },'../chunk/Repair/MaintenanceDetailsDevice.js')
				    }
				  },
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [])
						})
					}
				},{
					// TSI-IT维修详单 IT设备信息由localstorage中获取，以willEditITEquipment字段存储在localstorage里了
					path: 'maintenance-details/it',
				  indexRoute: {
				    onEnter(){
				      jw.setTitle({title:'IT维修详单'});
				    },
				    getComponent(location, callback) {
				      require.ensure([], function (require) {
				        let model = require('../models/Repair/MaintenanceDetailsIT')["default"];
				        registerModel(app,model);
				        callback(null, require('../chunk/Repair/MaintenanceDetailsIT')["default"]);
				      },'../chunk/Repair/MaintenanceDetailsIT.js')
				    }
				  },
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [])
						})
					}
				},{
					// 设备信息编辑
					path: 'edit-info/equipment/:orderid/:equipmentid',
				  indexRoute: {
				    onEnter(){
							NProgress.done();
				      jw.setTitle({title:'设备信息编辑'});
				    },
				    getComponent(location, callback) {
				      require.ensure([], function (require) {
				        let model = require('../models/Repair/EditEquipment')["default"];
				        registerModel(app,model);
				        callback(null, require('../chunk/Repair/EditEquipment')["default"]);
				      },'../chunk/Repair/EditEquipment.js')
				    }
				  },
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [])
						})
					}
				},{
					// IT设备信息编辑  IT设备信息从localstorage里面取 不需要通过链接传递
					path: 'edit-info/it',
				  indexRoute: {
				    onEnter(){
				      jw.setTitle({title:'设备信息编辑'});
				    },
				    getComponent(location, callback) {
				      require.ensure([], function (require) {
				        let model = require('../models/Repair/EditEquipmentIT')["default"];
				        registerModel(app,model);
				        callback(null, require('../chunk/Repair/EditEquipmentIT')["default"]);
				      },'../chunk/Repair/EditEquipmentIT.js')
				    }
				  },
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [])
						})
					}
				},{
					// type= 1:餐厅待确认 2：DOA审批 3：审批未通过，餐厅再次审批(3和1合并，3作废) 4：餐厅确认订单，评价
      		path:'process',
					onEnter(){
					},
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [
								{
									path: 'equipment/:orderid',
									indexRoute: {
				            onEnter(){
				            },
				            getComponent(location, callback) {
				              require.ensure([], (require) => {
												let model = require('../models/Repair/ProcessDevice')["default"];
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessDevice')["default"]);
											}, '../chunk/Repair/ProcessDevice.js')
				            }
				          }
								},{
									path: 'it/:orderid',
									indexRoute: {
										onEnter(){
										},
										getComponent(location, callback) {
											require.ensure([], (require) => {
												let model = require('../models/Repair/Process')["default"];
												model['state']['processType'] = 'it'
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessIt')["default"]);
											}, '../chunk/Repair/ProcessIt.js')
										}
									}
								},{
									path: 'project/:orderid',
									indexRoute: {
										onEnter(){
										},
										getComponent(location, callback) {
											require.ensure([], (require) => {
												let model = require('../models/Repair/Process')["default"];
												model['state']['processType'] = 'project'
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessProject')["default"]);
											}, '../chunk/Repair/ProcessProject.js')
										}
									}
								}
							])
						})
					}
				},{
					// 审批
					path: 'approval',
					indexRoute: {
						onEnter(){
							NProgress.done();
							jw.setTitle({title:'审批流程'});
						},
						getComponent(nextState, cb) {
							require.ensure([], (require) => {
								// let model = require('../models/Log')["default"];
								// registerModel(app,model);
								cb(null, require('../chunk/Log/Approval')["default"]);
							}, 'chunk/Log/Approval.js')
						}
					}
				},{
					// 编辑
					path: 'edit-money/:orderid/:equipmentid',
					indexRoute: {
						onEnter(){
							NProgress.done();
							jw.setTitle({title:'维修费用编辑'});
						},
						getComponent(location, callback) {
							require.ensure([], function (require) {
								let model = require('../models/Repair/EditMoney')["default"];
								registerModel(app,model);
								callback(null, require('../chunk/Repair/EditMoney')["default"]);
							},'../chunk/Repair/EditMoney.js')
						}
					}
				},{
					path: 'equipment-info/:orderid',
					indexRoute: {
						onEnter(){
							NProgress.done();
							jw.setTitle({title:'设备明细'});
						},
						getComponent(nextState, cb) {
							require.ensure([], (require) => {
								let model = require('../models/Repair/DeviceInfo')["default"];
								registerModel(app,model);
								cb(null, require('../chunk/Repair/DeviceInfo')["default"]);
							}, 'chunk/Repair/DeviceInfo.js')
						}
					}
				},{
					path: 'project-info/:orderid',
					indexRoute: {
						onEnter(){
							NProgress.done();
							jw.setTitle({title:'工程明细'});
						},
						getComponent(nextState, cb) {
							require.ensure([], (require) => {
								let model = require('../models/Repair/ProjectInfo')["default"];
								registerModel(app,model);
								cb(null, require('../chunk/Repair/ProjectInfo')["default"]);
							}, 'chunk/Repair/ProjectInfo.js')
						}
					}
				},{
					path: 'it-info/:orderid',
					indexRoute: {
						onEnter(){
							NProgress.done();
							jw.setTitle({title:'IT设备明细'});
						},
						getComponent(nextState, cb) {
							require.ensure([], (require) => {
								// let model = require('../models/Repair/ItInfo')["default"];
								let model = require('../models/Repair/ItInfo')["default"];
								registerModel(app,model);
								cb(null, require('../chunk/Repair/ItInfo')["default"]);
							}, 'chunk/Repair/ItInfo.js')
						}
					}
				},{
					path: 'edit-confrim',
					indexRoute: {
						onEnter(){
							NProgress.done();
							jw.setTitle({title:'维修确认'});
							typeof(jw.setHeaderLine)=='function' ? jw.setHeaderLine({status:0}) : '';
						},
						getComponent(nextState, cb) {
							require.ensure([], (require) => {
								let model = require('../models/EditConfrim')["default"];
								registerModel(app,model);
								cb(null, require('../chunk/Repair/EditConfrim')["default"]);
							}, 'chunk/Repair/EditConfrim.js')
						}
					}
				},{
					// 在途、历史订单详情
      		path:'view',
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [
								{
									path: 'equipment/:orderid',
									indexRoute: {
				            onEnter(){
				            	// jw.setTitle({title:'在途订单'});
				            },
				            getComponent(location, callback) {
				              require.ensure([], (require) => {
												let model = require('../models/Repair/ProcessDevice')["default"];
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessDevice')["default"]);
											}, '../chunk/Repair/ProcessDevice.js')
				            }
				          }
								},{
									path: 'it/:orderid',
									indexRoute: {
										getComponent(location, callback) {
											require.ensure([], (require) => {
												let model = require('../models/Repair/Process')["default"];
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessIt')["default"]);
											}, '../chunk/Repair/ProcessIt.js')
										}
									}
								},{
									path: 'project/:orderid',
									indexRoute: {
										onEnter(){
										},
										getComponent(location, callback) {
											require.ensure([], (require) => {
												let model = require('../models/Repair/Process')["default"];
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessProject')["default"]);
											}, '../chunk/Repair/ProcessProject.js')
										}
									}
								}
							])
						})
					}
				},{
					// 在途、历史维修项目订单详情
      		path:'vieworder',
					getChildRoutes(partialNextState, cb) {
						require.ensure([], (require) => {
							cb(null, [
								{
									path: 'project/:orderid',	
									indexRoute: {
										onEnter(){
											jw.setFuncBtns([{type:4}]);
										},
										getComponent(location, callback) {
											/*require.ensure([], (require) => {
												let model = require('../models/Repair/Process')["default"];
												registerModel(app,model);
												callback(null, require('../chunk/Repair/ProcessProject')["default"]);
											}, '../chunk/Repair/ProcessProject.js')*/
											require.ensure([], function (require) {
					              let model = require('../models/Repair/SupplierResponse')["default"];
					              registerModel(app,model);
					              callback(null, require('../chunk/Repair/SupplierResponseProject')["default"]);
					            },'../chunk/Repair/SupplierResponseProject.js')
										}
									}
								},
								{
									path: 'equipment/:orderid',
									indexRoute: {
										onEnter(){
											// jw.setTitle({title:'在途订单'});
											jw.setFuncBtns([{type:4}]);
										},
										getComponent(location, callback) {
											require.ensure([], function (require) {
					              let model = require('../models/Repair/SupplierResponseDevice')["default"];
					              registerModel(app,model);
					              callback(null, require('../chunk/Repair/SupplierResponse')["default"]);
					            },'../chunk/Repair/SupplierResponse.js')
										}
									}
								}
							])
						})
					}
				}
      ])
    })
  }
}
