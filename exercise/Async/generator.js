function coroutine (generator) {
  var iterator = generator();

  return function () {
    return iterator.next.apply(iterator, arguments);
  };
}

var run = coroutine(function* () {
  var x = 1 + (yield fakeAjax(10));
  var y = 1 + (yield fakeAjax(30));

  var answer = (yield fakeAjax("Meaning of life: " + (x + y)));
  console.log(answer);
});


// Combine generator with promises
function fakeAjax (data) {
  return new Promise((resolve, reject) => {
    return setTimeout(function () {
      resolve(run(data));
    }, 1000);
  });
}

run();
