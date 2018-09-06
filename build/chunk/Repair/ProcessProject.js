webpackJsonp([16],{

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

/***/ 1830:
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

var RejectTip = function (_Component) {
	_inherits(RejectTip, _Component);

	function RejectTip(props) {
		_classCallCheck(this, RejectTip);

		var _this = _possibleConstructorReturn(this, (RejectTip.__proto__ || Object.getPrototypeOf(RejectTip)).call(this, props));

		_this.state = {
			showB: false
		};
		return _this;
	}

	_createClass(RejectTip, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var self = this;
			var data = this.props.data;
			return _react2.default.createElement('div', { className: "reject-tip animated " + (data.show ? 'slideInLeft' : 'slideOutLeft') }, _react2.default.createElement('div', { className: "reject-tip-s " + (this.state['showB'] ? 'hide' : '') }, _react2.default.createElement('div', { className: 'reject-tip-close icon-close-s', onClick: function onClick(e) {
					return self.props.close();
				} }), _react2.default.createElement('div', { className: 'icon-reject-s' }), _react2.default.createElement('div', { className: 'reject-tip-c' }, _react2.default.createElement('div', { className: 'reject-tip-title' }, "DOA\u5BA1\u6838\u672A\u901A\u8FC7"), _react2.default.createElement('div', { className: 'reject-tip-val' }, "\u62D2\u7EDD\u5907\u6CE8\uFF1A\u7EF4\u4FEE\u8BA2\u5355\u660E\u7EC6\u586B\u5199\u7684\u4E0D\u591F\u6E05\u695A \u2026 ", _react2.default.createElement('span', { onClick: function onClick(e) {
					return _this2.showB(e);
				} }, "\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5")))), _react2.default.createElement('div', { className: "reject-tip-b  animated zoomIn " + (this.state['showB'] ? '' : 'hide') }, _react2.default.createElement('div', { className: 'reject-tip-close icon-close-b', onClick: function onClick(e) {
					return self.props.close();
				} }), _react2.default.createElement('div', { className: 'icon-reject-b' }), _react2.default.createElement('div', { className: 'reject-tip-c' }, _react2.default.createElement('div', { className: 'reject-tip-title' }, "DOA\u5BA1\u6838\u672A\u901A\u8FC7"), _react2.default.createElement('div', { className: 'reject-tip-val' }, "\u7EF4\u4FEE\u8BA2\u5355\u660E\u7EC6\u586B\u5199\u7684\u4E0D\u591F\u6E05\u6670\uFF0C\u65E0\u6CD5\u901A\u8FC7\u5BA1\u6279\uFF0C\u8BF7\u5C06 \u7EF4\u4FEE\u8BBE\u5907ID\u3001\u7EF4\u4FEE\u914D\u4EF6\u3001\u7EF4\u4FEE\u6570\u91CF\u7B49\u586B\u5199\u6E05\u695A\u3002"))));
		}
	}, {
		key: 'showB',
		value: function showB() {
			this.setState({
				showB: true
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log(this);
		}
	}]);

	return RejectTip;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(RejectTip);

/***/ }),

/***/ 1838:
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

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _RepairIt = __webpack_require__(1839);

var ITService = _interopRequireWildcard(_RepairIt);

var _constants = __webpack_require__(197);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function FirstFetch(parame) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getEquipmentList', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: parame
        },
        pager: { 'pageNum': '1', 'pageSize': '1000' }
      }
    })
  });
}
function SecondFetch(parame) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getCOOrderInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: parame
        },
        pager: { 'pageNum': '1', 'pageSize': '1' }
      }
    })
  });
}
function getEvaluate(param) {
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getEvaluate', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: window.eid,
        condition: {
          orderNumber: param
        }
      }
    })
  });
}
exports.default = {
  namespace: 'process',
  state: {
    avatar: {
      avatar_l: 'https://www.joywok.com/public/images/avatar/l.jpg',
      avatar_s: 'https://www.joywok.com/public/images/avatar/s.jpg'
    },
    loading: {
      loading: true,
      fix: true,
      hide: false
    },
    form: {},
    epsDialog: {
      title: '请输入备注',
      buttonIconClass: 'icon-check-i',
      buttonVal: '确认',
      fix: true,
      show: false
    },
    epsTip: {
      show: true
    }
  },
  reducers: {
    changeData: function changeData(state, action) {
      return _extends({}, state, action.payload);
    }
  },
  effects: {
    fetch: /*#__PURE__*/regeneratorRuntime.mark(function fetch(_ref, _ref2) {
      var payload = _ref.payload,
          dispatch = _ref.dispatch;
      var call = _ref2.call,
          put = _ref2.put,
          select = _ref2.select;
      var datas, secondData, type, loading, partList, deviceList, allData;
      return regeneratorRuntime.wrap(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return select();

            case 2:
              datas = _context.sent;
              _context.next = 5;
              return call(SecondFetch, payload);

            case 5:
              secondData = _context.sent;
              type = datas["process"]['type'];
              loading = datas["process"]['loading'];

              loading['loading'] = false;
              loading['hide'] = true;
              partList = [];
              deviceList = [];

              _.each(secondData['data']['body']["detailList"].length == 0 ? secondData['data']['body']["orderList"] : secondData['data']['body']["detailList"], function (i) {
                partList.push(i);
              });
              // if()
              allData = _.extend({
                loading: loading,
                partList: partList,
                storeScrapList: secondData['data']['body']['scrapPageInfo'] ? secondData['data']['body']['scrapPageInfo']['list'] : []
              }, secondData['data']['body'], {
                list: secondData['data']['body']["detailList"].length == 0 ? secondData['data']['body']["orderList"] : secondData['data']['body']["detailList"]
                // list:(secondData['data']['body']["detailList"])//上面的代码存疑，开始说读取orderList里面的
              });

              console.log(secondData['data']['body'], '这个里面返回什么数据呢');
              (0, _constants.getUsers)(allData['storeMan'], 'num', function (resp) {
                var userdata = resp['data'][0];
                dispatch({
                  type: 'process/changeData',
                  payload: {
                    avatar: userdata['avatar']
                  }
                });
              });
              NProgress.done();
              _context.next = 19;
              return put({
                type: 'changeData',
                payload: allData
              });

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, fetch, this);
    }),
    getITOrderInfo: /*#__PURE__*/regeneratorRuntime.mark(function getITOrderInfo(_ref3, _ref4) {
      var payload = _ref3.payload,
          dispatch = _ref3.dispatch;
      var call = _ref4.call,
          put = _ref4.put,
          select = _ref4.select;
      var datas, secondData, loading, partList, deviceList, storeScrapList, allData;
      return regeneratorRuntime.wrap(function getITOrderInfo$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return select();

            case 2:
              datas = _context2.sent;
              _context2.next = 5;
              return call(ITService.getITOrderInfo, payload);

            case 5:
              secondData = _context2.sent;
              loading = datas["process"]['loading'];

              loading['loading'] = false;
              loading['hide'] = true;
              partList = [];
              deviceList = [];

              _.each(secondData['data']['body']['costList'], function (i) {
                if (i['partsName']) {
                  partList.push(i);
                } else {
                  deviceList.push(i);
                }
              });
              if (datas["process"]['processType'] == 'it') {
                _.each(partList, function (i) {
                  var device = _.findWhere(secondData['data']['body']['pageInfo']['list'], { itDeviceName: i['itDeviceName'], itDeviceNumber: i['itDeviceNumber'] });
                  if (device) {
                    i['faCategory'] = device["faCategory"];
                    i['subCategory'] = device["subCategory"];
                  }
                });
              } else {
                _.each(partList, function (i) {
                  var device = _.findWhere(secondData['data']['body']['pageInfo']['list'], { deviceName: i['deviceName'], deviceNumber: i['deviceNumber'] });
                  if (device) {
                    i['faCategory'] = device["faCategory"];
                    i['subCategory'] = device["subCategory"];
                  }
                });
              }
              storeScrapList = [];

              if (datas['process']['type'] == '1' || datas['process']['type'] == '4') {
                if (datas["process"]['processType'] == 'it') {
                  _.each(secondData['data']['body']['scrapPageInfo']['list'], function (i) {
                    if (_.findWhere(secondData['data']['body']["pageInfo"]["list"], { itDeviceName: i['deviceName'] })) {
                      storeScrapList.push(i);
                    }
                  });
                } else {
                  _.each(secondData['data']['body']['scrapPageInfo']['list'], function (i) {
                    if (_.findWhere(secondData['data']['body']["pageInfo"]["list"], { deviceName: i['deviceName'] })) {
                      storeScrapList.push(i);
                    }
                  });
                }
              } else {
                storeScrapList = secondData['data']['body']['scrapPageInfo']['list'];
              }

              allData = _.extend({
                loading: loading,
                partList: partList,
                deviceList: deviceList,
                storeScrapList: storeScrapList
              }, secondData['data']['body']);

              console.log(datas, allData, '12312312312312313');
              // 获取用户头像
              (0, _constants.getUsers)(allData['createEid'], 'num', function (resp) {
                var userdata = resp['data'][0];
                dispatch({
                  type: 'process/changeData',
                  payload: {
                    avatar: userdata['avatar']
                  }
                });
              });
              NProgress.done();
              _context2.next = 21;
              return put({
                type: 'changeData',
                payload: allData
              });

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, getITOrderInfo, this);
    })
  },
  subscriptions: {}
};

/***/ }),

/***/ 1839:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTSIInfo = getTSIInfo;
exports.getITOrderInfo = getITOrderInfo;

var _EpsRequest = __webpack_require__(199);

var _EpsRequest2 = _interopRequireDefault(_EpsRequest);

var _constants = __webpack_require__(197);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 获取TSI信息
// 维修流程－IT 接口
function getTSIInfo() {
  console.log('getTSIInfo  eid:====', eid);
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getTSIInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: {
        eid: eid
      }
    })
  });
}

// TSI确认订单&填写订单维修明细 获取订单信息   http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/repair/getITOrderInfo   
// "{
//     ""eid"": ""用户id"",
//     ""condition"": {
//         ""orderNumber"": ""订单编号""
//     },
//     ""pager"": {
//         ""pageNum"": ""当前页"",
//         ""pageSize"": ""每页条数""
//     }
// }"
function getITOrderInfo(params) {
  console.log('getITOrderInfo eid:====', eid, params);
  return (0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/getITOrderInfo', {
    method: 'POST',
    body: JSON.stringify({
      param: _.extend({
        eid: eid
      }, params)
    })
  });
}

/***/ }),

/***/ 1844:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EpsCosts = undefined;

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

var _popup = __webpack_require__(1849);

var _popup2 = _interopRequireDefault(_popup);

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
   * 费用明细
   */

__webpack_require__(1871);

var isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
var maskProps = void 0;
if (isIPhone) {
  maskProps = {
    onTouchStart: function onTouchStart(e) {
      return e.preventDefault();
    }
  };
}

var EpsCostsDlg = function (_Component) {
  _inherits(EpsCostsDlg, _Component);

  function EpsCostsDlg() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EpsCostsDlg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EpsCostsDlg.__proto__ || Object.getPrototypeOf(EpsCostsDlg)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      sel: ''
    }, _this.onClose = function (sel) {
      _this.setState({ sel: sel });
      _popup2.default.hide();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EpsCostsDlg, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', { className: 'eps-popup-c' }, _react2.default.createElement('div', { className: 'eps-popup-header' }, _react2.default.createElement('div', { className: 'eps-dialog-title', onClick: function onClick() {
          return _this2.onClose('cancel');
        } }, _react2.default.createElement('div', { className: 'eps-dialog-title-c' }, _react2.default.createElement('h3', null, this.props.title)), _react2.default.createElement('div', { className: 'icon-close-b' }))), _react2.default.createElement('div', { className: 'eps-popup-list' }, _react2.default.createElement('div', { className: 'eps-popup-list-item-c' }, this.props.body)));
    }
  }]);

  return EpsCostsDlg;
}(_react.Component);

;

var EpsCosts = exports.EpsCosts = function EpsCosts(props) {
  console.log('Marlin EpsCosts', props);
  _popup2.default.show(_react2.default.createElement(EpsCostsDlg, props), { animationType: 'slide-up', maskProps: maskProps, maskClosable: false });
};

/***/ }),

/***/ 1849:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcDialog = __webpack_require__(212);

var _rcDialog2 = _interopRequireDefault(_rcDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function create(_instanceId, config, content) {
    var afterClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_x) {};

    var props = (0, _extends3['default'])({ prefixCls: 'am-popup', animationType: 'slide-down' }, config);
    var prefixCls = props.prefixCls,
        transitionName = props.transitionName,
        animationType = props.animationType,
        maskTransitionName = props.maskTransitionName,
        _props$maskClosable = props.maskClosable,
        maskClosable = _props$maskClosable === undefined ? true : _props$maskClosable,
        onMaskClose = props.onMaskClose,
        className = props.className;

    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        if (div) {
            _reactDom2['default'].unmountComponentAtNode(div);
            div.parentNode.removeChild(div);
            div = null;
        }
        afterClose(_instanceId);
    }
    var transName = 'am-slide-down';
    if (animationType === 'slide-up') {
        transName = 'am-slide-up';
    }
    // 在 iPhone 上拖动 mask 蒙层、会触发最顶部或最底部的、页面回弹后的留白，解决办法是，禁掉 mask 蒙层的 onTouchStart 事件。
    // 但由于以下原因：
    // Popup 组件底层依赖 [rc-dialog](https://github.com/react-component/dialog)
    // 而 rc-dialog 点击 mask 蒙层关闭弹出框的事件是绑定在 classname 为 rc-dialog-wrap 的 dom 节点上，
    // 此节点是弹出层中主要内容的“父节点”，而非正常的“兄弟节点”。相关 issue https://github.com/react-component/dialog/issues/40
    // 所以、相对于 antd-mobile@0.9.8 以及之前的版本的变化是：
    // 去掉 am-popup-wrap 设置的 `position: fixed; top: 0; bottom: 0; ...` 样式，并给 am-popup 设置 z-index .
    // 另外不使用 rc-dialog 提供的 maskClosable 功能，而改为在这里实现
    var maskProps = {
        onClick: function onClick(e) {
            e.preventDefault();
            if (maskClosable) {
                if (onMaskClose && typeof onMaskClose === 'function') {
                    var res = onMaskClose();
                    if (res && res.then) {
                        res.then(function () {
                            close();
                        });
                    } else {
                        close();
                    }
                } else {
                    close();
                }
            }
        }
    };
    var cls = className ? prefixCls + '-' + animationType + ' ' + className : prefixCls + '-' + animationType;
    _reactDom2['default'].render(_react2['default'].createElement(
        _rcDialog2['default'],
        (0, _extends3['default'])({}, props, { className: cls, visible: true, title: '', footer: '', transitionName: transitionName || transName, maskTransitionName: maskTransitionName || 'am-fade', maskProps: (0, _extends3['default'])({}, props.maskProps, maskProps) }),
        content
    ), div);
    return {
        instanceId: instanceId,
        close: close
    };
} /* tslint:disable:jsx-no-multiline-js */

var ins = {
    defaultInstance: null,
    instances: []
};
var instanceId = 1;

var Popup = function Popup() {
    (0, _classCallCheck3['default'])(this, Popup);
};

exports['default'] = Popup;

Popup.newInstance = function () {
    var j = void 0;
    return {
        show: function show(content, config) {
            j = create(instanceId++, config, content, function (iId) {
                for (var i = 0; i < ins.instances.length; i++) {
                    if (ins.instances[i].instanceId === iId) {
                        ins.instances.splice(i, 1);
                        return;
                    }
                }
            });
            ins.instances.push(j);
        },
        hide: function hide() {
            j.close();
        }
    };
};
Popup.show = function (content, config) {
    Popup.hide();
    ins.defaultInstance = create('0', config, content, function (iId) {
        if (iId === '0') {
            ins.defaultInstance = null;
        }
    });
};
Popup.hide = function () {
    if (ins.defaultInstance) {
        ins.defaultInstance.close();
    }
};
module.exports = exports['default'];

/***/ }),

/***/ 1859:
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
   * 工程类头部用户信息
   * demo
   * <header className="header header-4lines" ref="header">
  					<div className="header-bg"></div>
  					<div className="header-bg-2"></div>
  					<div className="header-c">
  						<UserCardToProject userinfo={ userinfo }/>
  					</div>
  				</header>
   */

var UserCardToProject = function (_Component) {
	_inherits(UserCardToProject, _Component);

	function UserCardToProject() {
		_classCallCheck(this, UserCardToProject);

		return _possibleConstructorReturn(this, (UserCardToProject.__proto__ || Object.getPrototypeOf(UserCardToProject)).apply(this, arguments));
	}

	_createClass(UserCardToProject, [{
		key: 'openWebView',
		value: function openWebView(data) {
			var url = EpsWebRoot + '/#' + data;
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
			var url = EpsWebRoot + '/#/scrapped/' + datas["orderNumber"];
			window.upTabsData('scrap', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'initRepairType',
		value: function initRepairType() {
			var data = this.props.data || { name: '', time: '', 'storeName': '', remark: '', repairType: '' };
			if (data['repairType']) {
				return data['repairType'] == '0' ? '预约' : '紧急';
			} else {
				return '';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var data = this.props.data || { name: '', time: '', 'storeName': '', remark: '', repairType: '' };
			var orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length - 1];
			var fileUrl = '/file/' + orderid;
			if (window.isUnfinishedOrHistory()) {
				fileUrl = '/filehistory/' + orderid;
			}
			console.log('这个卡片里面拿到了什么值呢', this.props);
			return _react2.default.createElement('div', { className: 'user-card' }, _react2.default.createElement('div', { className: 'user-card-c' }, _react2.default.createElement('div', { className: 'user-card-avatar' }, _react2.default.createElement('img', { src: data["avatar"] ? data['avatar']["avatar_s"] : 'https://www.joywok.com/public/images/avatar/l.jpg', alt: '' })), _react2.default.createElement('div', { className: 'user-card-info' }, _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u521B\u5EFA\u4EBA"), _react2.default.createElement('span', { className: 'user-card-val' }, data['name'] || '-')), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u62A5\u4FEE\u7C7B\u578B"), _react2.default.createElement('span', { className: 'user-card-val' }, this.initRepairType()), data['repairType'] == '0' ? _react2.default.createElement('span', { className: 'user-card-time' }, data['time'] ? moment(data['time']).format('YYYY-MM-DD HH:mm') : '-') : ''), _react2.default.createElement('div', { className: 'user-card-info-i' }, _react2.default.createElement('span', { className: 'user-card-label' }, "\u62A5\u4FEE\u9910\u5385"), _react2.default.createElement('span', { className: 'user-card-val' }, data["storeName"] || '-')), _react2.default.createElement('div', { className: 'user-card-info-btns' }, data['remark'] && data['remark'].length != 0 ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openWebView('/remarksdetail');
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val' }, "\u67E5\u770B\u5907\u6CE8")) : '', _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openFileView(fileUrl);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u67E5\u770B\u9644\u4EF6", data['fileCount'] && data['fileCount'] != 0 ? '(' + data['fileCount'] + ')' : '')), data.showScrapTip && data.showScrapTip != 0 && window.userinfo['userType'] == '2' ? _react2.default.createElement('div', { className: 'user-card-info-btn', onClick: function onClick(e) {
					return _this2.openScrapView(e);
				} }, _react2.default.createElement('div', { className: 'user-card-info-btn-bg' }), _react2.default.createElement('div', { className: 'user-card-info-btn-val preview-file' }, "\u8D44\u4EA7\u62A5\u5E9F", data['scrapPageInfo'] && data['scrapPageInfo'].length != 0 ? '(' + data['scrapPageInfo'].length + ')' : '')) : ''))));
		}
	}]);

	return UserCardToProject;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(UserCardToProject);

/***/ }),

/***/ 1867:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".hairline-remove-right-bottom {\n  border-bottom: 0;\n}\n.hairline-remove-right-bottom:after {\n  display: none;\n}\n.hairline-remove-right-bottom-bak:after {\n  display: none;\n}\n.hairline-remove-left-top:before {\n  display: none;\n}\n.am-popup-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  height: 100%;\n  z-index: 999;\n}\n.am-popup-mask-hidden {\n  display: none;\n}\n.am-popup-close {\n  display: none;\n}\n.am-popup {\n  position: fixed;\n  left: 0;\n  width: 100%;\n  background-color: #fff;\n  z-index: 999;\n}\n.am-popup-slide-down {\n  top: 0;\n}\n.am-popup-slide-up {\n  bottom: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1871:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1867);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_postcss-loader@1.3.3@postcss-loader/index.js!./index.css", function() {
			var newContent = require("!!../../../../_css-loader@0.26.4@css-loader/index.js?importLoaders=1!../../../../_postcss-loader@1.3.3@postcss-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1885:
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

var _UserCardToProject = __webpack_require__(1859);

var _UserCardToProject2 = _interopRequireDefault(_UserCardToProject);

var _ProjectCard = __webpack_require__(1177);

var _MoneyShowProject = __webpack_require__(1941);

var _MoneyShowProject2 = _interopRequireDefault(_MoneyShowProject);

var _RejectTip = __webpack_require__(1830);

var _RejectTip2 = _interopRequireDefault(_RejectTip);

var _EpsDialog = __webpack_require__(344);

var _EpsDialog2 = _interopRequireDefault(_EpsDialog);

var _EpsModal = __webpack_require__(198);

var _EpsCosts = __webpack_require__(1844);

var _constants = __webpack_require__(197);

var _mobile = __webpack_require__(336);

var _mobile2 = _interopRequireDefault(_mobile);

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
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * 工程审批 餐厅工程确认
   * type=1,2,3,4
   * //1:餐厅待确认
  	//2：DOA审批
  	//3：审批未通过，餐厅再次审批 3同1 合并，3不需要了
  	//4：餐厅确认订单，评价
   */

var Process = function (_Component) {
	_inherits(Process, _Component);

	function Process() {
		_classCallCheck(this, Process);

		return _possibleConstructorReturn(this, (Process.__proto__ || Object.getPrototypeOf(Process)).apply(this, arguments));
	}

	_createClass(Process, [{
		key: 'FormChange',
		value: function FormChange(values, schema) {
			console.log("values:", values, "FormChange:", schema);
		}
	}, {
		key: 'changeData',
		value: function changeData(data) {}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.todos;
			var view = this._init_view();
			return _react2.default.createElement('div', { className: 'root-container' }, view);
		}
	}, {
		key: '_init_view',
		value: function _init_view() {
			var _this2 = this;

			var self = this;
			var view = '';
			var data = this.props.process;
			var formData = {};
			var rejectTip = '';
			var btn = '';

			console.log('Marlin', this.props);
			if (data['loading']['loading']) {
				btn = _react2.default.createElement('div', { className: 'todo-info-status' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small' }, "\u52A0\u8F7D\u4E2D\u2026"));
			} else {
				// if(data['type']=='100'){
				if (isUnfinishedOrHistory()) {
					var strOrderSta = data['orderState'] && _constants.orderStatus["repair"][data['orderState']] ? _constants.orderStatus["repair"][data['orderState']] : { 'label': '' };
					btn = _react2.default.createElement('div', { className: 'todo-info-status', onClick: function onClick(e) {
							return _this2.openProcessTable();
						} }, _react2.default.createElement('i', { className: 'icon-time-b' }), _react2.default.createElement('div', { className: 'todo-status-c' }, _react2.default.createElement('span', { className: 'todo-status-title' }, strOrderSta["label"]), _react2.default.createElement('span', { className: 'todo-status-tip' }, strOrderSta["val"])));
				} else {

					if (this.props.location.query.type == '1') {
						btn = _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-cancel-small there-btn', onClick: function onClick(e) {
								return _this2.cancel(e);
							} }, "\u53D6\u6D88"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small there-btn', onClick: function onClick(e) {
								return _this2.reject(e);
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large there-btn', onClick: function onClick(e) {
								return _this2.agree(e);
							} }, "\u786E\u8BA4"));
					} else {
						btn = _react2.default.createElement('div', { className: 'eps-btn-wrap' }, _react2.default.createElement('div', { className: 'eps-btn eps-btn-default-small', onClick: function onClick(e) {
								return _this2.reject(e);
							} }, "\u62D2\u7EDD"), _react2.default.createElement('div', { className: 'eps-btn eps-btn-warning-large', onClick: function onClick(e) {
								return _this2.agree(e);
							} }, "\u786E\u8BA4"));
					}
				}
			}

			if (data['type'] == '1') {}
			// rejectTip = <RejectTip data={data['epsTip']} close={(e)=>this.closeTip(e)}></RejectTip>

			// type= 1:餐厅待确认 2：DOA审批 3：审批未通过，餐厅再次审批(3和1合并，3作废) 4：餐厅确认订单，评价
			var EpsDialogComponent = _react2.default.createElement('div', { className: 'appraisal-form' }, _react2.default.createElement(_mobile2.default, { ref: 'form', formData: formData, onChange: function onChange(values, schema) {
					return _this2.FormChange(values, schema);
				} }));

			var showScrapTip = 0;
			if (data['partList'] && data['partList'].length != 0) {
				_.each(data['partList'], function (i) {
					if (Number(i['totalMaintenanceCost']) >= 3000) {
						showScrapTip = showScrapTip + 1;
					}
				});
			}
			if (data['deviceList'] && data['deviceList'].length != 0) {
				_.each(data['deviceList'], function (i) {
					if (Number(i['totalMaintenanceCost']) >= 3000) {
						showScrapTip = showScrapTip + 1;
					}
				});
			}
			console.log(data, showScrapTip, '这个里面拿到的数据是什么呢');
			this.showScrapTip = showScrapTip;
			view = _react2.default.createElement('div', { className: 'root-container-w' }, _react2.default.createElement('header', { className: 'header', ref: 'header' }, _react2.default.createElement('div', { className: 'header-bg-specail' }, _react2.default.createElement('div', { className: 'header-bg' }), _react2.default.createElement('div', { className: 'header-bg-2' })), _react2.default.createElement('div', { className: 'header-c' }, _react2.default.createElement(_UserCardToProject2.default, { data: _.extend(data, {
					name: data['createBy'],
					avatar: data['avatar'],
					time: data['dateAppointment'],
					fileCount: data['fileCount'] || 0,
					uploadPhaseName: data['uploadPhaseName'] || '',
					scrapPageInfo: data['storeScrapList'],
					partList: data['partList'],
					deviceList: data['deviceList'],
					storeNumber: data['storeNumber'],
					scrappType: 'repair',
					scrappOrderType: 'project',
					showScrapTip: showScrapTip,
					addScrap: window.isUnfinishedOrHistory() == false && (this.props.location.query.type == '1' || this.props.location.query.type == '4') ? true : false
				}) }))), _react2.default.createElement('sesstion', { className: 'main' }, _react2.default.createElement('div', { className: 'main-c' }, data['list'] && data['list'].length != 0 ? _react2.default.createElement(_ProjectCard.ProjectCardMore, { itemdata: _.extend(data['list'][0], {
					name: data['list'][0]["deviceName"]
				}), showAllData: true, openView: function openView(e) {
					return self.openItemView('/repairing/project-info', data['list'][0]);
				} }) : '', _react2.default.createElement(_LoadMore2.default, { container: 'main-c', data: data['loading'], onEndReached: function onEndReached(e) {
					_this2.onEndReached(e);
				} }))), data['incidentalList'] && data['incidentalList'].length != 0 ? _react2.default.createElement(_MoneyShowProject2.default, { infoList: data["list"], showFeeDetail: function showFeeDetail(e) {
					return _this2.showFeeDetail(e);
				}, data: _.extend({}, data['incidentalList']) }) : '', rejectTip, _react2.default.createElement('footer', { className: 'footer' }, _react2.default.createElement('div', { className: 'log-btn', onClick: function onClick(e) {
					return _this2.openView('/log');
				} }, _react2.default.createElement('i', { className: 'icon-log' }), _react2.default.createElement('span', null, "\u6D41\u7A0B\u65E5\u5FD7")), btn));
			return view;
		}
	}, {
		key: 'showFeeDetail',
		value: function showFeeDetail(data) {
			// console.log(data,'zzzzzzzzzzzzzz');
			// 
			// 
			// 
			var datas = this.props.process;
			var html = void 0;
			var title = void 0;
			if (data == '1') {
				title = '材料费';
				html = _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'eps-popup-list-h3 materials-fee-h' }, _react2.default.createElement('span', null, "\u5DE5\u7A0B\u540D\u79F0"), _react2.default.createElement('span', null, "\u8D39\u7528 (\xA5) ")), _react2.default.createElement('div', { className: 'eps-popup-list-item materials-fee' }, _.map(datas['incidentalList'], function (i) {
					return _react2.default.createElement('div', null, _react2.default.createElement('span', { className: 'ellipsis' }, i["deviceName"]), _react2.default.createElement('span', null, i['materialCost'] + '(' + i['materialCostTax'] + ')'));
				})), _react2.default.createElement('div', { className: 'eps-popup-list-foot' }, _react2.default.createElement('div', { className: 'eps-popup-list-foot-total' }, _react2.default.createElement('label', null, "\u603B\u4EF7"), _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', null, '153.72'))));
			}

			console.log(datas, 'zzzzzdsadas');
			// return 
			(0, _EpsCosts.EpsCosts)({ title: '采购材料费', body: html });
		}
		// 组件加载完毕

	}, {
		key: 'onEndReached',
		value: function onEndReached() {}
	}, {
		key: 'openItemView',
		value: function openItemView(data) {
			var datas = this.props.process;
			var time = datas['updateDate'].split('.')[0];
			var updateDate = encodeURIComponent(time);
			var url = EpsWebRoot + '/#' + data + '/' + this.props.params['orderid'] + '?updateDate=' + updateDate;
			datas['logType'] = 'repair';
			window.upTabsData('log', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'openView',
		value: function openView(data) {
			var url = EpsWebRoot + '/#' + data + '/' + this.props.params['orderid'];
			var datas = this.props.process;
			datas['logType'] = 'repair';
			window.upTabsData('log', 'cache', datas);
			jw.pushWebView(url);
		}
	}, {
		key: 'closeTip',
		value: function closeTip() {
			var dispatch = this.props.dispatch;
			var data = this.props.process;
			var epsTip = _.extend(data['epsTip'], {
				show: false
			});
			dispatch({
				type: 'process/changeData',
				data: {
					epsTip: epsTip
				}
			});
		}
	}, {
		key: 'closeDialog',
		value: function closeDialog() {
			var dispatch = this.props.dispatch;
			var data = this.props.process;
			var epsDialog = _.extend(data['epsDialog'], {
				show: false
			});
			dispatch({
				type: 'process/changeData',
				data: {
					epsDialog: epsDialog
				}
			});
		}
	}, {
		key: 'cancel',
		value: function cancel() {
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.process;
			var self = this;
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
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderNumber: orderid,
								orderDate: modelData['orderDate'],
								orderState: modelData['orderState'],
								refuseRemarks: memo
							}
							// self.upData(datas,callback)
						} };(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/cancelEquipmentRepairPo', {
						method: 'POST',
						body: JSON.stringify(datas)
					}).then(function (resp) {
						if (resp['data']['success'] == false) {
							if (typeof callback != 'undefined') {
								callback(true);
							}
						} else {
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
		}
		// 拒绝订单

	}, {
		key: 'reject',
		value: function reject() {
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.process;
			var orderState = '';
			if (modelData['type'] == '1') {
				orderState = '4';
			}
			if (modelData['type'] == '2') {
				orderState = '5';
			}
			if (modelData['type'] == '4') {
				orderState = '7';
			}
			if (modelData['type'] == '3') {
				orderState = '8';
			}
			var self = this;
			var rejectDialog = (0, _EpsModal.MemoDialog)({
				title: '是否拒绝该订单?',
				defaultValue: self.rejectMemo ? self.rejectMemo : '',
				btnIconClass: 'icon-reject',
				btnVal: '拒绝',
				placeholder: '拒绝必须输入备注...',
				memorequired: true,
				changeData: function changeData() {},
				onBtnClick: function onBtnClick(memo, callback) {
					var datas = {
						param: {
							eid: window.eid,
							record: {
								updateDate: modelData["updateDate"],
								orderNumber: orderid,
								confirmFlag: false,
								orderState: orderState,
								refuseRemarks: memo
							}
						}
					};
					self.upData(datas, callback);
				},
				onClose: function onClose(memo) {
					self.rejectMemo = memo;
					console.log('approve reject onClose:');
				}
			});
		}
	}, {
		key: 'agree',
		value: function agree() {
			var orderid = this.props.params.orderid.split("&")[0];
			var modelData = this.props.process;
			var orderState = '';
			var self = this;
			if (modelData['type'] != '4') {
				if (modelData['type'] == '1') {
					var storeScrapList = self.props.process['storeScrapList'];
					if (this.showScrapTip != 0 && storeScrapList.length == 0) {
						(0, _EpsModal.AlertBase)({
							tip: '请挑选资产！！',
							icon: 'icon-save-error',
							onOk: function onOk() {}
						});
						return;
					}
					orderState = '4';
				}
				if (modelData['type'] == '2') {
					orderState = '5';
				}
				if (modelData['type'] == '3') {
					orderState = '8';
				}
				var epsDialog = (0, _EpsModal.MemoDialog)({
					title: '请输入备注?',
					defaultValue: self.agreeMemo ? self.agreeMemo : '',
					btnIconClass: 'icon-check',
					btnVal: '确认',
					placeholder: '请输入备注...',
					changeData: function changeData() {},
					memorequired: false,
					onBtnClick: function onBtnClick(memo, callback) {
						var datas = {
							param: {
								eid: window.eid,
								record: {
									updateDate: modelData["updateDate"],
									orderNumber: orderid,
									confirmFlag: 'Approve',
									orderState: orderState,
									refuseRemarks: memo || '',
									storeScrapList: modelData['storeScrapList'] || []
								}
							}
						};
						self.upData(datas, callback);
					},
					onClose: function onClose(memo) {
						self.rejectMemo = memo;
						console.log('approve reject onClose:');
					}
				});
			} else {
				orderState = '7';
				// console.log(window.EvaluateCache,'window.EvaluateCache');
				// 
				var _storeScrapList = self.props.process['storeScrapList'];
				if (this.showScrapTip != 0 && _storeScrapList.length == 0) {
					(0, _EpsModal.AlertBase)({
						tip: '请挑选资产！！',
						icon: 'icon-save-error',
						onOk: function onOk() {}
					});
					return;
				}
				(0, _EpsModal.EvaluateDialog)({
					title: '请输入评价',
					btnIconClass: 'icon-check',
					btnVal: '确认',
					memorequired: false,
					formData: {
						schema: _.map(window.Evaluate, function (val, key) {
							return {
								name: key, element: 'Rate',
								label: val,
								defaultValue: typeof window.EvaluateCache != 'undefined' ? window.EvaluateCache[key] : 0,
								attr: {
									empty: _react2.default.createElement('i', { className: 'icon-star' }),
									full: _react2.default.createElement('i', { className: 'icon-star-active' })
								},
								// rules:[{
								// 	validator:function(rule, value, callback){
								// 		if(value==0){
								// 			callback('请选择'+val+'评价！')	
								// 		}
								// 	  callback();
								// 	}
								// }]
								rules: []
							};
						}).concat({
							name: 'operateMarks', element: 'Textarea',
							defaultValue: typeof window.EvaluateCache != 'undefined' ? window.EvaluateCache['operateMarks'] : '',
							attr: {
								className: 'appraisal-form-feedback',
								placeholder: '请输入备注...'
							},
							rules: []
						}),
						buttons: false,
						changeData: this.changeData.bind(this)
					},
					rules: function rules(data) {
						for (var i in window.Evaluate) {
							if (data[i] == 0) {
								(0, _EpsModal.AlertBase)({
									tip: '请输入' + window.Evaluate[i] + '的评价!',
									icon: 'icon-save-error',
									onOk: function onOk() {}
								});
								return false;
							}
						}
						var hasOne = false;
						_.each(window.Evaluate, function (i, key) {
							if (data[key] <= 2) {
								hasOne = true;
							}
						});
						if (hasOne && data['operateMarks'].length == 0) {
							(0, _EpsModal.AlertBase)({
								tip: '由于评星较低，请输入备注！！',
								icon: 'icon-save-error',
								onOk: function onOk() {}
							});
							return false;
						}
						return true;
					},
					onBtnClick: function onBtnClick(data, callback) {
						data['confirmRepairRmrk'] = data['operateMarks'];
						delete data['operateMarks'];
						(0, _EpsRequest2.default)('/McdEpsApi/joywok/repair/submitCOStoreEvaluate', {
							method: 'POST',
							body: JSON.stringify({
								param: {
									eid: window.eid,
									record: _.extend({
										confirmFlag: 'Approve',
										orderNumber: orderid,
										updateDate: modelData['updateDate'],
										orderState: orderState,
										storeScrapList: modelData['storeScrapList'] || []
									}, data)
								}
							})
						}).then(function (resp) {
							console.log(JSON.stringify({
								eid: window.eid,
								record: _.extend({
									confirmFlag: 'Approve',
									orderNumber: orderid,
									updateDate: modelData['updateDate'],
									orderState: orderState
								}, data)
							}), resp['data'], '反悔了什么呢');
							// return 
							if (resp['data']['success'] == false) {
								if (typeof callback != 'undefined') {
									callback(true);
								}
							} else {
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
						self.rejectMemo = memo;
						console.log('approve reject onClose:');
					}
				});
			}
		}
	}, {
		key: 'upData',
		value: function upData(data) {
			var url = '';
			var modelData = this.props.process;
			if (modelData['type'] == '1') {
				url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluate';
			}
			if (modelData['type'] == '2') {
				url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluate';
				// url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluateAdjust'
			}
			if (modelData['type'] == '4') {
				url = '/McdEpsApi/joywok/repair/submitCOStoreEvaluate';
			}

			if (modelData['type'] == '3') {
				url = '/McdEpsApi/joywok/repair/submitCOSupplierEvaluateAdjust';
			}

			// /McdEpsApi/joywok/repair/submitCOSupplierEvaluateAdjust
			console.log(JSON.stringify(data), '提交的数据', JSON.stringify(window.userinfo), '当前角色', JSON.stringify(modelData), '当前订单信息');

			(0, _EpsRequest2.default)(url, {
				method: 'POST',
				body: JSON.stringify(data)
			}).then(function (resp) {
				if (resp['data']['success'] == false) {
					if (typeof callback != 'undefined') {
						callback(true);
					}
				} else {
					(0, _EpsModal.AlertBase)({
						tip: '已成功提交',
						icon: 'icon-save-success',
						onOk: function onOk() {
							jw.closeWebView();
						}
					});
				}
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;
			var dispatch = this.props.dispatch;
			var modelData = this.props.process;
			var orderid = this.props.params.orderid.split("&")[0];
			this.setHeight();
			dispatch({ type: 'process/fetch', payload: orderid, dispatch: dispatch });
			if (JWReady == true) {
				jw.setFuncBtns([{ type: 4 }]);
			} else {
				window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
					jw.setFuncBtns([{ type: 4 }]);
				});
			}
			if (modelData['type'] == '4') {
				(0, _EpsRequest2.default)('/McdEpsApi/joywok/common/getEvaluate', {
					method: 'POST',
					body: JSON.stringify({
						param: {
							eid: window.eid,
							condition: {
								orderNumber: orderid
							}
						}
					})
				}).then(function (resp) {
					window.Evaluate = resp['data']['body'];
					console.log(window.Evaluate, 'zzzzzzzz');
				});
			}
			PubSub.subscribe('add:scrapped', function (evt, data) {
				dispatch({ type: 'process/changeData', payload: {
						storeScrapList: _.map(data, function (i) {
							return i;
						})
					} });
			});
			window.onJwNavBtnClick = function (data) {
				if (data['type'] == '4') {
					var _modelData = self.props.process;
					(0, _constants.openChart)(_modelData['storeMan'], _modelData['orderNumber'], '测试');
				}
			};
			// console.log(modelData,'modelData');
			/*let title = '餐厅确认订单&评价';
   if( isUnfinishedOrHistory() ){
   	title = '在途订单';
   }else{
   	if(modelData['type'] == '1'){
   		title = '餐厅确认工程维修';
   	}else if(modelData['type'] == '2'){
   		title = 'DOA审批';
   	}else if(modelData['type'] == '3'){
   		title = '调整后审批';
   	}else if(modelData['type'] == '4'){
   		title = '调整与评估';
   	}
   }
   jw.setTitle({title:title});*/
		}
	}, {
		key: 'openProcessTable',
		value: function openProcessTable() {
			var data = this.props.process;
			data['logType'] = 'repair';
			window.upTabsData('log', 'cache', data);
			var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
			jw.pushWebView(url);
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
				var top = $('.div-sticky').height() || 0;
				var upload = $('.upload-file').height() || 0;
				var footer = $('.eps-footer').height() || 0;
				console.log(clientHeight, header, top, footer, upload);
				$('.eps-empty-tip-arrow').css({ height: clientHeight - header - top - footer - upload - 30 + 'px' });
				$('.eps-device-list').css({ height: clientHeight - header - top - footer - upload - 30 + 'px' });
			}, 0);
		}
	}]);

	return Process;
}(_react.Component);

function mapStateToProps(state) {
	var type = state.routing.locationBeforeTransitions.query.type,
	    sta = state.routing.locationBeforeTransitions.query.sta;

	/*let hash = window.location.hash.split('?')[1].split('&');
 let nowHash = {};
 _.each(hash,(i)=>{
 	let split = i.split('=');
 	nowHash[split[0]] = split[1];
 })*/
	console.log('Marlin mapStateToProps', state);
	var nowData = state;
	nowData['process']['type'] = type;
	/*if(nowHash['type']){
 	nowData['process']['type'] = nowHash['type']
 }else{
 	nowData['process']['type'] = '1'
 }*/
	var title = void 0;
	if (isUnfinishedOrHistory()) {
		title = sta == '1' ? '在途订单' : '历史订单';
	} else {
		switch (parseInt(nowData['process']['type'])) {
			case 1:
				title = "餐厅确认工程维修";
				break;
			case 2:
				title = "DOA审批";
				break;
			case 3:
				title = "调整后审批";
				break;
			case 4:
				title = "调整与评估";
				break;
			default:
				title = '';
				break;
		}
	}
	if (JWReady == true) {
		jw.setTitle({ title: title });
	} else {
		window.EpsEvents.off('jwready:ok').on('jwready:ok', function () {
			jw.setTitle({ title: title });
		});
	}
	//1:餐厅待确认
	//2：DOA审批
	//3：审批未通过，餐厅再次审批
	//4：餐厅确认订单，评价
	return nowData;
}
exports.default = (0, _dva.connect)(mapStateToProps)(Process);

/***/ }),

/***/ 1941:
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

var MoneyShow = function (_Component) {
	_inherits(MoneyShow, _Component);

	function MoneyShow() {
		_classCallCheck(this, MoneyShow);

		return _possibleConstructorReturn(this, (MoneyShow.__proto__ || Object.getPrototypeOf(MoneyShow)).apply(this, arguments));
	}

	_createClass(MoneyShow, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var data = this.props.data;
			var self = this;
			var materialCost = 0,
			    materialCostTax = 0,
			    installationFee = 0,
			    installationFeeRate = 0,
			    carCost = 0,
			    carCostTax = 0,
			    hotelCost = 0,
			    hotelCostTax = 0,
			    testCost = 0,
			    testCostTax = 0,
			    distributionCost = 0,
			    distributionCostRate = 0,
			    highCost = 0,
			    highCostTax = 0,
			    otherCost = 0,
			    otherCostTax = 0,
			    allMoney = 0;
			data = _.filter(data, function (i) {
				var info = _.findWhere(self.props.infoList, { deviceNumber: i['deviceNumber'] }) || {};
				return info['operate'] == '2';
			});
			_.each(data, function (i, index) {
				materialCost += Number(i['materialCost']);
				installationFee += Number(i['installationFee']);
				carCost += Number(i['carCost']);
				hotelCost += Number(i['hotelCost']);
				testCost += Number(i['testCost']);
				distributionCost += Number(i['distributionCost']);
				highCost += Number(i['highCost']);
				otherCost += Number(i['otherCost']);
				allMoney += Number(i['materialCost']) + Number(i['installationFee']) + Number(i['carCost']) + Number(i['hotelCost']) + Number(i['testCost']) + Number(i['distributionCost']) + Number(i['highCost']) + Number(i['otherCost']);
				console.log(i, self.props.infoList, '这个里面有什么呢');
				if (index == 0) {
					materialCostTax = i['materialCostTax'];
					installationFeeRate = i['installationFeeRate'];
					carCostTax = i['carCostTax'];
					hotelCostTax = i['hotelCostTax'];
					testCostTax = i['testCostTax'];
					distributionCostRate = i['distributionCostRate'];
					highCostTax = i['highCostTax'];
					otherCostTax = i['otherCostTax'];
				} else {
					materialCostTax = materialCostTax == i['materialCostTax'] ? materialCostTax : '-';
					installationFeeRate = installationFeeRate == i['installationFeeRate'] ? installationFeeRate : '-';
					carCostTax = carCostTax == i['carCostTax'] ? carCostTax : '-';
					hotelCostTax = hotelCostTax == i['hotelCostTax'] ? hotelCostTax : '-';
					testCostTax = testCostTax == i['testCostTax'] ? testCostTax : '-';
					distributionCostRate = distributionCostRate == i['distributionCostRate'] ? distributionCostRate : '-';
					highCostTax = highCostTax == i['highCostTax'] ? highCostTax : '-';
					otherCostTax = otherCostTax == i['otherCostTax'] ? otherCostTax : '-';
				}
			});
			var str_materialCost = this.turnMoney(materialCost) + ' (' + materialCostTax + ')',
			    str_installationFee = this.turnMoney(installationFee) + ' (' + installationFeeRate + ')',
			    str_carCost = this.turnMoney(carCost) + ' (' + carCostTax + ')',
			    str_hotelCost = this.turnMoney(hotelCost) + ' (' + hotelCostTax + ')',
			    str_testCost = this.turnMoney(testCost) + ' (' + testCostTax + ')',
			    str_distributionCost = this.turnMoney(distributionCost) + ' (' + distributionCostRate + ')',
			    str_otherCost = this.turnMoney(otherCost) + ' (' + otherCostTax + ')',
			    str_highCost = this.turnMoney(highCost) + ' (' + highCostTax + ')';
			// str_distributionCost = 'uiashi uiush82342';
			// allMoney = '16546541651014654641';
			return _react2.default.createElement('div', { className: 'money-show' }, _react2.default.createElement('div', { className: 'money-show-c' }, _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_materialCost);
				} }, str_materialCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u6750\u6599\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_installationFee);
				} }, str_installationFee), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u4EBA\u5DE5\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_carCost);
				} }, str_carCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u4EA4\u901A\u8D39\u5C0F\u8BA1(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'money-show-c' }, _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_hotelCost);
				} }, str_hotelCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u4F4F\u5BBF\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_testCost);
				} }, str_testCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u68C0\u6D4B\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_distributionCost);
				} }, str_distributionCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u8FD0\u8F93\u8D39\u5C0F\u8BA1(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'money-show-c' }, _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_highCost);
				} }, str_highCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u767B\u9AD8\u8D39\u7528(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i' }, _react2.default.createElement('div', { className: 'money-show-num ellipsis', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(str_otherCost);
				} }, str_otherCost), _react2.default.createElement('div', { className: 'money-show-tip' }, "\u5176\u4ED6\u8D39\u5C0F\u8BA1(\u542B\u7A0E)")), _react2.default.createElement('div', { className: 'money-show-i specail' }, _react2.default.createElement('div', { className: 'money-specail', onClick: function onClick(e) {
					e.stopPropagation();self.showCostInfo(_this2.turnMoney(allMoney));
				} }, _react2.default.createElement('i', { className: 'icon-money' }), _react2.default.createElement('span', { className: 'ellipsis' }, this.turnMoney(allMoney))), _react2.default.createElement('div', { className: 'money-all-tax' }, "(\u542B\u7A0E)"))), _react2.default.createElement('div', { className: 'money-show-other-tip' }, _react2.default.createElement('i', { className: 'icon-money-tips' }), _react2.default.createElement('div', { className: 'money-show-other-tip-v' }, "\u5728\u5408\u540C\u671F\u5185\uFF0C\u5982\u9047\u589E\u503C\u7A0E\u7A0E\u7387\u53D1\u751F\u53D8\u5316\uFF0C\u8BA2\u5355\u9879\u4E0B\u4E0D\u542B\u7A0E\u4EF7\u4FDD\u6301\u4E0D\u53D8\u3002")));
		}
	}, {
		key: 'showCostInfo',
		value: function showCostInfo(name, length) {
			var len = length ? length : 12;
			if ((0, _constants.DataLength)(name) > len) {
				(0, _EpsModal.AlertInfoBase)({
					text: name
				});
			}
			/*return 
   if( typeof this.props.showFeeDetail === 'function') 
   	this.props.showFeeDetail(type)*/
		}
	}, {
		key: 'turnMoney',
		value: function turnMoney(data) {
			return Number(data).formatMoney(2, '', '');
		}
	}, {
		key: 'countMoney',
		value: function countMoney() {
			var data = this.props.data;
			return data['materialCost'] + data['installationFee'] + data['carCost'] + data['hotelCost'] + data['testCost'] + data['distributionCost'] + data['highCost'] + data['otherCost'];
		}
	}]);

	return MoneyShow;
}(_react.Component);

;

exports.default = (0, _dva.connect)(function (state) {
	return state;
})(MoneyShow);

/***/ })

});