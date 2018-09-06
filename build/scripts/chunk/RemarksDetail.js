webpackJsonp([49],{

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

/***/ 1856:
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
   * 单条待办卡片
   * type=1,2,3,4,5,6,7
   * 分别对应 全部，维修，非项目，新店日常，保养，项目，新店GC
   * 2017/12/1 在途订单增加当前处理人，影响如下：
   * 由于在途和历史是一个订单，所以在途和历史需将在途和历史中的todoCol10改为当前处理人，其他字段依次＋1；
   * 待办列表接口不变，所以待办列表中todoCol10还是原来的含义
   * 
   */

var statusRoutes = {};
var detailRoutes = {};

var TodoItemView = function (_Component) {
	_inherits(TodoItemView, _Component);

	function TodoItemView() {
		_classCallCheck(this, TodoItemView);

		return _possibleConstructorReturn(this, (TodoItemView.__proto__ || Object.getPrototypeOf(TodoItemView)).apply(this, arguments));
	}

	_createClass(TodoItemView, [{
		key: 'formatOrderTime',
		value: function formatOrderTime(str) {
			if (!str || str.length != 19) return str;
			return str.substring(0, 16);
		}
		// 获取 设备、工程、IT icon

	}, {
		key: 'getICON',
		value: function getICON(subProcess) {
			var icon = 'icon-device-icon';
			switch (subProcess) {
				case '12': // 工程维修
				case '24': // 工程年度保养计划
				case '25': // 工程月度保养计划
				case '26': // 工程保养订单
				case '33': // 非项目工程采购
				case '35': // 非项目工程采购需求
				case '41': // 项目采购需求
				case '42': // 项目型供应商采购订单
				case '43': // 项目型采购订单
				// case '43-1': // 项目型采购订单 设备
				case '43-2': // 项目型采购订单 工程
				case '51':
					// 新店/改造设备/工程订单
					icon = 'icon-project-icon';
					break;
				case '13': // IT设备维修
				case '34': // 非项目IT采购
				case '36': // 非项目IT采购需求
				case '43-3': // 项目型采购订单 IT
				case '53': // 新店/改造IT采购需求
				case '53': // 新店/改造IT采购需求
				case '55':
					// 新店/改造IT采购需求
					// case '56': // 新店/改造IT采购订单  此号码于20171024日废弃
					icon = 'icon-it-icon';
					break;
				case '61':
					// 新店/改造GC采购
					icon = 'icon-gc-icon';
					break;
			}
			return icon;
		}
		// 维修卡片

	}, {
		key: 'combineRepairCard',
		value: function combineRepairCard(data) {
			var _this2 = this;

			// console.log('this.props.todos',this.props.todos)
			var status = this.props.todos.status,
			    vendorName = '',
			    storeName = '',
			    vendorNumber = '',
			    storeNumber = '',
			    operateClassName = status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			/*if(this.props.todos.status=='1'){
   	// console.log(data,"data")
     if(data.todoCol2=='12'){
     	if(data.todoCol6=='6'){
     		operateClassName="icon-mobile-noOperate";
     	}else if(data.todoCol6=='3'){
     		operateClassName="icon-mobile-noOperate";
     	}
     }else{
     	operateClassName="";
     }
   }else{
   	if(data.todoCol8=='1'){
   		operateClassName="";
   	}else{
   		operateClassName="icon-mobile-noOperate";
   	}
   }
   console.log('status',status,data);
   */
			var currentOperator = void 0;
			var infoWrapClass = status == '1' ? 'todos-item-info info-label-large' : 'todos-item-info';
			if (status == '1' || status == '2') {
				storeNumber = data.todoCol12;
				storeName = data.todoCol13;
				vendorName = data.todoCol11;
				if (status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				storeNumber = data.todoCol10;
				storeName = data.todoCol11;
				vendorName = data.todoCol9;
			}
			return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
					return _this2.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeName)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u7EF4\u4FEE\u5546"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, vendorName)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}

		/**
   * 非项目卡片
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:非项目-设备
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:餐厅编号
   * todoCol10:餐厅名称
   * todoCol11:总价
   * todoCol12:冗余字段
   * 在途 - 非项目
   * 在途 - 非项目设备
   	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:非项目-设备
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否允许操作
  	todoCol9:餐厅编号
  	todoCol11:餐厅名称
  	todoCol12:总价
   * 在途 - 非项目工程
    todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:非项目-工程
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否允许操作
  	todoCol9:餐厅编号
  	todoCol11:餐厅名称
  	todoCol12:总价
   * 在途 - 非项目IT
    todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:非项目-IT
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否允许操作
  	todoCol9:餐厅编号
  	todoCol11:餐厅名称
  	todoCol12:总价
   */

	}, {
		key: 'combineNonProjectCard',
		value: function combineNonProjectCard(data) {
			var _this3 = this;

			var status = this.props.todos.status;
			var storeNumber = '',
			    storeName = '',
			    allMoney = '',
			    orderNumber = '',
			    operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			var currentOperator = void 0;
			var infoWrapClass = status == '1' ? 'todos-item-info info-label-large' : 'todos-item-info';
			if (this.props.todos.status == '1' || this.props.todos.status == '2') {
				storeNumber = data.todoCol11;
				storeName = data.todoCol12;
				allMoney = data.todoCol13;
				if (this.props.todos.status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				storeNumber = data.todoCol9;
				storeName = data.todoCol10;
				allMoney = data.todoCol11;
			}
			return _react2.default.createElement('div', { className: 'todos-item todos-nonproject-item animated zoomIn', onClick: function onClick(e) {
					return _this3.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeName)), currentOperator), _react2.default.createElement('div', { className: 'todos-nonproject-table' })), _react2.default.createElement('div', { className: 'todos-item-btn' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}
		//保养卡片
		/**
   * 保养-设备（年度计划）
  	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:保养-设备（年度计划）
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否可操作标识
  	todoCol9:保养计划名称
  	todoCol10:保养年度
  	todoCol11:保养备注
  	todoCol12:冗余字段
   * 保养-设备（月度计划）
   	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:保养-设备（月度计划）
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否可操作标识
  	todoCol9:保养类型
  	todoCol10:保养计划名称
  	todoCol11:保养月
  	todoCol12:保养备注
   * 保养-设备（订单）
   	todoCol1:大流程类型
  	todoCol2:小流程类型
  	todoCol3:创建时间
  	todoCol4:订单编号
  	todoCol5:保养-设备（订单）
  	todoCol6:状态Code
  	todoCol7:状态名称
  	todoCol8:移动端是否可操作标识
  	todoCol9:餐厅编号
  	todoCol10:餐厅名称
  	todoCol11:保养备注
  	todoCol12:冗余字段
   */
		/**
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:保养-设备（年度计划）
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:保养计划名称
   * todoCol10:保养年度
   * todoCol11:保养备注
   * todoCol12:冗余字段
    */

	}, {
		key: 'combineMaintenanceCard',
		value: function combineMaintenanceCard(data) {
			var _this4 = this;

			var status = this.props.todos.status,
			    operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			var currentOperator = void 0;
			var infoWrapClass = status == '1' ? "todos-item-info maintenance info-label-large" : "todos-item-info maintenance";
			switch (data.todoCol2) {
				case '21':
					var maintenanceName1 = '';
					var maintenanceYear1 = '';
					var maintenanceTip1 = '';
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceName1 = data.todoCol11;
						maintenanceYear1 = data.todoCol12;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
						// maintenanceTip1=data.todoCol10;
					} else {
						maintenanceName1 = data.todoCol9;
						maintenanceYear1 = data.todoCol10;
						// maintenanceTip1=data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, maintenanceName1)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u5E74\u5EA6"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceYear1)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '22':
					var maintenanceType2 = void 0;
					var maintenanceName2 = void 0;
					var maintenanceMonth2 = void 0;
					var maintenanceTip2 = void 0;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceType2 = data.todoCol11;
						maintenanceName2 = data.todoCol12;
						maintenanceMonth2 = data.todoCol13;
						// maintenanceTip2=data.todoCol12;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						maintenanceType2 = data.todoCol9;
						maintenanceName2 = data.todoCol10;
						maintenanceMonth2 = data.todoCol11;
						// maintenanceTip2=data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, maintenanceName2)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u6708\u4EFD"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceMonth2)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '23':
					var storeName3 = void 0;
					var storeNumber3 = void 0;
					var maintenanceTip3 = void 0;
					// console.log("23",data)
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						storeNumber3 = data.todoCol11;
						storeName3 = data.todoCol12;
						maintenanceTip3 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						storeNumber3 = data.todoCol9;
						storeName3 = data.todoCol10;
						maintenanceTip3 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber3)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName3)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '24':
					var maintenanceName4 = '';
					var maintenanceYear4 = '';
					var maintenanceTip4 = '';
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceName4 = data.todoCol11;
						maintenanceYear4 = data.todoCol12;
						maintenanceTip4 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						maintenanceName4 = data.todoCol9;
						maintenanceYear4 = data.todoCol10;
						maintenanceTip4 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, maintenanceName4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u5E74\u5EA6"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceYear4)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '25':
					var maintenanceType5 = '';
					var maintenanceName5 = '';
					var maintenanceMonth5 = '';
					var maintenanceTip5 = '';
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						maintenanceType5 = data.todoCol11;
						maintenanceName5 = data.todoCol12;
						maintenanceMonth5 = data.todoCol13;
						maintenanceTip5 = data.todoCol14;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						maintenanceType5 = data.todoCol8;
						maintenanceName5 = data.todoCol10;
						maintenanceMonth5 = data.todoCol11;
						maintenanceTip5 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u8BA1\u5212\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceName5)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u4FDD\u517B\u6708\u4EFD"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, maintenanceMonth5)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '26':
					var storeName6 = void 0;
					var storeNumber6 = void 0;
					var maintenanceTip6 = void 0;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						storeNumber6 = data.todoCol11;
						storeName6 = data.todoCol12;
						maintenanceTip6 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					} else {
						storeNumber6 = data.todoCol9;
						storeName6 = data.todoCol10;
						maintenanceTip6 = data.todoCol11;
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this4.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: 'icon-project-icon' }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNumber6)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label more' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName6)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
			}
		}
	}, {
		key: 'AllowOnMobile',
		value: function AllowOnMobile(Col8) {
			return Col8 && Col8 == 1 ? '' : 'icon-mobile-noOperate';
		}
		/**
   * 项目卡片 LocalPM
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:项目名称
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:需求编号
   * todoCol10:冗余字段
   * todoCol11:冗余字段
   * todoCol12:冗余字段
   *
   * 项目卡片 餐厅-确认、DOA-餐厅确认后审批（职能）
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:项目-设备
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:项目名称
   * todoCol10:餐厅编号
   * todoCol11:餐厅名称
   * todoCol12:冗余字段
   */

	}, {
		key: 'combineProjectCard',
		value: function combineProjectCard(data) {
			var _this5 = this;

			console.log('22ddddd', data);
			var // operateClassName = this.props.todos.status=='0'?this.AllowOnMobile( data.todoCol8 ):'',
			operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
			var currentOperator = void 0;
			var infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";
			// if(this.props.todos.status=='1') operateClassName = '';
			switch (data.todoCol2) {
				case '41':
					var num = data.todoCol9;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						num = data.todoCol11;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this5.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, "\u9879\u76EE\u91C7\u8D2D\u9700\u6C42"), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9700\u6C42\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, num)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol5)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '42':
					var projectName = data.todoCol9;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						projectName = data.todoCol11;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn' }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, projectName)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
				case '43':
				case '43-1':
				case '43-2':
				case '43-3':
					var projectName3 = data.todoCol9,
					    storeNum3 = data.todoCol10,
					    storeName3 = data.todoCol11;
					if (this.props.todos.status == '1' || this.props.todos.status == '2') {
						projectName3 = data.todoCol11, storeNum3 = data.todoCol12, storeName3 = data.todoCol13;
						if (this.props.todos.status == '1') {
							currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
						}
					}
					return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
							return _this5.openWebView(data);
						} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9879\u76EE\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, projectName3)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeNum3)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName3)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
					break;
			}
		}
		/**
   * 新店/改造 零星采购 卡片
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:新店日常-设备
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:餐厅编号
   * todoCol10:餐厅名称
   * todoCol11:备注
   * todoCol12:冗余字段
   */

	}, {
		key: 'combineReimageCard',
		value: function combineReimageCard(data) {
			var _this6 = this;

			console.log('combineReimageCard', data, '---', this.props.todos.status);
			var operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '',
			    storeNum = '',
			    storeName = '',
			    memo = '';
			var currentOperator = void 0;
			var infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";
			if (this.props.todos.status == '1' || this.props.todos.status == '2') {
				if (data.todoCol2 == '54' || data.todoCol2 == '55') {
					storeNum = data.todoCol12;
					storeName = data.todoCol13;
					memo = '';
				} else {
					storeNum = data.todoCol11;
					storeName = data.todoCol12;
					memo = data.todoCol13;
				}

				// storeNum = data.todoCol8;
				// storeName = data.todoCol9;
				// memo = data.todoCol10;
				if (this.props.todos.status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				if (data.todoCol2 == '54' || data.todoCol2 == '55') {
					storeNum = data.todoCol10;
					storeName = data.todoCol11;
					memo = '';
				} else {
					storeNum = data.todoCol9;
					storeName = data.todoCol10;
					memo = data.todoCol11;
				}

				// storeNum = data.todoCol9;
				// storeName = data.todoCol10;
				// memo = data.todoCol11;
			}
			return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
					return _this6.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNum)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}
		/**
   * 新店GC
   * todoCol1:大流程类型
   * todoCol2:小流程类型
   * todoCol3:创建时间
   * todoCol4:订单编号
   * todoCol5:新店GC
   * todoCol6:状态Code
   * todoCol7:状态名称
   * todoCol8:移动端是否可操作标识
   * todoCol9:餐厅编号
   * todoCol10:餐厅名称
   * todoCol11:备注
   * todoCol12:冗余字段
   */

	}, {
		key: 'combineNewstoregcCard',
		value: function combineNewstoregcCard(data) {
			var _this7 = this;

			// console.log('combineNewstoregcCard', data);
			var operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			    titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '',
			    storeNum = '',
			    storeName = '',
			    memo = '';
			var currentOperator = void 0;
			var infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";

			if (this.props.todos.status == '1' || this.props.todos.status == '2') {
				storeNum = data.todoCol11;
				storeName = data.todoCol12;
				memo = data.todoCol13;
				if (this.props.todos.status == '1') {
					currentOperator = _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5F53\u524D\u64CD\u4F5C\u4EBA"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, data.todoCol10));
				}
			} else {
				storeNum = data.todoCol9;
				storeName = data.todoCol10;
				memo = data.todoCol11;
			}
			return _react2.default.createElement('div', { className: 'todos-item animated zoomIn', onClick: function onClick(e) {
					return _this7.openWebView(data);
				} }, _react2.default.createElement('div', { className: 'todos-item-c' }, _react2.default.createElement('div', { className: 'todos-item-title' }, _react2.default.createElement('div', { className: 'todos-item-time' }, _react2.default.createElement('i', { className: 'icon-time' }), _react2.default.createElement('span', null, this.formatOrderTime(data.todoCol3))), _react2.default.createElement('div', { className: 'todos-item-logo' }, _react2.default.createElement('i', { className: titleICON }), _react2.default.createElement('span', null, data.todoCol5), _react2.default.createElement('i', { className: operateClassName }))), _react2.default.createElement('div', { className: infoWrapClass }, _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u8BA2\u5355\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, data.todoCol4)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todos-item-info-val' }, storeNum)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u9910\u5385\u540D\u79F0"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, storeName)), _react2.default.createElement('div', { className: 'todos-item-info-i' }, _react2.default.createElement('span', { className: 'todos-item-info-label' }, "\u5907\u6CE8"), _react2.default.createElement('span', { className: 'todos-item-info-val ellipsis' }, memo)), currentOperator)), _react2.default.createElement('div', { className: 'todos-item-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-check' }), _react2.default.createElement('span', null, data.todoCol7)));
		}
	}, {
		key: 'render',
		value: function render() {
			switch (this.props.businessType) {
				// 维修卡片
				case 10:
					return this.combineRepairCard(this.props.itemData);
					break;
				// 非项目卡片 
				case 30:
					return this.combineNonProjectCard(this.props.itemData);
					break;
				case 20:
					//保养卡片
					return this.combineMaintenanceCard(this.props.itemData);
					break;
				case 40:
					// 项目卡片
					return this.combineProjectCard(this.props.itemData);
					break;
				case 50:
					// 新店/改造 零星采购
					return this.combineReimageCard(this.props.itemData);
					break;
				case 60:
					// 新店/改造 零星采购
					return this.combineNewstoregcCard(this.props.itemData);
					break;
				default:
					return _react2.default.createElement('div', { style: { display: 'none' } });
					break;
			}
		}

		// 进入详情页面 每个小流程类型跳转到对应的详情页，相同的详情页跳转到同一个路由
		// smallCode:小流程类型编号 orderId : 订单唯一编号

	}, {
		key: 'openWebViewDetail',
		value: function openWebViewDetail(smallCode, orderId, statusCode, updateDate) {
			var url = this.getViewRoutes(smallCode, statusCode, orderId);
			if (!url) {
				alert('未知业务类型[' + smallCode + '] 订单号[' + orderId + ']');
				return;
			}
			url += (url.indexOf('?') > 0 ? '&' : '?') + 'sta=' + this.props.todos.status + '&' + 'updateDate=' + encodeURIComponent(updateDate);
			// console.log('Marlin URL',url)
			jw.pushWebView(url);
		}

		//status:1 为途中订单状态 途中订单统一跳转到详情页面
		//status:0 为我的待办 根据待办状态跳转

	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			// console.log(data.todoCol8,"data.todoCol8")
			console.log('openWebView[' + this.props.todos.status + ']', data.todoCol9);
			if (this.props.todos.status == 0 && data.todoCol8 == '0' || data.todoCol9 == '0') {
				confirm("该订单不可在移动端处理，请到 PC 端处理");
				return;
			}
			if (this.props.todos.status == 1 || this.props.todos.status == 2) {
				window.upTabsData('todoInfoState', 'cache', data.todoCol7);
				this.openWebViewDetail(data.todoCol2, data.todoCol4, data.todoCol6, data.todoCol3);
			} else {
				this.getRouter(data.todoCol2, data.todoCol4, data.todoCol6, data.todoCol3);
				/*if(data.todoCol2=='12'&&data.todoCol6=='6'){
    	confirm("该订单不可在移动端处理，请到 PC 端处理");
    }*/
			}
		}
	}, {
		key: 'getRouter',
		value: function getRouter(smallCode, orderId, statusCode, updateDate) {
			// console.log('statusCode',statusCode)
			this.getStatusRoutes(orderId);
			// console.log('Marlin x1['+smallCode+']',statusRoutes,statusRoutes[smallCode],statusRoutes[smallCode][statusCode])
			if (statusRoutes[smallCode] && statusRoutes[smallCode][statusCode]) {
				var url = statusRoutes[smallCode][statusCode];
				// let url = statusRoutes['23']['4'];
				url += (url.indexOf('?') > 0 ? '&' : '?') + 'updateDate=' + encodeURIComponent(updateDate);
				// updateDate = encodeURIComponent(updateDate)
				// jw.pushWebView(statusRoutes[smallCode][statusCode])
				jw.pushWebView(url);
			}
		}
		/**
   * 在途、历史需求（订单）路由表
   * @param processType 流程类型
   * @param subProcess 小流程类型
   * @param orderId 需求编号（订单编号）
   * @return 在途、历史订单路由
   * @param view ：拆单之前 
   * @param vieworder ：拆单之前之后
   */

	}, {
		key: 'getViewRoutes',
		value: function getViewRoutes(subProcess, statusCode, orderId) {
			// subProcess='42';
			var viewRoutes = {
				'11': function _(statusCode) {
					return statusCode == '2' ? EpsWebRoot + '/#/repairing/vieworder/equipment/' + orderId : EpsWebRoot + '/#/repairing/view/equipment/' + orderId;
				}, //EpsWebRoot+'/#/repairing/view/equipment/'+orderId,
				'12': function _(statusCode) {
					return statusCode == '2' ? EpsWebRoot + '/#/repairing/vieworder/project/' + orderId : EpsWebRoot + '/#/repairing/view/project/' + orderId;
				}, /*{
       '2':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
       '':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
       },*/
				'13': EpsWebRoot + '/#/repairing/view/it/' + orderId + '?unfinished=1',
				'21': EpsWebRoot + '/#/maintenance/view/equipment/' + orderId + '?type=year', //年度-设备
				'24': EpsWebRoot + '/#/maintenance/view/project/' + orderId + '?type=year', //年度-工程
				'22': EpsWebRoot + '/#/maintenance/view/equipment/' + orderId + '?type=month', //月度-设备
				'25': EpsWebRoot + '/#/maintenance/view/project/' + orderId + '?type=month', //月度-工程
				'23': EpsWebRoot + '/#/maintenance/vieworder/equipment/' + orderId, //设备-保养
				'26': EpsWebRoot + '/#/maintenance/vieworder/project/' + orderId, //工程-保养
				// 非项目设备采购需求
				'31': EpsWebRoot + '/#/nonproject/view-info/view/equipment/' + orderId,
				// 非项目设备采购
				'32': EpsWebRoot + '/#/nonproject/view-info/vieworder/equipment/' + orderId,
				// 非项目工程采购
				'33': EpsWebRoot + '/#/nonproject/view-info/vieworder/project/' + orderId,
				// 非项目IT采购
				'34': EpsWebRoot + '/#/nonproject/view-info/vieworder/it/' + orderId,
				// 非项目工程采购需求
				'35': EpsWebRoot + '/#/nonproject/view-info/view/project/' + orderId,
				// 非项目IT采购需求
				'36': EpsWebRoot + '/#/nonproject/view-info/view/it/' + orderId,
				// 项目采购需求
				'41': EpsWebRoot + '/#/project/view/' + orderId,
				// 项目型供应商采购订单
				'42': EpsWebRoot + '/#/project/vieworder/' + orderId,
				// 项目型采购订单
				'43-1': EpsWebRoot + '/#/project/vieworder/equipment/' + orderId,
				'43-2': EpsWebRoot + '/#/project/vieworder/project/' + orderId,
				'43-3': EpsWebRoot + '/#/project/vieworder/it/' + orderId,
				// 新店/改造设备/工程订单
				'51': EpsWebRoot + '/#/minorpurchase/vieworder/equipment/' + orderId,
				// 新店/改造IT采购需求
				'53': EpsWebRoot + '/#/newstoreit/view/it/' + orderId,
				// 新店/改造IT采购订单
				'55': EpsWebRoot + '/#/newstoreit/vieworder/it/' + orderId,
				// 新店/改造GC采购
				'61': EpsWebRoot + '/#/newstoregc/view/' + orderId
			};
			return viewRoutes[subProcess] ? typeof viewRoutes[subProcess] == 'function' ? viewRoutes[subProcess](statusCode) : viewRoutes[subProcess] : '';
		}
		/**
   * 待办需求（订单）路由表
   */

	}, {
		key: 'getStatusRoutes',
		value: function getStatusRoutes(orderId, updateDate) {
			console.log('orderId', orderId);
			statusRoutes = {
				'11': {
					//2:供应商响应，3：供应商评估 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：调整后再审批
					'2': EpsWebRoot + '/#/repairing/response/equipment/' + orderId,
					'3': EpsWebRoot + '/#/repairing/assess/equipment/' + orderId + '?type=1', //供应商评估
					'4': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=1', //餐厅确认1
					'5': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=2', //doa审批2
					'6': EpsWebRoot + '/#/repairing/assess/equipment/' + orderId + '?type=2', //供应商确认
					'7': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=4', //餐厅确认评价4
					'8': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=3' //调整后再审批
				}, '12': {
					//2:供应商响应，   5： doa审批  7： 餐厅确认及评价 8：再次审批 
					'2': EpsWebRoot + '/#/repairing/response/project/' + orderId,
					'4': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=1', //餐厅确认1
					'5': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=2',
					'7': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=4',
					'8': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=3'
				}, '13': {
					// 3：供应商重新评估IT维修（餐厅确认节点退回后的状态） 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：再次审批
					'3': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=1',
					'4': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=1',
					'5': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=2',
					'6': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=2',
					'7': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=4',
					'8': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=3'
				},
				'21': { //保养 设备年度 2：DO审批
					// '2':EpsWebRoot+'/#/repairing/response/equipment/,
					'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=year'
				}, '22': { //保养设备月度审核 2： 已提交待审批
					'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=month'
				}, '23': { // 设备保养订单 1:已提交待响应 3：已确认待服务 4：已服务待评价
					'1': EpsWebRoot + '/#/maintenance/equipment/reply/' + orderId,
					'3': EpsWebRoot + '/#/maintenance/equipment/confirm/' + orderId,
					'4': EpsWebRoot + '/#/maintenance/equipment/assess/' + orderId
				}, '24': { // 工程年度保养计划
					'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=year'
				}, '25': { // 工程月度保养计划
					'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=month'
				}, '26': { // 工程保养订单
					'1': EpsWebRoot + '/#/maintenance/project/reply/' + orderId,
					'3': EpsWebRoot + '/#/maintenance/project/confirm/' + orderId,
					'4': EpsWebRoot + '/#/maintenance/project/assess/' + orderId
				}, '31': { // 非项目设备采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/equipment/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=10'
				}, '32': { // 非项目设备采购  1：已创建待审批(DOA) 3：已服务待签收(餐厅) 4：已收货待审批(DOA)
					'1': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=3'
				}, '33': { //非项目工程  1：  3：  4：同上
					'1': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=3'
				}, '34': { //非项目it 1:已创建待审批 3:已服务待签收 4:餐厅已确认(DOA审批) 5:IT PM已确认(DOA审批)
					'1': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
					'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1'
				}, '35': { // 非项目工程采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/project/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=10'
				}, '36': { // 非项目it采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/it/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=10'
				}, '41': { //项目采购需求
					// PM确认供应商的需求明细
					'3': EpsWebRoot + '/#/project/pmconfirm/' + orderId,
					'4': EpsWebRoot + '/#/project/approval/' + orderId + '?type=1'
				}, /*'42':{// 项目型供应商采购订单
       // 项目采购-供应商确认PO/填写服务信息/调整送货信息，这个节点是42，移动端不支持操作
       '1':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=4',
       '2':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=1',
       },*/'43-1': { //项目型采购订单-设备
					'1': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=1'
				}, '43-2': { //项目型采购订单-工程
					'1': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=1'
				}, '43-3': { //项目型采购订单-IT
					'1': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=1'
				}, '51': { //新店/改造设备/工程订单
					// 已确认待审批
					'4': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=1',
					// 已调整待审批
					'8': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=2'
				}, '53': { //新店/改造IT采购需求
					// TSI确认供应商的需求明细
					'3': EpsWebRoot + '/#/newstoreit/pmconfirm/' + orderId,
					// DOA审批（IT Func/Dept）
					'4': EpsWebRoot + '/#/newstoreit/approval/' + orderId + '?type=1'
				}, '55': { //新店/改造IT采购订单
					// 餐厅确认评价（IT)
					'1': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=4',
					// DOA送货调整审批 （IT）
					'2': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=1'
				}, '61': { //新店/改造GC采购
					// 6 - 已确认待审批
					'6': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=1',
					// 11 - 已调整待审批
					'10': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=2'
				}
			};
		}
	}]);

	return TodoItemView;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(TodoItemView);

/***/ }),

/***/ 1911:
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

var _TodoItemView = __webpack_require__(1856);

var _TodoItemView2 = _interopRequireDefault(_TodoItemView);

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

var _EpsDialog = __webpack_require__(344);

var _EpsDialog2 = _interopRequireDefault(_EpsDialog);

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
}

var Reply = function (_Component) {
	_inherits(Reply, _Component);

	function Reply(props) {
		_classCallCheck(this, Reply);

		var store = new Store('Joywok:cache:tabs:remark');
		var cache = store.find({ id: 'tab:cache' }) || {};
		if (cache['id']) {
			props['remarksdetail']['parentData'] = cache["data"];
			props['remarksdetail']['remark'] = cache['data']['remark'];
		}
		return _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).call(this, props));
	}
	// 组件加载完毕


	_createClass(Reply, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			NProgress.done();
		}
	}, {
		key: 'render',
		value: function render() {
			var dispatch = this.props.dispatch;
			return _react2.default.createElement('div', { className: 'eps-remarks-detail' }, _react2.default.createElement('div', { className: 'i-remarks-wrap' }, _react2.default.createElement('img', { src: 'images/remark.png' })), _react2.default.createElement('div', { className: 'remarks-detail' }, this.props.remarksdetail.remark || '暂无备注'));
		}
	}]);

	return Reply;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(Reply);

/***/ }),

/***/ 1965:
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
	namespace: 'remarksdetail',
	state: {
		remarks: '餐厅的新地机无法正常使用，请及时处理。'
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