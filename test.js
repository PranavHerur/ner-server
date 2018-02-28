var ner = require('./index');

var text = "The fate of Lehman Brothers, the beleaguered investment bank, \
hung in the balance on Sunday as Federal Reserve officials and the leaders of \
major financial institutions continued to gather in emergency meetings trying \
to complete a plan to rescue the stricken bank.  Several possible plans emerged \
from the talks, held at the Federal Reserve Bank of New York and led by Timothy R. Geithner, \
the president of the New York Fed, and Treasury Secretary Henry M. Paulson Jr."

ner.post(
	'localhost', 9191, text, 
	function(err, res){
		console.log('post tags: '+JSON.stringify(res.tags)+'\n');
	}
);