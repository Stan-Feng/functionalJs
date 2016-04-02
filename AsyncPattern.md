## Asynchronous Pattern in JavaScript
#### Parallel vs Async
* It's not really basic the same thing
* Parallelism: threads
* Async: our program only runs on a single thread
* Concurrency: two higher level tasks happening within the same time frame
  * Suppose there's task A which takes 4 seconds, task B which takes 3 seconds
  * Assume task A is an Ajax request and response, task B is scroll page repainting
  * We want task A and task B happen **in the same time**, because we don't want to done task A first then task B which will cause frozen
  * Therefore **Event Loop** was proposed to schedule tasks for better user experience and performance
* Asynchronous Programming -- managing our concurrency
* Time is the most complex and hardest part for us to reason about
* Therefore if we can use these tools. These notions of preserving state with we can compose these values together. Then not worrying about time ordering about time ordering. Time becomes an non-issue.

#### Callback Problems
* Inversion of control --> There's part of my code that I can control it while there's another part I can't.
  * which means the callback is given to somebody else.
  * When we pass a callback to other utilities, we trust them.
  * These are all things you've been implicit trust every single time you've ever passed a callback to anywhere to any JavaScript programs you've ever written
    * Not too early, late, too many times, too few times, no lost context, no swallowed errors...
  * What if the trust falls apart
  * Callback does not have solution to this kind of callback-hell, trust issue
* **Not Reasonable**
  * There are not able to be reasoned about
  * Temporal Dependency, when one thing depends on another thing finished before this thing can go
  * And the only way for callbacks to express temporal dependency is nesting
  * The problem to your brain does not get the linear progress to the code, non local jump
* If there's any place that our brain diverges from the way of JavaScript engine works, and that moment for the two diverge, it is that moment that bug happens in our code

#### Thunks
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
    ...
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

#### Promises
* Promises **invert the inversion control problem** (The most important point)
  * All the trust issues have been solved
* A key different between a library and framework is inversion control
* **Promises Trust** (Huge Deal):
  * Only resolved once
  * Either success OR error
  * Messages passed/kept
  * Exceptions become errors
  * Immutable once resolved
* The shiny point of trust issues solved is immutability
  * Action and distances, somebody else faraway can do something that affects you without your knowing
* Flow Control
