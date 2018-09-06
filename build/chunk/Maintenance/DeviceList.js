webpackJsonp([18],{

/***/ 1438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(348);

/***/ }),

/***/ 1544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1641:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(347);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _index2.default;

/***/ }),

/***/ 1642:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1438);

__webpack_require__(1824);

/***/ }),

/***/ 1824:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1544);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_less-loader@2.2.3@less-loader/index.js!./index.less", function() {
			var newContent = require("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_less-loader@2.2.3@less-loader/index.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1875:
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

var _MaintenanceConfirmDeviceDetail = __webpack_require__(1938);

var _MaintenanceConfirmDeviceDetail2 = _interopRequireDefault(_MaintenanceConfirmDeviceDetail);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

var _EpsDialog = __webpack_require__(344);

var _EpsDialog2 = _interopRequireDefault(_EpsDialog);

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
   * 创建非项目订单（含设备／工程／IT）
   */

var ReplyList = function (_Component) {
	_inherits(ReplyList, _Component);

	_createClass(ReplyList, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}]);

	function ReplyList(props) {
		_classCallCheck(this, ReplyList);

		var store = new Store('Joywok:cache:tabs:MaintenanceDeviceList');
		var cache = store.find({ id: 'tab:cache' }) || {};
		console.log('xxx', cache);
		if (cache['id']) {
			props['maintenance'] = _.extend({}, props['maintenance'], {
				list: cache['data']["list"]
			});
			var dispatch = props.dispatch;
			dispatch({
				type: 'maintenance/changeData',
				payload: {
					list: cache['data']["list"],
					isConfirm: cache['data'].isConfirm
				}
			});
		}
		return _possibleConstructorReturn(this, (ReplyList.__proto__ || Object.getPrototypeOf(ReplyList)).call(this, props));
	}

	_createClass(ReplyList, [{
		key: 'changeData',
		value: function changeData(targetIndex, data) {
			var dispatch = this.props.dispatch;
			var dataList = _.clone(this.props.maintenance["list"]);
			_.each(dataList, function (i, index) {
				if (targetIndex == index) {
					_.extend(i, data);
				}
			});
			dispatch({
				type: 'maintenance/changeData',
				data: {
					list: dataList
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this;
			var data = this.props.maintenance;
			console.log('111', data);
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c' }, _react2.default.createElement('div', { className: 'maintenance-device-list' }, _.map(data["list"], function (i, index) {
				return _react2.default.createElement(_MaintenanceConfirmDeviceDetail2.default, { isConfirm: data.isConfirm, modelType: self.props.maintenance["model_type"], data: i, index: index, changeData: function changeData(index, data) {
						return self.changeData(index, data);
					} });
				{/* return <MaintenanceConfirmDeviceDetail disabledAbovetime={true} modelType={self.props.maintenance["model_type"]} data={i} index={index} changeData={(index, data) => self.changeData(index, data)}></MaintenanceConfirmDeviceDetail> */}
			}))))));
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			NProgress.done();
			if (JWReady == true) {
				jw.setFuncBtns([{
					type: '11',
					name: '完成'
				}]);
			} else {
				window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
					jw.setFuncBtns([{
						type: '11',
						name: '完成'
					}]);
				});
			}

			window.onJwNavBtnClick = function () {
				var datas = {
					list: self.props.maintenance['list']
				};
				window.upTabsData('editmaintenancereplyDevice', 'publish', datas);
				jw.closeWebView();
			};
		}
	}]);

	return ReplyList;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(ReplyList);

/***/ }),

/***/ 1890:
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
	namespace: 'maintenance',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		}
	},
	reducers: {
		changeData: function changeData(state, action) {
			return _extends({}, state, action.payload);
		}
	},
	effects: {},
	subscriptions: {}
};

/***/ }),

/***/ 1938:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _datePicker = __webpack_require__(1641);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _list = __webpack_require__(207);

var _list2 = _interopRequireDefault(_list);

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

__webpack_require__(1642);

__webpack_require__(208);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

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
	}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MaintenanceConfirmDeviceDetail = function (_Component) {
	_inherits(MaintenanceConfirmDeviceDetail, _Component);

	function MaintenanceConfirmDeviceDetail() {
		_classCallCheck(this, MaintenanceConfirmDeviceDetail);

		return _possibleConstructorReturn(this, (MaintenanceConfirmDeviceDetail.__proto__ || Object.getPrototypeOf(MaintenanceConfirmDeviceDetail)).apply(this, arguments));
	}

	_createClass(MaintenanceConfirmDeviceDetail, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'onChange',
		value: function onChange(data) {
			var self = this;
			var index = this.props.index;
			this.props.changeData(index, {
				aboveMaintenanceTime: data.format('YYYY-MM-DD')
			});
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name, length) {
			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
		}
	}, {
		key: 'turnMoney',
		value: function turnMoney(data) {
			return Number(data).formatMoney(2, '', '');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.data;
			var showAllData = this.props.showAllData;
			var showMoreBtn = data['showMoreBtn'];
			var time = data["aboveMaintenanceTime"];
			var modelType = self.props.modelType;
			var isConfirm = self.props.isConfirm;
			console.log('modelType', modelType);
			return _react2.default.createElement('div', { className: 'maintenance-device animated zoomIn' }, _react2.default.createElement('div', { className: 'maintenance-device-c' }, _react2.default.createElement('div', { className: 'maintenance-device-title' }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: '' }, modelType == 'equipment' ? '设备' : '工程', '\u660E\u7EC6')), _react2.default.createElement('div', { className: 'maintenance-device-info' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, modelType == 'equipment' ? '设备' : '工程', '\u540D\u79F0'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis', onClick: function onClick() {
					return self.NameInfo(data["equipmentName"]);
				} }, data["equipmentName"])), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4FDD\u517B\u8BA1\u5212\u65F6\u95F4'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data["maintenancePlanningTime"] || '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4FDD\u517B', modelType == 'equipment' ? '配件' : '材料', '\u8D39(\u4E0D\u542B\u7A0E)'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data['accessoriesCostNotax'] ? Number(data['accessoriesCostNotax']).formatMoney(2, '', '') : '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, modelType == 'equipment' ? '配件' : '材料', '\u8D39\u7A0E\u7387'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data['accessoriesTax'] || '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4FDD\u517B\u4EBA\u5DE5\u8D39(\u4E0D\u542B\u7A0E)'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis', onClick: function onClick() {
					return self.NameInfo(Number(data['labourCostNotax']).formatMoney(2, '', ''));
				} }, data['labourCostNotax'] ? Number(data['labourCostNotax']).formatMoney(2, '', '') : '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4EBA\u5DE5\u8D39\u7A0E\u7387'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data['labourTax'] || '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, modelType == 'equipment' ? '设备' : '工程', '\u7A0E\u91D1'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data['accessoriesTaxMoney'] ? Number(data['accessoriesTaxMoney']).formatMoney(2, '', '') : '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r width-max' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4EBA\u5DE5\u7A0E\u91D1'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data['labourTaxMoney'] ? Number(data['labourTaxMoney']).formatMoney(2, '', '') : '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4EF7\u7A0E\u5408\u8BA1'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data['sumCost'] ? Number(data['sumCost']).formatMoney(2, '', '') : '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4E0A\u95E8\u4FDD\u517B\u65E5\u671F'), _react2.default.createElement('div', { className: "maintenance-device-info-i-l-val ellipsis " + (!isConfirm ? '' : 'line-bottom') }, !isConfirm ? time ? moment(time).format('YYYY-MM-DD') : '-' : time ? _react2.default.createElement(_datePicker2.default, { value: moment(time), minDate: moment(Date.parse(new Date()) + 86400000), mode: 'date', format: function format(val) {
					return val.format('YYYY-MM-DD');
				}, onChange: function onChange(e) {
					return _this2.onChange(e);
				} }, _react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' })) : '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u8054\u7CFB\u4EBA'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data["contactsMans"] || '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u8054\u7CFB\u65B9\u5F0F'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data["tel"] ? _react2.default.createElement('a', { href: 'tel:' + data["tel"], className: 'phone-number' }, data["tel"]) : '-')))), showMoreBtn ? _react2.default.createElement('div', { className: 'maintenance-device-btn border-line-h before specail-color', onClick: function onClick(e) {
					return _this2.props.openView(e);
				} }, _react2.default.createElement('span', null, '\u67E5\u770B\u66F4\u591A\u8BBE\u5907\u660E\u7EC6')) : ''));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}]);

	return MaintenanceConfirmDeviceDetail;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MaintenanceConfirmDeviceDetail);

/***/ })

});