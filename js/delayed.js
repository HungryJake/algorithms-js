
/**

The MIT License (MIT)

Copyright (c) 2017 Jeremy Lu

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
    -- Delay tasks runner
    A no dependencies JavaScript library to Set tasks to run in delayed time. Supports delayed
    (normal) run, run all tasks immediately in serial and in parallel.
*/

// TODOs:
//      - put library in CommonJS format to be used in 'required' or 'import' context
//      - wrap code within a JavaScript closure to avoid polluting the global scope
//    - [done] create a new scope to test whether the task function is executed in that scope
//    - [done] run parallel and serial tests again
//    - [done] test what happens if async cb is not called (set a larger timeout?)
//        it will not performed the next tasks... (bad)

/**
 * delayed task class constructor
 * eg. var delayedTask = new delayedTask();
 *         delayedTask.addTask(...);
 *         delayedTask.run();
 * @constructor
 */
function DelayedTask() {
  // in order to keep program to run even callback is not called by task function
  this.maxAsyncTimeout = 6000; // 6 seconds
  this.maxAsyncTimer = null;
  this.taskList = [];
  this.currentTask = null;
  this.timer = null;
}

/**
 * Executioner takes a task and just executes it.
 *  - If the task is asynchronous, it will pass a callback to the task function to
 *  call after the asynchronous call ends.
 *  - If the task is synchronous, the callback will be call immediately after
 *  execution.
 * @param  {[type]}   task [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
DelayedTask.prototype.executioner = function(task, cb) {
  // actual execution of task
  var taskParams = task.params || [];
  if (!(taskParams instanceof Array)) {
    taskParams = [taskParams];
  }
  // asyncCallback presents to determine it's an async task
  if (task.asyncCallback && cb && typeof(cb) === 'function') {
    // if async, let task function to call callback (run)
    taskParams.unshift(cb);
    this.maxAsyncTimer = setTimeout(cb, this.maxAsyncTimeout);
  }
  // execute function
  task.taskFunc.apply(task.scope || window, taskParams);
  // synchronous task
  if (!task.asyncCallback && cb && typeof(cb) === 'function') {
    // if not async, have to call callback (run) outselves
    cb.call(this);
  }
};

/**
 * Execute a task with a timer
 * @param {function} cb
 */
DelayedTask.prototype.execute = function(cb) {
  var self = this;
  if (!this.currentTask.taskFunc ||
    typeof(this.currentTask.taskFunc) !== 'function') {
    throw 'illegal task function';
  }
  if (typeof(this.currentTask.delay) === 'undefined' ||
    this.currentTask.delay === null) {
    throw 'task delay time not defined';
  }
  self.timer = setTimeout(function() {
    var taskParams = self.currentTask.params;
    if (!(taskParams instanceof Array)) {
      taskParams = [taskParams];
    }
    self.executioner(self.currentTask, cb);
  }, this.currentTask.delay);
};

/**
 * Add task configuration to queue to prepare the run, allow multiple configuration to
 * be passed at once.
 * @param {Object} taskConfig ...
 * configuration:
 * {
 *    taskFunc - provide a task function to be executed in a delay, first param is a
 *    function must be invoked within function flow for asynchronous tasks,
 *    scope - the scope of the task function to be performed
 *    params - params used to passed to the task function
 *    asyncCallback - asyncCallback indicates the task is an async task, this is an
 *    function callback will be executed in async manner
 *    delay - time to delay the task to execute in miliseconds
 * }
 */
DelayedTask.prototype.addTasks = function() {
  var i = 0;
  while (arguments[i]) {
    this.taskList.push(arguments[i]);
    i++;
  }
};

/**
 * Start normal run (with timer)
 */
DelayedTask.prototype.run = function() {
  // current (runned) task execute async callback
  if (this.currentTask &&
    this.currentTask.asyncCallback &&
    typeof(this.currentTask.asyncCallback) === 'function') {
    this.currentTask.asyncCallback.apply(this.currentTask.scope || window, arguments);
  }
  // previous task is done now, get the next task in queue
  if (this.maxAsyncTimer) {
    clearTimeout(this.maxAsyncTimer);
    this.maxAsyncTimer = null;
  }
  this.currentTask = this.taskList.shift();
  if (this.currentTask) {
    this.execute(this.run.bind(this));
  } else {
    this.flush();
  }
};

/**
 * Run all tasks immediately in serial (without timer)
 * Wait for previous task to completely finished before executing the next task.
 */
DelayedTask.prototype.executeAllSerial = function() {
  if (this.currentTask &&
    this.currentTask.asyncCallback &&
    typeof(this.currentTask.asyncCallback) === 'function') {
    this.currentTask.asyncCallback.apply(this.currentTask.scope || window, arguments);
  }
  // previous task is done now, get the next task in queue
  if (this.maxAsyncTimer) {
    clearTimeout(this.maxAsyncTimer);
    this.maxAsyncTimer = null;
  }
  this.currentTask = this.taskList.shift();
  if (this.currentTask) {
    this.executioner(this.currentTask, this.executeAllSerial.bind(this));
  } else {
    // finish running all tasks, reset
    this.flush();
  }
};

/**
 * Run all tasks immediately in parallel (without timer)
 * It will execute all task in parallel without one waiting for another.
 * Warnning: caller should beware of data conflicts when using it to update backend
 * data
 */
DelayedTask.prototype.executeAllParallel = function() {
  var self = this;
  var currentTask = self.taskList.shift();
  if (currentTask) {
    var parallelCb = function() {
      if (currentTask.asyncCallback &&
        typeof(currentTask.asyncCallback) === 'function') {
        currentTask.asyncCallback.apply(currentTask.scope || window, arguments);
      }
    }
    self.executioner(currentTask, parallelCb.bind(self));
    self.executeAllParallel();
  } else {
    self.flush();
  }
};

/**
 * Reset context, clear timer and empty task queue
 */
DelayedTask.prototype.flush = function() {
  this.timer = null;
  this.taskList = [];
};

/**
 * Get the current task list
 * @return {Array} the task ist
 */
DelayedTask.prototype.getTaskList = function() {
  return this.delayedTasks;
};

function test() {
  // create a private scope to test scope configuration
  var privateScope;
  (function () {
    function scopeFunction() {
      this.insidePrivateScope = true;
      privateScope = this;
    }
    return new scopeFunction();
  })();

  var task1 = {
    taskFunc: function(param1) {
      // should out put running task: 1 scope: undefined
      console.log('running task:', param1, 'scope: ', this.insidePrivateScope);
    },
    scope: this,
    params: 1,
    delay: 500
  };

  var task2 = {
    taskFunc: function(cb, param1) {
      console.log('running task:', param1);
      setTimeout(function() {
        // callback must be called within async task.
        // cb('task run async', param1);
      }, 1000);
    },
    scope: this,
    params: 2,
    asyncCallback: function(p1) {
      console.log('in task2 async callback...', p1);
    },
    delay: 500
  };

  var task3 = {
    taskFunc: function(cb, param1, param2, param3) {
      console.log('running task:', param1);
      setTimeout(function() {
        // callback must be called within async task.
        cb('param 1,', 'param 2,', 'param 3')
      }, 2000);
    },
    scope: this,
    params: [3, 2, 1],
    asyncCallback: function(p1, p2, p3) {
      // it will still be blocked by previous async task even if run in parallel due
      console.log('in task3 async callback...', p1, p2, p3);
    },
    delay: 500
  };

  var task4 = {
    taskFunc: function(param1) {
      // output should be: running task: 4 scope: true
      console.log('running task:', param1, 'scope: ', this.insidePrivateScope);
    },
    scope: privateScope,
    params: [4, 'a', 'b', 'c'],
    delay: 500
  };

  var delayedTask = new DelayedTask();
  delayedTask.addTasks(task1, task2, task3, task4);
  delayedTask.run(); // normal run

  delayedTask.addTasks(task1, task2, task3, task4);
  delayedTask.executeAllSerial();

  delayedTask.addTasks(task1, task2, task3, task4);
  delayedTask.executeAllParallel();
}
test();
