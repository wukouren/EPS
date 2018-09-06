webpackJsonp([20],{

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

/***/ 1883:
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

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

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

var _EpsModal = __webpack_require__(198);

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
   * 设备审批 餐厅设备确认
   * type=1,2,3,4
   * //1:餐厅待确认
  	//2：DOA审批
  	//3：审批未通过，餐厅再次审批  3同1 合并，3不需要了
  	//4：餐厅确认订单，评价
   */

var eid = userinfo.employee_id;

var FeeRate = (0, _constants.getDict)('taxlist');
// console.log("FeeRate:",FeeRate,"equipmentOperation:",equipmentOperation)

var Process = function (_Component) {
	_inherits(Process, _Component);

	function Process(props) {
		_classCallCheck(this, Process);

		var _this = _possibleConstructorReturn(this, (Process.__proto__ || Object.getPrototypeOf(Process)).call(this, props));

		_this.state = {
			operationed: false
		};
		_this.openWebView = _this.openWebView.bind(_this);
		_this.EvaluateRefuse = _this.EvaluateRefuse.bind(_this);
		return _this;
	}

	_createClass(Process, [{
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
			if (this.props.processdevice.loading) {
				return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, "\u52A0\u8F7D\u4E2D"));
			} else {
				var view = this._init_view();
				return _react2.default.createElement('div', { className: 'root-container device' }, view);
			}
		}
	}, {
		key: '_init_view',
		value: function _init_view() {
			var _this2 = this;

			var view = '';
			var data = this.props.processdevice;
			var formData = {};
			var rejectTip = '';
			console.log('Marlin', data);
			if (this.props.location.query.type != '4') {
				formData = {
					className: 'clear-padding',
					schema: [{
						name: 'feedback', element: 'Textarea',
						defaultValue: data['form'] && data['form']['feedback'] ? data['form']['feedback'] : '',
						attr: {
							placeholder: data['epsDialog']['type'] == "agree" ? '请输入备注' : '拒绝必须输入备注...',
							autoHeight: true,
							count: 200
						},
						events: {
							onChange: function onChange() {
								var height = $('.eps-dialog-w').height();
								$('.eps-dialog-w').css({
									marginTop: -(height / 2) + 'px'
								});
							}
						},
						rules: []
					}],
					buttons: false,
					changeData: this.changeData.bind(this)
				};
				if (this.props.location.query.type == '3') {
					rejectTip = _react2.default.createElement(_RejectTip2.default, { data: data['epsTip'], close: function close(e) {
							return _this2.closeTip(e);
						} });
				}
			} else {}
			var EpsDialogComponent = _react2.default.createElement('div', { className: 'appraisal-form' }, _react2.default.createElement(_mobile2.default, { ref: 'form', formData: formData, onChange: function onChange(values, schema) {
					return _this2.FormChange(values, schema);
				} }));
			var showScrapTip = 0;

			var allPartMoney = {};
			if (data['partList'] && data['partList'].length != 0) {
				_.each(data['partList'], function (i) {
					if (i['totalMaintenanceCost'] >= 3000 || i['partIsFa'] == 'Y') {
						showScrapTip = showScrapTip + 1;
					}
					if (allPartMoney[i['deviceName'] + '*' + i['deviceNumber']]) {
						allPartMoney[i['deviceName'] + '*' + i['deviceNumber']] = allPartMoney[i['deviceName'] + '*' + i['deviceNumber']] + i['totalMaintenanceCost'];
					} else {
						allPartMoney[i['deviceName'] + '*' + i['deviceNumber']] = i['totalMaintenanceCost'];
					}
					// allPartMoney = allPartMoney + i['totalMaintenanceCost'];
				});
			}
			console.log(data["deviceList"], '这个里面有啥呢');
			_.each(allPartMoney, function (i, key) {
				var keys = key.split('*');
				console.log(keys, 'keyssadasd');
				if (i >= 9000) {
					var datas = _.findWhere(data['deviceList'], { deviceName: keys[0], deviceNumber: keys[1] });
					console.log('xcasdasdasdasdasdasda', datas);
					datas['totalMaintenanceCost'] = i;
				}
			});

			console.log(data['partList'], data["deviceList"], 'partList', allPartMoney);
			if (data['deviceList'] && data['deviceList'].length != 0) {
				_.each(data['deviceList'], function (i) {
					if (i['totalMaintenanceCost'] >= 9000) {
						showScrapTip = showScrapTip + 1;
					}
				});
			}
			this.showScrapTip = showScrapTip;
			console.log('这个里面的数据有啥', data, '2123123123123123123123');
			console.log(this.showScrapTip, '这个值是多少呢');
			view = _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header header-with-memo', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_UserCard2.default, { data: _.extend({}, this.props.processdevice.creatorinfo, {
					avatar: this.props.processdevice['avatar'],
					fileCount: this.props.processdevice['fileCount'] || 0,
					uploadPhaseName: this.props.processdevice['uploadPhaseName'] || '',
					scrapPageInfo: data['storeScrapList'],
					partList: data['partList'],
					deviceList: data['deviceList'],
					storeNumber: data['storeNumber'],
					scrappType: 'repair',
					scrappOrderType: 'device',
					showScrapTip: showScrapTip,
					addScrap: window.isUnfinishedOrHistory() == false && (this.props.location.query.type == '1' || this.props.location.query.type == '4') ? true : false
				}) }))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c device-c' }, _react2.default.createElement('div', null, _react2.default.createElement(_TodoCard2.default, { showAllData: true, openView: this.openWebView, devicedata: this.props.processdevice.itemDevice, deviceDetailInfo: false })))), _react2.default.createElement(_MoneyShow2.default, { allData: this.props.processdevice }), _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openLog();
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), this.footerRender(data)));
			return view;
		}
		// 组件加载完毕

	}, {
		key: 'footerRender',
		value: function footerRender(data) {
			var _this3 = this;

			if (isUnfinishedOrHistory()) {
				var strOrderSta = data['orderState'] && _constants.orderStatus["repair"][data['orderState']] ? _constants.orderStatus["repair"][data['orderState']] : { 'label': '' };
				return _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
						return _this3.openProcessTable();
					} }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"])));
				/*return <div className="eps-btn-wrap">
    	<div className="eps-btn eps-btn-status-large" onClick={(e)=>this.openProcessTable()}><i className="icon-check"></i><span>{strOrderSta["label"]}</span></div>
    </div>;*/
			}

			switch (this.props.location.query.type) {
				/*case '100':
    return <div className="eps-btn-wrap">
    		<Button className="eps-btn eps-btn-default-large status" disabled >{infostate?infostate:''}</Button>
    	</div>;
     break;*/
				case '1':
					if (this.state.operationed) {
						return _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-cancel-small there-btn', onClick: function onClick(e) {
								return _this3.cancel(e);
							} }, "\u53D6\u6D88"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-default-small  diabled  there-btn" : "eps-btn eps-btn-default-small" }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-warning-large disabled  there-btn" : "eps-btn eps-btn-warning-large" }, "\u786E\u8BA4"));
					} else {
						return _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-cancel-small there-btn', onClick: function onClick(e) {
								return _this3.cancel(e);
							} }, "\u53D6\u6D88"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-default-small diabled  there-btn" : "eps-btn eps-btn-default-small there-btn", onClick: function onClick(e) {
								return _this3.reject(e, _this3.props.location.query.type);
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-warning-large disabled  there-btn" : "eps-btn eps-btn-warning-large there-btn", onClick: function onClick(e) {
								return _this3.agree(e, _this3.props.location.query.type);
							} }, "\u786E\u8BA4"));
					}
					break;
				case '4':
					if (this.state.operationed) {
						return _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-default-small  diabled" : "eps-btn eps-btn-default-small" }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-warning-large disabled" : "eps-btn eps-btn-warning-large" }, "\u786E\u8BA4"));
					} else {
						return _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-default-small diabled" : "eps-btn eps-btn-default-small", onClick: function onClick(e) {
								return _this3.EvaluateRefuse();
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-warning-large disabled " : "eps-btn eps-btn-warning-large", onClick: function onClick(e) {
								return _this3.EvaluateAgree(e, _this3.props.location.query.type);
							} }, "\u786E\u8BA4"));
					}
					break;
				default:
					if (this.state.operationed) {
						return _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-default-small  diabled" : "eps-btn eps-btn-default-small" }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-warning-large disabled" : "eps-btn eps-btn-warning-large" }, "\u786E\u8BA4"));
					} else {
						return _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-default-small diabled" : "eps-btn eps-btn-default-small", onClick: function onClick(e) {
								return _this3.reject(e, _this3.props.location.query.type);
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: this.state.operationed ? "eps-btn eps-btn-warning-large disabled" : "eps-btn eps-btn-warning-large", onClick: function onClick(e) {
								return _this3.agree(e, _this3.props.location.query.type);
							} }, "\u786E\u8BA4"));
					}
					break;
			}
		}
	}, {
		key: 'onEndReached',
		value: function onEndReached() {}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var datas = this.props.processdevice;
			var time = datas['updateDate'].split('.')[0];
			var updateDate = encodeURIComponent(time);
			var url = EpsWebRoot + '/#' + data + this.props.params.orderid + '?updateDate=' + updateDate;
			jw.pushWebView(url);
		}
	}, {
		key: 'openProcessTable',
		value: function openProcessTable() {
			var data = this.props.processdevice;
			data['logType'] = 'repair';
			window.upTabsData('log', 'cache', data);
			var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
			jw.pushWebView(url);
		}
	}, {
		key: 'closeTip',
		value: function closeTip() {
			var dispatch = this.props.dispatch;
			var data = this.props.processdevice;
			var epsTip = _.extend(data['epsTip'], {
				show: false
			});
			dispatch({
				type: 'processdevice/changeData',
				data: {
					epsTip: epsTip
				}
			});
		}
	}, {
		key: 'closeDialog',
		value: function closeDialog() {
			console.log('closeDialog');
			var dispatch = this.props.dispatch;
			var data = this.props.processdevice;
			var epsDialog = _.extend(data['epsDialog'], {
				show: false
			});
			dispatch({
				type: 'processdevice/changeData',
				data: {
					epsDialog: epsDialog
				}
			});
		}
		//确认提交订单

	}, {
		key: 'approveSubmit',
		value: function approveSubmit(e, type, value, callback) {
			if (type == '1' || type == '2' || type == '3') {
				var self = this;
				console.log(type, "确认提交订单", this.props.processdevice);
				(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/submitOrderInfo', {
					method: 'POST',
					body: JSON.stringify({
						param: {
							eid: eid,
							record: {
								updateDate: self.props.processdevice.updateDate,
								orderNumber: self.props.processdevice.orderNumber,
								orderState: self.props.processdevice.orderState,
								confirmFlag: 'Approve',
								refuseRemarks: value,
								orderMoney: self.props.processdevice.orderMoney + '',
								storeScrapList: self.props.processdevice['storeScrapList'] || []
							}
						}
					})
				}).then(function (resp) {
					if (resp.data.success) {
						self.setState({ 'operationed': true });
						(0, _EpsModal.AlertBase)({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: function onOk() {
								jw.closeWebView();
							}
						});
					} else {
						if (typeof callback != 'undefined') {
							callback(true);
						}
					}
				});
			} else if (type == '4') {}
		}
	}, {
		key: 'cancel',
		value: function cancel() {
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.processdevice;
			var self = this;
			// let orderDate = modelData['creatorinfo']['time'];
			// console.log(modelData,'123123123123',orderDate);
			// return 
			var rejectDialog = (0, _EpsModal.MemoDialog)({
				title: '是否取消该订单?',
				defaultValue: self.cancelMemo ? self.cancelMemo : '',
				btnIconClass: 'icon-reject',
				btnVal: '取消',
				placeholder: '取消订单必须输入备注...',
				memorequired: true,
				changeData: function changeData() {},
				onBtnClick: function onBtnClick(memo, callback) {
					var datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderNumber: orderid,
								orderDate: modelData["orderDate"],
								orderState: modelData['orderState'],
								refuseRemarks: memo
							}
							// self.upData(datas,callback)
						} };(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/cancelEquipmentRepairPo', {
						method: 'POST',
						body: JSON.stringify(datas)
					}).then(function (resp) {
						if (resp['data']['success'] == false) {
							if (typeof callback != 'undefined') {
								callback(true);
							}
						} else {
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
					self.cancelMemo = memo;
					// console.log('approve reject onClose:')
				}
			});
		}
		// 拒绝订单

	}, {
		key: 'reject',
		value: function reject(e, type) {
			// $('.eps-dialog').hide();
			console.log('closeDialog');

			var self = this;
			var rejectDialog = (0, _EpsModal.MemoDialog)({
				title: '是否拒绝该订单?',
				defaultValue: self.rejectMemo ? self.rejectMemo : '',
				btnIconClass: 'icon-reject',
				btnVal: '拒绝',
				placeholder: '拒绝必须输入备注...',
				memorequired: true,
				onBtnClick: function onBtnClick(memo, callback) {
					self.rejectsubmit(e, type, memo, callback);
				},
				changeData: function changeData(value) {
					self.changeRefuseRemark(value[0]['defaultValue']);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}
		//订单备注修改

	}, {
		key: 'changeRefuseRemark',
		value: function changeRefuseRemark(value) {
			var dispatch = this.props.dispatch;
			dispatch({
				type: 'processdevice/changeData',
				payload: {
					refuseRemarks: value,
					confirmFlag: 'Refuse'
				}
			});
		}

		//拒绝订单提交

	}, {
		key: 'rejectsubmit',
		value: function rejectsubmit(e, type, memo, callback) {
			var self = this;
			(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/submitOrderInfo', {
				method: 'POST',
				body: JSON.stringify({
					param: {
						eid: eid,
						record: {
							updateDate: self.props.processdevice.updateDate,
							orderNumber: self.props.processdevice.orderNumber,
							orderState: self.props.processdevice.orderState,
							confirmFlag: 'Refuse',
							refuseRemarks: memo
						}
					}
				})
			}).then(function (resp) {
				if (resp.data.success) {
					// self.rejectMemo = memo;
					self.setState({ 'operationed': true });
					(0, _EpsModal.AlertBase)({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: function onOk() {
							jw.closeWebView();
						}
					});
				} else {
					if (typeof callback != 'undefined') {
						callback(true);
					}
					self.rejectMemo = memo;
					console.log("fail");
				}
			});
		}

		//餐厅确认 、doa 审批 确认

	}, {
		key: 'agree',
		value: function agree(e, type) {
			var self = this;
			var storeScrapList = self.props.processdevice['storeScrapList'];
			if (this.showScrapTip != 0 && storeScrapList.length == 0) {
				(0, _EpsModal.AlertBase)({
					tip: '请挑选资产！！',
					icon: 'icon-save-error',
					onOk: function onOk() {}
				});
				return;
			}
			var dispatch = this.props.dispatch;
			var data = this.props.processdevice;
			var orderid = this.props.params.orderid;
			var orderState = data.orderState;
			var epsDialog = (0, _EpsModal.MemoDialog)({
				title: '确认通过?',
				defaultValue: self.agreeMemo ? self.agreeMemo : '',
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
								updateDate: data["updateDate"],
								orderNumber: orderid,
								confirmFlag: true,
								orderState: orderState,
								refuseRemarks: memo || '',
								storeScrapList: self.props.processdevice['storeScrapList'] || []
							}
						}
					};
					self.approveSubmit(e, type, memo, callback);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}
		//拒绝评价

	}, {
		key: 'EvaluateRefuse',
		value: function EvaluateRefuse() {
			var orderid = this.props.params.orderid;
			console.log(this.props, "拒绝评价");
			var self = this;
			var processData = this.props.processdevice;
			var epsDialog = (0, _EpsModal.MemoDialog)({
				title: '是否拒绝该订单？',
				defaultValue: self.agreeMemo ? self.agreeMemo : '',
				btnIconClass: 'icon-reject',
				btnVal: '拒绝',
				placeholder: '拒绝必须输入备注...',
				changeData: function changeData() {},
				memorequired: true,
				onBtnClick: function onBtnClick(memo, callback) {
					setTimeout(function () {
						var saving = (0, _EpsModal.AlertBase)({
							tip: '正在提交',
							icon: 'icon-saving',
							okBtn: {
								text: '提交中...'
							},
							onOk: function onOk() {
								console.log('onOk');
							}
						});
						(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/submitStoreEvaluate', {
							method: 'POST',
							body: JSON.stringify({
								param: {
									eid: eid,
									record: {
										confirmFlag: 'Refuse',
										orderNumber: orderid,
										updateDate: self.props.processdevice.updateDate,
										orderState: '7',
										confirmRepairRmrk: memo
									}
								}
							})
						}).then(function (resp) {
							if (resp['data']['success'] == false) {
								if (typeof callback != 'undefined') {
									callback(true);
								}
							} else {
								saving.close();
								(0, _EpsModal.AlertBase)({
									tip: '已成功提交',
									icon: 'icon-save-success',
									onOk: function onOk() {
										jw.closeWebView();
									}
								});
							}
						});
					}, 500);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}

		// 餐厅确认 评分页面

	}, {
		key: 'EvaluateAgree',
		value: function EvaluateAgree(data) {
			var self = this;
			var storeScrapList = self.props.processdevice['storeScrapList'];
			if (this.showScrapTip != 0 && storeScrapList.length == 0) {
				(0, _EpsModal.AlertBase)({
					tip: '请挑选资产！！',
					icon: 'icon-save-error',
					onOk: function onOk() {}
				});
				return;
			}
			console.log(data, "餐厅评分");
			(0, _EpsModal.EvaluateDialog)({
				title: '请输入评价',
				btnIconClass: 'icon-check',
				btnVal: '确认',
				memorequired: false,
				formData: {
					schema: _.map(window.Evaluate, function (val, key) {
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
						name: 'confirmRepairRmrk', element: 'Textarea',
						defaultValue: typeof window.EvaluateCache != 'undefined' ? window.EvaluateCache['confirmRepairRmrk'] : '',
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
					for (var i in window.Evaluate) {
						if (data[i] == 0) {
							(0, _EpsModal.AlertBase)({
								tip: '请输入' + window.Evaluate[i] + '的评价!',
								icon: 'icon-save-error',
								onOk: function onOk() {}
							});
							return false;
						}
					}
					var hasOne = false;
					_.each(window.Evaluate, function (i, key) {
						if (data[key] <= 2) {
							hasOne = true;
						}
					});
					if (hasOne && data['confirmRepairRmrk'].length == 0) {
						(0, _EpsModal.AlertBase)({
							tip: '由于评星较低，请输入备注！！',
							icon: 'icon-save-error',
							onOk: function onOk() {}
						});
						return false;
					}
					// 	if(data['confirmRepairRmrk'].length==0){
					// 		AlertBase({
					// 	tip: '请输入备注!',
					// 	icon: 'icon-save-error',
					// 	onOk: ()=>{}
					// });
					// return false;
					// 	}
					return true;
				},
				onBtnClick: function onBtnClick(data, callback) {
					console.log(data, "data");
					var orderid = self.props.params.orderid;
					var updateDate = self.props.processdevice['updateDate'];
					setTimeout(function () {
						var saving = (0, _EpsModal.AlertBase)({
							tip: '正在提交评价',
							icon: 'icon-saving',
							okBtn: {
								text: '提交中...'
							},
							onOk: function onOk() {
								console.log('onOk');
							}
						});
						(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/submitStoreEvaluate', {
							method: 'POST',
							body: JSON.stringify({
								param: {
									eid: eid,
									record: _.extend({
										confirmFlag: 'Approve',
										orderNumber: orderid,
										updateDate: updateDate,
										orderState: '7',
										storeScrapList: self.props.processdevice['storeScrapList'] || []
									}, data)
								}
							})
						}).then(function (resp) {
							if (resp['data']['success'] == false) {
								if (typeof callback != 'undefined') {
									callback(true);
								}
							} else {
								saving.close();
								(0, _EpsModal.AlertBase)({
									tip: '已成功提交',
									icon: 'icon-save-success',
									onOk: function onOk() {
										jw.closeWebView();
									}
								});
							}
						});
					}, 500);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}

		//查看流程日志

	}, {
		key: 'openLog',
		value: function openLog() {
			var url = EpsWebRoot + '/#/log/' + this.props.params['orderid'];
			var data = this.props.processdevice;
			console.log(data, "log:data");
			data['logType'] = 'repair';
			window.upTabsData('log', 'cache', data);
			jw.pushWebView(url);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			jw.setFuncBtns([{ type: 4 }]);
			this.setHeight();
			var dispatch = this.props.dispatch;
			setTimeout(function () {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var header = $('.header').height() || 0;
				var footer = $('.footer').height() || 0;
				var money = $('.money-show').height() || 0;
				$('.main-c').css({ height: clientHeight - header - money - footer + 'px' });
				(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getEquipmentList', {
					method: 'POST',
					body: JSON.stringify({
						param: {
							eid: eid,
							condition: {
								orderNumber: self.props.params.orderid,
								orderState: self.props.processdevice.orderState
							},
							pager: { pageNum: '1' }
						}
					})
				}).then(function (resp) {
					if (resp['data']['success'] == false) {} else {
						NProgress.done();
						var _data = resp['data']['body'];
						console.log(_data, '1231231231231231231');
						var creatorinfo = {};
						creatorinfo.name = _data.createBy;
						creatorinfo.remark = _data.maintenanceRemarks;
						creatorinfo.time = _data.dateAppointment;
						creatorinfo.orderNumber = _data.orderNumber;
						creatorinfo.orderState = _data.orderState;
						creatorinfo.storeName = _data.storeName;
						creatorinfo.repairType = _data.repairType;
						var DeviceInfo = self.DevicePartList(_data);
						var FeeList = self.FeeList(_data);
						console.log(FeeList, "FeeList");
						console.log(DeviceInfo.PurchaseMoney, "DeviceInfo.PurchaseMoney");
						var orderMoney = DeviceInfo.PurchaseMoney + FeeList['carCost'] + FeeList['hotelCost'] + FeeList['otherCost'] + FeeList['installationFee'];
						// console.log('这个钱是多少啊a',orderMoney,DeviceInfo.PurchaseMoney,FeeList['carCost'],FeeList['hotelCost'],FeeList['otherCost'],FeeList['installationFee'],DeviceInfo.PurchaseMoney+FeeList['carCost']+FeeList['hotelCost']+FeeList['otherCost']+FeeList['installationFee'])
						var allkeys = _.keys(DeviceInfo.deviceList, "deviceList");
						var partList = [],
						    deviceList = [];
						_.each(_data['pageInfo']['list'], function (i) {
							if (i['partName']) {
								partList.push(i);
							} else {
								deviceList.push(i);
							}
						});

						var storeScrapList = [];
						_.each(_data['scrapPageInfo']['list'], function (i) {
							console.log(i, '这个里面有啥');
							if (_.findWhere(_data["pageInfo"]["list"], { deviceName: i['deviceName'] })) {
								storeScrapList.push(i);
							}
						});

						// console.log(storeScrapList,'zzzzzzzzzzzz');
						dispatch({
							type: 'processdevice/changeData',
							data: _.extend({
								loading: false,
								itemDevice: DeviceInfo.deviceList[allkeys[0]], //设备列表中的第一条数据
								creatorinfo: creatorinfo, //
								costList: _data.costList, //杂费列表
								incidentalList: _data.incidentalList,
								PurchaseMoney: self.turnMoney(DeviceInfo.PurchaseMoney) + DeviceInfo.PurchaseRate,
								FeeList: FeeList,
								DevicePartList: DeviceInfo.deviceList,
								orderMoney: orderMoney,
								orderState: _data.orderState,
								partList: partList,
								deviceList: deviceList,
								storeScrapList: storeScrapList
							}, resp['data']['body'])
						});

						(0, _constants.getUsers)(_data['createEid'], 'num', function (resp) {
							var userdata = resp['data'][0];
							dispatch({
								type: 'processdevice/changeData',
								data: {
									avatar: userdata['avatar']
								}
							});
						});
					}
				});
			}, 0);
			if (self.props.processdevice.type == '4') {
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
					window.Evaluate = resp['data']['body'];
				});
			}
			window.onJwNavBtnClick = function (data) {
				if (data['type'] == '4') {
					var modelData = self.props.processdevice;
					(0, _constants.openChart)(eid, modelData['orderNumber'], '测试');
				}
			};
			PubSub.subscribe('add:scrapped', function (evt, data) {
				dispatch({ type: 'processdevice/changeData', data: {
						storeScrapList: _.map(data, function (i) {
							return i;
						})
					} });
			});
			NProgress.done();
			var data = this.props.processdevice;
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
				// let top = $('.div-sticky').height() || 0;
				// let upload = $('.upload-file').height()||0;
				// 
				var footer = $('.eps-footer').height() || 0;
				console.log(clientHeight, header, top, footer, upload);
				// $('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
				$('.root-container.device').css({ height: clientHeight + 'px' });
			}, 0);
		}
		//

	}, {
		key: 'turnMoney',
		value: function turnMoney(data) {
			return Number(data).formatMoney(2, '', '');
		}
		//重组设备配件列表

	}, {
		key: 'DevicePartList',
		value: function DevicePartList(data) {
			var devicepartlist = data.pageInfo.list;
			var deviceList = {};
			console.log(devicepartlist, "devicepartlist");
			_.each(devicepartlist, function (item) {
				console.log(item, "item");
				if (item && !item.partName) {
					var deviceObj = _.extend({}, item);
					deviceObj.partList = [];
					deviceList[item.deviceNumber] = deviceObj;
				}
			});
			var PurchaseMoney = 0;
			var partList = _.filter(data.pageInfo.list, function (item) {
				return item.partName;
			});
			console.log(partList, "partList");
			var PurchaseRate = ' (-)';
			var rate = '';
			if (partList.length > 0) {
				// PurchaseRate=partList[0]['rate'];
				console.log(partList, PurchaseRate, "PurchaseRatezzzzzzzzzz");
				partList = _.filter(partList, function (i) {
					if (i['operate'] == '2') {
						PurchaseRate = PurchaseRate == ' (-)' ? PurchaseRate : ' (' + PurchaseRate + ')';
						PurchaseMoney = i.totalMaintenanceCost + PurchaseMoney - 0;
						deviceList[i.deviceNumber]['partList'].push(i);
					}
					return i['operate'] == '2';
				});
				_.each(partList, function (item, index) {
					if (index == 0) {
						rate = partList[0]['rate'];
						PurchaseRate = ' (' + partList[0]['rate'] + ')';
					} else {
						if (item.rate == rate) {
							// PurchaseRate=item.rate;
						} else {
							PurchaseRate = ' (-)';
						}
					}
				});
			} else {
				PurchaseRate = '(-)';
			}
			console.log(PurchaseRate, "PurchaseRate");
			return { deviceList: deviceList, PurchaseMoney: Math.floor(PurchaseMoney * 100) / 100, PurchaseRate: PurchaseRate };
		}
		// 费用列表

	}, {
		key: 'FeeList',
		value: function FeeList(data) {
			var self = this;
			var carCost = 0;
			var hotelCost = 0;
			var otherCost = 0;
			var installationFee = 0;
			var otherCostTax = '';
			var hotelCostTax = '';
			var carCostTax = '';
			var installationFeeRate = '';
			console.log(data, "data");
			_.map(data.incidentalList, function (item, index) {
				var ItemData = _.findWhere(data['pageInfo']['list'], { deviceNumber: item['deviceNumber'] }) || {};
				console.log(item, "ItemData");
				if (item.otherCostTax && item.otherCost) {
					otherCostTax = item.otherCostTax;
					if (index < 1) {
						otherCostTax = item.otherCostTax;
					} else {
						if (otherCostTax == item.otherCostTax) {
							otherCostTax = item.otherCostTax;
						} else {
							otherCostTax = '-';
						}
					}
				} else {
					otherCostTax = '-';
				}
				if (item.hotelCostTax && item.hotelCostTax != '0') {
					if (index < 1) {
						hotelCostTax = item.hotelCostTax;
					} else {
						if (hotelCostTax == item.hotelCostTax) {
							hotelCostTax = item.hotelCostTax;
						} else {
							hotelCostTax = '-';
						}
					}
				} else {
					hotelCostTax = '-';
				}
				if (item.carCostTax && item.carCostTax != '0') {
					if (index < 1) {
						carCostTax = item.carCostTax;
					} else {
						if (carCostTax == item.carCostTax) {
							carCostTax = item.carCostTax;
						} else {
							carCostTax = '-';
						}
					}
				} else {
					carCostTax = '-';
				}
				if (item.installationFeeRate && item.installationFee != '0') {
					if (index < 1) {
						installationFeeRate = item.installationFeeRate;
					} else {
						if (installationFeeRate == item.installationFeeRate) {
							installationFeeRate = item.installationFeeRate;
						} else {
							installationFeeRate = '-';
						}
					}
				} else {
					installationFeeRate = '-';
				}
				carCost = item.carCost + carCost;
				hotelCost = item.hotelCost + hotelCost;
				otherCost = item.otherCost + otherCost;
				installationFee = item.installationFee + installationFee;
			});
			return {
				carCost: carCost,
				hotelCost: hotelCost,
				otherCost: otherCost,
				installationFee: installationFee,
				otherCostTax: otherCostTax,
				carCostTax: carCostTax,
				hotelCostTax: hotelCostTax,
				installationFeeRate: installationFeeRate
			};
		}
	}]);

	return Process;
}(_react.Component);

function mapStateToProps(state) {

	var type = state.routing.locationBeforeTransitions.query.type,
	    sta = state.routing.locationBeforeTransitions.query.sta;
	state.processdevice.type = type;
	var title = '';
	if (isUnfinishedOrHistory()) {
		title = sta == '1' ? '在途订单' : '历史订单';
	} else {
		//1:餐厅待确认
		//2：DOA审批
		//3：审批未通过，餐厅再次审批
		//4：餐厅确认订单，评价	let title;
		//100：详情	let title;
		switch (type) {
			case '1':
				title = "评估确认";
				break;
			case '2':
				title = "DOA审批";
				break;
			case '3':
				title = "调整后审批";
				break;
			case '4':
				title = "调整与评估";
				break;
			case '100':
				title = "订单详情";
				break;
			default:
				title = '';
				break;
		}
	}

	jw.setTitle({ title: title });

	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Process);

/***/ }),

/***/ 1896:
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
  namespace: 'processdevice',
  state: {
    loading: true,
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
    },
    refuseRemarks: '',
    confirmFlag: 'Approve',
    orderMoney: '1000',
    avatar: {
      avatar_l: 'https://www.joywok.com/public/images/avatar/l.jpg',
      avatar_s: 'https://www.joywok.com/public/images/avatar/s.jpg'
    }
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