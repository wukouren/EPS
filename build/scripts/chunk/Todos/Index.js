webpackJsonp([14],{

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

/***/ 1856:
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
   * 单条待办卡片
   * type=1,2,3,4,5,6,7
   * 分别对应 全部，维修，非项目，新店日常，保养，项目，新店GC
   * 2017/12/1 在途订单增加当前处理人，影响如下：
   * 由于在途和历史是一个订单，所以在途和历史需将在途和历史中的todoCol10改为当前处理人，其他字段依次＋1；
   * 待办列表接口不变，所以待办列表中todoCol10还是原来的含义
   * 
   */

var statusRoutes = {};
var detailRoutes = {};

var TodoItemView = function (_Component) {
	_inherits(TodoItemView, _Component);

	function TodoItemView() {
		_classCallCheck(this, TodoItemView);

		return _possibleConstructorReturn(this, (TodoItemView.__proto__ || Object.getPrototypeOf(TodoItemView)).apply(this, arguments));
	}

	_createClass(TodoItemView, [{
		key: 'formatOrderTime',
		value: function formatOrderTime(str) {
			if (!str || str.length != 19) return str;
			return str.substring(0, 16);
		}
		// 获取 设备、工程、IT icon

	}, {
		key: 'getICON',
		value: function getICON(subProcess) {
			var icon = 'icon-device-icon';
			switch (subProcess) {
				case '12': // 工程维修
				case '24': // 工程年度保养计划
				case '25': // 工程月度保养计划
				case '26': // 工程保养订单
				case '33': // 非项目工程采购
				case '35': // 非项目工程采购需求
				case '41': // 项目采购需求
				case '42': // 项目型供应商采购订单
				case '43': // 项目型采购订单
				// case '43-1': // 项目型采购订单 设备
				case '43-2': // 项目型采购订单 工程
				case '51':
					// 新店/改造设备/工程订单
					icon = 'icon-project-icon';
					break;
				case '13': // IT设备维修
				case '34': // 非项目IT采购
				case '36': // 非项目IT采购需求
				case '43-3': // 项目型采购订单 IT
				case '53': // 新店/改造IT采购需求
				case '53': // 新店/改造IT采购需求
				case '55':
					// 新店/改造IT采购需求
					// case '56': // 新店/改造IT采购订单  此号码于20171024日废弃
					icon = 'icon-it-icon';
					break;
				case '61':
					// 新店/改造GC采购
					icon = 'icon-gc-icon';
					break;
			}
			return icon;
		}
		// 维修卡片

	}, {
		key: 'combineRepairCard',
		value: function combineRepairCard(data) {
			var _this2 = this;

			// console.log('this.props.todos',this.props.todos)
			var status = this.props.todos.status,
			    vendorName = '',
			    storeName = '',
			    vendorNumber = '',
			    storeNumber = '',
			    operateClassName = status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			/*if(this.props.todos.status=='1'){
   	// console.log(data,"data")
     if(data.todoCol2=='12'){
     	if(data.todoCol6=='6'){
     		operateClassName="icon-mobile-noOperate";
     	}else if(data.todoCol6=='3'){
     		operateClassName="icon-mobile-noOperate";
     	}
     }else{
     	operateClassName="";
     }
   }else{
   	if(data.todoCol8=='1'){
   		operateClassName="";
   	}else{
   		operateClassName="icon-mobile-noOperate";
   	}
   }
   console.log('status',status,data);
   */
			var currentOperator = void 0;
			var infoWrapClass = status == '1' ? 'todos-item-info info-label-large' : 'todos-item-info';
			if (status == '1' || status == '2') {
				storeNumber = data.todoCol12;
				storeName = data.todoCol13;
				vendorName = data.todoCol11;
				if (status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				storeNumber = data.todoCol10;
				storeName = data.todoCol11;
				vendorName = data.todoCol9;
			}
			return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
					return _this2.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeName)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u7EF4\u4FEE\u5546"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, vendorName)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}

		/**
   * 非项目卡片
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:非项目-设备
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:餐厅编号
   * todoCol10:餐厅名称
   * todoCol11:总价
   * todoCol12:冗余字段
   * 在途 - 非项目
   * 在途 - 非项目设备
   	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:非项目-设备
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否允许操作
  	todoCol9:餐厅编号
  	todoCol11:餐厅名称
  	todoCol12:总价
   * 在途 - 非项目工程
    todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:非项目-工程
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否允许操作
  	todoCol9:餐厅编号
  	todoCol11:餐厅名称
  	todoCol12:总价
   * 在途 - 非项目IT
    todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:非项目-IT
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否允许操作
  	todoCol9:餐厅编号
  	todoCol11:餐厅名称
  	todoCol12:总价
   */

	}, {
		key: 'combineNonProjectCard',
		value: function combineNonProjectCard(data) {
			var _this3 = this;

			var status = this.props.todos.status;
			var storeNumber = '',
			    storeName = '',
			    allMoney = '',
			    orderNumber = '',
			    operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			var currentOperator = void 0;
			var infoWrapClass = status == '1' ? 'todos-item-info info-label-large' : 'todos-item-info';
			if (this.props.todos.status == '1' || this.props.todos.status == '2') {
				storeNumber = data.todoCol11;
				storeName = data.todoCol12;
				allMoney = data.todoCol13;
				if (this.props.todos.status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				storeNumber = data.todoCol9;
				storeName = data.todoCol10;
				allMoney = data.todoCol11;
			}
			return _react2.default.createElement('div', { className: 'todos-item todos-nonproject-item animated zoomIn', onClick: function onClick(e) {
					return _this3.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeName)), currentOperator), _react2.default.createElement('div', { className: 'todos-nonproject-table' })), _react2.default.createElement('div', { className: 'todos-item-btn' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}
		//保养卡片
		/**
   * 保养-设备（年度计划）
  	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:保养-设备（年度计划）
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否可操作标识
  	todoCol9:保养计划名称
  	todoCol10:保养年度
  	todoCol11:保养备注
  	todoCol12:冗余字段
   * 保养-设备（月度计划）
   	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:保养-设备（月度计划）
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否可操作标识
  	todoCol9:保养类型
  	todoCol10:保养计划名称
  	todoCol11:保养月
  	todoCol12:保养备注
   * 保养-设备（订单）
   	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:保养-设备（订单）
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否可操作标识
  	todoCol9:餐厅编号
  	todoCol10:餐厅名称
  	todoCol11:保养备注
  	todoCol12:冗余字段
   */
		/**
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:保养-设备（年度计划）
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:保养计划名称
   * todoCol10:保养年度
   * todoCol11:保养备注
   * todoCol12:冗余字段
    */

	}, {
		key: 'combineMaintenanceCard',
		value: function combineMaintenanceCard(data) {
			var _this4 = this;

			var status = this.props.todos.status,
			    operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			var currentOperator = void 0;
			var infoWrapClass = status == '1' ? "todos-item-info maintenance info-label-large" : "todos-item-info maintenance";
			switch (data.todoCol2) {
				case '21':
					var maintenanceName1 = '';
					var maintenanceYear1 = '';
					var maintenanceTip1 = '';
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceName1 = data.todoCol11;
						maintenanceYear1 = data.todoCol12;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
						// maintenanceTip1=data.todoCol10;
					} else {
						maintenanceName1 = data.todoCol9;
						maintenanceYear1 = data.todoCol10;
						// maintenanceTip1=data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, maintenanceName1)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u5E74\u5EA6"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceYear1)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '22':
					var maintenanceType2 = void 0;
					var maintenanceName2 = void 0;
					var maintenanceMonth2 = void 0;
					var maintenanceTip2 = void 0;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceType2 = data.todoCol11;
						maintenanceName2 = data.todoCol12;
						maintenanceMonth2 = data.todoCol13;
						// maintenanceTip2=data.todoCol12;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						maintenanceType2 = data.todoCol9;
						maintenanceName2 = data.todoCol10;
						maintenanceMonth2 = data.todoCol11;
						// maintenanceTip2=data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, maintenanceName2)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u6708\u4EFD"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceMonth2)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '23':
					var storeName3 = void 0;
					var storeNumber3 = void 0;
					var maintenanceTip3 = void 0;
					// console.log("23",data)
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						storeNumber3 = data.todoCol11;
						storeName3 = data.todoCol12;
						maintenanceTip3 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						storeNumber3 = data.todoCol9;
						storeName3 = data.todoCol10;
						maintenanceTip3 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber3)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName3)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '24':
					var maintenanceName4 = '';
					var maintenanceYear4 = '';
					var maintenanceTip4 = '';
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceName4 = data.todoCol11;
						maintenanceYear4 = data.todoCol12;
						maintenanceTip4 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						maintenanceName4 = data.todoCol9;
						maintenanceYear4 = data.todoCol10;
						maintenanceTip4 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, maintenanceName4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u5E74\u5EA6"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceYear4)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '25':
					var maintenanceType5 = '';
					var maintenanceName5 = '';
					var maintenanceMonth5 = '';
					var maintenanceTip5 = '';
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceType5 = data.todoCol11;
						maintenanceName5 = data.todoCol12;
						maintenanceMonth5 = data.todoCol13;
						maintenanceTip5 = data.todoCol14;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						maintenanceType5 = data.todoCol8;
						maintenanceName5 = data.todoCol10;
						maintenanceMonth5 = data.todoCol11;
						maintenanceTip5 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceName5)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u6708\u4EFD"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceMonth5)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '26':
					var storeName6 = void 0;
					var storeNumber6 = void 0;
					var maintenanceTip6 = void 0;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						storeNumber6 = data.todoCol11;
						storeName6 = data.todoCol12;
						maintenanceTip6 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						storeNumber6 = data.todoCol9;
						storeName6 = data.todoCol10;
						maintenanceTip6 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber6)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName6)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
			}
		}
	}, {
		key: 'AllowOnMobile',
		value: function AllowOnMobile(Col8) {
			return Col8 && Col8 == 1 ? '' : 'icon-mobile-noOperate';
		}
		/**
   * 项目卡片 LocalPM
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:项目名称
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:需求编号
   * todoCol10:冗余字段
   * todoCol11:冗余字段
   * todoCol12:冗余字段
   *
   * 项目卡片 餐厅-确认、DOA-餐厅确认后审批（职能）
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:项目-设备
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:项目名称
   * todoCol10:餐厅编号
   * todoCol11:餐厅名称
   * todoCol12:冗余字段
   */

	}, {
		key: 'combineProjectCard',
		value: function combineProjectCard(data) {
			var _this5 = this;

			console.log('22ddddd', data);
			var // operateClassName = this.props.todos.status=='0'?this.AllowOnMobile( data.todoCol8 ):'',
			operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			var currentOperator = void 0;
			var infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";
			// if(this.props.todos.status=='1') operateClassName = '';
			switch (data.todoCol2) {
				case '41':
					var num = data.todoCol9;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						num = data.todoCol11;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this5.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, "\u9879\u76EE\u91C7\u8D2D\u9700\u6C42"), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9700\u6C42\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, num)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol5)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '42':
					var projectName = data.todoCol9;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						projectName = data.todoCol11;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn' }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, projectName)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '43':
				case '43-1':
				case '43-2':
				case '43-3':
					var projectName3 = data.todoCol9,
					    storeNum3 = data.todoCol10,
					    storeName3 = data.todoCol11;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						projectName3 = data.todoCol11, storeNum3 = data.todoCol12, storeName3 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this5.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, projectName3)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeNum3)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName3)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
			}
		}
		/**
   * 新店/改造 零星采购 卡片
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:新店日常-设备
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:餐厅编号
   * todoCol10:餐厅名称
   * todoCol11:备注
   * todoCol12:冗余字段
   */

	}, {
		key: 'combineReimageCard',
		value: function combineReimageCard(data) {
			var _this6 = this;

			console.log('combineReimageCard', data, '---', this.props.todos.status);
			var operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '',
			    storeNum = '',
			    storeName = '',
			    memo = '';
			var currentOperator = void 0;
			var infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";
			if (this.props.todos.status == '1' || this.props.todos.status == '2') {
				if (data.todoCol2 == '54' || data.todoCol2 == '55') {
					storeNum = data.todoCol12;
					storeName = data.todoCol13;
					memo = '';
				} else {
					storeNum = data.todoCol11;
					storeName = data.todoCol12;
					memo = data.todoCol13;
				}

				// storeNum = data.todoCol8;
				// storeName = data.todoCol9;
				// memo = data.todoCol10;
				if (this.props.todos.status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				if (data.todoCol2 == '54' || data.todoCol2 == '55') {
					storeNum = data.todoCol10;
					storeName = data.todoCol11;
					memo = '';
				} else {
					storeNum = data.todoCol9;
					storeName = data.todoCol10;
					memo = data.todoCol11;
				}

				// storeNum = data.todoCol9;
				// storeName = data.todoCol10;
				// memo = data.todoCol11;
			}
			return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
					return _this6.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNum)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}
		/**
   * 新店GC
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:新店GC
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:餐厅编号
   * todoCol10:餐厅名称
   * todoCol11:备注
   * todoCol12:冗余字段
   */

	}, {
		key: 'combineNewstoregcCard',
		value: function combineNewstoregcCard(data) {
			var _this7 = this;

			// console.log('combineNewstoregcCard', data);
			var operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '',
			    storeNum = '',
			    storeName = '',
			    memo = '';
			var currentOperator = void 0;
			var infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";

			if (this.props.todos.status == '1' || this.props.todos.status == '2') {
				storeNum = data.todoCol11;
				storeName = data.todoCol12;
				memo = data.todoCol13;
				if (this.props.todos.status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				storeNum = data.todoCol9;
				storeName = data.todoCol10;
				memo = data.todoCol11;
			}
			return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
					return _this7.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNum)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5907\u6CE8"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, memo)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}
	}, {
		key: 'render',
		value: function render() {
			switch (this.props.businessType) {
				// 维修卡片
				case 10:
					return this.combineRepairCard(this.props.itemData);
					break;
				// 非项目卡片 
				case 30:
					return this.combineNonProjectCard(this.props.itemData);
					break;
				case 20:
					//保养卡片
					return this.combineMaintenanceCard(this.props.itemData);
					break;
				case 40:
					// 项目卡片
					return this.combineProjectCard(this.props.itemData);
					break;
				case 50:
					// 新店/改造 零星采购
					return this.combineReimageCard(this.props.itemData);
					break;
				case 60:
					// 新店/改造 零星采购
					return this.combineNewstoregcCard(this.props.itemData);
					break;
				default:
					return _react2.default.createElement('div', { style: { display: 'none' } });
					break;
			}
		}

		// 进入详情页面 每个小流程类型跳转到对应的详情页，相同的详情页跳转到同一个路由
		// smallCode:小流程类型编号 orderId : 订单唯一编号

	}, {
		key: 'openWebViewDetail',
		value: function openWebViewDetail(smallCode, orderId, statusCode, updateDate) {
			var url = this.getViewRoutes(smallCode, statusCode, orderId);
			if (!url) {
				alert('未知业务类型[' + smallCode + '] 订单号[' + orderId + ']');
				return;
			}
			url += (url.indexOf('?') > 0 ? '&' : '?') + 'sta=' + this.props.todos.status + '&' + 'updateDate=' + encodeURIComponent(updateDate);
			// console.log('Marlin URL',url)
			jw.pushWebView(url);
		}

		//status:1 为途中订单状态 途中订单统一跳转到详情页面
		//status:0 为我的待办 根据待办状态跳转

	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			// console.log(data.todoCol8,"data.todoCol8")
			console.log('openWebView[' + this.props.todos.status + ']', data.todoCol9);
			if (this.props.todos.status == 0 && data.todoCol8 == '0' || data.todoCol9 == '0') {
				confirm("该订单不可在移动端处理，请到 PC 端处理");
				return;
			}
			if (this.props.todos.status == 1 || this.props.todos.status == 2) {
				window.upTabsData('todoInfoState', 'cache', data.todoCol7);
				this.openWebViewDetail(data.todoCol2, data.todoCol4, data.todoCol6, data.todoCol3);
			} else {
				this.getRouter(data.todoCol2, data.todoCol4, data.todoCol6, data.todoCol3);
				/*if(data.todoCol2=='12'&&data.todoCol6=='6'){
    	confirm("该订单不可在移动端处理，请到 PC 端处理");
    }*/
			}
		}
	}, {
		key: 'getRouter',
		value: function getRouter(smallCode, orderId, statusCode, updateDate) {
			// console.log('statusCode',statusCode)
			this.getStatusRoutes(orderId);
			// console.log('Marlin x1['+smallCode+']',statusRoutes,statusRoutes[smallCode],statusRoutes[smallCode][statusCode])
			if (statusRoutes[smallCode] && statusRoutes[smallCode][statusCode]) {
				var url = statusRoutes[smallCode][statusCode];
				// let url = statusRoutes['23']['4'];
				url += (url.indexOf('?') > 0 ? '&' : '?') + 'updateDate=' + encodeURIComponent(updateDate);
				// updateDate = encodeURIComponent(updateDate)
				// jw.pushWebView(statusRoutes[smallCode][statusCode])
				jw.pushWebView(url);
			}
		}
		/**
   * 在途、历史需求（订单）路由表
   * @param processType 流程类型
   * @param subProcess 小流程类型
   * @param orderId 需求编号（订单编号）
   * @return 在途、历史订单路由
   * @param view ：拆单之前 
   * @param vieworder ：拆单之前之后
   */

	}, {
		key: 'getViewRoutes',
		value: function getViewRoutes(subProcess, statusCode, orderId) {
			// subProcess='42';
			var viewRoutes = {
				'11': function _(statusCode) {
					return statusCode == '2' ? EpsWebRoot + '/#/repairing/vieworder/equipment/' + orderId : EpsWebRoot + '/#/repairing/view/equipment/' + orderId;
				}, //EpsWebRoot+'/#/repairing/view/equipment/'+orderId,
				'12': function _(statusCode) {
					return statusCode == '2' ? EpsWebRoot + '/#/repairing/vieworder/project/' + orderId : EpsWebRoot + '/#/repairing/view/project/' + orderId;
				}, /*{
       '2':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
       '':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
       },*/
				'13': EpsWebRoot + '/#/repairing/view/it/' + orderId + '?unfinished=1',
				'21': EpsWebRoot + '/#/maintenance/view/equipment/' + orderId + '?type=year', //年度-设备
				'24': EpsWebRoot + '/#/maintenance/view/project/' + orderId + '?type=year', //年度-工程
				'22': EpsWebRoot + '/#/maintenance/view/equipment/' + orderId + '?type=month', //月度-设备
				'25': EpsWebRoot + '/#/maintenance/view/project/' + orderId + '?type=month', //月度-工程
				'23': EpsWebRoot + '/#/maintenance/vieworder/equipment/' + orderId, //设备-保养
				'26': EpsWebRoot + '/#/maintenance/vieworder/project/' + orderId, //工程-保养
				// 非项目设备采购需求
				'31': EpsWebRoot + '/#/nonproject/view-info/view/equipment/' + orderId,
				// 非项目设备采购
				'32': EpsWebRoot + '/#/nonproject/view-info/vieworder/equipment/' + orderId,
				// 非项目工程采购
				'33': EpsWebRoot + '/#/nonproject/view-info/vieworder/project/' + orderId,
				// 非项目IT采购
				'34': EpsWebRoot + '/#/nonproject/view-info/vieworder/it/' + orderId,
				// 非项目工程采购需求
				'35': EpsWebRoot + '/#/nonproject/view-info/view/project/' + orderId,
				// 非项目IT采购需求
				'36': EpsWebRoot + '/#/nonproject/view-info/view/it/' + orderId,
				// 项目采购需求
				'41': EpsWebRoot + '/#/project/view/' + orderId,
				// 项目型供应商采购订单
				'42': EpsWebRoot + '/#/project/vieworder/' + orderId,
				// 项目型采购订单
				'43-1': EpsWebRoot + '/#/project/vieworder/equipment/' + orderId,
				'43-2': EpsWebRoot + '/#/project/vieworder/project/' + orderId,
				'43-3': EpsWebRoot + '/#/project/vieworder/it/' + orderId,
				// 新店/改造设备/工程订单
				'51': EpsWebRoot + '/#/minorpurchase/vieworder/equipment/' + orderId,
				// 新店/改造IT采购需求
				'53': EpsWebRoot + '/#/newstoreit/view/it/' + orderId,
				// 新店/改造IT采购订单
				'55': EpsWebRoot + '/#/newstoreit/vieworder/it/' + orderId,
				// 新店/改造GC采购
				'61': EpsWebRoot + '/#/newstoregc/view/' + orderId
			};
			return viewRoutes[subProcess] ? typeof viewRoutes[subProcess] == 'function' ? viewRoutes[subProcess](statusCode) : viewRoutes[subProcess] : '';
		}
		/**
   * 待办需求（订单）路由表
   */

	}, {
		key: 'getStatusRoutes',
		value: function getStatusRoutes(orderId, updateDate) {
			console.log('orderId', orderId);
			statusRoutes = {
				'11': {
					//2:供应商响应，3：供应商评估 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：调整后再审批
					'2': EpsWebRoot + '/#/repairing/response/equipment/' + orderId,
					'3': EpsWebRoot + '/#/repairing/assess/equipment/' + orderId + '?type=1', //供应商评估
					'4': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=1', //餐厅确认1
					'5': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=2', //doa审批2
					'6': EpsWebRoot + '/#/repairing/assess/equipment/' + orderId + '?type=2', //供应商确认
					'7': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=4', //餐厅确认评价4
					'8': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=3' //调整后再审批
				}, '12': {
					//2:供应商响应，   5： doa审批  7： 餐厅确认及评价 8：再次审批 
					'2': EpsWebRoot + '/#/repairing/response/project/' + orderId,
					'4': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=1', //餐厅确认1
					'5': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=2',
					'7': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=4',
					'8': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=3'
				}, '13': {
					// 3：供应商重新评估IT维修（餐厅确认节点退回后的状态） 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：再次审批
					'3': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=1',
					'4': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=1',
					'5': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=2',
					'6': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=2',
					'7': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=4',
					'8': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=3'
				},
				'21': { //保养 设备年度 2：DO审批
					// '2':EpsWebRoot+'/#/repairing/response/equipment/,
					'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=year'
				}, '22': { //保养设备月度审核 2： 已提交待审批
					'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=month'
				}, '23': { // 设备保养订单 1:已提交待响应 3：已确认待服务 4：已服务待评价
					'1': EpsWebRoot + '/#/maintenance/equipment/reply/' + orderId,
					'3': EpsWebRoot + '/#/maintenance/equipment/confirm/' + orderId,
					'4': EpsWebRoot + '/#/maintenance/equipment/assess/' + orderId
				}, '24': { // 工程年度保养计划
					'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=year'
				}, '25': { // 工程月度保养计划
					'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=month'
				}, '26': { // 工程保养订单
					'1': EpsWebRoot + '/#/maintenance/project/reply/' + orderId,
					'3': EpsWebRoot + '/#/maintenance/project/confirm/' + orderId,
					'4': EpsWebRoot + '/#/maintenance/project/assess/' + orderId
				}, '31': { // 非项目设备采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/equipment/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=10'
				}, '32': { // 非项目设备采购  1：已创建待审批(DOA) 3：已服务待签收(餐厅) 4：已收货待审批(DOA)
					'1': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=3'
				}, '33': { //非项目工程  1：  3：  4：同上
					'1': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=3'
				}, '34': { //非项目it 1:已创建待审批 3:已服务待签收 4:餐厅已确认(DOA审批) 5:IT PM已确认(DOA审批)
					'1': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
					'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1'
				}, '35': { // 非项目工程采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/project/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=10'
				}, '36': { // 非项目it采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/it/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=10'
				}, '41': { //项目采购需求
					// PM确认供应商的需求明细
					'3': EpsWebRoot + '/#/project/pmconfirm/' + orderId,
					'4': EpsWebRoot + '/#/project/approval/' + orderId + '?type=1'
				}, /*'42':{// 项目型供应商采购订单
       // 项目采购-供应商确认PO/填写服务信息/调整送货信息，这个节点是42，移动端不支持操作
       '1':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=4',
       '2':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=1',
       },*/'43-1': { //项目型采购订单-设备
					'1': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=1'
				}, '43-2': { //项目型采购订单-工程
					'1': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=1'
				}, '43-3': { //项目型采购订单-IT
					'1': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=1'
				}, '51': { //新店/改造设备/工程订单
					// 已确认待审批
					'4': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=1',
					// 已调整待审批
					'8': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=2'
				}, '53': { //新店/改造IT采购需求
					// TSI确认供应商的需求明细
					'3': EpsWebRoot + '/#/newstoreit/pmconfirm/' + orderId,
					// DOA审批（IT Func/Dept）
					'4': EpsWebRoot + '/#/newstoreit/approval/' + orderId + '?type=1'
				}, '55': { //新店/改造IT采购订单
					// 餐厅确认评价（IT)
					'1': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=4',
					// DOA送货调整审批 （IT）
					'2': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=1'
				}, '61': { //新店/改造GC采购
					// 6 - 已确认待审批
					'6': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=1',
					// 11 - 已调整待审批
					'10': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=2'
				}
			};
		}
	}]);

	return TodoItemView;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(TodoItemView);

/***/ }),

/***/ 1857:
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

var _dva = __webpack_require__(196);

var _router = __webpack_require__(338);

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

var todosMenu = (0, _constants.getDict)('todosMenu');
console.log(todosMenu, "todosMenu");
var allObj = { id: "all", key: '全部', val: '全部', type: 'all' };

if (todosMenu.length != 0) {
  todosMenu.unshift(allObj);
} else {
  todosMenu = [allObj];
}

// _.map(todosMenu,function(i,index){
//    todosMenu[index+1]=i;
// })
// todosMenu[0]=allObj;
var eid = userinfo.employee_id;

var TodosType = function (_Component) {
  _inherits(TodosType, _Component);

  function TodosType() {
    _classCallCheck(this, TodosType);

    return _possibleConstructorReturn(this, (TodosType.__proto__ || Object.getPrototypeOf(TodosType)).apply(this, arguments));
  }

  _createClass(TodosType, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // console.log(this.props.todos.businessType,"businessType")
      var self = this;
      return _react2.default.createElement('div', { className: 'filter-type' }, _.map(todosMenu, function (i) {
        return _react2.default.createElement('div', { className: "filter-type-i " + (i["val"].length > 6 ? "filter-type-bi " : "") + (i['type'] == self.props.businessType ? 'active' : ''), onClick: function onClick(e) {
            return _this2.changeType(i['type']);
          } }, i["val"]);
      }));
    }
  }, {
    key: 'changeType',
    value: function changeType(data) {
      var dispatch = this.props.dispatch;
      // let status=this.props.todos.status;
      dispatch({
        type: 'todos/changeData',
        payload: {
          loading: true,
          // noMore:false,
          // fix:false,
          pageNum: 1,
          businessType: data,
          filter: {
            number: '',
            flowtype: ['-1'],
            startDate: null,
            endDate: null,
            moneyFrom: '',
            moneyTo: ''
          }
        }
      });
      /*console.log(data,"changeType")
      if(data=='all'){
        dispatch({
      		type:'todos/changeData',
      		payload:{
      			loading:true,
      			noMore:false,
      			fix:false,
      			businessType:'all',
      		}
      	})
      	 // this.typeAllOnChange(status);
      		}else{
       dispatch({
      		type:'todos/changeData',
      		payload:{
      			loading:true,
      			noMore:false,
      			fix:false,
      			businessType:data,
      				}
      	})
      	// this.typeOnChange(status,data)
      }*/
    }
    /*typeAllOnChange(status){
    	console.log('typeAllOnChange')
    
    	let dispatch=this.props.dispatch;
    		if(status==1){
    			dispatch({
    				type:'todos/fetchUnfinished',
    				info:{
    					status:status,
    					businessType:'all',
    				},
    				payload:{
    					param:{
    					 eid:eid,
    					 pager:{
    					   pageNum:1,
    					   pageSize:10
    					 }
    					}
    				}
    			})
    		}else{
    			dispatch({
    				type:'todos/fetchTodo',
    				info:{
    					status:status,
    					businessType:'all',
    				},
    				payload:{
    					param:{
    					 eid:eid,
    					 pager:{
    					   pageNum:1,
    					   pageSize:10
    					 }
    					}
    				}
    			})
    	}
    }*/
    /*typeOnChange(status,businessType){
    	let dispatch=this.props.dispatch;
    		if(status==1){
    			dispatch({
    				type:'todos/fetchUnfinished',
    				info:{
    					status:status,
    					businessType:businessType,
    				},
    				payload:{
    					param:{
    					 eid:eid,
    					 condition:{
    					  businessType:businessType,
    					 },
    					 pager:{
    					   pageNum:1,
    					   pageSize:10
    					 }
    					}
    				}
    			})
    		}else{
    			dispatch({
    				type:'todos/fetchTodo',
    				info:{
    					status:status,
    					businessType:businessType,
    				},
    				payload:{
    					param:{
    					 eid:eid,
    					 condition:{
    					  businessType:businessType,
    					 },
    					 pager:{
    					   pageNum:1,
    					   pageSize:10
    					 }
    					}
    				}
    			})
    		}
    	}*/
    // }

  }]);

  return TodosType;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
  return state;
})(TodosType);

/***/ }),

/***/ 1865:
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

var _Todos = __webpack_require__(1866);

var TodoService = _interopRequireWildcard(_Todos);

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
    loading: true,
    firstFetch: true,
    list: [],
    businessType: '10',
    filter: {
      number: '',
      flowtype: ['-1'],
      startDate: null,
      endDate: null,
      moneyFrom: '',
      moneyTo: ''
    },
    status: 0,
    pageNum: 1,
    pageSize: 10,
    pages: 1,
    hide: false,
    fix: false,
    todoListCnt: {},
    noMore: false
  },
  reducers: {
    //修改state数据
    changeData: function changeData(state, action) {
      console.log('reducers todos/changeData', state, action);
      return _extends({}, state, action.payload);
    }
  },

  effects: {
    changeData: /*#__PURE__*/regeneratorRuntime.mark(function changeData(_ref, _ref2) {
      var payload = _ref.payload,
          dispatch = _ref.dispatch;
      var call = _ref2.call,
          put = _ref2.put,
          select = _ref2.select;

      var state, conditions, oldList, _getRouter, _combinePayload, _ref3, data, pageinfo;

      return regeneratorRuntime.wrap(function changeData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _combinePayload = function _combinePayload() {
                var condition = {},
                    params = { param: {
                    eid: userinfo.employee_id,
                    pager: {
                      pageNum: conditions.pageNum,
                      pageSize: conditions.pageSize
                    }
                  } };
                if (conditions.businessType != 'all' && conditions.filter.flowtype[0] == '-1') condition['businessType'] = conditions.businessType;
                if (conditions.filter.flowtype[0] != '-1') condition['flowType'] = conditions.filter.flowtype[0];
                if (conditions.filter.number != '') condition['orderNumber'] = conditions.filter.number;
                if (conditions.filter.moneyFrom != '') condition['orderMoneyFrom'] = conditions.filter.moneyFrom;
                if (conditions.filter.moneyTo != '') condition['orderMoneyTo'] = conditions.filter.moneyTo;
                if (!_.isNull(conditions.filter.startDate)) condition['orderDateFrom'] = moment(conditions.filter.startDate);
                if (!_.isNull(conditions.filter.endDate)) condition['orderDateTo'] = moment(conditions.filter.endDate);
                if (!_.isEmpty(condition)) params['param']['condition'] = condition;
                return params;
              };

              _getRouter = function _getRouter() {
                if (conditions.status == '1') return TodoService.UnfinishedList;else if (conditions.status == '2') return TodoService.HistoryList;else return TodoService.TodoList;
              };

              if (!(payload.fetchAction === false)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return');

            case 4:
              _context.next = 6;
              return select();

            case 6:
              state = _context.sent;
              conditions = state.todos;
              oldList = [];

              if (conditions['firstFetch']) {}

              // _checkChanged();
              if (conditions.pageNum != 1) {
                // 如果不是第一页，则缓存当前列表
                oldList = _.clone(conditions.list);
              }

              _context.next = 13;
              return call(_getRouter(), _combinePayload());

            case 13:
              _ref3 = _context.sent;
              data = _ref3.data;

              if (!data.success) {
                _context.next = 20;
                break;
              }

              pageinfo = data.body.pageInfo;
              // console.log('Marlin noMore',conditions.pageNum>=pageinfo.pages)
              // 
              // if(state[''])
              // if(state['todos']['firstFetch']){
              //   window.mescrollFunction = new MeScroll("mescroll", { 
              //     down: {
              //      offset:'70',
              //      auto:false,
              //      callback: function(){
              //        dispatch({
              //          type:'todos/changeData',
              //          payload:{
              //            businessType:'all',
              //            pageNum: 1
              //          }
              //        })
              //      }
              //    },
              //   });
              // }

              if (typeof window.mescrollFunction != 'undefined') {
                window.mescrollFunction.endSuccess();
              }
              _context.next = 20;
              return put({
                type: 'changeData',
                payload: {
                  list: _.union(oldList, pageinfo.list),
                  loading: false,
                  firstFetch: false,
                  pages: pageinfo.pages,
                  fix: false,
                  noMore: conditions.pageNum >= pageinfo.pages,
                  fetchAction: false // 是否发起Ajax请求
                }
              });

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, changeData, this);
    })
  },

  subscriptions: {
    setup: function setup(_ref4) {
      var dispatch = _ref4.dispatch,
          history = _ref4.history;
    }
  }

};

/***/ }),

/***/ 1866:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoList = TodoList;
exports.UnfinishedList = UnfinishedList;
exports.HistoryList = HistoryList;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 待办接口
window.basurl = "/McdEpsApi/joywok";

// 获取待办列表
function TodoList(param) {
  return (0, _EpsRequest2.default)(window.basurl + '/common/getToDoList', {
    method: 'POST',
    body: JSON.stringify(param)
  });
}

//获取途中订单列表
function UnfinishedList(param) {
  return (0, _EpsRequest2.default)(window.basurl + '/common/getUnfinishedList', {
    method: 'POST',
    body: JSON.stringify(param)
  });
}

// 获取历史订单列表
function HistoryList(param) {
  return (0, _EpsRequest2.default)(window.basurl + '/common/getFinishedList', {
    method: 'POST',
    body: JSON.stringify(param)
  });
}

//获取图中订单件数
// export function UnfinishedListCount(parame) {
//   return request(window.basurl+'/common/getUnfinishedListCount', {
//     method: 'POST',
//     body: JSON.stringify(parame),
//   });
// }

/***/ }),

/***/ 1933:
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

var _NullData = __webpack_require__(1942);

var _NullData2 = _interopRequireDefault(_NullData);

var _TodosType = __webpack_require__(1857);

var _TodosType2 = _interopRequireDefault(_TodosType);

var _TodoItemView = __webpack_require__(1856);

var _TodoItemView2 = _interopRequireDefault(_TodoItemView);

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

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
   * 待办卡片 type='all',10,20,30,40,50,60,
   * 分别对应 全部，维修，保养，非项目，项目，新店日常，新店GC
   */

var eid = userinfo.employee_id;

var Todos = function (_Component) {
	_inherits(Todos, _Component);

	function Todos(props) {
		_classCallCheck(this, Todos);

		// this.filterOrder = this.filterOrder.bind(this);
		var _this = _possibleConstructorReturn(this, (Todos.__proto__ || Object.getPrototypeOf(Todos)).call(this, props));

		_this.filter = _this.filter.bind(_this);
		_this.getFilterCondition = _this.getFilterCondition.bind(_this);
		_this.callJWFuncs = _this.callJWFuncs.bind(_this);
		return _this;
	}

	_createClass(Todos, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var data = this.props.todos;
			var todoHtml = "";
			var loadMoreHtml = "";
			console.log('list---', data);
			// console.log(userinfo,"data:userinfo")
			// console.log('Marlin render', data);
			this.setFilterBtnStage(data.filter);

			if (!data.list.length) {
				var strTip = ['暂无任何待办', '暂无在途订单', '暂无历史订单'][data.status];
				if (typeof strTip == 'undefined') strTip = '暂无任何待办';
				todoHtml = _react2.default.createElement(_NullData2.default, { strTip: strTip });
				loadMoreHtml = "";
			} else {
				todoHtml = _react2.default.createElement('div', { className: 'todos-list' }, _.map(data.list, function (item) {
					return _react2.default.createElement(_TodoItemView2.default, { itemData: item, businessType: parseInt(item.todoCol1) });
				}));
				if (data.noMore) {
					loadMoreHtml = _react2.default.createElement('div', { className: 'todos-nomore' }, "\u6CA1\u6709\u66F4\u591A\u4E86\uFF01");
				} else {
					loadMoreHtml = _react2.default.createElement('div', { className: 'todos-list-loadmore' }, _react2.default.createElement(_LoadMore2.default, { container: 'main-c', data: {
							hide: data['hide'],
							loading: data['loading'],
							fix: data['fix']
						}, onEndReached: function onEndReached(e) {
							_this2.onEndReached(e);
						} }));
				}
			}
			// console.log('Marlin x2',todoHtml);
			return _react2.default.createElement('div', { className: 'root-container mescroll', id: 'mescroll' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header clear-margin todos-header ', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_TodosType2.default, { businessType: this.props.todos['businessType'] }))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c', ref: 'listC', style: {
					height: data['containerHeight'] || 'auto'
				} }, _react2.default.createElement('div', { className: 'main-w' }, data.loading && data.pageNum == '1' ? _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, "\u52A0\u8F7D\u4E2D")) : _react2.default.createElement('div', { id: 'todos-container' }, _react2.default.createElement('div', { className: 'todos-refresh' }), todoHtml, loadMoreHtml))))));
		}
	}, {
		key: 'bindOnEndReached',
		value: function bindOnEndReached() {
			var self = this,
			    data = this.props.todos;
			// console.log('Marlin bindOnEndReached')
			$('.main-c').unbind('scroll').on('scroll', function (evt) {
				if (data['fix'] || data['loading']) return;
				// console.log('Marlin fixed',data['fix'],data['loading']);
				var clientHeight = $(this).height();
				var target = $('.todos-list-loadmore');
				if (target.length == 0) return;
				// console.log( 'Marlin Top', clientHeight, target.offset().top)
				if (clientHeight + 80 >= target.offset().top) {
					self.onEndReached(evt);
					$(this).unbind('scroll');
				}
				// self.onEndReached(evt);
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (!this.props.todos || this.props.todos.loading) return;
			// console.log('Marlin componentDidUpdate',this.props.todos);
			if (this.props.todos.loading === false) {
				this.bindOnEndReached();
			}
		}
	}, {
		key: 'onEndReached',
		value: function onEndReached(e) {
			var businessType = this.props.todos.businessType;
			var status = this.props.todos.status;
			var pages = this.props.todos.pages;
			var nextPageNum = this.props.todos.pageNum + 1;
			var oldList = _.clone(this.props.todos.list);
			var dispatch = this.props.dispatch;

			// console.log('Marlin onEndReached',pages,nextPageNum)

			var noMore = false;
			if (this.props.todos.pageNum >= pages) {
				noMore = true;
				dispatch({
					type: "todos/changeData",
					payload: {
						noMore: noMore,
						hide: true,
						fix: true
					}
				});
			} else {
				// console.log('Marlin more')
				noMore = false;
				dispatch({
					type: "todos/changeData",
					payload: {
						loading: true,
						pageNum: nextPageNum,
						noMore: noMore,
						hide: false,
						fix: true
					}
				});
				// this.loadMoreData(status,businessType,nextPageNum,oldList,noMore)
			}
		}
	}, {
		key: 'callJWFuncs',
		value: function callJWFuncs() {
			var params = this.props.todos;
			// alert('dsadasdasds');
			// console.log('这里走了么');
			// alert('测试走了么')
			jw.showTabs({
				tabs: ["我的待办", "在途订单", "历史订单"],
				position: 'top', //是否设置在顶部
				style: "F55928",
				focusidx: parseInt(params.status)
			});
			// 过滤按钮
			jw.setFuncBtns([{ type: 0 }]);
		}
		// componentWillMount(){
		// 	let self = this;
		// 	let params = this.props.todos;
		// 	console.log('Marlin',{
		// 		tabs:[
		// 			"我的待办","在途订单","历史订单"
		// 		],
		// 		position:'top',//是否设置在顶部
		// 		style:"F55928",
		//    focusidx:parseInt(params.status)
		// 	})
		// 	if(JWReady == true){
		// 		this.callJWFuncs();
		// 		return;
		// 	}
		// 	window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
		// 		self.callJWFuncs()
		// 	})
		// }
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var dispatch = this.props.dispatch;
			PubSub.subscribe('get:child:todos:updateTodoList', function (evt, data) {
				// console.log(data,"data:publish")
				console.log(self.props.todos.status, "status");
				var status = self.props.todos.status;
				var businessType = self.props.location.query.type ? self.props.location.query.type : 'all';
				// self.fetchTodo(businessType,eid,status)
				dispatch({
					type: 'todos/changeData',
					payload: {
						pageNum: 1
					}
				});
			});
			// 搜索订单
			PubSub.subscribe('todos:filter', this.filter);
			// 
			PubSub.subscribe('todos:getFilterCondition', this.getFilterCondition);
			window.onJwSelectTab = function (data) {
				var businessType = self.props.todos.businessType;
				var status = void 0;
				status = data;
				var pageNum = 1;
				dispatch({
					type: 'todos/changeData',
					payload: {
						loading: true,
						noMore: false,
						status: data,
						pageNum: 1
					}
				});
			};
			window.onJwNavBtnClick = function (data) {
				data.type == 0 && self.filterOrder();
			};
			NProgress.done();
			self.callJWFuncs();
			setTimeout(function () {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var header = $('.header').height() || 0;
				var footer = $('.footer').height() || 0;
				$('.main-c').css({ height: clientHeight - header - footer + 'px' });
				var businessType = self.props.location.query.type ? self.props.location.query.type : 'all';
				dispatch({
					type: 'todos/changeData',
					payload: {
						businessType: businessType
						// self:self
					}
				});
				// self.fetchTodo(businessType,eid);
				var startY = 0,
				    distanceY = 0,
				    endY = 0;
				$('body').bind('touchstart', function (e) {
					startY = e.originalEvent.changedTouches[0].pageY;
				});
				$('body').bind('touchmove', function (e) {
					endY = e.originalEvent.changedTouches[0].pageY;
					distanceY = endY - startY;
					// console.log(e,'这个里面是什么呢');
					if (distanceY < 0) {
						console.log('往上滑动');
					} else if (distanceY > 0) {
						console.log('往下滑动', self.props['todos']['loading']);
						if (self.props['todos']['loading']) {
							if (window.mescrollFunction) {
								window.mescrollFunction.destory();
							}
							e.preventDefault();
						} else {
							if (!window.mescrollFunction) {
								window.mescrollFunction = new MeScroll("mescroll", {
									down: {
										offset: '70',
										auto: false,
										callback: function callback(evt) {
											console.log(evt, '1231231231');
											var datas = self.props.todos;
											self.props.dispatch({
												type: 'todos/changeData',
												payload: {
													filter: datas['filter'],
													businessType: datas['businessType'],
													pageNum: 1
												}
											});
										},
										up: {
											use: false
										}
									}
								});
							}
							if ($('.main-c').scrollTop() == 0) {
								window.mescrollFunction.lockDownScroll(false);
							} else {
								window.mescrollFunction.lockDownScroll(true);
							}
							if ($('.main-c').find(e.target).length != 0) {
								if ($('.main-c').scrollTop() == 0) {
									e.preventDefault();
								}
							} else {
								e.preventDefault();
							}
						}
					}
				});
				$('body').bind('touchend', function (e) {
					startY = 0;
					distanceY = 0;
					endY = 0;
				});
			}, 0);

			// let startY = 0,distanceY = 0,endY = 0;
			//   $('body').bind('touchstart',function(e){
			//     startY = e.originalEvent.changedTouches[0].pageY;
			//   });
			//   $('body').bind('touchmove',function(e){
			//     endY = e.originalEvent.changedTouches[0].pageY;
			//     distanceY = endY-startY;
			//     // console.log(e,'这个里面是什么呢');
			//     if( distanceY<0){
			//       console.log('往上滑动');
			//     }else if(distanceY>0){
			//       console.log('往下滑动',self.props['todos']['loading']);
			//       if(self.props['todos']['loading']){
			//         window.mescrollFunction.lockDownScroll(true);
			//         window.mescrollFunction.endSuccess();
			//       }
			//       if($('.main-c').scrollTop() == 0){
			//         window.mescrollFunction.lockDownScroll(false);
			//       }else{
			//         window.mescrollFunction.lockDownScroll(true);
			//       }
			//       if($('.main-c').find(e.target).length!=0){
			//         if($('.main-c').scrollTop() == 0){
			//           e.preventDefault();
			//         }
			//       }else{
			//         e.preventDefault();
			//       }
			//     }
			//   });
			//   $('body').bind('touchend',function(e){
			//     startY=0;
			//     distanceY = 0;
			//     endY = 0 ;
			//   });
			//   window.mescrollFunction = new MeScroll("mescroll",{
			//     down: {
			//      offset:'70',
			//      auto:false,
			//      callback: function(evt){
			//       console.log(evt,'1231231231');
			//       let datas = self.props.todos;
			//       dispatch({
			//         type:'todos/changeData',
			//         payload:{
			//           filter:datas['filter'],
			//           businessType:datas['businessType'],
			//           pageNum: 1
			//         }
			//       })
			//     }
			//    },
			//   });
		}
	}, {
		key: 'fetchTodo',
		value: function fetchTodo(businessType, eid, status) {
			var dispatch = this.props.dispatch;
			dispatch({
				type: 'todos/changeData'
			});
		}
		// 打开搜索订单页面

	}, {
		key: 'filterOrder',
		value: function filterOrder() {
			var url = EpsWebRoot + '/#/todos/filter';
			// console.log('Marlin filterOrder',this.props);
			jw.newWebView(url);
		}
	}, {
		key: 'setFilterBtnStage',
		value: function setFilterBtnStage(filter) {
			var originFilter = {
				number: '',
				flowtype: ['-1'],
				startDate: null,
				endDate: null,
				moneyFrom: '',
				moneyTo: ''
			},
			    stage = _.isEqual(filter, originFilter) ? 0 : 1;

			jw.setFuncBtnStatus({ type: 0, stage: stage });
		}
		// 

	}, {
		key: 'filter',
		value: function filter(evt, data) {
			var dispatch = this.props.dispatch;
			// this.setFilterBtnStage( data );
			dispatch({
				type: 'todos/changeData',
				payload: {
					filter: data,
					businessType: 'all',
					pageNum: 1,
					loading: true
				}
			});
		}
		// 为搜索页面提供过滤条件

	}, {
		key: 'getFilterCondition',
		value: function getFilterCondition() {
			console.log('Marlin getFilterCondition', this.props.todos);
			window.upTabsData('todos:responseFilterCondition', 'publish', this.props.todos);
		}
	}]);

	return Todos;
}(_react.Component);

function mapStateToProps(state) {
	var hash = window.location.hash.split('?')[1].split('&');
	var nowHash = {};
	_.each(hash, function (i) {
		var split = i.split('=');
		nowHash[split[0]] = split[1];
	});
	var nowData = state;
	state['todos'] = _.extend({}, state['todos'], {
		type: state['todos']["businessType"] || nowHash['businessType'] || '1'
	});
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Todos);

/***/ }),

/***/ 1934:
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

var MyTodos = function (_Component) {
	_inherits(MyTodos, _Component);

	function MyTodos() {
		_classCallCheck(this, MyTodos);

		return _possibleConstructorReturn(this, (MyTodos.__proto__ || Object.getPrototypeOf(MyTodos)).apply(this, arguments));
	}

	_createClass(MyTodos, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var containerStyle = {
				height: (736 - 94 - 49 - 151) / 41.4 + 'rem'
			};
			var data = this.props.todos;
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_UserCard2.default, null))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c', style: containerStyle }, _react2.default.createElement(_TodoCard2.default, null))), _react2.default.createElement(_MoneyShow2.default, null), _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openWebView('/log');
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), _react2.default.createElement('div', { className: 'todo-info-status' }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, "DOA\u5BA1\u6279 (\u8425\u8FD0)"), _react2.default.createElement('span', { className: 'todo-status-tip' }, "\u5DF2\u786E\u8BA4\u5F85\u5BA1\u6279"))))));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}, {
		key: 'onEndReached',
		value: function onEndReached(e) {}
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
		}
	}]);

	return MyTodos;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(MyTodos);

/***/ }),

/***/ 1942:
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

var NullData = function (_Component) {
  _inherits(NullData, _Component);

  function NullData() {
    _classCallCheck(this, NullData);

    return _possibleConstructorReturn(this, (NullData.__proto__ || Object.getPrototypeOf(NullData)).apply(this, arguments));
  }

  _createClass(NullData, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'todos-null' }, _react2.default.createElement('div', { className: 'icon-todos-null' }, _react2.default.createElement('img', { src: 'images/empty-todos.png' })), _react2.default.createElement('div', { className: 'desc' }, this.props.strTip));
    }
  }]);

  return NullData;
}(_react.Component);

;

exports.default = (0, _dva.connect)()(NullData);

/***/ }),

/***/ 1977:
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