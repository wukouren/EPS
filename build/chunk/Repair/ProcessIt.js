webpackJsonp([17],{

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

/***/ 1838:
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

var _RepairIt = __webpack_require__(1839);

var ITService = _interopRequireWildcard(_RepairIt);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function FirstFetch(parame) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getEquipmentList', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: parame
        },
        pager: { 'pageNum': '1', 'pageSize': '1000' }
      }
    })
  });
}
function SecondFetch(parame) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getCOOrderInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: parame
        },
        pager: { 'pageNum': '1', 'pageSize': '1' }
      }
    })
  });
}
function getEvaluate(param) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getEvaluate', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: param
        }
      }
    })
  });
}
exports.default = {
  namespace: 'process',
  state: {
    avatar: {
      avatar_l: 'https://www.joywok.com/public/images/avatar/l.jpg',
      avatar_s: 'https://www.joywok.com/public/images/avatar/s.jpg'
    },
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
    },
    epsTip: {
      show: true
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
      var datas, secondData, type, loading, partList, deviceList, allData;
      return regeneratorRuntime.wrap(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return select();

            case 2:
              datas = _context.sent;
              _context.next = 5;
              return call(SecondFetch, payload);

            case 5:
              secondData = _context.sent;
              type = datas["process"]['type'];
              loading = datas["process"]['loading'];

              loading['loading'] = false;
              loading['hide'] = true;
              partList = [];
              deviceList = [];

              _.each(secondData['data']['body']["detailList"].length == 0 ? secondData['data']['body']["orderList"] : secondData['data']['body']["detailList"], function (i) {
                partList.push(i);
              });
              // if()
              allData = _.extend({
                loading: loading,
                partList: partList,
                storeScrapList: secondData['data']['body']['scrapPageInfo'] ? secondData['data']['body']['scrapPageInfo']['list'] : []
              }, secondData['data']['body'], {
                list: secondData['data']['body']["detailList"].length == 0 ? secondData['data']['body']["orderList"] : secondData['data']['body']["detailList"]
                // list:(secondData['data']['body']["detailList"])//上面的代码存疑，开始说读取orderList里面的
              });

              console.log(secondData['data']['body'], '这个里面返回什么数据呢');
              (0, _constants.getUsers)(allData['storeMan'], 'num', function (resp) {
                var userdata = resp['data'][0];
                dispatch({
                  type: 'process/changeData',
                  payload: {
                    avatar: userdata['avatar']
                  }
                });
              });
              NProgress.done();
              _context.next = 19;
              return put({
                type: 'changeData',
                payload: allData
              });

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, fetch, this);
    }),
    getITOrderInfo: /*#__PURE__*/regeneratorRuntime.mark(function getITOrderInfo(_ref3, _ref4) {
      var payload = _ref3.payload,
          dispatch = _ref3.dispatch;
      var call = _ref4.call,
          put = _ref4.put,
          select = _ref4.select;
      var datas, secondData, loading, partList, deviceList, storeScrapList, allData;
      return regeneratorRuntime.wrap(function getITOrderInfo$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return select();

            case 2:
              datas = _context2.sent;
              _context2.next = 5;
              return call(ITService.getITOrderInfo, payload);

            case 5:
              secondData = _context2.sent;
              loading = datas["process"]['loading'];

              loading['loading'] = false;
              loading['hide'] = true;
              partList = [];
              deviceList = [];

              _.each(secondData['data']['body']['costList'], function (i) {
                if (i['partsName']) {
                  partList.push(i);
                } else {
                  deviceList.push(i);
                }
              });
              if (datas["process"]['processType'] == 'it') {
                _.each(partList, function (i) {
                  var device = _.findWhere(secondData['data']['body']['pageInfo']['list'], { itDeviceName: i['itDeviceName'], itDeviceNumber: i['itDeviceNumber'] });
                  if (device) {
                    i['faCategory'] = device["faCategory"];
                    i['subCategory'] = device["subCategory"];
                  }
                });
              } else {
                _.each(partList, function (i) {
                  var device = _.findWhere(secondData['data']['body']['pageInfo']['list'], { deviceName: i['deviceName'], deviceNumber: i['deviceNumber'] });
                  if (device) {
                    i['faCategory'] = device["faCategory"];
                    i['subCategory'] = device["subCategory"];
                  }
                });
              }
              storeScrapList = [];

              if (datas['process']['type'] == '1' || datas['process']['type'] == '4') {
                if (datas["process"]['processType'] == 'it') {
                  _.each(secondData['data']['body']['scrapPageInfo']['list'], function (i) {
                    if (_.findWhere(secondData['data']['body']["pageInfo"]["list"], { itDeviceName: i['deviceName'] })) {
                      storeScrapList.push(i);
                    }
                  });
                } else {
                  _.each(secondData['data']['body']['scrapPageInfo']['list'], function (i) {
                    if (_.findWhere(secondData['data']['body']["pageInfo"]["list"], { deviceName: i['deviceName'] })) {
                      storeScrapList.push(i);
                    }
                  });
                }
              } else {
                storeScrapList = secondData['data']['body']['scrapPageInfo']['list'];
              }

              allData = _.extend({
                loading: loading,
                partList: partList,
                deviceList: deviceList,
                storeScrapList: storeScrapList
              }, secondData['data']['body']);

              console.log(datas, allData, '12312312312312313');
              // 获取用户头像
              (0, _constants.getUsers)(allData['createEid'], 'num', function (resp) {
                var userdata = resp['data'][0];
                dispatch({
                  type: 'process/changeData',
                  payload: {
                    avatar: userdata['avatar']
                  }
                });
              });
              NProgress.done();
              _context2.next = 21;
              return put({
                type: 'changeData',
                payload: allData
              });

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, getITOrderInfo, this);
    })
  },
  subscriptions: {}
};

/***/ }),

/***/ 1839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTSIInfo = getTSIInfo;
exports.getITOrderInfo = getITOrderInfo;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 获取TSI信息
// 维修流程－IT 接口
function getTSIInfo() {
  console.log('getTSIInfo  eid:====', eid);
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getTSIInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: eid
      }
    })
  });
}

// TSI确认订单&填写订单维修明细 获取订单信息   http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/repair/getITOrderInfo   
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""orderNumber"": ""订单编号""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
function getITOrderInfo(params) {
  console.log('getITOrderInfo eid:====', eid, params);
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getITOrderInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

/***/ }),

/***/ 1844:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EpsCosts = undefined;

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

var _popup = __webpack_require__(1849);

var _popup2 = _interopRequireDefault(_popup);

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
   * 费用明细
   */

__webpack_require__(1871);

var isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
var maskProps = void 0;
if (isIPhone) {
  maskProps = {
    onTouchStart: function onTouchStart(e) {
      return e.preventDefault();
    }
  };
}

var EpsCostsDlg = function (_Component) {
  _inherits(EpsCostsDlg, _Component);

  function EpsCostsDlg() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EpsCostsDlg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EpsCostsDlg.__proto__ || Object.getPrototypeOf(EpsCostsDlg)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      sel: ''
    }, _this.onClose = function (sel) {
      _this.setState({ sel: sel });
      _popup2.default.hide();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EpsCostsDlg, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', { className: 'eps-popup-c' }, _react2.default.createElement('div', { className: 'eps-popup-header' }, _react2.default.createElement('div', { className: 'eps-dialog-title', onClick: function onClick() {
          return _this2.onClose('cancel');
        } }, _react2.default.createElement('div', { className: 'eps-dialog-title-c' }, _react2.default.createElement('h3', null, this.props.title)), _react2.default.createElement('div', { className: 'icon-close-b' }))), _react2.default.createElement('div', { className: 'eps-popup-list' }, _react2.default.createElement('div', { className: 'eps-popup-list-item-c' }, this.props.body)));
    }
  }]);

  return EpsCostsDlg;
}(_react.Component);

;

var EpsCosts = exports.EpsCosts = function EpsCosts(props) {
  console.log('Marlin EpsCosts', props);
  _popup2.default.show(_react2.default.createElement(EpsCostsDlg, props), { animationType: 'slide-up', maskProps: maskProps, maskClosable: false });
};

/***/ }),

/***/ 1849:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcDialog = __webpack_require__(212);

var _rcDialog2 = _interopRequireDefault(_rcDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function create(_instanceId, config, content) {
    var afterClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_x) {};

    var props = (0, _extends3['default'])({ prefixCls: 'am-popup', animationType: 'slide-down' }, config);
    var prefixCls = props.prefixCls,
        transitionName = props.transitionName,
        animationType = props.animationType,
        maskTransitionName = props.maskTransitionName,
        _props$maskClosable = props.maskClosable,
        maskClosable = _props$maskClosable === undefined ? true : _props$maskClosable,
        onMaskClose = props.onMaskClose,
        className = props.className;

    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        if (div) {
            _reactDom2['default'].unmountComponentAtNode(div);
            div.parentNode.removeChild(div);
            div = null;
        }
        afterClose(_instanceId);
    }
    var transName = 'am-slide-down';
    if (animationType === 'slide-up') {
        transName = 'am-slide-up';
    }
    // 在 iPhone 上拖动 mask 蒙层、会触发最顶部或最底部的、页面回弹后的留白，解决办法是，禁掉 mask 蒙层的 onTouchStart 事件。
    // 但由于以下原因：
    // Popup 组件底层依赖 [rc-dialog](https://github.com/react-component/dialog)
    // 而 rc-dialog 点击 mask 蒙层关闭弹出框的事件是绑定在 classname 为 rc-dialog-wrap 的 dom 节点上，
    // 此节点是弹出层中主要内容的“父节点”，而非正常的“兄弟节点”。相关 issue https://github.com/react-component/dialog/issues/40
    // 所以、相对于 antd-mobile@0.9.8 以及之前的版本的变化是：
    // 去掉 am-popup-wrap 设置的 `position: fixed; top: 0; bottom: 0; ...` 样式，并给 am-popup 设置 z-index .
    // 另外不使用 rc-dialog 提供的 maskClosable 功能，而改为在这里实现
    var maskProps = {
        onClick: function onClick(e) {
            e.preventDefault();
            if (maskClosable) {
                if (onMaskClose && typeof onMaskClose === 'function') {
                    var res = onMaskClose();
                    if (res && res.then) {
                        res.then(function () {
                            close();
                        });
                    } else {
                        close();
                    }
                } else {
                    close();
                }
            }
        }
    };
    var cls = className ? prefixCls + '-' + animationType + ' ' + className : prefixCls + '-' + animationType;
    _reactDom2['default'].render(_react2['default'].createElement(
        _rcDialog2['default'],
        (0, _extends3['default'])({}, props, { className: cls, visible: true, title: '', footer: '', transitionName: transitionName || transName, maskTransitionName: maskTransitionName || 'am-fade', maskProps: (0, _extends3['default'])({}, props.maskProps, maskProps) }),
        content
    ), div);
    return {
        instanceId: instanceId,
        close: close
    };
} /* tslint:disable:jsx-no-multiline-js */

var ins = {
    defaultInstance: null,
    instances: []
};
var instanceId = 1;

var Popup = function Popup() {
    (0, _classCallCheck3['default'])(this, Popup);
};

exports['default'] = Popup;

Popup.newInstance = function () {
    var j = void 0;
    return {
        show: function show(content, config) {
            j = create(instanceId++, config, content, function (iId) {
                for (var i = 0; i < ins.instances.length; i++) {
                    if (ins.instances[i].instanceId === iId) {
                        ins.instances.splice(i, 1);
                        return;
                    }
                }
            });
            ins.instances.push(j);
        },
        hide: function hide() {
            j.close();
        }
    };
};
Popup.show = function (content, config) {
    Popup.hide();
    ins.defaultInstance = create('0', config, content, function (iId) {
        if (iId === '0') {
            ins.defaultInstance = null;
        }
    });
};
Popup.hide = function () {
    if (ins.defaultInstance) {
        ins.defaultInstance.close();
    }
};
module.exports = exports['default'];

/***/ }),

/***/ 1855:
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

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	} else {
		obj[key] = value;
	}return obj;
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

var TodoCard = function (_Component) {
	_inherits(TodoCard, _Component);

	function TodoCard() {
		_classCallCheck(this, TodoCard);

		return _possibleConstructorReturn(this, (TodoCard.__proto__ || Object.getPrototypeOf(TodoCard)).apply(this, arguments));
	}

	_createClass(TodoCard, [{
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
			var _ref,
			    _this2 = this;

			var self = this;
			var orderdata = this.props.data,
			    devices = orderdata.pageInfo && orderdata.pageInfo.list ? orderdata.pageInfo.list : [],
			    device = devices[0] || (_ref = { itDeviceName: '', mark: '', faCategory: '', operate: '' }, _defineProperty(_ref, 'mark', ''), _defineProperty(_ref, 'typeCode', ''), _ref);
			// console.log('Marlin 3', this.props)

			var showAllData = this.props.viewmore ? this.props.viewmore : devices.length > 1 ? true : false; //this.props.showAllData;
			var fittings = [];
			var fittingsHtml = '';
			if (device.itDeviceName != '' && orderdata.costList.length > 0) {
				fittings = _.filter(orderdata.costList, function (item, key) {
					return item['itDeviceNumber'] == device['itDeviceNumber'];
				});
				if (fittings.length > 0) {
					fittingsHtml = _react2.default.createElement('div', { className: 'todo-fitting' }, _react2.default.createElement('div', { className: 'border-wrap' }, _react2.default.createElement('div', { className: 'border-line-h before' })), _.map(fittings, function (cost, key) {
						return _react2.default.createElement('div', { className: 'todo-fitting-i' }, _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-title', onClick: function onClick() {
								return self.NameInfo(cost.partsName);
							} }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: 'todo-info-label' }, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, cost.partsName)), _react2.default.createElement('div', { className: 'todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, cost.maintenanceNum))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
								return self.NameInfo(cost.maintenanceRemarks);
							} }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, cost.maintenanceRemarks)), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, cost.operate ? (0, _constants.getDictVal)('fittingOperation', cost.operate) : ''))));
					}));
				}
			}
			return _react2.default.createElement('div', { className: 'todo-card todo-card-it animated fadeIn' }, _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info todo-info-l-xpadding todo-info-it' }, _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('i', null), _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
					return _this2.NameInfo(device.itDeviceName);
				} }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "IT\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, device.itDeviceName)), _react2.default.createElement('div', { className: 'todo-info-r', onClick: function onClick() {
					return _this2.NameInfo(device.mark ? device.mark : '无');
				} }, _react2.default.createElement('span', { className: 'todo-info-label todo-info-label-r ellipsis' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, device.mark ? device.mark : '无'))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code'), _react2.default.createElement('span', { className: 'todo-info-val' }, device.faCategory)), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label todo-info-label-r ellipsis' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, device.operate ? (0, _constants.getDictVal)('equipmentOperation', device.operate) : ''))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u578B\u53F7\u4EE3\u7801"), _react2.default.createElement('span', { className: 'todo-info-val' }, device.typeNumber)), _react2.default.createElement('div', { className: 'todo-info-r', onClick: function onClick() {
					return _this2.NameInfo(device.typeCode);
				} }, _react2.default.createElement('span', { className: 'todo-info-label todo-info-label-r ellipsis' }, "\u578B\u53F7\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, device.typeCode)))), fittingsHtml), showAllData ? _react2.default.createElement('div', { className: 'todo-btn border-line-h before  specail-color', onClick: function onClick(e) {
					return _this2.props.openView(e);
				} }, "\u67E5\u770B\u66F4\u591A\u8BBE\u5907\u4FE1\u606F") : '');
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

/***/ 1858:
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
   * IT类头部用户信息
   * demo
   * <header className="header header-4lines" ref="header">
  					<div className="header-bg"></div>
  					<div className="header-bg-2"></div>
  					<div className="header-c">
  						<UserCardToIt userinfo={ userinfo }/>
  					</div>
  				</header>
   */

var UserCardToIt = function (_Component) {
	_inherits(UserCardToIt, _Component);

	function UserCardToIt() {
		_classCallCheck(this, UserCardToIt);

		return _possibleConstructorReturn(this, (UserCardToIt.__proto__ || Object.getPrototypeOf(UserCardToIt)).apply(this, arguments));
	}

	_createClass(UserCardToIt, [{
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.data;
			datas.remark = datas.supRemarks;
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
			localStorage.removeItem("Joywok:cache:tabs:scrap");
			var url = EpsWebRoot + '/#/scrapped/' + datas["orderNumber"];
			window.upTabsData('scrap', 'cache', datas);
			jw.pushWebView(url);
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

			var data = this.props.data || { createBy: '', itTsi: '', orderNumber: '', storeName: '' };
			var OrderNum = data && data.pageInfo && data.pageInfo.list && data.pageInfo.list.length > 0 ? data.pageInfo.list[0]['orderNumber800'] : '';
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}

			console.log(data['scrapPageInfo'], '这个值是什么呀');
			return _react2.default.createElement('div', { className: 'user-card' }, _react2.default.createElement('div', { className: 'user-card-c' }, _react2.default.createElement('div', { className: 'user-card-avatar' }, _react2.default.createElement('img', { src: data["avatar"] ? data['avatar']["avatar_s"] : 'https://www.joywok.com/public/images/avatar/l.jpg', alt: '' })), _react2.default.createElement('div', { className: 'user-card-info' }, _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u521B\u5EFA\u4EBA")), _react2.default.createElement('dd', { className: 'ellipsis' }, _react2.default.createElement('font', { className: 'ellipsis' }, data.createBy))), _react2.default.createElement('div', { className: 'user-card-info-i', onClick: function onClick() {
					return _this2.NameInfo(data.itTsi);
				} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'TSI')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.itTsi))), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "800\u7EF4\u4FEE\u5355\u53F7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, OrderNum))), _react2.default.createElement('div', { className: 'user-card-info-i', onClick: function onClick() {
					return _this2.NameInfo(data.storeName);
				} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u9910\u5385\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.storeName))), _react2.default.createElement('div', { className: 'user-card-info-btns' }, data['remark'] && data['remark'].length != 0 ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openWebView('/remarksdetail');
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val' }, "\u67E5\u770B\u5907\u6CE8")) : '', _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u67E5\u770B\u9644\u4EF6", data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : '')), data.showScrapTip && data.showScrapTip != 0 && window.userinfo['userType'] == '2' ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openScrapView(e);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u8D44\u4EA7\u62A5\u5E9F", data['scrapPageInfo'] && data['scrapPageInfo'].length != 0 ? '(' + data['scrapPageInfo'].length + ')' : '')) : ''), _react2.default.createElement('div', { className: 'user-card-info-i hide' }, _react2.default.createElement('dt', { onClick: function onClick(e) {
					return _this2.openWebView('/remarksdetail');
				} }, _react2.default.createElement('label', null, "\u66F4\u591A\u5907\u6CE8")), _react2.default.createElement('dd', null)))));
		}
	}]);

	return UserCardToIt;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(UserCardToIt);

/***/ }),

/***/ 1867:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".hairline-remove-right-bottom {\n  border-bottom: 0;\n}\n.hairline-remove-right-bottom:after {\n  display: none;\n}\n.hairline-remove-right-bottom-bak:after {\n  display: none;\n}\n.hairline-remove-left-top:before {\n  display: none;\n}\n.am-popup-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  height: 100%;\n  z-index: 999;\n}\n.am-popup-mask-hidden {\n  display: none;\n}\n.am-popup-close {\n  display: none;\n}\n.am-popup {\n  position: fixed;\n  left: 0;\n  width: 100%;\n  background-color: #fff;\n  z-index: 999;\n}\n.am-popup-slide-down {\n  top: 0;\n}\n.am-popup-slide-up {\n  bottom: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1871:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1867);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_postcss-loader@1.3.3@postcss-loader/index.js!./index.css", function() {
			var newContent = require("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_postcss-loader@1.3.3@postcss-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1884:
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

var _UserCardToIt = __webpack_require__(1858);

var _UserCardToIt2 = _interopRequireDefault(_UserCardToIt);

var _TodoCardIt = __webpack_require__(1855);

var _TodoCardIt2 = _interopRequireDefault(_TodoCardIt);

var _MoneyShowIt = __webpack_require__(1940);

var _MoneyShowIt2 = _interopRequireDefault(_MoneyShowIt);

var _RejectTip = __webpack_require__(1830);

var _RejectTip2 = _interopRequireDefault(_RejectTip);

var _EpsDialog = __webpack_require__(344);

var _EpsDialog2 = _interopRequireDefault(_EpsDialog);

var _EpsModal = __webpack_require__(198);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

var _constants = __webpack_require__(197);

var _EpsCosts = __webpack_require__(1844);

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
   * IT审批 餐厅IT确认
   * type=1,2,3,4
   * //1:餐厅待确认
  	//2：DOA审批
  	//3：审批未通过，餐厅再次审批 3同1 合并，3不需要了
  	//4：餐厅确认订单，评价
   */

// import request from '../../utils/EpsRequest';

var Process = function (_Component) {
	_inherits(Process, _Component);

	function Process(props) {
		_classCallCheck(this, Process);

		var _this = _possibleConstructorReturn(this, (Process.__proto__ || Object.getPrototypeOf(Process)).call(this, props));

		_this.callJWFuncs = _this.callJWFuncs.bind(_this);
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
			var data = this.props.todos;
			var view = this._init_view();
			return _react2.default.createElement('div', { className: 'root-container' }, view);
		}
	}, {
		key: '_init_view',
		value: function _init_view() {
			var _this2 = this;

			var view = '';
			var data = this.props.process;
			var formData = {};
			var rejectTip = '';
			var orderid = this.props.params.orderid.split("&")[0];
			var btn = '';
			var strOrderSta = data['orderState'] && _constants.orderStatus["repair"][data['orderState']] ? _constants.orderStatus["repair"][data['orderState']] : { 'label': '' };

			if (data['loading']['loading']) {
				btn = _react2.default.createElement('div', { className: 'todo-info-status' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small' }, "\u52A0\u8F7D\u4E2D\u2026"));
			} else {
				if (isUnfinishedOrHistory()) {
					btn = _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
							return _this2.openProcessTable();
						} }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"])));
				} else {

					if (this.props.location.query.type == '1') {
						btn = _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-cancel-small there-btn', onClick: function onClick(e) {
								return _this2.cancel(e);
							} }, "\u53D6\u6D88"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small there-btn', onClick: function onClick(e) {
								return _this2.reject(e, _this2.props.location.query.type);
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large there-btn', onClick: function onClick(e) {
								return _this2.agree(e, _this2.props.location.query.type);
							} }, "\u786E\u8BA4"));
					} else {
						btn = _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
								return _this2.reject(e, _this2.props.location.query.type);
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
								return _this2.agree(e, _this2.props.location.query.type);
							} }, "\u786E\u8BA4"));
					}
				}
			}
			// if(data['type']!='4'){
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
			if (data['type'] == '3') {
				rejectTip = _react2.default.createElement(_RejectTip2.default, { data: data['epsTip'], close: function close(e) {
						return _this2.closeTip(e);
					} });
			}
			var EpsDialogComponent = _react2.default.createElement('div', { className: 'appraisal-form' }, _react2.default.createElement(_mobile2.default, { ref: 'form', formData: formData, onChange: function onChange(values, schema) {
					return _this2.FormChange(values, schema);
				} }));
			if (this.props.process.loading.loading) {
				view = _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, "\u52A0\u8F7D\u4E2D"));
			} else {
				var datas = this.props.process;
				var time = datas['updateDate'].split('.')[0];
				var updateDate = encodeURIComponent(time);

				var showScrapTip = 0;
				var allPartMoney = {};
				if (data['partList'] && data['partList'].length != 0) {
					_.each(data['partList'], function (i) {
						var money = i['purchasingPrice'] * i['maintenanceNum'];
						if (money >= 3000 || i['isFa'] == 'Y' || i['isFa'] == 'y') {
							showScrapTip = showScrapTip + 1;
						}
						var typeNumber = _.findWhere(data['pageInfo']['list'], { itDeviceName: i['itDeviceName'], itDeviceNumber: i['itDeviceNumber'] })["typeNumber"];
						// console.log(typeNumber,'哈哈哈哈哈哈')
						i['typeNumber'] = typeNumber;
						// console.log(_.findWhere(data['pageInfo']['list'],{itDeviceName:i['itDeviceName'],itDeviceNumber:i['itDeviceNumber']})['typeNumber'],'哈哈哈哈哈哈')
						if (allPartMoney[i['itDeviceName'] + '/' + i['itDeviceNumber']]) {
							allPartMoney[i['itDeviceName'] + '/' + i['itDeviceNumber']] = allPartMoney[i['itDeviceName'] + '/' + i['itDeviceNumber']] + money;
						} else {
							allPartMoney[i['itDeviceName'] + '/' + i['itDeviceNumber']] = money;
						}
					});
				}
				_.each(allPartMoney, function (i, key) {
					var keys = key.split('/');
					// console.log(keys,'keyssadasd')
					if (i >= 9000) {
						var datas = _.findWhere(data['partList'], { itDeviceName: keys[0], itDeviceNumber: keys[1] });
						datas['totalMaintenanceCost'] = i;
					}
				});

				if (data['partList'] && data['partList'].length != 0) {
					_.each(data['partList'], function (i) {
						if (Number(i['totalMaintenanceCost']) >= 9000) {
							showScrapTip = showScrapTip + 1;
						}
					});
				}
				if (data['deviceList'] && data['deviceList'].length != 0) {
					_.each(data['deviceList'], function (i) {
						if (Number(i['totalMaintenanceCost']) >= 9000) {
							showScrapTip = showScrapTip + 1;
						}
					});
				}
				// console.log(data,'这个里面有啥数据呢');
				// if(data['deviceList'] && data['deviceList'].length!=0){
				// 	_.each(data['deviceList'],function(i){
				// 		if(i['purchasingPrice']>=9000){
				// 			showScrapTip = showScrapTip+1
				// 		}
				// 	})	
				// }
				console.log(allPartMoney, showScrapTip, data, 'dsadasdasdasdasdasdasdas');
				this.showScrapTip = showScrapTip;
				view = _react2.default.createElement('div', { className: 'root-container-w my-fix-header' }, _react2.default.createElement('header', { className: 'header header-with-memo xheight header-adapt', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement('div', { className: 'header-bg-2-adapt' }), _react2.default.createElement(_UserCardToIt2.default, { data: _.extend({}, this.props.process, {
						remark: this.props.process['supRemarks'],
						avatar: this.props.process['avatar'],
						fileCount: this.props.process['fileCount'] || 0,
						uploadPhaseName: this.props.process['uploadPhaseName'] || '',
						scrapPageInfo: data['storeScrapList'],
						partList: data['partList'],
						deviceList: data['deviceList'],
						storeNumber: data['storeNumber'],
						scrappType: 'repair',
						scrappOrderType: 'it',
						showScrapTip: showScrapTip,
						addScrap: window.isUnfinishedOrHistory() == false && (this.props.location.query.type == '1' || this.props.location.query.type == '4') ? true : false
					}) }))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c todo-info-it' }, _react2.default.createElement(_TodoCardIt2.default, { data: this.props.process, openView: function openView(e) {
						return _this2.openWebView('/repairing/it-info/' + orderid + '?updateDate=' + updateDate);
					}, viewmore: true }), _react2.default.createElement(_LoadMore2.default, { container: 'main-c', data: data['loading'], onEndReached: function onEndReached(e) {
						_this2.onEndReached(e);
					} }))), _react2.default.createElement(_MoneyShowIt2.default, {
					data: this.props.process,
					showFeeDetail: function showFeeDetail(e) {
						_this2.showFeeDetail(e);
					} }), rejectTip, _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
						return _this2.openLog();
					} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), btn));
			}
			return view;
		}
		// type 费用类型 1 其他费用 2 采购费小计

	}, {
		key: 'showFeeDetail',
		value: function showFeeDetail(type) {
			console.log('showFeeDetail type[' + type + ']', this.props.process);
			if (type == 1) this.combineOtherFeeDetail();else if (type == 2) this.combinePurchaseFeeDetail();
			return;
			(0, _EpsCosts.EpsCosts)({ title: '采购材料费', body: _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'eps-popup-list-h3 materials-fee-h' }, _react2.default.createElement('span', null, "\u5DE5\u7A0B\u540D\u79F0"), _react2.default.createElement('span', null, "\u8D39\u7528 (\xA5) ")), _react2.default.createElement('div', { className: 'eps-popup-list-item materials-fee' }, _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'ellipsis' }, "\u8F66\u9053\u53CA\u505C\u8F66\u573A"), _react2.default.createElement('span', null, '76.86(6%)')), _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'ellipsis' }, "\u8F66\u9053\u53CA\u505C\u8F66\u573A-\u5F97\u6765\u901F"), _react2.default.createElement('span', null, '76.86(6%)'))), _react2.default.createElement('div', { className: 'eps-popup-list-foot' }, _react2.default.createElement('div', { className: 'eps-popup-list-foot-total' }, _react2.default.createElement('label', null, "\u603B\u4EF7"), _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', null, '153.72')))) });
		}
		// 拼装采购费

	}, {
		key: 'combinePurchaseFeeDetail',
		value: function combinePurchaseFeeDetail() {
			var data = this.props.process,
			    devices = data.pageInfo && data.pageInfo.list ? data.pageInfo.list : [],
			    Accessories = [],
			    cost = data && data.detailList && data.detailList.length > 0 ? data.detailList[0] : { totalMaintenanceCost: '', otherFeesRates: '1', lumpSumPrice: '' };
			if (data.costList && data.costList.length > 0 && devices.length > 0) {
				// Accessories
				_.each(devices, function (device) {
					device['accessories'] = _.filter(data.costList, function (accessory) {
						return device['itDeviceNumber'] == accessory['itDeviceNumber'];
					});
				});
			}
			console.log('devices', devices); //return;
			return;
			// 重新组织设备、配件数组
			(0, _EpsCosts.EpsCosts)({ title: '采购材明细', body: _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'eps-popup-list-item' }, devices.map(function (device, i) {
					return _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'eps-popup-list-h3 device-fee-h' }, _react2.default.createElement('span', null, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('span', null, device.itDeviceName)), _react2.default.createElement('div', { className: 'accessories-h' }, _react2.default.createElement('span', { className: 'device-name' }, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('span', { className: 'device-price' }, "\u4EF7\u683C(\xA5)"), _react2.default.createElement('span', { className: 'device-num' }, "\u6570\u91CF")), _react2.default.createElement('div', { className: 'accessories-list' }, device['accessories'].map(function (accessory, i) {
						return _react2.default.createElement('div', { className: 'accessories-item' }, _react2.default.createElement('span', { className: 'device-name' }, accessory.partsName), _react2.default.createElement('span', { className: 'device-price' }, accessory.purchasingPrice.formatMoney(2, '', '')), _react2.default.createElement('span', { className: 'device-num' }, accessory.maintenanceNum));
					})));
				})), _react2.default.createElement('div', { className: 'eps-popup-list-foot' }, _react2.default.createElement('div', { className: 'eps-popup-list-foot-total' }, _react2.default.createElement('label', null, "\u603B\u4EF7"), _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', null, cost.totalMaintenanceCost.formatMoney(2, '', ''))))) });
		}
		// 拼装其他费用明细弹出框 改变了方式，改到了详细页面

	}, {
		key: 'combineOtherFeeDetail',
		value: function combineOtherFeeDetail() {
			return;
			var data = this.props.process,
			    cost = data && data.detailList && data.detailList.length > 0 ? data.detailList[0] : { totalMaintenanceCost: '', otherFeesRates: '1', lumpSumPrice: '' };
			var othercost = (cost.lumpSumPrice - cost.totalMaintenanceCost).formatMoney(2, '', ''),
			    taxRate = (0, _constants.getDictVal)('taxlist', cost.otherFeesRates + '');
			return;
			(0, _EpsCosts.EpsCosts)({ title: '其他费用明细', body: _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'eps-popup-list-h3 materials-fee-h' }, _react2.default.createElement('span', null, "\u8D39\u7528 (\xA5)")), _react2.default.createElement('div', { className: 'eps-popup-list-item materials-fee' }, _react2.default.createElement('div', null, _react2.default.createElement('span', null, othercost + '(' + taxRate + ')')), _react2.default.createElement('div', { className: 'fee-memo' }, "\u5907\u6CE8\u4FE1\u606F\uFF1A", cost.otherCostRemark)), _react2.default.createElement('div', { className: 'eps-popup-list-foot' }, _react2.default.createElement('div', { className: 'eps-popup-list-foot-total' }, _react2.default.createElement('label', null, "\u603B\u4EF7"), _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', null, othercost)))) });
		}
		// 组件加载完毕

	}, {
		key: 'onEndReached',
		value: function onEndReached() {}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}, {
		key: 'closeTip',
		value: function closeTip() {
			var dispatch = this.props.dispatch;
			var data = this.props.process;
			var epsTip = _.extend(data['epsTip'], {
				show: false
			});
			dispatch({
				type: 'process/changeData',
				data: {
					epsTip: epsTip
				}
			});
		}
	}, {
		key: 'closeDialog',
		value: function closeDialog() {
			var dispatch = this.props.dispatch;
			var data = this.props.process;
			var epsDialog = _.extend(data['epsDialog'], {
				show: false
			});
			dispatch({
				type: 'process/changeData',
				data: {
					epsDialog: epsDialog
				}
			});
		}
	}, {
		key: 'cancel',
		value: function cancel() {
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.process;
			var self = this;
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
								orderDate: modelData['orderDate'] || '2017-12-02 18:00:00',
								orderState: modelData['orderState'],
								refuseRemarks: memo
							}
							// self.upData(datas,callback)
						} };(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/cancelItRepairPo', {
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
			console.log('reject');
			$('.eps-dialog').hide();
			var self = this;
			var confirmFlag = "Refuse";
			var rejectDialog = (0, _EpsModal.MemoDialog)({
				title: '是否拒绝该订单?',
				defaultValue: self.rejectMemo ? self.rejectMemo : '',
				btnIconClass: 'icon-reject',
				btnVal: '拒绝',
				placeholder: '拒绝必须输入备注...',
				memorequired: true,
				onBtnClick: function onBtnClick(memo, callback) {
					self.rejectMemo = memo;
					self.approveSubmit(e, type, memo, confirmFlag, callback);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}
	}, {
		key: 'agree',
		value: function agree(e, type) {
			// 餐厅确认&&评价 单独走一个接口
			if (this.props.location.query.type == '4') {
				this.EvaluateAgree();
				return;
			}

			var self = this;
			var storeScrapList = self.props.process['storeScrapList'];
			if (this.showScrapTip != 0 && storeScrapList.length == 0) {
				(0, _EpsModal.AlertBase)({
					tip: '请挑选资产！！',
					icon: 'icon-save-error',
					onOk: function onOk() {}
				});
				return;
			}

			var dispatch = this.props.dispatch;
			var data = this.props.process;
			var orderid = this.props.params.orderid;
			var orderState = data.orderState;
			var confirmFlag = "Approve";
			var epsDialog = (0, _EpsModal.MemoDialog)({
				title: '是否确认通过？',
				defaultValue: self.agreeMemo ? self.agreeMemo : '',
				btnIconClass: 'icon-check',
				btnVal: '确认',
				placeholder: '请输入备注...',
				changeData: function changeData() {},
				memorequired: false,
				onBtnClick: function onBtnClick(memo, callback) {
					self.approveSubmit(e, type, memo, confirmFlag, callback);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}

		//确认提交订单

	}, {
		key: 'approveSubmit',
		value: function approveSubmit(e, type, value, confirmFlag, callback) {
			var self = this;
			console.log(type, "确认提交订单", this.props.process);
			var requestUrl = void 0;
			// 餐厅确认&&评价 单独走一个接口
			if (this.props.location.query.type == '4') {
				requestUrl = '/McdEpsApi/joywok/repair/evaluate';
			} else {
				requestUrl = '/McdEpsApi/joywok/repair/submitItOrderInfo';
			}
			(0, _EpsRequest2.default)(requestUrl, {
				method: 'POST',
				body: JSON.stringify({
					param: {
						eid: eid,
						record: {
							updateDate: self.props.process.updateDate,
							orderNumber: self.props.process.orderNumber,
							orderState: self.props.process.orderState,
							confirmFlag: confirmFlag,
							refuseRemarks: value,
							orderMoney: self.props.process.detailList[0]['lumpSumPrice'],
							storeScrapList: self.props.process['storeScrapList'] || []
						}
					}
				})
			}).then(function (resp) {
				if (resp.data.success) {
					(0, _EpsModal.AlertBase)({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: function onOk() {
							setTimeout(function () {
								jw.closeWebView();
							}, 200);
						}
					});
				} else {
					if (typeof callback != 'undefined') {
						callback(true);
					}
				}
			});
		}
		//餐厅评价

	}, {
		key: 'EvaluateAgree',
		value: function EvaluateAgree() {
			var EvaluateUrl = '/McdEpsApi/joywok/repair/evaluate';
			console.log(window.RepairITEvaluate, "RepairITEvaluate");
			var self = this;
			var storeScrapList = self.props.process['storeScrapList'];
			if (this.showScrapTip != 0 && storeScrapList.length == 0) {
				(0, _EpsModal.AlertBase)({
					tip: '请挑选资产！！',
					icon: 'icon-save-error',
					onOk: function onOk() {}
				});
				return;
			}
			(0, _EpsModal.EvaluateDialog)({
				title: '请输入评价',
				btnIconClass: 'icon-check',
				btnVal: '完成',
				formData: {
					schema: _.map(window.RepairITEvaluate, function (val, key) {
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
						name: 'refuseRemarks', element: 'Textarea',
						defaultValue: typeof window.EvaluateCache != 'undefined' ? window.EvaluateCache['refuseRemarks'] : '',
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
					for (var i in window.RepairITEvaluate) {
						if (data[i] == 0) {
							(0, _EpsModal.AlertBase)({
								tip: '请输入' + window.RepairITEvaluate[i] + '的评价!',
								icon: 'icon-save-error',
								onOk: function onOk() {}
							});
							return false;
						}
					}
					var hasOne = false;
					_.each(window.RepairITEvaluate, function (i, key) {
						if (data[key] <= 2) {
							hasOne = true;
						}
					});
					if (hasOne && data['refuseRemarks'].length == 0) {
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

					var orderid = self.props.params.orderid;
					var eid = userinfo.employee_id;
					var updateDate = self.props.process['updateDate'];
					(0, _EpsRequest2.default)(EvaluateUrl, {
						method: 'POST',
						body: JSON.stringify({
							param: {
								eid: eid,
								record: _.extend({
									updateDate: self.props.process.updateDate,
									orderNumber: self.props.process.orderNumber,
									orderState: self.props.process.orderState,
									confirmFlag: "Approve",
									storeScrapList: self.props.process['storeScrapList'] || []
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
	}, {
		key: 'openLog',
		value: function openLog() {
			console.log("555");
			var url = EpsWebRoot + '/#/log/' + this.props.params['orderid'];
			var data = this.props.process;
			window.upTabsData('log', 'cache', data);
			jw.pushWebView(url);
		}
	}, {
		key: 'openProcessTable',
		value: function openProcessTable() {
			var data = this.props.process;
			data['logType'] = 'repair';
			window.upTabsData('log', 'cache', data);
			var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
			jw.pushWebView(url);
		}
	}, {
		key: 'callJWFuncs',
		value: function callJWFuncs() {
			jw.setFuncBtns([{ type: 4 }]);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			NProgress.done();
			var self = this;
			var dispatch = this.props.dispatch;
			if (JWReady == true) {
				this.callJWFuncs();
			} else {
				window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
					self.callJWFuncs();
				});
			}
			PubSub.subscribe('add:scrapped', function (evt, data) {
				dispatch({ type: 'process/changeData', payload: {
						storeScrapList: _.map(data, function (i) {
							return i;
						})
					} });
			});
			window.onJwNavBtnClick = function (data) {
				if (data['type'] == '4') {
					var _modelData = self.props.process;
					(0, _constants.openChart)(eid, _modelData['orderNumber'], '测试');
				}
			};
			var modelData = this.props.process;
			var orderid = this.props.params.orderid.split("&")[0];

			setTimeout(function () {
				// let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				// let header = $('.header').height() || 0;
				// let footer = $('.footer').height() || 0;
				// let moneyShow = $('.money-show').height() || 0;
				// $('.main-c').css({height:clientHeight-header-footer-moneyShow+'px'});
				dispatch({
					type: 'process/changeData',
					data: {
						loading: {
							loading: false,
							fix: false,
							hide: true
						}
					}
				});
				self.setHeight();
			}, 0);
			// 请求数据
			dispatch({
				type: 'process/getITOrderInfo',
				payload: {
					eid: window.eid,
					condition: {
						orderNumber: orderid
					},
					'pager': {
						'current': '1',
						'rowCount': '3'
					}
				},
				dispatch: dispatch
			});
			NProgress.done();
			//获取评价项：新增IT订单的评价项
			if (this.props.location.query.type == '4') {
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
					window.RepairITEvaluate = resp['data']['body'];
				});
			}
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
				var moneyShow = $('.money-show').height() || 0;
				$('.main-c').css({ height: clientHeight - header - footer - moneyShow - 50 + 'px' });
			}, 0);
		}
	}]);

	return Process;
}(_react.Component);

function mapStateToProps(state) {
	var sta = state.routing.locationBeforeTransitions.query.sta;

	var hash = window.location.hash.split('?')[1].split('&');
	var nowHash = {};
	_.each(hash, function (i) {
		var split = i.split('=');
		nowHash[split[0]] = split[1];
	});
	// console.log('nowHash', nowHash);
	var nowData = state;
	/*if(nowHash['type']){
 	nowData['process']['type'] = nowHash['type']
 }else{
 	nowData['process']['type'] = '1'
 }*/
	nowData['process']['type'] = nowHash['type'] ? nowHash['type'] : '1';

	var title = '';
	var orderState = void 0;

	if (isUnfinishedOrHistory()) {
		// 在途订单
		title = sta == '1' ? '在途订单' : '历史订单';
	} else {
		switch (nowData['process']['type']) {
			case '1':
				title = "维修确认";
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
			/*case '100':
    	title = "订单详情";
   break;*/
			default:
				title = '';
				break;
		}
	}
	// state.process.orderState=orderState;
	if (JWReady == true) {
		jw.setTitle({ title: title });
	} else {
		window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
			jw.setTitle({ title: title });
		});
	}

	//1:餐厅待确认
	//2：DOA审批
	//3：审批未通过，餐厅再次审批
	//4：餐厅确认订单，评价
	return nowData;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Process);

/***/ }),

/***/ 1940:
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

var _EpsCosts = __webpack_require__(1844);

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
		value: function NameInfo(name, length) {
			var len = length ? length : 8;
			if ((0, _constants.DataLength)(name) > len) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this;
			var cost = this.props.data && this.props.data.detailList && this.props.data.detailList.length > 0 ? this.props.data.detailList[0] : { totalMaintenanceCost: '', otherFeesRates: '1', lumpSumPrice: '' };
			console.log('cost::======:::=====', this.props.data.detailList, cost);
			var otherFeesRates = (0, _constants.getDictVal)('taxlist', cost.otherFeesRates + '');
			otherFeesRates = otherFeesRates == 0 ? '-' : otherFeesRates;
			// 其他费用金额为0时，税率显示为-
			otherFeesRates = cost.lumpSumPrice - cost.totalMaintenanceCost <= 0 ? '-' : otherFeesRates;

			// 采购费小计的税率，取配件的税率
			var partsRate = '-';
			var listNums = this.props.data.costList ? this.props.data.costList.length : 0;
			if (this.props.data.costList && this.props.data.costList.length > 0) {
				var firstdata = this.props.data.costList[0];
				partsRate = _.where(this.props.data.costList, { rate: firstdata.rate }).length == listNums ? typeof firstdata.rate == 'string' ? firstdata.rate : '-' : '-';
				if (partsRate != '-') {
					partsRate = (0, _constants.getDictVal)('taxlist', partsRate + '');
					partsRate = partsRate == 0 || partsRate == '0' ? '-' : partsRate;
				}
				// 采购费用为0时，税率显示为-
				partsRate = cost.totalMaintenanceCost <= 0 || cost.totalMaintenanceCost == '' ? '-' : partsRate;
			}

			return _react2.default.createElement('div', { className: 'money-show' }, _react2.default.createElement('div', { className: 'money-show-c' }, _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(self.turnMoney(cost.otherFees) + ' (' + otherFeesRates + ')');
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, this.turnMoney(cost.otherFees), ' (', otherFeesRates, ')'), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u5176\u4ED6\u8D39\u7528(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(self.turnMoney(cost.totalMaintenanceCost) + ' (' + partsRate + ')');
				} }, _react2.default.createElement('div', { className: 'money-show-num ellipsis' }, this.turnMoney(cost.totalMaintenanceCost), '(', partsRate, ')'), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u91C7\u8D2D\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i specail' }, _react2.default.createElement('div', { className: '' }, _react2.default.createElement('div', { className: 'money-specail' }, _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', { className: 'ellipsis p-totalprice', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(self.turnMoney(cost.lumpSumPrice));
				} }, this.turnMoney(cost.lumpSumPrice))), _react2.default.createElement('div', { className: 'money-all-tax' }, "(\u542B\u7A0E)")))), _react2.default.createElement('div', { className: 'money-show-other-tip' }, _react2.default.createElement('i', { className: 'icon-money-tips' }), _react2.default.createElement('div', { className: 'money-show-other-tip-v' }, "\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002")));
		}
		/**
   * 回调显示费用明细Popup窗口
   * @param type 费用类型 1 其他费用 2 采购费小计
   */

	}, {
		key: 'showCostInfo',
		value: function showCostInfo(type) {
			// console.log('showCosts type['+type+']');
			if (typeof this.props.showFeeDetail === 'function') this.props.showFeeDetail(type);
		}
	}]);

	return MoneyShow;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MoneyShow);

/***/ })

});