webpackJsonp([5],{

/***/ 891:
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
   * 仅pc端操作，统一待办地址
   */

var TodoPC = function (_Component) {
	_inherits(TodoPC, _Component);

	function TodoPC() {
		_classCallCheck(this, TodoPC);

		return _possibleConstructorReturn(this, (TodoPC.__proto__ || Object.getPrototypeOf(TodoPC)).apply(this, arguments));
	}

	_createClass(TodoPC, [{
		key: 'componentDidMount',

		// 组件加载完毕
		value: function componentDidMount() {
			NProgress.done();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w eps-todopc-page' }, _react2.default.createElement('header', { className: 'header' }, _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c clear-padding eps-todopc-tips' }, _react2.default.createElement('i', { className: 'icon-todopc-page' }), _react2.default.createElement('p', { className: 'eps-totopc-tip' }, "\u60A8\u6CA1\u6709\u6743\u9650\u67E5\u770B\u6B64\u8BA2\u5355\uFF01\uFF01\uFF01")))));
		}
	}]);

	return TodoPC;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}

exports.default = (0, _dva.connect)(mapStateToProps)(TodoPC);

/***/ })

});