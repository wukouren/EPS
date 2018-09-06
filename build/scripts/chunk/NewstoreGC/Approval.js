webpackJsonp([26],{

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

/***/ 1879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

__webpack_require__(208);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dva = __webpack_require__(196);

var _MoneyShowItem = __webpack_require__(1531);

var _MoneyShowItem2 = _interopRequireDefault(_MoneyShowItem);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _EpsModal = __webpack_require__(198);

var _constants = __webpack_require__(197);

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
	}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 创建非项目订单（含设备／工程／IT）
   */

var Item = _list2.default.Item;

var Approval = function (_Component) {
	_inherits(Approval, _Component);

	function Approval() {
		_classCallCheck(this, Approval);

		return _possibleConstructorReturn(this, (Approval.__proto__ || Object.getPrototypeOf(Approval)).apply(this, arguments));
	}

	_createClass(Approval, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'changeData',
		value: function changeData(data) {}
	}, {
		key: 'openFileView',
		value: function openFileView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.store;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'turnMoney',
		value: function turnMoney(data) {
			return Number(data).formatMoney(2, '', '');
		}
	}, {
		key: 'NameInfoSpecail',
		value: function NameInfoSpecail(name) {
			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.store;
			console.log('rrr', data);
			var strOrderSta = data['orderState'] && _constants.orderStatus["newstoregc"][data['orderState']] ? _constants.orderStatus["newstoregc"][data['orderState']] : { 'label': '-', val: '-' };
			var btn = '';
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			if (data['loading']['loading']) {
				btn = _react2.default.createElement('div', { className: 'todo-info-status' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small' }, '\u52A0\u8F7D\u4E2D\u2026'));
			} else {
				if (isUnfinishedOrHistory()) {
					btn = _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
							return _this2.openView('/approval');
						} }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"])));
				} else {
					btn = _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
							return _this2.reject(e);
						} }, '\u62D2\u7EDD'), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
							return _this2.agree(e);
						} }, '\u901A\u8FC7'));
				}
			}
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header clear-margin specail', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c eps-nonproject-approval' }, _react2.default.createElement('div', { className: 'maintenance-card animated zoomIn' }, _react2.default.createElement('div', { className: 'maintenance-card-c' }, _react2.default.createElement('div', { className: 'maintenance-card-title' }, _react2.default.createElement('i', null), _react2.default.createElement('div', { className: 'maintenance-card-t-v' }, '\u65B0\u5E97CG'), _react2.default.createElement('div', { className: 'maintenance-card-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, data['createDate']))), _react2.default.createElement('div', { className: 'maintenance-card-info' }, _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, '\u9910\u5385\u540D\u79F0'), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["storeName"] || '-')), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, '\u9910\u5385\u7F16\u53F7'), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["usCode"] || '-')), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, '\u8BA2\u5355\u7F16\u53F7'), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["orderNumber"] || '-')), _react2.default.createElement('div', { className: 'maintenance-card-i hide' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, '\u5907\u6CE8'), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, '\u4E0A\u6D77\u6D66\u4E1C\u5E97\u53D1\u8D77GC\u9700\u6C42\uFF0C\u8BE6\u60C5\u5DF2\u5907\u6CE8\uFF0C\u8BF7\u67E5\u770B'))))), _react2.default.createElement('div', { className: 'gc-card-list' }, _.map(data['list'], function (i) {
				console.log(i, 'zzzzzzzzzzzzz');
				return _react2.default.createElement('div', { className: 'gc-item-card' }, _react2.default.createElement('div', { className: 'gc-item-card-c' }, _react2.default.createElement('div', { className: 'gc-item-card-h' }, _react2.default.createElement('div', { className: 'gc-item-card-label' }, 'GC\u5DE5\u7A0B\u62A5\u4EF7\u5355\u6A21\u7248')), _react2.default.createElement('div', { className: 'gc-item-card-info' }, _react2.default.createElement('div', { className: 'gc-item-card-i' }, _react2.default.createElement('div', { className: 'gc-item-card-sep', onClick: function onClick() {
						return self.NameInfoSpecail('金额(不含税)：' + self.turnMoney(i['costNotax'] || 0));
					} }, _react2.default.createElement('div', { className: 'gc-item-card-label ellipsis' }, '\u91D1\u989D(\u4E0D\u542B\u7A0E)'), _react2.default.createElement('div', { className: 'gc-item-card-val ellipsis' }, self.turnMoney(i['costNotax'] || 0))), _react2.default.createElement('div', { className: 'gc-item-card-sep' }, _react2.default.createElement('div', { className: 'gc-item-card-label' }, '\u7A0E\u7387'), _react2.default.createElement('div', { className: 'gc-item-card-val ellipsis' }, i['rate'] || '-'))), _react2.default.createElement('div', { className: 'gc-item-card-i' }, _react2.default.createElement('div', { className: 'gc-item-card-sep', onClick: function onClick() {
						return self.NameInfoSpecail('税额：' + self.turnMoney(i['taxes'] || 0));
					} }, _react2.default.createElement('div', { className: 'gc-item-card-label' }, '\u7A0E\u989D'), _react2.default.createElement('div', { className: 'gc-item-card-val ellipsis' }, self.turnMoney(i['taxes'] || 0))), _react2.default.createElement('div', { className: 'gc-item-card-sep', onClick: function onClick() {
						return self.NameInfoSpecail('价税合计：' + self.turnMoney(i['cost'] || 0));
					} }, _react2.default.createElement('div', { className: 'gc-item-card-label' }, '\u4EF7\u7A0E\u5408\u8BA1'), _react2.default.createElement('div', { className: 'gc-item-card-val ellipsis' }, self.turnMoney(i['cost'] || 0)))))));
			})), _react2.default.createElement('div', { className: 'eps-box-wrap eps-box-item animated zoomIn hide' }, _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), _react2.default.createElement('div', { className: 'eps-box' }, _react2.default.createElement('div', { className: 'purchase-box-title' }, _react2.default.createElement('font', null, 'Business Case')), _react2.default.createElement('div', { className: 'purchase-show' }, _react2.default.createElement(_list2.default, { className: 'my-list jw-list' }, _react2.default.createElement(Item, { extra: "¥ " + 10000, onClick: function onClick() {} }, '\u9884\u4F30\u56FA\u5B9A\u8D44\u4EA7\u6295\u8D44\u603B\u91D1\u989D'), _react2.default.createElement(Item, { extra: "¥ " + 10000, onClick: function onClick() {} }, '\u9884\u8BA1\u65E7\u8D44\u4EA7\u62A5\u5E9F'), _react2.default.createElement(Item, { extra: "¥ " + 10000, onClick: function onClick() {} }, '\u662F\u5426\u589E\u52A0\u9500\u552E\u989D\uFF1F'), _react2.default.createElement(Item, { extra: "¥ " + 10000, onClick: function onClick() {} }, '\u9884\u8BA1\u589E\u52A0\u9500\u552E\u989D'), _react2.default.createElement(Item, { extra: "¥ " + 10000, onClick: function onClick() {} }, '\u9884\u8BA1\u589E\u52A0\u5E74\u5229\u6DA6\u989D'), _react2.default.createElement(Item, { extra: "¥ " + 10000, onClick: function onClick() {} }, '\u9884\u8BA1\u6295\u8D44\u56DE\u62A5\u7387(ROI%)'))))))), _react2.default.createElement(_MoneyShowItem2.default, { data: {
					money: data["orderMoney"] || 0
				}, showText: true, styleClass: 'specail-fix' }), _react2.default.createElement('div', { className: 'file-num-specail border-line-h before', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('i', { className: 'icon-file' }), _react2.default.createElement('span', { className: 'preview-file' }, '\u67E5\u770B\u9644\u4EF6', data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : '')), _react2.default.createElement(_LoadMore2.default, { data: data['loading'] }), _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openView('/log');
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, '\u6D41\u7A0B\u65E5\u5FD7')), btn)));
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var modelData = this.props.store;
			var dispatch = this.props.dispatch;
			var orderid = this.props.params.orderid.split("&")[0];
			dispatch({ type: 'store/fetch', payload: orderid, dispatch: dispatch });
			this.setHeight();
			if (JWReady == true) {
				jw.setFuncBtns([{ type: 4 }]);
			} else {
				window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
					jw.setFuncBtns([{ type: 4 }]);
				});
			}
			window.onJwNavBtnClick = function (data) {
				if (data['type'] == '4') {
					var _modelData = self.props.store;
					(0, _constants.openChart)(_modelData['creaeBy'], _modelData['orderNumber'], '测试');
				}
			};
			if (isUnfinishedOrHistory()) {} else {
				if (modelData['type'] == '1') {
					jw.setTitle({ title: 'DOA审批' });
				} else {
					jw.setTitle({ title: '调整后审批' });
				}
			}
			setTimeout(function () {
				self.setHeight();
			}, 200);
		}
	}, {
		key: 'setHeight',
		value: function setHeight() {
			var self = this;
			setTimeout(function () {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				// let header = $('.maintenance-card').height() ||0;
				var money = $('.money-show-item').height() || 0;
				var footer = $('.footer').height() || 0;
				var file = $('.file-num-specail').height() || 0;
				$('.main-c').css({ height: clientHeight - money - footer - file - 30 + 'px' });
			}, 0);
		}
	}, {
		key: 'openView',
		value: function openView(data) {
			var datas = this.props.store;
			var url = EpsWebRoot + '/#' + data + '/' + datas["orderNumber"];
			datas['logType'] = 'newstoregc';
			window.upTabsData('log', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'reject',
		value: function reject() {
			var self = this;
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.store;
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
			var modelData = this.props.store;
			var epsDialog = (0, _EpsModal.MemoDialog)({
				title: '请输入备注！',
				btnVal: '完成',
				placeholder: '请输入备注...',
				changeData: function changeData() {},
				memorequired: false,
				onBtnClick: function onBtnClick(memo, callback) {
					var datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderNumber: modelData["orderNumber"],
								approveFlg: 'PASS',
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
		key: 'upData',
		value: function upData(data) {
			var url = '';
			var modelData = this.props.store;
			if (modelData['type'] == '1') {
				url = '/McdEpsApi/joywok/gc/submitOrder';
			} else {
				url = '/McdEpsApi/joywok/gc/submitAddOrder';
			}
			(0, _EpsRequest2.default)(url, {
				method: 'POST',
				body: JSON.stringify(data)
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
		}
	}]);

	return Approval;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	var hash = window.location.hash.split('?').length != 0 ? window.location.hash.split('?')[1].split('&') : [];
	var nowHash = {};
	_.each(hash, function (i) {
		var split = i.split('=');
		nowHash[split[0]] = split[1];
	});
	state['store']['type'] = nowHash['type'];
	return state;
})(Approval);

/***/ }),

/***/ 1893:
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
  var url = '/McdEpsApi/joywok/gc/getOrderInfo';
  return (0, _EpsRequest2.default)(url, {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: parame
        }
      }
    })
  });
}
exports.default = {
  namespace: 'store',
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
              type = datas['store']['type'];
              _context.next = 6;
              return call(firstFetch, payload, type);

            case 6:
              firstData = _context.sent;

              console.log(firstData["data"]['body'], '请求回来的数据');
              loading = datas["store"]['loading'];

              loading['loading'] = false;
              loading['hide'] = true;
              allData = _.extend({
                loading: loading
              }, firstData["data"]['body'], {});

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