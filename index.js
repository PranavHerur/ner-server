// index.js
var spawn = require('child_process').spawn;
var _ = require('underscore');
var net = require('net');

var ner_port = 9191
var ner_host = 'localhost'

module.exports = {
	cli: cli,
	post: post
};

function post(host, port, text, callback) {
	var socket = new net.Socket();
	port = port? port: ner_port;
	host = host? host: ner_host;
	
	socket.connect(port, host, function () {
		socket.setNoDelay(true);
		socket.write(text.replace(/\r?\n|\r|\t/g, ' ') + '\n');
	});

	socket.on('data', function (data) {
		var re = /<([A-Z]+?)>(.+?)<\/\1>/g;
		var str = data.toString();
		var res = {};
		res.tags = parse(str);
		socket.destroy();
		callback(undefined, res);
	});

	socket.on('error', function (err) {
		callback(err, undefined);
	});
}

function cli(port, body, callback) {
	var parsed = '';
	var text = body.replace(/\r?\n|\r|\t/gm, ' ');
	
	port = port? port: ner_port;
	var process = spawn('C:/java-1.8/bin/java', 
		['-cp', '../sources/stanford-ner-2017-06-09/stanford-ner.jar', 
			'edu.stanford.nlp.ie.NERServer',
			'-port' ,port ,'-client'
		]
	);
	
	//when java server returns data
	process.stdout.on('data', function (data) {
		//ignore if 'Input' write file text to stream
		if(String(data).indexOf('Input some text and press RETURN to NER tag it,  or just RETURN to finish.')==0){
			process.stdin.write(text);
			process.stdin.write('\n');
			process.stdin.write('\n');
			return;
		}
		//concat returned data
		else if(String(data).length > 1){
			parsed += String(data);
			return;
		}
	});

	process.stdin.on('endData',function (data){
		console.log('endData: '+data);
	});

	process.stderr.on('data', function (err) {
		console.log('stderr: ' + err);
		callback(err, undefined);
	});

	//when process ends
	process.on('close', function (code) {
		//console.log('stanford-ner process exited with code ' + code);
		//return ner tags, after parsing
		callback(undefined, parse(parsed));
		return;
	});
}

var parse = function(slashtags) {
	var tokenized   = slashtags.split(/\s/gmi);
	var splitRegex  = new RegExp('(.+)/([A-Z]+)','g');
	var tagged = _.map(tokenized, 
		function(token) {
			var parts = new RegExp('(.+)/([A-Z]+)','g').exec(token);
			return (parts)? { w: parts[1], t: parts[2] }: null;
		}
	);

	tagged = _.compact(tagged);
	// Now we extract the neighbors into one entity
	var entities = {};
	var prevEntity = false;
	var entityBuffer = [];
	for (var i=0;i<tagged.length;i++) {
		if (tagged[i].t != 'O') {
			if (tagged[i].t != prevEntity) {
				// New tag!
				// Was there a buffer?
				if (entityBuffer.length>0) {
					// There was! We save the entity
					if (!entities.hasOwnProperty(prevEntity)) {
						entities[prevEntity] = [];
					}
					entities[prevEntity].push(entityBuffer.join(' '));
					// Now we set the buffer
					entityBuffer = [];
				}
				// Push to the buffer
				entityBuffer.push(tagged[i].w);
			} else {
				// Prev entity is same a current one. We push to the buffer.
				entityBuffer.push(tagged[i].w);
			}
		} else {
			if (entityBuffer.length>0) {
				// There was! We save the entity
				if (!entities.hasOwnProperty(prevEntity)) {
					entities[prevEntity] = [];
				}
				entities[prevEntity].push(entityBuffer.join(' '));
				// Now we set the buffer
				entityBuffer = [];
			}
		}
		// Save the current entity
		prevEntity = tagged[i].t;
	}
	return entities;
}