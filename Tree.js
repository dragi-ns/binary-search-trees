import Node from './Node';

function Tree(initialArray) {
  /* eslint-disable no-use-before-define */
  const root = buildTree(cleanArray(initialArray));

  function cleanArray(dirtyArray) {
    return [...new Set(dirtyArray)].sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }

      return 0;
    });
  }

  function buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const mid = Math.floor(array.length / 2);
    const rootNode = Node(array[mid]);
    rootNode.left = buildTree(array.slice(0, mid));
    rootNode.right = buildTree(array.slice(mid + 1));
    return rootNode;
  }

  function prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    // eslint-disable-next-line no-console
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  return {
    root,
    prettyPrint,
  };
}

export default Tree;
