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

  function remove(value) {
    const [previousNode, currentNode] = findWithPrevious(root, value);
    if (currentNode === null) {
      return null;
    }

    const currentNodeDirection =
      previousNode.left === currentNode ? 'left' : 'right';

    // Leaf node
    if (!currentNode.left && !currentNode.right) {
      previousNode[currentNodeDirection] = null;
      return currentNode;
    }

    // One right child
    if (!currentNode.left && currentNode.right) {
      previousNode[currentNodeDirection] = currentNode.right;
      return currentNode;
    }

    // One left child
    if (!currentNode.right && currentNode.left) {
      previousNode[currentNodeDirection] = currentNode.left;
      return currentNode;
    }

    // It has both children
    const [previousBiggestNode, currentBiggestNode] =
      findNextBigestNode(currentNode);

    currentNode.data = currentBiggestNode.data;
    previousBiggestNode.left = currentBiggestNode.right;

    currentBiggestNode.left = currentNode.left;
    currentBiggestNode.right = currentNode.right;
    currentBiggestNode.data = value;
    return currentBiggestNode;
  }

  function find(rootNode, value) {
    return findWithPrevious(rootNode, value)[1];
  }

  function findWithPrevious(rootNode, value) {
    let previousNode = null;
    let currentNode = rootNode;
    while (currentNode !== null && currentNode.data !== value) {
      if (currentNode.data < value) {
        previousNode = currentNode;
        currentNode = previousNode.right;
      } else {
        previousNode = currentNode;
        currentNode = previousNode.left;
      }
    }

    return [previousNode, currentNode];
  }

  function findNextBigestNode(initialCurrentNode) {
    let previousNode = initialCurrentNode.right;
    let currentNode = previousNode.left;
    while (currentNode.left !== null) {
      previousNode = currentNode;
      currentNode = previousNode.left;
    }
    return [previousNode, currentNode];
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
    remove,
    find,
    prettyPrint,
  };
}

export default Tree;
