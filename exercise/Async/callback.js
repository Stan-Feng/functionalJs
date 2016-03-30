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
var isCompleted = function () {
	var completedNum = Object.keys(fileState)
		.reduce((accu, curr) => (accu + (fileState[curr] ? 1 : 0)), 0);

	return completedNum === 3;
};

function getFile(file) {
	fakeAjax (file, function (text) {
		// what do we do here?
		fileState[file] = text;
		console.log(`${file} done!`);
		if (isCompleted()) {
			Object.keys(fileState).forEach(el => {
				console.log(fileState[el]);
			});
			console.log('Completed!');
		}
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");

