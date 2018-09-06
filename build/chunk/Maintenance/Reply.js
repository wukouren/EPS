webpackJsonp([24],{

/***/ 1132:
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
   * 加载组件
   *
   * 功能说明: 列表下拉加载更多
   * 使用说明：
   * 		(1) demo案例
   * 				let bindtoref = this.refs.listwrap;
   * 				let onEndReached = (pageno)=>{
   * 					// fetchdata by pageno
   * 					// set loading = true
   * 					// fetchdata end 
   * 					// set loading = false
   * 				}
   * 				<LoadMore pagesize=20 totalnum=200 pageno=0 loading={ false } bindtoref={ bindtoref } onEndReached={ ()=>{this.onEndReached(pageno)} }/>
   * 		(2) 参数说明
   * 			pagesize number  每页条数  可选
   * 			totalnum number  总条数   必填
   * 			pageno  number  当前页数  必填
   * 			loading  bool   加载状态  必填
   * 			bindtoref react component's ref  监听滚动事件的宿主 可选  默认为body scroll
   * 			onEndReached 回调函数  到达底部后回调事件，回调中可以根据pageno去加载下一页数据
   *
   */

var LoadMore = function (_Component) {
	_inherits(LoadMore, _Component);

	function LoadMore() {
		_classCallCheck(this, LoadMore);

		return _possibleConstructorReturn(this, (LoadMore.__proto__ || Object.getPrototypeOf(LoadMore)).apply(this, arguments));
	}

	_createClass(LoadMore, [{
		key: 'render',
		value: function render() {
			var data = this.props.data;
			return _react2.default.createElement('div', { className: "loading-bounce-w " + (data['hide'] ? 'hide' : '') + ' ' + (data['fix'] ? 'fix' : '') }, _react2.default.createElement('div', { className: 'loading-bounce-bg' }), _react2.default.createElement('div', { className: 'loading-gif' }, _react2.default.createElement('img', { src: 'images/loading.gif' })));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var data = this.props.data;
			console.log('Marlin LoadMore end', data);
			if (this.props['container']) {
				console.log("container", this.props['container']);
				$("." + this.props['container']).on("scroll", function (evt) {

					if (data['fix'] || data['loading']) return;

					console.log('Marlin fixed', data['fix'], data['loading']);

					var scrollTop = $('.' + self.props['container']).scrollTop();
					var clientHeight = $('.' + self.props['container']).height();
					var target = $('.loading-bounce-w');
					// let target = $('.todos-list-loadmore');
					if (target.length == 0) return;

					if (clientHeight + 80 >= target.offset().top) {
						console.log('Marlin Top', clientHeight, target.offset().top);
						self.props.onEndReached(evt);
						// $(this).unbind('scroll');
					}
				});
			} else {}
		}
	}]);

	return LoadMore;
}(_react.Component);

;

LoadMore.propTypes = {};

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(LoadMore);

/***/ }),

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

/***/ 1876:
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

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _MaintenanceReplyCard = __webpack_require__(1828);

var _MaintenanceReplyCard2 = _interopRequireDefault(_MaintenanceReplyCard);

var _MaintenanceReplyDeviceDetail = __webpack_require__(1854);

var _MaintenanceReplyDeviceDetail2 = _interopRequireDefault(_MaintenanceReplyDeviceDetail);

var _MoneyShowItem = __webpack_require__(1531);

var _MoneyShowItem2 = _interopRequireDefault(_MoneyShowItem);

var _EpsModal = __webpack_require__(198);

var _constants = __webpack_require__(197);

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

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

var Reply = function (_Component) {
	_inherits(Reply, _Component);

	function Reply() {
		_classCallCheck(this, Reply);

		return _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).apply(this, arguments));
	}

	_createClass(Reply, [{
		key: 'changeData',
		value: function changeData(targetIndex, data) {
			var dispatch = this.props.dispatch;
			var dataList = _.clone(this.props.maintenance["list"]);
			// console.log('111', dataList, targetIndex, data);
			_.each(dataList, function (i, index) {
				console.log(targetIndex, index, '这俩index是啥呢');
				if (targetIndex == index) {
					_.extend(i, data);
				}
			});
			// console.log('222', dataList);

			dispatch({
				type: 'maintenance/changeData',
				data: {
					list: dataList
				}
			});
			// dispatch({
			// 	type: 'maintenance/changeData',
			// 	payload: data
			// })
		}
	}, {
		key: 'openFileView',
		value: function openFileView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.maintenance;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.maintenance;
			var money = 0;
			console.log('111rr', data);
			data["list"] && _.each(data["list"], function (i) {
				money += Number(i['accessoriesCost']);
			});
			var sumData = 0;
			if (data["list"] && data["list"].length) {
				var dataList = data["list"][0];
				var labourCostNotax = dataList['labourCostNotax'];
				var accessoriesCostNotax = dataList['accessoriesCostNotax'];
				var labourTaxNew = dataList['labourTaxNew'];
				var accessoriesTaxNew = dataList['accessoriesTaxNew'];
				sumData = (labourTaxNew ? labourCostNotax || 0 : 0) + (accessoriesTaxNew ? accessoriesCostNotax || 0 : 0) + (labourTaxNew ? parseInt(labourTaxNew) * labourCostNotax / 100 : 0) + (accessoriesTaxNew ? parseInt(accessoriesTaxNew) * accessoriesCostNotax / 100 : 0);
				//  console.log('1',(labourTaxNew ? (labourCostNotax || 0) : 0),'accessoriesCostNotax',)
			}
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c maintenance-replay' }, _react2.default.createElement(_MaintenanceReplyCard2.default, { data: data }), data["list"] && data["list"].length != 0 ? _react2.default.createElement(_MaintenanceReplyDeviceDetail2.default, { modelType: self.props.maintenance["model_type"], changeData: function changeData(index, data) {
					return self.changeData(index, data);
				}, openView: function openView(e) {
					return self.openMoreView(e);
				}, index: 0, data: _.extend({}, { showMoreBtn: true }, data["list"][0]) }) : '')), _react2.default.createElement(_LoadMore2.default, { data: data['loading'] }), _react2.default.createElement(_MoneyShowItem2.default, { data: {
					label: '保养订单总价',
					money: sumData
				}, showText: true, styleClass: 'specail-fix' }), _react2.default.createElement('div', { className: 'file-num-specail border-line-h before', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('i', { className: 'icon-file' }), _react2.default.createElement('span', { className: 'preview-file' }, "\u67E5\u770B\u9644\u4EF6", data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : '')), _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openView('/log');
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
					return _this2.reject(e);
				} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
					return _this2.agree(e);
				} }, "\u786E\u8BA4")))));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var modelData = this.props.maintenance;
			var dispatch = this.props.dispatch;
			var orderid = this.props.params.orderid.split("&")[0];
			this.setHeight();
			dispatch({ type: 'maintenance/fetch', payload: orderid, dispatch: dispatch });
			PubSub.subscribe('editmaintenancereplyDevice', function (evt, data) {
				console.log(data['list'], '这个里面有什么呢');
				dispatch({
					type: 'maintenance/changeData',
					payload: {
						list: data['list'],
						labourTaxNew: data['list']['labourTaxNew'] || '',
						accessoriesTaxNew: data['list']['accessoriesTaxNew'] || ''
					}
				});
			});
			if (JWReady == true) {
				jw.setFuncBtns([{ type: 4 }]);
			} else {
				window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
					jw.setFuncBtns([{ type: 4 }]);
				});
			}
			window.onJwNavBtnClick = function (data) {
				if (data['type'] == '4') {
					var _modelData = self.props.maintenance;
					(0, _constants.openChart)(_modelData['creaeBy'], _modelData['orderNumber'], '测试');
				}
			};

			$(window).resize(function () {
				self.setHeight();
			});
		}
	}, {
		key: 'setHeight',
		value: function setHeight() {
			var self = this;
			setTimeout(function () {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var header = $('.header').height() || 0;
				var money = $('.money-show-item').height() || 0;
				var footer = $('.footer').height() || 0;
				var file = $('.file-num-specail').height() || 0;
				$('.main-c').css({ height: clientHeight - header - money - footer - file + 'px' });
			}, 0);
		}
	}, {
		key: 'openMoreView',
		value: function openMoreView(data) {
			var datas = this.props.maintenance;
			var time = datas['updateDate'].split('.')[0];
			var updateDate = encodeURIComponent(time);
			var url = EpsWebRoot + '/#/maintenance/' + datas["model_type"] + '/reply-list/' + this.props.params['orderid'] + '?updateDate=' + updateDate;
			// let transData = _.extend(datas["list"], { labourTaxNew: datas.labourTaxNew }, { accessoriesTaxNew: datas.accessoriesTaxNew });
			console.log('tttt', datas);
			// return;
			window.upTabsData('MaintenanceReplyList', 'cache', {
				// list: transData
				list: datas["list"]
			});
			jw.pushWebView(url);
		}
	}, {
		key: 'openView',
		value: function openView(data) {
			var datas = this.props.maintenance;
			var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"];
			datas['logType'] = 'maintenanceAfter';
			window.upTabsData('log', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'reject',
		value: function reject() {
			var self = this;
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.maintenance;
			var rejectDialog = (0, _EpsModal.MemoDialog)({
				title: '是否拒绝该订单?',
				btnIconClass: 'icon-reject',
				btnVal: '拒绝',
				placeholder: '拒绝必须输入备注...',
				memorequired: true,
				changeData: function changeData() {},
				onBtnClick: function onBtnClick(memo, callback) {
					var datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderNumber: orderid,
								approveFlg: 'REFUSE',
								orderState: modelData["orderState"],
								operateMarks: memo || ''
							}
						}
					};
					self.upData(datas, callback);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}
	}, {
		key: 'agree',
		value: function agree() {
			var self = this;
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.maintenance;
			console.log(modelData, '这个里面是什么呢');
			var error = void 0;
			var newList = [];
			for (var i = 0; i < modelData['list'].length; i++) {
				console.log(modelData['list'][i], '提交的数据', i);
				if (typeof modelData['list'][i]['labourTaxNew'] == 'undefined' || !modelData['list'][i]['labourTaxNew'] || modelData['list'][i]['labourTaxNew'] == '请选择') {
					// if (typeof (modelData['list'][i]['labourTax']) == 'undefined' || !modelData['list'][i]['labourTax'] || modelData['list'][i]['labourTax'] == '请选择') {
					error = '请选择' + modelData['list'][i]["equipmentName"] + '的人工费税率!';
					break;
				}
				if (typeof modelData['list'][i]['accessoriesTaxNew'] == 'undefined' || !modelData['list'][i]['accessoriesTaxNew'] || modelData['list'][i]['labourTaxNew'] == '请选择') {
					error = '请选择' + modelData['list'][i]["equipmentName"] + '的' + (modelData.model_type == 'project' ? '材料费' : '配件费') + '税率!';
					break;
				}
				if (typeof modelData['list'][i]['aboveMaintenanceTime'] == 'undefined' || !modelData['list'][i]['aboveMaintenanceTime']) {
					error = '请正确选择' + modelData['list'][i]["equipmentName"] + '的上门保养日期!';
					break;
				}
				if (typeof modelData['list'][i]['contactsMans'] == 'undefined' || !modelData['list'][i]['contactsMans'] || modelData['list'][i]['contactsMans'].length == 0) {
					error = '请输入' + modelData['list'][i]["equipmentName"] + '的联系人!';
					break;
				}
				if (typeof modelData['list'][i]['tel'] == 'undefined' || !modelData['list'][i]['tel'] || modelData['list'][i]['tel'].length == 0) {
					error = '请输入' + modelData['list'][i]["equipmentName"] + '的电话!';
					break;
				}
				if (modelData['list'][i]['tel'].length < 8 || modelData['list'][i]['tel'].length > 11) {
					error = '请正确输入' + modelData['list'][i]["equipmentName"] + '的电话!';
					break;
				}
				newList.push({
					id: modelData['list'][i]['id'],
					labourTax: modelData['list'][i]['labourTax'],
					accessoriesTax: modelData['list'][i]['accessoriesTax'],
					aboveMaintenanceTime: moment(modelData['list'][i]['aboveMaintenanceTime'] * 1000).format("YYYY-MM-DD"),
					contactsMans: modelData['list'][i]['contactsMans'],
					tel: modelData['list'][i]['tel']
				});
			}
			if (error) {
				(0, _EpsModal.AlertBase)({
					tip: error, icon: 'icon-save-error'
				});
				return;
			}
			var epsDialog = (0, _EpsModal.MemoDialog)({
				title: '请输入备注',
				btnIconClass: 'icon-check',
				btnVal: '确认',
				placeholder: '请输入备注...',
				changeData: function changeData() {},
				memorequired: false,
				onBtnClick: function onBtnClick(memo, callback) {
					var datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderNumber: orderid,
								approveFlg: 'PASS',
								orderState: modelData["orderState"],
								operateMarks: memo || '',
								listStr: JSON.stringify(newList)
							}
						}
					};
					self.upData(datas, callback);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}
	}, {
		key: 'upData',
		value: function upData(data, callback) {
			var url = '/McdEpsApi/joywok/maintenance/submitOrderInfo';
			console.log('提交的数据', JSON.stringify(data), data);
			var modelData = this.props.maintenance;
			(0, _EpsRequest2.default)(url, {
				method: 'POST',
				body: JSON.stringify(data)
			}).then(function (resp) {
				if (resp['data']['success'] == false) {
					if (typeof callback != 'undefined') {
						callback(true);
					}
				} else {
					console.log(resp['data']['success'], '这个里面会返回什么呢');
					(0, _EpsModal.AlertBase)({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: function onOk() {
							jw.closeWebView();
						}
					});
				}
			});
		}
	}]);

	return Reply;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(Reply);

/***/ }),

/***/ 1891:
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

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function firstFetch(parame, type) {
	var url = '/McdEpsApi/joywok/maintenance/getOrderInfo';
	return (0, _EpsRequest2.default)(url, {
		method: 'POST',
		body: JSON.stringify({
			param: {
				eid: window.eid,
				condition: {
					orderNumber: parame,
					updateDate: window.updatetime
				},
				pager: { 'pageNum': '1', 'pageSize': '1' }
			}
		})
	});
}
exports.default = {
	namespace: 'maintenance',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		},
		form: {},
		epsDialog: {
			title: '请输入备注',
			buttonIconClass: 'icon-check-i',
			buttonVal: '确认',
			fix: true,
			show: false
		}
	},
	reducers: {
		changeData: function changeData(state, action) {
			console.log('chamnn', state, action);
			return _extends({}, state, action.payload);
		}
	},
	effects: {
		fetch: /*#__PURE__*/regeneratorRuntime.mark(function fetch(_ref, _ref2) {
			var payload = _ref.payload,
			    dispatch = _ref.dispatch;
			var call = _ref2.call,
			    put = _ref2.put,
			    select = _ref2.select;
			var datas, type, firstData, loading, allData;
			return regeneratorRuntime.wrap(function fetch$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return select();

						case 2:
							datas = _context.sent;
							type = datas['maintenance']['type'];
							_context.next = 6;
							return call(firstFetch, payload, type);

						case 6:
							firstData = _context.sent;
							loading = datas["maintenance"]['loading'];

							loading['loading'] = false;
							loading['hide'] = true;
							console.log(firstData['data']['body'], '第一次获取的数据');
							allData = _.extend({
								loading: loading
							}, firstData['data']['body'], {});
							// console.log(allData,'这个里面返回什么数据呢');、
							// getUsers(allData['storeMan'],'num',function(resp){
							//   let userdata = resp['data'][0];
							//   dispatch({
							//     type: 'process/changeData',
							//     payload: {
							//       avatar:userdata['avatar']
							//     },
							//   });
							// })

							NProgress.done();
							_context.next = 15;
							return put({
								type: 'changeData',
								payload: allData
							});

						case 15:
						case 'end':
							return _context.stop();
					}
				}
			}, fetch, this);
		})
	},
	subscriptions: {}
};

/***/ })

});