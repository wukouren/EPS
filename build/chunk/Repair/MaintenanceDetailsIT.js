webpackJsonp([55],{

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

/***/ 1924:
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

var _DeviceCard = __webpack_require__(1171);

var _constants = __webpack_require__(197);

var _EpsModal = __webpack_require__(198);

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
} /**
   * IT设备维修详单
   *
   * 此页面主要逻辑：
   * 1. 从localstorage读取要编辑的IT设备信息，dispatch到 itdetails model中去
   * 2. 从localstorage读取要编辑的IT设备配件list, dispatch到 itdetails model中去
   * 3. 点击设备的编辑按钮，跳转到设备编辑页面
   * 4. 修改配件信息，更新 itdetails model中的配件信息
   * 5. 删除配件，更新itdetails model中的配件list
   * 6. 点击完成，publish 修改后的设备信息，和 设备配件信息
   * 7. 点击返回，不做任何操作
   */

// 税率
var taxlist = (0, _constants.getDict)('taxlist');
// 配件操作建议
var fittingOperation = (0, _constants.getDict)('fittingOperation');
// 获取设备操作建议
var equipmentOperation = (0, _constants.getDict)('equipmentOperation');

var MaintenanceDetailsIT = function (_Component) {
	_inherits(MaintenanceDetailsIT, _Component);

	_createClass(MaintenanceDetailsIT, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'changeData',
		value: function changeData(data) {}
	}]);

	function MaintenanceDetailsIT(props) {
		_classCallCheck(this, MaintenanceDetailsIT);

		var _this = _possibleConstructorReturn(this, (MaintenanceDetailsIT.__proto__ || Object.getPrototypeOf(MaintenanceDetailsIT)).call(this, props));

		_this.gotoAddParts = _this.gotoAddParts.bind(_this);
		_this.createHandler = _this.createHandler.bind(_this);
		var dispatch = _this.props.dispatch;
		// 从localstorage拿即将编辑的IT设备信息
		var ITEquipment = (0, _constants.getDict)('willEditITEquipment');
		// 从localstorage拿该设备下的IT配件信息
		var ITParts = (0, _constants.getDict)('willEditITParts');
		console.log('MaintenanceDetailsIT:EditITParts', {
			ITEquipment: ITEquipment,
			ITParts: ITParts
		});
		// 存储
		dispatch({
			type: 'itdetails/changeData',
			payload: {
				ITEquipment: ITEquipment,
				ITParts: ITParts
			}
		});
		return _this;
	}

	// 添加配件


	_createClass(MaintenanceDetailsIT, [{
		key: 'gotoAddParts',
		value: function gotoAddParts() {
			// 先缓存IT设备信息
			window.upTabsData('itPartsOwnerInfo', 'cache', this.props.itdetails.ITEquipment);
			// 打开IT设备配件搜索页面
			var url = EpsWebRoot + '/#/repairing/add-edit/itparts';
			console.log('url:', url);
			jw.pushWebView(url);
		}
		// 删除配件

	}, {
		key: 'removeParts',
		value: function removeParts(targetIndex) {
			var self = this;
			var dispatch = this.props.dispatch;
			var datas = self.props.itdetails['ITParts'];
			var newList = [];
			_.each(datas, function (i, index) {
				if (targetIndex != index) {
					newList.push(i);
				}
			});
			dispatch({
				type: 'itdetails/changeData',
				payload: {
					ITParts: newList
				}
			});
		}
		// 表单校验

	}, {
		key: 'checkData',
		value: function checkData(data) {
			console.log('checkData:', data);
			if (data.length == 0) return true;
			var error = '';
			for (var j = 0; j < data.length; j++) {
				var item = data[j];
				// console.log(item,'循环配件里面的东西');
				// 操作建议必填
				if (typeof item['partOperate'] == 'undefined' || item['partOperate'].length == 0 || item['partOperate'] == '请选择' || item['partOperate'] == '-1') {
					error = '请正确选择配件的建议操作！';
					break;
				}
				// 税率必填
				if (typeof item['partsRate'] == 'undefined' || item['partsRate'].length == 0 || item['partsRate'] == '请选择' || item['partsRate'] == '-1') {
					error = '请正确选择配件的税率！';
					break;
				}
				// 实际维修价必填
				if (typeof item['purchasingPriceNotax'] == 'undefined' || isNaN(item['purchasingPriceNotax']) || item['purchasingPriceNotax'] < 0) {
					error = '请正确输入配件的实际维修价！';
					break;
				}
			}
			// console.log(error,'看看error是什么');
			if (error) {
				this.errorAlert(error);
				return false;
			}
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
		// 完成修改

	}, {
		key: 'createHandler',
		value: function createHandler(e) {
			var data = this.props.itdetails['ITParts'];
			console.log("this.props.itdetails['ITParts']:::", this.props.itdetails['ITParts']);
			// 校验数据是否正确
			if (this.checkData(data) == false) return;
			// 向上级页面广播IT维修详单更新的消息 含IT设备，及当前设备下的配件
			window.upTabsData('get:edit:maintenance:itdetails', 'publish', {
				ITParts: this.props.itdetails['ITParts'],
				ITEquipment: _.extend(this.props.itdetails['ITEquipment'], { partsnum: this.props.itdetails['ITParts'].length })
			});
			jw.closeWebView();
		}

		// set wrap 高度

	}, {
		key: 'setWrapHeight',
		value: function setWrapHeight() {
			var ListHeight = $(window).height() - $('.eps-footer').outerHeight();
			$(_reactDom2.default.findDOMNode(this.refs.listBody)).css({ 'max-height': ListHeight });
		}

		// 组件加载完毕

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			NProgress.done();
			var self = this;
			var dispatch = this.props.dispatch;
			this.setWrapHeight();
			// 监听设备更改事件，dispatch请求到当前页面的model中
			PubSub.subscribe('editequipmentit', function (evt, data) {
				console.log("MaintenanceDetailsIT subscribe('editequipmentit':", data);
				dispatch({
					type: 'itdetails/changeData',
					payload: {
						ITEquipment: _.extend(self.props.itdetails['ITEquipment'], data)
					}
				});
			});
			// 监听添加IT设备配件事件
			PubSub.subscribe('get:child:select:itparts', function (evt, data) {
				console.log("MaintenanceDetailsIT subscribe('get:child:select:itparts':", data['data']);
				var newList = [];
				data = _.each(data['data'], function (i) {
					i['partName'] = i['partNameCn'];
				});
				var ITPartsEpsids = [];
				_.each(self.props.itdetails['ITParts'], function (item) {
					ITPartsEpsids.push(item.epsid);
				});

				var ITParts = self.props.itdetails['ITParts'];
				var ITEquipment = self.props.itdetails['ITEquipment'];
				var alreadyExistParts = [];
				// 去重合并IT设备配件数据
				_.each(data, function (item) {
					if (_.indexOf(ITPartsEpsids, item.epsid) == -1) {
						var newItem = {
							id: item.id,
							epsid: item.epsid,
							partDeviceEpsid: ITEquipment.epsid, // it设备epsid
							partDeviceNumber: ITEquipment.deviceCode, // it设备编号
							partTypeCode: item.typeCode, // 型号代码
							partsNumber: item.deviceNumber, // 配件编号
							partsName: item.name, // 配件名称
							accessoriesReferencePrice: item.referencePrice, // 参考价
							maintenanceNum: 1, // 数量
							partOperate: '-1', // 操作
							partsRate: '', // 税率
							purchasingPriceNotax: item['purchasingPriceNotax'] ? item['purchasingPriceNotax'] : item['referencePrice'], // 实际维修价格
							maintenanceRemarks: '', // 配件备注
							partIsFa: item.isFa // 是否入固定资产
						};
						ITParts = _.union([newItem], ITParts);
					} else {
						alreadyExistParts.push(item.name);
					}
				});
				if (alreadyExistParts.length > 0) {
					(0, _EpsModal.AlertInfoBase)({
						text: '以下配件已被添加,此次不会重复添加:',
						deviceNames: alreadyExistParts
					});
				}
				dispatch({
					type: 'itdetails/changeData',
					payload: {
						ITParts: ITParts
					}
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var self = this;
			console.log('this.props::', this.props);
			// 设备信息，这个命名 联调的时候要保留哦，下面打开搜索配件时用到了呢～～  
			// 且deviceData中 一定要有 deviceName:'it设备名称' ,typeCode:'型号代码', 这2个字段，搜索配件才能成功 
			var data = this.props.itdetails;
			var deviceData = data.ITEquipment;
			var curDeviceParts = data.ITParts;
			console.log('this.props:', this.props, 'ITEquipment:', deviceData, 'ITParts:', data['ITParts']);
			// console.log('curDeviceParts',deviceData);
			return _react2.default.createElement('div', { className: 'eps-maintenance-details-it' }, _react2.default.createElement('div', { className: 'eps-header-2' }, _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'eps-second-body maintenance-details-custom', ref: 'listBody' }, _react2.default.createElement('div', { className: 'eps-box-wrap header-box' }, _react2.default.createElement(_DeviceCard.DeviceCardAssessToIT, { itemdata: deviceData, showpartsnum: false, animated: false, showCardIcon: false }, _react2.default.createElement('div', { className: 'eps-card-title eps-card-title-2' }, _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), _react2.default.createElement('div', { className: 'eps-card-title border-line-h after' }, _react2.default.createElement('font', null, "\u8BBE\u5907\u4FE1\u606F"), _react2.default.createElement('i', { className: 'icon-edit', onClick: function onClick(e) {
					window.upTabsData('EditEquipmentITData', 'cache', self.props.itdetails.ITEquipment);
					(0, _constants.openWebView)('/repairing/edit-info/it');
				} }))))), _react2.default.createElement('div', { className: 'maintenance-details-wrap', ref: 'listWrap' }, _react2.default.createElement('div', { className: 'parts-form-list' }, _.map(curDeviceParts || [], function (i, index) {
				var rate = '';
				if (i['partsRate'] == '11%' || i['partsRate'] == '17%') {
					var dispatch = self.props.dispatch;
					var nowData = '';
					if (i['partsRate'] == '11%') {
						nowData = '10%';
					} else {
						nowData = '16%';
					}
					dispatch({
						type: 'itdetails/changePart',
						payload: {
							index: index,
							key: 'partsRate',
							value: nowData
						}
					});
				} else {
					rate = _.findWhere(taxlist, { label: i["partsRate"] });
					rate = rate ? rate['value'] : '';
				}
				var partOperate = _.findWhere(fittingOperation, { value: i["partOperate"] + '' });
				partOperate = partOperate ? partOperate['value'] : '-1';
				// if(){}
				var purchasingPriceNotax = i['purchasingPriceNotax'];

				console.log(i, '这个数据是什么啊啊啊啊');

				var formData = {
					schema: [{
						name: 'partsName', element: 'Input',
						label: '配件名称',
						defaultValue: i['partsName'],
						attr: {
							type: 'text',
							className: '',
							disabled: 'disabled'
						}
					}, {
						name: 'accessoriesReferencePrice', element: 'Input',
						label: '参考维修价',
						defaultValue: i['accessoriesReferencePrice'],
						attr: {
							type: 'tel',
							placeholder: '',
							className: '',
							disabled: 'disabled'
						}
					}, {
						name: 'maintenanceNum', element: 'Input',
						label: '维修数量',
						defaultValue: i["maintenanceNum"],
						attr: {
							type: 'number',
							placeholder: '请输入维修数量',
							className: 'edit-fitting-input'
						},
						events: {
							onChange: function onChange(e) {
								var dispatch = self.props.dispatch;
								dispatch({
									type: 'itdetails/changePart',
									payload: {
										index: index,
										key: 'maintenanceNum',
										value: e[0]
									}
								});
							}
						}
					}, {
						name: 'partOperate', element: 'Select', label: '建议操作',
						defaultValue: [partOperate],
						options: fittingOperation,
						attr: {
							cols: 1,
							className: ''
						},
						events: {
							onChange: function onChange(data) {
								console.log('form rate:', data);
								var dispatch = self.props.dispatch;
								dispatch({
									type: 'itdetails/changePart',
									payload: {
										index: index,
										key: 'partOperate',
										value: data[0][0]
									}
								});
							}
						}
					}, {
						name: 'partsRate', element: 'Select', label: '设备税率',
						defaultValue: [rate],
						options: taxlist,
						attr: {
							cols: 1
						},
						events: {
							onChange: function onChange(data) {
								var dispatch = self.props.dispatch;
								var nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
								if (nowData == '请选择') {
									nowData = '';
								}
								dispatch({
									type: 'itdetails/changePart',
									payload: {
										index: index,
										key: 'partsRate',
										value: nowData
									}
								});
							}
						}
					}, {
						name: 'purchasingPriceNotax', element: 'Input',
						label: '实际维修价',
						defaultValue: i['purchasingPriceNotax'],
						attr: {
							type: 'text',
							placeholder: '请输入实际维修价',
							className: 'edit-equipment-it-input purchasingPrice-after'
						},
						events: {
							onChange: function onChange(e) {
								var dispatch = self.props.dispatch;
								dispatch({
									type: 'itdetails/changePart',
									payload: {
										index: index,
										key: 'purchasingPriceNotax',
										value: window.replaceNnum(e[0])
									}
								});
							}
						}
					}, {
						name: 'form_item_1', element: 'Input',
						label: '设备税金',
						defaultValue: rate && rate != '-1' ? Number(i["purchasingPriceNotax"] / 100 * parseFloat(i['partsRate'])).formatMoney(2, '', '') : '-',
						attr: {
							type: 'text',
							className: 'specail-disabled-input',
							disabled: 'disabled'
						}
					}, {
						name: 'form_item_2', element: 'Input',
						label: '价税合计',
						defaultValue: rate && rate != '-1' && partOperate == '2' ? Number((Number(i["purchasingPriceNotax"]) + i["purchasingPriceNotax"] / 100 * parseFloat(i['partsRate'])) * i["maintenanceNum"]).formatMoney(2, '', '') : '-',
						attr: {
							type: 'text',
							className: 'specail-disabled-input',
							disabled: 'disabled'
						}
					}, {
						name: 'maintenanceRemarks', element: 'Input',
						label: '维修描述',
						defaultValue: i["maintenanceRemarks"],
						attr: {
							type: 'text',
							placeholder: '请输入维修描述',
							className: 'edit-equipment-it-input'
						},
						events: {
							onChange: function onChange(e) {
								var dispatch = self.props.dispatch;
								dispatch({
									type: 'itdetails/changePart',
									payload: {
										index: index,
										key: 'maintenanceRemarks',
										value: e[0]
									}
								});
							}
						}
					}],
					buttons: false,
					changeData: self.changeData.bind(self)
				};
				return _react2.default.createElement('div', { className: 'parts-form-item eps-list-card' }, _react2.default.createElement('i', { className: 'eps-list-card-bgicon' }), _react2.default.createElement('i', { className: 'icon-close', onClick: function onClick(e) {
						return self.removeParts(index);
					} }), _react2.default.createElement(_mobile2.default, { formData: formData }));
			})))), _react2.default.createElement('div', { className: 'eps-footer' }, _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-large', onClick: this.gotoAddParts }, _react2.default.createElement('i', { className: 'icon-add-parts' }), "\u6DFB\u52A0\u914D\u4EF6"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-small', onClick: this.createHandler }, "\u63D0\u4EA4"))));
		}
	}]);

	return MaintenanceDetailsIT;
}(_react.Component);

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MaintenanceDetailsIT);

/***/ }),

/***/ 1973:
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

/**
 * IT维修详单
 */
exports.default = {
	namespace: 'itdetails',
	state: {
		ITEquipment: {}, // 当前设备信息
		ITParts: [] // 设备配件列表
	},
	reducers: {
		changeData: function changeData(state, action) {
			return _extends({}, state, action.payload);
		},

		// 修改配件
		changePart: function changePart(state, action) {
			var data = action.payload;
			console.log('changePart:', data);
			var ITParts = _.clone(state['ITParts']);
			_.each(ITParts, function (i, index) {
				if (index == data['index']) {
					i[data['key']] = data['value'];
				}
			});
			return _.extend({}, state, {
				ITParts: ITParts
			});
		}
	},
	effects: {},
	subscriptions: {}
};

/***/ })

});