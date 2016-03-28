'use strict';
// Recursion definition of factorial
// function mul (...args) {
//   if (args.length <= 2) {
//     return args[0] * args[1];
//   } else {
//     return args[0] * mul(...args.slice(1));
//   }
// }
'use strict';
// Thunk, a thunk is a computation hasn't been evaluated yet.
function add_thunk (x) {
  return function () {
    return x;
  };
}

function add (a, b) {
  return a + b;
}

// All the abstraction in functional programming you made
// is combination composition or some lower level abstractions
function add_two (fn1, fn2) {
  return add(fn1(), fn2());
}

// Recursion
function add_n (arr) {
  if (arr.length === 0) {
    return 0;
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    return add_two(add_thunk(arr[0]), add_thunk(arr[1])) + add_n(arr.slice(2));
  }
}
console.log(add_n([1, 2, 3, 4, 5, 6]));

// Tail recursion of add
function add_n_tail (arr) {
  function iter (result, restArr) {
    if (restArr.length === 0) {
      return result;
    } else if (restArr.length === 1) {
      return result + restArr[0];
    } else {
      return iter(result +
                    add_two(add_thunk(restArr[0]), add_thunk(restArr[1])),
                  restArr.slice(2));
    }
  }

  return iter(0, arr);
}
console.log(add_n_tail([1, 2, 3, 4, 5]));

// Reduction
function add_map_reduce (arr) {
  return arr.reduce(function(accu, curr) {
    return function () {
      return add_two(accu, curr);
    };
  }, function() { return 0; })();
}
var thunk_list = [add_thunk(10), add_thunk(20), add_thunk(24), add_thunk(27)];
thunk_list = [10, 20, 24, 27].map(add_thunk); // thunk_list could be produced by map
console.log(add_map_reduce(thunk_list));
