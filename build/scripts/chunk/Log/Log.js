webpackJsonp([58],{

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

/***/ 1899:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dva = __webpack_require__(196);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

var _EmptyView = __webpack_require__(1141);

var _EmptyView2 = _interopRequireDefault(_EmptyView);

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
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 待办列表
   */

var Log = function (_Component) {
	_inherits(Log, _Component);

	function Log(props) {
		_classCallCheck(this, Log);

		var store = new Store('Joywok:cache:tabs:log');
		var cache = store.find({ id: 'tab:cache' }) || {};
		if (cache['id']) {
			props['log']['parentData'] = cache["data"];
			console.log(cache["data"], '这个里面是什么呢');
		}
		return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this, props));
	}

	_createClass(Log, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var data = this.props.log;
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header specail', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c clear-padding', style: {
					overflowY: 'visible'
				} }, _react2.default.createElement('div', { className: 'todo-log' }, _react2.default.createElement('div', { className: 'todo-log-hd', onClick: function onClick(e) {
					return _this2.openWebView('/approval');
				} }, _react2.default.createElement('div', { className: 'todo-log-hd-pic icon-log-icon' }), _react2.default.createElement('div', { className: 'todo-log-hd-next icon-next-arrow' }), _react2.default.createElement('div', { className: 'todo-log-hd-info' }, _react2.default.createElement('div', { className: 'todo-log-hd-status' }, _react2.default.createElement('div', { className: 'todo-log-hd-status-i' }, _react2.default.createElement('span', null, "\u5F53\u524D\u6D41\u7A0B"), _react2.default.createElement('span', null, this.initKey(data['parentData']['orderState'])['label'])), _react2.default.createElement('div', { className: 'todo-log-hd-status-i' }, _react2.default.createElement('span', null, "\u5F53\u524D\u8282\u70B9"), _react2.default.createElement('span', null, this.initKey(data['parentData']['orderState'])['val']))))), _react2.default.createElement('div', { className: 'todo-log-list' }, _react2.default.createElement('div', { className: 'todo-log-list-t' }, "\u64CD\u4F5C\u65E5\u5FD7"), this.combineContent()))))));
		}
	}, {
		key: 'initKey',
		value: function initKey(i) {
			var data = this.props.log;
			if (typeof data['parentData']["logType"] == 'undefined') {
				return _constants.orderStatus['repair'][i];
			} else {
				if (_typeof(data['parentData']["logType"]) == 'object') {
					return _constants.orderStatus[data['parentData']["logType"]["key"]][data['parentData']["logType"]["subkey"]][i];
				} else {
					return _constants.orderStatus[data['parentData']["logType"]][i];
				}
			}
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data + '/' + this.props.params['orderid'];
			jw.pushWebView(url);
		}
	}, {
		key: 'combineContent',
		value: function combineContent() {
			var data = this.props.log;
			var list = data['data'];
			if (data['loading']) {
				return _react2.default.createElement('div', { className: 'loading-bounce-w fix' }, _react2.default.createElement('div', { className: 'loading-bounce-bg' }), _react2.default.createElement('div', { className: 'loading-gif' }, _react2.default.createElement('img', { src: 'images/loading.gif' })));
			} else {
				if (list && list.length > 0) {
					return _react2.default.createElement('div', { className: 'todo-log-list-c' }, _react2.default.createElement('div', { className: 'todo-log-list-c' }, _react2.default.createElement('div', { className: 'todo-log-line' }), _.map(list, function (i) {
						var date = moment(i['createDate']);
						return _react2.default.createElement('div', { className: "todo-log-list-i " + (i["operateMarks"] ? 'active' : '') }, _react2.default.createElement('div', { className: 'todo-log-list-i-c' }, _react2.default.createElement('div', { className: 'todo-log-list-i-time' }, _react2.default.createElement('span', null, date.format('YYYY-MM-DD')), _react2.default.createElement('span', null, date.format('HH:mm'))), _react2.default.createElement('div', { className: 'todo-log-list-i-user' }, _react2.default.createElement('img', { src: i['avatar'] ? i['avatar']['avatar_s'] : 'https://www.joywok.com/public/images/avatar/l.jpg', alt: '' })), _react2.default.createElement('div', { className: 'todo-log-list-i-status icon-pass-time-icon' }), _react2.default.createElement('div', { className: 'todo-log-list-i-info' }, _react2.default.createElement('div', { className: 'todo-log-list-i-name' }, i["operatePerson"]), _react2.default.createElement('div', { className: 'todo-log-list-i-val' }, i["operateStates"]), i["operateMarks"] ? _react2.default.createElement('div', { className: 'todo-log-list-i-tip' }, _react2.default.createElement('div', { className: 'todo-log-list-i-tip-val' }, "\u5907\u6CE8\uFF1A", i["operateMarks"])) : '')), _react2.default.createElement('div', { className: 'todo-log-list-i-line' }));
					})));
				} else {
					return _react2.default.createElement(_EmptyView2.default, null);
				}
			}
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var dispatch = this.props.dispatch;
			var orderid = this.props.params.orderid.split("&")[0];
			(0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getOrderLog', {
				method: 'POST',
				body: JSON.stringify({
					param: {
						eid: eid,
						record: {
							orderNumber: orderid
						}
					}
				})
			}).then(function (resp) {
				if (resp['data']['success'] == false) {} else {
					NProgress.done();
					var data = resp['data']['body']['data'];
					console.log(JSON.stringify({
						param: {
							eid: eid,
							record: {
								orderNumber: orderid
							}
						}
					}), resp['data']['body'], '获取到的日志信息');
					dispatch({
						type: 'log/changeData',
						payload: {
							data: data,
							loading: false
						}
					});
					var userList = [];
					_.each(data, function (i) {
						userList.push(i['createBy']);
					});

					var list = [];

					(0, _constants.getUsers)(userList.join(','), 'num', function (resp) {
						list = resp['data'];
						// console.log(resp['data'],'这个里面是啥',nowList);
						_.each(data, function (i) {
							// console.log(i,'这个里面有啥呢',_.findWhere,list,'zzzzzzzzzzz');
							if (_.findWhere(list, { name: i['operatePerson'] })) {
								i['avatar'] = _.findWhere(list, { name: i['operatePerson'] })["avatar"];
							}
						});
						dispatch({
							type: 'log/changeData',
							payload: {
								data: data
							}
						});
					});
				}
			});
			this.setHeight();
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
				var top = $('.todo-log-hd').height() || 0;
				var title = $(".todo-log-list-t").height() || 0;
				$('.todo-log-list-c').css({ height: clientHeight - header - top - title - 30 + 'px' });
			}, 0);
		}
	}]);

	return Log;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Log);

/***/ }),

/***/ 1958:
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
	namespace: 'log',
	state: {
		loading: true,
		fix: true,
		data: []
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