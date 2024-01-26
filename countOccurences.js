function searchNodes(nodes, regex) {
  let occurences = 0;

  for (var i = 0; i < nodes.length; i++) {
    const currentNode = nodes[i];
    const isComment = currentNode.nodeType === Node.COMMENT_NODE;
    const isScript = currentNode.tagName?.toLowerCase() === 'script';
    const isValidNode = regex.test(currentNode.textContent.replace(/\s+/g, ' '));

    if (isValidNode && !isComment && !isScript) {
      const matches = nodes[i].textContent.replace(/\s+/g, ' ').match(regex)
        .length;
      occurences += matches;
    }
  }

  return occurences;
}

function countOccurences(text, occurence) {
  const textElements = document.getElementById('text');
  const textElementsChildren = textElements.childNodes;

  const isSingleCharacter = text.length === 1;
  const isSingleWord = text.split(' ').length === 1;

  // CHARACTER
  if (isSingleCharacter) {
    const regex = new RegExp('\\W' + text + '\\W', 'ig');
    return searchNodes(textElementsChildren, regex);
  }
  
  // WORD
  if (isSingleWord) {
    const regex = new RegExp('\\s' + text + '|^' + text + '|\\.+' + text, 'gi');
    return searchNodes(textElementsChildren, regex);
  }

  // SENTENCE
  const regex = new RegExp(text, 'igm');
  return searchNodes(textElementsChildren, regex);
}
