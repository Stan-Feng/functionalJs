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
      callback(response);
    }
    else {
      callback = cb;
    }
  };
}

// State manager object
var responseText = {
  "file1": false,
  "file2": false,
  "file3": false,
};

function responseHandler (response) {
  var text = response.text;
  var filename = response.filename;

  if (!responseText[filename]) {
    responseText[filename] = text;
    // console.log(`${filename} arrived.`);
  }

  for (var key in responseText) {
    if (!responseText[key]) {
      return;
    } else {
      console.log(responseText[key]);
      delete responseText[key];
    }
  }
}

// request all files at once in "parallel"
var thunk1 = getFile("file1");
var thunk2 = getFile("file2");
var thunk3 = getFile("file3");

thunk1(responseHandler);
thunk2(responseHandler);
thunk3(responseHandler);
