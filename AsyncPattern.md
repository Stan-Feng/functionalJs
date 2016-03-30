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

#### Callback
* Callback == Continuations
* 