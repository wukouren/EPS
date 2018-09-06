webpackJsonp([10],{

/***/ 1850:
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

var _HeaderCard = __webpack_require__(1943);

var _HeaderCard2 = _interopRequireDefault(_HeaderCard);

var _VendorCard = __webpack_require__(1946);

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
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 此js含以下页面(拆单前的，需求阶段页面)：
   * 
   * 1. Local PM 确认供应商的需求明细（设备／工程／IT）
   *    路由：/newstoreit/pmconfirm/:orderid
   * 2. DOA审批（设备／工程／IT）拆单前的 
   *    路由：/newstoreit/approval/:orderid?type=1
   *
   * 项目采购需求：
  		1. Local PM确认供应商的需求明细： 设备／工程／IT 获取供应商需求明细 接口中，返回字段中都会加一个市场信息的list，待后面出图排产
  		2. DOA审批 设备／工程／IT 页面，也会增加市场信息的list展示，待后面出图排产,和1共用一个页面
  		3. 餐厅确认评价（设备／工程）／餐厅确认收货（IT）,页面不会展示市场信息list,但和4是共用的一个页面
  		4. 送货调整，DOA审批：（设备／工程），会增加市场信息的list展示，（IT）是否有市场信息的list展示，待德勤	确认？
   */

var PMConfirm = function (_Component) {
  _inherits(PMConfirm, _Component);

  function PMConfirm(props) {
    _classCallCheck(this, PMConfirm);

    var _this = _possibleConstructorReturn(this, (PMConfirm.__proto__ || Object.getPrototypeOf(PMConfirm)).call(this, props));

    _this.state = {};
    _this.setWrapHeight = _this.setWrapHeight.bind(_this);
    _this.selectVendorHandler = _this.selectVendorHandler.bind(_this);
    _this.changeRefuseRemark = _this.changeRefuseRemark.bind(_this);
    return _this;
  }

  _createClass(PMConfirm, [{
    key: 'NameInfo',
    value: function NameInfo(e, name) {
      if ((0, _constants.DataLength)(name) > 10) {
        (0, _EpsModal.AlertInfoBase)({
          text: name
        });
      }
    }

    // 拒绝订单

  }, {
    key: 'reject',
    value: function reject() {
      var self = this;
      console.log(this.props, "pmconfirm");
      if (this.props.pmconfirm.orderState == '3') {
        setTimeout(function () {
          var selectedVendor = _.where(self.props.pmconfirm.list, { checked: true });
          if (selectedVendor.length == 0) {
            (0, _EpsModal.AlertBase)({
              tip: '请选择拒绝的供应商!',
              icon: 'icon-save-error',
              onOk: function onOk() {}
            });
            return;
          }
          // let saving = showAlert({
          //   tip: '移动端拒绝为拒绝全部，若要拒绝部分，请在 PC 端操作！',
          //   okBtn: {
          //     text: '确认拒绝',
          //     style: { 'width': '50%', 'border-right':'1px solid #e5e4e5' }
          //   },
          //   onOk: ()=>{

          setTimeout(function () {
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
                //调用审批拒绝接口
                console.log(memo, "memo");
                self.rejectOrder(approveFlg, memo, callback);
              },
              onClose: function onClose(memo) {
                self.rejectMemo = memo;
              }
            });
          }, 500);
          //   },
          //   cancelBtn: {
          //     text: <div className="project-cancel">取消拒绝</div>,
          //     style: { 'width': '50%' }
          //   },
          //   onCancel: ()=>{
          //   }
          // });
        });
      } else {
        setTimeout(function () {
          var rejectDialog = (0, _EpsModal.MemoDialog)({
            title: '是否拒绝该订单?',
            defaultValue: self.rejectMemo ? self.rejectMemo : '',
            btnIconClass: 'icon-reject',
            btnVal: '拒绝',
            placeholder: '拒绝必须输入备注...',
            memorequired: true,
            onBtnClick: function onBtnClick(memo, callback) {
              self.rejectMemo = memo;
              var approveFlg = 'REFUSE';
              //调用审批拒绝接口
              self.rejectOrder(approveFlg, memo, callback);
            },
            onClose: function onClose(memo) {
              self.rejectMemo = memo;
            }
          });
        }, 500);
      }
    }
  }, {
    key: 'rejectOrder',
    value: function rejectOrder(approveFlg, memo, callback) {
      var self = this;
      console.log(this.props.pmconfirm, "pmconfirm");
      var vendorList = [];
      var list = _.where(this.props.pmconfirm.list, { checked: true });
      _.map(list, function (item) {
        var itemobj = {};
        itemobj.rpType = item.rpType;
        itemobj.vendorNumber = item.vendorNumber;
        itemobj.refuseRemark = item.refuseRemark;
        vendorList.push(itemobj);
      });
      // console.log(vendorList,"verdorList")
      // return;
      (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/submitOrderInfo', {
        method: 'POST',
        body: JSON.stringify({
          param: {
            eid: userinfo.employee_id,
            record: {
              updateDate: self.props.pmconfirm.updateDate,
              orderNumber: self.props.pmconfirm.orderNumber,
              orderState: self.props.pmconfirm.orderState,
              approveFlg: approveFlg,
              operateMarks: memo,
              vendorList: vendorList
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
    // 通过订单

  }, {
    key: 'agree',
    value: function agree() {
      var self = this;
      var type = this.props.location.query.type;
      var agreeDialog = (0, _EpsModal.MemoDialog)({
        title: '是否确认通过？',
        defaultValue: self.agreeMemo ? self.agreeMemo : '',
        btnVal: '通过',
        placeholder: '选择输入备注...',
        memorequired: false,
        onBtnClick: function onBtnClick(memo, callback) {
          var approveFlg = "PASS";
          self.submitOrder(approveFlg, memo);
        },
        onClose: function onClose(memo) {}
      });
    }

    //提交审批订单

  }, {
    key: 'submitOrder',
    value: function submitOrder(approveFlg, memo, callback) {
      var self = this;
      (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/submitOrderInfo', {
        method: 'POST',
        body: JSON.stringify({
          param: {
            eid: userinfo.employee_id,
            record: {
              updateDate: self.props.pmconfirm.updateDate,
              orderNumber: self.props.pmconfirm.orderNumber,
              orderState: self.props.pmconfirm.orderState,
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
        }
      });
    }
  }, {
    key: 'openLog',
    value: function openLog() {
      var url = EpsWebRoot + '/#/log/' + this.props.params['orderid'];
      var data = this.props.pmconfirm;
      data['logType'] = { key: 'project', subkey: '41' };
      window.upTabsData('log', 'cache', data);
      jw.pushWebView(url);
    }
  }, {
    key: 'openProcessTable',
    value: function openProcessTable() {
      var data = this.props.pmconfirm;
      data['logType'] = { key: 'project', subkey: '41' };
      window.upTabsData('log', 'cache', data);
      var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
      jw.pushWebView(url);
    }

    // set wrap 高度

  }, {
    key: 'setWrapHeight',
    value: function setWrapHeight() {
      var self = this;
      var footerheight = typeof $(_reactDom2.default.findDOMNode(self.refs.footer)).outerHeight() != 'undefined' ? $(_reactDom2.default.findDOMNode(self.refs.footer)).outerHeight() : 0;
      var priceheight = typeof $(_reactDom2.default.findDOMNode(self.refs.price)).outerHeight() != 'undefined' ? $(_reactDom2.default.findDOMNode(self.refs.price)).outerHeight() : 0;
      // 页面最大高度
      $(_reactDom2.default.findDOMNode(self.refs.bodyWrap)).css({ 'max-height': $(window).height() - priceheight - footerheight - 15 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('ddd', window.EpsEvents);
      NProgress.done();
      if (JWReady == true) {
        jw.setFuncBtns([{ type: 4 }]);
      } else {
        window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
          jw.setFuncBtns([{ type: 4 }]);
        });
      }
      var dispatch = this.props.dispatch;
      var self = this;
      var eid = userinfo.employee_id;
      var objecttype = this.props.params.objecttype;

      //获取供应商列表
      (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/getVendorInfo', {
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
        console.log('111111', resp);
        if (resp['data']['success'] == false) {} else {
          // 给供应商添加唯一的id
          var data = resp['data']['body'];
          data.list = _.map(data.list, function (item, key) {
            return _.extend(item, { eps_id: item.vendorNumber + '' + key, refuseRemark: item.refuseRemark ? item.refuseRemark : '' });
          });
          dispatch({
            type: 'pmconfirm/changeData',
            data: _.extend({
              orderState: data.orderState
            }, data)
          });
        }
      });
      (0, _EpsRequest2.default)('/McdEpsApi/joywok/newstoreit/getOrderInfo', {
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
        console.log('2222', resp);

        if (resp['data']['success'] == false) {} else {
          var data = resp['data']['body'];
          dispatch({
            type: 'pmconfirm/changeData',
            data: _.extend({
              orderState: data.orderState
            }, data)
          });
          if (data['createBy']) {
            (0, _constants.getUsers)(data['createBy'], 'num', function (resp) {
              var userdata = resp['data'][0];
              dispatch({
                type: 'pmconfirm/changeData',
                data: {
                  avatar: userdata['avatar'],
                  loading: false
                }
              });
            });
          }
        }
      });

      //打开群聊
      window.onJwNavBtnClick = function (data) {
        if (data['type'] == '4') {
          var modelData = self.props.pmconfirm;
          (0, _constants.openChart)(eid, modelData['orderNumber'], '测试');
        }
      };
      // 安卓兼容 
      if (isAndroid()) {
        var lastHeight = $(window).height();
        var newHeight = void 0;
        $(window).resize(function () {
          self.setWrapHeight();
        });
      }
    }
  }, {
    key: 'selectVendorHandler',
    value: function selectVendorHandler(eps_id, params) {
      var list = this.props.pmconfirm.list;
      var dispatch = this.props.dispatch;
      var newlist = _.map(list, function (item) {
        return item.eps_id == eps_id ? _.extend(item, params) : item;
      });
      dispatch({
        type: 'pmconfirm/changeData',
        data: {
          list: newlist
        }
      });
    }
  }, {
    key: 'changeRefuseRemark',
    value: function changeRefuseRemark(eps_id, params) {
      this.selectVendorHandler(eps_id, params);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var data = this.props.pmconfirm;
      var isNotChecked = /view/.test(location.href);
      console.log('rrrr', data);
      var objecttype = this.props.params.objecttype;
      // 组织显示内容
      if (data.loading) {
        return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }), _react2.default.createElement('span', null, '\u52A0\u8F7D\u4E2D'));
      } else {
        var Item = _list2.default.Item;
        console.log('Marlin 1', data);
        setTimeout(function () {
          // 重设高度
          self.setWrapHeight();
        }, 0);
        var buttons = '',
            project = data,
            strOrderSta = project['orderState'] && _constants.orderStatus["newstoreit"]['53'][project['orderState']] ? _constants.orderStatus["newstoreit"]['53'][project['orderState']] : { 'label': '' };
        // if (isUnfinishedOrHistory() || (window.location.href.indexOf('/pmconfirm/') != -1)) {
        if (isUnfinishedOrHistory()) {
          buttons = _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
              return _this2.openProcessTable();
            } }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"])));
        } else {
          buttons = _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
              return _this2.reject(e);
            } }, '\u62D2\u7EDD'), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
              return _this2.agree(e);
            } }, '\u786E\u8BA4'));
        }
        // 拼装供应商列表
        var vendorListDiv = '';
        if (this.props.pmconfirm.list && this.props.pmconfirm.list.length > 0) {
          var list = this.props.pmconfirm.list;
          var onlyShow = this.props.pmconfirm.orderState == '3' ? false : true;
          vendorListDiv = _react2.default.createElement('div', { className: 'eps-device-list eps-vendor-list' }, list.map(function (item) {
            return onlyShow == false ? _react2.default.createElement(_VendorCard.VendorCardSelect, { isNotChecked: isNotChecked, orderid: self.props.params['orderid'], itemdata: item, selectHandler: self.selectVendorHandler, changeRefuseRemark: self.changeRefuseRemark }) : _react2.default.createElement(_VendorCard.VendorCardShow, { orderid: self.props.params['orderid'], itemdata: item });
          }));
        }
        return _react2.default.createElement('div', { className: 'eps-nonproject-approval eps-project-pmconfirm' }, _react2.default.createElement('div', { className: 'eps-pmconfirm-body', ref: 'bodyWrap' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_HeaderCard2.default, { orderdata: _.extend({}, this.props.pmconfirm, {
            avatar: this.props.pmconfirm['avatar']['avatar_l'],
            fileCount: this.props.pmconfirm['fileCount'] || 0,
            uploadPhaseName: this.props.pmconfirm['uploadPhaseName'] || ''
          }) }))), _react2.default.createElement('div', { className: 'eps-np-approval-body' }, _react2.default.createElement('div', { className: 'eps-box-wrap' }, _react2.default.createElement('div', { className: 'eps-box' }, _react2.default.createElement('table', null, _react2.default.createElement('thead', null, _react2.default.createElement('tr', null, _react2.default.createElement('td', { className: 'col-1' }, 'IT\u603B\u4EF7'), _react2.default.createElement('td', { className: 'col-2' }, '\u5DE5\u7A0B\u603B\u4EF7'), _react2.default.createElement('td', { className: 'col-3' }, '\u8BBE\u5907\u603B\u4EF7'))), _react2.default.createElement('tbody', null, _react2.default.createElement('tr', null, _react2.default.createElement('td', { className: 'col-1' }, _react2.default.createElement('font', { className: 'ellipsis-1l' }, data.pmitTotal ? parseFloat(data.pmitTotal).toFixed(2) : '-')), _react2.default.createElement('td', { className: 'col-2' }, _react2.default.createElement('font', { className: 'ellipsis-1l' }, data.pmengTotal ? parseFloat(data.pmengTotal).toFixed(2) : '-')), _react2.default.createElement('td', { className: 'col-3' }, _react2.default.createElement('font', { className: 'ellipsis-1l' }, data.pmeqTotal ? parseFloat(data.pmeqTotal).toFixed(2) : '-'))))), _react2.default.createElement('div', { className: 'p-remarks' }, _react2.default.createElement('label', null, '\u9879\u76EE\u9700\u6C42\u5907\u6CE8'), _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
            self.NameInfo(e, data.orderRemark);
          } }, data.orderRemark ? data.orderRemark : '-')))), _react2.default.createElement('div', { className: 'eps-box-wrap eps-box-item' }, _react2.default.createElement('div', { className: 'eps-box' }, _react2.default.createElement(_list2.default, { className: 'my-list jw-list' }, _react2.default.createElement(Item, { extra: data.estimatedRoi ? parseFloat(data.estimatedRoi).toFixed(2) + ' %' : '-' }, '\u9884\u8BA1\u6295\u8D44\u56DE\u62A5\u7387(ROI%)'), _react2.default.createElement(Item, { extra: data.estimatedIncrease ? parseFloat(data.estimatedIncrease).toFixed(2) + ' ¥' : '-' }, '\u9884\u8BA1\u9500\u552E\u589E\u957F\u603B\u91D1\u989D')))), vendorListDiv, _react2.default.createElement('div', { style: { display: 'none' } }, ' \u8FD9\u91CC\u53EF\u80FD\u4F1A\u589E\u52A0\u5E02\u573A\u4FE1\u606Flist\u7684\u5C55\u793A,\u8FD8\u6709\u53EF\u80FD\u5F15\u7533\u51FA\u4E8C\u7EA7\u9875\u9762 '))), _react2.default.createElement('div', { className: 'np-total-price', ref: 'price' }, _react2.default.createElement('div', { className: 'np-total-price-c' }, _react2.default.createElement('label', null, '\u603B\u4EF7(\u542B\u7A0E)'), _react2.default.createElement('span', null, _react2.default.createElement('i', { className: 'icon-sprice' }), _react2.default.createElement('font', null, data.pmtotal ? data.pmtotal.toFixed(2) : '-'))), _react2.default.createElement('div', { className: 'money-show-other-tip' }, _react2.default.createElement('i', { className: 'icon-money-tips' }), _react2.default.createElement('div', { className: 'money-show-other-tip-v' }, '\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002'))), _react2.default.createElement('footer', { className: 'footer', ref: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
            return _this2.openLog();
          } }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, '\u6D41\u7A0B\u65E5\u5FD7')), buttons));
      }
    }
  }]);

  return PMConfirm;
}(_react.Component);

function mapStateToProps(state) {
  console.log('state:', state);
  return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(PMConfirm);

/***/ }),

/***/ 1862:
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

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	} else {
		obj[key] = value;
	}return obj;
}

/*
 * PM确认供应商的需求明细 model
 */
exports.default = {
	namespace: 'pmconfirm',
	state: _defineProperty({
		loading: {
			loading: true,
			fix: true,
			hide: false
		}
	}, 'loading', true),
	reducers: {
		changeData: function changeData(state, action) {
			console.log('changeData:', action);
			return _extends({}, state, action.data);
		}
	},
	effects: {},
	subscriptions: {}
};

/***/ }),

/***/ 1943:
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
   * 项目采购(PM确认供应商的需求明细)头部用户信息
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
			var datas = this.props.orderdata;
			window.upTabsData('file', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var data = this.props.orderdata;
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			console.log(data, "data");
			return _react2.default.createElement('div', { className: 'user-card' }, _react2.default.createElement('div', { className: 'user-card-c' }, _react2.default.createElement('div', { className: 'user-card-avatar' }, _react2.default.createElement('img', { src: data.avatar, alt: '' })), _react2.default.createElement('div', { className: 'user-card-info' }, _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u521B\u5EFA\u4EBA"), _react2.default.createElement('span', { className: 'user-card-val' }, data.requirementsPerson)), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'user-card-val' }, data.requirementsName)), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u9700\u6C42\u7F16\u53F7"), _react2.default.createElement('span', { className: 'user-card-val' }, data.orderNumber)), _react2.default.createElement('div', { className: 'user-card-info-btns' }, _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u67E5\u770B\u9644\u4EF6", data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : ''))))));
		}
	}]);

	return HeaderCard;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(HeaderCard);

/***/ }),

/***/ 1946:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VendorCardSelect = exports.VendorCardShow = undefined;

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

__webpack_require__(346);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _dva = __webpack_require__(196);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

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
} /**
   * 拆单前 供应商卡片
   */

/*
 * 供应商卡片展示
 */
var VendorCardShow = exports.VendorCardShow = function (_Component) {
	_inherits(VendorCardShow, _Component);

	function VendorCardShow(props) {
		_classCallCheck(this, VendorCardShow);

		var _this = _possibleConstructorReturn(this, (VendorCardShow.__proto__ || Object.getPrototypeOf(VendorCardShow)).call(this, props));

		_this.state = {};
		_this.gotoStoreList = _this.gotoStoreList.bind(_this);
		return _this;
	}

	_createClass(VendorCardShow, [{
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
		key: 'gotoStoreList',
		value: function gotoStoreList() {
			console.log('gotoStoreList=====');
			var url = EpsWebRoot + '/#newstoreit/pmstore-list/' + this.props.orderid + '/' + this.props.itemdata['vendorNumber'] + '/' + this.props.itemdata['rpType'];
			jw.pushWebView(url);
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			var self = this;
			return _react2.default.createElement('div', { className: 'eps-device-card-select', onClick: this.gotoStoreList }, _react2.default.createElement('div', { className: 'eps-list-card ' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u4F9B\u5E94\u5546\u540D\u79F0')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.vendorName, 10);
				} }, data.vendorName))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u4F9B\u8D27\u5546\u7C7B\u578B')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.rpTypeCn))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u603B\u4EF7(\xA5)')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.price + ' ¥', 6);
				} }, this.turnMoney(data.price), ' \xA5')))));
		}
	}]);

	return VendorCardShow;
}(_react.Component);

/**
 * 供应商卡片选择
 */

var VendorCardSelect = exports.VendorCardSelect = function (_Component2) {
	_inherits(VendorCardSelect, _Component2);

	function VendorCardSelect(props) {
		_classCallCheck(this, VendorCardSelect);

		var _this2 = _possibleConstructorReturn(this, (VendorCardSelect.__proto__ || Object.getPrototypeOf(VendorCardSelect)).call(this, props));

		_this2.selectHandler = _this2.selectHandler.bind(_this2);
		_this2.gotoStoreList = _this2.gotoStoreList.bind(_this2);
		return _this2;
	}

	_createClass(VendorCardSelect, [{
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
		key: 'gotoStoreList',
		value: function gotoStoreList() {
			console.log('gotoStoreList=====', this.props);
			var url = EpsWebRoot + '/#newstoreit/pmstore-list/' + this.props.orderid + '/' + this.props.itemdata['vendorNumber'] + '/' + this.props.itemdata['rpType'];
			jw.pushWebView(url);
		}
	}, {
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			this.props.isNotChecked ? '' : typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['eps_id'], { checked: willbe }) : '';
		}
	}, {
		key: 'inputRemark',
		value: function inputRemark(v) {
			console.log('v:==', v);
			typeof this.props.changeRefuseRemark == 'function' ? this.props.changeRefuseRemark(this.props.itemdata['eps_id'], { refuseRemark: v }) : '';
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			// 安卓兼容 
			if (isAndroid()) {
				var inputItem = $(_reactDom2.default.findDOMNode(self.refs.markInput));
				var curWrapHeight = inputItem.closest('.eps-device-card-select').height();
				var wrapHeight = void 0;
				var inputOffset = void 0;
				var footerOffset = void 0;
				var wrapOldScrollTop = void 0;
				var oldHeight = inputItem.closest('.eps-pmconfirm-body').height();
				var windowHeight = $(window).height();
				$(window).resize(function () {
					if (inputItem.find('input').is(':focus')) {
						setTimeout(function () {
							wrapHeight = inputItem.closest('.eps-pmconfirm-body').height();
							inputOffset = inputItem.offset();
							console.log('inputOffsetL:', inputOffset, 'wrapHeight:', wrapHeight, inputOffset.top > wrapHeight - 10);
							if (inputOffset.top > wrapHeight - 10) {
								wrapOldScrollTop = inputItem.closest('.eps-pmconfirm-body').scrollTop();
								console.log('==========inputItem:=========:::::', wrapOldScrollTop, inputItem.offset().top, wrapOldScrollTop + windowHeight - $(window).height());
								inputItem.closest('.eps-pmconfirm-body').scrollTop(wrapOldScrollTop + windowHeight - $(window).height());
								// inputItem.closest('.eps-pmconfirm-body').scrollTop(wrapOldScrollTop+windowHeight-$(window).height()-curWrapHeight/2);
							}
						}, 0);
					}
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			var self = this;
			return _react2.default.createElement('div', { className: 'eps-device-card-select' }, _react2.default.createElement('div', { className: 'eps-list-card ' }, _react2.default.createElement('div', { onClick: this.gotoStoreList }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u4F9B\u5E94\u5546\u540D\u79F0')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.vendorName, 10);
				} }, data.vendorName))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u4F9B\u8D27\u5546\u7C7B\u578B')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.rpTypeCn))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, '\u603B\u4EF7(\xA5)')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.price + ' ¥', 6);
				} }, this.turnMoney(data.price), ' \xA5')))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement(_inputItem2.default, {
				ref: 'markInput',
				className: 'jw-inline eps-inline',
				value: data.refuseRemark || '',
				onChange: function onChange(v) {
					return self.inputRemark(v);
				},
				onClick: function onClick(e) {
					e.stopPropagation();
				}
			}, '\u62D2\u7EDD\u5907\u6CE8'))), _react2.default.createElement('div', { className: 'checked-btn-wrap-area' }, _react2.default.createElement('div', { className: 'checked-btn-wrap', onClick: function onClick(e) {
					e.stopPropagation();self.selectHandler();
				} }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" }))));
		}
	}]);

	return VendorCardSelect;
}(_react.Component);

;

/***/ })

});