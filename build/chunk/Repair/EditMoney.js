webpackJsonp([59],{

/***/ 1919:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dva = __webpack_require__(196);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

var _constants = __webpack_require__(197);

var _EpsModal = __webpack_require__(198);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 维修费用编辑
   */

var taxlist = (0, _constants.getDict)('taxlist');

var EditMoney = function (_Component) {
	_inherits(EditMoney, _Component);

	function EditMoney(props) {
		_classCallCheck(this, EditMoney);

		var store = new Store('Joywok:cache:tabs:editmoney');
		var cache = store.find({ id: 'tab:cache' }) || {};
		if (cache['id']) {
			props['editmoney'] = _.extend({}, props['editmoney'], cache["data"]);
			var dispatch = props.dispatch;
			dispatch({
				type: 'editmoney/changeData',
				payload: cache["data"]
			});
		}

		var _this = _possibleConstructorReturn(this, (EditMoney.__proto__ || Object.getPrototypeOf(EditMoney)).call(this, props));

		_this.callJWFuncs = _this.callJWFuncs.bind(_this);
		return _this;
	}

	_createClass(EditMoney, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {}
	}, {
		key: 'changeData',
		value: function changeData(data) {}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var self = this;
			this.setHeight();
		}
	}, {
		key: 'setHeight',
		value: function setHeight() {
			var self = this;
			setTimeout(function () {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var header = $('.header').height() || 0;
				var top = $('.main-c').height() || 0;
				$('.main-c').css({ maxHeight: clientHeight - header + 'px', overflowY: 'auto' });
				$('.money-edit').css({ minHeight: clientHeight - header - top + 'px' });
				console.log('ContainerHeight:', clientHeight, header, top);
				// $('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
			}, 0);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var dispatch = this.props.dispatch;
			var data = this.props.editmoney;
			var maintenanceLaborRate = '';
			if (data['maintenanceLaborRate'] == '11%' || data['maintenanceLaborRate'] == '17%') {
				var nowData = '';
				if (data['maintenanceLaborRate'] == '11%') {
					nowData = '10%';
				} else {
					nowData = '16%';
				}
				dispatch({
					type: 'editmoney/changeData',
					payload: {
						maintenanceLaborRate: nowData
					}
				});
			} else {
				maintenanceLaborRate = _.findWhere(taxlist, { label: data["maintenanceLaborRate"] });
				maintenanceLaborRate = maintenanceLaborRate ? maintenanceLaborRate['value'] : '-1';
			}
			var maintenanceAccommodationRate = '';
			if (data['maintenanceAccommodationRate'] == '11%' || data['maintenanceAccommodationRate'] == '17%') {
				var _nowData = '';
				if (data['maintenanceAccommodationRate'] == '11%') {
					_nowData = '10%';
				} else {
					_nowData = '16%';
				}
				dispatch({
					type: 'editmoney/changeData',
					payload: {
						maintenanceAccommodationRate: _nowData
					}
				});
			} else {
				maintenanceAccommodationRate = _.findWhere(taxlist, { label: data["maintenanceAccommodationRate"] });
				maintenanceAccommodationRate = maintenanceAccommodationRate ? maintenanceAccommodationRate['value'] : '-1';
			}

			var maintenanceRate = '';
			if (data['maintenanceRate'] == '11%' || data['maintenanceRate'] == '17%') {
				var _nowData2 = '';
				if (data['maintenanceRate'] == '11%') {
					_nowData2 = '10%';
				} else {
					_nowData2 = '16%';
				}
				dispatch({
					type: 'editmoney/changeData',
					payload: {
						maintenanceRate: _nowData2
					}
				});
			} else {
				maintenanceRate = _.findWhere(taxlist, { label: data["maintenanceRate"] });
				maintenanceRate = maintenanceRate ? maintenanceRate['value'] : '-1';
			}
			var maintenanceOtherCostTaxRate = '';
			if (data['maintenanceOtherCostTaxRate'] == '11%' || data['maintenanceOtherCostTaxRate'] == '17%') {
				var _nowData3 = '';
				if (data['maintenanceOtherCostTaxRate'] == '11%') {
					_nowData3 = '10%';
				} else {
					_nowData3 = '16%';
				}
				dispatch({
					type: 'editmoney/changeData',
					payload: {
						maintenanceOtherCostTaxRate: _nowData3
					}
				});
			} else {
				maintenanceOtherCostTaxRate = _.findWhere(taxlist, { label: data["maintenanceOtherCostTaxRate"] });
				maintenanceOtherCostTaxRate = maintenanceOtherCostTaxRate ? maintenanceOtherCostTaxRate['value'] : '-1';
			}
			console.log(data, '输出下这个里面的值有啥');

			// if(data['maintenanceCost'] =='0'){
			// 	data['maintenanceCost'] ='0.00'
			// }
			// if(data['maintenanceAccommodation'] =='0'){
			// 	data['maintenanceAccommodation'] ='0.00'	
			// }
			// if(data['maintenanceTravel'] =='0'){
			// 	data['maintenanceTravel'] ='0.00'
			// }
			// if(data['maintenanceOtherCost'] =='0'){
			// 	data['maintenanceOtherCost'] ='0.00'
			// }


			var formData = {
				schema: [{
					name: 'form_4', element: 'Input',
					label: '人工费 ¥ (不含税)',
					attr: {
						type: 'text',
						placeholder: '请输入人工费',
						className: 'edit-equipment-it-input',
						step: "0.1"
					},
					defaultValue: data['installationFeeNotax'],
					events: {
						onChange: function onChange(data) {
							// console.log(data[0],'这个里面有什么呢');
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									installationFeeNotax: window.replaceNnum(data[0])
								}
							});
						}
					}
				}, {
					name: 'form_5', element: 'Select', label: '人工费税率',
					defaultValue: [maintenanceLaborRate],
					options: taxlist,
					attr: {
						cols: 1
					},
					events: {
						onChange: function onChange(data) {
							var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = '';
							}
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									maintenanceLaborRate: nowData
								}
							});
						}
					}
				}, {
					name: 'form_6', element: 'Input',
					label: '住宿费 ¥ (不含税)',
					defaultValue: data["hotelCostNotax"],
					attr: {
						placeholder: '请输入住宿费',
						type: 'text',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									hotelCostNotax: window.replaceNnum(data[0])
								}
							});
						}
					}
				}, {
					name: 'form_7', element: 'Select', label: '住宿费税率',
					defaultValue: [maintenanceAccommodationRate],
					options: taxlist,
					attr: {
						cols: 1
					},
					events: {
						onChange: function onChange(data) {
							var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = '';
							}
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									maintenanceAccommodationRate: nowData
								}
							});
						}
					}
				}, {
					name: 'form_8', element: 'Input',
					label: '差旅费 ¥ (不含税)',
					defaultValue: data["carCostNotax"],
					attr: {
						type: 'text',
						placeholder: '请输入差旅费',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									carCostNotax: window.replaceNnum(data[0])
								}
							});
						}
					}
				}, {
					name: 'form_9', element: 'Select', label: '差旅费税率',
					defaultValue: [maintenanceRate],
					options: taxlist,
					attr: {
						cols: 1
					},
					events: {
						onChange: function onChange(data) {
							var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = '';
							}
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									maintenanceRate: nowData
								}
							});
						}
					}
				}, {
					name: 'form_10', element: 'Input',
					label: '其他费用 ¥ (不含税)',
					defaultValue: data['otherCostNotax'],
					attr: {
						type: 'text',
						placeholder: '请输入其他费用',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									otherCostNotax: window.replaceNnum(data[0])
								}
							});
						}
					}
				}, {
					name: 'form_11', element: 'Select', label: '其他费税率',
					defaultValue: [maintenanceOtherCostTaxRate],
					options: taxlist,
					attr: {
						cols: 1
					},
					events: {
						onChange: function onChange(data) {
							var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = '';
							}
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									maintenanceOtherCostTaxRate: nowData
								}
							});
						}
					}
				}, {
					name: 'form_12',
					element: 'Textarea',
					defaultValue: data["otherCostRemark"],
					attr: {
						placeholder: '其他费用备注',
						autoHeight: true
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editmoney/changeData',
								payload: {
									otherCostRemark: data[0]
								}
							});
						}
					}
				}],
				buttons: false,
				changeData: this.changeData.bind(this)
			};
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header specail', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c' }, _react2.default.createElement('div', { className: 'money-edit' }, _react2.default.createElement(_mobile2.default, { formData: formData, onChange: function onChange(values, schema) {
					return _this2.FormChange(values, schema);
				} }))))));
		}
	}, {
		key: 'callJWFuncs',
		value: function callJWFuncs() {
			jw.setFuncBtns([{
				type: '11',
				name: '完成'
			}]);
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			if (JWReady == true) {
				this.callJWFuncs();
			} else {
				window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
					self.callJWFuncs();
				});
			}
			NProgress.done();
			window.onJwNavBtnClick = function () {
				// alert('xxxxxxx');
				var data = self.props.editmoney;
				var datas = {
					installationFeeNotax: data['installationFeeNotax'],
					maintenanceLaborRate: data['maintenanceLaborRate'],
					carCostNotax: data['carCostNotax'],
					maintenanceRate: data['maintenanceRate'],
					hotelCostNotax: data['hotelCostNotax'],
					maintenanceAccommodationRate: data['maintenanceAccommodationRate'],
					otherCostNotax: data['otherCostNotax'],
					maintenanceOtherCostTaxRate: data['maintenanceOtherCostTaxRate'],
					otherCostRemark: data['otherCostRemark']
				};

				console.log(datas, '这个订单里面的钱');
				// alert('xxxxxxxxxxxxxxxxxx');
				if (typeof datas['installationFeeNotax'] == 'undefined' || datas['installationFeeNotax'].length == 0 || isNaN(datas['installationFeeNotax'])) {
					(0, _EpsModal.AlertBase)({
						tip: '请正确输入人工费!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['installationFeeNotax'] > 0 && (typeof datas['maintenanceLaborRate'] == 'undefined' || datas['maintenanceLaborRate'] == '请选择' || datas['maintenanceLaborRate'].length == 0)) {
					(0, _EpsModal.AlertBase)({
						tip: '请选择人工费税率!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['maintenanceLaborRate'] == '请选择') {
					datas['maintenanceLaborRate'] = '';
				}

				if (typeof datas['hotelCostNotax'] == 'undefined' || datas['hotelCostNotax'].length == 0 || isNaN(datas['hotelCostNotax'])) {
					(0, _EpsModal.AlertBase)({
						tip: '请正确输入住宿费!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['hotelCostNotax'] > 0 && (typeof datas['maintenanceAccommodationRate'] == 'undefined' || datas['maintenanceAccommodationRate'] == '请选择' || datas['maintenanceAccommodationRate'].length == 0)) {
					(0, _EpsModal.AlertBase)({
						tip: '请选择住宿费税率!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['maintenanceAccommodationRate'] == '请选择') {
					datas['maintenanceAccommodationRate'] = '';
				}

				if (typeof datas['carCostNotax'] == 'undefined' || datas['carCostNotax'].length == 0 || isNaN(datas['carCostNotax'])) {
					(0, _EpsModal.AlertBase)({
						tip: '请正确输入差旅费!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['carCostNotax'] > 0 && (typeof datas['maintenanceRate'] == 'undefined' || datas['maintenanceRate'] == '请选择' || datas['maintenanceRate'].length == 0)) {
					(0, _EpsModal.AlertBase)({
						tip: '请选择差旅费税率!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['maintenanceRate'] == '请选择') {
					datas['maintenanceRate'] = '';
				}

				if (typeof datas['otherCostNotax'] == 'undefined' || datas['otherCostNotax'].length == 0 || isNaN(datas['otherCostNotax'])) {
					(0, _EpsModal.AlertBase)({
						tip: '请正确输入其他费用!',
						icon: 'icon-save-error'
					});
					return;
				}

				if (datas['otherCostNotax'] > 0 && (typeof datas['maintenanceOtherCostTaxRate'] == 'undefined' || datas['maintenanceOtherCostTaxRate'] == '请选择' || datas['maintenanceOtherCostTaxRate'].length == 0)) {
					(0, _EpsModal.AlertBase)({
						tip: '请选择其他费税率!',
						icon: 'icon-save-error'
					});
					return;
				}
				if (datas['maintenanceOtherCostTaxRate'] == '请选择') {
					datas['maintenanceOtherCostTaxRate'] = '';
				}
				if (datas['maintenanceOtherCost'] > 0) {
					if (typeof datas['otherCostRemark'] == 'undefined' || datas['otherCostRemark'].length == 0) {
						(0, _EpsModal.AlertBase)({
							tip: '其他费用备注不能为空',
							icon: 'icon-save-error',
							onOk: function onOk() {}
						});
						return;
					}
				}
				datas['maintenanceCost'] = Number(data['installationFeeNotax']) + data['installationFeeNotax'] / 100 * parseFloat(data['maintenanceLaborRate']);
				datas['maintenanceTravel'] = Number(data['carCostNotax']) + data['carCostNotax'] / 100 * parseFloat(data['maintenanceRate']);
				datas['maintenanceAccommodation'] = Number(data['hotelCostNotax']) + data['hotelCostNotax'] / 100 * parseFloat(data['maintenanceAccommodationRate']);
				datas['maintenanceOtherCost'] = Number(data['otherCostNotax']) + data['otherCostNotax'] / 100 * parseFloat(data['maintenanceOtherCostTaxRate']);

				window.upTabsData('editmoney', 'publish', datas);
				jw.closeWebView();
			};
			this.setHeight();
			if (isAndroid()) {
				console.log('x1');
				$(window).resize(function () {
					console.log('window resize');
					self.setHeight();
				});
			}

			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			$(window).resize(function () {
				self.setHeight();
			});
		}
	}]);

	return EditMoney;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(EditMoney);

/***/ }),

/***/ 1970:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

exports.default = {
	namespace: 'editmoney',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		},
		installationFeeNotax: '0.00',
		maintenanceLaborRate: '',
		hotelCostNotax: '0.00',
		maintenanceAccommodationRate: '',
		carCostNotax: '0.00',
		otherCostNotax: '0.00',
		maintenanceOtherCostTaxRate: ''
	},
	reducers: {
		changeData: function changeData(state, action) {
			return _extends({}, state, action.payload);
		}
	},
	effects: {},
	subscriptions: {}
};

/***/ })

});