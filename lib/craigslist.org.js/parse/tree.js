
var Node;

Node = require('./node');

function Tree($target) {
  this.target = $target.get(0);

  this.loadNodes();

  this.structureNodes();
}

Tree.prototype.loadNodes = function() {
  var children, i, ii, target, nodes;

  target = this.target;

  children = target.childNodes;

  nodes = [];

  for (i = 0, ii = children.length; i < ii; i ++) {
    var child, html, node, tagName;

    child = children[i];

    html = child.innerHTML || child.innerTEXT;

    tagName = child.tagName;

    if (! tagName) tagName = 'TEXT';

    if (html !== '') {
      node = {};

      node.html = html;

      node.tagName = tagName;

      nodes.push(node);
    }
  };

  this.nodes = nodes;

  return nodes;
}

Tree.prototype.structureNodes = function() {
  var currentNode, currentParsedNode, nextParsedNode, nodes, stack, tree;

  stack = [];

  nodes = this.nodes.slice();

  tree = new Node('DIV');

  stack.push(tree);

  while (currentNode = nodes.shift()) {
    nextParsedNode = new Node(currentNode.tagName, currentNode.html);

    currentParsedNode = stack.slice(-1)[0];
    
    while ((currentParsedNode = stack.slice(-1)[0]) && currentParsedNode.shouldNest(nextParsedNode) === false) {
      stack.pop();
    }

    currentParsedNode.addNode(nextParsedNode);
    
    stack.push(nextParsedNode);
  }

  this.tree = tree;
}

module.exports = Tree;