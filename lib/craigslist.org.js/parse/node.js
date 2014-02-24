function Node(tagName, html) {
  this.tagName = tagName;

  this.html = html;

  this.childNodes = [];
}

Node.hierarchy = 'DIV H1 H2 H3 H4 H5 H6 UL';

Node.shouldNest = function(childTagName, parentTagName) {
  var acceptsChildren, childIndex, flatten, hierarchy, parentIndex;

  hierarchy = Node.hierarchy;

  acceptsChildren = hierarchy.indexOf(parentTagName) !== -1;

  childIndex = hierarchy.indexOf(childTagName);

  parentIndex = hierarchy.indexOf(parentTagName);

  acceptChild = childIndex === -1 || parentIndex < childIndex;
  
  return acceptsChildren && acceptChild;
};

Node.prototype.shouldNest = function(childNode) {
  var childTagName, parentTagName, shouldNest;

  childTagName = childNode.tagName;

  parentTagName = this.tagName;

  shouldNest = Node.shouldNest(childTagName, parentTagName);

  return shouldNest;
};

Node.prototype.addNode = function(childNode) {
  var childNodes;

  childNodes = this.childNodes;
  
  childNodes.push(childNode);
};

module.exports = Node;