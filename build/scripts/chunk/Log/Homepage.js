webpackJsonp([3],{

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

/***/ 890:
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
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var statusRoutes = {};

var Log = function (_Component) {
	_inherits(Log, _Component);

	function Log() {
		_classCallCheck(this, Log);

		return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).apply(this, arguments));
	}

	_createClass(Log, [{
		key: 'render',
		value: function render() {
			var data = this.props.log;
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('div', { className: 'loading-bounce-w fix' }, _react2.default.createElement('div', { className: 'loading-bounce-bg' }), _react2.default.createElement('div', { className: 'loading-bounce-main' }, _react2.default.createElement('div', { className: 'loading-gif' }, _react2.default.createElement('img', { src: 'images/loading.gif' })), _react2.default.createElement('div', { className: 'loading-bounce-tip' }, "\u6B63\u5728\u8DF3\u8F6C,\u8BF7\u7A0D\u540E\u2026\u2026")))));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var dispatch = this.props.dispatch;
			var orderid = window.location.href.split('?')[1].split('&')[0].split('=')[1];
			(0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getOrderinfoForMobile', {
				method: 'POST',
				body: JSON.stringify({
					param: {
						eid: eid,
						condition: {
							orderNumber: orderid
						}
					}
				})
			}).then(function (resp) {
				if (resp['data']['success'] == false) {} else {
					NProgress.done();
					var data = resp['data']['body']['orderInfo'];
					console.log(resp['data']['body']['orderInfo'], '12312312312312312312312');
					self.openWebView(resp['data']['body']['orderInfo']);
					return;
					setTimeout(function () {
						var a = data["url"] || 'http://jmistest.mcd.com.cn/eps/#/repairing/process/it/RP170007420?type=1&updateDate=2017-11-18 18:43:16';
						var url = a.split('?')[0];
						var object = a.split('?')[1].split('&');
						object = _.map(object, function (i, index) {
							var str = '';
							var nowData = i.split('=');
							if (nowData[0] == 'updateDate') {
								// encodeURIComponent(encodeURIComponent(encodeURIComponent("2017-11-18 18:43:16")))
								str = nowData[0] + '=' + nowData[1];
							} else {
								str = nowData[0] + '=' + nowData[1];
							}
							if (index == 0) {
								str = '?' + str;
							}
							return str;
						});

						url = url + object.join('&');
						console.log(url, object);
						// window.location.href = url;
						history.pushState({}, '', url.split(window.location.origin)[1]);
						window.location.reload();
					});
				}
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'getStatusRoutes',
		value: function getStatusRoutes(orderId) {
			console.log('orderId', orderId);
			var EpsWebRoot = '/eps';
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
				},
				'12': {
					//2:供应商响应，   5： doa审批  7： 餐厅确认及评价 8：再次审批 
					'2': EpsWebRoot + '/#/repairing/response/project/' + orderId,
					'4': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=1', //餐厅确认1
					'5': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=2',
					'7': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=4',
					'8': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=3'
				},
				'13': {
					// 3：供应商重新评估IT维修（餐厅确认节点退回后的状态） 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：再次审批
					'3': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=1',
					'4': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=1',
					'5': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=2',
					'6': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=2',
					'7': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=4',
					'8': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=3'
				},
				'21': { //保养 设备年度 2：DO审批
					// '2':'/#/repairing/response/equipment/,
					'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=year'
				},
				'22': { //保养设备月度审核 2： 已提交待审批
					'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=month'
				},
				'23': { // 设备保养订单 1:已提交待响应 3：已确认待服务 4：已服务待评价
					'1': EpsWebRoot + '/#/maintenance/equipment/reply/' + orderId,
					'3': EpsWebRoot + '/#/maintenance/equipment/confirm/' + orderId,
					'4': EpsWebRoot + '/#/maintenance/equipment/assess/' + orderId
				},
				'24': { // 工程年度保养计划
					'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=year'
				},
				'25': { // 工程月度保养计划
					'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=month'
				},
				'26': { // 工程保养订单
					'1': EpsWebRoot + '/#/maintenance/project/reply/' + orderId,
					'3': EpsWebRoot + '/#/maintenance/project/confirm/' + orderId,
					'4': EpsWebRoot + '/#/maintenance/project/assess/' + orderId
				},
				'31': { // 非项目设备采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/equipment/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=10'
				},
				'32': { // 非项目设备采购  1：已创建待审批(DOA) 3：已服务待签收(餐厅) 4：已收货待审批(DOA)
					'1': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=3'
				},
				'33': { //非项目工程  1：  3：  4：同上
					'1': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=3'
				},
				'34': { //非项目it 1:已创建待审批 3:已服务待签收 4:餐厅已确认(DOA审批) 5:IT PM已确认(DOA审批)
					'1': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
					'3': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=4',
					'4': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
					'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1'
				},
				'35': { // 非项目工程采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/project/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=10'
				},
				'36': { // 非项目it采购需求 只有创建
					'1': EpsWebRoot + '/#/nonproject/createpo/it/' + orderId,
					'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=10'
				},
				'41': { //项目采购需求
					// PM确认供应商的需求明细
					'3': EpsWebRoot + '/#/project/pmconfirm/' + orderId,
					'4': EpsWebRoot + '/#/project/approval/' + orderId + '?type=1'
				},
				/*'42':{// 项目型供应商采购订单
    	// 项目采购-供应商确认PO/填写服务信息/调整送货信息，这个节点是42，移动端不支持操作
    	'1':'/#/project/approval/equipment/'+orderId+'?type=4',
    	'2':'/#/project/approval/equipment/'+orderId+'?type=1',
    },*/
				'43-1': { //项目型采购订单-设备
					'1': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=1'
				},
				'43-2': { //项目型采购订单-工程
					'1': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=1'
				},
				'43-3': { //项目型采购订单-IT
					'1': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=4',
					'2': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=1'
				},
				'51': { //新店/改造设备/工程订单
					// 已确认待审批
					'4': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=1',
					// 已调整待审批
					'8': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=2'
				},
				'53': { //新店/改造IT采购需求
					// TSI确认供应商的需求明细
					'3': EpsWebRoot + '/#/newstoreit/pmconfirm/' + orderId,
					// DOA审批（IT Func/Dept）
					'4': EpsWebRoot + '/#/newstoreit/approval/' + orderId + '?type=1'
				},
				'55': { //新店/改造IT采购订单
					// 餐厅确认评价（IT)
					'1': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=4',
					// DOA送货调整审批 （IT）
					'2': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=1'
				},
				'61': { //新店/改造GC采购
					// 6 - 已确认待审批
					'6': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=1',
					// 11 - 已调整待审批
					'10': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=2'
				}
			};
		}
	}, {
		key: 'getViewRoutes',
		value: function getViewRoutes(subProcess, statusCode, orderId) {
			var EpsWebRoot = '/eps';
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
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			if (data['orderType'] == '-1') {
				// confirm("您没有权限查看该订单！");
				// jw.closeWebView();
				window.location.replace('/eps/#/nopermiss');
				return;
			}
			if (data["mobileOperationFlag"] != '1') {
				confirm("该订单不可在移动端处理，请到 PC 端处理");
				jw.closeWebView();
				return;
			}
			var updateDate = data["updateDate"];
			// let a = data["url"]
			// let url = a.split('?')[0];
			// let object = a.split('?')[1].split('&');
			// _.each(object,function(i,index){
			// 	let str = '';
			// 	let nowData = i.split('=');
			// 	if (nowData[0] == 'updateDate'){
			// 		updateDate =  nowData[1]
			// 	}
			// })
			if (data['orderType'] == '1') {
				this.getStatusRoutes(data['orderNumber']);
				if (statusRoutes[data["flowType"]] && statusRoutes[data["flowType"]][data["orderState"]]) {
					var url = statusRoutes[data["flowType"]][data["orderState"]];
					url += (url.indexOf('?') > 0 ? '&' : '?') + 'updateDate=' + encodeURIComponent(updateDate);
					console.log(updateDate, url, '这个url是什么');
					// setTimeout(function(){
					// 	history.pushState({},'',url)
					// 	window.location.reload();	
					// })
					window.location.replace(url);
					setTimeout(function () {
						window.location.reload();
					}, 0);
				}
			} else {
				var _url = this.getViewRoutes(data["flowType"], data["orderState"], data['orderNumber']);
				if (!_url) {
					alert('未知业务类型[' + data["orderState"] + '] 订单号[' + data['orderNumber'] + ']');
					jw.closeWebView();
					return;
				}
				_url += (_url.indexOf('?') > 0 ? '&' : '?') + 'sta=' + (Number(data["orderType"]) - 1) + '&' + 'updateDate=' + encodeURIComponent(updateDate);
				console.log(updateDate, _url, '这个url是什么');
				// history.pushState({},'',url)

				// window.location.href = url;
				window.location.replace(_url);
				setTimeout(function () {
					window.location.reload();
				}, 0);
			}
			// if(data["visitFlag"]){
			// this.openWebViewDetail(data.todoCol2,data.todoCol4,data.todoCol6,data.todoCol3);
			// }else{
			// this.getRouter(data.todoCol2,data.todoCol4,data.todoCol6,data.todoCol3);
			/*if(data.todoCol2=='12'&&data.todoCol6=='6'){
   	confirm("该订单不可在移动端处理，请到 PC 端处理");
   }*/
		}
	}]);

	return Log;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Log);

/***/ })

});