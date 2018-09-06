webpackJsonp([51],{

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

/***/ 1833:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoreInfo = getStoreInfo;
exports.getStoreListByVendor = getStoreListByVendor;
exports.getDeviceListByStore = getDeviceListByStore;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 获取餐厅评价信息 && DOA审批信息
// {
//    "eid": "用户id",
//    "condition":{
//          "keys":"关键字",
//          "vendorNumber":"供应商id"
//     },
//     "pager": {
//        "pageNum": "当前页",
//        "pageSize": "每页条数"
//     }
// }
// 新店／改造IT 接口（非GC）
function getStoreInfo(params) {
  console.log('getStoreInfo  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/getStoreInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取供应商BY餐厅列表
// {
//   "eid": "E5001179",
//   "condition: {
//     "orderNumber": "PP171674",
//     "vendorNumber": "451",
//     "vendorType": "1"
//   },
//   "pager": {
//     "pageNum": 1,
//     "pageSize": 200
//   }
// }
function getStoreListByVendor(params) {
  console.log('getStoreListByVendor  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/getStoreListByVendor', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取餐厅BY设备列表
// {
//   "eid": "E5001179",
//   "condition: {
//     "orderNumber": "PP171674",
//     "vendorNumber": "451",
//     "storeNumber": "451",
//     "vendorType": "1"
//   },
//   "pager": {
//     "pageNum": 1,
//     "pageSize": 200
//   }
// }
function getDeviceListByStore(params) {
  console.log('getDeviceListByStore  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/getDeviceListByStore', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

/***/ }),

/***/ 1905:
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

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

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
   * 需求阶段的餐厅列表（Local PM拒绝，DOA审批）
   * 路由：/newstoreit/pmstore-list/:orderid/:vendorNumber/:vendorType
   * 
   */

var PMStoreList = function (_Component) {
	_inherits(PMStoreList, _Component);

	function PMStoreList(props) {
		_classCallCheck(this, PMStoreList);

		var _this = _possibleConstructorReturn(this, (PMStoreList.__proto__ || Object.getPrototypeOf(PMStoreList)).call(this, props));

		_this.gotoInfoList = _this.gotoInfoList.bind(_this);
		return _this;
	}
	// 页面渲染


	_createClass(PMStoreList, [{
		key: 'render',
		value: function render() {
			var data = this.props.pmstorelist;
			var view = this._init_view();
			if (data.loading['loading']) {
				return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, "\u52A0\u8F7D\u4E2D"));
			} else {
				return _react2.default.createElement('div', { className: 'root-container' }, view);
			}
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name, length) {
			var len = length ? length : 8;
			if ((0, _constants.DataLength)(name) > len) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'turnMoney',
		value: function turnMoney(data) {
			return Number(data).formatMoney(2, '', '');
		}
	}, {
		key: 'gotoInfoList',
		value: function gotoInfoList(itemdata) {
			console.log('gotoInfoList=====');
			// /newstoreit/pminfo-list/:orderid/:vendorNumber/:storeNumber/:vendorType
			var url = EpsWebRoot + '/#newstoreit/pminfo-list/' + this.props.params.orderid + '/' + this.props.params.vendorNumber + '/' + itemdata['storeNumber'] + '/' + this.props.params.vendorType;
			jw.pushWebView(url);
		}
		// 初始化页面

	}, {
		key: '_init_view',
		value: function _init_view() {
			var _this2 = this;

			var self = this;
			var view = '';
			var data = this.props.pmstorelist;
			console.log('rrrrrr', data);
			this.curPageNum = data.pager ? data.pager.pageNum : 1;
			// 组织加载更多
			var LoadMoreHtml = '';
			if (data.total < _constants.PAGE_SIZE) {
				LoadMoreHtml = "";
			} else if (data.noMore) {
				LoadMoreHtml = _react2.default.createElement('div', { className: 'noMore-Data' }, "\u6CA1\u6709\u66F4\u591A\u4E86");
			} else {
				LoadMoreHtml = _react2.default.createElement(_LoadMore2.default, { data: {
						hide: data['loading']['hide'],
						fix: data['loading']['fix'],
						loading: data['loading']['loading']
					},
					container: 'it-details',
					onEndReached: function onEndReached(e) {
						_this2.onEndReached(e);
					} });
			}
			var isTsi = data.isTsi;
			// 组织list view
			var listView = void 0;
			if (data.list == 'firstenter') {} else if (data.list && typeof data.list != 'string' && data.list.length > 0) {
				console.log('store:========:=======', data.list);
				listView = _react2.default.createElement('ul', { className: '' }, data.list.map(function (item, key) {
					return _react2.default.createElement('div', { className: "eps-list-card eps-project animated zoomIn eps-bookmark-wrap", onClick: function onClick() {
							self.gotoInfoList(item);
						} }, _react2.default.createElement('div', { className: 'todo-card-index' }, key + 1 || 0, '/', data.total || 0), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u9910\u5385\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.storeName);
						} }, item.storeName))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u9910\u5385\u7F16\u53F7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, item.storeNumber ? item.storeNumber : '-'))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u6240\u5728\u5730\u5740")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.provinceNameCn + '' + item.cityNameCn);
						} }, item.provinceNameCn + '' + item.cityNameCn)))), !isTsi && _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u603B\u4EF7(\xA5)")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.priceall + '¥', 6);
						} }, _this2.turnMoney(item.priceall), ' \xA5')))), isTsi && _react2.default.createElement('div', { className: 'project-it-text border-line-h before' }, _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u9EA6\u5F53\u52B3\u91C7\u8D2D\u603B\u4EF7(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.mdcSumCost + '¥', 6);
						} }, self.turnMoney(item.mdcSumCost), ' \xA5')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "TSI\u91C7\u8D2D\u603B\u4EF7(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.tsiSumCost + '¥', 6);
						} }, self.turnMoney(item.tsiSumCost), ' \xA5')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u9910\u5385\u91C7\u8D2D\u603B\u4EF7(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.eqPriceAll + '¥', 6);
						} }, self.turnMoney(item.eqPriceAll), ' \xA5')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u4EBA\u5DE5\u8D39(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.labourCost + '¥', 6);
						} }, self.turnMoney(item.labourCost), ' \xA5')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u5DEE\u65C5\u8D39(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.travelExpensesNotax + '¥', 6);
						} }, self.turnMoney(item.travelExpensesNotax), ' \xA5 ')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u5DEE\u65C5\u8D39(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.travelExpenses + '¥', 6);
						} }, self.turnMoney(item.travelExpenses), ' \xA5 (', item.travelExpensesTax || '-', ')')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u7279\u6279\u8D39\u7528(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.special + '¥', 6);
						} }, self.turnMoney(item.special), ' \xA5')), _react2.default.createElement('div', { className: 'project-it-cell space-b' }, _react2.default.createElement('div', { className: 'project-it-flex w60' }, "\u6574\u5355\u603B\u4EF7(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'project-it-flex', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(item.priceall + '¥', 6);
						} }, self.turnMoney(item.priceall), ' \xA5'))));
				}));
			} else {
				listView = _react2.default.createElement(_EmptyView2.default, { tip: '暂无数据' });
			}
			// 组织显示内容
			view = _react2.default.createElement('div', { className: 'root-container-w eps-project-storelist-container' }, _react2.default.createElement('header', { className: 'header header-with-memo xheight header-adapt', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement('div', { className: 'header-bg-2-adapt' }))), _react2.default.createElement('sesstion', { className: 'main ' }, _react2.default.createElement('div', { className: 'main-c todo-info-it it-details' }, listView, LoadMoreHtml)));
			return view;
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var self = this;
			this.setHeight();
		}

		// 获取列表信息

	}, {
		key: 'getStoreInfo',
		value: function getStoreInfo(nextPageNum) {
			var self = this;
			var dispatch = this.props.dispatch;
			nextPageNum = nextPageNum ? nextPageNum : 1;

			dispatch({
				type: 'pmstorelist/getStoreListByVendor',
				payload: {
					condition: {
						orderNumber: this.props.params.orderid,
						vendorNumber: this.props.params.vendorNumber,
						vendorType: this.props.params.vendorType
					},
					pager: {
						pageNum: nextPageNum,
						pageSize: _constants.PAGE_SIZE
					}
				}
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			NProgress.done();

			var self = this;
			var dispatch = this.props.dispatch;
			self.setHeight();

			var orderid = this.props.params.orderid;
			//首次加载数据
			setTimeout(function () {
				self.getStoreInfo();
			}, 0);
		}

		//上拉加载更多回调

	}, {
		key: 'onEndReached',
		value: function onEndReached(e) {
			var dispatch = this.props.dispatch;
			var pageNum = this.props.pmstorelist.pageNum;
			dispatch({
				type: "pmstorelist/changeData",
				payload: {
					noMore: false,
					fix: true
				}
			});
			this.getStoreInfo(this.curPageNum + 1);
		}
	}, {
		key: 'setHeight',
		value: function setHeight() {
			var self = this;
			setTimeout(function () {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var header = $('.header').height() || 0;
				$('.it-details').css({ height: clientHeight - header - 10 + 'px' });
			}, 0);
		}
	}]);

	return PMStoreList;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(PMStoreList);

/***/ }),

/***/ 1960:
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
}; /*
    * 需求阶段的餐厅列表（Local PM拒绝，DOA审批）的model
    */

var _NewStoreIT = __webpack_require__(1833);

var ApprovalService = _interopRequireWildcard(_NewStoreIT);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
  namespace: 'pmstorelist',
  state: {
    loading: {
      loading: true,
      fix: true,
      hide: false
    },
    list: 'firstenter',
    pageNum: 1,
    size: 10,
    total: 0,
    noMore: false,
    originaldata: {} // 原始数据
  },
  reducers: {
    changeData: function changeData(state, action) {
      // console.log('pmstorelist changeData:=========',action,action.payload)
      return _extends({}, state, action.payload);
    }
  },
  effects: {
    // 获取供应商BY餐厅列表
    getStoreListByVendor: /*#__PURE__*/regeneratorRuntime.mark(function getStoreListByVendor(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put,
          select = _ref2.select;

      var _ref3, data, reset, datas, newlist;

      return regeneratorRuntime.wrap(function getStoreListByVendor$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context.next = 4;
              return call(ApprovalService.getStoreListByVendor, payload);

            case 4:
              _ref3 = _context.sent;
              data = _ref3.data;

              console.log('gatData', data);

              if (!data.success) {
                _context.next = 16;
                break;
              }

              reset = true;
              _context.next = 11;
              return select();

            case 11:
              datas = _context.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              newlist = reset ? data.body["pageinfo"]["list"] : datas["pmstorelist"]['list'].concat(data.body["pageinfo"]["list"]);
              _context.next = 16;
              return put({
                type: 'changeData',
                payload: {
                  list: newlist,
                  loading: false,
                  noMore: data.body["pageinfo"]["pageNum"] * payload['pager']['pageSize'] >= data.body["pageinfo"]['total'] ? false : true,
                  total: data.body["pageinfo"] ? data.body["pageinfo"]['total'] : newlist.length,
                  originaldata: data.body,
                  pager: {
                    pageNum: data.body["pageinfo"]["pageNum"] ? data.body["pageinfo"]["pageNum"] : 1,
                    pages: data.body["pageinfo"]["pages"] ? data.body["pageinfo"]["pages"] : 1
                  },
                  isTsi: data.body["isTsi"]
                }
              });

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, getStoreListByVendor, this);
    })
  },
  subscriptions: {}
};

/***/ })

});