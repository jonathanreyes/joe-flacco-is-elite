// chrome.storage.sync.get("replace_elite", function(data) {
// 	if(data["replace_elite"])
// 		alert("TRUEEEEEEEEE");
// });

walk(document.body);

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;

	//Elite -> Joe Flacco
	chrome.storage.sync.get("replace_elite", function(data) {
		if (data["replace_elite"]) {
			v = v.replace(/\bElite\b/g, "Joe Flacco");
			v = v.replace(/\belite\b/g, "Joe Flacco");
			v = v.replace(/\bELITE\b/g, "JOE FLACCO");
			textNode.nodeValue = v;
		}
	});
	
	/*Insert "Is Joe Flacco Elite?" into any string of questions*/
	//Split the v into individual sentences
	v = textNode.nodeValue; //reestablish v in case replacement occurred
	var sentences = v.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")

	chrome.storage.sync.get("ask_elite", function(data) {
		if(data["ask_elite"]) {
			var i = 0;
			while (i < sentences.length - 1) {
				//find the limit indices of a run of questions
				var questionIdxMin = 0, questionIdxMax = 0;
				if (sentences[i].substr(sentences[i].length - 1) === '?' 
					  && sentences[i+1].substr(sentences[i+1].length - 1) === '?') {

					questionIdxMin = ++i; //save the index of the second question (first index where we might insert our question)
					questionIdxMax = questionIdxMin; //if there's only two questions, then these will be the same, so start with this

					//this while loop ends when we've svaed the index of the last question
					while (i < sentences.length - 1
						     && sentences[i].substr(sentences[i].length - 1) === '?' 
							   && sentences[i+1].substr(sentences[i+1].length - 1) === '?') {
						questionIdxMax = ++i;
					}

					//increment questionIdxMax one more time so the question can be at the end of the run of questions
					questionIdxMax++;

					//generate a random index between the limits of the run of questions (or at the end) if there's a range
					var insertionIdx = Math.floor(Math.random() * (questionIdxMax - questionIdxMin + 1)) + questionIdxMin;

					//insert the question at the random index
					sentences.splice(insertionIdx, 0, "Is Joe Flacco Elite?");

					//only want to put the question in once per textNode
					break;
				}
				

				i++;
			}
			textNode.nodeValue = sentences.join(" ");
		}
	});
}



