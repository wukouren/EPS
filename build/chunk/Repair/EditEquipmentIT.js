webpackJsonp([60],{

/***/ 1918:
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

var _constants = __webpack_require__(197);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

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

var equipmentOperation = (0, _constants.getDict)('equipmentOperation');

var EditEquipmentIT = function (_Component) {
	_inherits(EditEquipmentIT, _Component);

	function EditEquipmentIT(props) {
		_classCallCheck(this, EditEquipmentIT);

		var _this = _possibleConstructorReturn(this, (EditEquipmentIT.__proto__ || Object.getPrototypeOf(EditEquipmentIT)).call(this, props));

		var dispatch = _this.props.dispatch;
		// 从localstorage拿即将编辑的IT设备信息
		var ITEquipment = (0, _constants.getDict)('EditEquipmentITData');
		console.log('ITEquipment====:', ITEquipment);
		// 存储
		dispatch({
			type: 'editequipmentit/changeData',
			payload: {
				ITEquipment: ITEquipment
			}
		});
		_this.callJWFuncs = _this.callJWFuncs.bind(_this);
		return _this;
	}

	_createClass(EditEquipmentIT, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'changeData',
		value: function changeData(data) {
			// let dispatch = this.props.dispatch;
			// dispatch({
			// 	type:'form/changeData',
			// 	data:{
			// 		schema:data
			// 	}
			// })
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var equipmentdata = this.props.editequipmentit.ITEquipment;
			var formData = {
				schema: [
				// {
				// 	name: 'form_2', element:'Input',
				// 	label:'设备序列号',
				// 	defaultValue: 'wwww',
				// 	attr:{
				// 		type: 'text',
				// 		className:'xxxxxxx',
				// 		disabled: 'disabled'
				// 	},
				// 	events:{
				// 		onBlur:function(){},
				// 		onFocus:function(e){},
				// 		onChange:function(e){
				// 			console.log('onChange',e)
				// 		}
				// 	}
				// },
				{
					name: 'form_3', element: 'Select', label: '建议操作',
					defaultValue: [equipmentdata["deviceOperate"]],
					options: equipmentOperation,
					attr: {
						cols: 1
					},
					events: {
						onChange: function onChange(data) {
							console.log('form rate:', data);
							var dispatch = self.props.dispatch;
							dispatch({
								type: 'editequipmentit/changeData',
								payload: {
									ITEquipment: _.extend(equipmentdata, {
										deviceOperate: data[0][0]
									})
								}
							});
						}
					}
				}, {
					name: 'form_8', element: 'Input',
					label: '维修描述',
					defaultValue: equipmentdata["maintenanceRemarks"],
					attr: {
						type: 'text',
						placeholder: '请输入维修描述',
						className: 'edit-equipment-it-input'
					},
					events: {
						onChange: function onChange(e) {
							var dispatch = self.props.dispatch;
							dispatch({
								type: 'editequipmentit/changeData',
								payload: {
									ITEquipment: _.extend(equipmentdata, {
										maintenanceRemarks: e[0]
									})
								}
							});
						}
					}
				}],
				buttons: false,
				changeData: this.changeData.bind(this)
			};
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header specail', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c' }, _react2.default.createElement('div', { className: 'money-edit' }, _react2.default.createElement(_mobile2.default, { formData: formData, onChange: function onChange(values, schema) {
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
			// console.log(initCommonDict)
			window.onJwNavBtnClick = function () {
				// alert('xxxxxxx');
				var data = self.props.editequipmentit.ITEquipment;
				var datas = {
					deviceOperate: data['deviceOperate'],
					maintenanceRemarks: data['maintenanceRemarks']
				};
				window.upTabsData('editequipmentit', 'publish', datas);
				jw.closeWebView();
			};
		}
	}]);

	return EditEquipmentIT;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(EditEquipmentIT);

/***/ }),

/***/ 1969:
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
 * 维修流程－编辑IT设备信息 model
 */
exports.default = {
  namespace: 'editequipmentit',
  state: {
    loading: {
      loading: true,
      fix: true,
      hide: false
    },
    ITEquipment: {}
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