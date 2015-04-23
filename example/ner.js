// ner.js

var request = require('request');
var Promise = require('bluebird');
var fs = require('fs');

var co = Promise.coroutine;
var port = 8008;
var host = 'localhost';

var url = 'http://' + host + ':' + port;

Promise.promisifyAll(request);
//Promise.promisifyAll(tika);

var nerify = co(function*(fileName) {
	var text;
	var d = new Date();
	try {
	//	text = yield tika.textAsync(fileName , {});
	} 
	catch (err) {
		if (err) {
			console.log('there is an error with sending file');
			throw err;
		}
	}
	text = fs.readFileSync(fileName,'utf8');
	if (text.length == 1) return 'Error No Text Detected';
	var form = {form: { file : text, name : fileName}};
	var options = {
		  uri: url+'/ner',
		  method: 'POST',
		  json: {
			"file": text,
		 	"port" : 9191
		}
	};
	var result = yield request.postAsync(options);
	var e = new Date();
	console.log((e-d)/1000+' seconds to tag');
	return console.log(result[0].body.entities);

});

//if run from command line
if(process.argv[2]){
	nerify(process.argv[2]);
}
