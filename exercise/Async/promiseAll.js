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
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.
var urls = ['file1', 'file2', 'file3'];
var promises = urls.map(url => getFile(url));
var promiseAll = function (promiseArr) {
  promiseArr.reduce(function (accu, curr) {
    return accu
      .then(output)
      .then(function () {
        return curr;
      });
  })
  .then(output)
  .then(function () {
    output('Complete!');
  });
};

promiseAll(promises);
