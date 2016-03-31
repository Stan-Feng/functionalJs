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
* If there's any place that our brain diverges from the way of JavaScript engine works, and that moment for the two diverge, it is that moment that bug happens in our code
