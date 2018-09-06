webpackJsonp([7],{

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

/***/ 1438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(348);

/***/ }),

/***/ 1544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1641:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(347);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _index2.default;

/***/ }),

/***/ 1642:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1438);

__webpack_require__(1824);

/***/ }),

/***/ 1824:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1544);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_less-loader@2.2.3@less-loader/index.js!./index.less", function() {
			var newContent = require("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_less-loader@2.2.3@less-loader/index.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

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

/***/ 1843:
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

var _MaintenanceConfirmDevice = __webpack_require__(1853);

var _MaintenanceConfirmDevice2 = _interopRequireDefault(_MaintenanceConfirmDevice);

var _EpsModal = __webpack_require__(198);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

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
} /**
   * 创建非项目订单（含设备／工程／IT）
   */

var Assess = function (_Component) {
	_inherits(Assess, _Component);

	function Assess() {
		_classCallCheck(this, Assess);

		return _possibleConstructorReturn(this, (Assess.__proto__ || Object.getPrototypeOf(Assess)).apply(this, arguments));
	}

	_createClass(Assess, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
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
		key: 'openMoreView',
		value: function openMoreView(data) {
			var datas = this.props.maintenance;
			// let datas = this.props.processdevice;
			var time = datas['updateDate'].split('.')[0];
			var updateDate = encodeURIComponent(time);
			var url = EpsWebRoot + '/#/maintenance/' + datas["model_type"] + '/device-list/' + this.props.params['orderid'] + '?updateDate=' + updateDate;
			window.upTabsData('MaintenanceDeviceList', 'cache', {
				list: datas["list"]
			});
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.maintenance;
			var btn = '';
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			var strOrderSta = data['orderState'] && _constants.orderStatus["maintenanceAfter"][data['orderState']] ? _constants.orderStatus["repair"][data['orderState']] : { 'label': '' };
			if (data['loading']['loading']) {
				btn = _react2.default.createElement('div', { className: 'todo-info-status' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small' }, "\u52A0\u8F7D\u4E2D\u2026"));
			} else {
				if (isUnfinishedOrHistory()) {
					btn = _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
							return _this2.openView('/approval');
						} }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"])));
				} else {
					btn = _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
							return _this2.agree(e);
						} }, _react2.default.createElement('i', { className: 'icon-reply-check' }), _react2.default.createElement('span', null, "\u786E\u8BA4"));
				}
			}
			console.log('rrppvvvvv', data);
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c ' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c ' }, _react2.default.createElement('div', { className: 'maintenance-card animated zoomIn' }, _react2.default.createElement('div', { className: 'maintenance-card-c' }, _react2.default.createElement('div', { className: 'maintenance-card-info clear-margin' }, _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u6D41\u7A0B\u5355\u53F7"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["orderNumber"] || '-')), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u4E0B\u5355\u65E5\u671F"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["createDate"] || '-')), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u670D\u52A1\u5546"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["vendorName"] || '-')), _react2.default.createElement('div', { className: 'maintenance-card-i' }, _react2.default.createElement('div', { className: 'maintenance-card-label ' }, "\u8054\u7CFB\u7535\u8BDD"), _react2.default.createElement('div', { className: 'maintenance-card-val ellipsis more' }, data["vendorTel"] ? _react2.default.createElement('a', { href: 'tel:' + data["vendorTel"], className: 'phone-number' }, data["vendorTel"]) : ''))))), data["list"] && data["list"].length != 0 ? _react2.default.createElement(_MaintenanceConfirmDevice2.default, { modelType: self.props.maintenance["model_type"], disabledAbovetime: true, openView: function openView(e) {
					return self.openMoreView(e);
				}, index: 0, data: _.extend({}, { showMoreBtn: true }, data['list'][0]) }) : '')), _react2.default.createElement('div', { className: 'money-show-item specail-fix padding-b' }, _react2.default.createElement('div', { className: 'money-text margin-b' }, _react2.default.createElement('i', { className: 'text-icon' }), _react2.default.createElement('span', null, "\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002"))), _react2.default.createElement(_LoadMore2.default, { data: data['loading'] }), _react2.default.createElement('div', { className: 'file-num-specail border-line-h before', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('i', { className: 'icon-file' }), _react2.default.createElement('span', { className: 'preview-file' }, "\u67E5\u770B\u9644\u4EF6", data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : '')), _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openView('/log');
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), btn)));
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var modelData = this.props.maintenance;
			var dispatch = this.props.dispatch;
			var orderid = this.props.params.orderid.split("&")[0];
			(0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getEvaluate', {
				method: 'POST',
				body: JSON.stringify({
					param: {
						eid: window.eid,
						condition: {
							orderNumber: orderid
						}
					}
				})
			}).then(function (resp) {
				window.Evaluate = resp['data']['body'];
				dispatch({ type: 'maintenance/fetch', payload: orderid, dispatch: dispatch });
			});
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
					var _modelData = self.props.maintenance;
					(0, _constants.openChart)(_modelData['creaeBy'], _modelData['orderNumber'], '测试');
				}
			};
			setTimeout(function () {
				// 	let modelData = self.props.maintenance;
				// 	console.log(modelData["fileList"]);
				// 	jw.previewImages({
				//       current: modelData["fileList"][0]['url'], // 当前显示图片的http链接
				//       urls:_.map( modelData["fileList"],function(i){
				//       	return i['url']
				//       })  // 需要预览的图片http链接列表
				//     });
				// jw.previewDoc({
				//   url:'https://www.joywok.com/public/images/test.docx',
				//   name:'',
				//   type:'application/msword'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
				// },{
				//   success:function(){
				//   }
				// })
				// 
				// 
				// 
				// jw.previewDoc({
				//      url:'http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/maintenance/getYearPlanAttach?eid=E5001162&orderNumber=MT170001048',
				//      name:'xxxxxxxxxxxxx',
				//      type:'application/vnd.ms-excel'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
				//    },{
				//      success:function(){
				//      }
				//    })
			}, 1500);
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
		key: 'openPicView',
		value: function openPicView() {
			var modelData = this.props.maintenance;
			// console.log(modelData["fileList"],'123123123123');
			jw.previewImages({
				current: modelData["fileList"][0]['url'], // 当前显示图片的http链接
				urls: _.map(modelData["fileList"], function (i) {
					return i['url'];
				}) // 需要预览的图片http链接列表
			});
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
		key: 'changeData',
		value: function changeData(data) {}
	}, {
		key: 'agree',
		value: function agree() {
			var modelData = this.props.maintenance;
			(0, _EpsModal.EvaluateDialog)({
				title: '请输入评价',
				btnVal: '完成',
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
				onBtnClick: function onBtnClick(data) {
					data['maintenanceStaffDressStandard'] = data['maintenanceStaffDressStandard'] + '';
					data['maintenanceResponseTime'] = data['maintenanceResponseTime'] + '';
					data['serviceAttitude'] = data['serviceAttitude'] + '';
					data['serviceQuality'] = data['serviceQuality'] + '';
					data['siteCleaning'] = data['siteCleaning'] + '';

					var hasOne = false;
					// _.each(dat)

					(0, _EpsRequest2.default)('/McdEpsApi/joywok/maintenance/submitStoreEvaluate', {
						method: 'POST',
						body: JSON.stringify({
							param: {
								eid: window.eid,
								record: _.extend({
									orderNumber: modelData['orderNumber'],
									updateDate: modelData['updateDate'],
									orderState: modelData['orderState']
								}, data)
							}
						})
					}).then(function (resp) {
						console.log(JSON.stringify({
							param: {
								eid: window.eid,
								record: _.extend({
									orderNumber: modelData['orderNumber'],
									updateDate: modelData['updateDate'],
									orderState: modelData['orderState']
								}, data)
							}
						}), resp['data'], '反悔了什么呢');
						// return 
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
	}]);

	return Assess;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(Assess);

/***/ }),

/***/ 1846:
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
		files: []
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

/***/ }),

/***/ 1853:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _datePicker = __webpack_require__(1641);

var _datePicker2 = _interopRequireDefault(_datePicker);

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

__webpack_require__(1642);

__webpack_require__(208);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _dva = __webpack_require__(196);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

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
	}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MaintenanceConfirmDevice = function (_Component) {
	_inherits(MaintenanceConfirmDevice, _Component);

	function MaintenanceConfirmDevice() {
		_classCallCheck(this, MaintenanceConfirmDevice);

		return _possibleConstructorReturn(this, (MaintenanceConfirmDevice.__proto__ || Object.getPrototypeOf(MaintenanceConfirmDevice)).apply(this, arguments));
	}

	_createClass(MaintenanceConfirmDevice, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'onChange',
		value: function onChange(data) {
			var self = this;
			var index = this.props.index;
			this.props.changeData(index, {
				aboveMaintenanceTime: data.format('YYYY-MM-DD')
			});
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name, length) {
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
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.data;
			var isConfirm = this.props.isConfirm;
			console.log('wwrr', data);
			var showAllData = this.props.showAllData;
			var showMoreBtn = data['showMoreBtn'];
			var time = data["aboveMaintenanceTime"];
			var modelType = self.props.modelType;
			return _react2.default.createElement('div', { className: 'maintenance-device animated zoomIn' }, _react2.default.createElement('div', { className: 'maintenance-device-c' }, _react2.default.createElement('div', { className: 'maintenance-device-title' }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: '' }, modelType == 'equipment' ? '设备' : '工程', '\u660E\u7EC6')), _react2.default.createElement('div', { className: 'maintenance-device-info' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, modelType == 'equipment' ? '设备' : '工程', '\u540D\u79F0'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis', onClick: function onClick() {
					return self.NameInfo(data["equipmentName"]);
				} }, data["equipmentName"])), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4FDD\u517B\u8BA1\u5212\u65F6\u95F4'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data["maintenancePlanningTime"] || '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4EF7\u7A0E\u5408\u8BA1'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, Number(data['sumCost']).formatMoney(2, '', '') || '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u4E0A\u95E8\u4FDD\u517B\u65E5\u671F'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis ' + (!isConfirm ? '' : 'line-bottom') }, !isConfirm ? time ? moment(time).format('YYYY-MM-DD') : '-' : time ? _react2.default.createElement(_datePicker2.default, { value: moment(time), minDate: moment(Date.parse(new Date()) + 86400000), mode: 'date', format: function format(val) {
					return val.format('YYYY-MM-DD');
				}, onChange: function onChange(e) {
					return _this2.onChange(e);
				} }, _react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' })) : '-'))), _react2.default.createElement('div', { className: 'maintenance-device-info-i' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u8054\u7CFB\u4EBA'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis', onClick: function onClick() {
					return self.NameInfo(data["contactsMans"]);
				} }, data["contactsMans"] || '-')), _react2.default.createElement('div', { className: 'maintenance-device-info-i-r' }, _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-label more' }, '\u8054\u7CFB\u65B9\u5F0F'), _react2.default.createElement('div', { className: 'maintenance-device-info-i-l-val ellipsis' }, data["tel"] ? _react2.default.createElement('a', { href: 'tel:' + data["tel"], className: 'phone-number' }, data["tel"]) : '-')))), showMoreBtn ? _react2.default.createElement('div', { className: 'maintenance-device-btn border-line-h before specail-color', onClick: function onClick(e) {
					return _this2.props.openView(e);
				} }, _react2.default.createElement('span', null, '\u67E5\u770B\u66F4\u591A\u8BBE\u5907\u660E\u7EC6')) : ''));
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}]);

	return MaintenanceConfirmDevice;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MaintenanceConfirmDevice);

/***/ })

});