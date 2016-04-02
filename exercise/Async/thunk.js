'use strict';
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E1) % 8000000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

// Thunk constructor, we want to make eager thunk here
function getFile(filename) {
  var callback;
  var response;

  fakeAjax(filename, function (text) {
    if (callback) {
      callback(text);
    } else {
      response = text;
    }
  });

  return function (cb) {
    // fakeAjax callback has been executed
    if (response) {
      cb(response);
    }
    else {
      callback = cb;
    }
  };
}

// request all files at once in "parallel"
var thunk1 = getFile("file1");
var thunk2 = getFile("file2");
var thunk3 = getFile("file3");

// The pro of this pattern is avoiding race condition
// In callback pattern you have to set some global variables to do time order management
thunk1(function (text1) {
  output(text1);
  thunk2(function (text2) {
    output(text2);
    thunk3(function (text3) {
      output(text3);
      output("Completed.");
    });
  });
});
