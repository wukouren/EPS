webpackJsonp([41],{

/***/ 1435:
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

var _EpsModal = __webpack_require__(198);

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

var UserCard = function (_Component) {
	_inherits(UserCard, _Component);

	function UserCard() {
		_classCallCheck(this, UserCard);

		return _possibleConstructorReturn(this, (UserCard.__proto__ || Object.getPrototypeOf(UserCard)).apply(this, arguments));
	}

	_createClass(UserCard, [{
		key: 'openWebView',
		value: function openWebView(data) {
			console.log(data, "remarksdetail");
			var url = EpsWebRoot + '/#' + data;
			console.log(url, "url");
			var datas = this.props.data;
			window.upTabsData('remark', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'openFileView',
		value: function openFileView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.data;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'openScrapView',
		value: function openScrapView() {
			var datas = this.props.data;
			console.log(datas, '这个里面有什么数据可以传过去呢');
			var url = EpsWebRoot + '/#/scrapped/' + datas["orderNumber"];
			window.upTabsData('scrap', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'initRepairType',
		value: function initRepairType() {
			var data = this.props.data;
			if (data['repairType']) {
				return data['repairType'] == '0' ? '预约' : '紧急';
			} else {
				return '';
			}
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name) {
			console.log('name', name);
			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var data = this.props.data;
			console.log(data, 'oooooooooooooooooo');
			var userimg = '';
			// if(data['createEid']){
			// 	console.log(getUsers(data['createEid'],'num'),'oooooooooooooooooo')
			// }
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}

			return _react2.default.createElement('div', { className: 'user-card' }, _react2.default.createElement('div', { className: 'user-card-c' }, _react2.default.createElement('div', { className: 'user-card-avatar' }, _react2.default.createElement('img', { src: data["avatar"] ? data["avatar"]["avatar_l"] : 'https://www.joywok.com/public/images/avatar/l.jpg', alt: '' })), _react2.default.createElement('div', { className: 'user-card-info' }, _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u521B\u5EFA\u4EBA"), _react2.default.createElement('span', { className: 'user-card-val' }, data['name'])), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u62A5\u4FEE\u7C7B\u578B"), _react2.default.createElement('span', { className: 'user-card-val' }, this.initRepairType()), data['repairType'] == '1' ? "" : _react2.default.createElement('span', { className: 'user-card-time' }, moment(data['time']).format('YYYY-MM-DD HH:mm'))), _react2.default.createElement('div', { className: 'user-card-info-i', onClick: function onClick() {
					return _this2.NameInfo(data['storeName']);
				} }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u62A5\u4FEE\u9910\u5385"), _react2.default.createElement('span', { className: 'user-card-val ellipsis' }, data['storeName'])), _react2.default.createElement('div', { className: 'user-card-info-btns' }, data['remark'] && data['remark'].length != 0 ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openWebView('/remarksdetail');
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val' }, "\u67E5\u770B\u5907\u6CE8")) : '', _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u67E5\u770B\u9644\u4EF6", data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : '')), data.showScrapTip && data.showScrapTip != 0 && window.userinfo['userType'] == '2' ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openScrapView(e);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u8D44\u4EA7\u62A5\u5E9F", data['scrapPageInfo'] && data['scrapPageInfo'].length != 0 ? '(' + data['scrapPageInfo'].length + ')' : '')) : ''))));
		}
	}]);

	return UserCard;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(UserCard);

/***/ }),

/***/ 1829:
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

var _constants = __webpack_require__(197);

var _EpsModal = __webpack_require__(198);

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

var FeeRate = (0, _constants.getDict)('taxlist');
console.log(FeeRate, "FeeRate");

var MoneyShow = function (_Component) {
	_inherits(MoneyShow, _Component);

	function MoneyShow() {
		_classCallCheck(this, MoneyShow);

		return _possibleConstructorReturn(this, (MoneyShow.__proto__ || Object.getPrototypeOf(MoneyShow)).apply(this, arguments));
	}

	_createClass(MoneyShow, [{
		key: 'turnMoney',
		value: function turnMoney(data) {
			return Number(data).formatMoney(2, '', '');
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name) {

			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var alldata = this.props.allData;
			var FeeList = alldata.FeeList;
			var carCost = 0;
			var hotelCost = 0;
			var otherCost = 0;
			var installationFee = 0;
			var otherCostTax = '';
			var hotelCostTax = '';
			var carCostTax = '';
			var installationFeeRate = '';
			var PurchaseMoney = alldata.PurchaseMoney;
			var self = this;
			console.log(alldata, "alldata");
			return _react2.default.createElement('div', { className: 'money-show' }, _react2.default.createElement('div', { className: 'money-show-container' }, _react2.default.createElement('div', { className: 'money-show-c' }, _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					return self.NameInfo(PurchaseMoney);
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, PurchaseMoney), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u91C7\u8D2D\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					return self.NameInfo(self.turnMoney(FeeList.installationFee) + ' (' + (FeeList.installationFeeRate && FeeList.installationFeeRate != '请选择' ? FeeList.installationFeeRate : '-') + ')');
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, self.turnMoney(FeeList.installationFee), ' (' + (FeeList.installationFeeRate && FeeList.installationFeeRate != '请选择' ? FeeList.installationFeeRate : '-') + ')'), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u4EBA\u5DE5\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					return self.NameInfo(self.turnMoney(FeeList.hotelCost) + '  (' + (FeeList.hotelCostTax && FeeList.hotelCostTax != '请选择' ? FeeList.hotelCostTax : '-') + ')');
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, self.turnMoney(FeeList.hotelCost), '  (' + (FeeList.hotelCostTax && FeeList.hotelCostTax != '请选择' ? FeeList.hotelCostTax : '-') + ')'), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u4F4F\u5BBF\u8D39\u5C0F\u8BA1(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'money-show-c' }, _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					return self.NameInfo(self.turnMoney(FeeList.carCost) + ' (' + (FeeList.carCostTax && FeeList.carCostTax != '请选择' ? FeeList.carCostTax : '-') + ')');
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, self.turnMoney(FeeList.carCost), ' (' + (FeeList.carCostTax && FeeList.carCostTax != '请选择' ? FeeList.carCostTax : '-') + ')'), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u5DEE\u65C5\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					return self.NameInfo(self.turnMoney(FeeList.otherCost) + '  (' + (FeeList.otherCostTax && FeeList.otherCostTax != '请选择' ? FeeList.otherCostTax : '-') + ')');
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, self.turnMoney(FeeList.otherCost), '  (' + (FeeList.otherCostTax && FeeList.otherCostTax != '请选择' ? FeeList.otherCostTax : '-') + ')'), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u5176\u4ED6\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i specail', onClick: function onClick(e) {
					return self.NameInfo(_this2.turnMoney(alldata.orderMoney));
				} }, _react2.default.createElement('div', { className: 'money-specail ellipsis' }, _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', { className: 'ellipsis' }, self.turnMoney(alldata.orderMoney))), _react2.default.createElement('div', { className: 'money-all-tax' }, "(\u542B\u7A0E)")))), _react2.default.createElement('div', { className: 'money-show-other-tip' }, _react2.default.createElement('i', { className: 'icon-money-tips' }), _react2.default.createElement('div', { className: 'money-show-other-tip-v' }, "\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002")));
		}
	}, {
		key: 'showCostInfo',
		value: function showCostInfo(type) {
			if (typeof this.props.showFeeDetail === 'function') this.props.showFeeDetail(type);
		}
	}]);

	return MoneyShow;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MoneyShow);

/***/ }),

/***/ 1830:
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

var RejectTip = function (_Component) {
	_inherits(RejectTip, _Component);

	function RejectTip(props) {
		_classCallCheck(this, RejectTip);

		var _this = _possibleConstructorReturn(this, (RejectTip.__proto__ || Object.getPrototypeOf(RejectTip)).call(this, props));

		_this.state = {
			showB: false
		};
		return _this;
	}

	_createClass(RejectTip, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.data;
			return _react2.default.createElement('div', { className: "reject-tip animated " + (data.show ? 'slideInLeft' : 'slideOutLeft') }, _react2.default.createElement('div', { className: "reject-tip-s " + (this.state['showB'] ? 'hide' : '') }, _react2.default.createElement('div', { className: 'reject-tip-close icon-close-s', onClick: function onClick(e) {
					return self.props.close();
				} }), _react2.default.createElement('div', { className: 'icon-reject-s' }), _react2.default.createElement('div', { className: 'reject-tip-c' }, _react2.default.createElement('div', { className: 'reject-tip-title' }, "DOA\u5BA1\u6838\u672A\u901A\u8FC7"), _react2.default.createElement('div', { className: 'reject-tip-val' }, "\u62D2\u7EDD\u5907\u6CE8\uFF1A\u7EF4\u4FEE\u8BA2\u5355\u660E\u7EC6\u586B\u5199\u7684\u4E0D\u591F\u6E05\u695A \u2026 ", _react2.default.createElement('span', { onClick: function onClick(e) {
					return _this2.showB(e);
				} }, "\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5")))), _react2.default.createElement('div', { className: "reject-tip-b  animated zoomIn " + (this.state['showB'] ? '' : 'hide') }, _react2.default.createElement('div', { className: 'reject-tip-close icon-close-b', onClick: function onClick(e) {
					return self.props.close();
				} }), _react2.default.createElement('div', { className: 'icon-reject-b' }), _react2.default.createElement('div', { className: 'reject-tip-c' }, _react2.default.createElement('div', { className: 'reject-tip-title' }, "DOA\u5BA1\u6838\u672A\u901A\u8FC7"), _react2.default.createElement('div', { className: 'reject-tip-val' }, "\u7EF4\u4FEE\u8BA2\u5355\u660E\u7EC6\u586B\u5199\u7684\u4E0D\u591F\u6E05\u6670\uFF0C\u65E0\u6CD5\u901A\u8FC7\u5BA1\u6279\uFF0C\u8BF7\u5C06 \u7EF4\u4FEE\u8BBE\u5907ID\u3001\u7EF4\u4FEE\u914D\u4EF6\u3001\u7EF4\u4FEE\u6570\u91CF\u7B49\u586B\u5199\u6E05\u695A\u3002"))));
		}
	}, {
		key: 'showB',
		value: function showB() {
			this.setState({
				showB: true
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log(this);
		}
	}]);

	return RejectTip;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(RejectTip);

/***/ }),

/***/ 1832:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = fetch;
exports.fetchByID = fetchByID;
exports.remove = remove;
exports.patch = patch;
exports.create = create;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function fetch(payload) {
  payload = _.extend({ pagesize: _constants.PAGE_SIZE, pageno: 0 }, payload);

  return (0, _EpsRequest2.default)('/api2/goods', {
    method: 'GET',
    body: payload
  });
}

function fetchByID(id) {
  return (0, _EpsRequest2.default)('/api2/goods/' + id, {
    method: 'GET'
  });
}

function remove(id) {
  return (0, _EpsRequest2.default)('/api2/goods/' + id, {
    method: 'DELETE'
  });
}

function patch(id, values) {
  return (0, _EpsRequest2.default)('/api2/goods/' + id, {
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}

function create(values) {
  return (0, _EpsRequest2.default)('/api2/goods', {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

/***/ }),

/***/ 1836:
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
}

var fittingOperation = (0, _constants.getDict)('fittingOperation');
var equipmentOperation = (0, _constants.getDict)('equipmentOperation');
console.log(equipmentOperation, "equipmentOperation");

var TodoCard = function (_Component) {
	_inherits(TodoCard, _Component);

	function TodoCard(props) {
		_classCallCheck(this, TodoCard);

		var _this = _possibleConstructorReturn(this, (TodoCard.__proto__ || Object.getPrototypeOf(TodoCard)).call(this, props));

		_this.state = {
			visible: false
		};
		return _this;
	}

	_createClass(TodoCard, [{
		key: 'operationType',
		value: function operationType(type) {
			if (type) {
				return _.filter(fittingOperation, function (item) {
					return item.label == type;
				})[0]['value'];
			} else {
				return '';
			}
		}
	}, {
		key: 'equipmentType',
		value: function equipmentType(type) {
			if (type) {
				return _.filter(equipmentOperation, function (item) {
					return item.label == type;
				})[0]['value'];
			} else {
				return '';
			}
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name) {
			if ((0, _constants.DataLength)(name) > 10) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var devicedata = this.props.devicedata;
			var showAllData = this.props.showAllData;
			var deviceDetailInfo = this.props.deviceDetailInfo;
			console.log(devicedata, 'devicedata');
			var self = this;
			var partHtml = '';
			var btn = '';
			if (deviceDetailInfo && devicedata.partList.length > 0) {
				console.log(1111);
				partHtml = _.map(devicedata.partList, function (item) {
					return _react2.default.createElement('div', { className: 'todo-fitting' }, _react2.default.createElement('div', { className: 'todo-fitting-i' }, _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-title', onClick: function onClick() {
							return self.NameInfo(item.partName);
						} }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: 'todo-info-label' }, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.partName)), _react2.default.createElement('div', { className: 'todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.maintenanceNum))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
							return self.NameInfo(item.mark);
						} }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.mark ? item.mark : '无')), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.operate ? (0, _constants.getDictVal)('fittingOperation', item.operate) : '无')))));
				});
				partHtml = '';
			} else if (!deviceDetailInfo && devicedata.partList.length > 0) {

				var item = devicedata.partList[0];
				console.log(item, "item");
				partHtml = _react2.default.createElement('div', { className: 'todo-fitting' }, _react2.default.createElement('div', { className: 'todo-fitting-i' }, _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-title', onClick: function onClick() {
						return self.NameInfo(item.partName);
					} }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: 'todo-info-label' }, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.partName)), _react2.default.createElement('div', { className: 'todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.maintenanceNum))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
						return self.NameInfo(item.mark);
					} }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.mark ? item.mark : '无')), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.operate ? (0, _constants.getDictVal)('fittingOperation', item.operate) : '无')))));
				partHtml = '';
				btn = _react2.default.createElement('div', { className: 'todo-btn showLine specail-color', onClick: function onClick(e) {
						return _this2.props.openView('/repairing/equipment-info/');
					} }, "\u67E5\u770B\u66F4\u591A\u8BBE\u5907\u4FE1\u606F");
			} else {
				partHtml = '';
				btn = _react2.default.createElement('div', { className: 'todo-btn specail-color', onClick: function onClick(e) {
						return _this2.props.openView('/repairing/equipment-info/');
					} }, "\u67E5\u770B\u66F4\u591A\u8BBE\u5907\u4FE1\u606F");
			}
			return _react2.default.createElement('div', { className: 'todo-card  zoomIn' }, _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info' }, _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('i', null), _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
					return _this2.NameInfo(devicedata.deviceName);
				} }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.deviceName)), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u5E8F\u5217\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.deviceSerialNumber))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code'), _react2.default.createElement('span', { className: 'todo-info-val' }, devicedata.faCategory)), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, devicedata.operate ? (0, _constants.getDictVal)('equipmentOperation', devicedata.operate) : '无'))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code2'), _react2.default.createElement('span', { className: 'todo-info-val' }, devicedata.subCategory)), _react2.default.createElement('div', { className: 'todo-info-r', onClick: function onClick() {
					return _this2.NameInfo(devicedata.vendorName);
				} }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u5546"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.vendorName))), _react2.default.createElement('div', { className: 'todo-info-i ' }, _react2.default.createElement('div', { className: 'todo-info-l todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, _react2.default.createElement('font', { className: 'eps-badge' }, devicedata.maintenanceNum))), _react2.default.createElement('div', { className: 'todo-info-r', onClick: function onClick() {
					return _this2.NameInfo(devicedata.mark);
				} }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.mark ? devicedata.mark : '无')))), partHtml), showAllData ? btn : '');
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}]);

	return TodoCard;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(TodoCard);

/***/ }),

/***/ 1916:
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

var _UserCard = __webpack_require__(1435);

var _UserCard2 = _interopRequireDefault(_UserCard);

var _TodoCard = __webpack_require__(1836);

var _TodoCard2 = _interopRequireDefault(_TodoCard);

var _MoneyShow = __webpack_require__(1829);

var _MoneyShow2 = _interopRequireDefault(_MoneyShow);

var _RejectTip = __webpack_require__(1830);

var _RejectTip2 = _interopRequireDefault(_RejectTip);

var _EpsDialog = __webpack_require__(344);

var _EpsDialog2 = _interopRequireDefault(_EpsDialog);

var _Appraisal = __webpack_require__(1935);

var _Appraisal2 = _interopRequireDefault(_Appraisal);

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
   * 待办列表
   */

var EditConfrim = function (_Component) {
	_inherits(EditConfrim, _Component);

	function EditConfrim() {
		_classCallCheck(this, EditConfrim);

		return _possibleConstructorReturn(this, (EditConfrim.__proto__ || Object.getPrototypeOf(EditConfrim)).apply(this, arguments));
	}

	_createClass(EditConfrim, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var containerStyle = {
				height: (736 - 94 - 49 - 151) / 41.4 + 'rem'
			};
			var data = this.props.todos;
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_UserCard2.default, null))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c', style: containerStyle }, _react2.default.createElement(_TodoCard2.default, null))), _react2.default.createElement(_MoneyShow2.default, null), _react2.default.createElement(_RejectTip2.default, null), _react2.default.createElement(_EpsDialog2.default, { Component: _Appraisal2.default }), _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openWebView('/approval');
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small' }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large' }, "\u786E\u8BA4")))));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}, {
		key: 'componentWillUnmout',
		value: function componentWillUnmout() {
			console.log('componentWillUnmout');
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			NProgress.done();
			var self = this;
		}
	}]);

	return EditConfrim;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(EditConfrim);

/***/ }),

/***/ 1935:
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

var Appraisal = function (_Component) {
	_inherits(Appraisal, _Component);

	function Appraisal() {
		_classCallCheck(this, Appraisal);

		return _possibleConstructorReturn(this, (Appraisal.__proto__ || Object.getPrototypeOf(Appraisal)).apply(this, arguments));
	}

	_createClass(Appraisal, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'changeData',
		value: function changeData() {}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var formData = {
				schema: [{
					name: 'rate_1', element: 'Rate',
					label: '是否及时到店',
					defaultValue: 0,
					attr: {
						empty: _react2.default.createElement('i', { className: 'icon-star' }),
						full: _react2.default.createElement('i', { className: 'icon-star-active' })
					},
					rules: []
				}, {
					name: 'rate_2', element: 'Rate',
					label: '服务人员主动出示证件',
					defaultValue: 0,
					attr: {
						empty: _react2.default.createElement('i', { className: 'icon-star' }),
						full: _react2.default.createElement('i', { className: 'icon-star-active' })
					},
					rules: []
				}, {
					name: 'rate_3', element: 'Rate',
					label: '服务商响应时间',
					defaultValue: 0,
					attr: {
						empty: _react2.default.createElement('i', { className: 'icon-star' }),
						full: _react2.default.createElement('i', { className: 'icon-star-active' })
					},
					rules: []
				}, {
					name: 'rate_4', element: 'Rate',
					label: '服务态度',
					defaultValue: 0,
					attr: {
						empty: _react2.default.createElement('i', { className: 'icon-star' }),
						full: _react2.default.createElement('i', { className: 'icon-star-active' })
					},
					rules: []
				}, {
					name: 'rate_5', element: 'Rate',
					label: '服务质量',
					defaultValue: 0,
					attr: {
						empty: _react2.default.createElement('i', { className: 'icon-star' }),
						full: _react2.default.createElement('i', { className: 'icon-star-active' })
					},
					rules: []
				}, {
					name: 'rate_6', element: 'Rate',
					label: '现场清理',
					defaultValue: 0,
					attr: {
						empty: _react2.default.createElement('i', { className: 'icon-star' }),
						full: _react2.default.createElement('i', { className: 'icon-star-active' })
					},
					rules: []
				}, {
					name: 'feedback', element: 'Textarea',
					defaultValue: '',
					attr: {
						className: 'appraisal-form-feedback',
						placeholder: '请输入备注'
					},
					rules: []
				}],
				buttons: false,
				changeData: this.changeData.bind(this)
			};
			return _react2.default.createElement('div', { className: 'appraisal-form' }, _react2.default.createElement(_mobile2.default, { formData: formData, onChange: function onChange(values, schema) {
					return _this2.FormChange(values, schema);
				} }));
		}
	}]);

	return Appraisal;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(Appraisal);

/***/ }),

/***/ 1957:
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

var _Demo = __webpack_require__(1832);

var demoService = _interopRequireWildcard(_Demo);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

exports.default = {
	namespace: 'todos',
	state: {
		loading: false
	},
	reducers: {
		changeData: function changeData(state, action) {
			return _extends({}, state, action.data);
		}
	},
	effects: {},
	subscriptions: {}

};

/***/ })

});