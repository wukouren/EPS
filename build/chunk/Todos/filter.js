webpackJsonp([39],{

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

/***/ 1932:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datePicker = __webpack_require__(1641);

var _datePicker2 = _interopRequireDefault(_datePicker);

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

__webpack_require__(1642);

__webpack_require__(365);

__webpack_require__(208);

__webpack_require__(346);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dva = __webpack_require__(196);

var _TodosType = __webpack_require__(1857);

var _TodosType2 = _interopRequireDefault(_TodosType);

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
   * 搜索订单页面
   */

var eid = userinfo.employee_id;

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'componentDidMount',

    // 组件加载完毕
    value: function componentDidMount() {
      var self = this;
      NProgress.done();
      if (isAndroid()) {
        $(window).resize(function () {
          self.setHeight();
        });
      }
      self.setHeight();
    }
  }, {
    key: 'getFlowTypes',
    value: function getFlowTypes() {
      return [{ labe: '请选择', value: '-1' }, { label: "设备维修", value: "11" }, { label: "工程维修", value: "12" }, { label: "IT设备维修", value: "13" }, { label: "设备年度保养计划", value: "21" }, { label: "设备月度保养计划", value: "22" }, { label: "设备保养订单", value: "23" }, { label: "工程年度保养计划", value: "24" }, { label: "工程月度保养计划", value: "25" }, { label: "工程保养订单", value: "26" }, { label: "非项目设备采购需求", value: "31" }, { label: "非项目工程采购需求", value: "35" }, { label: "非项目IT采购需求", value: "36" }, { label: "非项目设备采购", value: "32" }, { label: "非项目工程采购", value: "33" }, { label: "非项目IT采购", value: "34" }, { label: "项目采购需求", value: "41" }, { label: "项目型供应商采购订单", value: "42" }, { label: "项目型采购订单", value: "43" }, { label: "新店/改造设备/工程订单", value: "51" }, { label: "新店/改造IT供应商订单", value: "54" }, { label: "新店/改造IT餐厅订单", value: "55" }, { label: "新店/改造IT采购需求", value: "53" }, { label: "新店/改造IT采购订单", value: "56" }, { label: "新店/改造GC采购", value: "61" }, { label: "主数据", value: "71" }];
    }
    // 获取当前过滤器

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // console.log("Marlin componentWillMount: Default prop time!"); return {};
      var dispatch = this.props.dispatch;
      PubSub.subscribe('todos:responseFilterCondition', function (evt, todos) {
        dispatch({
          type: 'todos/changeData',
          payload: {
            filter: todos.filter
          }
        });
      });
      window.upTabsData('todos:getFilterCondition', 'publish', {});
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var todosFilter = this.props.todos.filter,
          flowTypes = this.getFlowTypes();
      // console.log('Marlin x1',todosFilter,flowTypes)
      return _react2.default.createElement('div', { className: 'root-container-w root-container-filter-w' }, _react2.default.createElement('sesstion', { className: 'main main-filter' }, _react2.default.createElement('div', { className: 'filter-c' }, _react2.default.createElement('div', { className: 'filter-item' }, _react2.default.createElement('i', { className: 'icon-search' }), _react2.default.createElement(_inputItem2.default, { className: 'jw-inline', placeholder: '\u8BF7\u8F93\u5165\u9910\u5385\u7F16\u53F7\u6216\u8BA2\u5355\u7F16\u53F7', value: todosFilter.number, onChange: function onChange(e) {
          return _this2.onNumberChange(e);
        } })), _react2.default.createElement('div', { className: 'filter-item' }, _react2.default.createElement(_picker2.default, { data: flowTypes, cols: 1, value: todosFilter.flowtype, onChange: function onChange(v) {
          return _this2.onFlowChange(v);
        } }, _react2.default.createElement(_list2.default.Item, { arrow: 'horizontal' }, '\u6D41\u7A0B\u7C7B\u578B'))), _react2.default.createElement('div', { className: '' }, _react2.default.createElement('label', null, '\u521B\u5EFA\u65F6\u95F4')), _react2.default.createElement('div', { className: 'filter-date-c' }, _react2.default.createElement(_datePicker2.default, { mode: 'date', value: _.isNull(todosFilter.startDate) ? '' : moment(todosFilter.startDate), onChange: function onChange(e) {
          return _this2.onDateChange(e, 'startDate');
        } }, _react2.default.createElement(_list2.default.Item, null)), _react2.default.createElement('span', null, '-'), _react2.default.createElement(_datePicker2.default, { mode: 'date', value: _.isNull(todosFilter.endDate) ? '' : moment(todosFilter.endDate), onChange: function onChange(e) {
          return _this2.onDateChange(e, 'endDate');
        } }, _react2.default.createElement(_list2.default.Item, null))), _react2.default.createElement('div', { className: '' }, _react2.default.createElement('label', null, '\u8BA2\u5355\u91D1\u989D(\xA5)')), _react2.default.createElement('div', { className: 'filter-date-c filter-money-c' }, _react2.default.createElement('div', null, _react2.default.createElement(_inputItem2.default, { className: 'jw-inline', type: 'number', placeholder: '\u8BF7\u8F93\u5165', value: todosFilter.moneyFrom,
        onChange: function onChange(e) {
          return _this2.onMoneyChange(e, 'moneyFrom');
        },
        onBlur: function onBlur(e) {
          return _this2.onMoneyBlur(e, 'moneyFrom');
        } })), _react2.default.createElement('span', null, '-'), _react2.default.createElement('div', null, _react2.default.createElement(_inputItem2.default, { className: 'jw-inline', type: 'number', placeholder: '\u8BF7\u8F93\u5165', value: todosFilter.moneyTo,
        onChange: function onChange(e) {
          return _this2.onMoneyChange(e, 'moneyTo');
        },
        onBlur: function onBlur(e) {
          return _this2.onMoneyBlur(e, 'moneyTo');
        } }))))), _react2.default.createElement('div', { className: 'eps-footer' }, _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
          return _this2.cancelFilter(e);
        } }, '\u53D6\u6D88\u5168\u90E8\u9009\u62E9'), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
          return _this2.startFilter(e);
        } }, '\u786E\u8BA4'))));
    }
  }, {
    key: 'setHeight',
    value: function setHeight() {
      var self = this;
      setTimeout(function () {
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var filterHeight = $('.filter-c').height() || 0;
        $('.root-container-w').css({ height: clientHeight + 'px' });
      }, 0);
    }
  }, {
    key: 'onMoneyChange',
    value: function onMoneyChange(e, type) {
      var str = e.trim();
      var dispatch = this.props.dispatch,
          todosFilter = this.props.todos.filter;
      todosFilter[type] = str;
      dispatch({
        type: 'todos/changeData',
        payload: {
          filter: todosFilter,
          fetchAction: false
        }
      });
    }
  }, {
    key: 'onMoneyBlur',
    value: function onMoneyBlur(e, type) {
      var str = e.trim();
      var dispatch = this.props.dispatch,
          todosFilter = this.props.todos.filter;
      todosFilter[type] = str;
      if (type == 'moneyFrom' && todosFilter['moneyTo'] != '' && parseInt(todosFilter['moneyTo']) < parseInt(todosFilter['moneyFrom'])) {
        todosFilter['moneyTo'] = parseInt(todosFilter['moneyFrom']) + 1;
      } else if (type == 'moneyTo' && todosFilter['moneyFrom'] != '' && parseInt(todosFilter['moneyTo']) < parseInt(todosFilter['moneyFrom'])) {
        todosFilter['moneyFrom'] = parseInt(todosFilter['moneyTo']) - 1;
      }
      dispatch({
        type: 'todos/changeData',
        payload: {
          filter: todosFilter,
          fetchAction: false
        }
      });
    }
  }, {
    key: 'onNumberChange',
    value: function onNumberChange(e) {
      var str = e.trim();
      var dispatch = this.props.dispatch,
          todosFilter = this.props.todos.filter;
      todosFilter['number'] = str;
      dispatch({
        type: 'todos/changeData',
        payload: {
          filter: todosFilter,
          fetchAction: false
        }
      });
    }
  }, {
    key: 'onFlowChange',
    value: function onFlowChange(data) {
      var dispatch = this.props.dispatch,
          flowTypes = this.getFlowTypes(),
          todosFilter = this.props.todos.filter;
      todosFilter['flowtype'] = data;
      dispatch({
        type: 'todos/changeData',
        payload: {
          filter: todosFilter,
          fetchAction: false
        }
      });
    }
  }, {
    key: 'onDateChange',
    value: function onDateChange(date, type) {
      var dispatch = this.props.dispatch,
          todosFilter = this.props.todos.filter;
      todosFilter[type] = moment(date).format('YYYY-MM-DD');

      if (type == 'startDate' && todosFilter['endDate'] != null && todosFilter['endDate'] < todosFilter['startDate']) {
        todosFilter['endDate'] = todosFilter['startDate'];
      } else if (type == 'endDate' && todosFilter['startDate'] != null && todosFilter['endDate'] < todosFilter['startDate']) {
        todosFilter['startDate'] = todosFilter['endDate'];
      }
      dispatch({
        type: 'todos/changeData',
        payload: {
          filter: todosFilter,
          fetchAction: false
        }
      });
    }
  }, {
    key: 'cancelFilter',
    value: function cancelFilter() {
      var dispatch = this.props.dispatch,
          todosFilter = {
        number: '',
        flowtype: ['-1'],
        startDate: null,
        endDate: null,
        moneyFrom: '',
        moneyTo: ''
      };
      // console.log('cancelFilter',todosFilter)
      window.upTabsData('todos:filter', 'publish', todosFilter);
      jw.closeWebView();
    }
  }, {
    key: 'startFilter',
    value: function startFilter() {
      var dispatch = this.props.dispatch,
          todosFilter = this.props.todos.filter;
      // console.log('startFilter',todosFilter)
      window.upTabsData('todos:filter', 'publish', todosFilter);
      jw.closeWebView();
    }
  }]);

  return Filter;
}(_react.Component);

function mapStateToProps(state) {
  // console.log('state:',state)
  return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Filter);

/***/ })

});