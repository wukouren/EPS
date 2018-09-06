webpackJsonp([48],{

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

/***/ 1914:
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

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

var _UserCard = __webpack_require__(1435);

var _UserCard2 = _interopRequireDefault(_UserCard);

var _DeviceInfoCard = __webpack_require__(1936);

var _DeviceInfoCard2 = _interopRequireDefault(_DeviceInfoCard);

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
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 设备明细
   */

var DeviceInfo = function (_Component) {
	_inherits(DeviceInfo, _Component);

	function DeviceInfo(props) {
		_classCallCheck(this, DeviceInfo);

		var _this = _possibleConstructorReturn(this, (DeviceInfo.__proto__ || Object.getPrototypeOf(DeviceInfo)).call(this, props));

		_this.onEndReached = _this.onEndReached.bind(_this);
		_this.orderNumber = _this.props.params.orderid;

		return _this;
	}

	_createClass(DeviceInfo, [{
		key: 'render',
		value: function render() {
			var data = this.props.deviceinfo;
			var view = this._init_view();

			if (data.loading) {
				return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, "\u52A0\u8F7D\u4E2D"));
			} else {
				return _react2.default.createElement('div', { className: 'root-container device-info-list' }, view);
			}
		}
	}, {
		key: '_init_view',
		value: function _init_view() {
			var data = this.props.deviceinfo;
			var LoadMoreHtml = '';
			if (data.noMore && data.hide) {
				LoadMoreHtml = _react2.default.createElement('div', null);
			} else if (data.noMore) {
				LoadMoreHtml = _react2.default.createElement('div', { className: 'noMore-Data' }, "\u6CA1\u6709\u66F4\u591A\u4E86!");
			} else {
				LoadMoreHtml = _react2.default.createElement(_LoadMore2.default, { onEndReached: this.onEndReached,
					data: {
						hide: data['hide'],
						fix: data['fix']
					},
					container: 'device-details' });
			}
			var view = '';

			var deviceList = this.props.deviceinfo.deviceList;
			var creatorinfo = this.props.deviceinfo.creatorinfo;
			// creatorinfo.avatar={};
			view = _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('sesstion', { className: 'main ' }, _react2.default.createElement('div', { className: 'main-c device-details' }, _.map(_.values(deviceList), function (item, index) {
				return _react2.default.createElement(_DeviceInfoCard2.default, { index: index + 1, allIndex: _.values(deviceList).length, devicedata: item });
			}), LoadMoreHtml)));
			return view;
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
			jw.pushWebView(url);
		}
	}, {
		key: 'onEndReached',
		value: function onEndReached(e) {
			var dispatch = this.props.dispatch;
			var pageNum = this.props.deviceinfo.pageNum;
			console.log("1111111", 'onEndReached');
			dispatch({
				type: "deviceinfo/changeData",
				payload: {
					noMore: false,
					fix: true
				}
			});
			dispatch({
				type: "deviceinfo/loadMoreDevice",
				pages: this.props.deviceinfo.pages,
				payload: {
					param: {
						eid: eid,
						condition: {
							orderNumber: this.orderNumber
						},
						pager: {
							pageNum: pageNum + 1,
							pageSize: '10'
						}
					}
				}
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var dispatch = this.props.dispatch;
			var orderid = this.props.params.orderid;
			setTimeout(function () {
				self.setHeight();
				(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getEquipmentList', {
					method: 'POST',
					body: JSON.stringify({
						param: {
							eid: eid,
							condition: {
								orderNumber: orderid,
								orderState: '4'
							},
							pager: { pageNum: '1', pageSize: '10' }
						}
					})
				}).then(function (resp) {
					if (resp['data']['success'] == false) {} else {
						NProgress.done();
						var data = resp['data']['body'];
						console.log('zzzzzzzzzzzzzz', resp['data']['body']);
						var creatorinfo = {};
						creatorinfo.name = data.createBy;
						creatorinfo.time = data.dateAppointment;
						creatorinfo.orderNumber = data.orderNumber;
						creatorinfo.orderState = data.orderState;
						creatorinfo.storeName = data.storeName;
						creatorinfo.repairType = data.repairType;
						creatorinfo.remark = data.maintenanceRemarks;
						var deviceList = self.DevicePartList(data);
						var allkeys = _.keys(deviceList, "deviceList");
						dispatch({
							type: 'deviceinfo/changeData',
							payload: _.extend({
								loading: false,
								noMore: allkeys.length < 10 ? true : false, //是否还有下一页
								hide: allkeys.length < 3 ? true : false, //是否显示加载的动画
								list: data.pageInfo.list, //设备列表
								creatorinfo: creatorinfo, //
								costList: data.costList, //杂费列表
								pages: data.pageInfo.pages,
								deviceList: deviceList
							}, resp['data']['body'])
						});
						data['createEid'] && (0, _constants.getUsers)(data['createEid'], 'num', function (resp) {
							var userdata = resp['data'][0];
							dispatch({
								type: 'deviceinfo/changeData',
								payload: {
									avatar: userdata['avatar']
								}
							});
						});
					}
				});
			}, 0);
			NProgress.done();
		}
	}, {
		key: 'DevicePartList',
		value: function DevicePartList(data) {
			var devicepartlist = data.pageInfo.list;
			var deviceList = {};
			var incidentalList = data.incidentalList;
			_.each(devicepartlist, function (item) {
				if (!item.partName) {
					var deviceObj = _.extend({}, item);
					deviceObj.partList = [];
					deviceList[item.deviceNumber] = deviceObj;
				}
			});
			var partList = _.filter(data.pageInfo.list, function (item) {
				return item.partName;
			});
			_.each(partList, function (item) {
				deviceList[item.deviceNumber]['partList'].push(item);
			});
			_.each(incidentalList, function (item) {
				deviceList[item.deviceNumber]['deviceFee'] = item;
			});
			return deviceList;
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
				$('.main-c.device-details').css({ height: clientHeight + 20 + 'px' });
			}, 0);
		}
	}]);

	return DeviceInfo;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(DeviceInfo);

/***/ }),

/***/ 1936:
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

var DeviceInfoCard = function (_Component) {
  _inherits(DeviceInfoCard, _Component);

  function DeviceInfoCard(props) {
    _classCallCheck(this, DeviceInfoCard);

    var _this = _possibleConstructorReturn(this, (DeviceInfoCard.__proto__ || Object.getPrototypeOf(DeviceInfoCard)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(DeviceInfoCard, [{
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
    key: 'NameInfoSpecail',
    value: function NameInfoSpecail(name) {
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

      var devicedata = this.props.devicedata;
      var deviceFee = devicedata.deviceFee;
      var deviceFeeMaintaince = 0;
      var partFee = 0;
      console.log('这个里面输出了什么呢', devicedata);
      _.each(devicedata.partList, function (item) {
        if (item.operate == '2') {
          deviceFeeMaintaince = deviceFeeMaintaince + item.totalMaintenanceCost;
          partFee = partFee + item.totalMaintenanceCost;
        }
      });
      var self = this;
      var partHtml = '';
      if (devicedata.partList && devicedata.partList.length > 0) {
        partHtml = _.map(devicedata.partList, function (item) {
          return _react2.default.createElement('div', { className: 'todo-fitting partList' }, _react2.default.createElement('div', { className: 'todo-fitting-i' }, _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-title', onClick: function onClick() {
              return self.NameInfo(item.partName);
            } }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: 'todo-info-label' }, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.partName)), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.operate ? (0, _constants.getDictVal)('fittingOperation', item.operate) : '无'))), _react2.default.createElement('div', { className: 'todo-fitting-info hide' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
              return self.NameInfo(self.turnMoney(item.maintenancePrice * item.maintenanceNum) + ' (' + item.rate + ')');
            } }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u603B\u4EF7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, self.turnMoney(item.totalMaintenanceCost) + ' (' + item.rate + ')')), _react2.default.createElement('div', { className: 'todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.maintenanceNum))), _react2.default.createElement('div', { className: 'todo-fitting-info specail' }, _react2.default.createElement('div', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u4EF7\u683C"), _react2.default.createElement('div', { className: 'todo-info-val' }, item.maintenancePriceNotax, "(\u4E0D\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, item.maintenanceNum)), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u8BBE\u5907\u7A0E\u7387"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.rate || '-'))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u8BBE\u5907\u7A0E\u91D1"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.taxes || '-')), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u4EF7\u7A0E\u5408\u8BA1"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, self.turnMoney((item.operate == '2' ? item.maintenancePrice * item.maintenanceNum : 0) || 0)))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u56FA\u5B9A\u8D44\u4EA7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.partIsFa))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
              return self.NameInfo(item.mark);
            } }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, item.mark ? item.mark : '无')))));
        });
      } else {
        partHtml = '';
      }
      var moneyInfo = '';
      if (devicedata['deviceFee']) {
        var deviceAllFee = deviceFee.carCost + deviceFee.hotelCost + deviceFee.installationFee + deviceFee.otherCost + deviceFeeMaintaince;
        var otherFee = deviceFee.carCost + deviceFee.hotelCost + deviceFee.installationFee + deviceFee.otherCost;
        // deviceFeeMaintaince 老的维修费不含税
        console.log(deviceFee, 'deviceFee-deviceFee-deviceFeedeviceFee');
        moneyInfo = _react2.default.createElement('div', { className: 'todo-fitting deviceFee' }, _react2.default.createElement('div', { className: 'todo-fitting-i' }, _react2.default.createElement('div', { className: 'todo-fitting-info specail' }, _react2.default.createElement('div', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u8D39"), _react2.default.createElement('div', { className: 'todo-info-val' }, self.turnMoney(partFee || 0), "(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'todo-fitting-info specail' }, _react2.default.createElement('div', { className: 'todo-info-label' }, "\u4EBA\u5DE5\u8D39"), _react2.default.createElement('div', { className: 'todo-info-val' }, _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.installationFeeNotax || 0) + '(不含税)');
          } }, self.turnMoney(deviceFee.installationFeeNotax || 0), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', null, deviceFee.installationFeeRate && deviceFee.installationFeeRate != '0' ? deviceFee.installationFeeRate : '-'), _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.installationFee || 0) + '(含税)');
          } }, self.turnMoney(deviceFee.installationFee || 0), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-fitting-info specail' }, _react2.default.createElement('div', { className: 'todo-info-label' }, "\u5DEE\u65C5\u8D39"), _react2.default.createElement('div', { className: 'todo-info-val' }, _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.carCostNotax || 0) + '(不含税)');
          } }, self.turnMoney(deviceFee.carCostNotax || 0), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', null, deviceFee.carCostTax && deviceFee.carCostTax != '0' ? deviceFee.carCostTax : '-'), _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.carCost || 0) + '(含税)');
          } }, self.turnMoney(deviceFee.carCost || 0), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-fitting-info specail' }, _react2.default.createElement('div', { className: 'todo-info-label' }, "\u4F4F\u5BBF\u8D39"), _react2.default.createElement('div', { className: 'todo-info-val' }, _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.hotelCostNotax || 0) + '(不含税)');
          } }, self.turnMoney(deviceFee.hotelCostNotax || 0), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', null, deviceFee.hotelCostTax && deviceFee.hotelCostTax != '0' ? deviceFee.hotelCostTax : '-'), _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.hotelCost || 0) + '(含税)');
          } }, self.turnMoney(deviceFee.hotelCost || 0), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-fitting-info specail' }, _react2.default.createElement('div', { className: 'todo-info-label' }, "\u5176\u4ED6\u8D39\u7528"), _react2.default.createElement('div', { className: 'todo-info-val' }, _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.otherCostNotax || 0) + '(不含税)');
          } }, self.turnMoney(deviceFee.otherCostNotax || 0), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', null, deviceFee.otherCostTax && deviceFee.otherCostTax != '0' ? deviceFee.otherCostTax : '-'), _react2.default.createElement('span', { className: 'ellipsis', onClick: function onClick() {
            return _this2.NameInfoSpecail(self.turnMoney(deviceFee.otherCost || 0) + '(含税)');
          } }, self.turnMoney(deviceFee.otherCost || 0), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
            return _this2.NameInfo(deviceFee.otherCostRemark);
          } }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u8D39\u7528\u5907\u6CE8"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, deviceFee.otherCostRemark))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
            return _this2.NameInfo(otherFee + '(含税)');
          } }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u6742\u8D39"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, self.turnMoney(otherFee), "(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'todo-fitting-msg', onClick: function onClick() {
            return _this2.NameInfoSpecail(deviceAllFee + '(含税)');
          } }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u603B\u4EF7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, self.turnMoney(deviceAllFee), "(\u542B\u7A0E)")))));
      }

      return _react2.default.createElement('div', { className: 'todo-card  zoomIn specail-zhailei' }, _react2.default.createElement('div', { className: 'todo-card-index' }, this.props.index || 0, '/', this.props.allIndex || 0), _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info deviceinfo' }, _react2.default.createElement('div', { className: 'todo-info-i border-line-h deviceinfo-c after' }, _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this2.NameInfo(devicedata.vendorName);
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u5546"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.vendorName))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('i', null), _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this2.NameInfo(devicedata.deviceName);
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.deviceName)), _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u5E8F\u5217\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.deviceSerialNumber))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code'), _react2.default.createElement('span', { className: 'todo-info-val' }, devicedata.faCategory)), _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code2'), _react2.default.createElement('span', { className: 'todo-info-val' }, devicedata.subCategory))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, devicedata.operate ? (0, _constants.getDictVal)('equipmentOperation', devicedata.operate) : '-')), _react2.default.createElement('div', { className: 'todo-info-l todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, _react2.default.createElement('font', { className: 'eps-badge' }, devicedata.maintenanceNum || '0')))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this2.NameInfo(devicedata.mark);
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, devicedata.mark ? devicedata.mark : '-')))), moneyInfo, partHtml));
    }
  }]);

  return DeviceInfoCard;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
  return state;
})(DeviceInfoCard);

/***/ }),

/***/ 1967:
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

var _DeviceInfo = __webpack_require__(1978);

var DeviceInfoService = _interopRequireWildcard(_DeviceInfo);

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
  namespace: 'deviceinfo',
  state: {
    loading: {
      loading: true,
      fix: true,
      hide: false
    },
    noMore: false,
    fix: false,
    pageNum: 1,
    size: 10
  },
  reducers: {
    changeData: function changeData(state, action) {
      return _extends({}, state, action.payload);
    },
    changeDeviceList: function changeDeviceList(state, action) {
      console.log(action.payload, "action");
      var newDeviceList = _.union(state.list, action.payload.list);
      var loading = action.payload.loading;
      var pageNum = action.payload.pageNum;
      return _extends({}, state, { list: newDeviceList, fix: action.payload.fix, loading: loading, pageNum: pageNum, noMore: action.payload.noMore, pages: action.payload.pages });
    }
  },
  effects: {
    loadMoreDevice: /*#__PURE__*/regeneratorRuntime.mark(function loadMoreDevice(_ref, _ref2) {
      var payload = _ref.payload,
          pages = _ref.pages;
      var call = _ref2.call,
          put = _ref2.put;
      var data;
      return regeneratorRuntime.wrap(function loadMoreDevice$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(payload.param, pages, "2222");

              if (!(pages < payload.param.pager.pageNum)) {
                _context.next = 7;
                break;
              }

              console.log('没有更多数据了');
              _context.next = 5;
              return put({
                type: 'changeData',
                payload: {
                  loading: false,
                  noMore: true
                }
              });

            case 5:
              _context.next = 16;
              break;

            case 7:
              _context.next = 9;
              return call(DeviceInfoService.getEquipmentList, payload);

            case 9:
              data = _context.sent;

              console.log(data, payload, "loadMoreDevice");

              if (!(data.data.body.pageInfo && data.data.body.pageInfo.detailList && data.data.body.pageInfo.detailList.length > 0)) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return put({
                type: 'changeDeviceList',
                payload: {
                  loading: false,
                  list: data.data.body.pageInfo.detailList,
                  fix: false,
                  pages: data.data.body.pages,
                  noreMore: data.data.body.pages < payload.param.pager.pageNum ? true : false,
                  pageNum: payload.param.pager.pageNum
                }
              });

            case 14:
              _context.next = 16;
              break;

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, loadMoreDevice, this);
    })
  },
  subscriptions: {}
};

/***/ }),

/***/ 1978:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEquipmentList = getEquipmentList;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//获取设备订单详情


//获取待办件数
function getEquipmentList(parame) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok' + '/repair/getEquipmentList', {
    method: 'POST',
    body: JSON.stringify(parame)
  });
}

/***/ })

});