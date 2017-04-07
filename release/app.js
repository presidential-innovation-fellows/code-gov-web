(function (exports,_angular_platformBrowser,_angular_core,import0,_angular_http,_angular_router,_angular_common,_angular_platformBrowser_src_dom_dom_adapter,import2,import3,import4,import5,import7,import9,import10,import11,import12,import13,import14,import15,import16,import17,import18,import4$1,import20,import21,import22,import23,import24,import25,import26,import27,import28,import29,import30,import1,import3$1,import6,import1$1,import10$1,import11$1,import22$1,import60,import14$1,import13$1,import8,import17$1,import18$1,import20$1,import23$1,import15$1,import24$1,import21$1,import43,import44,import45,import46,import47,import48,import54,import55,import56,import57,import58,import59,import61,import62,import63,import64,import65,import66) {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var zone = createCommonjsModule(function (module, exports) {
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(commonjsGlobal, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var Zone$1 = (function (global) {
    if (global.Zone) {
        throw new Error('Zone already loaded.');
    }
    var Zone = (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global.Promise !== ZoneAwarePromise) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZone;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            var oldZone = _currentZone;
            _currentZone = this;
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZone = oldZone;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            var oldZone = _currentZone;
            _currentZone = this;
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZone = oldZone;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            task.runCount++;
            if (task.zone != this)
                throw new Error('A task can only be run in the zone which created it! (Creation: ' + task.zone.name +
                    '; Execution: ' + this.name + ')');
            var previousTask = _currentTask;
            _currentTask = task;
            var oldZone = _currentZone;
            _currentZone = this;
            try {
                if (task.type == 'macroTask' && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZone = oldZone;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this._zoneDelegate.scheduleTask(this, new ZoneTask('microTask', this, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this._zoneDelegate.scheduleTask(this, new ZoneTask('macroTask', this, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this._zoneDelegate.scheduleTask(this, new ZoneTask('eventTask', this, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            var value = this._zoneDelegate.cancelTask(this, task);
            task.runCount = -1;
            task.cancelFn = null;
            return value;
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    
    var ZoneDelegate = (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._hasTaskZS = zoneSpec && (zoneSpec.onHasTask ? zoneSpec : parentDelegate._hasTaskZS);
            this._hasTaskDlgt =
                zoneSpec && (zoneSpec.onHasTask ? parentDelegate : parentDelegate._hasTaskDlgt);
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this.zone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this.zone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this.zone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            try {
                if (this._scheduleTaskZS) {
                    return this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this.zone, targetZone, task);
                }
                else if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == 'microTask') {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
                return task;
            }
            finally {
                if (targetZone == this.zone) {
                    this._updateTaskCount(task.type, 1);
                }
            }
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            try {
                return this._invokeTaskZS ?
                    this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this.zone, targetZone, task, applyThis, applyArgs) :
                    task.callback.apply(applyThis, applyArgs);
            }
            finally {
                if (targetZone == this.zone && (task.type != 'eventTask') &&
                    !(task.data && task.data.isPeriodic)) {
                    this._updateTaskCount(task.type, -1);
                }
            }
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this.zone, targetZone, task);
            }
            else if (!task.cancelFn) {
                throw new Error('Task does not support cancellation, or is already canceled.');
            }
            else {
                value = task.cancelFn(task);
            }
            if (targetZone == this.zone) {
                // this should not be in the finally block, because exceptions assume not canceled.
                this._updateTaskCount(task.type, -1);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            return this._hasTaskZS &&
                this._hasTaskZS.onHasTask(this._hasTaskDlgt, this.zone, targetZone, isEmpty);
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts.microTask > 0,
                    macroTask: counts.macroTask > 0,
                    eventTask: counts.eventTask > 0,
                    change: type
                };
                try {
                    this.hasTask(this.zone, isEmpty);
                }
                finally {
                    if (this._parentDelegate) {
                        this._parentDelegate._updateTaskCount(type, count);
                    }
                }
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = (function () {
        function ZoneTask(type, zone, source, callback, options, scheduleFn, cancelFn) {
            this.runCount = 0;
            this.type = type;
            this.zone = zone;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            this.invoke = function () {
                _numberOfNestedTaskFrames++;
                try {
                    return zone.runTask(self, this, arguments);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            };
        }
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        return ZoneTask;
    }());
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _currentZone = new Zone(null, null);
    var _currentTask = null;
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var _uncaughtPromiseErrors = [];
    var _numberOfNestedTaskFrames = 0;
    function scheduleQueueDrain() {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames == 0 && _microTaskQueue.length == 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (global[symbolPromise]) {
                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
    }
    function scheduleMicroTask(task) {
        scheduleQueueDrain();
        _microTaskQueue.push(task);
    }
    function consoleError(e) {
        var rejection = e && e.rejection;
        if (rejection) {
            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        }
        console.error(e);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (e) {
                        consoleError(e);
                    }
                }
            }
            while (_uncaughtPromiseErrors.length) {
                var _loop_1 = function() {
                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                    try {
                        uncaughtPromiseError.zone.runGuarded(function () {
                            throw uncaughtPromiseError;
                        });
                    }
                    catch (e) {
                        consoleError(e);
                    }
                };
                while (_uncaughtPromiseErrors.length) {
                    _loop_1();
                }
            }
            _isDrainingMicrotaskQueue = false;
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            resolvePromise(promise, state, v);
            // Do not return value or you will break the Promise spec.
        };
    }
    function resolvePromise(promise, state, value) {
        if (promise[symbolState] === UNRESOLVED) {
            if (value instanceof ZoneAwarePromise && value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (isThenable(value)) {
                value.then(makeResolver(promise, state), makeResolver(promise, false));
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        throw new Error('Uncaught (in promise): ' + value +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (e) {
                        var error_1 = e;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        scheduleQueueDrain();
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                    break;
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var delegate = promise[symbolState] ? onFulfilled || forwardResolution : onRejected || forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                resolvePromise(chainPromise, true, zone.run(delegate, null, [promise[symbolValue]]));
            }
            catch (error) {
                resolvePromise(chainPromise, false, error);
            }
        });
    }
    var ZoneAwarePromise = (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (e) {
                resolvePromise(promise, false, e);
            }
        }
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                _a = [res, rej], resolve = _a[0], reject = _a[1];
                var _a;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[__symbol__('Promise')] = global.Promise;
    global.Promise = ZoneAwarePromise;
    function patchThen(NativePromise) {
        var NativePromiseProtototype = NativePromise.prototype;
        var NativePromiseThen = NativePromiseProtototype[__symbol__('then')] =
            NativePromiseProtototype.then;
        NativePromiseProtototype.then = function (onResolve, onReject) {
            var nativePromise = this;
            return new ZoneAwarePromise(function (resolve, reject) {
                NativePromiseThen.call(nativePromise, resolve, reject);
            })
                .then(onResolve, onReject);
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        if (typeof global['fetch'] !== 'undefined') {
            var fetchPromise = void 0;
            try {
                // In MS Edge this throws
                fetchPromise = global['fetch']();
            }
            catch (e) {
                // In Chrome this throws instead.
                fetchPromise = global['fetch']('about:blank');
            }
            // ignore output to prevent error;
            fetchPromise.then(function () { return null; }, function () { return null; });
            if (fetchPromise.constructor != NativePromise &&
                fetchPromise.constructor != ZoneAwarePromise) {
                patchThen(fetchPromise.constructor);
            }
        }
    }
    // This is not part of public API, but it is usefull for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return global.Zone = Zone;
})(typeof window === 'object' && window || typeof self === 'object' && self || commonjsGlobal);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var zoneSymbol = Zone['__symbol__'];
var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || commonjsGlobal;
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = Zone.current.wrap(args[i], source + '_' + i);
        }
    }
    return args;
}

function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function(i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            prototype[name_1] = (function (delegate) {
                return function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}

var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
var isNode = (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
function patchProperty(obj, prop) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop) || { enumerable: true, configurable: true };
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var _prop = '_' + prop;
    desc.set = function (fn) {
        if (this[_prop]) {
            this.removeEventListener(eventName, this[_prop]);
        }
        if (typeof fn === 'function') {
            var wrapFn = function (event) {
                var result;
                result = fn.apply(this, arguments);
                if (result != undefined && !result)
                    event.preventDefault();
            };
            this[_prop] = wrapFn;
            this.addEventListener(eventName, wrapFn, false);
        }
        else {
            this[_prop] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        return this[_prop] || null;
    };
    Object.defineProperty(obj, prop, desc);
}

function patchOnProperties(obj, properties) {
    var onProperties = [];
    for (var prop in obj) {
        if (prop.substr(0, 2) == 'on') {
            onProperties.push(prop);
        }
    }
    for (var j = 0; j < onProperties.length; j++) {
        patchProperty(obj, onProperties[j]);
    }
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i]);
        }
    }
}

var EVENT_TASKS = zoneSymbol('eventTasks');
// For EventTarget
var ADD_EVENT_LISTENER = 'addEventListener';
var REMOVE_EVENT_LISTENER = 'removeEventListener';
function findExistingRegisteredTask(target, handler, name, capture, remove) {
    var eventTasks = target[EVENT_TASKS];
    if (eventTasks) {
        for (var i = 0; i < eventTasks.length; i++) {
            var eventTask = eventTasks[i];
            var data = eventTask.data;
            if (data.handler === handler && data.useCapturing === capture && data.eventName === name) {
                if (remove) {
                    eventTasks.splice(i, 1);
                }
                return eventTask;
            }
        }
    }
    return null;
}
function attachRegisteredEvent(target, eventTask) {
    var eventTasks = target[EVENT_TASKS];
    if (!eventTasks) {
        eventTasks = target[EVENT_TASKS] = [];
    }
    eventTasks.push(eventTask);
}
function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    if (allowDuplicates === void 0) { allowDuplicates = false; }
    var addFnSymbol = zoneSymbol(addFnName);
    var removeFnSymbol = zoneSymbol(removeFnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    function scheduleEventListener(eventTask) {
        var meta = eventTask.data;
        attachRegisteredEvent(meta.target, eventTask);
        return meta.target[addFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
    }
    function cancelEventListener(eventTask) {
        var meta = eventTask.data;
        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
        meta.target[removeFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
    }
    return function zoneAwareAddListener(self, args) {
        var eventName = args[0];
        var handler = args[1];
        var useCapturing = args[2] || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var target = self || _global$1;
        var delegate = null;
        if (typeof handler == 'function') {
            delegate = handler;
        }
        else if (handler && handler.handleEvent) {
            delegate = function (event) { return handler.handleEvent(event); };
        }
        var validZoneHandler = false;
        try {
            // In cross site contexts (such as WebDriver frameworks like Selenium),
            // accessing the handler object here will cause an exception to be thrown which
            // will fail tests prematurely.
            validZoneHandler = handler && handler.toString() === '[object FunctionWrapper]';
        }
        catch (e) {
            // Returning nothing here is fine, because objects in a cross-site context are unusable
            return;
        }
        // Ignore special listeners of IE11 & Edge dev tools, see
        // https://github.com/angular/zone.js/issues/150
        if (!delegate || validZoneHandler) {
            return target[addFnSymbol](eventName, handler, useCapturing);
        }
        if (!allowDuplicates) {
            var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, false);
            if (eventTask) {
                // we already registered, so this will have noop.
                return target[addFnSymbol](eventName, eventTask.invoke, useCapturing);
            }
        }
        var zone = Zone.current;
        var source = target.constructor['name'] + '.' + addFnName + ':' + eventName;
        var data = {
            target: target,
            eventName: eventName,
            name: eventName,
            useCapturing: useCapturing,
            handler: handler
        };
        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
    };
}
function makeZoneAwareRemoveListener(fnName, useCapturingParam) {
    if (useCapturingParam === void 0) { useCapturingParam = true; }
    var symbol = zoneSymbol(fnName);
    var defaultUseCapturing = useCapturingParam ? false : undefined;
    return function zoneAwareRemoveListener(self, args) {
        var eventName = args[0];
        var handler = args[1];
        var useCapturing = args[2] || defaultUseCapturing;
        // - Inside a Web Worker, `this` is undefined, the context is `global`
        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
        // see https://github.com/angular/zone.js/issues/190
        var target = self || _global$1;
        var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, true);
        if (eventTask) {
            eventTask.zone.cancelTask(eventTask);
        }
        else {
            target[symbol](eventName, handler, useCapturing);
        }
    };
}

var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
function patchEventTargetMethods(obj) {
    if (obj && obj.addEventListener) {
        patchMethod(obj, ADD_EVENT_LISTENER, function () { return zoneAwareAddEventListener; });
        patchMethod(obj, REMOVE_EVENT_LISTENER, function () { return zoneAwareRemoveEventListener; });
        return true;
    }
    else {
        return false;
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global$1[className];
    if (!OriginalClass)
        return;
    _global$1[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global$1[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                Object.defineProperty(_global$1[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global$1[className][prop] = OriginalClass[prop];
        }
    }
}

function createNamedFn(name, delegate) {
    try {
        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
    }
    catch (e) {
        // if we fail, we must be CSP, just return delegate.
        return function () {
            return delegate(this, arguments);
        };
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
        proto = Object.getPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
    }
    return delegate;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        data.args[0] = function () {
            task.invoke.apply(this, arguments);
            delete tasksByHandleId[data.handleId];
        };
        data.handleId = setNative.apply(window, data.args);
        tasksByHandleId[data.handleId] = task;
        return task;
    }
    function clearTask(task) {
        delete tasksByHandleId[task.data.handleId];
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var zone = Zone.current;
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (handle.ref && handle.unref) {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
            if (task && typeof task.type === 'string') {
                if (task.cancelFn && task.data.isPeriodic || task.runCount === 0) {
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}

function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}

function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    desc.configurable = true;
    if (!desc.configurable) {
        if (!obj[unconfigurablesKey]) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        obj[unconfigurablesKey][prop] = true;
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (e) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (e) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (e) {
                    descJson = descJson.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + e);
            }
        }
        else {
            throw e;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex'
    .split(',');
var EVENT_TARGET = 'EventTarget';
function eventTargetPatch(_global) {
    var apis = [];
    var isWtf = _global['wtf'];
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        patchEventTargetMethods(type && type.prototype);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(_global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTargetMethods(WS.prototype);
    }
    _global.WebSocket = function (a, b) {
        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
        var proxySocket;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = Object.create(socket);
            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    return socket[propName].apply(socket, arguments);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
        return proxySocket;
    };
    for (var prop in WS) {
        _global.WebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'
    .split(' ');
function propertyDescriptorPatch(_global) {
    if (isNode) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            patchOnProperties(HTMLElement.prototype, eventNames);
        }
        patchOnProperties(XMLHttpRequest.prototype, null);
        if (typeof IDBIndex !== 'undefined') {
            patchOnProperties(IDBIndex.prototype, null);
            patchOnProperties(IDBRequest.prototype, null);
            patchOnProperties(IDBOpenDBRequest.prototype, null);
            patchOnProperties(IDBDatabase.prototype, null);
            patchOnProperties(IDBTransaction.prototype, null);
            patchOnProperties(IDBCursor.prototype, null);
        }
        if (supportsWebSocket) {
            patchOnProperties(WebSocket.prototype, null);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(_global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if (isBrowser && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
        get: function () {
            return true;
        }
    });
    var req = new XMLHttpRequest();
    var result = !!req.onreadystatechange;
    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});
    return result;
}

var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function(i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = Zone.current.wrap(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
    
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if (!isBrowser || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                if (opts.prototype.hasOwnProperty(callback)) {
                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = Zone.current.wrap(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                    }
                }
                else if (opts.prototype[callback]) {
                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                }
            });
        }
        return _registerElement.apply(document, [name, opts]);
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var set = 'set';
var clear = 'clear';
var blockingMethods = ['alert', 'prompt', 'confirm'];
var _global = typeof window === 'object' && window || typeof self === 'object' && self || commonjsGlobal;
patchTimer(_global, set, clear, 'Timeout');
patchTimer(_global, set, clear, 'Interval');
patchTimer(_global, set, clear, 'Immediate');
patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
for (var i = 0; i < blockingMethods.length; i++) {
    var name = blockingMethods[i];
    patchMethod(_global, name, function (delegate, symbol, name) {
        return function (s, args) {
            return Zone.current.run(delegate, _global, args, name);
        };
    });
}
eventTargetPatch(_global);
propertyDescriptorPatch(_global);
patchClass('MutationObserver');
patchClass('WebKitMutationObserver');
patchClass('FileReader');
propertyPatch();
registerElementPatch(_global);
// Treat XMLHTTPRequest as a macrotask.
patchXHR(_global);
var XHR_TASK = zoneSymbol('xhrTask');
var XHR_SYNC = zoneSymbol('xhrSync');
function patchXHR(window) {
    function findPendingTask(target) {
        var pendingTask = target[XHR_TASK];
        return pendingTask;
    }
    function scheduleTask(task) {
        var data = task.data;
        data.target.addEventListener('readystatechange', function () {
            if (data.target.readyState === data.target.DONE) {
                if (!data.aborted) {
                    task.invoke();
                }
            }
        });
        var storedTask = data.target[XHR_TASK];
        if (!storedTask) {
            data.target[XHR_TASK] = task;
        }
        sendNative.apply(data.target, data.args);
        return task;
    }
    function placeholderCallback() { }
    function clearTask(task) {
        var data = task.data;
        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
        // to prevent it from firing. So instead, we store info for the event listener.
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
    }
    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; });
    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
        var zone = Zone.current;
        if (self[XHR_SYNC]) {
            // if the XHR is sync there is no task to schedule, just execute the code.
            return sendNative.apply(self, args);
        }
        else {
            var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
        }
    }; });
    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
        var task = findPendingTask(self);
        if (task && typeof task.type == 'string') {
            // If the XHR has already completed, do nothing.
            if (task.cancelFn == null) {
                return;
            }
            task.zone.cancelTask(task);
        }
        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task
        // to cancel. Do nothing.
    }; });
}
/// GEO_LOCATION
if (_global['navigator'] && _global['navigator'].geolocation) {
    patchPrototype(_global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
}

})));
});

function __assignFn(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
}
function __extendsFn(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __decorateFn(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadataFn(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
}
function __paramFn(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function __awaiterFn(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator.throw(value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
}
// hook global helpers
(function (__global) {
    __global.__assign = (__global && __global.__assign) || Object.assign || __assignFn;
    __global.__extends = (__global && __global.__extends) || __extendsFn;
    __global.__decorate = (__global && __global.__decorate) || __decorateFn;
    __global.__metadata = (__global && __global.__metadata) || __metadataFn;
    __global.__param = (__global && __global.__param) || __paramFn;
    __global.__awaiter = (__global && __global.__awaiter) || __awaiterFn;
})(typeof window !== "undefined" ? window :
    typeof WorkerGlobalScope !== "undefined" ? self :
        typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
            Function("return this;")());

var StateService = (function () {
    function StateService() {
        this._state = {};
    }
    Object.defineProperty(StateService.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    StateService.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    StateService.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    StateService.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    StateService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    StateService.ctorParameters = [];
    return StateService;
}());

var AppComponent = (function () {
    function AppComponent(router, stateService) {
        this.router = router;
        this.stateService = stateService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof _angular_router.NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    };
    AppComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'app',
                    // encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./app.style.css'],
                    templateUrl: './app.template.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = [
        { type: _angular_router.Router, },
        { type: StateService, },
    ];
    return AppComponent;
}());

var FourOhFourComponent = (function () {
    function FourOhFourComponent(stateService) {
        this.stateService = stateService;
        this.stateService.set('section', 'four-oh-four');
    }
    FourOhFourComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'four-oh-four',
                    styleUrls: ['./four-oh-four.style.css'],
                    templateUrl: './four-oh-four.template.html'
                },] },
    ];
    /** @nocollapse */
    FourOhFourComponent.ctorParameters = [
        { type: StateService, },
    ];
    return FourOhFourComponent;
}());

var SeoService = (function () {
    function SeoService(titleService) {
        this.baseTitle = '· Code.gov';
        this.titleService = titleService;
        this.DOM = _angular_platformBrowser_src_dom_dom_adapter.getDOM();
        this.headElement = this.DOM.query('head');
        this.metaDescription = this.getOrCreateMetaElement('description');
        this.robots = this.getOrCreateMetaElement('robots');
    }
    SeoService.prototype.getTitle = function () {
        return this.titleService.getTitle();
    };
    SeoService.prototype.setTitle = function (newTitle, baseTitle) {
        if (baseTitle === void 0) { baseTitle = false; }
        if (baseTitle === true)
            newTitle += ' · Code.gov';
        this.titleService.setTitle(newTitle);
    };
    SeoService.prototype.getMetaDescription = function () {
        return this.metaDescription.getAttribute('content');
    };
    SeoService.prototype.setMetaDescription = function (description) {
        this.metaDescription.setAttribute('content', description);
    };
    SeoService.prototype.getMetaRobots = function () {
        return this.robots.getAttribute('content');
    };
    SeoService.prototype.setMetaRobots = function (robots) {
        this.robots.setAttribute('content', robots);
    };
    SeoService.prototype.getOrCreateMetaElement = function (name) {
        var el;
        el = this.DOM.query('meta[name=' + name + ']');
        if (el === null) {
            el = this.DOM.createElement('meta');
            el.setAttribute('name', name);
            this.headElement.appendChild(el);
        }
        return el;
    };
    SeoService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    SeoService.ctorParameters = [
        { type: _angular_platformBrowser.Title, },
    ];
    return SeoService;
}());

var HomeComponent = (function () {
    function HomeComponent(stateService, seoService) {
        this.stateService = stateService;
        this.seoService = seoService;
        this.url = 'https://pif.gov';
        this.stateService.set('section', 'home');
        this.seoService.setTitle('Code.gov', false);
        this.seoService.setMetaDescription('Code.gov is a platform designed to improve access to the federal government’s custom-developed software.');
    }
    HomeComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    // The selector is what angular internally uses
                    // for `document.querySelectorAll(selector)` in our index.html
                    // where, in this case, selector is the string 'home'
                    selector: 'home',
                    styleUrls: ['./home.style.css'],
                    templateUrl: './home.template.html'
                },] },
    ];
    /** @nocollapse */
    HomeComponent.ctorParameters = [
        { type: StateService, },
        { type: SeoService, },
    ];
    return HomeComponent;
}());

var BannerArtComponent = (function () {
    function BannerArtComponent() {
    }
    BannerArtComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    // The selector is what angular internally uses
                    // for `document.querySelectorAll(selector)` in our index.html
                    // where, in this case, selector is the string 'home'
                    selector: 'banner-art',
                    styleUrls: ['./banner-art.style.css'],
                    templateUrl: './banner-art.template.html'
                },] },
    ];
    /** @nocollapse */
    BannerArtComponent.ctorParameters = [];
    return BannerArtComponent;
}());

var root = createCommonjsModule(function (module, exports) {
"use strict";
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof commonjsGlobal == 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}
});

function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;

var isFunction_1$1 = {
	isFunction: isFunction_2
};

var isArray_1$1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

var isArray = {
	isArray: isArray_1$1
};

function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;

var isObject_1$1 = {
	isObject: isObject_2
};

// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1$2 = { e: {} };

var errorObject = {
	errorObject: errorObject_1$2
};

var errorObject_1$1 = errorObject;
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1$1.errorObject.e = e;
        return errorObject_1$1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;


var tryCatch_1$1 = {
	tryCatch: tryCatch_2
};

var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$3(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;

var UnsubscriptionError_1$1 = {
	UnsubscriptionError: UnsubscriptionError_2
};

var isArray_1 = isArray;
var isObject_1 = isObject_1$1;
var isFunction_1$3 = isFunction_1$1;
var tryCatch_1 = tryCatch_1$1;
var errorObject_1 = errorObject;
var UnsubscriptionError_1 = UnsubscriptionError_1$1;
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1$3.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;

var Subscription_1$2 = {
	Subscription: Subscription_2
};

var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};

var Observer = {
	empty: empty
};

var root_1$2 = root;
var Symbol = root_1$2.root.Symbol;
var $$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';

var rxSubscriber = {
	$$rxSubscriber: $$rxSubscriber
};

var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = isFunction_1$1;
var Subscription_1$1 = Subscription_1$2;
var Observer_1$1 = Observer;
var rxSubscriber_1$2 = rxSubscriber;
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$2(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1$1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1$1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1$2.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1$1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$2(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

var Subscriber_1$2 = {
	Subscriber: Subscriber_2
};

var Subscriber_1$1 = Subscriber_1$2;
var rxSubscriber_1$1 = rxSubscriber;
var Observer_1 = Observer;
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1$1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1$1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1$1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1$1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1$1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;

var toSubscriber_1$1 = {
	toSubscriber: toSubscriber_2
};

var root_1$3 = root;
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var getSymbolObservable_1 = getSymbolObservable;
var $$observable = getSymbolObservable(root_1$3.root);

var observable = {
	getSymbolObservable: getSymbolObservable_1,
	$$observable: $$observable
};

var root_1 = root;
var toSubscriber_1 = toSubscriber_1$1;
var observable_1 = observable;
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
var Observable_2 = Observable;

var Observable_1$1 = {
	Observable: Observable_2
};

var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends$4(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
var ObjectUnsubscribedError_2 = ObjectUnsubscribedError;

var ObjectUnsubscribedError_1$1 = {
	ObjectUnsubscribedError: ObjectUnsubscribedError_2
};

var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1$4 = Subscription_1$2;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends$5(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1$4.Subscription));
var SubjectSubscription_2 = SubjectSubscription;

var SubjectSubscription_1$1 = {
	SubjectSubscription: SubjectSubscription_2
};

var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = Observable_1$1;
var Subscriber_1 = Subscriber_1$2;
var Subscription_1 = Subscription_1$2;
var ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1$1;
var SubjectSubscription_1 = SubjectSubscription_1$1;
var rxSubscriber_1 = rxSubscriber;
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends$1(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends$1(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
var Subject_2 = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends$1(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

var ModalService = (function () {
    function ModalService() {
        this.modalActivation = new Subject_2();
        // tslint:disable-next-line:member-ordering
        this.modalActivated$ = this.modalActivation.asObservable();
    }
    ModalService.prototype.showModal = function (modalData) {
        this.modalActivation.next(modalData);
    };
    ModalService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ModalService.ctorParameters = [];
    return ModalService;
}());

var ModalComponent = (function () {
    function ModalComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        modalService.modalActivated$.subscribe(function (modal) {
            _this.description = modal['description'];
            _this.title = modal['title'];
            _this.url = modal['url'];
            _this.visible = true;
        });
    }
    ModalComponent.prototype.close = function () {
        this.visible = false;
    };
    ModalComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'modal',
                    styleUrls: ['./modal.style.css'],
                    templateUrl: './modal.template.html'
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = [
        { type: ModalService, },
    ];
    return ModalComponent;
}());

var ModalModule = (function () {
    function ModalModule() {
    }
    ModalModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule
                    ],
                    declarations: [
                        ModalComponent
                    ],
                    exports: [
                        ModalComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = [];
    return ModalModule;
}());

var PrivacyPolicyComponent = (function () {
    function PrivacyPolicyComponent(seoService, stateService) {
        this.seoService = seoService;
        this.stateService = stateService;
        this.stateService.set('section', 'privacy-policy');
        this.seoService.setTitle('Privacy Policy', true);
        this.seoService.setMetaDescription('Learn about how Code.gov is using cookies and analytics.');
        this.seoService.setMetaRobots('Index, Follow');
    }
    PrivacyPolicyComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'privacy-policy',
                    styleUrls: ['./privacy-policy.style.css'],
                    templateUrl: './privacy-policy.template.html'
                },] },
    ];
    /** @nocollapse */
    PrivacyPolicyComponent.ctorParameters = [
        { type: SeoService, },
        { type: StateService, },
    ];
    return PrivacyPolicyComponent;
}());

var APP_COMPONENTS = [
    AppComponent,
    BannerArtComponent,
    FourOhFourComponent,
    HomeComponent,
    PrivacyPolicyComponent,
];

var ROUTES$1 = [
    { path: '', component: HomeComponent },
    { path: 'explore-code', loadChildren: 'src/app/components/explore-code/explore-code.module#ExploreCodeModule' },
    { path: 'policy-guide', loadChildren: 'src/app/components/policy-guide/policy-guide.module#PolicyGuideModule' },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: '**', component: FourOhFourComponent }
];

var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$5 = Observable_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends$7(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1$5.Observable));
var ScalarObservable_2 = ScalarObservable;

var ScalarObservable_1$1 = {
	ScalarObservable: ScalarObservable_2
};

var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$6 = Observable_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends$8(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1$6.Observable));
var EmptyObservable_2 = EmptyObservable;

var EmptyObservable_1$1 = {
	EmptyObservable: EmptyObservable_2
};

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
var isScheduler_2 = isScheduler;

var isScheduler_1$1 = {
	isScheduler: isScheduler_2
};

var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1$4 = Observable_1$1;
var ScalarObservable_1 = ScalarObservable_1$1;
var EmptyObservable_1 = EmptyObservable_1$1;
var isScheduler_1 = isScheduler_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends$6(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` Scheduler, which means the `next`
     * notifications are sent synchronously, although with a different Scheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1$4.Observable));
var ArrayObservable_2 = ArrayObservable;

var ArrayObservable_1$1 = {
	ArrayObservable: ArrayObservable_2
};

var ArrayObservable_1 = ArrayObservable_1$1;
var of_1$1 = ArrayObservable_1.ArrayObservable.of;

var of$2 = {
	of: of_1$1
};

var Observable_1$3 = Observable_1$1;
var of_1 = of$2;
Observable_1$3.Observable.of = of_1.of;

var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return Observable_2.of({ res: 'I am data' });
    };
    DataResolver.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    DataResolver.ctorParameters = [];
    return DataResolver;
}());
// an array of services to resolve routes with data
var APP_RESOLVER_PROVIDERS = [
    DataResolver
];

var ExternalLinkDirective = (function () {
    function ExternalLinkDirective(el, modalService) {
        this.el = el;
        this.modalService = modalService;
        this.modalContent = {
            description: 'But you probably knew that already.',
            description2: 'Continue to the link below:',
            title: 'You are now leaving Code.gov',
            url: ''
        };
    }
    ExternalLinkDirective.prototype.onClick = function (event) {
        event.preventDefault();
        this.modalContent['url'] = this.el.nativeElement.getAttribute('href');
        this.modalService.showModal(this.modalContent);
    };
    ExternalLinkDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[external-link]',
                    host: {
                        '(click)': 'onClick($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    ExternalLinkDirective.ctorParameters = [
        { type: _angular_core.ElementRef, },
        { type: ModalService, },
    ];
    return ExternalLinkDirective;
}());

var MobileService = (function () {
    function MobileService() {
        this.mobileMenuActive = new Subject_2();
        this.activeMobileMenu$ = this.mobileMenuActive.asObservable();
        this.active = false;
    }
    MobileService.prototype.changeMenuStatus = function () {
        this.mobileMenuActive.next(this.active);
    };
    MobileService.prototype.hideMenu = function () {
        this.active = false;
        this.changeMenuStatus();
    };
    MobileService.prototype.toggleMenu = function () {
        this.active = !this.active;
        this.changeMenuStatus();
    };
    MobileService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    MobileService.ctorParameters = [];
    return MobileService;
}());

var ToggleMenuDirective = (function () {
    function ToggleMenuDirective(el, mobileService) {
        this.el = el;
        this.mobileService = mobileService;
        this.toggle = JSON.parse(this.el.nativeElement.getAttribute('aria-pressed'));
    }
    ToggleMenuDirective.prototype.onClick = function (event) {
        event.preventDefault();
        this.mobileService.toggleMenu();
        this.togglePressed();
    };
    ToggleMenuDirective.prototype.togglePressed = function () {
        this.toggle = !this.toggle;
        this.el.nativeElement.setAttribute('aria-pressed', this.toggle);
    };
    ToggleMenuDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[toggle-menu]',
                    host: {
                        '(click)': 'onClick($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    ToggleMenuDirective.ctorParameters = [
        { type: _angular_core.ElementRef, },
        { type: MobileService, },
    ];
    return ToggleMenuDirective;
}());

var LanguageIconPipe$$1 = (function () {
    function LanguageIconPipe$$1() {
    }
    LanguageIconPipe$$1.prototype.transform = function (value) {
        switch (value) {
            case 'html':
                value = 'html5';
                break;
            case 'css':
                value = 'css3';
                break;
            default:
                break;
        }
        if (LANGUAGES.indexOf(value) > -1) {
            return value;
        }
        else {
            return 'code_badge';
        }
    };
    LanguageIconPipe$$1.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'languageIcon'
                },] },
    ];
    /** @nocollapse */
    LanguageIconPipe$$1.ctorParameters = [];
    return LanguageIconPipe$$1;
}());

var LANGUAGES = [
    'android',
    'angular',
    'appcelerator',
    'apple',
    'appstore',
    'aptana',
    'asterisk',
    'atlassian',
    'atom',
    'aws',
    'backbone',
    'bing_small',
    'bintray',
    'bitbucket',
    'blackberry',
    'bootstrap',
    'bower',
    'brackets',
    'bugsense',
    'celluloid',
    'chrome',
    'cisco',
    'clojure',
    'clojure_alt',
    'cloud9',
    'coda',
    'code',
    'codeigniter',
    'codepen',
    'code_badge',
    'codrops',
    'coffeescript',
    'compass',
    'composer',
    'creativecommons',
    'creativecommons_badgespan',
    'css3',
    'css3_full',
    'cssdeck',
    'css_tricks',
    'dart',
    'database',
    'debian',
    'digital-ocean',
    'django',
    'dlang',
    'docker',
    'doctrine',
    'dojo',
    'dotnet',
    'dreamweaver',
    'dropbox',
    'drupal',
    'eclipse',
    'ember',
    'envato',
    'erlang',
    'extjs',
    'firebase',
    'firefox',
    'fsharp',
    'ghost',
    'ghost_small',
    'github',
    'github_alt',
    'github_badge',
    'github_full',
    'git_branch',
    'git_commitgit_pull_request',
    'git_compare',
    'git_merge',
    'gnu',
    'go',
    'google-cloud-platform',
    'google_drive',
    'grails',
    'groovy',
    'grunt',
    'gulp',
    'hackernews',
    'haskell',
    'heroku',
    'html5',
    'html5_3d_effects',
    'html5_connectivity',
    'html5_device_access',
    'html5_multimedia',
    'ie',
    'illustrator',
    'intellij',
    'ionic',
    'java',
    'javascript',
    'javascript_badge',
    'javascript_shield',
    'jekyll_small',
    'jenkins',
    'jira',
    'joomla',
    'jquery',
    'jquery_ui',
    'komodo',
    'krakenjs',
    'krakenjs_badge',
    'laravel',
    'less',
    'linux',
    'magento',
    'mailchimp',
    'markdown',
    'materializecss',
    'meteor',
    'meteorfull',
    'mitlicence',
    'modernizr',
    'mongodb',
    'mootools',
    'mootools_badge',
    'mozilla',
    'msql_server',
    'mysql',
    'nancy',
    'netbeans',
    'netmagazine',
    'nginx',
    'nodejs',
    'nodejs_small',
    'npm',
    'onedrive',
    'openshift',
    'opensource',
    'opera',
    'perl',
    'phonegap',
    'photoshop',
    'php',
    'postgresql',
    'prolog',
    'python',
    'rackspace',
    'raphael',
    'rasberry_pi',
    'react',
    'redhat',
    'redis',
    'requirejs',
    'responsive',
    'ruby',
    'ruby_on_rails',
    'ruby_rough',
    'rust',
    'safari',
    'sass',
    'scala',
    'scriptcs',
    'scrum',
    'senchatouch',
    'sizzlejs',
    'smashing_magazine',
    'snap_svg',
    'sqllite',
    'stackoverflow',
    'streamline',
    'stylus',
    'sublime',
    'swift',
    'symfony',
    'symfony_badge',
    'techcrunch',
    'terminal',
    'terminal_badge',
    'travis',
    'trello',
    'typo3',
    'ubuntu',
    'uikit',
    'unity_small',
    'vim',
    'visualstudio',
    'w3c',
    'webplatform',
    'windows',
    'wordpress',
    'yahoo',
    'yahoo_small',
    'yeoman',
    'yii',
    'zend'
];

var pluralize = createCommonjsModule(function (module, exports) {
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // Node.
    module.exports = pluralize();
  } else if (typeof define === 'function' && define.amd) {
    // AMD, registers as an anonymous module.
    define(function () {
      return pluralize();
    });
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Title case a string.
   *
   * @param  {string} str
   * @return {string}
   */
  function toTitleCase (str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) {
      return token.toUpperCase();
    }

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return toTitleCase(token);
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate$$1 (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {String}   token
   * @param  {String}   word
   * @param  {Array}    collection
   * @return {String}
   */
  function sanitizeWord (token, word, collection) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = collection.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = collection[len];

      // If the rule passes, return the replacement.
      if (rule[0].test(word)) {
        return word.replace(rule[0], function (match, index, word) {
          var result = interpolate$$1(rule[1], arguments);

          if (match === '') {
            return restoreCase(word[index - 1], result);
          }

          return restoreCase(match, result);
        });
      }
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {String}  word
   * @param  {Number}  count
   * @param  {Boolean} inclusive
   * @return {String}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {String} single
   * @param {String} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/i, '$1sis'],
    [/(^analy)(?:sis|ses)$/i, '$1sis'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(e[mn]u)s?$/i, '$1'],
    [/(movie|twelve)s$/i, '$1'],
    [/(cris|test|diagnos)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'advice',
    'adulthood',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'athletics',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'commerce',
    'cod',
    'cooperation',
    'corps',
    'digestion',
    'debris',
    'diabetes',
    'energy',
    'equipment',
    'elk',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'trout',
    'traffic',
    'transporation',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /pox$/i, // "chickpox", "smallpox"
    /ois$/i,
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /sheep$/i,
    /measles$/i,
    /[^aeiou]ese$/i // "chinese", "japanese"
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
});



var pluralize$2 = Object.freeze({
	default: pluralize,
	__moduleExports: pluralize
});

var PluralizePipe = (function () {
    function PluralizePipe() {
    }
    PluralizePipe.prototype.transform = function (value, arg) {
        return pluralize$2.plural(value);
    };
    PluralizePipe.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'pluralize'
                },] },
    ];
    /** @nocollapse */
    PluralizePipe.ctorParameters = [];
    return PluralizePipe;
}());

var TruncatePipe = (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, arg) {
        /*
          This check follows the same behavior as Angular 2 standard
          pipes that handle strings such as UppercasePipe.
          Note that a returned null value gets converted to an
          empty string in the template where this pipe is used, which prevents
          problems if this pipe is chained with others. See truncate.pipe.spec.ts
          for tests that illustrate this behavior.
        */
        if (value == null) {
            return null;
        }
        var limit = parseInt(arg, 10) || 10;
        var trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'truncate'
                },] },
    ];
    /** @nocollapse */
    TruncatePipe.ctorParameters = [];
    return TruncatePipe;
}());

var AppPipesModule = (function () {
    function AppPipesModule() {
    }
    AppPipesModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule
                    ],
                    declarations: [
                        LanguageIconPipe$$1,
                        PluralizePipe,
                        TruncatePipe
                    ],
                    exports: [
                        LanguageIconPipe$$1,
                        PluralizePipe,
                        TruncatePipe
                    ]
                },] },
    ];
    /** @nocollapse */
    AppPipesModule.ctorParameters = [];
    return AppPipesModule;
}());

var AGENCIES = [
    {
        id: 'CFPB',
        name: 'Consumer Financial Protection Bureau'
    },
    {
        id: 'USDA',
        name: 'Department of Agriculture'
    },
    {
        id: 'DOC',
        name: 'Department of Commerce'
    },
    {
        id: 'DOE',
        name: 'Department of Energy'
    },
    {
        id: 'DOL',
        name: 'Department of Labor'
    },
    {
        id: 'TRE',
        name: 'Department of the Treasury'
    },
    {
        id: 'VA',
        name: 'Department of Veterans Affairs'
    },
    {
        id: 'EPA',
        name: 'Environmental Protection Agency'
    },
    {
        id: 'EOP',
        name: 'Executive Office of the President'
    },
    {
        id: 'GSA',
        name: 'General Services Administration'
    },
    {
        id: 'NASA',
        name: 'NASA'
    },
    {
        id: 'NARA',
        name: 'National Archives and Records Administration'
    },
    {
        id: 'OPM',
        name: 'Office of Personnel Management'
    }
];

var AgencyService = (function () {
    function AgencyService() {
        this.agencies = AGENCIES;
    }
    AgencyService.prototype.getAgencies = function () {
        return this.agencies;
    };
    AgencyService.prototype.getAgency = function (id) {
        return this.agencies.filter(function (agency) { return agency.id === id; })[0];
    };
    AgencyService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    AgencyService.ctorParameters = [];
    return AgencyService;
}());

var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1$4 = Subscriber_1$2;
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map$2(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
var map_2 = map$2;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
var MapOperator_1 = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends$9(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1$4.Subscriber));

var map_1$1 = {
	map: map_2,
	MapOperator: MapOperator_1
};

var Observable_1$7 = Observable_1$1;
var map_1 = map_1$1;
Observable_1$7.Observable.prototype.map = map_1.map;

var ReposService = (function () {
    function ReposService(http) {
        this.http = http;
    }
    ReposService.prototype.getJsonFile = function () {
        return this.http.get('assets/repos.json')
            .map(function (response) { return response.json(); });
    };
    ReposService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ReposService.ctorParameters = [
        { type: _angular_http.Http, },
    ];
    return ReposService;
}());

// Application wide providers
var APP_PROVIDERS = APP_RESOLVER_PROVIDERS.concat([
    AgencyService,
    MobileService,
    ModalService,
    ReposService,
    SeoService,
    StateService
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_platformBrowser.BrowserModule,
                        _angular_http.HttpModule,
                        ModalModule,
                        _angular_router.RouterModule.forRoot(ROUTES$1, { useHash: true }),
                        AppPipesModule
                    ],
                    declarations: [
                        APP_COMPONENTS,
                        ExternalLinkDirective,
                        ToggleMenuDirective,
                    ],
                    providers: [
                        { provide: _angular_common.LocationStrategy, useClass: _angular_common.HashLocationStrategy },
                        APP_PROVIDERS
                    ],
                    bootstrap: [AppComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [
        { type: _angular_core.ApplicationRef, },
    ];
    return AppModule;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var styles = ['@charset "UTF-8";\nhtml[_ngcontent-%COMP%] {\n  box-sizing: border-box; }\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::after, *[_ngcontent-%COMP%]::before {\n  box-sizing: inherit; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeInUp {\n  from {\n    -moz-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -moz-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    -moz-transform: translateY(0.5em);\n    -ms-transform: translateY(0.5em);\n    -o-transform: translateY(0.5em);\n    transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@-moz-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\nbody[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\nlabel[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\na[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 3px rgba(50, 58, 69, 0.25), 0 0 7px rgba(50, 58, 69, 0.25);\n  outline: 0; }\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  color: #323a45;\n  font-family: "TT Lakes", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;\n  font-weight: 500; }\n  h1[_ngcontent-%COMP%]:first-child, h2[_ngcontent-%COMP%]:first-child, h3[_ngcontent-%COMP%]:first-child, h4[_ngcontent-%COMP%]:first-child, h5[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]:first-child {\n    margin-top: 0; }\n\np[_ngcontent-%COMP%] {\n  color: #5b616b; }\n  @media screen and (min-width: 40em) {\n    p[_ngcontent-%COMP%] {\n      font-size: 1.1em; } }\n\n.usa-button[_ngcontent-%COMP%], .usa-button.usa-button-big[_ngcontent-%COMP%], .usa-button-primary.usa-button-big[_ngcontent-%COMP%], .usa-button[_ngcontent-%COMP%]:visited.usa-button-big, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big, button.usa-button-big[_ngcontent-%COMP%], [type="button"].usa-button-big[_ngcontent-%COMP%], [type="submit"].usa-button-big[_ngcontent-%COMP%], [type="reset"].usa-button-big[_ngcontent-%COMP%], [type="image"].usa-button-big[_ngcontent-%COMP%] {\n  -webkit-transition: all 0.2s ease;\n  -moz-transition: all 0.2s ease;\n  transition: all 0.2s ease; }\n  .usa-button[_ngcontent-%COMP%]:hover, .usa-button.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button-primary.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button[_ngcontent-%COMP%]:visited.usa-button-big:hover, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big:hover, button.usa-button-big[_ngcontent-%COMP%]:hover, [type="button"].usa-button-big[_ngcontent-%COMP%]:hover, [type="submit"].usa-button-big[_ngcontent-%COMP%]:hover, [type="reset"].usa-button-big[_ngcontent-%COMP%]:hover, [type="image"].usa-button-big[_ngcontent-%COMP%]:hover {\n    -webkit-transform: translateY(-2px);\n    -moz-transform: translateY(-2px);\n    -ms-transform: translateY(-2px);\n    -o-transform: translateY(-2px);\n    transform: translateY(-2px); }\n\n.about[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border: 1px solid #e9e9e9;\n  box-sizing: border-box;\n  padding: 0.5em; }\n  @media screen and (min-width: 40em) {\n    .about[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n      padding: 1em; } }\n\nbody[_ngcontent-%COMP%] {\n  background-color: #ffffff; }\n\n.about[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f1f1f1;\n  padding: 2em 0 1em; }\n  @media screen and (min-width: 40em) {\n    .about[_ngcontent-%COMP%] {\n      padding: 4em 0; } }\n  .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n    margin: 0 auto;\n    text-align: center; }\n    @media screen and (min-width: 30.0625em) {\n      .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n        max-width: 43em; } }\n    .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      font-size: 1.75em;\n      margin: 0 auto;\n      max-width: 17em; }\n      @media screen and (min-width: 30.0625em) {\n        .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n          font-size: 2em; } }\n      @media screen and (min-width: 40em) {\n        .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n          font-size: 4rem; } }\n    .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      font-size: 1em; }\n      @media screen and (min-width: 40em) {\n        .about[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n          font-size: 1.2em; } }\n  .about[_ngcontent-%COMP%]   .usa-button[_ngcontent-%COMP%] {\n    background-color: #42519F; }\n    .about[_ngcontent-%COMP%]   .usa-button[_ngcontent-%COMP%]:hover {\n      background-color: #333f7b; }\n\n.about-actions[_ngcontent-%COMP%] {\n  margin-top: 2em;\n  padding: 0; }\n  @media screen and (min-width: 40em) {\n    .about-actions[_ngcontent-%COMP%] {\n      margin-top: 4em; } }\n  .about-actions[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.3em;\n    margin-top: 0; }\n  .about-actions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin-bottom: 2em;\n    padding-left: 3em;\n    position: relative; }\n    .about-actions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n      left: 1em;\n      position: absolute;\n      top: 1em; }\n    .about-actions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      color: #23c0ba;\n      font-size: 1.2em; }\n  .about-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.95em; }\n\n.banner[_ngcontent-%COMP%] {\n  background-color: #005289;\n  background-size: cover;\n  background-repeat: no-repeat;\n  padding: 2em 0 9em;\n  position: relative; }\n  @media screen and (min-width: 30.0625em) {\n    .banner[_ngcontent-%COMP%] {\n      padding: 4em 0 8em; } }\n  .banner[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    color: #ffffff;\n    font-size: 2em;\n    margin: 0 0 0.25em; }\n    @media screen and (min-width: 30.0625em) {\n      .banner[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 2.8em; } }\n    @media screen and (min-width: 40em) {\n      .banner[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 3.2em; } }\n  .banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: #d0d6df;\n    font-size: 1em;\n    margin-top: 0; }\n    @media screen and (min-width: 30.0625em) {\n      .banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        font-size: 1.2em; } }\n    @media screen and (min-width: 40em) {\n      .banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        font-size: 1.4em; } }\n  .banner[_ngcontent-%COMP%]   .usa-button[_ngcontent-%COMP%] {\n    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);\n    font-size: 1em;\n    margin: 0 auto;\n    max-width: 12em; }\n    .banner[_ngcontent-%COMP%]   .usa-button[_ngcontent-%COMP%]:hover {\n      background-color: #004370; }\n    @media screen and (min-width: 30.0625em) {\n      .banner[_ngcontent-%COMP%]   .usa-button[_ngcontent-%COMP%] {\n        font-size: 1.2em;\n        max-width: none; } }\n\n.banner-container[_ngcontent-%COMP%] {\n  background-color: #005289;\n  margin: 0 auto;\n  max-width: 30em;\n  text-align: center; }\n\n.press[_ngcontent-%COMP%] {\n  padding: 4em 0; }\n  .press[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    color: #aeb0b5;\n    font-size: 1em;\n    margin-bottom: 2em;\n    text-align: center;\n    text-transform: uppercase; }\n\n.press-container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  max-width: 43em; }\n  .press-container[_ngcontent-%COMP%]::after {\n    clear: both;\n    content: "";\n    display: block; }\n\n.press-links[_ngcontent-%COMP%] {\n  margin-top: 2em;\n  text-align: center; }\n  @media screen and (min-width: 40em) {\n    .press-links[_ngcontent-%COMP%] {\n      margin-top: 0;\n      text-align: right; } }\n  .press-links[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-width: 7.5em; }\n  .press-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin-bottom: 0.5em; }\n\n.quote-large[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #485568;\n  font-size: 1.75em;\n  margin-bottom: 0.2em;\n  padding-left: 0.75em;\n  position: relative; }\n  @media screen and (min-width: 40em) {\n    .quote-large[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      font-size: 2.5em; } }\n  .quote-large[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before {\n    color: #23c0ba;\n    content: "“";\n    font-size: 1.75em;\n    left: 0em;\n    position: absolute;\n    top: -0.275em; }\n    @media screen and (min-width: 40em) {\n      .quote-large[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::before {\n        font-size: 2.5em; } }\n\n.quote-large[_ngcontent-%COMP%]   .attribution[_ngcontent-%COMP%] {\n  border-top: 1px solid #c9cacd;\n  display: inline-block;\n  margin-left: 1.3em;\n  padding-top: 0.75em; }\n  @media screen and (min-width: 40em) {\n    .quote-large[_ngcontent-%COMP%]   .attribution[_ngcontent-%COMP%] {\n      margin-left: 2em; } }\n  .quote-large[_ngcontent-%COMP%]   .attribution[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    -webkit-transition: all 0.1s ease;\n    -moz-transition: all 0.1s ease;\n    transition: all 0.1s ease;\n    max-width: 5em;\n    opacity: 0.5; }\n    .quote-large[_ngcontent-%COMP%]   .attribution[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover {\n      opacity: 1; }'];

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */

var Wrapper_RouterLinkWithHref = (function () {
    function Wrapper_RouterLinkWithHref(p0, p1, p2) {
        this.changed = false;
        this.changes = {};
        this.context = new import22$1.RouterLinkWithHref(p0, p1, p2);
        this._expr_0 = import1$1.UNINITIALIZED;
        this._expr_1 = import1$1.UNINITIALIZED;
        this._expr_2 = import1$1.UNINITIALIZED;
        this._expr_3 = import1$1.UNINITIALIZED;
        this._expr_4 = import1$1.UNINITIALIZED;
        this._expr_5 = import1$1.UNINITIALIZED;
        this._expr_6 = import1$1.UNINITIALIZED;
        this._expr_7 = import1$1.UNINITIALIZED;
    }
    Wrapper_RouterLinkWithHref.prototype.check_target = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_0, currValue))) {
            this.changed = true;
            this.context.target = currValue;
            this.changes['target'] = new import1$1.SimpleChange(this._expr_0, currValue);
            this._expr_0 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_queryParams = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_1, currValue))) {
            this.changed = true;
            this.context.queryParams = currValue;
            this.changes['queryParams'] = new import1$1.SimpleChange(this._expr_1, currValue);
            this._expr_1 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_fragment = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_2, currValue))) {
            this.changed = true;
            this.context.fragment = currValue;
            this.changes['fragment'] = new import1$1.SimpleChange(this._expr_2, currValue);
            this._expr_2 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_routerLinkOptions = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_3, currValue))) {
            this.changed = true;
            this.context.routerLinkOptions = currValue;
            this.changes['routerLinkOptions'] = new import1$1.SimpleChange(this._expr_3, currValue);
            this._expr_3 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_preserveQueryParams = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_4, currValue))) {
            this.changed = true;
            this.context.preserveQueryParams = currValue;
            this.changes['preserveQueryParams'] = new import1$1.SimpleChange(this._expr_4, currValue);
            this._expr_4 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_preserveFragment = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_5, currValue))) {
            this.changed = true;
            this.context.preserveFragment = currValue;
            this.changes['preserveFragment'] = new import1$1.SimpleChange(this._expr_5, currValue);
            this._expr_5 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.check_routerLink = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_6, currValue))) {
            this.changed = true;
            this.context.routerLink = currValue;
            this.changes['routerLink'] = new import1$1.SimpleChange(this._expr_6, currValue);
            this._expr_6 = currValue;
        }
    };
    Wrapper_RouterLinkWithHref.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        if (!throwOnChange) {
            if (changed) {
                this.context.ngOnChanges(this.changes);
                this.changes = {};
            }
        }
        return changed;
    };
    Wrapper_RouterLinkWithHref.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
        var currVal_7 = this.context.href;
        if (import4$1.checkBinding(throwOnChange, this._expr_7, currVal_7)) {
            view.renderer.setElementProperty(el, 'href', view.viewUtils.sanitizer.sanitize(import60.SecurityContext.URL, currVal_7));
            this._expr_7 = currVal_7;
        }
    };
    return Wrapper_RouterLinkWithHref;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var styles$1 = ['html[_ngcontent-%COMP%] {\n  box-sizing: border-box; }\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::after, *[_ngcontent-%COMP%]::before {\n  box-sizing: inherit; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeInUp {\n  from {\n    -moz-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -moz-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    -moz-transform: translateY(0.5em);\n    -ms-transform: translateY(0.5em);\n    -o-transform: translateY(0.5em);\n    transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@-moz-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\nbody[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\nlabel[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\na[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 3px rgba(50, 58, 69, 0.25), 0 0 7px rgba(50, 58, 69, 0.25);\n  outline: 0; }\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5\nh6[_ngcontent-%COMP%] {\n  color: #323a45;\n  font-family: "TT Lakes", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;\n  font-weight: 500; }\n  h1[_ngcontent-%COMP%]:first-child, h2[_ngcontent-%COMP%]:first-child, h3[_ngcontent-%COMP%]:first-child, h4[_ngcontent-%COMP%]:first-child, h5\nh6[_ngcontent-%COMP%]:first-child {\n    margin-top: 0; }\n\np[_ngcontent-%COMP%] {\n  color: #5b616b; }\n  @media screen and (min-width: 40em) {\n    p[_ngcontent-%COMP%] {\n      font-size: 1.1em; } }\n\n.usa-button[_ngcontent-%COMP%], .usa-button.usa-button-big[_ngcontent-%COMP%], .usa-button-primary.usa-button-big[_ngcontent-%COMP%], .usa-button[_ngcontent-%COMP%]:visited.usa-button-big, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big, button.usa-button-big[_ngcontent-%COMP%], [type="button"].usa-button-big[_ngcontent-%COMP%], [type="submit"].usa-button-big[_ngcontent-%COMP%], [type="reset"].usa-button-big[_ngcontent-%COMP%], [type="image"].usa-button-big[_ngcontent-%COMP%] {\n  -webkit-transition: all 0.2s ease;\n  -moz-transition: all 0.2s ease;\n  transition: all 0.2s ease; }\n  .usa-button[_ngcontent-%COMP%]:hover, .usa-button.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button-primary.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button[_ngcontent-%COMP%]:visited.usa-button-big:hover, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big:hover, button.usa-button-big[_ngcontent-%COMP%]:hover, [type="button"].usa-button-big[_ngcontent-%COMP%]:hover, [type="submit"].usa-button-big[_ngcontent-%COMP%]:hover, [type="reset"].usa-button-big[_ngcontent-%COMP%]:hover, [type="image"].usa-button-big[_ngcontent-%COMP%]:hover {\n    -webkit-transform: translateY(-2px);\n    -moz-transform: translateY(-2px);\n    -ms-transform: translateY(-2px);\n    -o-transform: translateY(-2px);\n    transform: translateY(-2px); }\n\n.artwork[_ngcontent-%COMP%] {\n  bottom: 0;\n  left: 50%;\n  margin-left: -10em;\n  overflow: hidden;\n  position: absolute;\n  width: 20em; }\n  @media screen and (min-width: 30.0625em) {\n    .artwork[_ngcontent-%COMP%] {\n      margin-left: -13em;\n      width: 26em; } }\n  @media screen and (min-width: 40em) {\n    .artwork[_ngcontent-%COMP%] {\n      margin-left: -18.5em;\n      width: 37em; } }\n  @media screen and (min-width: 53.75em) {\n    .artwork[_ngcontent-%COMP%] {\n      margin-left: -22.5em;\n      width: 45em; } }\n  .artwork[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #43ddd7;\n    text-decoration: none; }\n    .artwork[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {\n      box-shadow: 0 0 3px rgba(255, 255, 255, 0.25), 0 0 7px rgba(255, 255, 255, 0.25); }\n  .artwork[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: #d0d6df;\n    font-size: 0.85em;\n    margin: 0 0 0.1em; }\n    @media screen and (min-width: 40em) {\n      .artwork[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        font-size: 0.9em; } }\n    @media screen and (min-width: 53.75em) {\n      .artwork[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        font-size: 1em; } }\n  .artwork[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n    border-radius: 50%;\n    display: inline-block;\n    height: 0.53em;\n    margin-right: 0.1em;\n    width: 0.53em; }\n    @media screen and (min-width: 40em) {\n      .artwork[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n        height: 0.65em;\n        margin-right: 0.25em;\n        width: 0.65em; } }\n    .artwork[_ngcontent-%COMP%]   .circle.green[_ngcontent-%COMP%] {\n      background-color: #34c84a; }\n    .artwork[_ngcontent-%COMP%]   .circle.red[_ngcontent-%COMP%] {\n      background-color: #fc625d; }\n    .artwork[_ngcontent-%COMP%]   .circle.yellow[_ngcontent-%COMP%] {\n      background-color: #fdbc40; }\n  .artwork[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n    background-color: #323a45;\n    font-family: "TT Lakes", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;\n    font-size: 0.8em;\n    padding: 0.75em; }\n    @media screen and (min-width: 40em) {\n      .artwork[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n        padding: 1em; } }\n  .artwork[_ngcontent-%COMP%]   .cursor[_ngcontent-%COMP%] {\n    -webkit-animation: blink 0.8s step-end infinite;\n    -moz-animation: blink 0.8s step-end infinite;\n    animation: blink 0.8s step-end infinite;\n    color: #23c0ba;\n    font-size: 1.1em; }\n  .artwork[_ngcontent-%COMP%]   .dolla[_ngcontent-%COMP%] {\n    margin-right: 0.5em; }\n  .artwork[_ngcontent-%COMP%]   .topbar[_ngcontent-%COMP%] {\n    background-color: #e4e4e4;\n    border-radius: 0.3em 0.3em 0 0;\n    padding: 0.05em 0.75em; }\n    @media screen and (min-width: 40em) {\n      .artwork[_ngcontent-%COMP%]   .topbar[_ngcontent-%COMP%] {\n        padding: 0.25em 1em; } }'];

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_BannerArtComponent = (function () {
    function Wrapper_BannerArtComponent() {
        this.changed = false;
        this.context = new BannerArtComponent();
    }
    Wrapper_BannerArtComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_BannerArtComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_BannerArtComponent;
}());
var renderType_BannerArtComponent_Host = null;
var _View_BannerArtComponent_Host0 = (function (_super) {
    __extends(_View_BannerArtComponent_Host0, _super);
    function _View_BannerArtComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_BannerArtComponent_Host0, renderType_BannerArtComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_BannerArtComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.selectOrCreateRenderHostElement(this.renderer, 'banner-art', import4$1.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_BannerArtComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._BannerArtComponent_0_4 = new Wrapper_BannerArtComponent();
        this._appEl_0.initComponent(this._BannerArtComponent_0_4.context, [], compView_0);
        compView_0.create(this._BannerArtComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_BannerArtComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === BannerArtComponent) && (0 === requestNodeIndex))) {
            return this._BannerArtComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_BannerArtComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._BannerArtComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._BannerArtComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_BannerArtComponent_Host0;
}(import1.AppView));
function viewFactory_BannerArtComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_BannerArtComponent_Host === null)) {
        (renderType_BannerArtComponent_Host = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.None, [], {}));
    }
    return new _View_BannerArtComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var BannerArtComponentNgFactory = new import11$1.ComponentFactory('banner-art', viewFactory_BannerArtComponent_Host0, BannerArtComponent);
var styles_BannerArtComponent = [styles$1];
var renderType_BannerArtComponent = null;
var _View_BannerArtComponent0 = (function (_super) {
    __extends(_View_BannerArtComponent0, _super);
    function _View_BannerArtComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_BannerArtComponent0, renderType_BannerArtComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_BannerArtComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'div', new import4$1.InlineArray2(2, 'class', 'artwork'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'div', new import4$1.InlineArray2(2, 'class', 'topbar'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = import4$1.createRenderElement(this.renderer, this._el_2, 'span', new import4$1.InlineArray2(2, 'class', 'circle red'), null);
        this._text_5 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_6 = import4$1.createRenderElement(this.renderer, this._el_2, 'span', new import4$1.InlineArray2(2, 'class', 'circle yellow'), null);
        this._text_7 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_8 = import4$1.createRenderElement(this.renderer, this._el_2, 'span', new import4$1.InlineArray2(2, 'class', 'circle green'), null);
        this._text_9 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_10 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_11 = import4$1.createRenderElement(this.renderer, this._el_0, 'div', new import4$1.InlineArray2(2, 'class', 'content'), null);
        this._text_12 = this.renderer.createText(this._el_11, '\n    ', null);
        this._el_13 = import4$1.createRenderElement(this.renderer, this._el_11, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_14 = this.renderer.createText(this._el_13, '\n      ', null);
        this._el_15 = import4$1.createRenderElement(this.renderer, this._el_13, 'span', new import4$1.InlineArray2(2, 'class', 'dolla'), null);
        this._text_16 = this.renderer.createText(this._el_15, '$', null);
        this._text_17 = this.renderer.createText(this._el_13, '\n      Want to contribute to ', null);
        this._el_18 = import4$1.createRenderElement(this.renderer, this._el_13, 'a', new import4$1.InlineArray2(2, 'href', './'), null);
        this._text_19 = this.renderer.createText(this._el_18, 'Code.gov', null);
        this._text_20 = this.renderer.createText(this._el_13, '?\n    ', null);
        this._text_21 = this.renderer.createText(this._el_11, '\n    ', null);
        this._el_22 = import4$1.createRenderElement(this.renderer, this._el_11, 'p', new import4$1.InlineArray2(2, 'class', 'second-line'), null);
        this._text_23 = this.renderer.createText(this._el_22, '\n      ', null);
        this._el_24 = import4$1.createRenderElement(this.renderer, this._el_22, 'span', new import4$1.InlineArray2(2, 'class', 'dolla'), null);
        this._text_25 = this.renderer.createText(this._el_24, '$', null);
        this._text_26 = this.renderer.createText(this._el_22, '\n      Visit our ', null);
        this._el_27 = import4$1.createRenderElement(this.renderer, this._el_22, 'a', new import4$1.InlineArray8(6, 'href', 'https://github.com/presidential-innovation-fellows/code-gov-web', 'rel', 'noopener', 'target', '_blank'), null);
        this._text_28 = this.renderer.createText(this._el_27, 'project page', null);
        this._text_29 = this.renderer.createText(this._el_22, ' or git clone git@github.com:presidential-innovation-fellows/code-gov-web.git\n      ', null);
        this._el_30 = import4$1.createRenderElement(this.renderer, this._el_22, 'span', new import4$1.InlineArray2(2, 'class', 'cursor'), null);
        this._text_31 = this.renderer.createText(this._el_30, '❚', null);
        this._text_32 = this.renderer.createText(this._el_22, '\n    ', null);
        this._text_33 = this.renderer.createText(this._el_11, '\n  ', null);
        this._text_34 = this.renderer.createText(this._el_0, '\n', null);
        this._text_35 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._el_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._text_20,
            this._text_21,
            this._el_22,
            this._text_23,
            this._el_24,
            this._text_25,
            this._text_26,
            this._el_27,
            this._text_28,
            this._text_29,
            this._el_30,
            this._text_31,
            this._text_32,
            this._text_33,
            this._text_34,
            this._text_35
        ], [], []);
        return null;
    };
    return _View_BannerArtComponent0;
}(import1.AppView));
function viewFactory_BannerArtComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_BannerArtComponent === null)) {
        (renderType_BannerArtComponent = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.Emulated, styles_BannerArtComponent, {}));
    }
    return new _View_BannerArtComponent0(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_ExternalLinkDirective = (function () {
    function Wrapper_ExternalLinkDirective(p0, p1) {
        this.changed = false;
        this.context = new ExternalLinkDirective(p0, p1);
    }
    Wrapper_ExternalLinkDirective.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_ExternalLinkDirective.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_ExternalLinkDirective;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var styles$2 = ['html[_ngcontent-%COMP%] {\n  box-sizing: border-box; }\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::after, *[_ngcontent-%COMP%]::before {\n  box-sizing: inherit; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeInUp {\n  from {\n    -moz-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -moz-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    -moz-transform: translateY(0.5em);\n    -ms-transform: translateY(0.5em);\n    -o-transform: translateY(0.5em);\n    transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@-moz-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\nbody[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\nlabel[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\na[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 3px rgba(50, 58, 69, 0.25), 0 0 7px rgba(50, 58, 69, 0.25);\n  outline: 0; }\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5\nh6[_ngcontent-%COMP%] {\n  color: #323a45;\n  font-family: "TT Lakes", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;\n  font-weight: 500; }\n  h1[_ngcontent-%COMP%]:first-child, h2[_ngcontent-%COMP%]:first-child, h3[_ngcontent-%COMP%]:first-child, h4[_ngcontent-%COMP%]:first-child, h5\nh6[_ngcontent-%COMP%]:first-child {\n    margin-top: 0; }\n\np[_ngcontent-%COMP%] {\n  color: #5b616b; }\n  @media screen and (min-width: 40em) {\n    p[_ngcontent-%COMP%] {\n      font-size: 1.1em; } }\n\n.usa-button[_ngcontent-%COMP%], .usa-button.usa-button-big[_ngcontent-%COMP%], .usa-button-primary.usa-button-big[_ngcontent-%COMP%], .usa-button[_ngcontent-%COMP%]:visited.usa-button-big, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big, button.usa-button-big[_ngcontent-%COMP%], [type="button"].usa-button-big[_ngcontent-%COMP%], [type="submit"].usa-button-big[_ngcontent-%COMP%], [type="reset"].usa-button-big[_ngcontent-%COMP%], [type="image"].usa-button-big[_ngcontent-%COMP%] {\n  -webkit-transition: all 0.2s ease;\n  -moz-transition: all 0.2s ease;\n  transition: all 0.2s ease; }\n  .usa-button[_ngcontent-%COMP%]:hover, .usa-button.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button-primary.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button[_ngcontent-%COMP%]:visited.usa-button-big:hover, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big:hover, button.usa-button-big[_ngcontent-%COMP%]:hover, [type="button"].usa-button-big[_ngcontent-%COMP%]:hover, [type="submit"].usa-button-big[_ngcontent-%COMP%]:hover, [type="reset"].usa-button-big[_ngcontent-%COMP%]:hover, [type="image"].usa-button-big[_ngcontent-%COMP%]:hover {\n    -webkit-transform: translateY(-2px);\n    -moz-transform: translateY(-2px);\n    -ms-transform: translateY(-2px);\n    -o-transform: translateY(-2px);\n    transform: translateY(-2px); }\n\n.modal-container[_ngcontent-%COMP%] {\n  -webkit-animation: fadeInUp 0.2s ease;\n  -moz-animation: fadeInUp 0.2s ease;\n  animation: fadeInUp 0.2s ease;\n  -webkit-animation-fill-mode: forwards;\n  -moz-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  background-color: #ffffff;\n  left: 2em;\n  padding: 2em 1em;\n  position: fixed;\n  right: 2em;\n  text-align: center;\n  top: 2em; }\n  @media screen and (min-width: 30.0625em) {\n    .modal-container[_ngcontent-%COMP%] {\n      padding: 3em 2em; } }\n  @media screen and (min-width: 40em) {\n    .modal-container[_ngcontent-%COMP%] {\n      left: 50%;\n      margin: -10em 0 0 -16em;\n      right: auto;\n      top: 50%;\n      width: 32em; } }\n  .modal-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #1b9590;\n    overflow-wrap: break-word;\n    word-wrap: break-word; }\n  .modal-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    -webkit-transition: all 0.2s ease;\n    -moz-transition: all 0.2s ease;\n    transition: all 0.2s ease;\n    background-color: transparent;\n    color: #5b616b;\n    padding: 0; }\n    .modal-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n      background-color: transparent;\n      color: #44484f; }\n  .modal-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5em; }\n    @media screen and (min-width: 30.0625em) {\n      .modal-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 1.75em; } }\n  .modal-container[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n    position: absolute;\n    right: 0.2em;\n    top: 0; }\n  .modal-container[_ngcontent-%COMP%]   .link-pretext[_ngcontent-%COMP%] {\n    margin-bottom: 0.1em; }\n\n.overlay[_ngcontent-%COMP%] {\n  background-color: rgba(51, 60, 74, 0.75);\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  z-index: 1000; }'];

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_NgIf = (function () {
    function Wrapper_NgIf(p0, p1) {
        this.changed = false;
        this.context = new import14$1.NgIf(p0, p1);
        this._expr_0 = import1$1.UNINITIALIZED;
    }
    Wrapper_NgIf.prototype.check_ngIf = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_0, currValue))) {
            this.changed = true;
            this.context.ngIf = currValue;
            this._expr_0 = currValue;
        }
    };
    Wrapper_NgIf.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_NgIf.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_NgIf;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_ModalComponent = (function () {
    function Wrapper_ModalComponent(p0) {
        this.changed = false;
        this.context = new ModalComponent(p0);
    }
    Wrapper_ModalComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_ModalComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_ModalComponent;
}());
var renderType_ModalComponent_Host = null;
var _View_ModalComponent_Host0 = (function (_super) {
    __extends(_View_ModalComponent_Host0, _super);
    function _View_ModalComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_ModalComponent_Host0, renderType_ModalComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_ModalComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.selectOrCreateRenderHostElement(this.renderer, 'modal', import4$1.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_ModalComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._ModalComponent_0_4 = new Wrapper_ModalComponent(this.parentInjector.get(ModalService));
        this._appEl_0.initComponent(this._ModalComponent_0_4.context, [], compView_0);
        compView_0.create(this._ModalComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_ModalComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === ModalComponent) && (0 === requestNodeIndex))) {
            return this._ModalComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_ModalComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._ModalComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._ModalComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ModalComponent_Host0;
}(import1.AppView));
function viewFactory_ModalComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_ModalComponent_Host === null)) {
        (renderType_ModalComponent_Host = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.None, [], {}));
    }
    return new _View_ModalComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var ModalComponentNgFactory = new import11$1.ComponentFactory('modal', viewFactory_ModalComponent_Host0, ModalComponent);
var styles_ModalComponent = [styles$2];
var renderType_ModalComponent = null;
var _View_ModalComponent0 = (function (_super) {
    __extends(_View_ModalComponent0, _super);
    function _View_ModalComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_ModalComponent0, renderType_ModalComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_ModalComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._anchor_0 = this.renderer.createTemplateAnchor(parentRenderNode, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._anchor_0);
        this._TemplateRef_0_5 = new import13$1.TemplateRef_(this._appEl_0, viewFactory_ModalComponent1);
        this._NgIf_0_6 = new Wrapper_NgIf(this._appEl_0.vcRef, this._TemplateRef_0_5);
        this._text_1 = this.renderer.createText(parentRenderNode, '\n', null);
        this.init([], [
            this._anchor_0,
            this._text_1
        ], [], []);
        return null;
    };
    _View_ModalComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import13$1.TemplateRef) && (0 === requestNodeIndex))) {
            return this._TemplateRef_0_5;
        }
        if (((token === import14$1.NgIf) && (0 === requestNodeIndex))) {
            return this._NgIf_0_6.context;
        }
        return notFoundResult;
    };
    _View_ModalComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_0_0_0 = this.context.visible;
        this._NgIf_0_6.check_ngIf(currVal_0_0_0, throwOnChange, false);
        this._NgIf_0_6.detectChangesInInputProps(this, this._anchor_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ModalComponent0;
}(import1.AppView));
function viewFactory_ModalComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_ModalComponent === null)) {
        (renderType_ModalComponent = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.Emulated, styles_ModalComponent, {}));
    }
    return new _View_ModalComponent0(viewUtils, parentInjector, declarationEl);
}
var _View_ModalComponent1 = (function (_super) {
    __extends(_View_ModalComponent1, _super);
    function _View_ModalComponent1(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_ModalComponent1, renderType_ModalComponent, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_ModalComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.createRenderElement(this.renderer, null, 'div', new import4$1.InlineArray2(2, 'class', 'overlay'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'div', new import4$1.InlineArray4(4, 'class', 'modal-container', 'tabindex', '-1'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = import4$1.createRenderElement(this.renderer, this._el_2, 'div', new import4$1.InlineArray2(2, 'class', 'close'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_6 = import4$1.createRenderElement(this.renderer, this._el_4, 'button', new import4$1.InlineArray2(2, 'aria-label', 'close'), null);
        this._text_7 = this.renderer.createText(this._el_6, '\n        ', null);
        this._el_8 = import4$1.createRenderElement(this.renderer, this._el_6, 'i', new import4$1.InlineArray2(2, 'class', 'fa fa-times'), null);
        this._text_9 = this.renderer.createText(this._el_6, '\n      ', null);
        this._text_10 = this.renderer.createText(this._el_4, '\n    ', null);
        this._text_11 = this.renderer.createText(this._el_2, '\n    ', null);
        this._anchor_12 = this.renderer.createTemplateAnchor(this._el_2, null);
        this._appEl_12 = new import3$1.AppElement(12, 2, this, this._anchor_12);
        this._TemplateRef_12_5 = new import13$1.TemplateRef_(this._appEl_12, viewFactory_ModalComponent2);
        this._NgIf_12_6 = new Wrapper_NgIf(this._appEl_12.vcRef, this._TemplateRef_12_5);
        this._text_13 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_14 = import4$1.createRenderElement(this.renderer, this._el_2, 'div', new import4$1.InlineArray2(2, 'class', 'modal-content'), null);
        this._text_15 = this.renderer.createText(this._el_14, '\n      ', null);
        this._anchor_16 = this.renderer.createTemplateAnchor(this._el_14, null);
        this._appEl_16 = new import3$1.AppElement(16, 14, this, this._anchor_16);
        this._TemplateRef_16_5 = new import13$1.TemplateRef_(this._appEl_16, viewFactory_ModalComponent3);
        this._NgIf_16_6 = new Wrapper_NgIf(this._appEl_16.vcRef, this._TemplateRef_16_5);
        this._text_17 = this.renderer.createText(this._el_14, '\n      ', null);
        this._el_18 = import4$1.createRenderElement(this.renderer, this._el_14, 'p', new import4$1.InlineArray2(2, 'class', 'link-pretext'), null);
        this._text_19 = this.renderer.createText(this._el_18, 'Continue to:', null);
        this._text_20 = this.renderer.createText(this._el_14, '\n      ', null);
        this._anchor_21 = this.renderer.createTemplateAnchor(this._el_14, null);
        this._appEl_21 = new import3$1.AppElement(21, 14, this, this._anchor_21);
        this._TemplateRef_21_5 = new import13$1.TemplateRef_(this._appEl_21, viewFactory_ModalComponent4);
        this._NgIf_21_6 = new Wrapper_NgIf(this._appEl_21.vcRef, this._TemplateRef_21_5);
        this._text_22 = this.renderer.createText(this._el_14, '\n    ', null);
        this._text_23 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_24 = this.renderer.createText(this._el_0, '\n', null);
        var disposable_0 = this.renderer.listen(this._el_0, 'click', this.eventHandler(this._handle_click_0_0.bind(this)));
        var disposable_1 = this.renderer.listen(this._el_6, 'click', this.eventHandler(this._handle_click_6_0.bind(this)));
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._text_11,
            this._anchor_12,
            this._text_13,
            this._el_14,
            this._text_15,
            this._anchor_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._text_20,
            this._anchor_21,
            this._text_22,
            this._text_23,
            this._text_24
        ], [
            disposable_0,
            disposable_1
        ], []);
        return null;
    };
    _View_ModalComponent1.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import13$1.TemplateRef) && (12 === requestNodeIndex))) {
            return this._TemplateRef_12_5;
        }
        if (((token === import14$1.NgIf) && (12 === requestNodeIndex))) {
            return this._NgIf_12_6.context;
        }
        if (((token === import13$1.TemplateRef) && (16 === requestNodeIndex))) {
            return this._TemplateRef_16_5;
        }
        if (((token === import14$1.NgIf) && (16 === requestNodeIndex))) {
            return this._NgIf_16_6.context;
        }
        if (((token === import13$1.TemplateRef) && (21 === requestNodeIndex))) {
            return this._TemplateRef_21_5;
        }
        if (((token === import14$1.NgIf) && (21 === requestNodeIndex))) {
            return this._NgIf_21_6.context;
        }
        return notFoundResult;
    };
    _View_ModalComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_12_0_0 = this.parent.context.title;
        this._NgIf_12_6.check_ngIf(currVal_12_0_0, throwOnChange, false);
        this._NgIf_12_6.detectChangesInInputProps(this, this._anchor_12, throwOnChange);
        var currVal_16_0_0 = this.parent.context.description;
        this._NgIf_16_6.check_ngIf(currVal_16_0_0, throwOnChange, false);
        this._NgIf_16_6.detectChangesInInputProps(this, this._anchor_16, throwOnChange);
        var currVal_21_0_0 = this.parent.context.url;
        this._NgIf_21_6.check_ngIf(currVal_21_0_0, throwOnChange, false);
        this._NgIf_21_6.detectChangesInInputProps(this, this._anchor_21, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_ModalComponent1.prototype._handle_click_0_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_0_0 = (this.parent.context.close() !== false);
        return (true && pd_0_0);
    };
    _View_ModalComponent1.prototype._handle_click_6_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_6_0 = (this.parent.context.close() !== false);
        return (true && pd_6_0);
    };
    return _View_ModalComponent1;
}(import1.AppView));
function viewFactory_ModalComponent1(viewUtils, parentInjector, declarationEl) {
    return new _View_ModalComponent1(viewUtils, parentInjector, declarationEl);
}
var _View_ModalComponent2 = (function (_super) {
    __extends(_View_ModalComponent2, _super);
    function _View_ModalComponent2(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_ModalComponent2, renderType_ModalComponent, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
        this._expr_5 = import1$1.UNINITIALIZED;
    }
    _View_ModalComponent2.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.createRenderElement(this.renderer, null, 'div', new import4$1.InlineArray2(2, 'class', 'modal-header'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n      ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'h1', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_3 = this.renderer.createText(this._el_2, '', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n    ', null);
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4
        ], [], []);
        return null;
    };
    _View_ModalComponent2.prototype.detectChangesInternal = function (throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_5 = import4$1.interpolate(1, '', this.parent.parent.context.title, '');
        if (import4$1.checkBinding(throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setText(this._text_3, currVal_5);
            this._expr_5 = currVal_5;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ModalComponent2;
}(import1.AppView));
function viewFactory_ModalComponent2(viewUtils, parentInjector, declarationEl) {
    return new _View_ModalComponent2(viewUtils, parentInjector, declarationEl);
}
var _View_ModalComponent3 = (function (_super) {
    __extends(_View_ModalComponent3, _super);
    function _View_ModalComponent3(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_ModalComponent3, renderType_ModalComponent, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
        this._expr_2 = import1$1.UNINITIALIZED;
    }
    _View_ModalComponent3.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.createRenderElement(this.renderer, null, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_1 = this.renderer.createText(this._el_0, '', null);
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1
        ], [], []);
        return null;
    };
    _View_ModalComponent3.prototype.detectChangesInternal = function (throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_2 = import4$1.interpolate(1, '', this.parent.parent.context.description, '');
        if (import4$1.checkBinding(throwOnChange, this._expr_2, currVal_2)) {
            this.renderer.setText(this._text_1, currVal_2);
            this._expr_2 = currVal_2;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ModalComponent3;
}(import1.AppView));
function viewFactory_ModalComponent3(viewUtils, parentInjector, declarationEl) {
    return new _View_ModalComponent3(viewUtils, parentInjector, declarationEl);
}
var _View_ModalComponent4 = (function (_super) {
    __extends(_View_ModalComponent4, _super);
    function _View_ModalComponent4(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_ModalComponent4, renderType_ModalComponent, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
        this._expr_2 = import1$1.UNINITIALIZED;
        this._expr_3 = import1$1.UNINITIALIZED;
    }
    _View_ModalComponent4.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.createRenderElement(this.renderer, null, 'a', new import4$1.InlineArray4(4, 'rel', 'noopener', 'target', '_blank'), null);
        this._text_1 = this.renderer.createText(this._el_0, '', null);
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1
        ], [], []);
        return null;
    };
    _View_ModalComponent4.prototype.detectChangesInternal = function (throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_2 = import4$1.interpolate(1, '', this.parent.parent.context.url, '');
        if (import4$1.checkBinding(throwOnChange, this._expr_2, currVal_2)) {
            this.renderer.setElementProperty(this._el_0, 'href', this.viewUtils.sanitizer.sanitize(import60.SecurityContext.URL, currVal_2));
            this._expr_2 = currVal_2;
        }
        var currVal_3 = import4$1.interpolate(1, '\n        ', this.parent.parent.context.url, '\n      ');
        if (import4$1.checkBinding(throwOnChange, this._expr_3, currVal_3)) {
            this.renderer.setText(this._text_1, currVal_3);
            this._expr_3 = currVal_3;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ModalComponent4;
}(import1.AppView));
function viewFactory_ModalComponent4(viewUtils, parentInjector, declarationEl) {
    return new _View_ModalComponent4(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_HomeComponent = (function () {
    function Wrapper_HomeComponent(p0, p1) {
        this.changed = false;
        this.context = new HomeComponent(p0, p1);
    }
    Wrapper_HomeComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_HomeComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_HomeComponent;
}());
var renderType_HomeComponent_Host = null;
var _View_HomeComponent_Host0 = (function (_super) {
    __extends(_View_HomeComponent_Host0, _super);
    function _View_HomeComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_HomeComponent_Host0, renderType_HomeComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_HomeComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.selectOrCreateRenderHostElement(this.renderer, 'home', import4$1.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_HomeComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._HomeComponent_0_4 = new Wrapper_HomeComponent(this.parentInjector.get(StateService), this.parentInjector.get(SeoService));
        this._appEl_0.initComponent(this._HomeComponent_0_4.context, [], compView_0);
        compView_0.create(this._HomeComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_HomeComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === HomeComponent) && (0 === requestNodeIndex))) {
            return this._HomeComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_HomeComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._HomeComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._HomeComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_HomeComponent_Host0;
}(import1.AppView));
function viewFactory_HomeComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_HomeComponent_Host === null)) {
        (renderType_HomeComponent_Host = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.None, [], {}));
    }
    return new _View_HomeComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var HomeComponentNgFactory = new import11$1.ComponentFactory('home', viewFactory_HomeComponent_Host0, HomeComponent);
var styles_HomeComponent = [styles];
var renderType_HomeComponent = null;
var _View_HomeComponent0 = (function (_super) {
    __extends(_View_HomeComponent0, _super);
    function _View_HomeComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_HomeComponent0, renderType_HomeComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_HomeComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'section', new import4$1.InlineArray2(2, 'class', 'banner'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = import4$1.createRenderElement(this.renderer, this._el_2, 'div', new import4$1.InlineArray2(2, 'class', 'banner-container'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_6 = import4$1.createRenderElement(this.renderer, this._el_4, 'div', new import4$1.InlineArray2(2, 'class', 'banner-content'), null);
        this._text_7 = this.renderer.createText(this._el_6, '\n        ', null);
        this._el_8 = import4$1.createRenderElement(this.renderer, this._el_6, 'h1', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_9 = this.renderer.createText(this._el_8, 'The People’s Code', null);
        this._text_10 = this.renderer.createText(this._el_6, '\n        ', null);
        this._el_11 = import4$1.createRenderElement(this.renderer, this._el_6, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_12 = this.renderer.createText(this._el_11, '\n          Unlock the tremendous potential of the Federal Government’s software.\n        ', null);
        this._text_13 = this.renderer.createText(this._el_6, '\n        ', null);
        this._el_14 = import4$1.createRenderElement(this.renderer, this._el_6, 'a', new import4$1.InlineArray4(4, 'class', 'usa-button usa-button-big', 'routerLink', 'explore-code'), null);
        this._RouterLinkWithHref_14_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_15 = this.renderer.createText(this._el_14, '\n          Explore Code\n        ', null);
        this._text_16 = this.renderer.createText(this._el_6, '\n      ', null);
        this._text_17 = this.renderer.createText(this._el_4, '\n    ', null);
        this._text_18 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_19 = import4$1.createRenderElement(this.renderer, this._el_2, 'banner-art', import4$1.EMPTY_INLINE_ARRAY, null);
        this._appEl_19 = new import3$1.AppElement(19, 2, this, this._el_19);
        var compView_19 = viewFactory_BannerArtComponent0(this.viewUtils, this.injector(19), this._appEl_19);
        this._BannerArtComponent_19_4 = new Wrapper_BannerArtComponent();
        this._appEl_19.initComponent(this._BannerArtComponent_19_4.context, [], compView_19);
        compView_19.create(this._BannerArtComponent_19_4.context, [], null);
        this._text_20 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_21 = this.renderer.createText(this._el_0, '\n', null);
        this._text_22 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_23 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'section', new import4$1.InlineArray2(2, 'class', 'about'), null);
        this._text_24 = this.renderer.createText(this._el_23, '\n  ', null);
        this._el_25 = import4$1.createRenderElement(this.renderer, this._el_23, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_26 = this.renderer.createText(this._el_25, '\n    ', null);
        this._el_27 = import4$1.createRenderElement(this.renderer, this._el_25, 'header', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_28 = this.renderer.createText(this._el_27, '\n      ', null);
        this._el_29 = import4$1.createRenderElement(this.renderer, this._el_27, 'h1', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_30 = this.renderer.createText(this._el_29, 'Help propel America’s next breakthrough in innovation.', null);
        this._text_31 = this.renderer.createText(this._el_27, '\n      ', null);
        this._el_32 = import4$1.createRenderElement(this.renderer, this._el_27, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_33 = this.renderer.createText(this._el_32, '\n        Code.gov is a platform designed to improve access to the federal\n        government’s custom-developed software.\n      ', null);
        this._text_34 = this.renderer.createText(this._el_27, '\n    ', null);
        this._text_35 = this.renderer.createText(this._el_25, '\n    ', null);
        this._el_36 = import4$1.createRenderElement(this.renderer, this._el_25, 'ul', new import4$1.InlineArray2(2, 'class', 'usa-unstyled-list usa-grid about-actions'), null);
        this._text_37 = this.renderer.createText(this._el_36, '\n      ', null);
        this._el_38 = import4$1.createRenderElement(this.renderer, this._el_36, 'li', new import4$1.InlineArray2(2, 'class', 'usa-width-one-half'), null);
        this._text_39 = this.renderer.createText(this._el_38, '\n        ', null);
        this._el_40 = import4$1.createRenderElement(this.renderer, this._el_38, 'div', new import4$1.InlineArray2(2, 'class', 'icon'), null);
        this._text_41 = this.renderer.createText(this._el_40, '\n          ', null);
        this._el_42 = import4$1.createRenderElement(this.renderer, this._el_40, 'i', new import4$1.InlineArray2(2, 'class', 'fa fa-code'), null);
        this._text_43 = this.renderer.createText(this._el_40, '\n        ', null);
        this._text_44 = this.renderer.createText(this._el_38, '\n        ', null);
        this._el_45 = import4$1.createRenderElement(this.renderer, this._el_38, 'h2', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_46 = this.renderer.createText(this._el_45, 'Explore Code', null);
        this._text_47 = this.renderer.createText(this._el_38, '\n        ', null);
        this._el_48 = import4$1.createRenderElement(this.renderer, this._el_38, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_49 = this.renderer.createText(this._el_48, '\n           Choose from dozens of open source projects that you can reuse or\n           contribute to.\n        ', null);
        this._text_50 = this.renderer.createText(this._el_38, '\n        ', null);
        this._el_51 = import4$1.createRenderElement(this.renderer, this._el_38, 'a', new import4$1.InlineArray4(4, 'class', 'usa-button', 'routerLink', 'explore-code'), null);
        this._RouterLinkWithHref_51_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_52 = this.renderer.createText(this._el_51, '\n          Browse Code\n        ', null);
        this._text_53 = this.renderer.createText(this._el_38, '\n      ', null);
        this._text_54 = this.renderer.createText(this._el_36, '\n      ', null);
        this._el_55 = import4$1.createRenderElement(this.renderer, this._el_36, 'li', new import4$1.InlineArray2(2, 'class', 'usa-width-one-half'), null);
        this._text_56 = this.renderer.createText(this._el_55, '\n        ', null);
        this._el_57 = import4$1.createRenderElement(this.renderer, this._el_55, 'div', new import4$1.InlineArray2(2, 'class', 'icon'), null);
        this._text_58 = this.renderer.createText(this._el_57, '\n          ', null);
        this._el_59 = import4$1.createRenderElement(this.renderer, this._el_57, 'i', new import4$1.InlineArray2(2, 'class', 'fa fa-book'), null);
        this._text_60 = this.renderer.createText(this._el_57, '\n        ', null);
        this._text_61 = this.renderer.createText(this._el_55, '\n        ', null);
        this._el_62 = import4$1.createRenderElement(this.renderer, this._el_55, 'h2', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_63 = this.renderer.createText(this._el_62, 'Implement Policy', null);
        this._text_64 = this.renderer.createText(this._el_55, '\n        ', null);
        this._el_65 = import4$1.createRenderElement(this.renderer, this._el_55, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_66 = this.renderer.createText(this._el_65, '\n           Discover tools and resources designed to help federal\n           agencies implement the Federal Source Code Policy.\n        ', null);
        this._text_67 = this.renderer.createText(this._el_55, '\n        ', null);
        this._el_68 = import4$1.createRenderElement(this.renderer, this._el_55, 'a', new import4$1.InlineArray4(4, 'class', 'usa-button', 'routerLink', 'policy-guide'), null);
        this._RouterLinkWithHref_68_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_69 = this.renderer.createText(this._el_68, '\n          Get Started\n        ', null);
        this._text_70 = this.renderer.createText(this._el_55, '\n      ', null);
        this._text_71 = this.renderer.createText(this._el_36, '\n    ', null);
        this._text_72 = this.renderer.createText(this._el_25, '\n  ', null);
        this._text_73 = this.renderer.createText(this._el_23, '\n', null);
        this._text_74 = this.renderer.createText(parentRenderNode, '\n\n', null);
        this._el_75 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'section', new import4$1.InlineArray2(2, 'class', 'press'), null);
        this._text_76 = this.renderer.createText(this._el_75, '\n  ', null);
        this._el_77 = import4$1.createRenderElement(this.renderer, this._el_75, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_78 = this.renderer.createText(this._el_77, '\n    ', null);
        this._el_79 = import4$1.createRenderElement(this.renderer, this._el_77, 'h2', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_80 = this.renderer.createText(this._el_79, 'Press', null);
        this._text_81 = this.renderer.createText(this._el_77, '\n    ', null);
        this._el_82 = import4$1.createRenderElement(this.renderer, this._el_77, 'div', new import4$1.InlineArray2(2, 'class', 'press-container'), null);
        this._text_83 = this.renderer.createText(this._el_82, '\n      ', null);
        this._el_84 = import4$1.createRenderElement(this.renderer, this._el_82, 'div', new import4$1.InlineArray2(2, 'class', 'usa-width-two-thirds quote-large'), null);
        this._text_85 = this.renderer.createText(this._el_84, '\n        ', null);
        this._el_86 = import4$1.createRenderElement(this.renderer, this._el_84, 'h1', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_87 = this.renderer.createText(this._el_86, '\n          It’s the latest in a long line of high-profile victories for the open\n          source movement.\n        ', null);
        this._text_88 = this.renderer.createText(this._el_84, '\n        ', null);
        this._el_89 = import4$1.createRenderElement(this.renderer, this._el_84, 'div', new import4$1.InlineArray2(2, 'class', 'attribution'), null);
        this._text_90 = this.renderer.createText(this._el_89, '\n          ', null);
        this._el_91 = import4$1.createRenderElement(this.renderer, this._el_89, 'a', new import4$1.InlineArray4(4, 'external-link', '', 'href', 'https://www.wired.com/2016/08/open-source-won-now/'), null);
        this._ExternalLinkDirective_91_3 = new Wrapper_ExternalLinkDirective(new import20$1.ElementRef(this._el_91), this.parentInjector.get(ModalService));
        this._text_92 = this.renderer.createText(this._el_91, '\n            ', null);
        this._el_93 = import4$1.createRenderElement(this.renderer, this._el_91, 'img', new import4$1.InlineArray4(4, 'alt', 'Wired', 'src', 'assets/img/logos/press/wired.svg'), null);
        this._text_94 = this.renderer.createText(this._el_91, '\n          ', null);
        this._text_95 = this.renderer.createText(this._el_89, '\n        ', null);
        this._text_96 = this.renderer.createText(this._el_84, '\n      ', null);
        this._text_97 = this.renderer.createText(this._el_82, '\n      ', null);
        this._el_98 = import4$1.createRenderElement(this.renderer, this._el_82, 'div', new import4$1.InlineArray2(2, 'class', 'usa-width-one-third'), null);
        this._text_99 = this.renderer.createText(this._el_98, '\n        ', null);
        this._el_100 = import4$1.createRenderElement(this.renderer, this._el_98, 'ul', new import4$1.InlineArray2(2, 'class', 'usa-unstyled-list press-links'), null);
        this._text_101 = this.renderer.createText(this._el_100, '\n          ', null);
        this._el_102 = import4$1.createRenderElement(this.renderer, this._el_100, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_103 = this.renderer.createText(this._el_102, '\n            ', null);
        this._el_104 = import4$1.createRenderElement(this.renderer, this._el_102, 'a', new import4$1.InlineArray4(4, 'external-link', '', 'href', 'https://techcrunch.com/2016/08/08/the-white-house-just-released-the-federal-source-code-policy-to-help-government-agencies-go-open-source/'), null);
        this._ExternalLinkDirective_104_3 = new Wrapper_ExternalLinkDirective(new import20$1.ElementRef(this._el_104), this.parentInjector.get(ModalService));
        this._text_105 = this.renderer.createText(this._el_104, '\n              ', null);
        this._el_106 = import4$1.createRenderElement(this.renderer, this._el_104, 'img', new import4$1.InlineArray4(4, 'alt', 'TechCrunch', 'src', 'assets/img/logos/press/techcrunch.png'), null);
        this._text_107 = this.renderer.createText(this._el_104, '\n            ', null);
        this._text_108 = this.renderer.createText(this._el_102, '\n          ', null);
        this._text_109 = this.renderer.createText(this._el_100, '\n          ', null);
        this._el_110 = import4$1.createRenderElement(this.renderer, this._el_100, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_111 = this.renderer.createText(this._el_110, '\n            ', null);
        this._el_112 = import4$1.createRenderElement(this.renderer, this._el_110, 'a', new import4$1.InlineArray4(4, 'external-link', '', 'href', 'http://www.pcmag.com/news/346860/white-house-releases-open-source-software-policy'), null);
        this._ExternalLinkDirective_112_3 = new Wrapper_ExternalLinkDirective(new import20$1.ElementRef(this._el_112), this.parentInjector.get(ModalService));
        this._text_113 = this.renderer.createText(this._el_112, '\n              ', null);
        this._el_114 = import4$1.createRenderElement(this.renderer, this._el_112, 'img', new import4$1.InlineArray4(4, 'alt', 'PC Mag', 'src', 'assets/img/logos/press/pcmag.png'), null);
        this._text_115 = this.renderer.createText(this._el_112, '\n            ', null);
        this._text_116 = this.renderer.createText(this._el_110, '\n          ', null);
        this._text_117 = this.renderer.createText(this._el_100, '\n          ', null);
        this._el_118 = import4$1.createRenderElement(this.renderer, this._el_100, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_119 = this.renderer.createText(this._el_118, '\n            ', null);
        this._el_120 = import4$1.createRenderElement(this.renderer, this._el_118, 'a', new import4$1.InlineArray4(4, 'external-link', '', 'href', 'https://fcw.com/articles/2016/08/08/open-source-rockwell.aspx'), null);
        this._ExternalLinkDirective_120_3 = new Wrapper_ExternalLinkDirective(new import20$1.ElementRef(this._el_120), this.parentInjector.get(ModalService));
        this._text_121 = this.renderer.createText(this._el_120, '\n              ', null);
        this._el_122 = import4$1.createRenderElement(this.renderer, this._el_120, 'img', new import4$1.InlineArray4(4, 'alt', 'FCW', 'src', 'assets/img/logos/press/fcw.jpg'), null);
        this._text_123 = this.renderer.createText(this._el_120, '\n            ', null);
        this._text_124 = this.renderer.createText(this._el_118, '\n          ', null);
        this._text_125 = this.renderer.createText(this._el_100, '\n        ', null);
        this._text_126 = this.renderer.createText(this._el_98, '\n      ', null);
        this._text_127 = this.renderer.createText(this._el_82, '\n    ', null);
        this._text_128 = this.renderer.createText(this._el_77, '\n  ', null);
        this._text_129 = this.renderer.createText(this._el_75, '\n', null);
        this._text_130 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_131 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'modal', import4$1.EMPTY_INLINE_ARRAY, null);
        this._appEl_131 = new import3$1.AppElement(131, null, this, this._el_131);
        var compView_131 = viewFactory_ModalComponent0(this.viewUtils, this.injector(131), this._appEl_131);
        this._ModalComponent_131_4 = new Wrapper_ModalComponent(this.parentInjector.get(ModalService));
        this._appEl_131.initComponent(this._ModalComponent_131_4.context, [], compView_131);
        compView_131.create(this._ModalComponent_131_4.context, [], null);
        this._text_132 = this.renderer.createText(parentRenderNode, '\n', null);
        var disposable_0 = this.renderer.listen(this._el_14, 'click', this.eventHandler(this._handle_click_14_0.bind(this)));
        var disposable_1 = this.renderer.listen(this._el_51, 'click', this.eventHandler(this._handle_click_51_0.bind(this)));
        var disposable_2 = this.renderer.listen(this._el_68, 'click', this.eventHandler(this._handle_click_68_0.bind(this)));
        var disposable_3 = this.renderer.listen(this._el_91, 'click', this.eventHandler(this._handle_click_91_0.bind(this)));
        var disposable_4 = this.renderer.listen(this._el_104, 'click', this.eventHandler(this._handle_click_104_0.bind(this)));
        var disposable_5 = this.renderer.listen(this._el_112, 'click', this.eventHandler(this._handle_click_112_0.bind(this)));
        var disposable_6 = this.renderer.listen(this._el_120, 'click', this.eventHandler(this._handle_click_120_0.bind(this)));
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._text_13,
            this._el_14,
            this._text_15,
            this._text_16,
            this._text_17,
            this._text_18,
            this._el_19,
            this._text_20,
            this._text_21,
            this._text_22,
            this._el_23,
            this._text_24,
            this._el_25,
            this._text_26,
            this._el_27,
            this._text_28,
            this._el_29,
            this._text_30,
            this._text_31,
            this._el_32,
            this._text_33,
            this._text_34,
            this._text_35,
            this._el_36,
            this._text_37,
            this._el_38,
            this._text_39,
            this._el_40,
            this._text_41,
            this._el_42,
            this._text_43,
            this._text_44,
            this._el_45,
            this._text_46,
            this._text_47,
            this._el_48,
            this._text_49,
            this._text_50,
            this._el_51,
            this._text_52,
            this._text_53,
            this._text_54,
            this._el_55,
            this._text_56,
            this._el_57,
            this._text_58,
            this._el_59,
            this._text_60,
            this._text_61,
            this._el_62,
            this._text_63,
            this._text_64,
            this._el_65,
            this._text_66,
            this._text_67,
            this._el_68,
            this._text_69,
            this._text_70,
            this._text_71,
            this._text_72,
            this._text_73,
            this._text_74,
            this._el_75,
            this._text_76,
            this._el_77,
            this._text_78,
            this._el_79,
            this._text_80,
            this._text_81,
            this._el_82,
            this._text_83,
            this._el_84,
            this._text_85,
            this._el_86,
            this._text_87,
            this._text_88,
            this._el_89,
            this._text_90,
            this._el_91,
            this._text_92,
            this._el_93,
            this._text_94,
            this._text_95,
            this._text_96,
            this._text_97,
            this._el_98,
            this._text_99,
            this._el_100,
            this._text_101,
            this._el_102,
            this._text_103,
            this._el_104,
            this._text_105,
            this._el_106,
            this._text_107,
            this._text_108,
            this._text_109,
            this._el_110,
            this._text_111,
            this._el_112,
            this._text_113,
            this._el_114,
            this._text_115,
            this._text_116,
            this._text_117,
            this._el_118,
            this._text_119,
            this._el_120,
            this._text_121,
            this._el_122,
            this._text_123,
            this._text_124,
            this._text_125,
            this._text_126,
            this._text_127,
            this._text_128,
            this._text_129,
            this._text_130,
            this._el_131,
            this._text_132
        ], [
            disposable_0,
            disposable_1,
            disposable_2,
            disposable_3,
            disposable_4,
            disposable_5,
            disposable_6
        ], []);
        return null;
    };
    _View_HomeComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import22$1.RouterLinkWithHref) && ((14 <= requestNodeIndex) && (requestNodeIndex <= 15)))) {
            return this._RouterLinkWithHref_14_3.context;
        }
        if (((token === BannerArtComponent) && (19 === requestNodeIndex))) {
            return this._BannerArtComponent_19_4.context;
        }
        if (((token === import22$1.RouterLinkWithHref) && ((51 <= requestNodeIndex) && (requestNodeIndex <= 52)))) {
            return this._RouterLinkWithHref_51_3.context;
        }
        if (((token === import22$1.RouterLinkWithHref) && ((68 <= requestNodeIndex) && (requestNodeIndex <= 69)))) {
            return this._RouterLinkWithHref_68_3.context;
        }
        if (((token === ExternalLinkDirective) && ((91 <= requestNodeIndex) && (requestNodeIndex <= 94)))) {
            return this._ExternalLinkDirective_91_3.context;
        }
        if (((token === ExternalLinkDirective) && ((104 <= requestNodeIndex) && (requestNodeIndex <= 107)))) {
            return this._ExternalLinkDirective_104_3.context;
        }
        if (((token === ExternalLinkDirective) && ((112 <= requestNodeIndex) && (requestNodeIndex <= 115)))) {
            return this._ExternalLinkDirective_112_3.context;
        }
        if (((token === ExternalLinkDirective) && ((120 <= requestNodeIndex) && (requestNodeIndex <= 123)))) {
            return this._ExternalLinkDirective_120_3.context;
        }
        if (((token === ModalComponent) && (131 === requestNodeIndex))) {
            return this._ModalComponent_131_4.context;
        }
        return notFoundResult;
    };
    _View_HomeComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_14_0_0 = 'explore-code';
        this._RouterLinkWithHref_14_3.check_routerLink(currVal_14_0_0, throwOnChange, false);
        this._RouterLinkWithHref_14_3.detectChangesInInputProps(this, this._el_14, throwOnChange);
        this._BannerArtComponent_19_4.detectChangesInInputProps(this, this._el_19, throwOnChange);
        var currVal_51_0_0 = 'explore-code';
        this._RouterLinkWithHref_51_3.check_routerLink(currVal_51_0_0, throwOnChange, false);
        this._RouterLinkWithHref_51_3.detectChangesInInputProps(this, this._el_51, throwOnChange);
        var currVal_68_0_0 = 'policy-guide';
        this._RouterLinkWithHref_68_3.check_routerLink(currVal_68_0_0, throwOnChange, false);
        this._RouterLinkWithHref_68_3.detectChangesInInputProps(this, this._el_68, throwOnChange);
        this._ExternalLinkDirective_91_3.detectChangesInInputProps(this, this._el_91, throwOnChange);
        this._ExternalLinkDirective_104_3.detectChangesInInputProps(this, this._el_104, throwOnChange);
        this._ExternalLinkDirective_112_3.detectChangesInInputProps(this, this._el_112, throwOnChange);
        this._ExternalLinkDirective_120_3.detectChangesInInputProps(this, this._el_120, throwOnChange);
        this._ModalComponent_131_4.detectChangesInInputProps(this, this._el_131, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._RouterLinkWithHref_14_3.detectChangesInHostProps(this, this._el_14, throwOnChange);
        this._BannerArtComponent_19_4.detectChangesInHostProps(this, this._el_19, throwOnChange);
        this._RouterLinkWithHref_51_3.detectChangesInHostProps(this, this._el_51, throwOnChange);
        this._RouterLinkWithHref_68_3.detectChangesInHostProps(this, this._el_68, throwOnChange);
        this._ExternalLinkDirective_91_3.detectChangesInHostProps(this, this._el_91, throwOnChange);
        this._ExternalLinkDirective_104_3.detectChangesInHostProps(this, this._el_104, throwOnChange);
        this._ExternalLinkDirective_112_3.detectChangesInHostProps(this, this._el_112, throwOnChange);
        this._ExternalLinkDirective_120_3.detectChangesInHostProps(this, this._el_120, throwOnChange);
        this._ModalComponent_131_4.detectChangesInHostProps(this, this._el_131, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_HomeComponent0.prototype.destroyInternal = function () {
        this._RouterLinkWithHref_14_3.context.ngOnDestroy();
        this._RouterLinkWithHref_51_3.context.ngOnDestroy();
        this._RouterLinkWithHref_68_3.context.ngOnDestroy();
    };
    _View_HomeComponent0.prototype._handle_click_14_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_14_0 = (this._RouterLinkWithHref_14_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_14_0);
    };
    _View_HomeComponent0.prototype._handle_click_51_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_51_0 = (this._RouterLinkWithHref_51_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_51_0);
    };
    _View_HomeComponent0.prototype._handle_click_68_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_68_0 = (this._RouterLinkWithHref_68_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_68_0);
    };
    _View_HomeComponent0.prototype._handle_click_91_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_91_0 = (this._ExternalLinkDirective_91_3.context.onClick($event) !== false);
        return (true && pd_91_0);
    };
    _View_HomeComponent0.prototype._handle_click_104_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_104_0 = (this._ExternalLinkDirective_104_3.context.onClick($event) !== false);
        return (true && pd_104_0);
    };
    _View_HomeComponent0.prototype._handle_click_112_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_112_0 = (this._ExternalLinkDirective_112_3.context.onClick($event) !== false);
        return (true && pd_112_0);
    };
    _View_HomeComponent0.prototype._handle_click_120_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_120_0 = (this._ExternalLinkDirective_120_3.context.onClick($event) !== false);
        return (true && pd_120_0);
    };
    return _View_HomeComponent0;
}(import1.AppView));
function viewFactory_HomeComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_HomeComponent === null)) {
        (renderType_HomeComponent = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.Emulated, styles_HomeComponent, {}));
    }
    return new _View_HomeComponent0(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var styles$3 = ['.usa-grid[_ngcontent-%COMP%] {\n  padding-bottom: 6em;\n  padding-top: 2em; }'];

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_PrivacyPolicyComponent = (function () {
    function Wrapper_PrivacyPolicyComponent(p0, p1) {
        this.changed = false;
        this.context = new PrivacyPolicyComponent(p0, p1);
    }
    Wrapper_PrivacyPolicyComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_PrivacyPolicyComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_PrivacyPolicyComponent;
}());
var renderType_PrivacyPolicyComponent_Host = null;
var _View_PrivacyPolicyComponent_Host0 = (function (_super) {
    __extends(_View_PrivacyPolicyComponent_Host0, _super);
    function _View_PrivacyPolicyComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_PrivacyPolicyComponent_Host0, renderType_PrivacyPolicyComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_PrivacyPolicyComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.selectOrCreateRenderHostElement(this.renderer, 'privacy-policy', import4$1.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_PrivacyPolicyComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._PrivacyPolicyComponent_0_4 = new Wrapper_PrivacyPolicyComponent(this.parentInjector.get(SeoService), this.parentInjector.get(StateService));
        this._appEl_0.initComponent(this._PrivacyPolicyComponent_0_4.context, [], compView_0);
        compView_0.create(this._PrivacyPolicyComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_PrivacyPolicyComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === PrivacyPolicyComponent) && (0 === requestNodeIndex))) {
            return this._PrivacyPolicyComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_PrivacyPolicyComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._PrivacyPolicyComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._PrivacyPolicyComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_PrivacyPolicyComponent_Host0;
}(import1.AppView));
function viewFactory_PrivacyPolicyComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_PrivacyPolicyComponent_Host === null)) {
        (renderType_PrivacyPolicyComponent_Host = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.None, [], {}));
    }
    return new _View_PrivacyPolicyComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var PrivacyPolicyComponentNgFactory = new import11$1.ComponentFactory('privacy-policy', viewFactory_PrivacyPolicyComponent_Host0, PrivacyPolicyComponent);
var styles_PrivacyPolicyComponent = [styles$3];
var renderType_PrivacyPolicyComponent = null;
var _View_PrivacyPolicyComponent0 = (function (_super) {
    __extends(_View_PrivacyPolicyComponent0, _super);
    function _View_PrivacyPolicyComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_PrivacyPolicyComponent0, renderType_PrivacyPolicyComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_PrivacyPolicyComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'div', new import4$1.InlineArray2(2, 'class', 'usa-width-three-fourths'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = import4$1.createRenderElement(this.renderer, this._el_2, 'h1', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_5 = this.renderer.createText(this._el_4, 'Privacy Policy', null);
        this._text_6 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_7 = import4$1.createRenderElement(this.renderer, this._el_2, 'h2', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_8 = this.renderer.createText(this._el_7, 'PROTECTING PRIVACY AND SECURITY', null);
        this._text_9 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_10 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_11 = this.renderer.createText(this._el_10, '\n      Protecting the privacy and security of individuals’ personal information is very important to us. We do not collect any information that directly identifies you when you visit Code.gov unless you choose to provide that information by contacting us. However, the website may collect a limited amount of information about your visit for the purposes of website analytics and customization. Please read this notice to understand what we do with the limited amount of information about your visit that we may collect.\n    ', null);
        this._text_12 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_13 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_14 = this.renderer.createText(this._el_13, 'Information Collected and Stored Automatically', null);
        this._text_15 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_16 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_17 = this.renderer.createText(this._el_16, '\n      We collect limited information about visits to Code.gov. This information is used to measure the number of visitors to the various sections of our website and to identify performance or problem areas. We also use this information to help us develop the site, analyze patterns of usage, and to make the site more useful. We do not share or sell visitor data for the purposes of advertising, marketing, or any other commercial purpose. This information is not used for associating search terms or patterns of site navigation with individual users. The information that is automatically collected and stored concerning your visit includes:\n    ', null);
        this._text_18 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_19 = import4$1.createRenderElement(this.renderer, this._el_2, 'ul', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_20 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_21 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_22 = this.renderer.createText(this._el_21, '\n        The domain from which you access the Internet (i.e., HHS.gov if you are connecting from a HHS account, or GMU.edu if you are connecting from George Mason University’s domain);\n      ', null);
        this._text_23 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_24 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_25 = this.renderer.createText(this._el_24, 'The date and time of your visit;', null);
        this._text_26 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_27 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_28 = this.renderer.createText(this._el_27, 'Your location, as approximated by GPS, and other sensors;', null);
        this._text_29 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_30 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_31 = this.renderer.createText(this._el_30, 'The type of device you used to access Code.gov (i.e., mobile or desktop);', null);
        this._text_32 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_33 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_34 = this.renderer.createText(this._el_33, 'The operating system of the device you used to access Code.gov;', null);
        this._text_35 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_36 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_37 = this.renderer.createText(this._el_36, 'The pages you visit on Code.gov;', null);
        this._text_38 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_39 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_40 = this.renderer.createText(this._el_39, '\n        The Internet address of the website you came from if it linked you directly to Code.gov; and\n      ', null);
        this._text_41 = this.renderer.createText(this._el_19, '\n      ', null);
        this._el_42 = import4$1.createRenderElement(this.renderer, this._el_19, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_43 = this.renderer.createText(this._el_42, '\n        Aany search terms that you may enter when searching Code.gov.\n      ', null);
        this._text_44 = this.renderer.createText(this._el_19, '\n    ', null);
        this._text_45 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_46 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_47 = this.renderer.createText(this._el_46, 'How Code.gov uses Cookies', null);
        this._text_48 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_49 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_50 = this.renderer.createText(this._el_49, '\n      When you visit a website, its server may generate a piece of text known as a “cookie” to place on your device. The cookie, which is unique to your browser, allows the server to “remember” specific information about your visit while you are connected.', null);
        this._text_51 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_52 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_53 = this.renderer.createText(this._el_52, 'There are two types of cookies – single session (temporary) and multi-session (persistent). Single session cookies last only as long as your Web browser is open. Once you close your browser, the session cookie disappears. Persistent cookies are stored on your device for longer periods. Both types of cookies create an identifier that is unique to your device. The Office of Management and Budget Memorandum M-10-22, Guidance for Online Use of Web Measurement and Customization Technologies, allows Federal entities to use both session and persistent cookies to improve the delivery of services.', null);
        this._text_54 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_55 = import4$1.createRenderElement(this.renderer, this._el_2, 'ul', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_56 = this.renderer.createText(this._el_55, '\n    ', null);
        this._el_57 = import4$1.createRenderElement(this.renderer, this._el_55, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_58 = this.renderer.createText(this._el_57, 'Session Cookies: We may use session cookies for technical purposes, such as to allow better navigation through our site. These cookies let our server know that you are continuing a visit to our site. Our use of session cookies qualifies as “Usage Tier 1–Single Session,” as defined in the OMB M-10-22 guidance.', null);
        this._text_59 = this.renderer.createText(this._el_55, '\n    ', null);
        this._el_60 = import4$1.createRenderElement(this.renderer, this._el_55, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_61 = this.renderer.createText(this._el_60, 'Persistent Cookies: We may use persistent cookies to understand the differences between new and returning visitors to Code.gov. Persistent cookies remain on your device between visits to our site until they expire or are removed by the user. Our use of persistent cookies qualifies as “Usage Tier 2–Multi-session without personally identifiable information,” as defined in the OMB M-10-22 guidance. The policy states, “This tier encompasses any use of multi-session Web measurement and customization technologies when no [personally identifiable information] is collected.” We do not use persistent cookies to collect personally identifiable information.', null);
        this._text_62 = this.renderer.createText(this._el_55, '\n    ', null);
        this._text_63 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_64 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_65 = this.renderer.createText(this._el_64, 'If you do not want to accept cookies, you can edit your browser’s options to stop accepting persistent cookies or to prompt you before accepting a cookie from the websites you visit. Here are instructions for how you can disable cookies and/or Google Demographic and Interests reports.', null);
        this._text_66 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_67 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_68 = this.renderer.createText(this._el_67, 'Google Analytics', null);
        this._text_69 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_70 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_71 = this.renderer.createText(this._el_70, 'Code.gov participates in the U.S. Digital Analytics Program, (DAP) which utilizes a unified Google Analytics account for Federal agencies. This program helps Federal agencies understand how people find, access, and use government services online.', null);
        this._text_72 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_73 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_74 = this.renderer.createText(this._el_73, 'The DAP is a hosted shared service provided by the General Services Administration’s (GSA’s) Office of Citizen Services and Innovative Technologies, and the protocol and information collected are the same for all websites participating in the DAP. As a participant in GSA’s DAP program, this website’s Google Analytics traffic data is automatically reported to GSA.', null);
        this._text_75 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_76 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_77 = this.renderer.createText(this._el_76, 'Google Analytics is a third-party web measurement and customization technology as defined in OMB M-10-22 (PDF).', null);
        this._text_78 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_79 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_80 = this.renderer.createText(this._el_79, 'Here is how it works: Google Analytics sets one or more cookies on your computer so that it can recognize your computer if you visit the Code.gov website in the future. These cookies doe not collect personally identifiable information. This is considered a Tier 2 usage, as defined in the OMB guidance.', null);
        this._text_81 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_82 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_83 = this.renderer.createText(this._el_82, 'Google Analytics does not collect personally identifiable information through its cookies. The program does not track individuals and anonymizes the IP addresses of visitors. Common Questions about DAP (FAQ) provides more information about how IP addresses are anonymized. According to GSA’s Common Questions About DAP, “none of the federal government data tracked as part of the Data Analytics Program will be shared with or available to Google’s corporate advertising partners.”', null);
        this._text_84 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_85 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_86 = this.renderer.createText(this._el_85, 'A limited number of authorized individuals will have user accounts that will allow them to log in to the Google Analytics dashboard and view or run reports regarding visits to Code.gov and the other web metrics available from the DAP.', null);
        this._text_87 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_88 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_89 = this.renderer.createText(this._el_88, 'Visitors who choose to disable this web measurement tool will still have full access to Code.gov. While the details vary from browser to browser, most modern browsers can be set up to accept, reject, or request user intervention when a site asks to set a cookie.', null);
        this._text_90 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_91 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_92 = this.renderer.createText(this._el_91, 'You can view web metrics information at ', null);
        this._el_93 = import4$1.createRenderElement(this.renderer, this._el_91, 'a', new import4$1.InlineArray2(2, 'href', 'https://analytics.usa.gov'), null);
        this._text_94 = this.renderer.createText(this._el_93, 'https://analytics.usa.gov/', null);
        this._text_95 = this.renderer.createText(this._el_91, '.', null);
        this._text_96 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_97 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_98 = this.renderer.createText(this._el_97, 'Contacting the Office of the Federal Chief Information Officer about Code.gov', null);
        this._text_99 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_100 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_101 = this.renderer.createText(this._el_100, 'Users of this website may send the Office of the Federal Chief Information Officer feedback or report an issue by sending an email to code@gsa.gov. If you choose to send us your personally identifiable information, we will only use that information to respond to your message. We only share the information you give us with another government agency if your question relates to that agency, or as otherwise required by law. Code.gov never collects information or creates individual profiles for the purposes of advertising, marketing, or any other commercial purpose. When you contact us, any personally identifiable information you provide is voluntary. Please do not include sensitive personally identifiable information or other sensitive information in the content of your email.', null);
        this._text_102 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_103 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_104 = this.renderer.createText(this._el_103, 'Children and Privacy on Code.gov', null);
        this._text_105 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_106 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_107 = this.renderer.createText(this._el_106, 'We believe in the importance of protecting the privacy of children online. The Children’s Online Privacy Protection Act (COPPA) governs information gathered online from or about children under the age of 13. This site is not intended to solicit or collection information of any kind from children under age 13. If you believe that we have received information from a child under age 13, please contact us at code@gsa.gov.', null);
        this._text_108 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_109 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_110 = this.renderer.createText(this._el_109, 'Security', null);
        this._text_111 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_112 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_113 = this.renderer.createText(this._el_112, 'This website was built using GitHub Pages, a service provided by GitHub, Inc. (GitHub) designed to enable the rapid deployment of government websites in a secure and readily accessible environment.', null);
        this._text_114 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_115 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_116 = this.renderer.createText(this._el_115, 'The terms of service applicable to Federal users of GitHub states that it “will, in good faith, exercise due diligence using generally accepted commercial business practices for IT security, to ensure that systems are operated and maintained in a secure manner, and that management, operational and technical controls will be employed to ensure security of systems and data. Recognizing the changing nature of the Web, [GitHub] will continuously work with users to ensure that its products and services are operated and maintained in a secure manner. [GitHub] agrees to discuss implementing additional security controls as deemed necessary by the Agency to conform to the Federal Information Security Management Act (FISMA), 44 U.S.C. 3541 et seq.”', null);
        this._text_117 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_118 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_119 = this.renderer.createText(this._el_118, 'We encourage you to visit ', null);
        this._el_120 = import4$1.createRenderElement(this.renderer, this._el_118, 'a', new import4$1.InlineArray4(4, 'external-link', '', 'href', 'https://help.github.com/articles/github-terms-of-service/'), null);
        this._ExternalLinkDirective_120_3 = new Wrapper_ExternalLinkDirective(new import20$1.ElementRef(this._el_120), this.parentInjector.get(ModalService));
        this._text_121 = this.renderer.createText(this._el_120, 'GitHub', null);
        this._text_122 = this.renderer.createText(this._el_118, ' if you have additional questions about the service.', null);
        this._text_123 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_124 = import4$1.createRenderElement(this.renderer, this._el_2, 'h3', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_125 = this.renderer.createText(this._el_124, 'Questions about the Privacy Policy', null);
        this._text_126 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_127 = import4$1.createRenderElement(this.renderer, this._el_2, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_128 = this.renderer.createText(this._el_127, 'Write to the Code.gov team at: ', null);
        this._el_129 = import4$1.createRenderElement(this.renderer, this._el_127, 'a', new import4$1.InlineArray2(2, 'href', 'mailto:code@gsa.gov'), null);
        this._text_130 = this.renderer.createText(this._el_129, 'code@gsa.gov', null);
        this._text_131 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_132 = this.renderer.createText(this._el_0, '\n', null);
        this._text_133 = this.renderer.createText(parentRenderNode, '\n', null);
        this._el_134 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'modal', import4$1.EMPTY_INLINE_ARRAY, null);
        this._appEl_134 = new import3$1.AppElement(134, null, this, this._el_134);
        var compView_134 = viewFactory_ModalComponent0(this.viewUtils, this.injector(134), this._appEl_134);
        this._ModalComponent_134_4 = new Wrapper_ModalComponent(this.parentInjector.get(ModalService));
        this._appEl_134.initComponent(this._ModalComponent_134_4.context, [], compView_134);
        compView_134.create(this._ModalComponent_134_4.context, [], null);
        this._text_135 = this.renderer.createText(parentRenderNode, '\n', null);
        var disposable_0 = this.renderer.listen(this._el_120, 'click', this.eventHandler(this._handle_click_120_0.bind(this)));
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._text_6,
            this._el_7,
            this._text_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._text_15,
            this._el_16,
            this._text_17,
            this._text_18,
            this._el_19,
            this._text_20,
            this._el_21,
            this._text_22,
            this._text_23,
            this._el_24,
            this._text_25,
            this._text_26,
            this._el_27,
            this._text_28,
            this._text_29,
            this._el_30,
            this._text_31,
            this._text_32,
            this._el_33,
            this._text_34,
            this._text_35,
            this._el_36,
            this._text_37,
            this._text_38,
            this._el_39,
            this._text_40,
            this._text_41,
            this._el_42,
            this._text_43,
            this._text_44,
            this._text_45,
            this._el_46,
            this._text_47,
            this._text_48,
            this._el_49,
            this._text_50,
            this._text_51,
            this._el_52,
            this._text_53,
            this._text_54,
            this._el_55,
            this._text_56,
            this._el_57,
            this._text_58,
            this._text_59,
            this._el_60,
            this._text_61,
            this._text_62,
            this._text_63,
            this._el_64,
            this._text_65,
            this._text_66,
            this._el_67,
            this._text_68,
            this._text_69,
            this._el_70,
            this._text_71,
            this._text_72,
            this._el_73,
            this._text_74,
            this._text_75,
            this._el_76,
            this._text_77,
            this._text_78,
            this._el_79,
            this._text_80,
            this._text_81,
            this._el_82,
            this._text_83,
            this._text_84,
            this._el_85,
            this._text_86,
            this._text_87,
            this._el_88,
            this._text_89,
            this._text_90,
            this._el_91,
            this._text_92,
            this._el_93,
            this._text_94,
            this._text_95,
            this._text_96,
            this._el_97,
            this._text_98,
            this._text_99,
            this._el_100,
            this._text_101,
            this._text_102,
            this._el_103,
            this._text_104,
            this._text_105,
            this._el_106,
            this._text_107,
            this._text_108,
            this._el_109,
            this._text_110,
            this._text_111,
            this._el_112,
            this._text_113,
            this._text_114,
            this._el_115,
            this._text_116,
            this._text_117,
            this._el_118,
            this._text_119,
            this._el_120,
            this._text_121,
            this._text_122,
            this._text_123,
            this._el_124,
            this._text_125,
            this._text_126,
            this._el_127,
            this._text_128,
            this._el_129,
            this._text_130,
            this._text_131,
            this._text_132,
            this._text_133,
            this._el_134,
            this._text_135
        ], [disposable_0], []);
        return null;
    };
    _View_PrivacyPolicyComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === ExternalLinkDirective) && ((120 <= requestNodeIndex) && (requestNodeIndex <= 121)))) {
            return this._ExternalLinkDirective_120_3.context;
        }
        if (((token === ModalComponent) && (134 === requestNodeIndex))) {
            return this._ModalComponent_134_4.context;
        }
        return notFoundResult;
    };
    _View_PrivacyPolicyComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        this._ExternalLinkDirective_120_3.detectChangesInInputProps(this, this._el_120, throwOnChange);
        this._ModalComponent_134_4.detectChangesInInputProps(this, this._el_134, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._ExternalLinkDirective_120_3.detectChangesInHostProps(this, this._el_120, throwOnChange);
        this._ModalComponent_134_4.detectChangesInHostProps(this, this._el_134, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_PrivacyPolicyComponent0.prototype._handle_click_120_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_120_0 = (this._ExternalLinkDirective_120_3.context.onClick($event) !== false);
        return (true && pd_120_0);
    };
    return _View_PrivacyPolicyComponent0;
}(import1.AppView));
function viewFactory_PrivacyPolicyComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_PrivacyPolicyComponent === null)) {
        (renderType_PrivacyPolicyComponent = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.Emulated, styles_PrivacyPolicyComponent, {}));
    }
    return new _View_PrivacyPolicyComponent0(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var styles$4 = ['.four-oh-four-container[_ngcontent-%COMP%] {\n  padding-bottom: 5em;\n  padding-top: 5em; }'];

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_FourOhFourComponent = (function () {
    function Wrapper_FourOhFourComponent(p0) {
        this.changed = false;
        this.context = new FourOhFourComponent(p0);
    }
    Wrapper_FourOhFourComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_FourOhFourComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_FourOhFourComponent;
}());
var renderType_FourOhFourComponent_Host = null;
var _View_FourOhFourComponent_Host0 = (function (_super) {
    __extends(_View_FourOhFourComponent_Host0, _super);
    function _View_FourOhFourComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_FourOhFourComponent_Host0, renderType_FourOhFourComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_FourOhFourComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.selectOrCreateRenderHostElement(this.renderer, 'four-oh-four', import4$1.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_FourOhFourComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._FourOhFourComponent_0_4 = new Wrapper_FourOhFourComponent(this.parentInjector.get(StateService));
        this._appEl_0.initComponent(this._FourOhFourComponent_0_4.context, [], compView_0);
        compView_0.create(this._FourOhFourComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_FourOhFourComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === FourOhFourComponent) && (0 === requestNodeIndex))) {
            return this._FourOhFourComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_FourOhFourComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._FourOhFourComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._FourOhFourComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_FourOhFourComponent_Host0;
}(import1.AppView));
function viewFactory_FourOhFourComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_FourOhFourComponent_Host === null)) {
        (renderType_FourOhFourComponent_Host = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.None, [], {}));
    }
    return new _View_FourOhFourComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var FourOhFourComponentNgFactory = new import11$1.ComponentFactory('four-oh-four', viewFactory_FourOhFourComponent_Host0, FourOhFourComponent);
var styles_FourOhFourComponent = [styles$4];
var renderType_FourOhFourComponent = null;
var _View_FourOhFourComponent0 = (function (_super) {
    __extends(_View_FourOhFourComponent0, _super);
    function _View_FourOhFourComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_FourOhFourComponent0, renderType_FourOhFourComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_FourOhFourComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid four-oh-four-container'), null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'h1', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_3 = this.renderer.createText(this._el_2, 'We can’t find the page you’re looking for.', null);
        this._text_4 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_5 = import4$1.createRenderElement(this.renderer, this._el_0, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_6 = this.renderer.createText(this._el_5, '\n    If you’re looking for code, ', null);
        this._el_7 = import4$1.createRenderElement(this.renderer, this._el_5, 'a', new import4$1.InlineArray2(2, 'routerLink', '/explore-code'), null);
        this._RouterLinkWithHref_7_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_8 = this.renderer.createText(this._el_7, 'start here', null);
        this._text_9 = this.renderer.createText(this._el_5, '.\n  ', null);
        this._text_10 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_11 = import4$1.createRenderElement(this.renderer, this._el_0, 'p', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_12 = this.renderer.createText(this._el_11, '\n    Otherwise, check out how you can implment the Federal Open Source Code Policy ', null);
        this._el_13 = import4$1.createRenderElement(this.renderer, this._el_11, 'a', new import4$1.InlineArray2(2, 'routerLink', '/policy-guide'), null);
        this._RouterLinkWithHref_13_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_14 = this.renderer.createText(this._el_13, 'here', null);
        this._text_15 = this.renderer.createText(this._el_11, '.\n  ', null);
        this._text_16 = this.renderer.createText(this._el_0, '\n', null);
        this._text_17 = this.renderer.createText(parentRenderNode, '\n', null);
        var disposable_0 = this.renderer.listen(this._el_7, 'click', this.eventHandler(this._handle_click_7_0.bind(this)));
        var disposable_1 = this.renderer.listen(this._el_13, 'click', this.eventHandler(this._handle_click_13_0.bind(this)));
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._text_4,
            this._el_5,
            this._text_6,
            this._el_7,
            this._text_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._text_15,
            this._text_16,
            this._text_17
        ], [
            disposable_0,
            disposable_1
        ], []);
        return null;
    };
    _View_FourOhFourComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import22$1.RouterLinkWithHref) && ((7 <= requestNodeIndex) && (requestNodeIndex <= 8)))) {
            return this._RouterLinkWithHref_7_3.context;
        }
        if (((token === import22$1.RouterLinkWithHref) && ((13 <= requestNodeIndex) && (requestNodeIndex <= 14)))) {
            return this._RouterLinkWithHref_13_3.context;
        }
        return notFoundResult;
    };
    _View_FourOhFourComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_7_0_0 = '/explore-code';
        this._RouterLinkWithHref_7_3.check_routerLink(currVal_7_0_0, throwOnChange, false);
        this._RouterLinkWithHref_7_3.detectChangesInInputProps(this, this._el_7, throwOnChange);
        var currVal_13_0_0 = '/policy-guide';
        this._RouterLinkWithHref_13_3.check_routerLink(currVal_13_0_0, throwOnChange, false);
        this._RouterLinkWithHref_13_3.detectChangesInInputProps(this, this._el_13, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._RouterLinkWithHref_7_3.detectChangesInHostProps(this, this._el_7, throwOnChange);
        this._RouterLinkWithHref_13_3.detectChangesInHostProps(this, this._el_13, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_FourOhFourComponent0.prototype.destroyInternal = function () {
        this._RouterLinkWithHref_7_3.context.ngOnDestroy();
        this._RouterLinkWithHref_13_3.context.ngOnDestroy();
    };
    _View_FourOhFourComponent0.prototype._handle_click_7_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_7_0 = (this._RouterLinkWithHref_7_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_7_0);
    };
    _View_FourOhFourComponent0.prototype._handle_click_13_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_13_0 = (this._RouterLinkWithHref_13_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_13_0);
    };
    return _View_FourOhFourComponent0;
}(import1.AppView));
function viewFactory_FourOhFourComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_FourOhFourComponent === null)) {
        (renderType_FourOhFourComponent = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.Emulated, styles_FourOhFourComponent, {}));
    }
    return new _View_FourOhFourComponent0(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var styles$5 = ['html[_ngcontent-%COMP%] {\n  box-sizing: border-box; }\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::after, *[_ngcontent-%COMP%]::before {\n  box-sizing: inherit; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeInUp {\n  from {\n    -moz-transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -moz-transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeInUp {\n  from {\n    -webkit-transform: translateY(0.5em);\n    -moz-transform: translateY(0.5em);\n    -ms-transform: translateY(0.5em);\n    -o-transform: translateY(0.5em);\n    transform: translateY(0.5em);\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-moz-keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n@-webkit-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@-moz-keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\n@keyframes blink {\n  from, to {\n    color: transparent; }\n  50% {\n    color: #23c0ba; } }\n\nbody[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\nlabel[_ngcontent-%COMP%] {\n  -webkit-font-feature-settings: "kern", "liga", "pnum";\n  -moz-font-feature-settings: "kern", "liga", "pnum";\n  -ms-font-feature-settings: "kern", "liga", "pnum";\n  font-feature-settings: "kern", "liga", "pnum";\n  -webkit-font-smoothing: antialiased; }\n\na[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 3px rgba(50, 58, 69, 0.25), 0 0 7px rgba(50, 58, 69, 0.25);\n  outline: 0; }\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  color: #323a45;\n  font-family: "TT Lakes", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;\n  font-weight: 500; }\n  h1[_ngcontent-%COMP%]:first-child, h2[_ngcontent-%COMP%]:first-child, h3[_ngcontent-%COMP%]:first-child, h4[_ngcontent-%COMP%]:first-child, h5[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]:first-child {\n    margin-top: 0; }\n\np[_ngcontent-%COMP%] {\n  color: #5b616b; }\n  @media screen and (min-width: 40em) {\n    p[_ngcontent-%COMP%] {\n      font-size: 1.1em; } }\n\n.usa-button[_ngcontent-%COMP%], .usa-button.usa-button-big[_ngcontent-%COMP%], .usa-button-primary.usa-button-big[_ngcontent-%COMP%], .usa-button[_ngcontent-%COMP%]:visited.usa-button-big, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big, button.usa-button-big[_ngcontent-%COMP%], [type="button"].usa-button-big[_ngcontent-%COMP%], [type="submit"].usa-button-big[_ngcontent-%COMP%], [type="reset"].usa-button-big[_ngcontent-%COMP%], [type="image"].usa-button-big[_ngcontent-%COMP%] {\n  -webkit-transition: all 0.2s ease;\n  -moz-transition: all 0.2s ease;\n  transition: all 0.2s ease; }\n  .usa-button[_ngcontent-%COMP%]:hover, .usa-button.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button-primary.usa-button-big[_ngcontent-%COMP%]:hover, .usa-button[_ngcontent-%COMP%]:visited.usa-button-big:hover, .usa-button-primary[_ngcontent-%COMP%]:visited.usa-button-big:hover, button.usa-button-big[_ngcontent-%COMP%]:hover, [type="button"].usa-button-big[_ngcontent-%COMP%]:hover, [type="submit"].usa-button-big[_ngcontent-%COMP%]:hover, [type="reset"].usa-button-big[_ngcontent-%COMP%]:hover, [type="image"].usa-button-big[_ngcontent-%COMP%]:hover {\n    -webkit-transform: translateY(-2px);\n    -moz-transform: translateY(-2px);\n    -ms-transform: translateY(-2px);\n    -o-transform: translateY(-2px);\n    transform: translateY(-2px); }\n\n.subnav[_ngcontent-%COMP%] {\n  background-color: #f1f1f1; }\n  .subnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #5b616b;\n    display: inline-block;\n    font-size: 0.95em;\n    font-weight: bold;\n    padding: 0.75em 1.25em;\n    text-decoration: none; }\n    .subnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n      background-color: #485568;\n      color: #ffffff; }\n    .subnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n      background-color: #485568;\n      color: #ffffff; }\n  .subnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin-right: 1.5em; }\n    .subnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.9em;\n      margin-left: 0.4em;\n      vertical-align: middle; }\n  .subnav[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    background-color: #485568;\n    color: #ffffff; }\n\n.home[_ngcontent-%COMP%]   .app-logo[_ngcontent-%COMP%]   .cls-1[_ngcontent-%COMP%] {\n  fill: #ffffff; }\n\n.home[_ngcontent-%COMP%]   .app-navigation[_ngcontent-%COMP%] {\n  background-color: #005289; }\n  .home[_ngcontent-%COMP%]   .app-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #d0d6df; }\n    .home[_ngcontent-%COMP%]   .app-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {\n      box-shadow: 0 0 3px rgba(255, 255, 255, 0.25), 0 0 7px rgba(255, 255, 255, 0.25); }\n    .home[_ngcontent-%COMP%]   .app-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n      color: #ffffff; }\n\n.agency-logos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-right: 0.5em; }\n\n.agency-logos[_ngcontent-%COMP%]   .gsa[_ngcontent-%COMP%], .agency-logos[_ngcontent-%COMP%]   .pif[_ngcontent-%COMP%] {\n  max-width: 2.75em; }\n\n.agency-logos[_ngcontent-%COMP%]   .whitehouse[_ngcontent-%COMP%] {\n  max-width: 4em; }\n\n.app-footer[_ngcontent-%COMP%] {\n  background-color: #e4e4e4;\n  padding: 2em 0 3em; }\n  .app-footer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    color: #4f555d;\n    font-size: 0.8em;\n    margin-top: 0; }\n  .app-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: #323a45;\n    font-size: 0.9em;\n    margin-top: 0; }\n  .app-footer[_ngcontent-%COMP%]   .email-signup[_ngcontent-%COMP%] {\n    margin-top: 2em; }\n    @media screen and (min-width: 40em) {\n      .app-footer[_ngcontent-%COMP%]   .email-signup[_ngcontent-%COMP%] {\n        margin-top: 0; } }\n  .app-footer[_ngcontent-%COMP%]   .email[_ngcontent-%COMP%] {\n    border: 1px solid #8e949e;\n    font-size: 0.9em; }\n  .app-footer[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%] {\n    -webkit-transition: all 0.2s ease;\n    -moz-transition: all 0.2s ease;\n    transition: all 0.2s ease;\n    background-color: #42519F;\n    font-size: 0.9em;\n    margin: 0.75em 0 0; }\n    .app-footer[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]:hover {\n      -webkit-transform: translateY(-2px);\n      -moz-transform: translateY(-2px);\n      -ms-transform: translateY(-2px);\n      -o-transform: translateY(-2px);\n      transform: translateY(-2px);\n      background-color: #333f7b; }\n\n.app-links[_ngcontent-%COMP%] {\n  display: block;\n  float: right; }\n  .app-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #323a45;\n    text-decoration: none; }\n    .app-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n      border-bottom: 3px solid #23c0ba;\n      color: #1c4772; }\n    .app-links[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n      color: #1c4772;\n      font-weight: bold; }\n  .app-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    display: inline-block;\n    font-size: 1em;\n    margin-left: 1em; }\n\n.app-logo[_ngcontent-%COMP%] {\n  float: left;\n  width: 6em; }\n  .app-logo[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: block; }\n    .app-logo[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {\n      box-shadow: none;\n      outline: 0; }\n  .app-logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .app-logo[_ngcontent-%COMP%]   .svg-container[_ngcontent-%COMP%] {\n    height: 0;\n    padding-top: 29%;\n    position: relative;\n    width: 100%; }\n\n.app-navigation[_ngcontent-%COMP%] {\n  font-size: 0.8em;\n  padding: 1.75em 0; }\n  @media screen and (min-width: 30.0625em) {\n    .app-navigation[_ngcontent-%COMP%] {\n      font-size: 1em; } }\n  .app-navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    text-decoration: none; }\n\n.footer-links[_ngcontent-%COMP%] {\n  margin-bottom: 1em; }\n  .footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #5b616b;\n    font-size: 0.9em;\n    text-decoration: none; }\n    .footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n      border-bottom: 3px solid #23c0ba;\n      color: #1c4772; }\n  .footer-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin-right: 1em; }\n\n.usa-disclaimer[_ngcontent-%COMP%] {\n  height: auto;\n  padding: 0.3em 0; }\n  .usa-disclaimer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #1c4772;\n    font-weight: bold;\n    text-decoration: none; }\n  .usa-disclaimer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-width: 1.5em; }\n  .usa-disclaimer[_ngcontent-%COMP%]   .usa-disclaimer-stage[_ngcontent-%COMP%] {\n    margin-bottom: 0;\n    margin-top: 0; }'];

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_RouterLinkActive = (function () {
    function Wrapper_RouterLinkActive(p0, p1, p2) {
        this.changed = false;
        this.changes = {};
        this.context = new import23$1.RouterLinkActive(p0, p1, p2);
        this._expr_0 = import1$1.UNINITIALIZED;
        this._expr_1 = import1$1.UNINITIALIZED;
    }
    Wrapper_RouterLinkActive.prototype.check_routerLinkActiveOptions = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_0, currValue))) {
            this.changed = true;
            this.context.routerLinkActiveOptions = currValue;
            this.changes['routerLinkActiveOptions'] = new import1$1.SimpleChange(this._expr_0, currValue);
            this._expr_0 = currValue;
        }
    };
    Wrapper_RouterLinkActive.prototype.check_routerLinkActive = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import4$1.checkBinding(throwOnChange, this._expr_1, currValue))) {
            this.changed = true;
            this.context.routerLinkActive = currValue;
            this.changes['routerLinkActive'] = new import1$1.SimpleChange(this._expr_1, currValue);
            this._expr_1 = currValue;
        }
    };
    Wrapper_RouterLinkActive.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        if (!throwOnChange) {
            if (changed) {
                this.context.ngOnChanges(this.changes);
                this.changes = {};
            }
        }
        return changed;
    };
    Wrapper_RouterLinkActive.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_RouterLinkActive;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_RouterOutlet = (function () {
    function Wrapper_RouterOutlet(p0, p1, p2, p3) {
        this.changed = false;
        this.context = new import24$1.RouterOutlet(p0, p1, p2, p3);
    }
    Wrapper_RouterOutlet.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        return changed;
    };
    Wrapper_RouterOutlet.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_RouterOutlet;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var Wrapper_AppComponent = (function () {
    function Wrapper_AppComponent(p0, p1) {
        this.changed = false;
        this.context = new AppComponent(p0, p1);
    }
    Wrapper_AppComponent.prototype.detectChangesInInputProps = function (view, el, throwOnChange) {
        var changed = this.changed;
        this.changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_AppComponent.prototype.detectChangesInHostProps = function (view, el, throwOnChange) {
    };
    return Wrapper_AppComponent;
}());
var renderType_AppComponent_Host = null;
var _View_AppComponent_Host0 = (function (_super) {
    __extends(_View_AppComponent_Host0, _super);
    function _View_AppComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_AppComponent_Host0, renderType_AppComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
    }
    _View_AppComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = import4$1.selectOrCreateRenderHostElement(this.renderer, 'app', import4$1.EMPTY_INLINE_ARRAY, rootSelector, null);
        this._appEl_0 = new import3$1.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_AppComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._AppComponent_0_4 = new Wrapper_AppComponent(this.parentInjector.get(import8.Router), this.parentInjector.get(StateService));
        this._appEl_0.initComponent(this._AppComponent_0_4.context, [], compView_0);
        compView_0.create(this._AppComponent_0_4.context, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_AppComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === AppComponent) && (0 === requestNodeIndex))) {
            return this._AppComponent_0_4.context;
        }
        return notFoundResult;
    };
    _View_AppComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        this._AppComponent_0_4.detectChangesInInputProps(this, this._el_0, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        this._AppComponent_0_4.detectChangesInHostProps(this, this._el_0, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_AppComponent_Host0;
}(import1.AppView));
function viewFactory_AppComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_AppComponent_Host === null)) {
        (renderType_AppComponent_Host = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.None, [], {}));
    }
    return new _View_AppComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var AppComponentNgFactory = new import11$1.ComponentFactory('app', viewFactory_AppComponent_Host0, AppComponent);
var styles_AppComponent = [styles$5];
var renderType_AppComponent = null;
var _View_AppComponent0 = (function (_super) {
    __extends(_View_AppComponent0, _super);
    function _View_AppComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_AppComponent0, renderType_AppComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import1$1.ChangeDetectorStatus.CheckAlways);
        this._expr_139 = import1$1.UNINITIALIZED;
        this._arr_140 = import4$1.pureProxy1(function (p0) {
            return [p0];
        });
    }
    _View_AppComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = import4$1.createRenderElement(this.renderer, parentRenderNode, 'div', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_1 = this.renderer.createText(this._el_0, '\n  ', null);
        this._el_2 = import4$1.createRenderElement(this.renderer, this._el_0, 'header', new import4$1.InlineArray2(2, 'role', 'banner'), null);
        this._text_3 = this.renderer.createText(this._el_2, '\n    ', null);
        this._el_4 = import4$1.createRenderElement(this.renderer, this._el_2, 'div', new import4$1.InlineArray2(2, 'class', 'usa-disclaimer'), null);
        this._text_5 = this.renderer.createText(this._el_4, '\n      ', null);
        this._el_6 = import4$1.createRenderElement(this.renderer, this._el_4, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_7 = this.renderer.createText(this._el_6, '\n        ', null);
        this._el_8 = import4$1.createRenderElement(this.renderer, this._el_6, 'span', new import4$1.InlineArray2(2, 'class', 'usa-disclaimer-official'), null);
        this._text_9 = this.renderer.createText(this._el_8, '\n          ', null);
        this._el_10 = import4$1.createRenderElement(this.renderer, this._el_8, 'img', new import4$1.InlineArray4(4, 'alt', 'U.S. flag', 'src', 'assets/img/us_flag_small.png'), null);
        this._text_11 = this.renderer.createText(this._el_8, '\n          An official website of the United States Government\n        ', null);
        this._text_12 = this.renderer.createText(this._el_6, '\n        ', null);
        this._el_13 = import4$1.createRenderElement(this.renderer, this._el_6, 'span', new import4$1.InlineArray2(2, 'class', 'usa-disclaimer-stage'), null);
        this._text_14 = this.renderer.createText(this._el_13, '\n          This site is currently in beta.\n        ', null);
        this._text_15 = this.renderer.createText(this._el_6, '\n      ', null);
        this._text_16 = this.renderer.createText(this._el_4, '\n    ', null);
        this._text_17 = this.renderer.createText(this._el_2, '\n\n    ', null);
        this._el_18 = import4$1.createRenderElement(this.renderer, this._el_2, 'nav', new import4$1.InlineArray4(4, 'class', 'app-navigation', 'role', 'navigation'), null);
        this._text_19 = this.renderer.createText(this._el_18, '\n      ', null);
        this._el_20 = import4$1.createRenderElement(this.renderer, this._el_18, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_21 = this.renderer.createText(this._el_20, '\n        ', null);
        this._el_22 = import4$1.createRenderElement(this.renderer, this._el_20, 'div', new import4$1.InlineArray2(2, 'class', 'app-logo'), null);
        this._text_23 = this.renderer.createText(this._el_22, '\n          ', null);
        this._el_24 = import4$1.createRenderElement(this.renderer, this._el_22, 'a', import4$1.EMPTY_INLINE_ARRAY, null);
        this._RouterLinkWithHref_24_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_25 = this.renderer.createText(this._el_24, '\n            ', null);
        this._el_26 = import4$1.createRenderElement(this.renderer, this._el_24, 'div', new import4$1.InlineArray2(2, 'class', 'svg-container'), null);
        this._text_27 = this.renderer.createText(this._el_26, '\n              ', null);
        this._el_28 = import4$1.createRenderElement(this.renderer, this._el_26, ':svg:svg', new import4$1.InlineArray8(8, 'data-name', 'Layer 1', 'id', 'Layer_1', 'viewBox', '0 0 628.17 152.05', 'xmlns', 'http://www.w3.org/2000/svg'), null);
        this._el_29 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:defs', import4$1.EMPTY_INLINE_ARRAY, null);
        this._el_30 = import4$1.createRenderElement(this.renderer, this._el_29, ':svg:style', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_31 = this.renderer.createText(this._el_30, '.cls-1{fill:#485567;}.cls-2{fill:#0ac0bb;}', null);
        this._el_32 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:title', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_33 = this.renderer.createText(this._el_32, 'code.gov', null);
        this._el_34 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:path', new import4$1.InlineArray4(4, 'class', 'cls-1', 'd', 'M73,113.49q0-5.11,5.19-5.11H90.61q5.19,0,5.19,5.15v4.12q0,33-33.21,33h-28q-33.21,0-33.21-32.9V74.53q0-32.9,33.21-32.9h28q33.21,0,33.21,32.95V78.7q0,5.15-5.19,5.15H78.16Q73,83.85,73,78.74V75.67q0-6.13-3.63-9.71t-9.86-3.58H37.68q-6.23,0-9.86,3.58t-3.63,9.71v40.88q0,6.13,3.63,9.71t9.86,3.58H59.48q6.23,0,9.86-3.58T73,116.56Z'), null);
        this._el_35 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:path', new import4$1.InlineArray4(4, 'class', 'cls-1', 'd', 'M120.71,74.53q0-32.9,33.21-32.9H184q33.21,0,33.21,32.9v43.18q0,32.89-33.21,32.9h-30.1q-33.21,0-33.21-32.9Zm22.83,42q0,6.13,3.63,9.71t9.86,3.58H180.9q6.23,0,9.86-3.58t3.63-9.71V75.68q0-6.13-3.63-9.71t-9.86-3.58H157q-6.23,0-9.86,3.58t-3.63,9.71Z'), null);
        this._el_36 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:path', new import4$1.InlineArray4(4, 'class', 'cls-1', 'd', 'M315.81,42.67V9.33q0-5.05,5.19-5.05h12.45q5.19,0,5.19,5.19V144.38q0,5.19-5.19,5.19H321q-5.19,0-5.19-5.43V138.7h-1a19.33,19.33,0,0,1-4.57,6,28.11,28.11,0,0,1-6.43,4.07A22.58,22.58,0,0,1,294,150.6H277.41q-33.21,0-33.21-33.21V75.88q0-33.2,33.21-33.21Zm0,20.76H280.52q-6.23,0-9.86,3.63T267,76.92v39.44q0,6.23,3.63,9.86t9.86,3.63h17.64q7.88,0,12.77-4.88t4.88-12.77Z'), null);
        this._el_37 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:path', new import4$1.InlineArray4(4, 'class', 'cls-1', 'd', 'M439.3,118.43q0-5.19,5.19-5.19h12.45q5.19,0,5.19,5.19,0,15.57-8.41,23.87t-24.8,8.3h-28q-33.21,0-33.21-32.9V74.53q0-32.9,33.21-32.9h28q33.21,0,33.21,32.66V98.8q0,5.11-5.19,5.11H390.53v12.45q0,6.23,3.63,9.86t9.86,3.63h23.87Q439.3,129.85,439.3,118.43ZM390.53,84.19H439.3V75.27q0-5.95-3.63-9.41t-9.86-3.47H404q-6.23,0-9.86,3.47t-3.63,9.41Z'), null);
        this._el_38 = import4$1.createRenderElement(this.renderer, this._el_28, ':svg:rect', new import4$1.InlineArray16(14, 'class', 'cls-2', 'height', '24.13', 'rx', '3', 'ry', '3', 'width', '139.23', 'x', '485.66', 'y', '126.41'), null);
        this._text_39 = this.renderer.createText(this._el_26, '\n            ', null);
        this._text_40 = this.renderer.createText(this._el_24, '\n          ', null);
        this._text_41 = this.renderer.createText(this._el_22, '\n        ', null);
        this._text_42 = this.renderer.createText(this._el_20, '\n        ', null);
        this._el_43 = import4$1.createRenderElement(this.renderer, this._el_20, 'ul', new import4$1.InlineArray2(2, 'class', 'app-links usa-unstyled-list'), null);
        this._text_44 = this.renderer.createText(this._el_43, '\n          ', null);
        this._el_45 = import4$1.createRenderElement(this.renderer, this._el_43, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_46 = this.renderer.createText(this._el_45, '\n            ', null);
        this._el_47 = import4$1.createRenderElement(this.renderer, this._el_45, 'a', new import4$1.InlineArray4(4, 'routerLink', 'explore-code', 'routerLinkActive', 'active'), null);
        this._RouterLinkWithHref_47_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._RouterLinkActive_47_4 = new Wrapper_RouterLinkActive(this.parentInjector.get(import8.Router), new import20$1.ElementRef(this._el_47), this.renderer);
        this._query_RouterLink_47_0 = new import15$1.QueryList();
        this._query_RouterLinkWithHref_47_1 = new import15$1.QueryList();
        this._text_48 = this.renderer.createText(this._el_47, '\n              Explore Code\n            ', null);
        this._text_49 = this.renderer.createText(this._el_45, '\n          ', null);
        this._text_50 = this.renderer.createText(this._el_43, '\n          ', null);
        this._el_51 = import4$1.createRenderElement(this.renderer, this._el_43, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_52 = this.renderer.createText(this._el_51, '\n            ', null);
        this._el_53 = import4$1.createRenderElement(this.renderer, this._el_51, 'a', new import4$1.InlineArray4(4, 'routerLink', 'policy-guide', 'routerLinkActive', 'active'), null);
        this._RouterLinkWithHref_53_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._RouterLinkActive_53_4 = new Wrapper_RouterLinkActive(this.parentInjector.get(import8.Router), new import20$1.ElementRef(this._el_53), this.renderer);
        this._query_RouterLink_53_0 = new import15$1.QueryList();
        this._query_RouterLinkWithHref_53_1 = new import15$1.QueryList();
        this._text_54 = this.renderer.createText(this._el_53, '\n              Policy Info\n            ', null);
        this._text_55 = this.renderer.createText(this._el_51, '\n          ', null);
        this._text_56 = this.renderer.createText(this._el_43, '\n        ', null);
        this._text_57 = this.renderer.createText(this._el_20, '\n      ', null);
        this._text_58 = this.renderer.createText(this._el_18, '\n    ', null);
        this._text_59 = this.renderer.createText(this._el_2, '\n  ', null);
        this._text_60 = this.renderer.createText(this._el_0, '\n\n  ', null);
        this._el_61 = import4$1.createRenderElement(this.renderer, this._el_0, 'main', new import4$1.InlineArray2(2, 'role', 'main'), null);
        this._text_62 = this.renderer.createText(this._el_61, '\n    ', null);
        this._el_63 = import4$1.createRenderElement(this.renderer, this._el_61, 'router-outlet', import4$1.EMPTY_INLINE_ARRAY, null);
        this._appEl_63 = new import3$1.AppElement(63, 61, this, this._el_63);
        this._RouterOutlet_63_5 = new Wrapper_RouterOutlet(this.parentInjector.get(import28.RouterOutletMap), this._appEl_63.vcRef, this.parentInjector.get(import21$1.ComponentFactoryResolver), null);
        this._text_64 = this.renderer.createText(this._el_61, '\n  ', null);
        this._text_65 = this.renderer.createText(this._el_0, '\n\n  ', null);
        this._el_66 = import4$1.createRenderElement(this.renderer, this._el_0, 'footer', new import4$1.InlineArray4(4, 'class', 'app-footer', 'role', 'contentinfo'), null);
        this._text_67 = this.renderer.createText(this._el_66, '\n    ', null);
        this._el_68 = import4$1.createRenderElement(this.renderer, this._el_66, 'div', new import4$1.InlineArray2(2, 'class', 'usa-grid'), null);
        this._text_69 = this.renderer.createText(this._el_68, '\n      ', null);
        this._el_70 = import4$1.createRenderElement(this.renderer, this._el_68, 'div', new import4$1.InlineArray2(2, 'class', 'usa-width-two-thirds'), null);
        this._text_71 = this.renderer.createText(this._el_70, '\n        ', null);
        this._el_72 = import4$1.createRenderElement(this.renderer, this._el_70, 'div', new import4$1.InlineArray2(2, 'class', 'row'), null);
        this._text_73 = this.renderer.createText(this._el_72, '\n          ', null);
        this._el_74 = import4$1.createRenderElement(this.renderer, this._el_72, 'nav', new import4$1.InlineArray2(2, 'class', 'footer-links'), null);
        this._text_75 = this.renderer.createText(this._el_74, '\n            ', null);
        this._el_76 = import4$1.createRenderElement(this.renderer, this._el_74, 'ul', new import4$1.InlineArray2(2, 'class', 'usa-unstyled-list'), null);
        this._text_77 = this.renderer.createText(this._el_76, '\n              ', null);
        this._el_78 = import4$1.createRenderElement(this.renderer, this._el_76, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_79 = this.renderer.createText(this._el_78, '\n                ', null);
        this._el_80 = import4$1.createRenderElement(this.renderer, this._el_78, 'a', new import4$1.InlineArray2(2, 'routerLink', 'privacy-policy'), null);
        this._RouterLinkWithHref_80_3 = new Wrapper_RouterLinkWithHref(this.parentInjector.get(import8.Router), this.parentInjector.get(import17$1.ActivatedRoute), this.parentInjector.get(import18$1.LocationStrategy));
        this._text_81 = this.renderer.createText(this._el_80, 'Privacy Policy', null);
        this._text_82 = this.renderer.createText(this._el_78, '\n              ', null);
        this._text_83 = this.renderer.createText(this._el_76, '\n              ', null);
        this._el_84 = import4$1.createRenderElement(this.renderer, this._el_76, 'li', import4$1.EMPTY_INLINE_ARRAY, null);
        this._text_85 = this.renderer.createText(this._el_84, '\n                ', null);
        this._el_86 = import4$1.createRenderElement(this.renderer, this._el_84, 'a', new import4$1.InlineArray8(6, 'href', 'https://github.com/presidential-innovation-fellows/code-gov-web', 'rel', 'noopener', 'target', '_blank'), null);
        this._text_87 = this.renderer.createText(this._el_86, 'Visit Project Page', null);
        this._text_88 = this.renderer.createText(this._el_84, '\n              ', null);
        this._text_89 = this.renderer.createText(this._el_76, '\n            ', null);
        this._text_90 = this.renderer.createText(this._el_74, '\n          ', null);
        this._text_91 = this.renderer.createText(this._el_72, '\n        ', null);
        this._text_92 = this.renderer.createText(this._el_70, '\n        ', null);
        this._el_93 = import4$1.createRenderElement(this.renderer, this._el_70, 'div', new import4$1.InlineArray2(2, 'class', 'row'), null);
        this._text_94 = this.renderer.createText(this._el_93, '\n          ', null);
        this._el_95 = import4$1.createRenderElement(this.renderer, this._el_93, 'ul', new import4$1.InlineArray2(2, 'class', 'agency-logos usa-unstyled-list'), null);
        this._text_96 = this.renderer.createText(this._el_95, '\n            ', null);
        this._el_97 = import4$1.createRenderElement(this.renderer, this._el_95, 'li', new import4$1.InlineArray2(2, 'class', 'whitehouse'), null);
        this._text_98 = this.renderer.createText(this._el_97, '\n              ', null);
        this._el_99 = import4$1.createRenderElement(this.renderer, this._el_97, 'a', new import4$1.InlineArray8(6, 'href', 'https://whitehouse.gov', 'rel', 'noopener', 'target', '_blank'), null);
        this._text_100 = this.renderer.createText(this._el_99, '\n                ', null);
        this._el_101 = import4$1.createRenderElement(this.renderer, this._el_99, 'img', new import4$1.InlineArray4(4, 'alt', 'The White House', 'src', 'assets/img/logos/whitehouse.png'), null);
        this._text_102 = this.renderer.createText(this._el_99, '\n              ', null);
        this._text_103 = this.renderer.createText(this._el_97, '\n            ', null);
        this._text_104 = this.renderer.createText(this._el_95, '\n            ', null);
        this._el_105 = import4$1.createRenderElement(this.renderer, this._el_95, 'li', new import4$1.InlineArray2(2, 'class', 'pif'), null);
        this._text_106 = this.renderer.createText(this._el_105, '\n              ', null);
        this._el_107 = import4$1.createRenderElement(this.renderer, this._el_105, 'a', new import4$1.InlineArray8(6, 'href', 'https://presidentialinnovationfellows.gov/', 'rel', 'noopener', 'target', '_blank'), null);
        this._text_108 = this.renderer.createText(this._el_107, '\n                ', null);
        this._el_109 = import4$1.createRenderElement(this.renderer, this._el_107, 'img', new import4$1.InlineArray4(4, 'alt', 'Presidential Innovation Fellows', 'src', 'assets/img/logos/PIF.png'), null);
        this._text_110 = this.renderer.createText(this._el_107, '\n              ', null);
        this._text_111 = this.renderer.createText(this._el_105, '\n            ', null);
        this._text_112 = this.renderer.createText(this._el_95, '\n            ', null);
        this._el_113 = import4$1.createRenderElement(this.renderer, this._el_95, 'li', new import4$1.InlineArray2(2, 'class', 'gsa'), null);
        this._text_114 = this.renderer.createText(this._el_113, '\n              ', null);
        this._el_115 = import4$1.createRenderElement(this.renderer, this._el_113, 'a', new import4$1.InlineArray8(6, 'href', '//www.gsa.gov', 'rel', 'noopener', 'target', '_blank'), null);
        this._text_116 = this.renderer.createText(this._el_115, '\n                ', null);
        this._el_117 = import4$1.createRenderElement(this.renderer, this._el_115, 'img', new import4$1.InlineArray4(4, 'alt', 'General Services Administration', 'src', 'assets/img/logos/GSA.png'), null);
        this._text_118 = this.renderer.createText(this._el_115, '\n              ', null);
        this._text_119 = this.renderer.createText(this._el_113, '\n            ', null);
        this._text_120 = this.renderer.createText(this._el_95, '\n          ', null);
        this._text_121 = this.renderer.createText(this._el_93, '\n        ', null);
        this._text_122 = this.renderer.createText(this._el_70, '\n      ', null);
        this._text_123 = this.renderer.createText(this._el_68, '\n    ', null);
        this._text_124 = this.renderer.createText(this._el_66, '\n  ', null);
        this._text_125 = this.renderer.createText(this._el_0, '\n', null);
        this._text_126 = this.renderer.createText(parentRenderNode, '\n', null);
        var disposable_0 = this.renderer.listen(this._el_24, 'click', this.eventHandler(this._handle_click_24_0.bind(this)));
        var disposable_1 = this.renderer.listen(this._el_47, 'click', this.eventHandler(this._handle_click_47_0.bind(this)));
        var disposable_2 = this.renderer.listen(this._el_53, 'click', this.eventHandler(this._handle_click_53_0.bind(this)));
        var disposable_3 = this.renderer.listen(this._el_80, 'click', this.eventHandler(this._handle_click_80_0.bind(this)));
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._el_10,
            this._text_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._text_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._el_20,
            this._text_21,
            this._el_22,
            this._text_23,
            this._el_24,
            this._text_25,
            this._el_26,
            this._text_27,
            this._el_28,
            this._el_29,
            this._el_30,
            this._text_31,
            this._el_32,
            this._text_33,
            this._el_34,
            this._el_35,
            this._el_36,
            this._el_37,
            this._el_38,
            this._text_39,
            this._text_40,
            this._text_41,
            this._text_42,
            this._el_43,
            this._text_44,
            this._el_45,
            this._text_46,
            this._el_47,
            this._text_48,
            this._text_49,
            this._text_50,
            this._el_51,
            this._text_52,
            this._el_53,
            this._text_54,
            this._text_55,
            this._text_56,
            this._text_57,
            this._text_58,
            this._text_59,
            this._text_60,
            this._el_61,
            this._text_62,
            this._el_63,
            this._text_64,
            this._text_65,
            this._el_66,
            this._text_67,
            this._el_68,
            this._text_69,
            this._el_70,
            this._text_71,
            this._el_72,
            this._text_73,
            this._el_74,
            this._text_75,
            this._el_76,
            this._text_77,
            this._el_78,
            this._text_79,
            this._el_80,
            this._text_81,
            this._text_82,
            this._text_83,
            this._el_84,
            this._text_85,
            this._el_86,
            this._text_87,
            this._text_88,
            this._text_89,
            this._text_90,
            this._text_91,
            this._text_92,
            this._el_93,
            this._text_94,
            this._el_95,
            this._text_96,
            this._el_97,
            this._text_98,
            this._el_99,
            this._text_100,
            this._el_101,
            this._text_102,
            this._text_103,
            this._text_104,
            this._el_105,
            this._text_106,
            this._el_107,
            this._text_108,
            this._el_109,
            this._text_110,
            this._text_111,
            this._text_112,
            this._el_113,
            this._text_114,
            this._el_115,
            this._text_116,
            this._el_117,
            this._text_118,
            this._text_119,
            this._text_120,
            this._text_121,
            this._text_122,
            this._text_123,
            this._text_124,
            this._text_125,
            this._text_126
        ], [
            disposable_0,
            disposable_1,
            disposable_2,
            disposable_3
        ], []);
        return null;
    };
    _View_AppComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import22$1.RouterLinkWithHref) && ((24 <= requestNodeIndex) && (requestNodeIndex <= 40)))) {
            return this._RouterLinkWithHref_24_3.context;
        }
        if (((token === import22$1.RouterLinkWithHref) && ((47 <= requestNodeIndex) && (requestNodeIndex <= 48)))) {
            return this._RouterLinkWithHref_47_3.context;
        }
        if (((token === import23$1.RouterLinkActive) && ((47 <= requestNodeIndex) && (requestNodeIndex <= 48)))) {
            return this._RouterLinkActive_47_4.context;
        }
        if (((token === import22$1.RouterLinkWithHref) && ((53 <= requestNodeIndex) && (requestNodeIndex <= 54)))) {
            return this._RouterLinkWithHref_53_3.context;
        }
        if (((token === import23$1.RouterLinkActive) && ((53 <= requestNodeIndex) && (requestNodeIndex <= 54)))) {
            return this._RouterLinkActive_53_4.context;
        }
        if (((token === import24$1.RouterOutlet) && (63 === requestNodeIndex))) {
            return this._RouterOutlet_63_5.context;
        }
        if (((token === import22$1.RouterLinkWithHref) && ((80 <= requestNodeIndex) && (requestNodeIndex <= 81)))) {
            return this._RouterLinkWithHref_80_3.context;
        }
        return notFoundResult;
    };
    _View_AppComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var currVal_24_0_0 = this._arr_140('./');
        this._RouterLinkWithHref_24_3.check_routerLink(currVal_24_0_0, throwOnChange, false);
        this._RouterLinkWithHref_24_3.detectChangesInInputProps(this, this._el_24, throwOnChange);
        var currVal_47_0_0 = 'explore-code';
        this._RouterLinkWithHref_47_3.check_routerLink(currVal_47_0_0, throwOnChange, false);
        this._RouterLinkWithHref_47_3.detectChangesInInputProps(this, this._el_47, throwOnChange);
        var currVal_47_1_0 = 'active';
        this._RouterLinkActive_47_4.check_routerLinkActive(currVal_47_1_0, throwOnChange, false);
        this._RouterLinkActive_47_4.detectChangesInInputProps(this, this._el_47, throwOnChange);
        var currVal_53_0_0 = 'policy-guide';
        this._RouterLinkWithHref_53_3.check_routerLink(currVal_53_0_0, throwOnChange, false);
        this._RouterLinkWithHref_53_3.detectChangesInInputProps(this, this._el_53, throwOnChange);
        var currVal_53_1_0 = 'active';
        this._RouterLinkActive_53_4.check_routerLinkActive(currVal_53_1_0, throwOnChange, false);
        this._RouterLinkActive_53_4.detectChangesInInputProps(this, this._el_53, throwOnChange);
        this._RouterOutlet_63_5.detectChangesInInputProps(this, this._el_63, throwOnChange);
        var currVal_80_0_0 = 'privacy-policy';
        this._RouterLinkWithHref_80_3.check_routerLink(currVal_80_0_0, throwOnChange, false);
        this._RouterLinkWithHref_80_3.detectChangesInInputProps(this, this._el_80, throwOnChange);
        this.detectContentChildrenChanges(throwOnChange);
        if (!throwOnChange) {
            if (this._query_RouterLink_47_0.dirty) {
                this._query_RouterLink_47_0.reset([]);
                this._RouterLinkActive_47_4.context.links = this._query_RouterLink_47_0;
                this._query_RouterLink_47_0.notifyOnChanges();
            }
            if (this._query_RouterLinkWithHref_47_1.dirty) {
                this._query_RouterLinkWithHref_47_1.reset([this._RouterLinkWithHref_47_3.context]);
                this._RouterLinkActive_47_4.context.linksWithHrefs = this._query_RouterLinkWithHref_47_1;
                this._query_RouterLinkWithHref_47_1.notifyOnChanges();
            }
            if (this._query_RouterLink_53_0.dirty) {
                this._query_RouterLink_53_0.reset([]);
                this._RouterLinkActive_53_4.context.links = this._query_RouterLink_53_0;
                this._query_RouterLink_53_0.notifyOnChanges();
            }
            if (this._query_RouterLinkWithHref_53_1.dirty) {
                this._query_RouterLinkWithHref_53_1.reset([this._RouterLinkWithHref_53_3.context]);
                this._RouterLinkActive_53_4.context.linksWithHrefs = this._query_RouterLinkWithHref_53_1;
                this._query_RouterLinkWithHref_53_1.notifyOnChanges();
            }
            if ((this.numberOfChecks === 0)) {
                this._RouterLinkActive_47_4.context.ngAfterContentInit();
            }
            if ((this.numberOfChecks === 0)) {
                this._RouterLinkActive_53_4.context.ngAfterContentInit();
            }
        }
        var currVal_139 = import4$1.interpolate(1, 'app-container ', this.context.stateService.state.section, '');
        if (import4$1.checkBinding(throwOnChange, this._expr_139, currVal_139)) {
            this.renderer.setElementProperty(this._el_0, 'className', currVal_139);
            this._expr_139 = currVal_139;
        }
        this._RouterLinkWithHref_24_3.detectChangesInHostProps(this, this._el_24, throwOnChange);
        this._RouterLinkWithHref_47_3.detectChangesInHostProps(this, this._el_47, throwOnChange);
        this._RouterLinkActive_47_4.detectChangesInHostProps(this, this._el_47, throwOnChange);
        this._RouterLinkWithHref_53_3.detectChangesInHostProps(this, this._el_53, throwOnChange);
        this._RouterLinkActive_53_4.detectChangesInHostProps(this, this._el_53, throwOnChange);
        this._RouterOutlet_63_5.detectChangesInHostProps(this, this._el_63, throwOnChange);
        this._RouterLinkWithHref_80_3.detectChangesInHostProps(this, this._el_80, throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_AppComponent0.prototype.destroyInternal = function () {
        this._RouterLinkWithHref_24_3.context.ngOnDestroy();
        this._RouterLinkWithHref_47_3.context.ngOnDestroy();
        this._RouterLinkActive_47_4.context.ngOnDestroy();
        this._RouterLinkWithHref_53_3.context.ngOnDestroy();
        this._RouterLinkActive_53_4.context.ngOnDestroy();
        this._RouterOutlet_63_5.context.ngOnDestroy();
        this._RouterLinkWithHref_80_3.context.ngOnDestroy();
    };
    _View_AppComponent0.prototype._handle_click_24_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_24_0 = (this._RouterLinkWithHref_24_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_24_0);
    };
    _View_AppComponent0.prototype._handle_click_47_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_47_0 = (this._RouterLinkWithHref_47_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_47_0);
    };
    _View_AppComponent0.prototype._handle_click_53_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_53_0 = (this._RouterLinkWithHref_53_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_53_0);
    };
    _View_AppComponent0.prototype._handle_click_80_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_80_0 = (this._RouterLinkWithHref_80_3.context.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_80_0);
    };
    return _View_AppComponent0;
}(import1.AppView));
function viewFactory_AppComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_AppComponent === null)) {
        (renderType_AppComponent = viewUtils.createRenderComponentType('', 0, import10$1.ViewEncapsulation.Emulated, styles_AppComponent, {}));
    }
    return new _View_AppComponent0(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var AppModuleInjector = (function (_super) {
    __extends(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        _super.call(this, parent, [
            HomeComponentNgFactory,
            PrivacyPolicyComponentNgFactory,
            FourOhFourComponentNgFactory,
            AppComponentNgFactory
        ], [AppComponentNgFactory]);
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_14", {
        get: function () {
            if ((this.__LOCALE_ID_14 == null)) {
                (this.__LOCALE_ID_14 = 'en-US');
            }
            return this.__LOCALE_ID_14;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_15", {
        get: function () {
            if ((this.__NgLocalization_15 == null)) {
                (this.__NgLocalization_15 = new import12.NgLocaleLocalization(this._LOCALE_ID_14));
            }
            return this.__NgLocalization_15;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_16", {
        get: function () {
            if ((this.__Compiler_16 == null)) {
                (this.__Compiler_16 = new import13.Compiler());
            }
            return this.__Compiler_16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_17", {
        get: function () {
            if ((this.__APP_ID_17 == null)) {
                (this.__APP_ID_17 = import43._appIdRandomProviderFactory());
            }
            return this.__APP_ID_17;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_18", {
        get: function () {
            if ((this.__DOCUMENT_18 == null)) {
                (this.__DOCUMENT_18 = import4._document());
            }
            return this.__DOCUMENT_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_19", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_19 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_19 = new import14.HammerGestureConfig());
            }
            return this.__HAMMER_GESTURE_CONFIG_19;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_20", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_20 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_20 = [
                    new import44.DomEventsPlugin(),
                    new import45.KeyEventsPlugin(),
                    new import14.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_19)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_21", {
        get: function () {
            if ((this.__EventManager_21 == null)) {
                (this.__EventManager_21 = new import15.EventManager(this._EVENT_MANAGER_PLUGINS_20, this.parent.get(import46.NgZone)));
            }
            return this.__EventManager_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSharedStylesHost_22", {
        get: function () {
            if ((this.__DomSharedStylesHost_22 == null)) {
                (this.__DomSharedStylesHost_22 = new import16.DomSharedStylesHost(this._DOCUMENT_18));
            }
            return this.__DomSharedStylesHost_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_23", {
        get: function () {
            if ((this.__AnimationDriver_23 == null)) {
                (this.__AnimationDriver_23 = import4._resolveDefaultAnimationDriver());
            }
            return this.__AnimationDriver_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_24", {
        get: function () {
            if ((this.__DomRootRenderer_24 == null)) {
                (this.__DomRootRenderer_24 = new import17.DomRootRenderer_(this._DOCUMENT_18, this._EventManager_21, this._DomSharedStylesHost_22, this._AnimationDriver_23));
            }
            return this.__DomRootRenderer_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_25", {
        get: function () {
            if ((this.__RootRenderer_25 == null)) {
                (this.__RootRenderer_25 = import47._createConditionalRootRenderer(this._DomRootRenderer_24, this.parent.get(import47.NgProbeToken, null)));
            }
            return this.__RootRenderer_25;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_26", {
        get: function () {
            if ((this.__DomSanitizer_26 == null)) {
                (this.__DomSanitizer_26 = new import18.DomSanitizerImpl());
            }
            return this.__DomSanitizer_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_27", {
        get: function () {
            if ((this.__Sanitizer_27 == null)) {
                (this.__Sanitizer_27 = this._DomSanitizer_26);
            }
            return this.__Sanitizer_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_28", {
        get: function () {
            if ((this.__ViewUtils_28 == null)) {
                (this.__ViewUtils_28 = new import4$1.ViewUtils(this._RootRenderer_25, this._APP_ID_17, this._Sanitizer_27));
            }
            return this.__ViewUtils_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_29", {
        get: function () {
            if ((this.__IterableDiffers_29 == null)) {
                (this.__IterableDiffers_29 = import3._iterableDiffersFactory());
            }
            return this.__IterableDiffers_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_30", {
        get: function () {
            if ((this.__KeyValueDiffers_30 == null)) {
                (this.__KeyValueDiffers_30 = import3._keyValueDiffersFactory());
            }
            return this.__KeyValueDiffers_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_31", {
        get: function () {
            if ((this.__SharedStylesHost_31 == null)) {
                (this.__SharedStylesHost_31 = this._DomSharedStylesHost_22);
            }
            return this.__SharedStylesHost_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_32", {
        get: function () {
            if ((this.__Title_32 == null)) {
                (this.__Title_32 = new import20.Title());
            }
            return this.__Title_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_33", {
        get: function () {
            if ((this.__BrowserXhr_33 == null)) {
                (this.__BrowserXhr_33 = new import21.BrowserXhr());
            }
            return this.__BrowserXhr_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_34", {
        get: function () {
            if ((this.__ResponseOptions_34 == null)) {
                (this.__ResponseOptions_34 = new import22.BaseResponseOptions());
            }
            return this.__ResponseOptions_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_35", {
        get: function () {
            if ((this.__XSRFStrategy_35 == null)) {
                (this.__XSRFStrategy_35 = import5._createDefaultCookieXSRFStrategy());
            }
            return this.__XSRFStrategy_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_36", {
        get: function () {
            if ((this.__XHRBackend_36 == null)) {
                (this.__XHRBackend_36 = new import23.XHRBackend(this._BrowserXhr_33, this._ResponseOptions_34, this._XSRFStrategy_35));
            }
            return this.__XHRBackend_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_37", {
        get: function () {
            if ((this.__RequestOptions_37 == null)) {
                (this.__RequestOptions_37 = new import24.BaseRequestOptions());
            }
            return this.__RequestOptions_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_38", {
        get: function () {
            if ((this.__Http_38 == null)) {
                (this.__Http_38 = import5.httpFactory(this._XHRBackend_36, this._RequestOptions_37));
            }
            return this.__Http_38;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_LocationStrategy_39", {
        get: function () {
            if ((this.__LocationStrategy_39 == null)) {
                (this.__LocationStrategy_39 = new import25.HashLocationStrategy(this.parent.get(import48.PlatformLocation), this.parent.get(import18$1.APP_BASE_HREF, null)));
            }
            return this.__LocationStrategy_39;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Location_40", {
        get: function () {
            if ((this.__Location_40 == null)) {
                (this.__Location_40 = new import26.Location(this._LocationStrategy_39));
            }
            return this.__Location_40;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_UrlSerializer_41", {
        get: function () {
            if ((this.__UrlSerializer_41 == null)) {
                (this.__UrlSerializer_41 = new import27.DefaultUrlSerializer());
            }
            return this.__UrlSerializer_41;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RouterOutletMap_42", {
        get: function () {
            if ((this.__RouterOutletMap_42 == null)) {
                (this.__RouterOutletMap_42 = new import28.RouterOutletMap());
            }
            return this.__RouterOutletMap_42;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgModuleFactoryLoader_43", {
        get: function () {
            if ((this.__NgModuleFactoryLoader_43 == null)) {
                (this.__NgModuleFactoryLoader_43 = new import29.SystemJsNgModuleLoader(this._Compiler_16, this.parent.get(import29.SystemJsNgModuleLoaderConfig, null)));
            }
            return this.__NgModuleFactoryLoader_43;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTES_44", {
        get: function () {
            if ((this.__ROUTES_44 == null)) {
                (this.__ROUTES_44 = [[
                        {
                            path: '',
                            component: HomeComponent
                        },
                        {
                            path: 'explore-code',
                            loadChildren: 'src/app/components/explore-code/explore-code.module#ExploreCodeModule'
                        },
                        {
                            path: 'policy-guide',
                            loadChildren: 'src/app/components/policy-guide/policy-guide.module#PolicyGuideModule'
                        },
                        {
                            path: 'privacy-policy',
                            component: PrivacyPolicyComponent
                        },
                        {
                            path: '**',
                            component: FourOhFourComponent
                        }
                    ]
                ]);
            }
            return this.__ROUTES_44;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ROUTER_CONFIGURATION_45", {
        get: function () {
            if ((this.__ROUTER_CONFIGURATION_45 == null)) {
                (this.__ROUTER_CONFIGURATION_45 = { useHash: true });
            }
            return this.__ROUTER_CONFIGURATION_45;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Router_46", {
        get: function () {
            if ((this.__Router_46 == null)) {
                (this.__Router_46 = import7.setupRouter(this._ApplicationRef_12, this._UrlSerializer_41, this._RouterOutletMap_42, this._Location_40, this, this._NgModuleFactoryLoader_43, this._Compiler_16, this._ROUTES_44, this._ROUTER_CONFIGURATION_45));
            }
            return this.__Router_46;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ActivatedRoute_47", {
        get: function () {
            if ((this.__ActivatedRoute_47 == null)) {
                (this.__ActivatedRoute_47 = import7.rootRoute(this._Router_46));
            }
            return this.__ActivatedRoute_47;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_PreloadAllModules_51", {
        get: function () {
            if ((this.__PreloadAllModules_51 == null)) {
                (this.__PreloadAllModules_51 = new import30.PreloadAllModules());
            }
            return this.__PreloadAllModules_51;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_BOOTSTRAP_LISTENER_52", {
        get: function () {
            if ((this.__APP_BOOTSTRAP_LISTENER_52 == null)) {
                (this.__APP_BOOTSTRAP_LISTENER_52 = [import7.initialRouterNavigation(this._Router_46, this._ApplicationRef_12, this._RouterPreloader_50, this._ROUTER_CONFIGURATION_45)]);
            }
            return this.__APP_BOOTSTRAP_LISTENER_52;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DataResolver_53", {
        get: function () {
            if ((this.__DataResolver_53 == null)) {
                (this.__DataResolver_53 = new DataResolver());
            }
            return this.__DataResolver_53;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AgencyService_54", {
        get: function () {
            if ((this.__AgencyService_54 == null)) {
                (this.__AgencyService_54 = new AgencyService());
            }
            return this.__AgencyService_54;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_MobileService_55", {
        get: function () {
            if ((this.__MobileService_55 == null)) {
                (this.__MobileService_55 = new MobileService());
            }
            return this.__MobileService_55;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ModalService_56", {
        get: function () {
            if ((this.__ModalService_56 == null)) {
                (this.__ModalService_56 = new ModalService());
            }
            return this.__ModalService_56;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ReposService_57", {
        get: function () {
            if ((this.__ReposService_57 == null)) {
                (this.__ReposService_57 = new ReposService(this._Http_38));
            }
            return this.__ReposService_57;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SeoService_58", {
        get: function () {
            if ((this.__SeoService_58 == null)) {
                (this.__SeoService_58 = new SeoService(this._Title_32));
            }
            return this.__SeoService_58;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_StateService_59", {
        get: function () {
            if ((this.__StateService_59 == null)) {
                (this.__StateService_59 = new StateService());
            }
            return this.__StateService_59;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new import2.CommonModule();
        this._ApplicationModule_1 = new import3.ApplicationModule();
        this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule, null));
        this._HttpModule_3 = new import5.HttpModule();
        this._ModalModule_4 = new ModalModule();
        this._ROUTER_FORROOT_GUARD_5 = import7.provideForRootGuard(this.parent.get(import8.Router, null));
        this._RouterModule_6 = new import7.RouterModule(this._ROUTER_FORROOT_GUARD_5);
        this._AppPipesModule_7 = new AppPipesModule();
        this._ErrorHandler_8 = import4.errorHandler();
        this._ApplicationInitStatus_9 = new import9.ApplicationInitStatus(this.parent.get(import9.APP_INITIALIZER, null));
        this._Testability_10 = new import10.Testability(this.parent.get(import46.NgZone));
        this._ApplicationRef__11 = new import11.ApplicationRef_(this.parent.get(import46.NgZone), this.parent.get(import54.Console), this, this._ErrorHandler_8, this, this._ApplicationInitStatus_9, this.parent.get(import10.TestabilityRegistry, null), this._Testability_10);
        this._ApplicationRef_12 = this._ApplicationRef__11;
        this._AppModule_13 = new AppModule(this._ApplicationRef_12);
        this._NoPreloading_48 = new import30.NoPreloading();
        this._PreloadingStrategy_49 = this._NoPreloading_48;
        this._RouterPreloader_50 = new import30.RouterPreloader(this._Router_46, this._NgModuleFactoryLoader_43, this._Compiler_16, this, this._PreloadingStrategy_49);
        return this._AppModule_13;
    };
    AppModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === import2.CommonModule)) {
            return this._CommonModule_0;
        }
        if ((token === import3.ApplicationModule)) {
            return this._ApplicationModule_1;
        }
        if ((token === import4.BrowserModule)) {
            return this._BrowserModule_2;
        }
        if ((token === import5.HttpModule)) {
            return this._HttpModule_3;
        }
        if ((token === ModalModule)) {
            return this._ModalModule_4;
        }
        if ((token === import7.ROUTER_FORROOT_GUARD)) {
            return this._ROUTER_FORROOT_GUARD_5;
        }
        if ((token === import7.RouterModule)) {
            return this._RouterModule_6;
        }
        if ((token === AppPipesModule)) {
            return this._AppPipesModule_7;
        }
        if ((token === import55.ErrorHandler)) {
            return this._ErrorHandler_8;
        }
        if ((token === import9.ApplicationInitStatus)) {
            return this._ApplicationInitStatus_9;
        }
        if ((token === import10.Testability)) {
            return this._Testability_10;
        }
        if ((token === import11.ApplicationRef_)) {
            return this._ApplicationRef__11;
        }
        if ((token === import11.ApplicationRef)) {
            return this._ApplicationRef_12;
        }
        if ((token === AppModule)) {
            return this._AppModule_13;
        }
        if ((token === import56.LOCALE_ID)) {
            return this._LOCALE_ID_14;
        }
        if ((token === import12.NgLocalization)) {
            return this._NgLocalization_15;
        }
        if ((token === import13.Compiler)) {
            return this._Compiler_16;
        }
        if ((token === import43.APP_ID)) {
            return this._APP_ID_17;
        }
        if ((token === import57.DOCUMENT)) {
            return this._DOCUMENT_18;
        }
        if ((token === import14.HAMMER_GESTURE_CONFIG)) {
            return this._HAMMER_GESTURE_CONFIG_19;
        }
        if ((token === import15.EVENT_MANAGER_PLUGINS)) {
            return this._EVENT_MANAGER_PLUGINS_20;
        }
        if ((token === import15.EventManager)) {
            return this._EventManager_21;
        }
        if ((token === import16.DomSharedStylesHost)) {
            return this._DomSharedStylesHost_22;
        }
        if ((token === import58.AnimationDriver)) {
            return this._AnimationDriver_23;
        }
        if ((token === import17.DomRootRenderer)) {
            return this._DomRootRenderer_24;
        }
        if ((token === import59.RootRenderer)) {
            return this._RootRenderer_25;
        }
        if ((token === import18.DomSanitizer)) {
            return this._DomSanitizer_26;
        }
        if ((token === import60.Sanitizer)) {
            return this._Sanitizer_27;
        }
        if ((token === import4$1.ViewUtils)) {
            return this._ViewUtils_28;
        }
        if ((token === import61.IterableDiffers)) {
            return this._IterableDiffers_29;
        }
        if ((token === import62.KeyValueDiffers)) {
            return this._KeyValueDiffers_30;
        }
        if ((token === import16.SharedStylesHost)) {
            return this._SharedStylesHost_31;
        }
        if ((token === import20.Title)) {
            return this._Title_32;
        }
        if ((token === import21.BrowserXhr)) {
            return this._BrowserXhr_33;
        }
        if ((token === import22.ResponseOptions)) {
            return this._ResponseOptions_34;
        }
        if ((token === import63.XSRFStrategy)) {
            return this._XSRFStrategy_35;
        }
        if ((token === import23.XHRBackend)) {
            return this._XHRBackend_36;
        }
        if ((token === import24.RequestOptions)) {
            return this._RequestOptions_37;
        }
        if ((token === import64.Http)) {
            return this._Http_38;
        }
        if ((token === import18$1.LocationStrategy)) {
            return this._LocationStrategy_39;
        }
        if ((token === import26.Location)) {
            return this._Location_40;
        }
        if ((token === import27.UrlSerializer)) {
            return this._UrlSerializer_41;
        }
        if ((token === import28.RouterOutletMap)) {
            return this._RouterOutletMap_42;
        }
        if ((token === import65.NgModuleFactoryLoader)) {
            return this._NgModuleFactoryLoader_43;
        }
        if ((token === import66.ROUTES)) {
            return this._ROUTES_44;
        }
        if ((token === import7.ROUTER_CONFIGURATION)) {
            return this._ROUTER_CONFIGURATION_45;
        }
        if ((token === import8.Router)) {
            return this._Router_46;
        }
        if ((token === import17$1.ActivatedRoute)) {
            return this._ActivatedRoute_47;
        }
        if ((token === import30.NoPreloading)) {
            return this._NoPreloading_48;
        }
        if ((token === import30.PreloadingStrategy)) {
            return this._PreloadingStrategy_49;
        }
        if ((token === import30.RouterPreloader)) {
            return this._RouterPreloader_50;
        }
        if ((token === import30.PreloadAllModules)) {
            return this._PreloadAllModules_51;
        }
        if ((token === import43.APP_BOOTSTRAP_LISTENER)) {
            return this._APP_BOOTSTRAP_LISTENER_52;
        }
        if ((token === DataResolver)) {
            return this._DataResolver_53;
        }
        if ((token === AgencyService)) {
            return this._AgencyService_54;
        }
        if ((token === MobileService)) {
            return this._MobileService_55;
        }
        if ((token === ModalService)) {
            return this._ModalService_56;
        }
        if ((token === ReposService)) {
            return this._ReposService_57;
        }
        if ((token === SeoService)) {
            return this._SeoService_58;
        }
        if ((token === StateService)) {
            return this._StateService_59;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__11.ngOnDestroy();
        this._RouterPreloader_50.ngOnDestroy();
    };
    return AppModuleInjector;
}(import0.NgModuleInjector));
var AppModuleNgFactory = new import0.NgModuleFactory(AppModuleInjector, AppModule);

/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    _angular_core.enableProdMode();
    return _angular_platformBrowser.platformBrowser()
        .bootstrapModuleFactory(AppModuleNgFactory);
}
main();

exports.main = main;

}((this.inbox = this.inbox || {}),_angular_platformBrowser,ng.core,import0,_angular_http,_angular_router,_angular_common,_angular_platformBrowser_src_dom_dom_adapter,import2,import3,import4,import5,import7,import9,import10,import11,import12,import13,import14,import15,import16,import17,import18,import4$1,import20,import21,import22,import23,import24,import25,import26,import27,import28,import29,import30,import1,import3$1,import6,import1$1,import10$1,import11$1,import22$1,import60,import14$1,import13$1,import8,import17$1,import18$1,import20$1,import23$1,import15$1,import24$1,import21$1,import43,import44,import45,import46,import47,import48,import54,import55,import56,import57,import58,import59,import61,import62,import63,import64,import65,import66));
