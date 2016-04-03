function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E2) % 80000000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// return a promise
function getFile(file) {
  return new Promise(function (resolve, reject) {
    fakeAjax(file, resolve);
  });
}

var promise1 = getFile("file1");
var promise2 = getFile("file2");
var promise3 = getFile("file3");

// request all files at once in "parallel"
promise1
  .then(output)
  .then(function () {
    return promise2;
  })
  .then(output)
  .then(function () {
    return promise3;
  })
  .then(output)
  .then(function () {
    output("Completed!");
  })
  .catch(function (err) {
    output(err);
  });
