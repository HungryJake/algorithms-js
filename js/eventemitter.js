/*
The MIT License (MIT)

Copyright (c) 2014 Jeremy Lu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
eg usage
var obj = new EventEmitter();

obj.on('myevent', handler1, ...);
obj.on('myevent', handler2, ...);

obj.fire('myevent', arg1, arg2, ...);

obj.off('myevent', handler1);
obj.offAll('myevent'); // remove all listeners*/

var EventEmitter = function () {
	this.events = {}; // name -> handlers list[]
};

EventEmitter.prototype.on = function (eventName, handler) {
	if (!(typeof handler === 'function')) {
		return;
	}
	if (!this.events.hasOwnProperty(eventName)) {
		this.events[eventName] = [];
	}
	this.events[eventName].push(handler);
};

EventEmitter.prototype.offAll = function (eventName) {
	if (!this.events.hasOwnProperty(eventName)) {
		return;
	}
	delete this.events[eventName];
};

EventEmitter.prototype.off = function (eventName, handler) {
	if (!this.events.hasOwnProperty(eventName)) {
		return;
	}
	var idx = this.events[eventName].indexOf(handler);
	if (idx >= 0) {
		this.events.splice(idx, 1);
	}
};

EventEmitter.prototype.fire = function (eventName) { // and arguments
	if (!this.events.hasOwnProperty(eventName)) {
		return;
	}
	var args = arguments,
		handlers = this.events[eventName],
		i;
	Array.prototype.shift.apply(args);
	for (i=0; i<handlers.length; i++) {
		// we don't know the scope here, use Function.bind to specify if needed.
		// the default 'this' is the function itself, may not be expected.
		handlers[i].apply(handlers[i], args);
	}
};
