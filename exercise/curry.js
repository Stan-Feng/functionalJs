// Separate inputs from environment
// var _ = require('ramda');
// console.log(_.multiply(3, 4));

// var double = _.multiply(2);
// console.log(double(13));

function curry (fn) {
  return function () {
    if (fn.length > arguments.length) {
      var slice = Array.prototype.slice;
      var args = slice.apply(arguments);
      return function () {
        return fn.apply(null, args.concat(slice.apply(arguments)));
      };
    } else {
      return fn.apply(null, arguments);
    }
  };
}

// Challenge 1
// Make a function called "words" which returns a list of words in a string.
// Use only the split function in ramda and currying
var split = function (separator, string) {
  return string.split(separator);
};

var curriedSplit = curry(split);
var sentence = "I have a dream!";
var words = curriedSplit(' ');
console.log(words(sentence)); // ['I', 'have', 'a', 'dream!']


// Challenge 2
// create a function triple each element in a list
var list = [1, 2, 3];
var curriedMul = curry(function (a, b) {
  return a * b;
});
var triple = curriedMul(3);
var resut = list.map(e  => triple(e));
console.log(resut);
