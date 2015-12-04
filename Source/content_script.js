walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
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

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	//Elite -> Joe Flacco
	v = v.replace(/\bElite\b/g, "Joe Flacco");
	v = v.replace(/\belite\b/g, "Joe Flacco");
	v = v.replace(/\bELITE\b/g, "JOE FLACCO");
	
	/* Insert "Is Joe Flacco Elite?" into any string of questions
	var split_v = v.replace(/([.?!])\s*(?=[A-Z])/, "$1|").split("|");
	for (var i = 0; i < split_v.length - 1; i++) {
		if (split_v.substr(split_v[i].length - 1) === '?' && split_v.substr(split_v[i + 1].length - 1) === '?') {
			split_v.splice(i + 1, 0, "Is Joe Flacco Elite?");
		}
		
	}
	
	textNode.nodeValue = split_v.join("");
	*/
	
	textNode.nodeValue = v;
}


