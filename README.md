# ner-server
Server endpoint for communicating with stanford-ner server

#####SET UP
1. Have Java jdk 1.8 installed and in your path, stanford-ner requires java 1.8
2. Install dependencies
	 a. `bash install.sh` *this only works in linux*
	or
	 b. manually install stanford-ner from stanford.edu website place in project directory
		and run `npm install`
If no errors then you have set everything up correctly

#####START UP

run these commands to start java server

*THIS IS NOT THE SERVER YOU ARE COMMUNICATING WITH*

<<<<<<< HEAD
`cp stanford-ner-2015-01-30/stanford-ner.jar stanford-ner-2015-01-30/stanford-ner-with-classifier.jar`

`jar -uf stanford-ner-2015-01-30/stanford-ner-with-classifier.jar stanford-ner-2015-01-30/classifiers/english.all.3class.distsim.crf.ser.gz`

`java -mx2g -cp stanford-ner-2015-01-30/stanford-ner-with-classifier.jar edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier stanford-ner-2015-01-30/classifiers/english.all.3class.distsim.crf.ser.gz`

change `-port 9191` to whatever port you want the stanford-ner server to be listening on

change `english.all.3class.distsim.crf.ser.gz` in `stanford-ner-2015-01-30/classifiers/english.all.3class.distsim.crf.ser.gz` to 

	`english.all.3class.distsim.crf.ser.gz` 
	or
	`english.all.4class.distsim.crf.ser.gz` 
	or
	`english.all.7class.distsim.crf.ser.gz`
=======
`cp stanford-ner-2015-04-20/stanford-ner.jar stanford-ner-2015-04-20/stanford-ner-with-classifier.jar`

`jar -uf stanford-ner-2015-04-20/stanford-ner-with-classifier.jar stanford-ner-2015-04-20/classifiers/english.all.3class.distsim.crf.ser.gz`

`java -mx2g -cp stanford-ner-2015-04-20/stanford-ner-with-classifier.jar edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier stanford-ner-2015-04-20/classifiers/english.all.3class.distsim.crf.ser.gz`

change `-port 9191` to whatever port you want the stanford-ner server to be listening on

change `english.all.3class.distsim.crf.ser.gz` in `stanford-ner-2015-04-20/classifiers/english.all.3class.distsim.crf.ser.gz` to

	`english.all.3class.distsim.crf.ser.gz`
	or
	`english.conll.4class.distsim.crf.ser.gz`
	or
	`english.muc.7class.distsim.crf.ser.gz`
>>>>>>> 9da5d25e833c784940002e9efd3302b7ba465cfc

*THIS IS THE SERVER YOU ARE COMMUNICATING WITH*

`node index.js`

the server defaults on port 8008, to change just run `node index.js x` where x is your port number


####Using ner-server

POST /ner

PARAMS:
content-type = application/json
<<<<<<< HEAD
 
=======

>>>>>>> 9da5d25e833c784940002e9efd3302b7ba465cfc
	json:{
		file:'string of text from file',				
		port:'port number of stanford java server, optional and defaults to using port 9191 for stanford java server'
	}		
<<<<<<< HEAD
	
=======

>>>>>>> 9da5d25e833c784940002e9efd3302b7ba465cfc
This returns
example for 3class. 4class and 7class return more properties in entities

	entities :
<<<<<<< HEAD
		{	
=======
		{
>>>>>>> 9da5d25e833c784940002e9efd3302b7ba465cfc
			PERSON:'',
			LOCATION:'',
			ORGANIZATION:''
		}


