webpackJsonp([25],{

/***/ 1531:
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

var _dva = __webpack_require__(196);

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
}

var MoneyShowItem = function (_Component) {
	_inherits(MoneyShowItem, _Component);

	function MoneyShowItem() {
		_classCallCheck(this, MoneyShowItem);

		return _possibleConstructorReturn(this, (MoneyShowItem.__proto__ || Object.getPrototypeOf(MoneyShowItem)).apply(this, arguments));
	}

	_createClass(MoneyShowItem, [{
		key: 'render',
		value: function render() {
			var data = this.props.data;
			return _react2.default.createElement('div', { className: "money-show-item " + this.props.styleClass }, _react2.default.createElement('div', { className: 'money-show-item-w' }, _react2.default.createElement('div', { className: 'money-show-item-c' }, _react2.default.createElement('div', { className: 'money-show-item-label' }, data["label"] || '总金额', "(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'money-show-item-val' }, _react2.default.createElement('span', null, Number(data["money"]).formatMoney(2, '', '')), _react2.default.createElement('i', { className: 'icon-money' }))), _react2.default.createElement('div', { className: 'money-show-other-tip' }, _react2.default.createElement('i', { className: 'icon-money-tips' }), _react2.default.createElement('div', { className: 'money-show-other-tip-v' }, "\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002"))));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
			/*
   	<<<<<<< HEAD
   		<div className="money-show-other-tip">
          <i className="icon-money-tips"></i>
          <div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
        </div>
   =======
   		{this.props.showText&&<div className="money-text">
   			<i className="text-icon"></i>
   			<span>在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</span>
   		</div>}
   >>>>>>> origin/yan-428
    */
		}
	}]);

	return MoneyShowItem;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MoneyShowItem);

/***/ }),

/***/ 1828:
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

var _dva = __webpack_require__(196);

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
}

var MaintenanceReplyCard = function (_Component) {
	_inherits(MaintenanceReplyCard, _Component);

	function MaintenanceReplyCard() {
		_classCallCheck(this, MaintenanceReplyCard);

		return _possibleConstructorReturn(this, (MaintenanceReplyCard.__proto__ || Object.getPrototypeOf(MaintenanceReplyCard)).apply(this, arguments));
	}

	_createClass(MaintenanceReplyCard, [{
		key: 'openFileView',
		value: function openFileView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.data;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.data;
			var showAllData = this.props.showAllData;
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			return _react2.default.createElement('div', { className: 'maintenance-card animated zoomIn' }, _react2.default.createElement('div', { className: 'maintenance-card-c' }, _react2.default.createElement('div', { className: 'maintenance-card-info clear-margin' }, _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u6D41\u7A0B\u5355\u53F7"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["orderNumber"])), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u4E0B\u5355\u65E5\u671F"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["createDate"])), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["storeName"])), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["usCode"])), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u8054\u7CFB\u7535\u8BDD"), _react2.default.createElement('a', { href: 'tel:' + data["vendorTel"], className: 'phone-number' }, _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more ', style: {
					color: '#F55928'
				} }, data["vendorTel"]))))));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}]);

	return MaintenanceReplyCard;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MaintenanceReplyCard);

/***/ }),

/***/ 1854:
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

var _dva = __webpack_require__(196);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

var _constants = __webpack_require__(197);

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
}

var fittingOperation = (0, _constants.getDict)('fittingOperation');
var taxlist = (0, _constants.getDict)('taxlist');

var MaintenanceReplyDeviceDetail = function (_Component) {
	_inherits(MaintenanceReplyDeviceDetail, _Component);

	function MaintenanceReplyDeviceDetail() {
		_classCallCheck(this, MaintenanceReplyDeviceDetail);

		return _possibleConstructorReturn(this, (MaintenanceReplyDeviceDetail.__proto__ || Object.getPrototypeOf(MaintenanceReplyDeviceDetail)).apply(this, arguments));
	}

	_createClass(MaintenanceReplyDeviceDetail, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'changeData',
		value: function changeData(data) {}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.data;
			console.log(data, '这个里面有啥值呢', taxlist);
			var isProject = /project/.test(location.href);
			var dispatch = this.props.dispatch;
			var index = this.props.index;
			// let labourTax = _.findWhere(taxlist, { label: data["labourTax"] });
			// let labourNum = data['labourCostNotax'] * parseInt(labourTax["label"]) / 100;
			// labourTax = labourTax ? labourTax['value'] : '-1';
			var labourTax = _.findWhere(taxlist, { label: data["labourTaxNew"] });
			var labourNum = labourTax ? data['labourCostNotax'] * parseInt(labourTax["label"]) / 100 : 0;
			labourTax = labourTax ? labourTax['value'] : '-1';
			// let accessoriesTax = _.findWhere(taxlist, { label: data["accessoriesTax"] });
			// let accessNum = data['accessoriesCostNotax'] * parseInt(accessoriesTax["label"]) / 100;
			// accessoriesTax = accessoriesTax ? accessoriesTax['value'] : '-1';
			var accessoriesTax = _.findWhere(taxlist, { label: data["accessoriesTaxNew"] });
			// console.log('22-=-=', labourTax, accessoriesTax);
			var accessNum = accessoriesTax ? data['accessoriesCostNotax'] * parseInt(accessoriesTax["label"]) / 100 : 0;
			accessoriesTax = accessoriesTax ? accessoriesTax['value'] : '-1';
			var startTime = parseInt(data["maintenancePlanningTime"]);
			var sunCost = (data["accessoriesTaxNew"] ? data['accessoriesCostNotax'] : 0) + (data["labourTaxNew"] ? data['labourCostNotax'] : 0) + accessNum + labourNum;
			// console.log('====', sunCost, (data["accessoriesTaxNew"] ? data['accessoriesCostNotax'] : 0), (data["labourTaxNew"] ? data['labourCostNotax'] : 0), accessNum, labourNum);
			var formData = {
				schema: [{
					name: 'form_1', element: 'Input',
					label: isProject ? '工程名称' : '设备名称',
					defaultValue: data["equipmentName"],
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_2', element: 'Input',
					label: '保养计划时间',
					defaultValue: data["maintenancePlanningTime"],
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_10', element: 'Input',
					label: isProject ? '保养材料费(不含税)' : '保养配件费(不含税)',
					// label:'配件费用',
					defaultValue: Number(data['accessoriesCostNotax']).formatMoney(2, '', ''),
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_3', element: 'Input',
					label: '保养人工费(不含税)',
					// label:'人工费用',
					defaultValue: Number(data['labourCostNotax']).formatMoney(2, '', ''),
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_4', element: 'Select',
					label: '人工费税率',
					// defaultValue: '',
					defaultValue: labourTax ? [labourTax] : '',
					options: taxlist,
					className: 'has-border text-left',
					attr: {
						cols: 1,
						className: ''
					},
					events: {
						onChange: function onChange(data) {
							var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = '';
							}
							self.props.changeData(index, {
								labourTaxNew: nowData
								// labourTax: nowData
							});
						}
					}
				}, {
					name: 'form_9', element: 'Input',
					label: '人工税金',
					defaultValue: labourNum ? Number(labourNum).formatMoney(2, '', '') : '-',
					// defaultValue: Number(data['labourTaxMoney']).formatMoney(2, '', ''),
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_5', element: 'Select',
					label: isProject ? '材料费税率' : '配件费税率',
					defaultValue: accessoriesTax ? [accessoriesTax] : '',
					options: taxlist,
					className: 'has-border text-left',
					attr: {
						cols: 1,
						className: ''
					},
					events: {
						onChange: function onChange(data) {
							var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = '';
							}
							self.props.changeData(index, {
								// accessoriesTax: nowData
								accessoriesTaxNew: nowData
							});
						}
					}
				}, {
					name: 'form_12', element: 'Input',
					label: isProject ? '工程税金' : '设备税金',
					defaultValue: accessNum ? Number(accessNum).formatMoney(2, '', '') : '-',
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_11', element: 'Input',
					label: '价税合计',
					defaultValue: sunCost ? Number(sunCost).formatMoney(2, '', '') : '-',
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_6', element: 'DatePicker',
					label: '上门保养日期',
					className: 'has-border text-left',
					defaultValue: data['aboveMaintenanceTime'] || '',
					attr: {
						cols: 1,
						className: '',
						extra: '请选择',
						minDate: isNaN(startTime) ? moment({ y: new Date().getFullYear(), M: new Date().getMonth() + 1, d: 1 }) : moment({ y: new Date().getFullYear(), M: startTime - 1, d: 1 }),
						maxDate: moment({ y: new Date().getFullYear(), M: 12 }).endOf('month'),
						format: function format(val) {
							return val.format('YYYY-MM-DD');
						}
					},
					events: {
						onChange: function onChange(data) {
							self.props.changeData(index, {
								aboveMaintenanceTime: data[0].format('X')
							});
						}
					}
				}, {
					name: 'form_7', element: 'Input',
					label: '联系人',
					className: 'has-border text-left',
					defaultValue: data['contactsMans'] || '',
					events: {
						onChange: function onChange(data) {
							self.props.changeData(index, {
								contactsMans: $.trim(data[0])
							});
						}
					}
				}, {
					name: 'form_8', element: 'Input',
					label: '联系方式',
					className: 'has-border text-left',
					attr: {
						type: 'number'
					},
					defaultValue: data['tel'] || '',
					events: {
						onChange: function onChange(data) {
							self.props.changeData(index, {
								tel: data[0]
							});
						}
					}
				}],
				buttons: false,
				changeData: this.changeData.bind(this)
			};
			var showAllData = this.props.showAllData;
			var showMoreBtn = data['showMoreBtn'];
			return _react2.default.createElement('div', { className: 'maintenance-device animated zoomIn' }, _react2.default.createElement('div', { className: 'maintenance-device-c' }, _react2.default.createElement('div', { className: 'maintenance-device-title' }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: '' }, isProject ? '工程明细' : '设备明细')), _react2.default.createElement('div', { className: 'maintenance-device-info' }, _react2.default.createElement(_mobile2.default, { formData: formData })), showMoreBtn ? _react2.default.createElement('div', { className: 'maintenance-device-btn border-line-h before', onClick: function onClick(e) {
					return _this2.props.openView(e);
				} }, _react2.default.createElement('span', { className: 'color-yellow' }, "\u586B\u5199\u66F4\u591A\u8BBE\u5907\u660E\u7EC6")) : ''));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}]);

	return MaintenanceReplyDeviceDetail;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MaintenanceReplyDeviceDetail);

/***/ }),

/***/ 1877:
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

var _MaintenanceReplyCard = __webpack_require__(1828);

var _MaintenanceReplyCard2 = _interopRequireDefault(_MaintenanceReplyCard);

var _MaintenanceReplyDeviceDetail = __webpack_require__(1854);

var _MaintenanceReplyDeviceDetail2 = _interopRequireDefault(_MaintenanceReplyDeviceDetail);

var _MoneyShowItem = __webpack_require__(1531);

var _MoneyShowItem2 = _interopRequireDefault(_MoneyShowItem);

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

		var store = new Store('Joywok:cache:tabs:MaintenanceReplyList');
		var cache = store.find({ id: 'tab:cache' }) || {};
		if (cache['id']) {
			props['maintenance'] = _.extend({}, props['maintenance'], {
				list: cache['data']["list"]
			});
			var dispatch = props.dispatch;
			dispatch({
				type: 'maintenance/changeData',
				payload: {
					list: cache['data']["list"]
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
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c' }, _react2.default.createElement('div', { className: 'maintenance-device-list' }, _.map(data["list"], function (i, index) {
				return _react2.default.createElement(_MaintenanceReplyDeviceDetail2.default, { data: i, index: index, changeData: function changeData(index, data) {
						return self.changeData(index, data);
					} });
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

/***/ 1892:
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

/***/ })

});