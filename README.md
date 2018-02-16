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

*THIS IS NOT THE SERVER YOUR CODE IS COMMUNICATING WITH*

1.
```
java -Djava.ext.dirs=./lib -cp stanford-ner.jar edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier ./classifiers/english.muc.7class.distsim.crf.ser.gz  -tokenizerFactory edu.stanford.nlp.process.WhitespaceTokenizer -tokenizerOptions tokenizeNLs=false -outputFormat slashTags
``` 
change `-port 9191` to whatever port you want the stanford-ner server to be listening to



*THIS IS THE SERVER YOU ARE COMMUNICATING WITH*

`node index.js`

the server defaults on port 8008, to change just run `node index.js x` where x is your port number


#### Using ner-server

POST  @address/ner

PARAMS:
content-type = application/json

json : {
	file:'string of text from file',				
	port:'port number of stanford NER, optional and defaults to using port 9191 for stanford NER'
}		

This returns an
example for 3class. 
<br>4class and 7class return more properties

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
      
      
