function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000000) + 100;

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
var fileState = {
	"file1": null,
	"file2": null,
	"file3": null
};

var responseHandler = function (filename, text) {
	fileState[filename] = text;
	console.log(`${filename} done!`);

	var urls = Object.keys(fileState);
	var completedTasks = Object.keys(fileState).map(name => fileState[name]);

	for (var i = 0; i < completedTasks.length; i++) {
		if (completedTasks[i]) {
			delete fileState[urls[i]];
			console.log(completedTasks[i]);
		} else {
			return;
		}
	}
	console.log('Completed!');
};

function getFile(file) {
	fakeAjax (file, function (text) {
		responseHandler(file, text);
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");

