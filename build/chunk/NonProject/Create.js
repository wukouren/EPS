webpackJsonp([57],{

/***/ 1831:
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
   * 简单的用户卡片
   *
   * 使用场景（出现在header中居中展示，只有头像和名称）：
   * 	1. 餐厅新建维修订单－创建工程维修页面header的用户信息
   * 	2. 非项目采购－OC审批页面header中的用户信息
   *
   * 传入参数：
   * 	userinfo: {
   * 		id: 'aaa',
   * 		name: '李静',
   * 		avatar: '头像地址',
   * 		roleplaying: '创建人／审批人' // 扮演角色
   * 	}
   */

var SimpleUserCard = function (_Component) {
  _inherits(SimpleUserCard, _Component);

  function SimpleUserCard(props) {
    _classCallCheck(this, SimpleUserCard);

    return _possibleConstructorReturn(this, (SimpleUserCard.__proto__ || Object.getPrototypeOf(SimpleUserCard)).call(this, props));
  }

  _createClass(SimpleUserCard, [{
    key: "render",
    value: function render() {
      var userinfo = this.props.userinfo || {};
      return _react2.default.createElement("div", { className: "eps-simple-user-card" }, _react2.default.createElement("div", { className: "user-avatar-50" }, _react2.default.createElement("img", { src: 'http://www.joywok.com/' + userinfo.avatar["avatar_l"] })), _react2.default.createElement("div", { className: "suc-user-info" }, userinfo.roleplaying ? _react2.default.createElement("label", null, userinfo.roleplaying) : '', _react2.default.createElement("font", null, userinfo.name)));
    }
  }]);

  return SimpleUserCard;
}(_react.Component);

exports.default = SimpleUserCard;

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

/***/ 1906:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _textareaItem = __webpack_require__(366);

var _textareaItem2 = _interopRequireDefault(_textareaItem);

var _picker = __webpack_require__(364);

var _picker2 = _interopRequireDefault(_picker);

var _list = __webpack_require__(207);

var _list2 = _interopRequireDefault(_list);

var _inputItem = __webpack_require__(345);

var _inputItem2 = _interopRequireDefault(_inputItem);

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

__webpack_require__(367);

__webpack_require__(365);

__webpack_require__(208);

__webpack_require__(346);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dva = __webpack_require__(196);

var _SimpleUserCard = __webpack_require__(1831);

var _SimpleUserCard2 = _interopRequireDefault(_SimpleUserCard);

var _EpsModal = __webpack_require__(198);

var _constants = __webpack_require__(197);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

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
   * 调整非项目采购需求（LocalPM 拒绝后退回到RGM的的页面）
   */

var PRStoreInfo = (0, _constants.getDict)('PRStoreInfo');
var PRTypeInfo = (0, _constants.getDict)('PRTypeInfo');

var Create = function (_Component) {
	_inherits(Create, _Component);

	function Create(props) {
		_classCallCheck(this, Create);

		// console.log('CreatePO:======',this.props.params.objecttype);
		var _this = _possibleConstructorReturn(this, (Create.__proto__ || Object.getPrototypeOf(Create)).call(this, props));

		_this.createHandler = _this.createHandler.bind(_this);
		_this.state = {
			loading: true, // loading
			mobile: '', // 移动电话
			purchasingReason: PRTypeInfo[0]['value'], // 采购原由
			operateMarks: '' // 需求说明

			// 获取订单信息
		};if (_this.props.params.orderid) {
			_this.getOrderInfo();
		}
		return _this;
	}
	// 获取餐厅信息（PR订单）


	_createClass(Create, [{
		key: 'getOrderInfo',
		value: function getOrderInfo(nextPageNum) {
			var self = this;
			(0, _EpsRequest2.default)('/McdEpsApi/joywok/noproject/getOrderStoreInfo', {
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
					self.setState({ orderState: data["orderState"], orderNumber: data["orderNumber"], updateDate: data["updateDate"], 'purchasingReason': data['purchasingReason'], 'mobile': data['mobile'], 'operateMarks': data['operateMarks'], 'loading': false, fileCount: data['fileCount'], uploadPhaseName: data['uploadPhaseName'] });
				}
			});
		}
	}, {
		key: 'cacelHandler',
		value: function cacelHandler() {
			console.log('cacelHandler', this, '123123123123');
			var self = this;
			if (this.state.orderState) {
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
								eid: eid,
								record: {
									updateDate: self.state.updateDate,
									orderNumber: self.state.orderNumber,
									orderState: self.state.orderState
								}
							}
						};
						(0, _EpsRequest2.default)('/McdEpsApi/joywok/noproject/cancelSave', {
							method: 'POST',
							body: JSON.stringify(datas)
						}).then(function (resp) {
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
						self.cancelMemo = memo;
						// console.log('approve reject onClose:')
					}
				});
			} else {
				jw.closeWebView();
			}
		}
		// 表单校验

	}, {
		key: 'checkData',
		value: function checkData() {
			var datas = this.state;
			console.log('checkData:', datas);
			// 校验电话号码
			if (datas.mobile == '' || $.trim(datas.mobile) == '') {
				this.errorAlert('请输入移动电话');
				return false;
			} else if (!/^[0-9]{8,11}$/.test(datas.mobile)) {
				this.errorAlert('请输入正确的移动电话');
				return false;
			}
			// 校验需求说明
			if (datas.operateMarks == '' || $.trim(datas.operateMarks) == '') {
				this.errorAlert('请输入需求说明');
				return false;
			}
			// 校验采购原由，如果采购原由为1，那么通过，采购原由为2，提示"请在pc端操作"，之后将采购原由的值置为1
			// if(datas.purchasingReason=='2'){
			// 	this.errorAlert('更新/报废的采购请在pc端操作');
			// 	// this.setState({'purchasingReason' : '1'})
			// 	return false;
			// }
			return true;
		}

		// 错误弹框

	}, {
		key: 'errorAlert',
		value: function errorAlert(msg) {
			(0, _EpsModal.AlertBase)({
				tip: msg,
				icon: 'icon-save-error',
				onOk: function onOk() {}
			});
		}
	}, {
		key: 'createHandler',
		value: function createHandler() {
			var _this2 = this;

			console.log('createHandler');
			var self = this;
			// 校验数据是否正确
			if (this.checkData() == false) return;
			// 确认提交
			(0, _EpsModal.ConfirmBase)({
				tip: '确认要提交非项目订单？',
				icon: 'icon-repair-alert',
				onOk: function onOk() {
					// 数据保存中
					var saving = (0, _EpsModal.AlertBase)({
						tip: '正在提交非项目订单',
						icon: 'icon-saving',
						okBtn: {
							text: '提交中...'
						},
						onOk: function onOk() {
							console.log('onOk');
						}
					});
					var record = {
						storeNumber: PRStoreInfo.storeNumber,
						mobile: _this2.state.mobile,
						email: PRStoreInfo.email,
						purchasingReason: _this2.state.purchasingReason,
						// scrapNumber:报废单号,（采购原由是报废时必填）
						// scrapRemark:报废备注,
						operateMarks: _this2.state.operateMarks
					};
					if (self.props.params.orderid) {
						record.orderNumber = self.props.params.orderid;
					}
					var PostUrlArray = { 'equipment': '/McdEpsApi/joywok/noproject/submitEQPRInfo', 'project': '/McdEpsApi/joywok/noproject/submitCOPRInfo', 'it': '/McdEpsApi/joywok/noproject/submitITPRInfo' };
					(0, _EpsRequest2.default)(PostUrlArray[_this2.props.params.objecttype], {
						method: 'POST',
						body: JSON.stringify({
							param: {
								eid: eid,
								record: record
							}
						}),
						credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function (data) {
						console.log('submitNonProjectOrder data:======', data);
						saving.close();
						console.log(data.data.success, "data");
						if (data.data.success) {
							(0, _EpsModal.AlertBase)({
								tip: '已成功提交',
								icon: 'icon-save-success',
								onOk: function onOk() {
									// return;
									setTimeout(function () {
										jw.closeWebView();
									}, 500);
								}
							});
						}
					}).catch(function (error) {});
					// setTimeout(()=>{
					// 	saving.close();
					// 	// 提交成功
					// 	AlertBase({
					// 		tip: '已成功提交',
					// 		icon: 'icon-save-success',
					// 		onOk: ()=>{
					// 			console.log('onOk')
					// 		}
					// 	});
					// },500)
				},
				onCancel: function onCancel() {
					saving.close();
					// jw.closeWebView();
					// 提交失败
					// AlertBase({
					// 	tip: '这里是错误示例',
					// 	icon: 'icon-save-error',
					// 	onOk: ()=>{
					// 		console.log('onOk')
					// 	}
					// });
				}
			});
		}

		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			this.setHeight();
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			$(window).resize(function () {
				self.setHeight();
				setTimeout(function () {
					var clientHeightNow = document.documentElement.clientHeight || document.body.clientHeight;
					if (clientHeight > clientHeightNow) {
						$('.eps-create-nonproject-c').stop().animate({ scrollTop: '100000px' });
					} else {}
				}, 100);
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
				var footer = $('.eps-footer').height() || 0;
				var fileHeight = $('.file-num-specail').height() || 0;
				$('.eps-create-nonproject-c').css({ height: clientHeight - footer - fileHeight + 'px' });
			}, 0);
		}
	}, {
		key: 'openFileView',
		value: function openFileView(data) {
			var url = EpsWebRoot + '/#' + data;
			var datas = this.state;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var self = this;
			var typename = void 0;
			var data = this.state;
			switch (this.props.params.objecttype) {
				case 'equipment':
					typename = '设备';
					break;
				case 'project':
					typename = '工程';
					break;
				case 'it':
					typename = 'IT';
					break;
				default:
					typename = '设备';
					break;
			}
			// 组织显示内容
			if (this.props.params.orderid && this.state.loading) {
				return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, '\u52A0\u8F7D\u4E2D'));
			} else {
				var orderid = window.location.href.split('?updateDate')[0].split('/');
				orderid = orderid[orderid.length - 1];
				var fileUrl = '/file/' + orderid;
				if (window.isUnfinishedOrHistory()) {
					fileUrl = '/filehistory/' + orderid;
				}
				var fileList = void 0;
				if (this.props.params.orderid) {
					fileList = _react2.default.createElement('div', { className: 'file-num-specail border-line-h before', onClick: function onClick(e) {
							return _this3.openFileView(fileUrl);
						} }, _react2.default.createElement('i', { className: 'icon-file' }), _react2.default.createElement('span', { className: 'preview-file' }, '\u67E5\u770B\u9644\u4EF6', data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : ''));
				} else {}
				return _react2.default.createElement('div', { className: 'eps-create-nonproject' }, _react2.default.createElement('div', { className: 'eps-create-nonproject-c' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_SimpleUserCard2.default, { userinfo: userinfo }))), _react2.default.createElement('div', { className: 'eps-create-body' }, _react2.default.createElement('div', { className: 'eps-box-wrap' }, _react2.default.createElement('div', { className: 'eps-box' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u9910\u5385\u7F16\u53F7')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, PRStoreInfo.storeNumber))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u9910\u5385\u540D\u79F0')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, PRStoreInfo.storeName))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u516C\u53F8\u7F16\u53F7')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, PRStoreInfo.companyCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u90AE\u4EF6\u5730\u5740')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, PRStoreInfo.email))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u9910\u5385\u7535\u8BDD')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, PRStoreInfo.tel))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u9910\u5385\u5730\u5740')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, PRStoreInfo.address))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u91C7\u8D2D\u7C7B\u578B')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, typename))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, _react2.default.createElement('font', null, '\u79FB\u52A8\u7535\u8BDD'), _react2.default.createElement('i', { className: 'icon-required' }))), _react2.default.createElement('dd', null, _react2.default.createElement(_inputItem2.default, { className: 'jw-inline', type: 'number', placeholder: '', value: this.state.mobile, onChange: function onChange(v) {
						self.setState({ 'mobile': v });
					} }))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, _react2.default.createElement('font', null, '\u91C7\u8D2D\u539F\u7531'), _react2.default.createElement('i', { className: 'icon-required' }))), _react2.default.createElement('dd', null, _react2.default.createElement(_list2.default, { style: { backgroundColor: 'white' }, className: 'picker-list jw-list eps-inline' }, _react2.default.createElement(_picker2.default, { data: PRTypeInfo, cols: 1, className: 'forss', value: [this.state.purchasingReason], onChange: function onChange(v) {
						self.setState({ 'purchasingReason': v[0] });
					} }, _react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' }))))))), _react2.default.createElement('div', { className: 'eps-box-wrap eps-box-item' }, _react2.default.createElement('div', { className: 'eps-box eps-purchase-desc' }, _react2.default.createElement('label', null, _react2.default.createElement('font', null, '\u9700\u6C42\u8BF4\u660E'), _react2.default.createElement('i', { className: 'icon-required' })), _react2.default.createElement('div', { className: 'eps-textarea-3l' }, _react2.default.createElement(_textareaItem2.default, { placeholder: '\u8BF7\u8F93\u5165\u9700\u6C42\u63CF\u8FF0\u3002', value: this.state.operateMarks, autoHeight: true, rows: '3', onChange: function onChange(v) {
						self.setState({ 'operateMarks': v });
					} })))))), fileList, _react2.default.createElement('div', { className: 'eps-footer' }, _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
						return _this3.cacelHandler(e);
					} }, '\u53D6\u6D88'), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: this.createHandler }, '\u63D0\u4EA4'))));
			}
		}
	}]);

	return Create;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(Create);

/***/ }),

/***/ 1961:
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
}; /**
    * 非项目流程 model
    */

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

  namespace: 'nonprojectcreatepo',

  state: {
    loading: true,
    filter: {
      pageno: 0,
      order: 'comprehensive_desc'
    }
  },

  reducers: {
    // 把返回的数据放到state中
    save: function save(state, action) {
      return _extends({}, state, action.payload);
    },

    // 合并列表
    savelist: function savelist(state, action) {
      var payload = action.payload;
      state.list = state.list ? state.list : [];
      if (state.list.length == 0) {
        var tmpdata = _.where(state.cachedList, { category: state.filter.category });
        if (tmpdata.length > 0) {
          state.list = tmpdata[0];
        }
      }
      return _extends({}, state, { list: _.union(state.list, payload.list), total: payload.total, pageinfo: payload.pageinfo, loading: payload.loading });
    },

    // 过滤条件发生变化
    FILTER_CHANGE: function FILTER_CHANGE(state, action) {
      return _extends({}, state, { filter: _.extend(state.filter, action.payload) });
    },

    // 设置loding状态
    SET_LOADING: function SET_LOADING(state, action) {
      return _extends({}, state, action.payload);
    }
  },

  effects: {
    // 礼品列表
    list: /*#__PURE__*/regeneratorRuntime.mark(function list(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;

      var newpayload, _ref3, data, headers;

      return regeneratorRuntime.wrap(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newpayload = _.clone(payload);

              if (newpayload.category && newpayload.category == 'all') newpayload.category = '';
              _context.next = 4;
              return call(demoService.fetch, newpayload);

            case 4:
              _ref3 = _context.sent;
              data = _ref3.data;
              headers = _ref3.headers;
              _context.next = 9;
              return put({
                type: 'save',
                payload: {
                  list: data.JMGoodsList,
                  total: data.JMStatus.total_num,
                  pageinfo: data.JMStatus,
                  loading: false
                }
              });

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, list, this);
    }),

    // 过滤条件发生变化
    FILTER_CHANGE: function FILTER_CHANGE(_ref4, _ref5) {
      var payload = _ref4.payload;
      var call = _ref5.call,
          put = _ref5.put;

      put({
        type: 'FILTER_CHANGE',
        payload: payload
      });
    },

    // 设置loding状态
    SET_LOADING: function SET_LOADING(_ref6, _ref7) {
      var payload = _ref6.payload;
      var call = _ref7.call,
          put = _ref7.put;

      put({
        type: 'SET_LOADING',
        payload: payload
      });
    }
  },

  subscriptions: {}

};

/***/ })

});