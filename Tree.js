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

  function insert(rootNode, value) {
    if (!rootNode) {
      return Node(value);
    }

    if (value > rootNode.data) {
      // eslint-disable-next-line no-param-reassign
      rootNode.right = insert(rootNode.right, value);
    } else if (value < rootNode.data) {
      // eslint-disable-next-line no-param-reassign
      rootNode.left = insert(rootNode.left, value);
    }

    return rootNode;
  }

  function prettyPrint(rootNode, prefix = '', isLeft = true) {
    if (rootNode.right !== null) {
      prettyPrint(
        rootNode.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    // eslint-disable-next-line no-console
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${rootNode.data}`);
    if (rootNode.left !== null) {
      prettyPrint(rootNode.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  return {
    root,
    insert,
    prettyPrint,
  };
}

export default Tree;
