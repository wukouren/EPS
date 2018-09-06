webpackJsonp([32],{

/***/ 1129:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return Hammer;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),

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

/***/ 1171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DeviceCardMore = exports.DeviceCardAssessToIT = exports.DeviceCardAssess = exports.DeviceCardResponse = exports.DeviceCardListShow = exports.DeviceCardSelect = undefined;

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

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _hammerjs = __webpack_require__(1129);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

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
} /**
   * 设备卡片
   */

var fittingOperation = (0, _constants.getDict)('fittingOperation'); // 配件操作建议
var equipmentOperation = (0, _constants.getDict)('equipmentOperation'); // 设备操作建议
/*
 * 设备卡片的公共展示部分
 */

var DeviceCardCommon = function (_Component) {
	_inherits(DeviceCardCommon, _Component);

	function DeviceCardCommon(props) {
		_classCallCheck(this, DeviceCardCommon);

		var _this = _possibleConstructorReturn(this, (DeviceCardCommon.__proto__ || Object.getPrototypeOf(DeviceCardCommon)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(DeviceCardCommon, [{
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			console.log('data.showCardIcon:', this.props.showCardIcon);
			/*
   	<div className="eps-item-info-inline">
   		<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.deviceName }</font></dd></div>
   		<div className="eps-item-info"><dt><label>维修商</label></dt><dd><font className="ellipsis">{data["vendorName"]}</font></dd></div>
   	</div>
    */
			return _react2.default.createElement('div', { className: 'eps-list-card ' }, this.props.showCardIcon == true ? _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }) : '', this.props.children || '', _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.deviceName))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907\u578B\u53F7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.equipmentType || '无'))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u54C1\u724C")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.equipmentBrand || '无')))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u5546")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data["vendorName"]))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.faCategory || data.categoryCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code2')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.subCategory || data.subCategoryCode)))));
		}
	}]);

	return DeviceCardCommon;
}(_react.Component);

/**
 * 选择设备卡片
 */

var DeviceCardSelect = exports.DeviceCardSelect = function (_Component2) {
	_inherits(DeviceCardSelect, _Component2);

	function DeviceCardSelect(props) {
		_classCallCheck(this, DeviceCardSelect);

		var _this2 = _possibleConstructorReturn(this, (DeviceCardSelect.__proto__ || Object.getPrototypeOf(DeviceCardSelect)).call(this, props));

		_this2.selectHandler = _this2.selectHandler.bind(_this2);
		return _this2;
	}

	_createClass(DeviceCardSelect, [{
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			console.log('devicecard==========:', this.props.itemdata);
			return _react2.default.createElement('div', { className: 'eps-device-card-select', onClick: this.selectHandler }, _react2.default.createElement(DeviceCardCommon, { itemdata: this.props.itemdata }), _react2.default.createElement('div', { className: 'checked-btn-wrap' }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" })));
		}
	}]);

	return DeviceCardSelect;
}(_react.Component);

;

/**
 * 已添加设备卡片
 */

var DeviceCardListShow = exports.DeviceCardListShow = function (_Component3) {
	_inherits(DeviceCardListShow, _Component3);

	function DeviceCardListShow(props) {
		_classCallCheck(this, DeviceCardListShow);

		var _this3 = _possibleConstructorReturn(this, (DeviceCardListShow.__proto__ || Object.getPrototypeOf(DeviceCardListShow)).call(this, props));

		_this3.state = {
			checked: false
			// console.log('DeviceCardSelect card====',this.props)
		};_this3.selectHandler = _this3.selectHandler.bind(_this3);
		return _this3;
	}

	_createClass(DeviceCardListShow, [{
		key: 'selectHandler',
		value: function selectHandler() {
			this.setState({ 'checked': !this.state.checked });
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'deleteItem',
		value: function deleteItem(itemdata) {
			// console.log(1111)
			var self = this;
			if (confirm("是否确认删除该条记录？")) {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				self.props.delDeviceItem(itemdata);
			} else {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				console.log("点击了取消按钮");
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var height = $(_reactDom2.default.findDOMNode(this.refs.cardwrap)).height();

			$(_reactDom2.default.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
				'margin-top': '0',
				'line-height': height - 20 + 'px'
			});
			if (this.props.deleteBtnShow != true) return;

			var hammertime = new _hammerjs2.default(_reactDom2.default.findDOMNode(this.refs.card));
			var card = $(_reactDom2.default.findDOMNode(this.refs.card));
			var delBtn = _reactDom2.default.findDOMNode(this.refs.delBtn);
			var btnWidth = $(delBtn).width();
			var cardLeft = void 0;
			var isMinus = void 0; // 是否负数  true 负数  false 正数
			var cardStartLeft = void 0;
			hammertime.on("panstart", function (e) {
				cardStartLeft = card.offset().left;
			});
			// hammertime.on( "pan", (e)=>{
			// 	isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
			// 	cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
			// 	cardLeft = cardLeft > 0 ? 0 : cardLeft;
			// 	card.css({left:cardLeft});
			// 	console.log(e.deltaX,btnWidth);
			// })
			hammertime.on('panleft', function (e) {
				card.stop().animate({ left: -btnWidth + 'px' }, 200);
			});
			hammertime.on('panright', function (e) {
				card.stop().animate({ left: '0px' }, 200);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var deleteBtn = '';
			if (this.props.deleteBtnShow == true) {
				deleteBtn = _react2.default.createElement('div', { className: 'eps-swipe-delete', ref: 'delBtn', onClick: function onClick() {
						return _this4.deleteItem(_this4.props.itemdata);
					} }, _react2.default.createElement('div', { className: 'eps-swipe-wrap' }, _react2.default.createElement('font', null, "\u5220\u9664")));
			}
			return _react2.default.createElement('div', { className: 'eps-device-card-select ', ref: 'cardwrap' }, deleteBtn, _react2.default.createElement(DeviceCardCommon, { itemdata: this.props.itemdata, showCardIcon: true, ref: 'card' }));
		}
	}]);

	return DeviceCardListShow;
}(_react.Component);

;

//供应商响应卡片

var DeviceCardResponse = exports.DeviceCardResponse = function (_Component4) {
	_inherits(DeviceCardResponse, _Component4);

	function DeviceCardResponse(props) {
		_classCallCheck(this, DeviceCardResponse);

		var _this5 = _possibleConstructorReturn(this, (DeviceCardResponse.__proto__ || Object.getPrototypeOf(DeviceCardResponse)).call(this, props));

		_this5.state = {};
		return _this5;
	}

	_createClass(DeviceCardResponse, [{
		key: 'NameInfo',
		value: function NameInfo(name) {
			if ((0, _constants.DataLength)(name) > 10) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			var self = this;
			return _react2.default.createElement('div', { className: 'eps-device-card-select' }, _react2.default.createElement('div', { className: 'eps-list-card ' }, this.props.showCardIcon == true ? _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }) : '', this.props.children || '', _react2.default.createElement('div', { className: 'eps-item-info', onClick: function onClick() {
					return self.NameInfo(data.deviceName);
				} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.deviceName))), _react2.default.createElement('div', { className: 'eps-item-info ellipsis', onClick: function onClick() {
					return self.NameInfo(data["vendorName"]);
				} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u5546")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data["vendorName"]))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.faCategory || data.categoryCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code2')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.subCategory || data.subCategoryCode)))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907ID")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data["deviceNumber"] || '')))));
		}
	}]);

	return DeviceCardResponse;
}(_react.Component);

/**
 * 供应商评估/确认 设备卡片
 */

var DeviceCardAssess = exports.DeviceCardAssess = function (_Component5) {
	_inherits(DeviceCardAssess, _Component5);

	function DeviceCardAssess(props) {
		_classCallCheck(this, DeviceCardAssess);

		var _this6 = _possibleConstructorReturn(this, (DeviceCardAssess.__proto__ || Object.getPrototypeOf(DeviceCardAssess)).call(this, props));

		_this6.state = {
			checked: false
		};
		console.log('DeviceCardAssess card====', _this6.props);
		_this6.clickHandler = _this6.clickHandler.bind(_this6);
		return _this6;
	}

	_createClass(DeviceCardAssess, [{
		key: 'clickHandler',
		value: function clickHandler() {
			this.setState({ 'checked': !this.state.checked });
			typeof this.props.onClick == 'function' ? this.props.onClick(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'openWebView',
		value: function openWebView(data) {
			if (this.props.noClick) {
				return;
			}
			var url = EpsWebRoot + '/#' + data;
			var datas = this.props.itemdata;
			datas['orderid'] = this.props.orderid;
			console.log(datas, '这个里面有什么数据呢');
			window.upTabsData('details:device:card', 'cache', datas);
			jw.pushWebView(url);
		}
		//删除设备信息

	}, {
		key: 'deleteItem',
		value: function deleteItem(itemdata) {
			console.log("删除设备信息");
			var self = this;
			if (confirm("是否确认删除该条记录？")) {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				self.props.delDeviceItem(itemdata);
			} else {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				console.log("点击了取消按钮");
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var height = $(_reactDom2.default.findDOMNode(this.refs.cardwrap)).height();

			$(_reactDom2.default.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
				'margin-top': '0',
				'line-height': height + 'px'
			});
		}
		//组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var height = $(_reactDom2.default.findDOMNode(this.refs.cardwrap)).height();

			$(_reactDom2.default.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
				'margin-top': '0',
				'line-height': height + 'px'
			});
			if (this.props.deleteBtnShow != true) return;

			var hammertime = new _hammerjs2.default(_reactDom2.default.findDOMNode(this.refs.card));
			var card = $(_reactDom2.default.findDOMNode(this.refs.card));
			var delBtn = _reactDom2.default.findDOMNode(this.refs.delBtn);
			var btnWidth = $(delBtn).width();
			var cardLeft = void 0;
			var isMinus = void 0; // 是否负数  true 负数  false 正数
			var cardStartLeft = void 0;
			hammertime.on("panstart", function (e) {
				cardStartLeft = card.offset().left;
			});
			// hammertime.on( "pan", (e)=>{
			// 	isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
			// 	cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
			// 	cardLeft = cardLeft > 0 ? 0 : cardLeft;
			// 	card.css({left:cardLeft});
			// 	console.log(e.deltaX,btnWidth);
			// })
			hammertime.on('panleft', function (e) {
				card.stop().animate({ left: -btnWidth + 'px' }, 200);
			});
			hammertime.on('panright', function (e) {
				card.stop().animate({ left: '0px' }, 200);
			});
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name) {
			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
		}
	}, {
		key: 'render',
		value: function render(props) {
			var _this7 = this;

			var data = this.props.itemdata;
			var orderid = this.props.orderid;
			var deviceid = data['id'];
			var deleteBtn = '',
			    self = this;
			if (this.props.deleteBtnShow == true) {
				deleteBtn = _react2.default.createElement('div', { className: 'eps-swipe-delete', ref: 'delBtn', onClick: function onClick() {
						return _this7.deleteItem(_this7.props.itemdata);
					} }, _react2.default.createElement('div', { className: 'eps-swipe-wrap' }, _react2.default.createElement('font', null, "\u5220\u9664")));
			}
			console.log(data, '单条的信息', '设置的总数据');
			if (typeof this.props.showMore != 'undefined') {
				//订单详情部分
				console.log("123");
				var maintainer = '';
				if (data.maintainer != false) {
					maintainer = _react2.default.createElement('div', { className: 'eps-item-info', onClick: function onClick(e) {
							e.stopPropagation();self.NameInfo(data["vendorName"]);
						} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u5546")), _react2.default.createElement('dd', { className: 'ellipsis' }, _react2.default.createElement('font', { className: 'ellipsis', title: data["vendorName"] }, data["vendorName"])));
				}

				var deviceOperate = data['deviceOperate'] ? _.findWhere(equipmentOperation, { value: data.deviceOperate })["label"] : '-';
				return _react2.default.createElement('div', { className: 'eps-device-card-select', onClick: function onClick(e) {
						return _this7.openWebView('/repairing/maintenance-details/equipment/' + orderid + '/' + deviceid);
					} }, _react2.default.createElement('div', { className: this.props.animated == false ? "eps-list-card" : "eps-list-card animated zoom" }, this.props.showCardIcon == false ? '' : _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), this.props.children, _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info', onClick: function onClick(e) {
						e.stopPropagation();self.NameInfo(data.name);
					} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis eps-swipe-wrap' }, data.name))), _react2.default.createElement('div', { className: 'eps-item-info', onClick: function onClick(e) {
						e.stopPropagation();self.NameInfo(data["deviceSerialNumber"] || "-");
					} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5E8F\u5217\u53F7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', title: data["deviceSerialNumber"] }, data["deviceSerialNumber"] || "-")))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, data.faCategory))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u64CD\u4F5C\u5EFA\u8BAE")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, deviceOperate)))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code2')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, data.subCategory))), maintainer), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u6570\u91CF")), _react2.default.createElement('dd', null, data['repairnum'] ? _react2.default.createElement('font', { className: 'eps-badge' }, data['repairnum']) : _react2.default.createElement('font', null, '-'))), _react2.default.createElement('div', { className: 'eps-item-info', onClick: function onClick(e) {
						e.stopPropagation();self.NameInfo(data.deviceMark);
					} }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u63CF\u8FF0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data['deviceMark'])))), data.deviceList && data.deviceList.length != 0 ? _react2.default.createElement('div', { className: 'eps-list-item-parts border-line-h before' }, _react2.default.createElement('i', { className: 'icon-parts' }), "\u8BE5\u8BBE\u5907\u5305\u542B", data.deviceList.length, "\u4E2A\u914D\u4EF6") : ''));
			} else {
				console.log("走这里了吗?");
				/*
    if( (data.deviceList && data.deviceList.length!=0)||data.deviceSerialNumber||data.repairnum){
    	//左边的图设备维修单
    	console.log("bfiwyqbtrwueitvgverw:确认一下是不是走这里了？")
    	let maintainer = '';
    	if(data.maintainer != false){
    		maintainer = (<div className="eps-item-info">
    			<dt><label>维修商</label></dt><dd><font className="ellipsis" title={data["vendorName"]}>{data["vendorName"]}</font></dd>
    		</div>);
    	}
    	let deviceOperate = data['deviceOperate']?_.findWhere(equipmentOperation,{value:data.deviceOperate})["label"]:'-'
    	return (
    	 <div className="eps-device-evaluation-list" ref="cardwrap">
    			{ deleteBtn }
    		<div className="eps-device-card-select" ref="card" onClick={(e)=>this.openWebView('/repairing/maintenance-details/equipment/'+orderid+'/'+deviceid)}>
    			<div className={ this.props.animated==false ? "eps-list-card" : "eps-list-card animated zoom" }>
    				{ this.props.showCardIcon==false ? '' : (<i className="eps-list-card-bgicon"></i>) }
    				{ this.props.children }
    				<div className="eps-item-info-inline">
    					<div className="eps-item-info"><dt><label>设备名称</label></dt><dd><font className="ellipsis">{ data.name?data.name:"" }</font></dd></div>
    					<div className="eps-item-info"><dt><label>序列号</label></dt><dd><font className="ellipsis" title={data["deviceSerialNumber"]}>{data["deviceSerialNumber"] || "-"}</font></dd></div>
    				</div>
    				<div className="eps-item-info-inline">
    					<div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font>{ data.faCategory }</font></dd></div>
    					<div className="eps-item-info"><dt><label>操作建议</label></dt><dd><font>{deviceOperate}</font></dd></div>
    				</div>
    				<div className="eps-item-info-inline">
    					<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font>{ data.subCategory }</font></dd></div>
    					{ maintainer }
    				</div>
    				<div className="eps-item-info-inline">
    					<div className="eps-item-info"><dt><label>维修数量</label></dt><dd>{
    						data['repairnum']?<font className="eps-badge">{data['repairnum']}</font>:<font>-</font>
    					}</dd></div>
    					<div className="eps-item-info"><dt><label>维修描述</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceMark) } }>{data['deviceMark']}</font></dd></div>
    				</div>
    				{ data.deviceList && data.deviceList.length!=0 ? (<div className="eps-list-item-parts border-line-h before"><i className="icon-parts"></i>该设备包含{data.deviceList.length}个配件</div>) : ''}
    			</div>
    		</div>
    	 </div>
    	)
    }else{
    */
				return _react2.default.createElement('div', { className: 'eps-device-evaluation-list', ref: 'cardwrap' }, deleteBtn, _react2.default.createElement('div', { className: 'eps-device-card-select', ref: 'card', onClick: function onClick(e) {
						return _this7.openWebView('/repairing/maintenance-details/equipment/' + orderid + '/' + deviceid);
					} }, _react2.default.createElement('div', { className: 'eps-list-card ' }, this.props.showCardIcon == true ? _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }) : '', this.props.children || '', _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.deviceName))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u5546")), _react2.default.createElement('dd', { onClick: function onClick(e) {
						e.stopPropagation();self.NameInfo(data["vendorName"]);
					} }, _react2.default.createElement('font', { className: 'ellipsis' }, data["vendorName"]))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.faCategory || data.categoryCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code2')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.subCategory || data.subCategoryCode)))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907ID")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data["deviceNumber"]))))));
				// }
			}
		}
	}]);

	return DeviceCardAssess;
}(_react.Component);

;

/**
 * 供应商评估/确认 IT设备卡片
 */

var DeviceCardAssessToIT = exports.DeviceCardAssessToIT = function (_Component6) {
	_inherits(DeviceCardAssessToIT, _Component6);

	function DeviceCardAssessToIT(props) {
		_classCallCheck(this, DeviceCardAssessToIT);

		var _this8 = _possibleConstructorReturn(this, (DeviceCardAssessToIT.__proto__ || Object.getPrototypeOf(DeviceCardAssessToIT)).call(this, props));

		_this8.state = {
			checked: false
		};
		_this8.clickHandler = _this8.clickHandler.bind(_this8);
		return _this8;
	}

	_createClass(DeviceCardAssessToIT, [{
		key: 'clickHandler',
		value: function clickHandler() {
			this.setState({ 'checked': !this.state.checked });
			typeof this.props.onClick == 'function' ? this.props.onClick(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'NameInfo',
		value: function NameInfo(name) {
			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
		}
	}, {
		key: 'render',
		value: function render(props) {
			var self = this;
			var data = this.props.itemdata;
			var deviceOperate = void 0;
			console.log('render=======:', data);
			if (data['deviceOperate'] && data['deviceOperate'] != '-1') {
				deviceOperate = data['deviceOperate'] ? equipmentOperation[data['deviceOperate']]['label'] : '';
			} else {
				deviceOperate = '无';
			}
			// console.log('render=======:'+deviceOperate)
			return _react2.default.createElement('div', { className: 'eps-device-card-select' }, _react2.default.createElement('div', { className: this.props.animated == false ? "eps-list-card" : "eps-list-card animated zoomIn" }, this.props.showCardIcon == false ? '' : _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), this.props.children, _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u8BBE\u5907\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.deviceName);
				} }, data.deviceName))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5E8F\u5217\u53F7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.deviceCode);
				} }, data.deviceCode)))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, data.categoryCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u64CD\u4F5C\u5EFA\u8BAE")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, deviceOperate)))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code2')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, data.subCategoryCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u63CF\u8FF0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.maintenanceRemarks);
				} }, data.maintenanceRemarks)))), this.props.showpartsnum == false ? '' : data.partsnum ? _react2.default.createElement('div', { className: 'eps-list-item-parts border-line-h before' }, _react2.default.createElement('i', { className: 'icon-parts' }), "\u8BE5\u8BBE\u5907\u5305\u542B", data.partsnum, "\u4E2A\u914D\u4EF6") : ''));
		}
	}]);

	return DeviceCardAssessToIT;
}(_react.Component);

;

/*
* 审批需要的卡片
* */

var DeviceCardMore = exports.DeviceCardMore = function (_Component7) {
	_inherits(DeviceCardMore, _Component7);

	function DeviceCardMore(props) {
		_classCallCheck(this, DeviceCardMore);

		var _this9 = _possibleConstructorReturn(this, (DeviceCardMore.__proto__ || Object.getPrototypeOf(DeviceCardMore)).call(this, props));

		_this9.state = {
			checked: false
		};
		_this9.clickHandler = _this9.clickHandler.bind(_this9);
		return _this9;
	}

	_createClass(DeviceCardMore, [{
		key: 'clickHandler',
		value: function clickHandler() {
			this.setState({ 'checked': !this.state.checked });
			typeof this.props.onClick == 'function' ? this.props.onClick(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var _this10 = this;

			var data = this.props.itemdata;
			var showAllData = this.props.showAllData;
			return _react2.default.createElement('div', { className: 'eps-device-card-select' }, _react2.default.createElement('div', { className: this.props.animated == false ? "eps-list-card" : "eps-list-card animated zoomIn" }, this.props.showCardIcon == false ? '' : _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), _react2.default.createElement('div', { className: 'eps-list-inline device-assess' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('font', null, data.name)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u8BBE\u5907\u5E8F\u5217\u53F7"), _react2.default.createElement('font', null, '96731'))), _react2.default.createElement('div', { className: 'eps-list-inline device-assess' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, 'FA Code'), _react2.default.createElement('font', null, data.facode)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('font', null, "\u4FDD\u5185\u7EF4\u4FEE"))), _react2.default.createElement('div', { className: 'eps-list-inline device-assess' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, 'FA Code2'), _react2.default.createElement('font', null, data.facode2)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u5546"), _react2.default.createElement('font', null, "\u7EF4\u4FEE\u5546A"))), showAllData ? _react2.default.createElement('div', { className: 'eps-list-item-parts border-line-h before specail-color', onClick: function onClick(e) {
					return _this10.props.openView(e);
				} }, "\u67E5\u770B\u66F4\u591A\u8BBE\u5907\u4FE1\u606F") : ''));
		}
	}]);

	return DeviceCardMore;
}(_react.Component);

;

/***/ }),

/***/ 1176:
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

var EmptyWithArrow = function (_Component) {
	_inherits(EmptyWithArrow, _Component);

	function EmptyWithArrow(props) {
		_classCallCheck(this, EmptyWithArrow);

		return _possibleConstructorReturn(this, (EmptyWithArrow.__proto__ || Object.getPrototypeOf(EmptyWithArrow)).call(this, props));
	}

	_createClass(EmptyWithArrow, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'eps-empty-tip-arrow animated zoomIn' }, _react2.default.createElement('i', { className: this.props.icon }));
		}
	}]);

	return EmptyWithArrow;
}(_react.Component);

;

exports.default = (0, _dva.connect)()(EmptyWithArrow);

/***/ }),

/***/ 1177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ProjectCardInfo = exports.ProjectCardMore = exports.ProjectCardListShow = exports.ProjectCardSelect = undefined;

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

var _hammerjs = __webpack_require__(1129);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

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
} /**
   * 工程卡片
   */

var ProjectOperate = (0, _constants.getDict)('equipmentOperation');
/*
 * 工程卡片的公共展示部分
 */

var ProjectCardCommon = function (_Component) {
	_inherits(ProjectCardCommon, _Component);

	function ProjectCardCommon(props) {
		_classCallCheck(this, ProjectCardCommon);

		var _this = _possibleConstructorReturn(this, (ProjectCardCommon.__proto__ || Object.getPrototypeOf(ProjectCardCommon)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(ProjectCardCommon, [{
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			return _react2.default.createElement('div', { className: 'eps-list-card' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u5DE5\u7A0B\u540D\u79F0"), _react2.default.createElement('font', null, data.projectName)), _react2.default.createElement('div', { className: 'eps-list-inline' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, 'FA Code'), _react2.default.createElement('font', null, data.categoryCode)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, 'FA Code2'), _react2.default.createElement('font', null, data.subCategoryCode))));
		}
	}]);

	return ProjectCardCommon;
}(_react.Component);

/**
 * 选择工程卡片
 */

var ProjectCardSelect = exports.ProjectCardSelect = function (_Component2) {
	_inherits(ProjectCardSelect, _Component2);

	function ProjectCardSelect(props) {
		_classCallCheck(this, ProjectCardSelect);

		var _this2 = _possibleConstructorReturn(this, (ProjectCardSelect.__proto__ || Object.getPrototypeOf(ProjectCardSelect)).call(this, props));

		_this2.selectHandler = _this2.selectHandler.bind(_this2);
		return _this2;
	}

	_createClass(ProjectCardSelect, [{
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'eps-device-card-select eps-project-card', onClick: this.selectHandler }, _react2.default.createElement(ProjectCardCommon, { itemdata: this.props.itemdata }), _react2.default.createElement('div', { className: 'checked-btn-wrap' }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" })));
		}
	}]);

	return ProjectCardSelect;
}(_react.Component);

;

/**
 * 已添加工程卡片 工程卡片展示
 */

var ProjectCardListShow = exports.ProjectCardListShow = function (_Component3) {
	_inherits(ProjectCardListShow, _Component3);

	function ProjectCardListShow(props) {
		_classCallCheck(this, ProjectCardListShow);

		var _this3 = _possibleConstructorReturn(this, (ProjectCardListShow.__proto__ || Object.getPrototypeOf(ProjectCardListShow)).call(this, props));

		_this3.state = {
			checked: false
		};
		return _this3;
	}

	_createClass(ProjectCardListShow, [{
		key: 'deleteItem',
		value: function deleteItem() {
			if (confirm("是否确认删除该条记录？")) {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				if (typeof this.props.removeItem == 'function') {
					this.props.removeItem(this.props.itemdata);
				}
				console.log("点击了确认按钮");
			} else {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				console.log("点击了取消按钮");
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var height = $(_reactDom2.default.findDOMNode(this.refs.cardwrap)).height();
			$(_reactDom2.default.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
				'margin-top': '0'
				// 'line-height':(height-20)+'px'
			});

			if (this.props.deleteBtnShow != true) return;
			// 显示删除按钮时才绑定hammer事件
			var hammertime = new _hammerjs2.default(_reactDom2.default.findDOMNode(this.refs.card));
			var card = $(_reactDom2.default.findDOMNode(this.refs.card));
			var delBtn = _reactDom2.default.findDOMNode(this.refs.delBtn);
			var btnWidth = $(delBtn).width();
			var cardLeft = void 0;
			var isMinus = void 0; // 是否负数  true 负数  false 正数
			var cardStartLeft = void 0;
			hammertime.on("panstart", function (e) {
				cardStartLeft = card.offset().left;
			});
			// hammertime.on( "pan", (e)=>{
			// 	isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
			// 	cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
			// 	cardLeft = cardLeft > 0 ? 0 : cardLeft;
			// 	card.css({left:cardLeft});
			// 	console.log(e.deltaX,btnWidth);
			// })
			hammertime.on('panleft', function (e) {
				card.stop().animate({ left: -btnWidth + 'px' }, 200);
			});
			hammertime.on('panright', function (e) {
				card.stop().animate({ left: '0px' }, 200);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var deleteBtn = '';
			if (this.props.deleteBtnShow == true) {
				deleteBtn = _react2.default.createElement('div', { className: 'eps-swipe-delete', ref: 'delBtn', onClick: function onClick(e) {
						return _this4.deleteItem(e);
					} }, _react2.default.createElement('div', { className: 'eps-swipe-wrap' }, _react2.default.createElement('font', null, "\u5220\u9664")));
			}
			return _react2.default.createElement('div', { className: 'eps-device-card-select eps-project-card', ref: 'cardwrap' }, deleteBtn, _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), _react2.default.createElement(ProjectCardCommon, { itemdata: this.props.itemdata, showCardIcon: true, ref: 'card' }));
		}
	}]);

	return ProjectCardListShow;
}(_react.Component);

;

/*
* 审批需要的卡片
* */

var ProjectCardMore = exports.ProjectCardMore = function (_Component4) {
	_inherits(ProjectCardMore, _Component4);

	function ProjectCardMore(props) {
		_classCallCheck(this, ProjectCardMore);

		var _this5 = _possibleConstructorReturn(this, (ProjectCardMore.__proto__ || Object.getPrototypeOf(ProjectCardMore)).call(this, props));

		_this5.state = {
			checked: false
			// console.log('ProjectCardAssess card====',this.props)
		};_this5.clickHandler = _this5.clickHandler.bind(_this5);
		return _this5;
	}

	_createClass(ProjectCardMore, [{
		key: 'clickHandler',
		value: function clickHandler() {
			this.setState({ 'checked': !this.state.checked });
			typeof this.props.onClick == 'function' ? this.props.onClick(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var data = this.props.itemdata;
			var showAllData = this.props.showAllData;
			console.log(data, 'Marlin 1 这个里面卡片的样式是什么呢', ProjectOperate);
			var str_operate = data['operate'] ? (0, _constants.getDictVal)('fittingOperation', data['operate']) : ' - ';
			console.log('Marlin 2');
			return _react2.default.createElement('div', { className: 'eps-device-card-select eps-device-card-select-specail' }, _react2.default.createElement('div', { className: this.props.animated == false ? "eps-list-card" : "eps-list-card animated zoomIn" }, this.props.showCardIcon == false ? '' : _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), this._init_name(), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.faCategory))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code2')), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.subCategory)))), data['operate'] != -1 ? _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5EFA\u8BAE\u64CD\u4F5C")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, str_operate))) : '', showAllData ? _react2.default.createElement('div', { className: 'eps-list-item-parts border-line-h before specail-color', onClick: function onClick(e) {
					return _this6.props.openView(e);
				} }, "\u67E5\u770B\u66F4\u591A\u5DE5\u7A0B\u4FE1\u606F") : ''));
		}
	}, {
		key: '_init_name',
		value: function _init_name() {
			var data = this.props.itemdata;
			if (data["totalMaintenanceCost"]) {
				return _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5DE5\u7A0B\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.name))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u603B\u4EF7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, Number(data["totalMaintenanceCost"]).formatMoney(2, '', '')))));
			} else {
				return _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5DE5\u7A0B\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.name)));
			}
		}
	}]);

	return ProjectCardMore;
}(_react.Component);

;

var ProjectCardInfo = exports.ProjectCardInfo = function (_Component5) {
	_inherits(ProjectCardInfo, _Component5);

	function ProjectCardInfo(props) {
		_classCallCheck(this, ProjectCardInfo);

		var _this7 = _possibleConstructorReturn(this, (ProjectCardInfo.__proto__ || Object.getPrototypeOf(ProjectCardInfo)).call(this, props));

		_this7.state = {
			checked: false
			// console.log('ProjectCardAssess card====',this.props)
		};_this7.clickHandler = _this7.clickHandler.bind(_this7);
		return _this7;
	}

	_createClass(ProjectCardInfo, [{
		key: 'NameInfo',
		value: function NameInfo(name) {
			var data = this.props.itemdata;
			var incidentalList = this.props.incidentalList;
			if (name == '1') {
				name = Number(incidentalList["materialCost"]).formatMoney(2, '', '') + '(' + (incidentalList["materialCostTax"] || '-') + ')';
			}
			if (name == '2') {
				name = Number(incidentalList["installationFee"]).formatMoney(2, '', '') + '(' + (incidentalList["installationFeeRate"] || '-') + ')';
			}
			if (name == '3') {
				name = Number(incidentalList["carCost"]).formatMoney(2, '', '') + '(' + (incidentalList["carCostTax"] || '-') + ')';
			}
			if (name == '4') {
				name = Number(incidentalList["hotelCost"]).formatMoney(2, '', '') + '(' + (incidentalList["hotelCostTax"] || '-') + ')';
			}
			if (name == '5') {
				name = Number(incidentalList["testCost"]).formatMoney(2, '', '') + '(' + (incidentalList["testCostTax"] || '-') + ')';
			}
			if (name == '6') {
				name = Number(incidentalList["distributionCost"]).formatMoney(2, '', '') + '(' + (incidentalList["distributionCostRate"] || '-') + ')';
			}
			if (name == '7') {
				name = Number(incidentalList["highCost"]).formatMoney(2, '', '') + '(' + (incidentalList["highCostTax"] || '-') + ')';
			}
			if (name == '8') {
				name = Number(incidentalList["otherCost"]).formatMoney(2, '', '') + '(' + (incidentalList["otherCostTax"] || '-') + ')';
			}
			if (name == '9') {
				name = incidentalList["otherCostRemark"];
			}

			// if(DataLength(name)>10){
			(0, _EpsModal.AlertInfoBase)({
				text: name
			});
			// }   
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler() {
			this.setState({ 'checked': !this.state.checked });
			typeof this.props.onClick == 'function' ? this.props.onClick(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this;
			var data = this.props.itemdata;
			var showAllData = this.props.showAllData;
			var incidentalList = this.props.incidentalList;
			console.log(data, incidentalList, '这个里面有什么呢');
			var label = ProjectOperate[parseInt(data['operate'])]['label'];
			var allMoney = 0;
			allMoney += Number(incidentalList['materialCost']) + Number(incidentalList['installationFee']) + Number(incidentalList['carCost']) + Number(incidentalList['hotelCost']) + Number(incidentalList['testCost']) + Number(incidentalList['distributionCost']) + Number(incidentalList['highCost']) + Number(incidentalList['otherCost']);

			// let Tax = '';
			// Tax = incidentalList["materialCostTax"];
			// Tax = (?'-')

			return _react2.default.createElement('div', { className: 'todo-card zoomIn specail-zhailei' }, _react2.default.createElement('div', { className: 'todo-card-index' }, this.props.index || 0, '/', this.props.allIndex || 0), _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info' }, _react2.default.createElement('div', { className: 'todo-info-i border-line-h after specail' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u5DE5\u7A0B\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["name"]))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data.faCategory)), _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code2'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data.subCategory))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, label))), _react2.default.createElement('div', { className: 'todo-info-i todo-info-money' }, _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u6750\u6599\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["materialCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["materialCostTax"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["materialCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u4EBA\u5DE5\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["installationFeeNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["installationFeeRate"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["installationFee"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u4EA4\u901A\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["carCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["carCostTax"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["carCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u4F4F\u5BBF\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["hotelCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["hotelCostTax"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["hotelCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u68C0\u6D4B\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["testCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["testCostTax"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["testCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u8FD0\u8F93\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["distributionCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["distributionCostRate"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["distributionCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u767B\u9AD8\u8D39"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["highCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["highCostTax"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["highCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u5176\u4ED6\u8D39\u7528"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, _react2.default.createElement('span', { 'class': 'ellipsis' }, ' ', Number(incidentalList["otherCostNotax"] || 0).formatMoney(2, '', ''), "(\u4E0D\u542B\u7A0E)"), _react2.default.createElement('span', { 'class': 'ellipsis' }, incidentalList["otherCostTax"] || '-'), _react2.default.createElement('span', { 'class': 'ellipsis' }, Number(incidentalList["otherCost"]).formatMoney(2, '', ''), "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'todo-info-money-i specail' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u5176\u4ED6\u8D39\u7528\u5907\u6CE8"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-value ellipsis', onClick: function onClick() {
					return self.NameInfo(9);
				} }, incidentalList["otherCostRemark"]))), _react2.default.createElement('div', { className: 'todo-info-money-i specail-item' }, _react2.default.createElement('div', { className: 'todo-info-money-i-l-label' }, "\u603B\u4EF7(\u542B\u7A0E)"), _react2.default.createElement('div', { className: 'todo-info-money-i-l-val' }, Number(allMoney).formatMoney(2, '', '')))))));
		}
	}, {
		key: '_init_name',
		value: function _init_name() {
			var data = this.props.itemdata;
			if (data["totalMaintenanceCost"]) {
				return _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5DE5\u7A0B\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.name))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u603B\u4EF7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, Number(data["totalMaintenanceCost"]).formatMoney(2, '', '')))));
			} else {
				return _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u5DE5\u7A0B\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { className: 'ellipsis' }, data.name)));
			}
		}
	}]);

	return ProjectCardInfo;
}(_react.Component);

/***/ }),

/***/ 1203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ItCardListShow = exports.ItDeviceCard = exports.ItCardSelect = undefined;

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

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _hammerjs = __webpack_require__(1129);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

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
} /**
   * It卡片
   */

// 配件操作建议
var fittingOperation = (0, _constants.getDict)('fittingOperation');
// 设备操作建议
var equipmentOperation = (0, _constants.getDict)('equipmentOperation');

/*
 * It设备卡片的公共展示部分
 */

var ItCardCommon = function (_Component) {
	_inherits(ItCardCommon, _Component);

	function ItCardCommon(props) {
		_classCallCheck(this, ItCardCommon);

		var _this = _possibleConstructorReturn(this, (ItCardCommon.__proto__ || Object.getPrototypeOf(ItCardCommon)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(ItCardCommon, [{
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
		key: 'render',
		value: function render() {
			var self = this;
			var data = this.props.itemdata;
			var typeDescription = data.typeDescription ? _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u578B\u53F7\u63CF\u8FF0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.typeDescription);
				}, className: 'eps-name-special ellipsis' }, data.typeDescription))) : '';
			// console.log(getDict('equipmentOperation'),"equipmentOperation")
			return _react2.default.createElement('div', { className: 'eps-list-card eps-list-itdevice-card' }, _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "IT\u8BBE\u5907\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', { onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.deviceName);
				}, className: 'ellipsis' }, data.deviceName))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, 'FA Code')), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, data.categoryCode)))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u578B\u53F7\u4EE3\u7801")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, data.typeCode))), typeDescription);
		}
	}]);

	return ItCardCommon;
}(_react.Component);

/*
 * 带配件数量的It设备卡片
 */

var ItCardWithParts = function (_Component2) {
	_inherits(ItCardWithParts, _Component2);

	function ItCardWithParts(props) {
		_classCallCheck(this, ItCardWithParts);

		var _this2 = _possibleConstructorReturn(this, (ItCardWithParts.__proto__ || Object.getPrototypeOf(ItCardWithParts)).call(this, props));

		_this2.state = {};
		return _this2;
	}

	_createClass(ItCardWithParts, [{
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
		key: 'render',
		value: function render() {
			var self = this;
			var data = this.props.itemdata;
			// console.log('ItCardWithParts:',data,data.deviceOperate)
			var operateValue = _.findWhere(equipmentOperation, { value: data.deviceOperate })["label"];
			return _react2.default.createElement('div', { className: 'eps-list-card' }, _react2.default.createElement('div', { className: 'eps-list-inline' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "IT\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.name || data.deviceName);
				} }, data.name || data.deviceName)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.maintenanceRemarks || '无');
				} }, data.maintenanceRemarks || '无'))), _react2.default.createElement('div', { className: 'eps-list-inline' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, 'FA Code'), _react2.default.createElement('font', null, data.categoryCode)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('font', null, operateValue ? operateValue : '无'))), _react2.default.createElement('div', { className: 'eps-list-inline' }, _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u578B\u53F7\u4EE3\u7801"), _react2.default.createElement('font', null, data.typeCode)), _react2.default.createElement('div', { className: 'eps-list-item' }, _react2.default.createElement('label', null, "\u578B\u53F7\u63CF\u8FF0"), _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data.typeDescription);
				} }, data.typeDescription))), data.partsnum ? _react2.default.createElement('div', { className: 'eps-list-item-parts border-line-h before' }, _react2.default.createElement('i', { className: 'icon-parts' }), "\u8BE5\u8BBE\u5907\u5305\u542B", data.partsnum, "\u4E2A\u914D\u4EF6") : '');
		}
	}]);

	return ItCardWithParts;
}(_react.Component);

/**
 * 选择IT设备卡片
 */

var ItCardSelect = exports.ItCardSelect = function (_Component3) {
	_inherits(ItCardSelect, _Component3);

	function ItCardSelect(props) {
		_classCallCheck(this, ItCardSelect);

		var _this3 = _possibleConstructorReturn(this, (ItCardSelect.__proto__ || Object.getPrototypeOf(ItCardSelect)).call(this, props));

		_this3.selectHandler = _this3.selectHandler.bind(_this3);
		return _this3;
	}

	_createClass(ItCardSelect, [{
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'eps-device-card-select eps-list-itdevice-card-wrap animated zoomIn', onClick: this.selectHandler }, _react2.default.createElement(ItCardCommon, { itemdata: this.props.itemdata }), _react2.default.createElement('div', { className: 'checked-btn-wrap' }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" })));
		}
	}]);

	return ItCardSelect;
}(_react.Component);

;

/**
 * 选择IT设备卡片
 */

var ItDeviceCard = exports.ItDeviceCard = function (_Component4) {
	_inherits(ItDeviceCard, _Component4);

	function ItDeviceCard() {
		_classCallCheck(this, ItDeviceCard);

		return _possibleConstructorReturn(this, (ItDeviceCard.__proto__ || Object.getPrototypeOf(ItDeviceCard)).apply(this, arguments));
	}

	_createClass(ItDeviceCard, [{
		key: 'NameInfo',
		value: function NameInfo(name, length) {
			var len = length ? length : 3;
			if ((0, _constants.DataLength)(name) > len) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			/*let orderdata = this.props.data && this.props.data.process ? this.props.data && this.props.data.process:{},
   		devices = orderdata.pageInfo && orderdata.pageInfo.list ? orderdata.pageInfo.list:[],
   		fittings = orderdata.costList?orderdata.costList:[],
   		device = devices[0]||{itDeviceName:'',mark:'',faCategory:'',operate:'',mark:'',typeCode:''};
   */
			// return (<h1>XXX</h1>)
			var self = this;
			var device = this.props.device,
			    fittings = this.props.fittings;
			var equipmentOperation = (0, _constants.getDict)('equipmentOperation');

			return _react2.default.createElement('div', { className: 'todo-card animated zoomIn' }, _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info todo-info-l-xpadding todo-info-it' }, _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('i', null), _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "IT\u8BBE\u5907\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(device.itDeviceName);
				} }, device.itDeviceName)), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label todo-info-label-r' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, device.mark || '无'))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label' }, 'FA Code'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, device.faCategory)), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label todo-info-label-r ellipsis' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, device.operate ? (0, _constants.getDictVal)('equipmentOperation', device.operate) : ''))), _react2.default.createElement('div', { className: 'todo-info-i border-line-h after' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u578B\u53F7\u4EE3\u7801"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(device.typeNumber);
				} }, device.typeNumber)), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label todo-info-label-r' }, "\u578B\u53F7\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(device.typeCode);
				} }, device.typeCode)))), _react2.default.createElement('div', { className: 'todo-fitting' }, _.map(fittings, function (cost, key) {
				return _react2.default.createElement('div', { className: 'todo-fitting-i' }, _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-title' }, _react2.default.createElement('i', null), _react2.default.createElement('span', { className: 'todo-info-label' }, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis', onClick: function onClick(e) {
						e.stopPropagation();self.NameInfo(cost.partsName);
					} }, cost.partsName)), _react2.default.createElement('div', { className: 'todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, cost.maintenanceNum))), _react2.default.createElement('div', { className: 'todo-fitting-info' }, _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis', onClick: function onClick(e) {
						e.stopPropagation();self.NameInfo(cost.maintenanceRemarks);
					} }, cost.maintenanceRemarks || '无')), _react2.default.createElement('div', { className: 'todo-fitting-msg' }, _react2.default.createElement('span', { className: 'todo-info-label' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, cost.operate ? (0, _constants.getDictVal)('fittingOperation', cost.operate) : '无'))));
			}))));
		}
	}]);

	return ItDeviceCard;
}(_react.Component);

;

/**
 * 已添加IT设备卡片 IT设备卡片显示
 */

var ItCardListShow = exports.ItCardListShow = function (_Component5) {
	_inherits(ItCardListShow, _Component5);

	function ItCardListShow(props) {
		_classCallCheck(this, ItCardListShow);

		var _this5 = _possibleConstructorReturn(this, (ItCardListShow.__proto__ || Object.getPrototypeOf(ItCardListShow)).call(this, props));

		_this5.state = {
			checked: false
		};
		console.log('ItCardSelect card====', _this5.props);
		_this5.selectHandler = _this5.selectHandler.bind(_this5);
		return _this5;
	}

	_createClass(ItCardListShow, [{
		key: 'selectHandler',
		value: function selectHandler() {
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id']) : '';
		}
	}, {
		key: 'deleteItem',
		value: function deleteItem(e) {
			e.stopPropagation();
			if (confirm("是否确认删除该条记录？")) {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				console.log("点击了确认按钮");
				typeof this.props.onDelete == 'function' ? this.props.onDelete(this.props.itemdata) : '';
			} else {
				$(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
				console.log("点击了取消按钮");
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			// console.log('ItCardListShow=====componentDidMount============')
			// let height = $(ReactDOM.findDOMNode(this.refs.cardwrap)).height();
			// $(ReactDOM.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
			// 	'margin-top':'0',
			// 	'line-height':(height-20)+'px'
			// })
		}
	}, {
		key: 'openDetail',
		value: function openDetail() {
			console.log('odsfposdpfs:====');
			if (this.props.editable == true) {
				// 保存即将编辑的IT设备信息
				window.upTabsData('willEditITEquipment', 'cache', this.props.itemdata);
				// 保存该IT设备下的配件list
				window.upTabsData('willEditITParts', 'cache', this.props.partslist);
				(0, _constants.openWebView)('/repairing/maintenance-details/it');
			}
		}
	}, {
		key: 'bindHammer',
		value: function bindHammer() {
			var self = this;
			setTimeout(function () {
				var hammertime = new _hammerjs2.default(_reactDom2.default.findDOMNode(self.refs.card));
				var card = $(_reactDom2.default.findDOMNode(self.refs.card));
				var delBtn = _reactDom2.default.findDOMNode(self.refs.delBtn);
				var btnWidth = $(delBtn).width();
				var cardLeft = void 0;
				var isMinus = void 0; // 是否负数  true 负数  false 正数
				var cardStartLeft = void 0;
				hammertime.on("panstart", function (e) {
					console.log('hammertime.on panstart=====');
					cardStartLeft = card.offset().left;
				});
				// hammertime.on( "pan", (e)=>{
				// 	isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
				// 	cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
				// 	cardLeft = cardLeft > 0 ? 0 : cardLeft;
				// 	card.css({left:cardLeft});
				// 	console.log(e.deltaX,btnWidth);
				// })
				hammertime.on('panleft', function (e) {
					card.stop().animate({ left: -btnWidth + 'px' }, 200);
				});
				hammertime.on('panright', function (e) {
					card.stop().animate({ left: '0px' }, 200);
				});
			}, 200);
		}
	}, {
		key: 'setDelBtnHeight',
		value: function setDelBtnHeight() {
			return;
			// let self = this;
			// setTimeout(()=>{
			// 	let height = $(ReactDOM.findDOMNode(self.refs.cardwrap)).height();
			// 	$(ReactDOM.findDOMNode(self.refs.cardwrap)).find('.eps-swipe-wrap').css({
			// 		'margin-top':'0',
			// 		'line-height':(height-20)+'px'
			// 	})
			// });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			this.setDelBtnHeight();
			this.bindHammer();
			// 创建和评估时，IT设备卡片采用展示内容多的这种  2017/10/10日
			// 含配件的卡片
			// if(this.props.itemdata['partsnum']){
			return _react2.default.createElement('div', { className: 'eps-device-card-select animated zoomIn', ref: 'cardwrap', onClick: function onClick(e) {
					_this6.openDetail();
				} }, _react2.default.createElement('div', { className: 'eps-swipe-delete', ref: 'delBtn', onClick: function onClick(e) {
					return _this6.deleteItem(e);
				} }, _react2.default.createElement('div', { className: 'eps-swipe-wrap' }, _react2.default.createElement('font', null, "\u5220\u9664"))), _react2.default.createElement(ItCardWithParts, { itemdata: this.props.itemdata, ref: 'card' }));
			// }else{
			// 	return (
			// 		<div className="eps-device-card-select animated zoomIn" ref="cardwrap" onClick={(e)=>{this.openDetail()}}>
			// 			<div className="eps-swipe-delete" ref="delBtn" onClick={ (e)=>this.deleteItem(e) }><div className="eps-swipe-wrap"><font>删除</font></div></div>
			// 			<ItCardCommon itemdata={ this.props.itemdata } ref="card"/>
			// 		</div>
			// 	)	
			// }
		}
	}]);

	return ItCardListShow;
}(_react.Component);

;

/***/ }),

/***/ 1204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrappedCardSearchCheck = exports.ScrappedCardSelect = exports.ScrappedCardNormal = undefined;

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

var _hammerjs = __webpack_require__(1129);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _dva = __webpack_require__(196);

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

var ScrappedCardNormal = exports.ScrappedCardNormal = function (_Component) {
  _inherits(ScrappedCardNormal, _Component);

  function ScrappedCardNormal(props) {
    _classCallCheck(this, ScrappedCardNormal);

    var _this = _possibleConstructorReturn(this, (ScrappedCardNormal.__proto__ || Object.getPrototypeOf(ScrappedCardNormal)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(ScrappedCardNormal, [{
    key: 'NameInfo',
    value: function NameInfo(name) {
      if (DataLength(name) > 10) {
        AlertInfoBase({
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = this.props.itemdata;
      var deleteBtn = '';
      if (this.props.deleteBtnShow == true) {
        deleteBtn = _react2.default.createElement('div', { className: 'eps-swipe-delete', ref: 'delBtn', onClick: function onClick(e) {
            return _this2.deleteItem(e);
          } }, _react2.default.createElement('div', { className: 'eps-swipe-wrap' }, _react2.default.createElement('font', null, "\u5220\u9664")));
      }
      console.log(this.props, '这个里面的数据是什么呢');
      return _react2.default.createElement('div', { className: 'eps-device-card-select eps-project-card', ref: 'cardwrap' }, deleteBtn, _react2.default.createElement('div', { className: 'todo-card zoomIn specail-zhailei line-height-mini index-right clear-margin clear-padding', ref: 'card' }, _react2.default.createElement('div', { className: '' }, _react2.default.createElement('div', { className: 'todo-card-index' }, this.props.index), _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info' }, _react2.default.createElement('div', { className: 'todo-info-i specail' }, _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this2.NameInfo(data["deviceName"]);
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, this.props.scrappOrderType == 'project' ? '工程名称' : '设备名称'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["deviceName"]))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this2.NameInfo(data["deviceNumber"] || '-');
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, this.props.scrappOrderType == 'project' ? '工程序列号' : '设备序列号'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["deviceNumber"] || '-')), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u9910\u5385/\u4ED3\u5E93\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["usCode"] || '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7Category"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetCategory"] || '-')), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, _react2.default.createElement('font', { className: 'eps-badge' }, data["assetQty"] || '-')))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetNumber"] || '-')), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u6458\u8981"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetDesc"] || '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u539F\u503C(\xA5)"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetOriginal"] ? this.turnMoney(data["assetOriginal"]) : '-')), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7D2F\u8BA1\u6298\u65E7(\xA5)"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetDep"] ? this.turnMoney(data["assetDep"]) : '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u6298\u65E7\u7387"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["depRate"] ? parseInt(data["depRate"] * 100) + '%' : '-')), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u6298\u65E7\u65F6\u95F4"), _react2.default.createElement('span', { className: 'todo-info-val' }, data['depStartDay'] != '0' ? data['depStartDay'] : '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u62A5\u5E9F\u539F\u503C(\xA5) "), _react2.default.createElement('span', { className: 'todo-info-val' }, this.turnMoney(data.scrapOriginal))), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u62A5\u5E9F\u51C0\u503C(\xA5)"), _react2.default.createElement('span', { className: 'todo-info-val' }, this.turnMoney(data.scrapNbv)))), _react2.default.createElement('div', { className: 'todo-info-i custom-item' }, _react2.default.createElement('div', { className: 'todo-info-l clear-height', style: {
          width: "55%"
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis', style: {
          width: '55%'
        } }, "\u8D44\u4EA7\u62A5\u5E9F\u767E\u5206\u6BD4"), this.props.edit ? _react2.default.createElement('span', { className: 'todo-info-val has-border', style: {
          width: '35%'
        } }, _react2.default.createElement('div', { className: 'todo-info-has-after' }, _react2.default.createElement('input', { type: 'text', className: 'todo-info-input', value: data.scrapProportion, onChange: function onChange(e) {
          return _this2.changeItem(e, 'scrapProportion');
        } }))) : _react2.default.createElement('span', { className: 'todo-info-val', style: {
          width: '35%'
        } }, data.scrapProportion || '-', '%')), _react2.default.createElement('div', { className: 'todo-info-r clear-height' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u62A5\u5E9F\u6570\u91CF"), this.props.edit ? _react2.default.createElement('span', { className: 'todo-info-val has-border' }, _react2.default.createElement('input', { type: 'text', className: 'todo-info-input', value: data.scrapQty, onChange: function onChange(e) {
          return _this2.changeItem(e, 'scrapQty');
        } })) : _react2.default.createElement('span', { className: 'todo-info-val' }, data.scrapQty || '-'))))))));
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem() {
      if (confirm("是否确认删除该条记录？")) {
        $(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
        if (typeof this.props.removeItem == 'function') {
          this.props.removeItem(this.props.itemdata);
        }
        console.log("点击了确认按钮");
      } else {
        $(_reactDom2.default.findDOMNode(this.refs.card)).animate({ left: 0 }, '100');
        console.log("点击了取消按钮");
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var height = $(_reactDom2.default.findDOMNode(this.refs.cardwrap)).height();
      $(_reactDom2.default.findDOMNode(this.refs.cardwrap)).find('.eps-swipe-wrap').css({
        'margin-top': '0'
        // 'line-height':(height-20)+'px'
      });

      if (this.props.deleteBtnShow != true) return;
      // 显示删除按钮时才绑定hammer事件
      var hammertime = new _hammerjs2.default(_reactDom2.default.findDOMNode(this.refs.card));
      var card = $(_reactDom2.default.findDOMNode(this.refs.card));
      var delBtn = _reactDom2.default.findDOMNode(this.refs.delBtn);
      var btnWidth = $(delBtn).width();
      var cardLeft = void 0;
      var isMinus = void 0; // 是否负数  true 负数  false 正数
      var cardStartLeft = void 0;
      hammertime.on("panstart", function (e) {
        cardStartLeft = card.offset().left;
      });
      // hammertime.on( "pan", (e)=>{
      //  isMinus = Math.abs(e.deltaX)==e.deltaX ? false : true;
      //  cardLeft = (cardStartLeft+e.deltaX) < (-btnWidth) ? (-btnWidth) :  (cardStartLeft+e.deltaX);
      //  cardLeft = cardLeft > 0 ? 0 : cardLeft;
      //  card.css({left:cardLeft});
      //  console.log(e.deltaX,btnWidth);
      // })
      hammertime.on('panleft', function (e) {
        card.stop().animate({ left: -btnWidth + 'px' }, 200);
      });
      hammertime.on('panright', function (e) {
        card.stop().animate({ left: '0px' }, 200);
      });
    }
  }, {
    key: 'changeItem',
    value: function changeItem(e, type) {
      // console.log(e.target.value,type,'哈哈哈是的哈稍等哈师大还是');
      this.props.changeItem(e, type);
    }
  }]);

  return ScrappedCardNormal;
}(_react.Component);

;

var ScrappedCardSelect = exports.ScrappedCardSelect = function (_Component2) {
  _inherits(ScrappedCardSelect, _Component2);

  function ScrappedCardSelect(props) {
    _classCallCheck(this, ScrappedCardSelect);

    var _this3 = _possibleConstructorReturn(this, (ScrappedCardSelect.__proto__ || Object.getPrototypeOf(ScrappedCardSelect)).call(this, props));

    _this3.state = {
      visible: false
    };
    return _this3;
  }

  _createClass(ScrappedCardSelect, [{
    key: 'NameInfo',
    value: function NameInfo(name) {
      if (DataLength(name) > 10) {
        AlertInfoBase({
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
    key: 'selectHandler',
    value: function selectHandler() {
      var willbe = !this.props.itemdata.checked;
      typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var data = this.props.itemdata;
      console.log('这个里面有啥', this.props, 'bbbbbbbbbbbb');
      return _react2.default.createElement('div', { className: 'eps-device-card-select eps-project-card', ref: 'cardwrap', onClick: function onClick(e) {
          return _this4.selectHandler(e);
        } }, _react2.default.createElement('div', { className: 'todo-card zoomIn specail-zhailei line-height-mini index-right mini-bottom-padding mini-top-padding clear-margin clear-padding', ref: 'card' }, _react2.default.createElement('div', { className: '' }, _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info' }, _react2.default.createElement('div', { className: 'todo-info-i specail' }, _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this4.NameInfo(data["usCode"]);
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u9910\u5385/\u4ED3\u5E93\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["usCode"]))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l', onClick: function onClick() {
          return _this4.NameInfo(data["assetNumber"]);
        } }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, this.props.scrappOrderType == 'project' ? '工程序列号' : '设备序列号'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["assetNumber"])), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7Category"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, data["assetCategory"]))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u7F16\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetNumber"])), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u6458\u8981"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetDesc"]))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u539F\u503C(\xA5)"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetOriginal"])), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u51C0\u503C(\xA5)"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetNbv"]))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7D2F\u8BA1\u6298\u65E7(\xA5)"), _react2.default.createElement('span', { className: 'todo-info-val' }, data["assetDep"])), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num ' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u6298\u65E7\u65F6\u95F4"), _react2.default.createElement('span', { className: 'todo-info-val' }, data['depStartDay'] != '0' ? data['depStartDay'] : '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u8D44\u4EA7\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, _react2.default.createElement('font', { className: 'eps-badge' }, data["assetQty"])))))))), _react2.default.createElement('div', { className: 'checked-btn-wrap' }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" })));
    }
  }]);

  return ScrappedCardSelect;
}(_react.Component);

;

var ScrappedCardSearchCheck = exports.ScrappedCardSearchCheck = function (_Component3) {
  _inherits(ScrappedCardSearchCheck, _Component3);

  function ScrappedCardSearchCheck(props) {
    _classCallCheck(this, ScrappedCardSearchCheck);

    var _this5 = _possibleConstructorReturn(this, (ScrappedCardSearchCheck.__proto__ || Object.getPrototypeOf(ScrappedCardSearchCheck)).call(this, props));

    _this5.state = {
      visible: false
    };
    return _this5;
  }

  _createClass(ScrappedCardSearchCheck, [{
    key: 'NameInfo',
    value: function NameInfo(name) {
      if (DataLength(name) > 10) {
        AlertInfoBase({
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
    key: 'render',
    value: function render() {
      var _this6 = this;

      var data = this.props.itemdata;
      var str_operate = data['operate'] ? (0, _constants.getDictVal)('fittingOperation', data['operate']) : ' - ';
      var name = '',
          number = '',
          facode = '',
          subcategory = '',
          num = '',
          mark = '';
      console.log(this.props, '这个数据有什么呢');
      if (this.props.scrappType == 'repair') {
        if (this.props.scrappOrderType == 'device') {
          name = data['deviceName'];
          number = data['deviceNumber'];
          facode = data['faCategory'];
          subcategory = data['subCategory'];
          num = '';
          mark = data['mark'];
        } else if (this.props.scrappOrderType == 'it') {
          name = data['itDeviceName'];
          number = data['itDeviceNumber'];
          facode = data['faCategory'];
          subcategory = data['subCategory'];
          num = data['maintenanceNum'];
          mark = data['maintenanceRemarks'];
        } else {
          name = data['deviceName'];
          number = data['deviceNumber'];
          facode = data['faCategory'];
          subcategory = data['subCategory'];
          num = '';
          mark = data['mark'];
        }
      } else {
        name = data['deviceName'];
        number = data['deviceNumber'];
        facode = data['faCode'];
        subcategory = data['faCode2'];
        num = data['buySum'];
        mark = data['mark'];
      }
      return _react2.default.createElement('div', { className: 'todo-card zoomIn specail-zhailei line-height-mini index-right mini-bottom-padding', onClick: function onClick(e) {
          return _this6.props.choseScrappedDevice(e);
        } }, _react2.default.createElement('div', { className: 'todo-card-index' }, this.props.index), _react2.default.createElement('div', { className: 'todo-card-c' }, _react2.default.createElement('div', { className: 'todo-info' }, _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, this.props.scrappOrderType == 'project' ? '工程名称' : '设备名称'), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, name || '-')), _react2.default.createElement('div', { className:  true ? 'hide' : '' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u5E8F\u5217\u53F7"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, number || '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code'), _react2.default.createElement('span', { className: 'todo-info-val' }, facode || '-')), _react2.default.createElement('div', { className: 'todo-info-r' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, 'FA Code2'), _react2.default.createElement('span', { className: 'todo-info-val' }, subcategory || '-'))), _react2.default.createElement('div', { className: 'todo-info-i' }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u64CD\u4F5C\u5EFA\u8BAE"), _react2.default.createElement('span', { className: 'todo-info-val' }, str_operate)), _react2.default.createElement('div', { className: 'todo-info-r todo-fitting-num hide' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u6570\u91CF"), _react2.default.createElement('span', { className: 'todo-info-val' }, _react2.default.createElement('font', { className: 'eps-badge' }, num)))), _react2.default.createElement('div', { className: "todo-info-i " + (mark ? '' : 'hide') }, _react2.default.createElement('div', { className: 'todo-info-l' }, _react2.default.createElement('span', { className: 'todo-info-label ellipsis' }, "\u7EF4\u4FEE\u63CF\u8FF0"), _react2.default.createElement('span', { className: 'todo-info-val ellipsis' }, mark || '-')))), _react2.default.createElement('div', { className: 'todo-info-btn border-line-h before' }, _react2.default.createElement('i', { className: 'icon-add-device-small-ds' }), _react2.default.createElement('span', null, "\u6311\u9009\u8D44\u4EA7"))));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var dispatch = this.props.dispatch;
      NProgress.done();
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
        var footer = $(".footer").height() || 0;
        $('.main-c').css({ height: clientHeight - header - footer + 'px' });
      }, 0);
    }
  }]);

  return ScrappedCardSearchCheck;
}(_react.Component);

;

/***/ }),

/***/ 1428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DevicepartsCardSelect = undefined;

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
} /**
   * 设备配件卡片
   */

/*
 * 设备配件卡片的公共展示部分
 */
var DevicepartsCardCommon = function (_Component) {
	_inherits(DevicepartsCardCommon, _Component);

	function DevicepartsCardCommon(props) {
		_classCallCheck(this, DevicepartsCardCommon);

		var _this = _possibleConstructorReturn(this, (DevicepartsCardCommon.__proto__ || Object.getPrototypeOf(DevicepartsCardCommon)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(DevicepartsCardCommon, [{
		key: 'NameInfo',
		value: function NameInfo(name) {
			if ((0, _constants.DataLength)(name) > 10) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			var self = this;
			console.log('data.showCardIcon:', this.props.showCardIcon);
			return _react2.default.createElement('div', { className: 'eps-list-card' }, this.props.showCardIcon == true ? _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }) : '', _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('font', { className: 'ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.NameInfo(data["partNameCn"]);
				} }, data.partNameCn)), _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u914D\u4EF6\u7F16\u53F7"), _react2.default.createElement('font', null, data.partNumber)), _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u914D\u4EF6\u56FA\u4FDD\u671F"), _react2.default.createElement('font', null, data.warrantyPeriod, ' ', data.warrantyPeriodNuit)), _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u662F\u5426\u56FA\u5B9A\u8D44\u4EA7"), _react2.default.createElement('font', null, data.accessoriesIntoFixedAssets)), _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u4EF7\u683C"), _react2.default.createElement('font', null, data.maintenancePriceNotax)));
		}
	}]);

	return DevicepartsCardCommon;
}(_react.Component);

/**
 * 选择设备配件卡片
 */

var DevicepartsCardSelect = exports.DevicepartsCardSelect = function (_Component2) {
	_inherits(DevicepartsCardSelect, _Component2);

	function DevicepartsCardSelect(props) {
		_classCallCheck(this, DevicepartsCardSelect);

		var _this2 = _possibleConstructorReturn(this, (DevicepartsCardSelect.__proto__ || Object.getPrototypeOf(DevicepartsCardSelect)).call(this, props));

		_this2.selectHandler = _this2.selectHandler.bind(_this2);
		return _this2;
	}

	_createClass(DevicepartsCardSelect, [{
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'eps-device-card-select', onClick: this.selectHandler }, _react2.default.createElement(DevicepartsCardCommon, { itemdata: this.props.itemdata }), _react2.default.createElement('div', { className: 'checked-btn-wrap' }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" })));
		}
	}]);

	return DevicepartsCardSelect;
}(_react.Component);

;

/***/ }),

/***/ 1429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ItpartsCardSelect = undefined;

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
   * IT设备配件卡片
   */

/*
 * IT设备配件卡片的公共展示部分
 */
var ItpartsCardCommon = function (_Component) {
	_inherits(ItpartsCardCommon, _Component);

	function ItpartsCardCommon(props) {
		_classCallCheck(this, ItpartsCardCommon);

		var _this = _possibleConstructorReturn(this, (ItpartsCardCommon.__proto__ || Object.getPrototypeOf(ItpartsCardCommon)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(ItpartsCardCommon, [{
		key: 'render',
		value: function render() {
			var data = this.props.itemdata;
			console.log('data:========', data);
			console.log('data.showCardIcon:', this.props.showCardIcon);
			return _react2.default.createElement('div', { className: 'eps-list-card' }, this.props.showCardIcon == true ? _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }) : '', _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u914D\u4EF6\u540D\u79F0"), _react2.default.createElement('font', { className: 'ellipsis' }, data.name)), _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u662F\u5426\u56FA\u5B9A\u8D44\u4EA7"), _react2.default.createElement('font', null, data.isFa)), _react2.default.createElement('div', { className: 'eps-list-item eps-lsparts-item' }, _react2.default.createElement('label', null, "\u7EF4\u4FEE\u4EF7\u683C"), _react2.default.createElement('font', null, data.referencePrice)));
		}
	}]);

	return ItpartsCardCommon;
}(_react.Component);

/**
 * 选择IT设备配件卡片
 */

var ItpartsCardSelect = exports.ItpartsCardSelect = function (_Component2) {
	_inherits(ItpartsCardSelect, _Component2);

	function ItpartsCardSelect(props) {
		_classCallCheck(this, ItpartsCardSelect);

		var _this2 = _possibleConstructorReturn(this, (ItpartsCardSelect.__proto__ || Object.getPrototypeOf(ItpartsCardSelect)).call(this, props));

		_this2.selectHandler = _this2.selectHandler.bind(_this2);
		return _this2;
	}

	_createClass(ItpartsCardSelect, [{
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: 'eps-device-card-select itparts-card', onClick: this.selectHandler }, _react2.default.createElement(ItpartsCardCommon, { itemdata: this.props.itemdata }), _react2.default.createElement('div', { className: 'checked-btn-wrap' }, _react2.default.createElement('i', { className: this.props.itemdata.checked == true ? "icon-check-active" : "icon-check-normal" })));
		}
	}]);

	return ItpartsCardSelect;
}(_react.Component);

;

/***/ }),

/***/ 1430:
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

var _constants = __webpack_require__(197);

var _DeviceCard = __webpack_require__(1171);

var _DevicepartsCard = __webpack_require__(1428);

var _ProjectCard = __webpack_require__(1177);

var _ItCard = __webpack_require__(1203);

var _ItpartsCard = __webpack_require__(1429);

var _StoreCard = __webpack_require__(1432);

var _RepairStoreCard = __webpack_require__(1431);

var _ScrappedCard = __webpack_require__(1204);

var _EmptyWithArrow = __webpack_require__(1176);

var _EmptyWithArrow2 = _interopRequireDefault(_EmptyWithArrow);

var _EmptyView = __webpack_require__(1141);

var _EmptyView2 = _interopRequireDefault(_EmptyView);

var _LoadMore = __webpack_require__(1132);

var _LoadMore2 = _interopRequireDefault(_LoadMore);

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
} /**
   * 对象搜索列表
   *
   * 使用场景： 
   * 	1. 搜索设备	（多选）
   * 	2. 搜索配件 （多选）
   * 	3. 搜索餐厅/搜索供应商 （单选）
   * 	
   * 可设置参数:
   * 	searchType: 'device', //搜索类别 值可为 device(设备) parts(配件) project(工程) it(IT) itparts(IT设备配件) store(餐厅 门店),不同的类型对应不同的卡片
   *  ownerInfo: { id: '设备id', name: '新地机', label: '设备名称' } // 添加配件时，上方会显示设备名称的 
   *  onAdd: (objects)=>{ // 添加按钮的回调事件,回调的同时将所选对象集传递出去 这个废弃了 选下面的方式
   *  	
   *  }
   *
    搜索组件中已经保存了选择信息： 
    window.upTabsData('get:child:select:'+this.props.searchType,'publish',{
          data:data
        })
    使用时，在需要的页面这样获取：get:child:select:TYPE  
    TYPE可以为餐厅（store）,工程（project）,设备（device）,设备配件（parts）,IT设备（it），IT设备配件（itparts）
    PubSub.subscribe('get:child:select:it',function(evt,data){
          console.log("subscribe('get:child:select:it':",data['data'])
    });
   */

var ObjectSelectList = function (_Component) {
  _inherits(ObjectSelectList, _Component);

  function ObjectSelectList(props) {
    _classCallCheck(this, ObjectSelectList);

    var _this = _possibleConstructorReturn(this, (ObjectSelectList.__proto__ || Object.getPrototypeOf(ObjectSelectList)).call(this, props));

    _this.searchTime = null;
    _this.state = {
      selectedWrapWidth: '2000px',
      seletedListHeight: '400px'
    };
    _this.goSearch = _this.goSearch.bind(_this);
    _this.combineSearchBox = _this.combineSearchBox.bind(_this);
    _this.combineSearchList = _this.combineSearchList.bind(_this);
    _this.selectHandler = _this.selectHandler.bind(_this);
    _this.headerFixedHandle = _this.headerFixedHandle.bind(_this);
    _this.cancelSelCurObject = _this.cancelSelCurObject.bind(_this);
    _this.addHandler = _this.addHandler.bind(_this);
    _this.onEndReached = _this.onEndReached.bind(_this);
    // 如果是搜索设备配件或搜索IT设备配件，进入页面后可把数据给带上
    // if(this.props.searchType == 'parts' || this.props.searchType == 'itparts'){
    //   this.searchKey = '';
    //   this.goSearch('');
    // }  
    // 改为所有的进来都默认加载数据
    var self = _this;
    _this.searchKey = '';
    console.log(props, '这个里面有啥呢');
    if (typeof props['noFirstFetch'] != 'undefined') {} else {
      self.goSearch('');
    }

    // setTimeout(function(){

    // },500)/
    return _this;
  }

  _createClass(ObjectSelectList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.configData = _constants.SEARCH_CONFIG[this.props.searchType];
      var data = this.props.data;
      var searchBox = void 0,
          searchList = void 0,
          seletedList = void 0;
      // 搜索框
      searchBox = this.combineSearchBox();
      // 搜索list
      searchList = this.combineSearchList();
      // 已选list展示
      seletedList = this.configData.checkMode == 'multiple' && this.props.list.length > 0 ? this.combineSelectedList() : '';
      this.curPageNum = data.pager.pageNum;
      setTimeout(function () {
        return _this2.setWrapHeight();
      }, 200);
      return _react2.default.createElement('div', { className: 'eps-object-select' }, _react2.default.createElement('div', { className: 'eps-box-wrap' }, searchBox), _react2.default.createElement('div', { className: 'eps-list-card-wrap eps-search-list', style: {
          maxHheight: this.state['containerHeight']
        } }, searchList), seletedList);
      // return (<div className="">dsadasdasdasdasdasdasdasdasd</div>)
    }
    // 查询检索

  }, {
    key: 'goSearch',
    value: function goSearch(e, nextPageNum) {
      var self = this;
      var dispatch = this.props.dispatch;
      var value = e ? typeof e.target.value != 'undefined' ? e.target.value : this.searchKey : this.searchKey;
      nextPageNum = nextPageNum ? nextPageNum : 1;
      this.searchKey = value;
      // 避免重复请求，当搜索字段一样，并且请求页数相同时，不发起请求
      if (this.searchKey == this.lastSearchKey && nextPageNum == this.lastPageNum) return;
      console.log('goSearch=================================:', e);
      console.log('goSearch=searchKey:', this.searchKey, 'value:', value);
      this.lastSearchKey = this.searchKey;
      this.lastPageNum = nextPageNum;
      clearTimeout(this.searchTime);
      var ownerInfo = this.props.ownerInfo;
      // 发起请求
      this.searchTime = setTimeout(function () {
        if (self.props.action) {
          dispatch({
            type: self.props.action,
            payload: {
              condition: {
                keys: value,
                vendorNumber: userinfo.vendorNumber
              },
              pager: {
                pageNum: nextPageNum,
                pageSize: _constants.PAGE_SIZE
              }
            }
          });
        } else {
          var typeAction = void 0;
          switch (self.props.searchType) {
            // 搜索设备 组合搜索（可设备名称＋空格＋供应商名称来搜索）
            case 'device':
              var arrs = value.split(' ');
              dispatch({
                type: 'objectselect/searchEquipmentList',
                payload: {
                  condition: {
                    keys: arrs[0],
                    vendorNumber: userinfo.vendorNumber ? userinfo.vendorNumber : '', // 搜索设备时 如果已经有一条设备，就需将该设备的供应商编号传过来，以便只查询该供应商下的设备信息
                    vendorName: arrs[1] ? arrs[1] : ''
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 搜索设备配件
            case 'parts':
              dispatch({
                type: 'objectselect/getFittingList',
                payload: {
                  condition: {
                    keys: value,
                    // 设备编号
                    deviceNumber: ownerInfo.deviceNumber,
                    // 维修商编号
                    vendorNumber: ownerInfo.vendorNumber
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 搜索工程
            case 'project':
              dispatch({
                type: 'objectselect/list',
                payload: {
                  condition: {
                    keys: value
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 搜索IT设备
            case 'it':
              dispatch({
                type: 'objectselect/searchITEquipment',
                payload: {
                  condition: {
                    keys: value,
                    // 供应商编号
                    vendorNumber: userinfo.vendorNumber
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 搜索IT设备配件
            case 'itparts':
              dispatch({
                type: 'objectselect/searchITFitting',
                payload: {
                  condition: {
                    keys: value,
                    // 型号代码
                    typeCode: ownerInfo.typeCode
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 搜索餐厅
            case 'store':
              dispatch({
                type: 'objectselect/searchStoreList',
                payload: {
                  condition: {
                    keys: value,
                    // 供应商ID
                    vendorNumber: userinfo.vendorNumber
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 搜索供应商
            case 'repairstore':
              dispatch({
                type: 'objectselect/searchMaintainerList',
                payload: {
                  condition: {
                    keys: value
                  },
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            // 默认搜索工程
            case 'scrapped':
              var data = {};
              if (self.props["parentData"]['scrappType'] == 'repair') {
                data = {
                  orderNumber: self.props["parentData"]["orderNumber"],
                  storeNumber: self.props["parentData"]["storeNumber"],
                  deviceNumber: self.props["parentData"]["deviceNumber"],
                  deviceName: self.props["parentData"]["deviceName"],
                  deviceSerialNumber: self.props["parentData"]["deviceSerialNumber"],
                  allPartRepairMoney: self.props['parentData']['allPartRepairMoney'],
                  faCategory: self.props['parentData']['faCategory'],
                  assetDesc: value
                };
              } else {
                data = {
                  orderNumber: self.props["parentData"]["orderNumber"],
                  storeNumber: self.props["parentData"]["storeNumber"],
                  deviceNumber: self.props["parentData"]["deviceNumber"],
                  deviceName: self.props["parentData"]["deviceName"],
                  faCategory: self.props['parentData']['faCategory'],
                  assetDesc: value
                };
              }
              dispatch({
                type: 'objectselect/searchScrappedList',
                payload: {
                  condition: data,
                  pager: {
                    pageNum: nextPageNum,
                    pageSize: _constants.PAGE_SIZE
                  }
                }
              });
              break;
            default:
              dispatch({
                type: 'objectselect/list',
                payload: {
                  condition: {
                    deviceName: value
                  }
                }
              });
              break;
          }
        }
      }, 500);
    }
    // 确定添加

  }, {
    key: 'addHandler',
    value: function addHandler() {
      console.log('addHandler:', this.props.data['selectObjects'], 'get:child:select:' + this.props.searchType);
      var data = this.props.data['selectObjects'];
      if (data.length == 0) {
        (0, _EpsModal.AlertInfoBase)({
          text: this.configData.nonChooseTip ? this.configData.nonChooseTip : '您还没有选择任何对象'
        });
        return;
      }
      //   console.log(data,'选中的列表都有啥呢');
      // let hasId = {};
      // let hasSame = true;
      // _.each(data,function(item,index){
      // 	if(index!=0){
      // 		if(hasId[item['epsid']]){
      // 		}else{
      // 			hasSame = false
      // 		}
      // 	}else{
      // 		hasId[item['epsid']] = true
      // 	}
      // })
      // if(hasSame == false){
      // 	AlertBase({
      // 		tip: '维修商不同，请选择相同维修商！',
      // 		icon: 'icon-save-error',
      // 		onOk: ()=>{}
      // 	});
      // 	return
      // }
      window.upTabsData('get:child:select:' + this.props.searchType, 'publish', {
        data: data
      });
      typeof this.props.onAdd == 'function' ? this.props.onAdd(this.props.selectObjects) : '';
      jw.closeWebView();
    }
    // 更改inputloadingicon标识为true

  }, {
    key: 'inputchanged',
    value: function inputchanged() {
      var dispatch = this.props.dispatch;
      var data = _.clone(this.props.data);
      // console.log('inputloadingicon=====:',data)
      dispatch({
        type: 'objectselect/changeData',
        payload: {
          inputloadingicon: true
        }
      });
    }
    // 组织search box框

  }, {
    key: 'combineSearchBox',
    value: function combineSearchBox() {
      var self = this;
      var searchBox = void 0;
      var data = this.props.objectselect;
      var fetching = '';
      // console.log('objectselect:',data,this.props.data,'loading:',this.props.data['loading'],'inputloadingicon:',this.props.data['inputloadingicon'])
      if (this.props.data['loading'] && this.props.data['inputloadingicon']) fetching = _react2.default.createElement('div', { className: 'fetch-ing moveing' }, _react2.default.createElement('div', { className: 'bounce1' }), _react2.default.createElement('div', { className: 'bounce2' }), _react2.default.createElement('div', { className: 'bounce3' }));
      // console.log('fetching=======:============',fetching)
      var assistTip = '';
      if (this.configData.assistTip) {
        assistTip = _react2.default.createElement('div', { className: 'eps-search-assistTip' }, this.configData.assistTip);
      }
      if (this.props.ownerInfo) {
        var ownerInfo = this.props.ownerInfo;
        searchBox = _react2.default.createElement('div', { className: 'eps-box eps-box-with-owner' }, _react2.default.createElement('div', { className: 'eps-box-owner' }, _react2.default.createElement('label', null, ownerInfo.label), _react2.default.createElement('font', null, ownerInfo.deviceName)), _react2.default.createElement('div', { className: 'eps-form-inline' }, _react2.default.createElement('div', { className: 'eps-search-label' }, _react2.default.createElement('font', null, this.configData.title), _react2.default.createElement('i', { className: 'icon-search-help' })), _react2.default.createElement('div', { className: 'eps-search-val' }, _react2.default.createElement('i', { className: 'icon-search' }), _react2.default.createElement('div', { className: 'search-input-w' }, _react2.default.createElement('input', { name: 'search-input', type: 'text', value: data && data["condition"]["deviceName"], placeholder: this.configData.placeholder, onChange: function onChange(e) {
            self.inputchanged();self.goSearch(e);
          } }), fetching))), assistTip);
      } else {
        searchBox = _react2.default.createElement('div', { className: 'eps-box' }, _react2.default.createElement('div', { className: 'eps-search-form' }, _react2.default.createElement('div', { className: 'eps-search-label' }, _react2.default.createElement('font', null, this.configData.title), _react2.default.createElement('i', { className: 'icon-search-help' })), _react2.default.createElement('div', { className: 'eps-search-val' }, _react2.default.createElement('i', { className: 'icon-search' }), _react2.default.createElement('div', { className: 'search-input-w' }, _react2.default.createElement('input', { name: 'search-input', type: 'text', placeholder: this.configData.placeholder, onChange: function onChange(e) {
            self.inputchanged();self.goSearch(e);
          } }), fetching))), assistTip);
      }
      return searchBox;
    }
  }, {
    key: 'selectHandler',
    value: function selectHandler(id, params) {
      console.log('selectHandler:===', id, params);
      var self = this;
      if (this.configData.checkMode == 'multiple') {
        this.setState({ 'selectedWrapWidth': '2000px' });
        this.props.dispatch({
          type: 'objectselect/CHANGE_CHECKED_STATUS',
          payload: {
            id: id,
            checked: params.checked
          }
        });
        setTimeout(function () {
          self.calculateSeletedObjsWidth();
        }, 200);
      } else {
        this.props.dispatch({
          type: 'objectselect/CHANGE_CHECKED_STATUS',
          payload: {
            id: id,
            checked: true
          }
        });
        setTimeout(function () {
          self.addHandler();
        });
      }
    }
    // 组织list

  }, {
    key: 'combineSearchList',
    value: function combineSearchList() {
      var _this3 = this;

      var self = this;
      var list = this.props.list;
      var data = this.props.data;
      console.log('combineSearchListXXXXXX:', this.props, list, data['loading'], parseInt(data['pager']["pageNum"]));
      if (list == 'firstenter') {
        // 因为默认所有的搜索都要把第一页数据带上,所以把空提示去掉
        // if(this.configData.emptyIcon){
        //   return  (<EmptyWithArrow icon={ this.configData.emptyIcon }/>);
        // }else{
        if (data['loading']) {
          return _react2.default.createElement('div', { className: 'loading-bounce-w fix' }, _react2.default.createElement('div', { className: 'loading-bounce-bg' }), _react2.default.createElement('div', { className: 'loading-gif' }, _react2.default.createElement('img', { src: 'images/loading.gif' })));
        } else {
          return _react2.default.createElement('div', null);
        }
        // }
      } else if (list && typeof list != 'string' && list.length > 0) {
        var listComponents = [];
        // alert('dsadasdasdasdasdas');
        switch (this.props.searchType) {
          // 搜索设备
          case 'device':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_DeviceCard.DeviceCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 搜索设备配件
          case 'parts':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_DevicepartsCard.DevicepartsCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 搜索IT设备
          case 'it':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_ItCard.ItCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 搜索IT设备配件
          case 'itparts':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_ItpartsCard.ItpartsCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 搜索工程
          case 'project':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_ProjectCard.ProjectCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 搜索餐厅
          case 'store':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_StoreCard.StoreCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 搜索供应商
          case 'repairstore':
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_RepairStoreCard.RepairStoreCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          case 'scrapped':
            // listComponents =  [];
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_ScrappedCard.ScrappedCardSelect, { scrappType: data["parentData"]['scrappType'], itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
          // 默认显示搜索设备
          default:
            listComponents = _.map(list, function (item) {
              return _react2.default.createElement(_DeviceCard.DeviceCardSelect, { itemdata: item, selectHandler: _this3.selectHandler });
            });
            break;
        }
        var loadMoreHtml = "";
        if (data['total'] < _constants.PAGE_SIZE) {} else {
          // console.log('loadmorehtml:==',data,PAGE_SIZE,data['pager']["pageNum"]*parseInt(PAGE_SIZE),data['total'])
          // if(data['pager']["pageNum"]*PAGE_SIZE>=data['total']){
          if (list.length >= data['total']) {
            loadMoreHtml = _react2.default.createElement('div', { className: 'todos-nomore' }, "\u6CA1\u6709\u66F4\u591A\u4E86\uFF01");
          } else {
            loadMoreHtml = _react2.default.createElement(_LoadMore2.default, { container: 'eps-search-list', data: {
                loading: data['loading'],
                hide: data['hide'],
                fix: data['fix']
              }, onEndReached: function onEndReached(e) {
                self.onEndReached(e);
              } });
          }
        }
        setTimeout(function () {
          $(_reactDom2.default.findDOMNode(self.refs.refListWrap)).removeClass('zoomIn');
        }, 900);
        return _react2.default.createElement('div', { className: 'eps-device-list animated zoomIn', ref: 'refListWrap' }, listComponents, loadMoreHtml);
      } else {
        return this.configData.emptyViewTip ? _react2.default.createElement(_EmptyView2.default, { tip: this.configData.emptyViewTip }) : _react2.default.createElement('div', null, "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9");
      }
    }
    // header fixed开关

  }, {
    key: 'headerFixedHandle',
    value: function headerFixedHandle() {
      var _this4 = this;

      $(document).on('scroll', function (e) {
        if ($(document).scrollTop() >= _this4.headerOffset.top) {
          $('.eps-box-wrap').addClass('fixed');
        } else {
          if ($(document).scrollTop() <= _this4.headerOffset.top + 50) {
            $('.eps-box-wrap').removeClass('fixed');
          }
        }
      });
    }
    // 取消选择当前对象

  }, {
    key: 'cancelSelCurObject',
    value: function cancelSelCurObject(item) {
      this.props.dispatch({
        type: 'objectselect/CHANGE_CHECKED_STATUS',
        payload: {
          id: item.id,
          checked: false
        }
      });
    }
    // 已选择list

  }, {
    key: 'combineSelectedList',
    value: function combineSelectedList() {
      var _this5 = this;

      var self = this;
      var data = this.props.selectObjects;
      console.log('已选择的list里面有什么数据呢', this.props.selectObjects);
      return _react2.default.createElement('div', { className: 'eps-seleted-list-wrap' }, _react2.default.createElement('div', { className: 'eps-seleted-list' }, _react2.default.createElement('div', { className: 'eps-seleted-list-real', style: { width: this.state.selectedWrapWidth } }, this.props.selectObjects.map(function (item) {
        console.log('item===', item, self.props.searchType);
        // 已选list显示到页面底部，需做适配
        var objname = '';
        switch (self.props.searchType) {
          case 'device':
            objname = item["deviceName"];
            break;
          case 'project':
            objname = item["projectName"];
            break;
          case 'store':
            objname = item["longSiteDesc"];
            break;
          case 'it':
            objname = item["deviceName"];
            break;
          case 'parts':
            objname = item["deviceName"];
            break;
          case 'itparts':
            objname = item["name"];
            break;
          case 'scrapped':
            objname = item['assetDesc'] || item["deviceName"];
            break;
          default:
            objname = '待配置哦';
            break;
        }
        console.log('dksjdksjs===:', objname);
        return _react2.default.createElement('div', { className: 'eps-search-item' }, _react2.default.createElement('font', null, objname), _react2.default.createElement('i', { className: 'icon-selobj-delete', onClick: function onClick(e) {
            _this5.cancelSelCurObject(item);
          } }));
      }))), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-xsmall', onClick: this.addHandler }, "\u6DFB\u52A0(", this.props.selectObjects.length, ')'));
    }
    // 组件加载完毕

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      this.selectedWrapWidth = $('.eps-seleted-list').width();
      // 计算已选对象的宽度
      this.calculateSeletedObjsWidth();
      this.setHeight();
      if (isAndroid()) $(window).resize(function () {
        self.setHeight();
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
        var header = $('.header').height() || 0;
        var top = $('.eps-box-wrap').height() || 0;
        var footer = $('.eps-seleted-list-wrap').height() || 0;
        // console.log(clientHeight,header,top,footer);
        $('.eps-search-list').css({ height: clientHeight - header - top - footer - 20 + 'px' });
      }, 0);
    }
    // 设置容器高度

  }, {
    key: 'setWrapHeight',
    value: function setWrapHeight() {
      // 计算list高度
      var btmHeight = typeof $('.eps-seleted-list-wrap').outerHeight() != 'undefined' ? $('.eps-seleted-list-wrap').outerHeight() : 0;
      var wrapHeight = $(window).height() - $('.eps-search-list').offset().top - btmHeight - 40;
      $('.eps-seleted-list-wrap').css({ 'max-height': wrapHeight });
    }
    // 计算已选对象的宽度并设置

  }, {
    key: 'calculateSeletedObjsWidth',
    value: function calculateSeletedObjsWidth() {
      var realWidth = 0;
      if ($('.eps-search-item').length > 0) {
        $('.eps-search-item').each(function () {
          realWidth += $(this).width() + 40;
        });
        // realWidth = $('.eps-search-item:last').offset().left + $('.eps-search-item:last').width() + 40;
        this.setState({ 'selectedWrapWidth': realWidth < this.selectedWrapWidth ? this.selectedWrapWidth : realWidth });
      } else {
        this.setState({ 'selectedWrapWidth': '100%' });
      }
    }
  }, {
    key: 'onEndReached',
    value: function onEndReached(e) {
      // alert('xxxxxxxxxx');
      var num = Number(this.curPageNum) + 1;
      console.log(num, 'goSearch=== onEndReached：＝＝＝＝＝＝＝＝,这个值是什么呢');
      var dispatch = this.props.dispatch;
      dispatch({
        type: 'objectselect/changeData',
        payload: {
          inputloadingicon: false
        }
      });
      this.goSearch(e, num);
    }
  }]);

  return ObjectSelectList;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
  console.log(state, '这个里面有啥呀呀呀呀呀呀哎呀呀呀哎呀呀呀呀哎呀呀呀');
  return state.objectselect;
})(ObjectSelectList);

/***/ }),

/***/ 1431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RepairStoreCardSelect = undefined;

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
} /**
   * 供应商卡片
   */

/**
 * 选择供应商卡片
 */
var RepairStoreCardSelect = exports.RepairStoreCardSelect = function (_Component) {
	_inherits(RepairStoreCardSelect, _Component);

	function RepairStoreCardSelect(props) {
		_classCallCheck(this, RepairStoreCardSelect);

		var _this = _possibleConstructorReturn(this, (RepairStoreCardSelect.__proto__ || Object.getPrototypeOf(RepairStoreCardSelect)).call(this, props));

		_this.selectHandler = _this.selectHandler.bind(_this);
		return _this;
	}

	_createClass(RepairStoreCardSelect, [{
		key: 'NameInfo',
		value: function NameInfo(name) {
			if ((0, _constants.DataLength)(name) > 12) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
		}
	}, {
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this;
			var itemdata = this.props.itemdata;
			return _react2.default.createElement('div', { className: 'eps-device-card-select eps-store-card-select' }, _react2.default.createElement('div', { className: 'eps-list-card animated zoomIn', onClick: this.selectHandler }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u4F9B\u5E94\u5546\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, itemdata.vendorName ? itemdata.vendorName : '无')))));
		}
	}]);

	return RepairStoreCardSelect;
}(_react.Component);

;

/***/ }),

/***/ 1432:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StoreCardSelect = undefined;

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
   * 餐厅卡片
   */

/**
 * 选择餐厅卡片
 */
var StoreCardSelect = exports.StoreCardSelect = function (_Component) {
	_inherits(StoreCardSelect, _Component);

	function StoreCardSelect(props) {
		_classCallCheck(this, StoreCardSelect);

		var _this = _possibleConstructorReturn(this, (StoreCardSelect.__proto__ || Object.getPrototypeOf(StoreCardSelect)).call(this, props));

		_this.selectHandler = _this.selectHandler.bind(_this);
		return _this;
	}

	_createClass(StoreCardSelect, [{
		key: 'selectHandler',
		value: function selectHandler() {
			var willbe = !this.props.itemdata.checked;
			typeof this.props.selectHandler == 'function' ? this.props.selectHandler(this.props.itemdata['id'], { checked: willbe }) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var itemdata = this.props.itemdata;
			itemdata.longSiteDesc = itemdata.longSiteDesc == '' || _.isNull(itemdata.longSiteDesc) ? '-' : itemdata.longSiteDesc;
			console.log('itemdata.longSiteDesc [' + itemdata.longSiteDesc + ']');
			return _react2.default.createElement('div', { className: 'eps-device-card-select eps-store-card-select' }, _react2.default.createElement('div', { className: 'eps-list-card animated zoomIn', onClick: this.selectHandler }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u9910\u5385\u540D\u79F0")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, itemdata.longSiteDesc))), _react2.default.createElement('div', { className: 'eps-item-info-inline' }, _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u9910\u5385\u7F16\u53F7")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, itemdata.usCode))), _react2.default.createElement('div', { className: 'eps-item-info' }, _react2.default.createElement('dt', null, _react2.default.createElement('label', null, "\u7701\u5E02")), _react2.default.createElement('dd', null, _react2.default.createElement('font', null, itemdata.provinceNameCn, itemdata.cityNameCn))))));
		}
	}]);

	return StoreCardSelect;
}(_react.Component);

;

/***/ }),

/***/ 1433:
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
    * 公共搜索组件
    * 
    * 搜索工程（objectselect/list）
    * 搜索设备（objectselect/searchEquipmentList)
    * 搜索设备配件（objectselect/getFittingList)
    * 搜索IT设备（objectselect/searchITEquipment)
    * 搜索IT设备配件（objectselect/searchITFitting)
    * 搜索餐厅（objectselect/searchStoreList)
    * 
    * 注意： 此组件拼装了一个epsid, 原因是 设备，配件，IT设备，IT设备配件接口中没有返回唯一的id，
    *       德勤给出没返回id的原因： 因为这些是主键是由麦当劳主数据方决定的，所以业务主键里并没有叫id的标识。虽说实际表里有id这个物理主键，但这个不适用于去做匹配
    * 注意： 工程和餐厅因为后期数据交互没影响，所以没有拼装epsid      
    * 所以eps系统根据唯一规则，拼装了epsid
       唯一规则如下：
       1.设备的话，唯一标识就是 "deviceNumber": "设备编号" + "vendorNumber": "供应商编号"  
          epsid = deviceNumber+ '.' + vendorNumber    id = deviceNumber + '.' + vendorNumber
       2.设备配件的话，唯一标识就是 "deviceNumber": "设备编号" +"partNumber": "配件编号"  
          epsid=deviceNumber+'.'+’partNumber’    id=deviceNumber+'.'+’partNumber’
       3.IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码" 
          epsid=deviceCode+'.'+typeCode    id=deviceCode+'.'+typeCode
       4.IT设备配件的话，唯一标识就是"deviceNumber": "it配件编号"
           epsid=deviceNumber id=deviceNumber
    */

var _ObjectSelect = __webpack_require__(1434);

var ObjectService = _interopRequireWildcard(_ObjectSelect);

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

function Test(parame) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/searchConstructionList', {
    method: 'POST',
    body: JSON.stringify(parame)
  });
}
exports.default = {
  namespace: 'objectselect',
  state: {
    loading: false,
    firstFetch: true,
    inputloadingicon: false, // input框是否显示loading
    noMore: false,
    list: 'firstenter', // 根据list决定是显示添加提示 还是空页面 还是列表; 如果list为'firstenter',那么显示添加添加提示；如果list为[],显示空页面；否则显示list
    selectObjects: [],
    condition: {
      keys: ''
    },
    total: 0,
    pager: {
      pageNum: 1,
      pageSize: '10'
    }
  },

  reducers: {
    changeData: function changeData(state, action) {
      return _extends({}, state, action.payload);
    },

    // 把返回的数据放到state中
    save: function save(state, action) {
      return _extends({}, state, action.payload);
    },

    // 合并列表
    savelist: function savelist(state, action) {
      var payload = action.payload;
      state.list = state.list ? state.list : [];
      return _extends({}, state, { list: _.union(state.list, payload.list), total: payload.total, pageinfo: payload.pageinfo, loading: payload.loading });
    },

    // 过滤条件发生变化
    FILTER_CHANGE: function FILTER_CHANGE(state, action) {
      return _extends({}, state, { filter: _.extend(state.filter, action.payload) });
    },

    // 设置loding状态
    SET_LOADING: function SET_LOADING(state, action) {
      return _extends({}, state, action.payload);
    },

    // 更改选中状态
    CHANGE_CHECKED_STATUS: function CHANGE_CHECKED_STATUS(state, action) {
      var tmplist = state.list;
      var tmpitem = '';
      var changeItem = '';
      _.each(tmplist, function (item, i) {
        tmpitem = item;
        if (tmpitem.id == action.payload.id) {
          changeItem = item;
          tmpitem.checked = action.payload.checked;
        }
        tmplist[i] = tmpitem;
      });
      var newSelectObjects = state.selectObjects;
      if (changeItem) {
        action.payload.checked == true ? newSelectObjects = _.union([changeItem], newSelectObjects) : newSelectObjects = _.filter(newSelectObjects, function (item) {
          return item.id != action.payload.id;
        });
      }
      return _extends({}, state, { list: tmplist, selectObjects: newSelectObjects });
    }
  },

  effects: {
    // 获取列表 搜索工程 返回结果中也没有id, 但 后期数据交互没影响，所以没有拼装epsid  
    list: /*#__PURE__*/regeneratorRuntime.mark(function list(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put,
          select = _ref2.select;

      var reset, datas, param, _ref3, data, headers, selectObjectIDs, lists;

      return regeneratorRuntime.wrap(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              reset = true;

              if (payload['pager'] && payload['pager']['pageNum'] > 1) {
                reset = false;
              }

              _context.next = 6;
              return select();

            case 6:
              datas = _context.sent;
              param = _.extend({}, {
                condition: datas["objectselect"]['condition'],
                pager: datas["objectselect"]['pager']
              });
              _context.next = 10;
              return call(Test, {
                param: param
              });

            case 10:
              _ref3 = _context.sent;
              data = _ref3.data;
              headers = _ref3.headers;
              selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'id');
              lists = _.map(data.body["deviceList"]["list"], function (item) {
                return _.extend(item, { checked: _.indexOf(selectObjectIDs, item.id) == -1 ? false : true });
              });
              // console.log((reset?lists:datas["objectselect"]['list'].concat(lists)),data.body["deviceList"],lists,'这个里面获取到了什么数据呢');

              _context.next = 17;
              return put({
                type: 'save',
                payload: _.extend({
                  list: reset ? lists : typeof datas["objectselect"]['list'] == 'string' ? lists : datas["objectselect"]['list'].concat(lists),
                  loading: false,
                  total: data.body["deviceList"]['total']
                }, param)
              });

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, list, this);
    }),

    // 搜索餐厅  返回结果中也没有id, 但 后期数据交互没影响，所以没有拼装epsid  
    searchStoreList: /*#__PURE__*/regeneratorRuntime.mark(function searchStoreList(_ref4, _ref5) {
      var payload = _ref4.payload;
      var call = _ref5.call,
          put = _ref5.put,
          select = _ref5.select;

      var _ref6, data, reset, datas;

      return regeneratorRuntime.wrap(function searchStoreList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context2.next = 4;
              return call(ObjectService.searchStoreList, payload);

            case 4:
              _ref6 = _context2.sent;
              data = _ref6.data;

              if (!data.success) {
                _context2.next = 14;
                break;
              }

              reset = true;
              _context2.next = 10;
              return select();

            case 10:
              datas = _context2.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              _context2.next = 14;
              return put({
                type: 'changeData',
                payload: {
                  list: reset ? data.body["pageInfo"]["list"] : datas["objectselect"]['list'].concat(data.body["pageInfo"]["list"]),
                  loading: false,
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, searchStoreList, this);
    }),

    // 搜索设备  返回的列表中无id字段，由 "deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号" 作唯一标识， epsid和id都="deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号", 用作页面流转，提交时去掉
    searchEquipmentList: /*#__PURE__*/regeneratorRuntime.mark(function searchEquipmentList(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put,
          select = _ref8.select;

      var _ref9, data, reset, datas, selectObjectIDs, id, lists;

      return regeneratorRuntime.wrap(function searchEquipmentList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context3.next = 4;
              return call(ObjectService.searchEquipmentList, payload);

            case 4:
              _ref9 = _context3.sent;
              data = _ref9.data;

              if (!data.success) {
                _context3.next = 17;
                break;
              }

              reset = true;
              _context3.next = 10;
              return select();

            case 10:
              datas = _context3.sent;

              // console.log('searchEquipmentList:',datas.objectselect.selectObjects)
              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'id');
              id = void 0;
              lists = _.map(data.body["pageInfo"]["list"], function (item) {
                id = item['deviceNumber'] + '.' + item['vendorNumber'];
                // "deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号" 是设备的唯一标识
                return _.extend(item, { id: id, epsid: item['deviceNumber'] + '.' + item['vendorNumber'], checked: _.indexOf(selectObjectIDs, id) == -1 ? false : true });
              });
              _context3.next = 17;
              return put({
                type: 'changeData',
                payload: {
                  list: reset ? lists : datas["objectselect"]['list'].concat(lists),
                  loading: false,
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, searchEquipmentList, this);
    }),

    // 搜索设备配件 返回的列表中无id字段，由deviceNumber(设备编号) + partNumber(配件编号)拼成了唯一id, epsid和id都=(deviceNumber+'.'+partNumber),用作页面流转，提交时去掉
    getFittingList: /*#__PURE__*/regeneratorRuntime.mark(function getFittingList(_ref10, _ref11) {
      var payload = _ref10.payload;
      var call = _ref11.call,
          put = _ref11.put,
          select = _ref11.select;

      var _ref12, data, reset, datas, selectObjectIDs, id, lists;

      return regeneratorRuntime.wrap(function getFittingList$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context4.next = 4;
              return call(ObjectService.getFittingList, payload);

            case 4:
              _ref12 = _context4.sent;
              data = _ref12.data;

              if (!data.success) {
                _context4.next = 17;
                break;
              }

              reset = true;
              _context4.next = 10;
              return select();

            case 10:
              datas = _context4.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'id');
              id = void 0;
              lists = _.map(data.body["pageInfo"]["list"], function (item) {
                id = item['deviceNumber'] + '.' + item['partNumber'];
                // 设备配件的话，唯一标识就是 "deviceNumber": "设备编号" +"partNumber": "配件编号"  
                return _.extend(item, { id: id, epsid: item['deviceNumber'] + '.' + item['partNumber'], checked: _.indexOf(selectObjectIDs, id) == -1 ? false : true });
              });
              _context4.next = 17;
              return put({
                type: 'changeData',
                payload: {
                  list: reset ? lists : datas["objectselect"]['list'].concat(lists),
                  loading: false,
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, getFittingList, this);
    }),

    // 搜索IT设备 返回的列表中无id字段，由deviceCode(it设备id) + typeCode(型号代码)拼成了唯一id, epsid和id都＝deviceCode+'.'+typeCode, 用作页面流转，提交时去掉
    searchITEquipment: /*#__PURE__*/regeneratorRuntime.mark(function searchITEquipment(_ref13, _ref14) {
      var payload = _ref13.payload;
      var call = _ref14.call,
          put = _ref14.put,
          select = _ref14.select;

      var _ref15, data, reset, datas, selectObjectIDs, id, lists;

      return regeneratorRuntime.wrap(function searchITEquipment$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context5.next = 4;
              return call(ObjectService.searchITEquipment, payload);

            case 4:
              _ref15 = _context5.sent;
              data = _ref15.data;

              if (!data.success) {
                _context5.next = 17;
                break;
              }

              reset = true;
              _context5.next = 10;
              return select();

            case 10:
              datas = _context5.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'id');
              id = void 0;
              lists = _.map(data.body["pageInfo"]["list"], function (item) {
                id = item['deviceCode'] + '.' + item['typeCode'];
                // IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码"  
                return _.extend(item, { id: id, epsid: item['deviceCode'] + '.' + item['typeCode'], checked: _.indexOf(selectObjectIDs, id) == -1 ? false : true });
              });
              _context5.next = 17;
              return put({
                type: 'changeData',
                payload: {
                  list: reset ? lists : datas["objectselect"]['list'].concat(lists),
                  loading: false,
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 17:
            case 'end':
              return _context5.stop();
          }
        }
      }, searchITEquipment, this);
    }),

    // 搜索IT设备配件 返回的列表中无id字段，由deviceNumber(it配件编号)拼成了唯一id, epsid和id都=deviceNumber, 用作页面流转，提交时去掉
    searchITFitting: /*#__PURE__*/regeneratorRuntime.mark(function searchITFitting(_ref16, _ref17) {
      var payload = _ref16.payload;
      var call = _ref17.call,
          put = _ref17.put,
          select = _ref17.select;

      var _ref18, data, reset, lists, datas, selectObjectIDs, id;

      return regeneratorRuntime.wrap(function searchITFitting$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context6.next = 4;
              return call(ObjectService.searchITFitting, payload);

            case 4:
              _ref18 = _context6.sent;
              data = _ref18.data;

              if (!data.success) {
                _context6.next = 16;
                break;
              }

              reset = true;
              lists = [];
              _context6.next = 11;
              return select();

            case 11:
              datas = _context6.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              if (data.body["pageInfo"] && data.body["pageInfo"]["list"].length > 0) {
                selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'id');
                id = void 0;

                lists = _.map(data.body["pageInfo"]["list"], function (item) {
                  id = item['deviceNumber'];
                  return _.extend(item, { id: item['deviceNumber'], epsid: item['deviceNumber'], checked: _.indexOf(selectObjectIDs, id) == -1 ? false : true });
                });
              }
              _context6.next = 16;
              return put({
                type: 'changeData',
                payload: {
                  list: reset ? lists : datas["objectselect"]['list'].concat(lists),
                  loading: false,
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, searchITFitting, this);
    }),

    // 搜索供应商  返回结果中也没有id, 但 后期数据交互没影响，所以没有拼装epsid  
    searchMaintainerList: /*#__PURE__*/regeneratorRuntime.mark(function searchMaintainerList(_ref19, _ref20) {
      var payload = _ref19.payload;
      var call = _ref20.call,
          put = _ref20.put,
          select = _ref20.select;

      var _ref21, data, lists, reset, datas, id, selectObjectIDs;

      return regeneratorRuntime.wrap(function searchMaintainerList$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context7.next = 4;
              return call(ObjectService.searchMaintainerList, payload);

            case 4:
              _ref21 = _context7.sent;
              data = _ref21.data;

              if (!data.success) {
                _context7.next = 16;
                break;
              }

              lists = [];
              reset = true;
              _context7.next = 11;
              return select();

            case 11:
              datas = _context7.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              if (data.body["pageInfo"] && data.body["pageInfo"]["list"].length > 0) {
                id = void 0;
                selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'id');

                lists = _.map(data.body["pageInfo"]["list"], function (item) {
                  id = item['vendorNumber'];
                  return _.extend(item, { id: item['vendorNumber'], epsid: item['vendorNumber'], checked: _.indexOf(selectObjectIDs, id) == -1 ? false : true });
                });
              }
              _context7.next = 16;
              return put({
                type: 'changeData',
                payload: {
                  list: reset ? lists : datas["objectselect"]['list'].concat(lists),
                  loading: false,
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 16:
            case 'end':
              return _context7.stop();
          }
        }
      }, searchMaintainerList, this);
    }),
    searchScrappedList: /*#__PURE__*/regeneratorRuntime.mark(function searchScrappedList(_ref22, _ref23) {
      var payload = _ref22.payload;
      var call = _ref23.call,
          put = _ref23.put,
          select = _ref23.select;

      var _ref24, data, lists, reset, datas, selectObjectIDs;

      return regeneratorRuntime.wrap(function searchScrappedList$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return put({
                type: 'changeData',
                payload: _.extend({
                  loading: true
                }, payload)
              });

            case 2:
              _context8.next = 4;
              return call(ObjectService.searchScrappedList, payload);

            case 4:
              _ref24 = _context8.sent;
              data = _ref24.data;

              if (!data.success) {
                _context8.next = 20;
                break;
              }

              lists = [];
              reset = true;
              _context8.next = 11;
              return select();

            case 11:
              datas = _context8.sent;

              if (payload['pager']['pageNum'] > 1) {
                reset = false;
              }
              console.warn('开始设置拉倒的值');
              selectObjectIDs = _.pluck(datas.objectselect.selectObjects, 'assetNumber');
              // selectObjectIDs = _.map(datas.objectselect.selectObjects,function(i){
              //   return (i['deviceName']+'.'+i['deviceNumber']+'.'+i['assetDesc'])
              // });
              // if (data.body["pageInfo"] && data.body["pageInfo"]["list"].length > 0) {
              //   let id;

              //   // lists = _.map(data.body["pageInfo"]["list"], (item) => {
              //   //   id = item['vendorNumber'];
              //   //   return _.extend(item, { id: item['vendorNumber'], epsid: item['vendorNumber'], checked: (_.indexOf(selectObjectIDs, id) == -1 ? false : true) })
              //   // })
              // }

              lists = data.body["pageInfo"]["list"];
              // let hahaha = yield select();
              // console.log(JSON.stringify(hahaha["objectselect"]),'这里走了几次呢');
              // console.log(datas,'123123123123');

              lists = _.map(lists, function (item) {
                var assetNumber = item['assetNumber'];
                // let epsid = item['deviceName']+'.'+item['deviceNumber']+'.'+item['assetDesc'];
                // "deviceNumber": "设备编号" + '.' + "vendorNumber": "供应商编号" 是设备的唯一标识
                return _.extend(item, { checked: _.indexOf(selectObjectIDs, assetNumber) == -1 ? false : true });
              });
              /*
                id = item['deviceName']+'.'+item['deviceNumber'];
                // IT设备的话，唯一标识就是 "deviceCode": "it设备id" + "typeCode": "型号代码"  
                return _.extend(item,{id: id,epsid: item['deviceCode']+'.'+item['typeCode'],checked:(_.indexOf(selectObjectIDs,id)==-1?false:true)})
               */
              if (reset) {} else {
                lists = datas["objectselect"]['list'].length != 0 ? datas["objectselect"]['list'].concat(lists) : lists;
              }
              // console.log(lists,'这个里面有多少',selectObjectIDs);
              _context8.next = 20;
              return put({
                type: 'changeData',
                payload: {
                  loading: false,
                  list: lists,
                  // list:[],
                  total: data.body["pageInfo"]['total'],
                  pager: {
                    pageNum: data.body["pageInfo"]["pageNum"] ? data.body["pageInfo"]["pageNum"] : 1,
                    pages: data.body["pageInfo"]["pages"] ? data.body["pageInfo"]["pages"] : 1
                  }
                }
              });

            case 20:
            case 'end':
              return _context8.stop();
          }
        }
      }, searchScrappedList, this);
    }),

    // 过滤条件发生变化
    FILTER_CHANGE: function FILTER_CHANGE(_ref25, _ref26) {
      var payload = _ref25.payload;
      var call = _ref26.call,
          put = _ref26.put;

      put({
        type: 'FILTER_CHANGE',
        payload: payload
      });
    },

    // 设置loding状态
    SET_LOADING: function SET_LOADING(_ref27, _ref28) {
      var payload = _ref27.payload;
      var call = _ref28.call,
          put = _ref28.put;

      put({
        type: 'SET_LOADING',
        payload: payload
      });
    },

    // 更改选中状态
    CHANGE_CHECKED_STATUS: function CHANGE_CHECKED_STATUS(_ref29, _ref30) {
      var payload = _ref29.payload;
      var call = _ref30.call,
          put = _ref30.put;

      put({
        type: 'CHANGE_CHECKED_STATUS',
        payload: payload
      });
    }
  },

  subscriptions: {}

};

/***/ }),

/***/ 1434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchStoreList = searchStoreList;
exports.searchITEquipment = searchITEquipment;
exports.searchITFitting = searchITFitting;
exports.getFittingList = getFittingList;
exports.searchEquipmentList = searchEquipmentList;
exports.searchMaintainerList = searchMaintainerList;
exports.searchScrappedList = searchScrappedList;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 获取餐厅列表
// {
//    "eid": "用户id",
//    "condition":{
//          "keys":"关键字",
//          "vendorNumber":"供应商id"
//     },
//     "pager": {
//        "pageNum": "当前页",
//        "pageSize": "每页条数"
//     }
// }
// 对象搜索接口 设备，工程，配件，餐厅，IT设备,IT设备配件
function searchStoreList(params) {
  console.log('searchStoreList  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/searchStoreList', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取IT设备列表
// {
//    "eid": "用户id",
//    "condition":{
//          "keys":"关键字",
//          "vendorNumber":"供应商id"
//     },
//     "pager": {
//        "pageNum": "当前页",
//        "pageSize": "每页条数"
//     }
// }
function searchITEquipment(params) {
  console.log('searchITEquipment  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/searchITEquipment', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取IT设备配件列表
// {
//     ""eid"": ""用户id"",
//     ""condition"": {
//          ""keys"": ""关键字"",
//          ""typeCode"":""型号代码""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }
function searchITFitting(params) {
  console.log('searchITFitting  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/searchITFitting', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取设备配件列表
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""deviceNumber"": ""设备名称"",
//         ""partName"":""封条"",
//         ""vendorNumber"":""维修商编号""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
function getFittingList(params) {
  console.log('getFittingList  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getFittingList', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取设备列表
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""deviceName"": ""设备名称""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
function searchEquipmentList(params) {
  console.log('searchEquipmentList  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/searchEquipmentList', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

// 获取供应商列表
// {
//    "eid": "用户id",
//    "condition":{
//          "keys":"关键字",
//     },
//     "pager": {
//        "pageNum": "当前页",
//        "pageSize": "每页条数"
//     }
// }
function searchMaintainerList(params) {
  console.log('searchMaintainerList  eid:====', eid);

  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getMaintainerList', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

function searchScrappedList(params) {
  console.log('searchMaintainerList  eid:====', eid, params);
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getEqChooseScrapList', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

/***/ }),

/***/ 1928:
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

var _ObjectSelectList = __webpack_require__(1430);

var _ObjectSelectList2 = _interopRequireDefault(_ObjectSelectList);

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
   * 搜索供应商
   */

var RepairStoreSearch = function (_Component) {
	_inherits(RepairStoreSearch, _Component);

	function RepairStoreSearch(props) {
		_classCallCheck(this, RepairStoreSearch);

		return _possibleConstructorReturn(this, (RepairStoreSearch.__proto__ || Object.getPrototypeOf(RepairStoreSearch)).call(this, props));
	}

	_createClass(RepairStoreSearch, [{
		key: 'onAdd',
		value: function onAdd(objects) {
			console.log('repair repairstore search:', objects);
		}

		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			NProgress.done();
			var dispatch = this.props.dispatch;
			PubSub.subscribe('select:repairstore', function (evt, data) {
				console.log('select:repairstore:', data);
				dispatch({
					type: 'repairit/changeSelectStore',
					payload: {
						selectObjects: data["repairstore"]
					}
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			// 	title: '您需要维修什么?',
			// * 	checkMode: 'radio', // 选择模式 默认为多选， 值为radio(单选) 或 multiple(多选) ；单选模式 没有footer ；多选模式有footer,有checkbox框
			// *  onAdd: (objects)=>{ // 添加按钮的回调事件,回调的同时将所选对象集传递出去
			// *  	
			// *  }
			var data = this.props.objectselect;
			return _react2.default.createElement('div', { className: 'eps-parts-search' }, _react2.default.createElement('header', { className: 'header clear-margin specail', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' }), _react2.default.createElement('div', { className: 'header-c' })), _react2.default.createElement('div', { className: 'eps-search-body' }, _react2.default.createElement(_ObjectSelectList2.default, { data: data, searchType: 'repairstore', onAdd: this.onAdd })));
		}
	}]);

	return RepairStoreSearch;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(RepairStoreSearch);

/***/ })

});