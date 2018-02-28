# ner-server
JavaScript Server endpoint for communicating with stanford-ner server

##### SET UP
1. Have Java jdk 1.8 installed and in your path, stanford-ner requires java 1.8
2. Install dependencies<br>
     a. manually install stanford-ner from stanford.edu website place in project directory
     b. run `npm install`
If no errors then you have set everything up correctly

##### START UP

run these commands to start java server

1.
```
java -Djava.ext.dirs=./lib -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier ./classifiers/english.muc.7class.distsim.crf.ser.gz  -tokenizerFactory edu.stanford.nlp.process.WhitespaceTokenizer -tokenizerOptions tokenizeNLs=false -outputFormat slashTags
``` 
change `-port 9191` to whatever port you want the stanford-ner server to be listening to


*THIS IS THE SERVER YOU ARE COMMUNICATING WITH*

from sner import Ner

test_string = '''The fate of Lehman Brothers, the beleaguered investment bank, hung in the balance on Sunday as Federal Reserve officials and the leaders of major financial institutions continued to gather in emergency meetings trying to complete a plan to rescue the stricken bank. 
Several possible plans emerged from the talks, held at the Federal Reserve Bank of New York and led by Timothy R. Geithner, the president of the New York Fed, and Treasury Secretary Henry M. Paulson Jr.'''
tagger = Ner(host='localhost',port=9191)
print(tagger.get_entities(test_string))

the server defaults on port 9191, to change just run `node index.js x` where x is your port number


#### Using ner-server
This example return object
3class returns Person, Location, Organization
$class return 3class + Misc
7class returns 3class + Money, Percent, Date, Time

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
      
      
