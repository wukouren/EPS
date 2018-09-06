webpackJsonp([22],{

/***/ 1141:
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

var EmptyView = function (_Component) {
	_inherits(EmptyView, _Component);

	function EmptyView(props) {
		_classCallCheck(this, EmptyView);

		return _possibleConstructorReturn(this, (EmptyView.__proto__ || Object.getPrototypeOf(EmptyView)).call(this, props));
	}

	_createClass(EmptyView, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'eps-empty-view' }, _react2.default.createElement('font', { className: 'emptyicon' }, _react2.default.createElement('img', { src: 'images/empty-device.png' })), _react2.default.createElement('p', null, this.props.tip || '没有找到相关内容'));
		}
	}]);

	return EmptyView;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(EmptyView);

/***/ }),

/***/ 1860:
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
} /**
   * 非项目采购头部用户信息
   * demo
   * <header className="header header-4lines" ref="header">
  					<div className="header-bg"></div>
  					<div className="header-bg-2"></div>
  					<div className="header-c">
  						<HeaderCard userinfo={ userinfo }/>
  					</div>
  				</header>
   */

var HeaderCard = function (_Component) {
	_inherits(HeaderCard, _Component);

	function HeaderCard() {
		_classCallCheck(this, HeaderCard);

		return _possibleConstructorReturn(this, (HeaderCard.__proto__ || Object.getPrototypeOf(HeaderCard)).apply(this, arguments));
	}

	_createClass(HeaderCard, [{
		key: 'openFileView',
		value: function openFileView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.creatorinfo;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'openScrapView',
		value: function openScrapView() {
			var datas = this.props.creatorinfo;
			localStorage.removeItem("Joywok:cache:tabs:scrap");
			var url = EpsWebRoot + '/#/scrapped/' + datas["orderNumber"];
			window.upTabsData('scrap', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var creatorinfo = this.props.creatorinfo;
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			console.log(creatorinfo, '父级传过来的东西');
			return _react2.default.createElement('div', { className: 'user-card' }, _react2.default.createElement('div', { className: 'user-card-c' }, _react2.default.createElement('div', { className: 'user-card-avatar' }, _react2.default.createElement('img', { src: creatorinfo.avatar, alt: '' })), _react2.default.createElement('div', { className: 'user-card-info' }, _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u521B\u5EFA\u4EBA"), _react2.default.createElement('span', { className: 'user-card-val' }, creatorinfo.createName)), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'user-card-val' }, creatorinfo.storeName)), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'user-card-val' }, creatorinfo.storeNumber)), _react2.default.createElement('div', { className: 'user-card-info-btns' }, _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u67E5\u770B\u9644\u4EF6", creatorinfo['fileCount'] && creatorinfo['fileCount'] != 0 ? '(' + creatorinfo['fileCount'] + ')' : '')), creatorinfo.showScrapTip && creatorinfo.showScrapTip != 0 && window.userinfo['userType'] == '2' ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openScrapView(e);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u8D44\u4EA7\u62A5\u5E9F", creatorinfo['scrapPageInfo'] && creatorinfo['scrapPageInfo'].length != 0 ? '(' + creatorinfo['scrapPageInfo'].length + ')' : '')) : ''))));
		}
	}]);

	return HeaderCard;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(HeaderCard);

/***/ }),

/***/ 1861:
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

var _router = __webpack_require__(338);

var _EmptyView = __webpack_require__(1141);

var _EmptyView2 = _interopRequireDefault(_EmptyView);

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
   * 非项目维修商列表
   */

var TableList = function (_Component) {
	_inherits(TableList, _Component);

	function TableList(props) {
		_classCallCheck(this, TableList);

		var _this = _possibleConstructorReturn(this, (TableList.__proto__ || Object.getPrototypeOf(TableList)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(TableList, [{
		key: 'NameInfo',
		value: function NameInfo(name) {
			console.log(1111);
			if ((0, _constants.DataLength)(name) > 8) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'MoneyInfo',
		value: function MoneyInfo() {
			var name = "总价=采购费用+其他费用";
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
		key: 'openWebView',
		value: function openWebView(objecttype, type) {
			var orderid = this.props.approval.orderNumber;
			var url = '';
			var data = this.props.approval;
			// let updateDate = encodeURIComponent(data['updateDate']);
			var time = data['updateDate'].split('.')[0];
			var updateDate = encodeURIComponent(time);
			if (this.props.approval.view == 'vieworder') {
				url = EpsWebRoot + '/#/nonproject/vendor-info/' + orderid + '/' + objecttype + '/4?updateDate=' + updateDate;
			} else if (this.props.approval.view == 'view') {
				url = EpsWebRoot + '/#/nonproject/vendor-info/' + orderid + '/' + objecttype + '/10?updateDate=' + updateDate;
			} else {
				url = EpsWebRoot + '/#/nonproject/vendor-info/' + orderid + '/' + objecttype + '/' + type + '?updateDate=' + updateDate;
			}
			// console.log(url,"url")
			jw.pushWebView(url);
		}
	}, {
		key: 'equipmentItemRender',
		value: function equipmentItemRender(data) {
			var _this2 = this;

			var self = this;
			console.log(data, '123123123123123123123123123123123');
			if (data.type == 'service') {
				return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.vendorName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.vendorName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.deviceName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.deviceName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(_this2.turnMoney(data.otherCostAll) + ' ¥');
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, this.turnMoney(data.otherCostAll))));
			} else if (data.type == 'supplier') {
				return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.vendorName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.vendorName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.deviceName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.deviceName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(_this2.turnMoney(data.deviceCostAll) + ' ¥');
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, this.turnMoney(data.deviceCostAll))));
			} else {
				return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.vendorName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.vendorName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.deviceName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.deviceName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(_this2.turnMoney(data.deviceCostAll) + ' ¥');
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, this.turnMoney(data.deviceCostAll))));
			}
		}
	}, {
		key: 'ITItemRender',
		value: function ITItemRender(data) {
			var _this3 = this;

			var self = this;
			if (data.tsiType && data.isDirectMining == 'Y') {
				console.log(111111, data.tsiType);
				return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.serviceVendorName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.serviceVendorName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.deviceName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.deviceName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(_this3.turnMoney(data.lumpSumPrice) + ' ¥');
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, this.turnMoney(data.lumpSumPrice))));
			} else if (data.tsiType && data.isDirectMining == 'N') {
				return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.serviceVendorName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.serviceVendorName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.deviceName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.deviceName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(_this3.turnMoney(data.lumpSumPrice) + ' ¥');
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, this.turnMoney(data.lumpSumPrice))));
			} else {
				return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.vendorName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.vendorName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(data.deviceName);
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, data.deviceName)), _react2.default.createElement('td', { onClick: function onClick() {
						return self.NameInfo(_this3.turnMoney(data.lumpSumPrice) + ' ¥');
					} }, _react2.default.createElement('font', { className: 'ellipsis-1l ' }, this.turnMoney(data.lumpSumPrice))));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var list = this.props.list;
			var objecttype = this.props.objecttype;
			var type = this.props.type;
			var data = this.props.data;
			var self = this;
			var showMoreBtn = false;
			console.log(list, data, this.props.showBtn, "btn");

			if (objecttype == 'it') {
				list = list.slice(0, 5);
			} else if (list.length > 2) {
				list = list.slice(0, 2);
			}
			var tableHtml = '';
			var MoreBtn = "";
			if (this.props.hideBtn) {
				MoreBtn = '';
			} else {
				MoreBtn = _react2.default.createElement('div', { className: 'todo-card' }, _react2.default.createElement('div', { className: 'todo-btn border-line-h before specail-color', onClick: function onClick(e) {
						return _this4.openWebView(objecttype, type);
					} }, "\u67E5\u770B\u66F4\u591A\u660E\u7EC6"));
			}
			if (this.props.objecttype == 'project') {
				tableHtml = _react2.default.createElement('table', null, _react2.default.createElement('thead', null, _react2.default.createElement('tr', null, _react2.default.createElement('td', null, "\u4F9B\u5E94\u5546\u540D"), _react2.default.createElement('td', null, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('td', null, "\u603B\u4EF7"))), _react2.default.createElement('tbody', null, list.map(function (item) {
					return _react2.default.createElement('tr', null, _react2.default.createElement('td', { onClick: function onClick() {
							return self.NameInfo(item.vendorName);
						} }, _react2.default.createElement('font', { className: 'ellipsis-1l' }, item.vendorName)), _react2.default.createElement('td', { onClick: function onClick() {
							return self.NameInfo(item.deviceName);
						} }, ' ', _react2.default.createElement('font', { className: 'ellipsis-1l' }, item.deviceName)), _react2.default.createElement('td', null, item.cost.toFixed(2)));
				})));
			} else if (objecttype == 'equipment') {
				tableHtml = _react2.default.createElement('table', null, _react2.default.createElement('thead', null, _react2.default.createElement('tr', null, _react2.default.createElement('td', null, "\u4F9B\u5E94\u5546\u540D"), _react2.default.createElement('td', null, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('td', { onClick: function onClick() {
						return self.MoneyInfo();
					} }, "\u603B\u4EF7", _react2.default.createElement('i', { className: 'icon-noproject-cost-tip' })))), _react2.default.createElement('tbody', null, _.map(list, function (item) {
					return self.equipmentItemRender(item);
				})));
			} else {

				//IT 的tabel 展示 
				tableHtml = _react2.default.createElement('table', null, _react2.default.createElement('thead', null, _react2.default.createElement('tr', null, _react2.default.createElement('td', null, "\u4F9B\u5E94\u5546\u540D\u79F0"), _react2.default.createElement('td', null, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('td', { onClick: function onClick() {
						return self.MoneyInfo();
					} }, "\u603B\u4EF7", _react2.default.createElement('i', { className: 'icon-noproject-cost-tip' })))), _react2.default.createElement('tbody', null, _.map(list, function (item) {
					return self.ITItemRender(item);
				})));
			}
			if (list && list.length > 0) {
				return _react2.default.createElement('div', { className: 'header-nonproject-table' }, tableHtml, MoreBtn);
			} else {
				return _react2.default.createElement('div', { className: 'nonproject-empty' }, _react2.default.createElement(_EmptyView2.default, { tip: "\u6682\u65E0\u6570\u636E" }));
			}
		}
	}]);

	return TableList;
}(_react.Component);

;

TableList.propTypes = {};

function mapStateToProps(state) {
	return state;
}

exports.default = (0, _dva.connect)(mapStateToProps)(TableList);

/***/ }),

/***/ 1880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = __webpack_require__(207);

var _list2 = _interopRequireDefault(_list);

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

__webpack_require__(208);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dva = __webpack_require__(196);

var _HeaderCard = __webpack_require__(1860);

var _HeaderCard2 = _interopRequireDefault(_HeaderCard);

var _TableList = __webpack_require__(1861);

var _TableList2 = _interopRequireDefault(_TableList);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

var _EpsModal = __webpack_require__(198);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

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
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 非项目订单审批流程（含设备／工程／IT）(审批节点含： OC审批，OM审批，DO审批，GM审批，DOA审批，送货调整DOA审批)
   * 除IT采购的OC审批流程有表单需填写外，其它流程都一样
   */

var Approval = function (_Component) {
  _inherits(Approval, _Component);

  function Approval(props) {
    _classCallCheck(this, Approval);

    var _this = _possibleConstructorReturn(this, (Approval.__proto__ || Object.getPrototypeOf(Approval)).call(this, props));

    _this.state = {};
    _this.type = _this.props.params.type;
    _this.combinePurchaseContent = _this.combinePurchaseContent.bind(_this);
    _this.EvaluateRefuse = _this.EvaluateRefuse.bind(_this);
    _this.callback = _this.callback.bind(_this);
    return _this;
  }

  _createClass(Approval, [{
    key: 'turnMoney',
    value: function turnMoney(data) {
      return Number(data).formatMoney(2, '', '');
    }

    // 拒绝订单

  }, {
    key: 'reject',
    value: function reject() {
      console.log('reject');
      var self = this;
      var type = this.props.location.query.type;
      var objecttype = this.props.params.objecttype;
      if (type == '4') {
        //这里调用餐厅评价接口
        if (objecttype == 'it') {
          //调用it餐厅评价
          var approveFlg = 'REFUSE';
          var agreeDialog = (0, _EpsModal.MemoDialog)({
            title: '是否拒绝该订单',
            value: self.agreeMemo ? self.agreeMemo : '',
            btnVal: '拒绝',
            btnIconClass: 'icon-reject',
            placeholder: '拒绝必须输入备注！',
            memorequired: true,
            onBtnClick: function onBtnClick(memo, callback) {
              self.agreeMemo = memo;
              self.ITEvaluate(memo, approveFlg, callback);
            },
            onClose: function onClose(memo) {
              self.agreeMemo = memo;
              console.log('approve agree onClose:', memo);
            }
          });
        } else {
          self.EvaluateRefuse();
        }
      } else {
        var rejectDialog = (0, _EpsModal.MemoDialog)({
          title: '是否拒绝该订单?',
          value: self.rejectMemo ? self.rejectMemo : '',
          btnIconClass: 'icon-reject',
          btnVal: '拒绝',
          placeholder: '拒绝必须输入备注...',
          memorequired: true,
          onBtnClick: function onBtnClick(memo, callback) {
            self.rejectMemo = memo;
            var approveFlg = 'REFUSE';
            console.log('approve reject onBtnClick:', memo, type);
            self.submitOrder(memo, approveFlg, callback);
          },
          onClose: function onClose(memo) {
            self.rejectMemo = memo;
            console.log('approve reject onClose:');
          }
        });
      }
    }

    // 通过订单

  }, {
    key: 'agree',
    value: function agree() {
      var self = this;
      var type = this.props.location.query.type;
      var objecttype = this.props.params.objecttype;
      if (type == '4') {
        // 餐厅评价 IT订单也增加五星评价
        self.EvaluateAgree();
        return;

        //这里调用餐厅评价接口
        // if(objecttype=='it'){
        //  //调用it餐厅评价
        //   let approveFlg='PASS';
        //   let agreeDialog = MemoDialog({
        //      title:'请您评价',
        //      value: self.agreeMemo ?  self.agreeMemo : '',
        //      btnVal: '完成',
        //      placeholder: '请输入备注......', 
        //      memorequired: false, 
        //      onBtnClick: (memo,callback)=>{  
        //        self.agreeMemo = memo;
        //        self.ITEvaluate(memo,approveFlg,callback); 
        //      },
        //      onClose: (memo)=>{  
        //        self.agreeMemo = memo;
        //        console.log('approve agree onClose:',memo)
        //      },
        //    });
        // }else{ 
        //   self.EvaluateAgree()
        // }
      } else {
        var agreeDialog = (0, _EpsModal.MemoDialog)({
          title: '是否确认通过？',
          value: self.agreeMemo ? self.agreeMemo : '',
          btnVal: '确认',
          placeholder: '选择输入备注...',
          memorequired: false,
          onBtnClick: function onBtnClick(memo, callback) {
            self.agreeMemo = memo;
            var approveFlg = 'PASS';
            self.submitOrder(memo, approveFlg, callback);
          },
          onClose: function onClose(memo) {
            self.agreeMemo = memo;
            console.log('approve agree onClose:', memo);
          }
        });
      }
    }

    //IT 餐厅评价

  }, {
    key: 'ITEvaluate',
    value: function ITEvaluate(memo, approveFlg, callback) {
      console.log(memo, approveFlg, "it餐厅评价");
      var self = this;
      (0, _EpsRequest2.default)('/McdEpsApi/joywok/noproject/submitITStoreEvaluate', {
        method: 'POST',
        body: JSON.stringify({
          param: {
            eid: eid,
            record: {
              orderNumber: self.props.approval.orderNumber,
              updateDate: self.props.approval.updateDate,
              orderState: self.props.approval.orderState,
              approveFlg: approveFlg,
              operateMarks: memo
            }
          }
        })
      }).then(function (resp) {
        // 把提交中按钮置为原样
        if (typeof callback == 'function') {
          callback(true);
        }
        if (resp['data']['success'] == false) {} else {
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

    //餐厅评价

  }, {
    key: 'EvaluateAgree',
    value: function EvaluateAgree() {
      var _this2 = this;

      var objecttype = this.props.params.objecttype;
      var EvaluateUrl = '';
      switch (objecttype) {
        case 'equipment':
          EvaluateUrl = '/McdEpsApi/joywok/noproject/submitEQStoreEvaluate';
          break;
        case 'project':
          EvaluateUrl = '/McdEpsApi/joywok/noproject/submitCOStoreEvaluate';
          break;
        case 'it':
          EvaluateUrl = '/McdEpsApi/joywok/noproject/submitITStoreEvaluate';
          break;
      }
      console.log(window.NoProjectEvaluate, "NoProjectEvaluate");
      var self = this;
      if (this.showScrapTip != 0) {
        var i;

        var _ret = function () {
          var storeScrapList = self.props.approval['storeScrapList'];
          var ScrapList = [];
          ScrapList = self.props.approval['partList'];
          var ScrapError = '';
          for (i in ScrapList) {
            if (_.filter(storeScrapList, function (item) {
              return item['deviceName'] == ScrapList[i]['deviceName'];
            }).length != 0) {} else {
              ScrapError = ScrapList[i]['deviceName'];
              break;
            }
          }
          console.log(ScrapError, _this2.showScrapTip, '这个是啥');
          if (ScrapError.length != 0) {
            (0, _EpsModal.AlertBase)({
              tip: _react2.default.createElement('div', { className: '' }, '\u8BF7\u53C2\u7167 \u201C ', _react2.default.createElement('span', { style: { color: '#4174d9' }, onClick: function onClick(e) {
                  // alert('等待Mcd提供连接！！');
                  jw.previewDoc({
                    url: 'http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/common/getFile?fileId=TMP00000000000000000000000000030',
                    name: '资产查找指引',
                    type: 'application/pdf' // application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
                  }, {
                    success: function success() {}
                  });
                } }, ' \u8D44\u4EA7\u67E5\u627E\u6307\u5F15'), ' \u201D ', ScrapError, _react2.default.createElement('br', null), '\u6311\u9009\u5BF9\u5E94\u7684\u62A5\u5E9F\u8D44\u4EA7\uFF0C\u5982\u679C', _react2.default.createElement('br', null), '\u6CA1\u6709\u5BF9\u5E94\u9009\u9879\uFF0C\u8BF7\u8054\u7CFB', _react2.default.createElement('br', null), 'EPS Support', _react2.default.createElement('br', null), ' (eps@cn.mcd.com)'),
              onOk: function onOk() {}
            });
            return {
              v: void 0
            };
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      // if(this.showScrapTip!=0 && storeScrapList.length==0){
      //   AlertBase({
      //     tip: '资产报废不能为空！！',
      //     icon: 'icon-save-error',
      //     onOk: ()=>{}
      //   });
      //   return 
      // }
      (0, _EpsModal.EvaluateDialog)({
        title: '请输入评价',
        btnIconClass: 'icon-check',
        btnVal: '完成',
        formData: {
          schema: _.map(window.NoProjectEvaluate, function (val, key) {
            return {
              name: key, element: 'Rate',
              label: val,
              defaultValue: typeof window.EvaluateCache != 'undefined' ? window.EvaluateCache[key] : 0,
              attr: {
                empty: _react2.default.createElement('i', { className: 'icon-star' }),
                full: _react2.default.createElement('i', { className: 'icon-star-active' })
              },
              rules: []
            };
          }).concat({
            name: 'operateMarks', element: 'Textarea',
            defaultValue: typeof window.EvaluateCache != 'undefined' ? window.EvaluateCache['operateMarks'] : '',
            attr: {
              className: 'appraisal-form-feedback',
              placeholder: '请输入备注...'
            },
            rules: []
          }),
          buttons: false,
          changeData: this.changeData.bind(this)
        },
        rules: function rules(data) {
          for (var i in window.NoProjectEvaluate) {
            if (data[i] == 0) {
              (0, _EpsModal.AlertBase)({
                tip: '请输入' + window.NoProjectEvaluate[i] + '的评价!',
                icon: 'icon-save-error',
                onOk: function onOk() {}
              });
              return false;
            }
          }
          var hasOne = false;
          _.each(window.NoProjectEvaluate, function (i, key) {
            if (data[key] <= 2) {
              hasOne = true;
            }
          });
          if (hasOne && data['operateMarks'].length == 0) {
            (0, _EpsModal.AlertBase)({
              tip: '由于评星较低，请输入备注！！',
              icon: 'icon-save-error',
              onOk: function onOk() {}
            });
            return false;
          }
          return true;
        },
        onBtnClick: function onBtnClick(data, callback) {
          console.log(data, "data");
          var orderid = self.props.params.orderid;
          var eid = userinfo.employee_id;
          var updateDate = self.props.approval['updateDate'];
          (0, _EpsRequest2.default)(EvaluateUrl, {
            method: 'POST',
            body: JSON.stringify({
              param: {
                eid: eid,
                record: _.extend({
                  orderNumber: self.props.approval.orderNumber,
                  updateDate: self.props.approval.updateDate,
                  orderState: self.props.approval.orderState,
                  approveFlg: 'PASS',
                  storeScrapList: self.props.approval.storeScrapList || []
                }, data)
              }
            })
          }).then(function (resp) {
            // 把提交中按钮置为原样
            if (typeof callback == 'function') {
              callback(true);
            }
            if (resp['data']['success'] == false) {} else {
              (0, _EpsModal.AlertBase)({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: function onOk() {
                  jw.closeWebView();
                }
              });
            }
          });
        },
        onClose: function onClose(memo) {
          // self.rejectMemo = memo;
          console.log('approve reject onClose:');
        }
      });
    }

    //餐厅拒绝评价

  }, {
    key: 'EvaluateRefuse',
    value: function EvaluateRefuse() {
      var EvaluateUrl = '';
      var objecttype = this.props.params.objecttype;
      switch (objecttype) {
        case 'equipment':
          EvaluateUrl = '/McdEpsApi/joywok/noproject/submitEQStoreEvaluate';
          break;
        case 'project':
          EvaluateUrl = '/McdEpsApi/joywok/noproject/submitCOStoreEvaluate';
          break;
        case 'it':
          EvaluateUrl = '/McdEpsApi/joywok/noproject/submitITStoreEvaluate';
          break;

      }
      var orderid = this.props.params.orderid;
      var eid = userinfo.employee_id;
      var self = this;
      var approvalData = this.props.approval;
      var epsDialog = (0, _EpsModal.MemoDialog)({
        title: '是否拒绝该订单',
        value: self.rejectMemo ? self.rejectMemo : '',
        btnIconClass: 'icon-reject',
        btnVal: '拒绝',
        placeholder: '拒绝必须输入备注...',
        changeData: function changeData() {},
        memorequired: true,
        onBtnClick: function onBtnClick(memo, callback) {
          console.log(memo, 'memo');
          (0, _EpsRequest2.default)(EvaluateUrl, {
            method: 'POST',
            body: JSON.stringify({
              param: {
                eid: eid,
                record: {
                  orderNumber: self.props.approval.orderNumber,
                  updateDate: self.props.approval.updateDate,
                  orderState: self.props.approval.orderState,
                  approveFlg: 'REFUSE',
                  operateMarks: memo
                }
              }
            })
          }).then(function (resp) {
            // 把提交中按钮置为原样
            if (typeof callback == 'function') {
              callback(true);
            }
            if (resp['data']['success'] == false) {} else {
              (0, _EpsModal.AlertBase)({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: function onOk() {
                  jw.closeWebView();
                }
              });
            }
          });
        },
        onClose: function onClose(memo) {
          self.rejectMemo = memo;
          console.log('approve reject onClose:');
        }
      });
    }

    //提交审批订单

  }, {
    key: 'submitOrder',
    value: function submitOrder(memo, approveFlg, callback) {
      var objecttype = this.props.params.objecttype;
      var type = this.props.location.query.type;
      console.log("objecttype", this.props.params.objecttype);
      var dispatch = this.props.dispatch;
      var self = this;
      var isoc = this.props.approval.isoc;
      if (objecttype == 'it' && type == '10') {
        console.log(this.props.approval, "it:approval");
        //it 的OC/OM,DO,GM 审批
        var data = this.props.approval;
        var fixedAssets = void 0;
        var oldAssets = void 0;
        var inSales = void 0;
        var toIncrease = void 0;
        var profitIncrease = void 0;
        var toBeROI = void 0;

        if (isoc) {
          //如果为it的oc审批，提交表单数据
          console.log(this.props.approval, '走这里了吗1111111');
          this.refs.itform.validateFields(function (errors, value) {
            console.log(errors, value, 'value');
            fixedAssets = value.fixedAssets ? value.fixedAssets : 0;
            oldAssets = value.oldAssets ? value.oldAssets : 0;
            inSales = value.inSales ? value.inSales[0] : 0;
            toIncrease = value.toIncrease ? value.toIncrease : 0;
            profitIncrease = value.profitIncrease ? value.profitIncrease : 0;
            if (value.profitIncrease && value.fixedAssets && inSales == 1) {
              if (value.profitIncrease == '0.00' || value.profitIncrease == '') {
                toBeROI = 0;
              } else if (value.fixedAssets == '0.00' || value.fixedAssets == '') {
                toBeROI = 0;
              }
              toBeROI = (value.profitIncrease / value.fixedAssets * 100).toFixed(2);
            } else {
              toBeROI = 0;
            }
          });
          // console.log(JSON.stringify({
          //     param:{
          //       eid: userinfo.employee_id,
          //       record: {
          //           updateDate:self.props.approval.updateDate ,
          //           orderNumber:self.props.approval.orderNumber,
          //           orderState: self.props.approval.orderState,
          //           approveFlg:approveFlg,
          //           operateMarks: memo,
          //           fixedAssets: fixedAssets,
          //           oldAssets: oldAssets,
          //           inSales: inSales,
          //           toIncrease: toIncrease,
          //           profitIncrease: profitIncrease,
          //           toBeROI: toBeROI,
          //       }
          //     }
          //   }),"3333")
          (0, _EpsRequest2.default)('/McdEpsApi/joywok/noproject/submitOrderInfo', {
            method: 'POST',
            body: JSON.stringify({
              param: {
                eid: userinfo.employee_id,
                record: {
                  updateDate: self.props.approval.updateDate,
                  orderNumber: self.props.approval.orderNumber,
                  orderState: self.props.approval.orderState,
                  approveFlg: approveFlg,
                  operateMarks: memo,
                  fixedAssets: fixedAssets,
                  oldAssets: oldAssets,
                  inSales: inSales,
                  toIncrease: toIncrease,
                  profitIncrease: profitIncrease,
                  toBeROI: toBeROI
                }
              }
            })
          }).then(function (resp) {
            console.log(resp, "resp", "it的审批");
            // 把提交中按钮置为原样
            if (typeof callback == 'function') {
              callback(true);
            }
            if (resp.data.success) {
              (0, _EpsModal.AlertBase)({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: function onOk() {
                  jw.closeWebView();
                }
              });
            } else {
              self.rejectMemo = memo;
              console.log("fail");
            }
          });
        } else {
          console.log(this.props.approval, "approval:om");
          //it 的审批非 oc 审批
          (0, _EpsRequest2.default)('/McdEpsApi/joywok/noproject/submitOrderInfo', {
            method: 'POST',
            body: JSON.stringify({
              param: {
                eid: userinfo.employee_id,
                record: {
                  updateDate: self.props.approval.updateDate,
                  orderNumber: self.props.approval.orderNumber,
                  orderState: self.props.approval.orderState,
                  approveFlg: approveFlg,
                  operateMarks: memo,
                  fixedAssets: self.props.approval.fixedAssets ? self.props.approval.fixedAssets : 0,
                  oldAssets: self.props.approval.oldAssets ? self.props.approval.oldAssets : 0,
                  inSales: self.props.approval.inSales ? self.props.approval.inSales : 0,
                  toIncrease: self.props.approval.toIncrease ? self.props.approval.toIncrease : 0,
                  profitIncrease: self.props.approval.profitIncrease ? self.props.approval.profitIncrease : 0,
                  toBeROI: self.props.approval.toBeROI ? self.props.approval.toBeROI : 0
                }
              }
            })
          }).then(function (resp) {
            console.log(resp, "resp", "it的审批");
            // 把提交中按钮置为原样
            if (typeof callback == 'function') {
              callback(true);
            }
            if (resp.data.success) {
              (0, _EpsModal.AlertBase)({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: function onOk() {
                  jw.closeWebView();
                }
              });
            } else {
              self.rejectMemo = memo;
              console.log("fail");
            }
          });
        }
      } else {

        //it 的DOA审批， 设备、工程的OC/OM,DO,GM 、DOA审批 为同一个接口
        console.log("走这里了吗？");
        (0, _EpsRequest2.default)('/McdEpsApi/joywok/noproject/submitNonOrderInfo', {
          method: 'POST',
          body: JSON.stringify({
            param: {
              eid: userinfo.employee_id,
              record: {
                updateDate: self.props.approval.updateDate,
                orderNumber: self.props.approval.orderNumber,
                orderState: self.props.approval.orderState,
                approveFlg: approveFlg,
                operateMarks: memo
              }
            }
          })
        }).then(function (resp) {
          console.log(resp, "resp");
          // 把提交中按钮置为原样
          if (typeof callback == 'function') {
            callback(true);
          }
          if (resp.data.success) {
            (0, _EpsModal.AlertBase)({
              tip: '已成功提交',
              icon: 'icon-save-success',
              onOk: function onOk() {
                jw.closeWebView();
              }
            });
          } else {
            self.rejectMemo = memo;
            console.log("fail");
          }
        });
      }
    }
  }, {
    key: 'openLog',
    value: function openLog() {

      var url = EpsWebRoot + '/#/log/' + this.props.params['orderid'];
      var data = this.props.approval;

      var subProcess = data.subProcess;
      data['logType'] = { key: 'nonproject', subkey: subProcess };
      window.upTabsData('log', 'cache', data);
      jw.pushWebView(url);
    }

    // 组织采购内容 如果是非项目IT采购的 OC审批，内容为表单，其余的都为静态展示

  }, {
    key: 'combinePurchaseContent',
    value: function combinePurchaseContent() {
      console.log(this.props, "approval");
      var isoc = this.props.approval.isoc;

      if (this.props.params.objecttype == 'it' && isoc) {
        // 组织表单
        return this.combinePurchaseForm();
      } else {
        var Item = _list2.default.Item;
        var BusinessInfo = this.props.approval.BusinessInfo;
        console.log(BusinessInfo, "BusinessInfo");
        return _react2.default.createElement('div', { className: 'purchase-show' }, _react2.default.createElement(_list2.default, { className: 'my-list jw-list' }, _react2.default.createElement(Item, { extra: BusinessInfo.fixedAssets + " ¥", onClick: function onClick() {} }, '\u9884\u4F30\u56FA\u5B9A\u8D44\u4EA7\u6295\u8D44\u603B\u91D1\u989D'), _react2.default.createElement(Item, { extra: BusinessInfo.oldAssets + " ¥", onClick: function onClick() {} }, '\u9884\u8BA1\u65E7\u8D44\u4EA7\u62A5\u5E9F'), _react2.default.createElement(Item, { extra: BusinessInfo.inSales, onClick: function onClick() {} }, '\u662F\u5426\u589E\u52A0\u9500\u552E\u989D\uFF1F'), _react2.default.createElement(Item, { extra: BusinessInfo.toIncrease ? BusinessInfo.toIncrease + " ¥" : '', onClick: function onClick() {} }, '\u9884\u8BA1\u589E\u52A0\u9500\u552E\u989D'), _react2.default.createElement(Item, { extra: BusinessInfo.profitIncrease ? BusinessInfo.profitIncrease + " ¥" : '', onClick: function onClick() {} }, '\u9884\u8BA1\u589E\u52A0\u5E74\u5229\u6DA6\u989D'), _react2.default.createElement(Item, { extra: BusinessInfo.toBeROI ? BusinessInfo.toBeROI + ' %' : '', onClick: function onClick() {} }, '\u9884\u8BA1\u6295\u8D44\u56DE\u62A5\u7387(ROI%)')));
      }
    }

    // 组织审批表单

  }, {
    key: 'combinePurchaseForm',
    value: function combinePurchaseForm() {
      var _this3 = this;

      var self = this;
      var dispatch = this.props.dispatch;
      var data = this.props.approval;
      var fixedAssets = data.fixedAssets == null ? '0.00' : data.fixedAssets;
      var oldAssets = data.oldAssets == null ? '0.00' : data.oldAssets;
      var inSales = data.inSales == null ? ['0'] : data.inSales;
      var toIncrease = data.toIncrease == null ? '0.00' : data.toIncrease;
      var profitIncrease = data.profitIncrease == null ? '0.00' : data.profitIncrease;

      var ROI = data.toBeROI == null ? '0' : data.toBeROI;
      if (data.fixedAssets && data.profitIncrease) {
        ROI = (data.profitIncrease / data.fixedAssets * 100).toFixed(2);
      } else {
        ROI = '0';
      }
      console.log(fixedAssets, toIncrease, data, ROI, "ROI", data.fixedAssets ? data.fixedAssets : '0.00');
      this.state.formData = {
        schema: [{
          name: 'fixedAssets', element: 'Input',
          label: '预估固定资产投资总金额',
          defaultValue: fixedAssets,
          attr: {
            type: 'text',
            className: ''
          },
          events: {
            onBlur: function onBlur() {},
            onFocus: function onFocus(e) {
              console.log('onFocus');
            },
            onChange: function onChange(e) {
              console.log(e['0'], '投资总金额');
              var fixedAssets = e['0'];
              dispatch({
                type: 'approval/changeData',
                data: {
                  fixedAssets: fixedAssets
                }
              });
            },
            onClick: function onClick() {
              console.log('dsfsfsfsfdsfs:=========');
            }
          }
        }, {
          name: 'oldAssets', element: 'Input',
          label: '预计旧资产报废',
          defaultValue: oldAssets,
          attr: {
            type: 'text',
            className: ''
          },
          events: {
            onBlur: function onBlur() {},
            onFocus: function onFocus(e) {},
            onChange: function onChange(e) {
              dispatch({
                type: 'approval/changeData',
                data: {
                  oldAssets: window.replaceNnum(e['0'])
                }
              });
            }
          }
        }, {
          name: 'inSales', element: 'Radio', label: '是否增加销售额？',
          defaultValue: inSales,
          options: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
          attr: {
            className: ''
          },
          events: {
            onBlur: function onBlur() {},
            onFocus: function onFocus(e) {},
            onChange: function onChange(e) {
              console.log('onChange,是否增加销售额？:', e);
              // let formData = this.state.formData;

              if (e[0] == '1') {
                $('.toggle-filed').closest('.ant-form-item').show();
                // this.setState({});
              } else {
                $('.toggle-filed').closest('.ant-form-item').hide();
              }
              dispatch({
                type: 'approval/changeData',
                data: {
                  inSales: e['0']
                }
              });
            }
          }
        }, {
          name: 'toIncrease', element: 'Input',
          label: '预计增加销售额',
          defaultValue: toIncrease,
          attr: {
            type: 'text',
            className: 'toggle-filed'
          },
          events: {
            onBlur: function onBlur() {},
            onFocus: function onFocus(e) {},
            onChange: function onChange(e) {
              console.log('onChange', e);
              dispatch({
                type: 'approval/changeData',
                data: {
                  toIncrease: window.replaceNnum(e['0'])
                }
              });
            }
          }
        }, {
          name: 'profitIncrease', element: 'Input',
          label: '预计增加年利润额',
          defaultValue: profitIncrease,
          attr: {
            type: 'text',
            className: 'toggle-filed'
          },
          events: {
            onBlur: function onBlur() {},
            onFocus: function onFocus(e) {},
            onChange: function onChange(e) {
              console.log('onChange', e);
              dispatch({
                type: 'approval/changeData',
                data: {
                  profitIncrease: window.replaceNnum(e['0'])
                }
              });
            }
          }
        }, {
          name: 'toBeROI', element: 'Input', label: '预计投资回报率(ROI%)',
          defaultValue: ROI + ' %',
          attr: {
            className: 'toggle-filed',
            disabled: true
          },
          events: {
            onBlur: function onBlur() {},
            onFocus: function onFocus(e) {},
            onChange: function onChange(e) {}
          }
        }],
        buttons: false,
        changeData: this.changeData.bind(this)
      };
      console.log('this.state.formData:', this.state);
      return _react2.default.createElement('div', { className: 'purchase-form' }, _react2.default.createElement(_mobile2.default, { formData: this.state.formData, ref: 'itform', onChange: function onChange(values, schema) {
          return _this3.FormChange(values, schema);
        } }));
    }
  }, {
    key: 'FormChange',
    value: function FormChange(values, schema) {
      console.log("values:", values, "FormChange:", schema);
    }
  }, {
    key: 'changeData',
    value: function changeData(data) {}
  }, {
    key: 'callback',
    value: function callback(value) {
      var dispatch = this.props.dispatch;
      dispatch({
        type: 'approval/changeData',
        data: {
          loading1: false,
          loading2: false,
          avatar: value
        }
      });
    }
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
        var footer = $('.footer').height() || 0;
        var price = $('.np-total-price').height() || 0;
        $('.eps-nonproject-approval-c').css({ height: clientHeight - footer - price + 'px' });
      }, 0);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      NProgress.done();

      // this.setHeight()
      if (JWReady == true) {
        jw.setFuncBtns([{ type: 4 }]);
      } else {
        window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
          jw.setFuncBtns([{ type: 4 }]);
        });
      }
      var dispatch = this.props.dispatch;
      var self = this;
      if (isAndroid()) {
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(window).resize(function () {
          console.log('window resize');
          self.setHeight();
          setTimeout(function () {
            var clientHeightNow = document.documentElement.clientHeight || document.body.clientHeight;
            // alert(clientHeight+'------'+clientHeightNow);
            if (clientHeight > clientHeightNow) {
              $('.eps-nonproject-approval').stop().animate({ scrollTop: '100000px' });
            } else {}
          }, 100);
        });
      }
      var eid = userinfo.employee_id;
      var objecttype = this.props.params.objecttype;
      var type = this.props.location.query.type;
      var view = this.props.params.view;
      var orderid = this.props.params.orderid;
      var requestUrl = {
        'equipment': {
          '1': '/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
          '4': '/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
          '3': '/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
          '10': '/McdEpsApi/joywok/noproject/getEQSupplierInfo'
        },
        'it': {
          '1': '/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
          '4': '/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
          '3': '/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
          '10': '/McdEpsApi/joywok/noproject/getITSupplierInfo'
        },
        'project': {
          '1': '/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
          '4': '/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
          '3': '/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
          '10': '/McdEpsApi/joywok/noproject/getCOSupplierInfo'
          //打开群聊
        } };window.onJwNavBtnClick = function (data) {
        if (data['type'] == '4') {
          (0, _constants.openChart)(eid, orderid, '测试');
        }
      };
      if (view && view == 'view') {
        dispatch({
          type: 'approval/viewInfo',
          payload: {
            param: {
              eid: eid,
              condition: {
                orderNumber: self.props.params.orderid
              },
              pager: { pageNum: '1', pageSize: '10' }
            }
          },
          objecttype: objecttype,
          callback: self.callback
        });
      } else if (view && view == 'vieworder') {
        dispatch({
          type: 'approval/viewOrderInfo',
          payload: {
            param: {
              eid: eid,
              condition: {
                orderNumber: self.props.params.orderid
              },
              pager: { pageNum: '1', pageSize: '10' }
            }
          },
          objecttype: objecttype,
          callback: self.callback
        });
      } else {
        //正常流程中的页面展示
        //获取供应商设备报价列表 
        (0, _EpsRequest2.default)(requestUrl[objecttype][type], {
          method: 'POST',
          body: JSON.stringify({
            param: {
              eid: eid,
              condition: {
                orderNumber: self.props.params.orderid
              },
              pager: { pageNum: '1', pageSize: '10' }
            }
          })
        }).then(function (resp) {
          if (resp['data']['success'] == false) {} else {
            var venderList = void 0;
            var data = resp['data']['body'];
            console.log(data, "data:project");
            var partList = [],
                deviceList = [];
            var list = data['pageInfo']['list'];
            if (objecttype == 'project') {
              if (data['purchasingReason'] == '2') {
                _.each(list, function (i) {
                  partList.push(i);
                });
              }
            } else if (objecttype == 'it') {
              _.each(list, function (i) {
                if (i["tsiType"] == true && data['purchasingReason'] == '2') {
                  partList.push(i);
                }
              });
            } else {
              _.each(list, function (i) {
                if ((i["type"] == 'supplier' || i['type'] == 'all') && data['purchasingReason'] == '2') {
                  partList.push(i);
                }
              });
            }
            // _.each(data['pageInfo']['list'],function(i){
            //   partList.push(i)
            // })
            console.log(partList, '12312312312');
            dispatch({
              type: 'approval/changeData',
              data: _.extend({
                vendorList: data.pageInfo.list,
                loading1: false,
                partList: partList,
                deviceList: deviceList,
                storeScrapList: data['scrapPageInfo']['list']
              }, resp['data']['body'])
            });
          }
        });
        // 获取 非项目 订单详情（BusinessInfo信息）
        var OrderInfoUrl = '';
        if (type == '1' || type == '4' || type == '3') {
          //type:1 Doa审批 4:餐厅评价
          OrderInfoUrl = '/McdEpsApi/joywok/noproject/getDOAOrderInfo';
        } else if (type == '10') {
          //type:10  OC ,OM ,DO ,GM
          OrderInfoUrl = '/McdEpsApi/joywok/noproject/getOrderInfo';
        }
        (0, _EpsRequest2.default)(OrderInfoUrl, {
          method: 'POST',
          body: JSON.stringify({
            param: {
              eid: eid,
              condition: {
                orderNumber: self.props.params.orderid
              }
            }
          })
        }).then(function (resp) {
          if (resp['data']['success'] == false) {} else {
            var data = resp['data']['body'];
            var BusinessInfo = {};
            var creatorinfo = {};
            creatorinfo.eid = data.createBy;
            creatorinfo.createName = data.storeMan;
            creatorinfo.isoc = data.isoc;
            creatorinfo.storeNumber = data.storeNumber;
            creatorinfo.storeName = data.storeName;
            var isoc = data.isoc ? data.isoc : false;

            //判断是否IT的oc审批，IT的oc审批无返回BusinessInfo，需要填写表单数据（BusinessInfo信息）
            if (objecttype == 'it' && isoc) {
              dispatch({
                type: 'approval/changeData',
                data: _.extend({
                  creatorinfo: creatorinfo
                }, resp['data']['body'])
              });
            } else {
              console.log(data.LumpSumPrice, 'data.LumpSumPrice');
              BusinessInfo.LumpSumPrice = data.LumpSumPrice.toFixed(2);
              BusinessInfo.fixedAssets = data.fixedAssets ? data.fixedAssets.toFixed(2) : '0.00';
              BusinessInfo.oldAssets = data.oldAssets ? data.oldAssets.toFixed(2) : '0.00';
              BusinessInfo.inSales = data.inSales == '1' ? '是' : '否';
              BusinessInfo.toIncrease = data.toIncrease ? data.toIncrease.toFixed(2) : '0.00';
              BusinessInfo.profitIncrease = data.profitIncrease ? data.profitIncrease.toFixed(2) : '0.00';
              BusinessInfo.toBeROI = data.toBeROI ? data.toBeROI : '0';
              dispatch({
                type: 'approval/changeData',
                data: _.extend({
                  BusinessInfo: BusinessInfo,
                  creatorinfo: creatorinfo
                }, resp['data']['body'])
              });
            }
            //获取创建人的头像信息
            if (data['createBy']) {
              (0, _constants.getUsers)(data['createBy'], 'num', function (resp) {
                var userdata = resp['data'][0];
                dispatch({
                  type: 'approval/changeData',
                  data: {
                    avatar: userdata['avatar'],
                    loading2: false
                  }
                });
              });
            }
          }
        });

        //获取评价项：新增IT订单的评价项
        if (type == '4' && (objecttype == 'equipment' || objecttype == 'project' || objecttype == 'it')) {
          (0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getEvaluate', {
            method: 'POST',
            body: JSON.stringify({
              param: {
                eid: eid,
                condition: {
                  orderNumber: self.props.params.orderid
                }
              }
            })
          }).then(function (resp) {
            window.NoProjectEvaluate = resp['data']['body'];
          });
        }
      }

      PubSub.subscribe('add:scrapped', function (evt, data) {
        dispatch({ type: 'approval/changeData', data: {
            storeScrapList: _.map(data, function (i) {
              return i;
            })
          } });
      });
    }
  }, {
    key: 'footerRender',
    value: function footerRender(data) {
      var _this4 = this;

      var objecttype = this.props.params.objecttype;
      var rejectText = '拒绝';
      var subProcess = this.props.approval.subProcess;
      if (isUnfinishedOrHistory()) {
        console.log('Marlin', subProcess, data, _constants.orderStatus["nonproject"]);
        var strOrderSta = data['orderState'] && _constants.orderStatus["nonproject"][subProcess][data['orderState']] ? _constants.orderStatus["nonproject"][subProcess][data['orderState']] : { 'label': '' };
        return _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
            return _this4.openLog();
          } }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, '\u6D41\u7A0B\u65E5\u5FD7')), _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
            return _this4.openProcessTable();
          } }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"]))), ';');
      } else {
        console.log(objecttype, this.props.approval.orderState, "确认拒绝且关单");
        if (this.props.approval.orderState == '1') {
          rejectText = "拒绝且关单";
        } else {
          rejectText = "拒绝";
        }
        return _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
            return _this4.openLog();
          } }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, '\u6D41\u7A0B\u65E5\u5FD7')), _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
            return _this4.reject(e);
          } }, rejectText), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
            return _this4.agree(e);
          } }, '\u786E\u8BA4')));
      }
    }
  }, {
    key: 'openProcessTable',
    value: function openProcessTable() {
      var data = this.props.approval;
      var subProcess = data.subProcess;
      data['logType'] = { key: 'nonproject', subkey: subProcess };
      window.upTabsData('log', 'cache', data);
      var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
      console.log(url, "url");
      jw.pushWebView(url);
    }
  }, {
    key: 'openWebView',
    value: function openWebView(objecttype, type) {
      var orderid = this.props.approval.orderNumber;
      var url = '';
      console.log(this.props.approval.view, "view");
      if (this.props.approval.view == 'vieworder') {
        url = EpsWebRoot + '/#/nonproject/vendor-info/' + orderid + '/' + objecttype + '/4';
      } else if (this.props.approval.view == 'view') {
        console.log('zoule11111?');
        url = EpsWebRoot + '/#/nonproject/vendor-info/' + orderid + '/' + objecttype + '/10';
      } else {
        url = EpsWebRoot + '/#/nonproject/vendor-info/' + orderid + '/' + objecttype + '/' + type;
      }
      console.log(url, "url");
      jw.pushWebView(url);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var data = this.props.approval;
      var objecttype = this.props.params.objecttype;
      var type = this.props.location.query.type;
      var LumpSumPrice = void 0;
      var showFlag = 'show';
      // 组织显示内容
      if (data.loading1 || data.loading2) {
        return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, '\u52A0\u8F7D\u4E2D'));
      } else {
        console.log(data.BusinessInfo, "data.BusinessInfo.LumpSumPrice");
        if (objecttype == 'it') {
          console.log("当前订单是IT订单吗?");
          LumpSumPrice = data.LumpSumPrice.toFixed(2);
          if (data.LumpSumPrice < 100000) {
            console.log("当前订单是小于10万吗?");
            showFlag = 'hide';
          } else {
            showFlag = 'show';
          }
        } else {
          LumpSumPrice = data.BusinessInfo.LumpSumPrice;
          console.log(LumpSumPrice, "LumpSumPrice");
        }

        var purchaseContent = this.combinePurchaseContent();

        var showScrapTip = 0;
        var list = data['pageInfo']['list'];
        if (data['objecttype'] == 'project') {
          if (data['purchasingReason'] == '2') {
            showScrapTip = 1;
          }
        } else if (data['objecttype'] == 'it') {
          _.each(list, function (i) {
            if (i["tsiType"] == true && data['purchasingReason'] == '2') {
              showScrapTip = showScrapTip + 1;
            }
          });
        } else {
          _.each(list, function (i) {
            if ((i["type"] == 'supplier' || i['type'] == 'all') && data['purchasingReason'] == '2') {
              showScrapTip = showScrapTip + 1;
            }
          });
        }
        this.showScrapTip = showScrapTip;
        console.log('组织审批表单', data, data["objecttype"], showScrapTip);
        return _react2.default.createElement('div', { className: 'eps-nonproject-approval' }, _react2.default.createElement('div', { className: 'eps-nonproject-approval-c' }, _react2.default.createElement('header', { className: 'header ', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_HeaderCard2.default, { creatorinfo: _.extend({}, this.props.approval.creatorinfo, {
            avatar: this.props.approval['avatar']['avatar_l'],
            fileCount: this.props.approval['fileCount'] || 0,
            uploadPhaseName: this.props.approval['uploadPhaseName'] || '',
            scrapPageInfo: data['storeScrapList'],
            partList: data['partList'],
            deviceList: data['deviceList'],
            storeNumber: data['storeNumber'],
            scrappType: 'noproject',
            scrappOrderType: this.props.approval['objecttype'],
            showScrapTip: showScrapTip,
            addScrap: window.isUnfinishedOrHistory() == false && (this.props.location.query.type == '1' || this.props.location.query.type == '4') ? true : false
          }) }))), _react2.default.createElement('div', { className: 'eps-np-approval-body' }, _react2.default.createElement('div', { className: 'eps-box-wrap' }, _react2.default.createElement('div', { className: 'eps-box' }, _react2.default.createElement(_TableList2.default, { list: data.vendorList, data: data, objecttype: objecttype, type: type }))), _react2.default.createElement('div', { className: 'eps-box-wrap eps-box-item' }, _react2.default.createElement('i', { className: "eps-list-card-bgicon " + showFlag }), _react2.default.createElement('div', { className: "eps-box " + showFlag }, _react2.default.createElement('div', { className: 'purchase-box-title' }, _react2.default.createElement('font', null, 'Business Case')), purchaseContent)))), _react2.default.createElement('div', { className: 'np-total-price', onClick: function onClick() {
            return self.openWebView(objecttype, type);
          } }, _react2.default.createElement('div', { className: 'np-total-price-c' }, _react2.default.createElement('label', null, '\u603B\u4EF7(\u542B\u7A0E)'), _react2.default.createElement('span', null, _react2.default.createElement('i', { className: 'icon-sprice' }), _react2.default.createElement('font', null, self.turnMoney(LumpSumPrice)))), _react2.default.createElement('div', { className: 'money-show-other-tip' }, _react2.default.createElement('i', { className: 'icon-money-tips' }), _react2.default.createElement('div', { className: 'money-show-other-tip-v' }, '\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002'))), self.footerRender(data));
      }
    }
  }]);

  return Approval;
}(_react.Component);

function mapStateToProps(state) {
  console.log('state:11111', state);
  var type = state.routing.locationBeforeTransitions.query.type;
  var orderState = state.approval.orderState;
  if (type == '4') {
    jw.setTitle({ title: '餐厅确认' });
  } else if (type == '10') {
    jw.setTitle({ title: '审批' });
  } else if (type == '1') {
    if (orderState == '4') {
      jw.setTitle({ title: 'IT FUNC确认' });
    } else if (orderState == '5') {
      jw.setTitle({ title: 'IT DEPT确认' });
    } else {
      jw.setTitle({ title: 'DOA审批' });
    }
  } else if (type == '3') {
    jw.setTitle({ title: '调整后审批' });
  }
  return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Approval);

/***/ }),

/***/ 1894:
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

var _NonProjectOnWayInfo = __webpack_require__(1979);

var NonProjectOnWayService = _interopRequireWildcard(_NonProjectOnWayInfo);

var _constants = __webpack_require__(197);

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
	namespace: 'approval',
	state: {
		loading: {
			loading: true,
			fix: true,
			hide: false
		},
		loading1: true,
		loading2: true,
		form: {},
		epsDialog: {
			title: '请输入备注',
			buttonIconClass: 'icon-check-i',
			buttonVal: '确认',
			fix: true,
			show: false
		},
		epsTip: {
			show: true
		}
	},
	reducers: {
		changeData: function changeData(state, action) {
			console.log('changeData:', action);
			return _extends({}, state, action.data);
		}
	},
	effects: {
		viewInfo: /*#__PURE__*/regeneratorRuntime.mark(function viewInfo(_ref, _ref2) {
			var payload = _ref.payload,
			    objecttype = _ref.objecttype,
			    callback = _ref.callback;
			var call = _ref2.call,
			    put = _ref2.put;
			var requestUrl1, requestUrl2, data1, data2, Data, BusinessInfo, creatorinfo, isoc, avatar;
			return regeneratorRuntime.wrap(function viewInfo$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							requestUrl1 = '';
							requestUrl2 = '/McdEpsApi/joywok/noproject/getOrderInfo';
							_context.t0 = objecttype;
							_context.next = _context.t0 === 'equipment' ? 5 : _context.t0 === 'project' ? 7 : _context.t0 === 'it' ? 9 : 11;
							break;

						case 5:
							requestUrl1 = '/McdEpsApi/joywok/noproject/getEQSupplierInfo';
							return _context.abrupt('break', 11);

						case 7:
							requestUrl1 = '/McdEpsApi/joywok/noproject/getCOSupplierInfo';
							return _context.abrupt('break', 11);

						case 9:
							requestUrl1 = '/McdEpsApi/joywok/noproject/getITSupplierInfo';
							return _context.abrupt('break', 11);

						case 11:
							;
							_context.next = 14;
							return call(NonProjectOnWayService.getDeviceList, { requestUrl1: requestUrl1, payload: payload });

						case 14:
							data1 = _context.sent;

							if (!data1.data.body.pageInfo) {
								_context.next = 18;
								break;
							}

							_context.next = 18;
							return put({
								type: 'changeData',
								data: _.extend({
									vendorList: data1.data.body.pageInfo.list
								}, data1.data.body)
							});

						case 18:
							_context.next = 20;
							return call(NonProjectOnWayService.getDOAOrderInfo, { requestUrl2: requestUrl2, payload: payload });

						case 20:
							data2 = _context.sent;
							Data = data2['data']['body'];
							BusinessInfo = {};
							creatorinfo = {};

							creatorinfo.eid = Data.createBy;
							creatorinfo.createName = Data.storeMan;
							creatorinfo.isoc = Data.isoc;
							creatorinfo.storeNumber = Data.storeNumber;
							creatorinfo.storeName = Data.storeName;
							isoc = Data.isoc ? Data.isoc : false;
							avatar = void 0;
							//判断是否IT的oc审批，IT的oc审批无返回BusinessInfo，需要填写表单数据（BusinessInfo信息）

							if (!(objecttype == 'it' && isoc)) {
								_context.next = 37;
								break;
							}

							_context.next = 34;
							return put({
								type: 'changeData',
								data: _.extend({
									creatorinfo: creatorinfo,
									view: 'view'
								}, Data)
							});

						case 34:
							if (Data['createBy']) {
								(0, _constants.getUsers)(Data['createBy'], 'num', function (resp) {
									var userdata = resp['data'][0];
									console.log(userdata, "userdata");
									avatar = userdata['avatar'];
									callback(avatar);
								});
							}

							_context.next = 48;
							break;

						case 37:
							console.log(Data, 'Data.LumpSumPrice');

							//获取创建人的头像信息

							BusinessInfo.LumpSumPrice = Data.LumpSumPrice.toFixed(2);
							BusinessInfo.fixedAssets = Data.fixedAssets ? Data.fixedAssets.toFixed(2) : '0.00';
							BusinessInfo.oldAssets = Data.oldAssets ? Data.oldAssets.toFixed(2) : '0.00';
							BusinessInfo.inSales = Data.inSales == '1' ? '是' : '否';
							BusinessInfo.toIncrease = Data.toIncrease ? Data.toIncrease.toFixed(2) : '0.00';
							BusinessInfo.profitIncrease = Data.profitIncrease ? Data.profitIncrease.toFixed(2) : '0.00';
							BusinessInfo.toBeROI = Data.toBeROI ? Data.toBeROI : '0';
							if (Data['createBy']) {
								(0, _constants.getUsers)(Data['createBy'], 'num', function (resp) {
									var userdata = resp['data'][0];
									console.log(userdata, "userdata");
									avatar = userdata['avatar'];
									callback(avatar);
								});
							}
							_context.next = 48;
							return put({
								type: 'changeData',
								data: _.extend({
									BusinessInfo: BusinessInfo,
									creatorinfo: creatorinfo,
									view: 'view'
								}, Data)
							});

						case 48:
						case 'end':
							return _context.stop();
					}
				}
			}, viewInfo, this);
		}),
		viewOrderInfo: /*#__PURE__*/regeneratorRuntime.mark(function viewOrderInfo(_ref3, _ref4) {
			var payload = _ref3.payload,
			    objecttype = _ref3.objecttype,
			    callback = _ref3.callback;
			var call = _ref4.call,
			    put = _ref4.put;
			var requestUrl1, requestUrl2, data1, data2, Data, BusinessInfo, creatorinfo, isoc, avatar;
			return regeneratorRuntime.wrap(function viewOrderInfo$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							console.log(111111, "payload", objecttype);
							requestUrl1 = '';
							requestUrl2 = '';

							requestUrl2 = '/McdEpsApi/joywok/noproject/getDOAOrderInfo';
							_context2.t0 = objecttype;
							_context2.next = _context2.t0 === 'equipment' ? 7 : _context2.t0 === 'project' ? 9 : _context2.t0 === 'it' ? 11 : 13;
							break;

						case 7:
							requestUrl1 = '/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo';
							return _context2.abrupt('break', 13);

						case 9:
							requestUrl1 = '/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo';
							return _context2.abrupt('break', 13);

						case 11:
							requestUrl1 = '/McdEpsApi/joywok/noproject/getITSupplierDOAInfo';
							return _context2.abrupt('break', 13);

						case 13:
							;
							_context2.next = 16;
							return call(NonProjectOnWayService.getDeviceList, { requestUrl1: requestUrl1, payload: payload });

						case 16:
							data1 = _context2.sent;

							if (!data1.data.body.pageInfo) {
								_context2.next = 20;
								break;
							}

							_context2.next = 20;
							return put({
								type: 'changeData',
								data: _.extend({
									vendorList: data1.data.body.pageInfo.list,
									storeScrapList: data1.data.body['scrapPageInfo']['list']
								}, data1.data.body)
							});

						case 20:
							_context2.next = 22;
							return call(NonProjectOnWayService.getDOAOrderInfo, { requestUrl2: requestUrl2, payload: payload });

						case 22:
							data2 = _context2.sent;
							Data = data2['data']['body'];
							BusinessInfo = {};
							creatorinfo = {};

							creatorinfo.eid = Data.createBy;
							creatorinfo.createName = Data.storeMan;
							creatorinfo.isoc = Data.isoc;
							creatorinfo.storeNumber = Data.storeNumber;
							creatorinfo.storeName = Data.storeName;
							isoc = Data.isoc ? Data.isoc : false;
							avatar = void 0;
							//判断是否IT的oc审批，IT的oc审批无返回BusinessInfo，需要填写表单数据（BusinessInfo信息）

							if (!(objecttype == 'it' && isoc)) {
								_context2.next = 37;
								break;
							}

							//获取创建人的头像信息
							if (Data['createBy']) {
								(0, _constants.getUsers)(Data['createBy'], 'num', function (resp) {
									var userdata = resp['data'][0];
									console.log(userdata, "userdata");
									avatar = userdata['avatar'];
									callback(avatar);
								});
							}
							_context2.next = 48;
							break;

						case 37:
							console.log(Data, 'Data.LumpSumPrice');
							//获取创建人的头像信息

							BusinessInfo.LumpSumPrice = Data.LumpSumPrice.toFixed(2);
							BusinessInfo.fixedAssets = Data.fixedAssets ? Data.fixedAssets.toFixed(2) : '0.00';
							BusinessInfo.oldAssets = Data.oldAssets ? Data.oldAssets.toFixed(2) : '0.00';
							BusinessInfo.inSales = Data.inSales == '1' ? '是' : '否';
							BusinessInfo.toIncrease = Data.toIncrease ? Data.toIncrease.toFixed(2) : '0.00';
							BusinessInfo.profitIncrease = Data.profitIncrease ? Data.profitIncrease.toFixed(2) : '0.00';
							BusinessInfo.toBeROI = Data.toBeROI ? Data.toBeROI : '0';
							if (Data['createBy']) {
								(0, _constants.getUsers)(Data['createBy'], 'num', function (resp) {
									var userdata = resp['data'][0];
									console.log(userdata, "userdata");
									avatar = userdata['avatar'];
									callback(avatar);
								});
							}
							_context2.next = 48;
							return put({
								type: 'changeData',
								data: _.extend({
									BusinessInfo: BusinessInfo,
									creatorinfo: creatorinfo,
									view: 'vieworder'
									// storeScrapList:Data['scrapPageInfo']['list']
								}, Data)
							});

						case 48:
						case 'end':
							return _context2.stop();
					}
				}
			}, viewOrderInfo, this);
		})
	},
	subscriptions: {}
};

/***/ }),

/***/ 1979:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceList = getDeviceList;
exports.getDOAOrderInfo = getDOAOrderInfo;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//获取设备订单详情


//获取供应商设备报价列表
function getDeviceList(parame) {
  return (0, _EpsRequest2.default)(parame.requestUrl1, {
    method: 'POST',
    body: JSON.stringify(parame.payload)
  });
}

function getDOAOrderInfo(parame) {
  console.log(parame, "parame");
  return (0, _EpsRequest2.default)(parame.requestUrl2, {
    method: 'POST',
    body: JSON.stringify(parame.payload)
  });
}

/***/ })

});