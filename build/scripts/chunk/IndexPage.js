webpackJsonp([2],{

/***/ 1840:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ 1841:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ 1868:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(1870);
var parse = __webpack_require__(1869);
var formats = __webpack_require__(1840);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 1869:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1841);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 1870:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1841);
var formats = __webpack_require__(1840);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ 1982:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenu = getMenu;
exports.getToDoListCount = getToDoListCount;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _qs = __webpack_require__(1868);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

window.basurl = "https://www.easy-mock.com/mock/5994f61b059b9c566dc0ffe8/eps"; // 待办接口


// 获取菜单


function getMenu(parame) {
  return (0, _EpsRequest2.default)('/jmis/JmisApiService?' + _qs2.default.stringify(parame), {
    method: 'GET'
  });
}

//获取待办件数
function getToDoListCount(parame) {
  console.log(parame, "parame");
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok' + '/common/getToDoListCount', {
    method: 'POST',
    body: JSON.stringify(parame)
  });
}

/***/ }),

/***/ 889:
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

var _router = __webpack_require__(338);

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
   * 首页
   */

var txtTodos = { '10': '维修', '20': '保养', '30': '非项目', '40': '项目', '50': "新店/改造非GC", '60': '新店/改造GC', '11': '设备', '12': '工程', '13': 'IT', '31': '设备', '32': '工程', '33': 'IT' };

var IndexPage = function (_Component) {
	_inherits(IndexPage, _Component);

	function IndexPage() {
		_classCallCheck(this, IndexPage);

		return _possibleConstructorReturn(this, (IndexPage.__proto__ || Object.getPrototypeOf(IndexPage)).apply(this, arguments));
	}

	_createClass(IndexPage, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var todosMenu = this.props.indexpage.todosMenu;
			var repairMenu = this.props.indexpage.repairMenu;
			var noProjectMenu = this.props.indexpage.noProjectMenu;
			var userInfo = userinfo;
			var self = this;
			if (this.props.indexpage.loading) {
				return _react2.default.createElement('div', { className: 'todos-loading' }, _react2.default.createElement('img', { src: 'images/loading.gif' }));
			} else {
				console.log(userinfo, "userinfo", todosMenu, this.props.indexpage.listCnt);
				var createMenuHtml = '';
				var imgurl = userinfo.avatar["avatar_l"];
				if (imgurl.indexOf('www.joywok.com') == -1) {
					imgurl = 'http://www.joywok.com/' + imgurl;
				}
				return _react2.default.createElement('div', { className: 'root-container' }, _react2.default.createElement('div', { className: 'root-container-w root-container-homepage' }, _react2.default.createElement('header', { className: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-c user' }, _react2.default.createElement('div', { className: 'user-avatar' }, _react2.default.createElement('img', { src: imgurl })), _react2.default.createElement('div', { className: 'user-info' }, _react2.default.createElement('div', { className: 'user-info-i' }, _react2.default.createElement('label', null, userInfo.name)), _react2.default.createElement('div', { className: 'user-info-i' }, _react2.default.createElement('span', null, userInfo.vendorName), _react2.default.createElement('span', null, userInfo.storeName), _react2.default.createElement('span', null, userInfo.doaRoleName))))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c clear-padding index-apps' }, _react2.default.createElement('div', { className: 'index-apps-i' }, this.renderCategoryPortal()), _react2.default.createElement('div', { className: 'index-apps-i' }, _react2.default.createElement('div', { className: 'index-apps-title', onClick: function onClick(e) {
						return _this2.pushWebView('/#/todos');
					} }, _react2.default.createElement('i', { className: 'icon-next-arrow' }), _react2.default.createElement('span', null, "\u6211\u7684\u5F85\u529E")), _react2.default.createElement('div', { className: 'index-apps-c border-line-h before' }, _.map(todosMenu, function (item) {
					return self.todomenuRender(item);
				}))), self.createRender(repairMenu, noProjectMenu)))));
			}
		}
	}, {
		key: 'renderCategoryPortal',
		value: function renderCategoryPortal() {
			var _this3 = this;

			var list_basurl = '/#/todos?status=',
			    unfinishedNum = _.reduce(_.values(this.props.indexpage.listCnt), function (cur, num) {
				return cur + num;
			}, 0),
			    unfinishedNumstr = unfinishedNum != 0 ? _react2.default.createElement('div', { className: 'apps-i-num eps-badge' }, unfinishedNum) : '';
			return _react2.default.createElement('div', { className: 'index-apps-c border-line-h before' }, _react2.default.createElement('div', { className: 'apps-i weixiu', onClick: function onClick(e) {
					return _this3.pushWebView(list_basurl + '0');
				} }, _react2.default.createElement('div', { className: 'apps-i-c border-line-v before' }, _react2.default.createElement('div', { className: 'apps-i-logo' }, unfinishedNumstr, _react2.default.createElement('div', { className: 'apps-i-logo-c icon-order-todos' })), _react2.default.createElement('div', { className: 'apps-i-val' }, "\u6211\u7684\u5F85\u529E"))), _react2.default.createElement('div', { className: 'apps-i weixiu', onClick: function onClick(e) {
					return _this3.pushWebView(list_basurl + '1');
				} }, _react2.default.createElement('div', { className: 'apps-i-c border-line-v before' }, _react2.default.createElement('div', { className: 'apps-i-logo' }, _react2.default.createElement('div', { className: 'apps-i-logo-c icon-order-unfinished' })), _react2.default.createElement('div', { className: 'apps-i-val' }, "\u5728\u9014\u8BA2\u5355"))), _react2.default.createElement('div', { className: 'apps-i weixiu', onClick: function onClick(e) {
					return _this3.pushWebView(list_basurl + '2');
				} }, _react2.default.createElement('div', { className: 'apps-i-c border-line-v before' }, _react2.default.createElement('div', { className: 'apps-i-logo' }, _react2.default.createElement('div', { className: 'apps-i-logo-c icon-order-history' })), _react2.default.createElement('div', { className: 'apps-i-val' }, "\u5386\u53F2\u8BA2\u5355"))));
		}
	}, {
		key: 'todomenuRender',
		value: function todomenuRender(data) {
			var _this4 = this;

			var numHtml = '';
			// console.log(this.props.indexpage.listCnt[data.type],"num")
			if (this.props.indexpage.listCnt[data.type]) {
				numHtml = _react2.default.createElement('div', { className: 'apps-i-num eps-badge' }, this.props.indexpage.listCnt[data.type]);
			} else {
				numHtml = '';
			}
			return _react2.default.createElement('div', { className: 'apps-i weixiu', onClick: function onClick(e) {
					return _this4.pushWebView(data.menu_url);
				} }, _react2.default.createElement('div', { className: 'apps-i-c border-line-v before' }, _react2.default.createElement('div', { className: 'apps-i-logo' }, numHtml, _react2.default.createElement('div', { className: "apps-i-logo-c " + 'icon-todo-' + data.type })), _react2.default.createElement('div', { className: 'apps-i-val' }, txtTodos[data.type])));
		}
	}, {
		key: 'createRender',
		value: function createRender(repairMenu, noProjectMenu) {
			if (repairMenu.length == 0 && noProjectMenu.length == 0) {
				return _react2.default.createElement('div', { className: 'no-create-menu' });
			} else {
				return _react2.default.createElement('div', { className: 'index-apps-i' }, _react2.default.createElement('div', { className: 'index-apps-title' }, _react2.default.createElement('span', null, "\u521B\u5EFA\u8BA2\u5355")), _react2.default.createElement('div', { className: 'index-apps-c border-line-h before' }, this.repairRender(repairMenu), this.noProjectRender(noProjectMenu)));
			}
		}
	}, {
		key: 'repairRender',
		value: function repairRender(repairMenu) {
			var self = this;
			console.log(repairMenu, "repairMenu");
			if (repairMenu.length > 0) {
				return _react2.default.createElement('div', { className: 'index-create-order-i weixiu' }, _react2.default.createElement('div', { className: 'index-create-order-label border-line-v after' }, _react2.default.createElement('i', { className: 'icon-weixiu-icon' }), _react2.default.createElement('span', null, "\u7EF4\u4FEE")), _react2.default.createElement('div', { className: 'index-create-order-c' }, _.map(repairMenu, function (item) {
					return self.createMenuRender(item);
				})));
			} else {
				return _react2.default.createElement('div', { className: 'no-create-menu' });
			}
		}
	}, {
		key: 'noProjectRender',
		value: function noProjectRender(noProjectMenu) {
			var self = this;
			if (noProjectMenu.length > 0) {
				return _react2.default.createElement('div', { className: 'index-create-order-i' }, _react2.default.createElement('div', { className: 'index-create-order-label border-line-v after' }, _react2.default.createElement('i', { className: 'icon-feixiangmu-icon' }), _react2.default.createElement('span', null, "\u975E\u9879\u76EE")), _react2.default.createElement('div', { className: 'index-create-order-c' }, _.map(noProjectMenu, function (item) {
					return self.createMenuRender(item);
				})));
			} else {
				return _react2.default.createElement('div', { className: 'no-create-menu' });
			}
		}
	}, {
		key: 'createMenuRender',
		value: function createMenuRender(data) {
			var _this5 = this;

			var IconName = '';
			if (data.type == '11' || data.type == '31') {
				IconName = 'icon-device';
			} else if (data.type == '12' || data.type == '32') {
				IconName = "icon-project";
			} else if (data.type == '13' || data.type == '33') {
				IconName = "icon-it";
			}
			return _react2.default.createElement('div', { className: 'index-order-i device', onClick: function onClick(e) {
					return _this5.pushWebView(data.menu_url);
				} }, _react2.default.createElement('i', { className: IconName }), _react2.default.createElement('span', null, txtTodos[data.type]));
		}
	}, {
		key: 'pushWebView',
		value: function pushWebView(data) {
			console.log(EpsWebRoot, data, "EpsWebRoot");
			var url = EpsWebRoot + data;
			jw.pushWebView(url);
		}
		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var appid = configData.appid;
			console.log("configData", appid);
			NProgress.done();
			var dispatch = this.props.dispatch;
			PubSub.subscribe('get:child:todos:updateTodoList', function (evt, data) {
				console.log('updateTodoList', data);
				dispatch({
					type: "indexpage/getMenu",
					payload: {
						loading: false,
						param: {
							eid: userinfo.employee_id,
							appid: window.appid
						}
					}
				});
			});
			dispatch({
				type: "indexpage/getMenu",
				payload: {
					loading: false,
					param: {
						eid: userinfo.employee_id,
						appid: window.appid
					}
				}
			});
		}
	}]);

	return IndexPage;
}(_react.Component);

function mapStateToProps(state) {
	return state;
}

exports.default = (0, _dva.connect)(mapStateToProps)(IndexPage);

/***/ }),

/***/ 894:
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

var _indexpage = __webpack_require__(1982);

var UserService = _interopRequireWildcard(_indexpage);

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

  namespace: 'indexpage',

  state: {
    loading: true,
    userInfo: window.userinfo,
    todosMenu: [],
    listCnt: {}
  },

  reducers: {
    // 把返回的数据放到state中
    changeData: function changeData(state, action) {
      return _extends({}, state, action.payload);
    }
  },

  effects: {
    // 用户角色
    getMenu: /*#__PURE__*/regeneratorRuntime.mark(function getMenu(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var param, menuList, CollectionMenu, newCollectionMenu, menuTodoList, menuNoProjectList, menuRepairList, txtTodos, sortMenuTodo, sortMenuRepair, sortMenuNoProject, data, Cnt;
      return regeneratorRuntime.wrap(function getMenu$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              param = payload.param;
              // const userData = yield call(UserService.getUser, payload );

              _context.next = 3;
              return call(UserService.getMenu, param);

            case 3:
              menuList = _context.sent;
              CollectionMenu = [];

              //合并菜单角色

              _.map(menuList.data.role, function (item) {
                CollectionMenu = _.union(CollectionMenu, item.menu);
              });
              newCollectionMenu = [];

              //角色去重

              _.each(CollectionMenu, function (item) {
                var isExist = _.find(newCollectionMenu, function (i) {
                  return i.menu_url == item.menu_url;
                });
                if (isExist) {} else {
                  if (item.menu_ename == 'EPS Mobile') {} else {
                    newCollectionMenu.push(item);
                  }
                }
              });

              //newCollectionMenu为 去重后的菜单合集

              // 待办menuTodoList;
              menuTodoList = [];
              menuNoProjectList = [];
              menuRepairList = [];
              txtTodos = { '10': '维修', '20': '保养', '30': '非项目', '40': '项目', '50': '新店/改造非GC', '60': '新店/改造GC' };

              _.each(newCollectionMenu, function (item) {
                if (item.menu_url.indexOf('todos') > 0) {
                  item.type = item.menu_url.substring(14, 16);
                  item.val = txtTodos[item.type];
                  item.key = txtTodos[item.type];
                  menuTodoList.push(item);
                }
              });
              //  创建 createRepairList;
              _.each(newCollectionMenu, function (item) {
                if (item.menu_url.indexOf('repairing/createpo') > 0) {
                  switch (item.menu_url.substring(22)) {
                    case 'equipment':
                      item.type = '11';
                      break;
                    case 'project':
                      item.type = '12';
                      break;
                    case 'it':
                      item.type = '13';
                      break;
                  }
                  menuRepairList.push(item);
                }
              });
              //noProjectList
              _.each(newCollectionMenu, function (item) {
                if (item.menu_url.indexOf('nonproject/createpo') > 0) {
                  switch (item.menu_url.substring(23)) {
                    case 'equipment':
                      item.type = '31';
                      break;
                    case 'project':
                      item.type = '32';
                      break;
                    case 'it':
                      item.type = '33';
                      break;
                  }
                  menuNoProjectList.push(item);
                }
              });
              sortMenuTodo = _.sortBy(menuTodoList, 'type');
              sortMenuRepair = _.sortBy(menuRepairList, 'type');
              sortMenuNoProject = _.sortBy(menuNoProjectList, 'type');
              _context.next = 20;
              return call(UserService.getToDoListCount, { param: { eid: param.eid } });

            case 20:
              data = _context.sent;
              Cnt = {};

              Cnt['10'] = data.data.body.todoListCnt['repairCnt'];
              Cnt['20'] = data.data.body.todoListCnt['maintenanceCnt'];
              Cnt['30'] = data.data.body.todoListCnt['nonProjectCnt'];
              Cnt['40'] = data.data.body.todoListCnt['projectCnt'];
              Cnt['50'] = data.data.body.todoListCnt['newStoreCnt'];
              Cnt['60'] = data.data.body.todoListCnt['newStoreGcCnt'];

              window.upTabsData('todosMenu', 'cache', sortMenuTodo);

              if (!(sortMenuTodo && data.data.body.todoListCnt)) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return put({
                type: 'changeData',
                payload: {
                  todosMenu: sortMenuTodo,
                  repairMenu: sortMenuRepair,
                  noProjectMenu: sortMenuNoProject,
                  listCnt: Cnt,
                  loading: false
                }
              });

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, getMenu, this);
    })
  },

  subscriptions: {}

};

/***/ })

});