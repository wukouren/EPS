webpackJsonp([61],{

/***/ 1917:
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
   * 设备信息编辑
   */

var EditEquipment = function (_Component) {
	_inherits(EditEquipment, _Component);

	function EditEquipment(props) {
		_classCallCheck(this, EditEquipment);

		var store = new Store('Joywok:cache:tabs:editequipment');
		var cache = store.find({ id: 'tab:cache' }) || {};
		if (cache['id']) {
			var dispatch = props.dispatch;
			window.equipmentOperation = cache['data']['equipmentOperation'];
			dispatch({
				type: 'editequipment/changeData',
				payload: cache["data"]['datas']
			});
		}

		var _this = _possibleConstructorReturn(this, (EditEquipment.__proto__ || Object.getPrototypeOf(EditEquipment)).call(this, props));

		_this.callJWFuncs = _this.callJWFuncs.bind(_this);
		return _this;
	}

	_createClass(EditEquipment, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {}
	}, {
		key: 'changeData',
		value: function changeData(data) {}
	}, {
		key: 'render',
		value: function render() {
			var dispatch = this.props.dispatch;
			var data = this.props.editequipment;
			var formData = {
				schema: [{
					name: 'form_1', element: 'Input',
					label: '维修数量',
					defaultValue: data["devceMaintenanceNum"],
					attr: {
						type: 'number',
						placeholder: '请输入维修数量',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editequipment/changeData',
								payload: {
									devceMaintenanceNum: data[0]
								}
							});
						}
					}
				}, {
					name: 'form_2', element: 'Input',
					label: '设备序列号',
					defaultValue: data["deviceSerialNumber"],
					attr: {
						type: 'text',
						placeholder: '请输入设备序列号',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editequipment/changeData',
								payload: {
									deviceSerialNumber: data[0]
								}
							});
						}
					}
				}, {
					name: 'form_3', element: 'Select', label: '建议操作',
					defaultValue: [data["deviceOperate"]],
					options: equipmentOperation,
					attr: {
						cols: 1
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editequipment/changeData',
								payload: {
									deviceOperate: data[0][0]
								}
							});
						}
					}
				}, {
					name: 'form_8', element: 'Input',
					label: '维修描述',
					defaultValue: data["deviceMark"],
					attr: {
						type: 'text',
						placeholder: '请输入维修描述',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(data) {
							dispatch({
								type: 'editequipment/changeData',
								payload: {
									deviceMark: data[0]
								}
							});
						}
					}
				}],
				buttons: false,
				changeData: this.changeData.bind(this)
			};
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header specail', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c' }, _react2.default.createElement('div', { className: 'money-edit' }, _react2.default.createElement(_mobile2.default, { formData: formData }))))));
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
			// console.log(initCommonDict)
			window.onJwNavBtnClick = function () {
				// alert('xxxxxxx');
				var data = self.props.editequipment;
				var datas = {
					devceMaintenanceNum: data['devceMaintenanceNum'],
					deviceSerialNumber: data['deviceSerialNumber'],
					deviceOperate: data['deviceOperate'],
					deviceMark: data['deviceMark']
				};

				if (typeof datas['devceMaintenanceNum'] == 'undefined' || datas['devceMaintenanceNum'] == 0) {
					if (datas['deviceOperate'] != '4') {
						(0, _EpsModal.AlertBase)({
							tip: '请正确输入维修数量!',
							icon: 'icon-save-error'
						});
						return;
					}
				}
				if (typeof datas['deviceSerialNumber'] == 'undefined' || datas['deviceSerialNumber'].length == 0) {
					(0, _EpsModal.AlertBase)({
						tip: '请输入序列号!',
						icon: 'icon-save-error'
					});
					return;
				}
				if (typeof datas['deviceOperate'] == 'undefined' || datas['deviceOperate'] == '-1') {
					(0, _EpsModal.AlertBase)({
						tip: '请选择建议操作!',
						icon: 'icon-save-error'
					});
					return;
				}

				window.upTabsData('editequipment', 'publish', datas);
				jw.closeWebView();
			};
		}
	}]);

	return EditEquipment;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(EditEquipment);

/***/ }),

/***/ 1968:
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

/**
 * 维修流程－设备 model
 */
exports.default = {
  namespace: 'editequipment',
  state: {
    loading: {
      loading: true,
      fix: true,
      hide: false
    },
    deviceOperate: '1'
  },
  reducers: {
    // 把返回的数据放到state中
    changeData: function changeData(state, action) {
      console.log(state, '这个里面的state');
      return _extends({}, state, action.payload);
    }
  },
  effects: {},
  subscriptions: {}
};

/***/ })

});