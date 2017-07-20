# ner-server
JavaScript Server endpoint for communicating with stanford-ner server

##### SET UP
1. Have Java jdk 1.8 installed and in your path, stanford-ner requires java 1.8
2. Install dependencies<br>
	 a. `bash install.sh` *this only works in linux*
     <br>
     b. manually install stanford-ner from stanford.edu website place in project directory
		and run `npm install`
If no errors then you have set everything up correctly

##### START UP

run these commands to start java server

*THIS IS NOT THE SERVER YOUR CODE IS COMMUNICATING WITH*

1.
```
cp stanford-ner-2017-06-09/stanford-ner.jar stanford-ner-2017-06-09/stanford-ner-with-classifier.jar
```

2.
```  
jar -uf stanford-ner-2017-06-09/stanford-ner-with-classifier.jar stanford-ner-2017-06-09/classifiers/english.all.3class.distsim.crf.ser.gz
```

3.
``` 
java -mx2g -cp stanford-ner-2017-06-09/stanford-ner-with-classifier.jar  edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier stanford-ner-2017-06-09/classifiers/english.all.3class.distsim.crf.ser.gz
``` 
change `-port 9191` to whatever port you want the stanford-ner server to be listening to

change `english.all.3class.distsim.crf.ser.gz` to

	english.all.4class.distsim.crf.ser.gz
	or
	english.all.7class.distsim.crf.ser.gz


*THIS IS THE SERVER YOU ARE COMMUNICATING WITH*

`node index.js`

the server defaults on port 8008, to change just run `node index.js x` where x is your port number


####Using ner-server

POST  @address/ner

PARAMS:
content-type = application/json

	json :
		{
			file:'string of text from file',				
			port:'port number of stanford NER, optional and defaults to using port 9191 for stanford NER'
		}		

This returns an
example for 3class. 
<br>4class and 7class return more properties

	entities : {
        PERSON:'ALL',
        LOCATION:'ALL',
        ORGANIZATION:'ALL',
        MISC:'4class Only',
        MONEY:'7class Only',
        Percent:'7class Only',
        Date:'7class Only',
        Time:'7class Only'
      }
      
      
