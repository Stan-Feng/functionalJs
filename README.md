## Functional Programming in JavaScript
### Pure function
* No side effects, state
* Each time the function has been called, you're gonna get different result
* Closure is about maintaining the state of a function
* It's a little tiny tool we can use in very technical specific way
* Array returned preferred

### Composition
* Take an output from one function and pass as input to another function
* Immutable binding is not interesting, immutable value is more interesting
* We choose not to change the value of params passed in the function called immutability.

### Recursion (Tail called optimization in JavaScript)
* No one implement this feature until now
* Alternative way to doing this:


### Closure
* In JavaScript, "closure" is when a function remembers the variables around it even when that function is executed elsewhere
* In mathematic, an operation for combining data objects satisfies the "closure" property if the results of combining things with that operation can themselves be combined using the same operation

### Thunk
* from [**Thoughts on Thunks**](https://blog.getify.com/thoughts-on-thunks/), written by Kyle Simpson
* A thunk is a computation that **hasn't been evaluated yet**.
* "A synchronous thunk is a function that already has all it needs to its work and return a result" -- Getify
```js
function makeThunk(fn, ...args) {
  return function () {
    return fn(...args);
  };
}
var meaningOfLie = makeThunk(add, 11, 31);
meaningOfLie();
```
* The value of thunk is a way to **encapsulate the work** necessary to produce some result into a simple wrapper
* The reason why not directly invoking "add(11, 31)" is that what if "add(11, 31)" will take a really expensive time
  * You may want to do this work until the result is actually needed.
* Asynchronous Thunk
  * which is a thunk that completes its computation asynchronously. To get its result value, requires a single callback arg
```js
function makeAsyncThunk (fn, ...args) {
  return function(cb) {
    return fn(...args, cb);
  };
}

function ask (x, y, cb) {
  ajax(`https://www.somurl.com/add?x=${x}&y=${y}`, cb);
}

var meaningOfLie = makeAsyncThunk(ask, 11, 31);
meaningOfLie(function waitForIt(answer) {
  console.log(answer);
});
```  
* Consider the asynchronous working flow, what if we want to the thunk evaluating when they're created
```js
// Lazy version
function makeQuestion(x, y, cb) {
  return function() {
    ask(x, y, cb);
  };
}

// Eager version (Race Condition Here)
function makeQuestion (x, y, cb) {
  ask(x, y, function(answer) {
    ...
  });

  return function (cb) {
    ....
  }
}

// Eager version
// There must be two cases exist, "ask" first or "return"
// Both cases should be considered
function makeEagerAsyncThunk(fn,...args) {
  var v = {};
  var fns = [];

  fn(...args,function (...args){
    if (!("args" in v)) v.args = args;

    if (fns.length > 0) {
      while (fns.length > 0) {
        fns.shift()(...v.args);
      }
    }
  });

  return function (cb) {
    if ("args" in v) cb(...v.args);
    else fns.push(cb);
  };
}
```
* A thunk acts as a wrapper around a future or eventual value that abstracts time component
* By hiding time as a state, there will no race condition exists
