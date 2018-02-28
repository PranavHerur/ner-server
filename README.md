# ner-server
JavaScript api endpoint wrapper for communicating with stanford-ner server

##### SET UP
1. Have Java jdk 1.8 installed and in your path, stanford-ner requires java 1.8
2. Install dependencies<br>
     a. manually install stanford-ner from stanford.edu website place in project directory
		https://nlp.stanford.edu/software/stanford-ner-2017-06-09.zip
     b. run `npm install`
If no errors then you have set everything up correctly

##### START UP

run these commands to start java server

1.
```
java -Djava.ext.dirs=./lib -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier ./classifiers/english.muc.7class.distsim.crf.ser.gz  -tokenizerFactory edu.stanford.nlp.process.WhitespaceTokenizer -tokenizerOptions tokenizeNLs=false -outputFormat slashTags
``` 
change `-port 9191` to whatever port you want the stanford-ner server to be listening to



#### Example
'''
var ner = require('./ner-server');

var text = "The fate of Lehman Brothers, the beleaguered investment bank, \
hung in the balance on Sunday as Federal Reserve officials and the leaders of \
major financial institutions continued to gather in emergency meetings trying \
to complete a plan to rescue the stricken bank.  Several possible plans emerged \
from the talks, held at the Federal Reserve Bank of New York and led by Timothy R. Geithner, \
the president of the New York Fed, and Treasury Secretary Henry M. Paulson Jr."


ner.cli(
	9191, text,
	function(err, tags){
		console.log('cli tags: '+JSON.stringify(tags)+'\n');
	}
);

ner.post(
	'localhost', 9191, text, 
	function(err, res){
		console.log('post tags: '+JSON.stringify(res.tags)+'\n');
	}
);
'''

#### Using ner-server
This example return object
3class returns Person, Location, Organization
$class return 3class + Misc
7class returns 3class + Money, Percent, Date, Time

'''
entities : {<br>
	Person:'ALL',<br>
	Location:'ALL',<br>
	Organization:'ALL',<br>
	Misc:'4class Only',<br>
	Money:'7class Only',<br>
	Percent:'7class Only',<br>
	Date:'7class Only',<br>
	Time:'7class Only'<br>
}
'''

