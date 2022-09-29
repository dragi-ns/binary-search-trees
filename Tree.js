import Node from './Node';

function Tree(initialArray) {
  /* eslint-disable no-use-before-define */
  let root = buildTree(cleanArray(initialArray));

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

  function insertRec(rootNode, value) {
    if (!rootNode) {
      return Node(value);
    }

    if (value > rootNode.data) {
      // eslint-disable-next-line no-param-reassign
      rootNode.right = insertRec(rootNode.right, value);
    } else if (value < rootNode.data) {
      // eslint-disable-next-line no-param-reassign
      rootNode.left = insertRec(rootNode.left, value);
    }

    return rootNode;
  }

  function insert(value) {
    return insertRec(root, value);
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

  function find(value) {
    return findWithPrevious(root, value)[1];
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

  function levelOrder(callback = null) {
    if (!root) {
      return [];
    }
    const queue = [root];
    const backupArray = [];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }

      if (callback) {
        callback(currentNode);
      } else {
        backupArray.push(currentNode.data);
      }
    }
    return !callback ? backupArray : null;
  }

  function inorder(callback = null, rootNode = root, backupArray = []) {
    if (!rootNode) {
      return !callback ? [] : null;
    }

    inorder(callback, rootNode.left, backupArray);

    if (callback) {
      callback(rootNode);
    } else {
      backupArray.push(rootNode.data);
    }

    inorder(callback, rootNode.right, backupArray);

    return !callback ? backupArray : null;
  }

  function preorder(callback = null, rootNode = root, backupArray = []) {
    if (!rootNode) {
      return !callback ? [] : null;
    }

    if (callback) {
      callback(rootNode);
    } else {
      backupArray.push(rootNode.data);
    }

    preorder(callback, rootNode.left, backupArray);
    preorder(callback, rootNode.right, backupArray);

    return !callback ? backupArray : null;
  }

  function postorder(callback = null, rootNode = root, backupArray = []) {
    if (!rootNode) {
      return !callback ? [] : null;
    }

    postorder(callback, rootNode.left, backupArray);
    postorder(callback, rootNode.right, backupArray);

    if (callback) {
      callback(rootNode);
    } else {
      backupArray.push(rootNode.data);
    }

    return !callback ? backupArray : null;
  }

  function height(node) {
    if (!node || (!node.left && !node.right)) {
      return 0;
    }
    return 1 + Math.max(height(node.left), height(node.right));
  }

  function depthRec(rootNode, node) {
    if (rootNode.data === node.data) {
      return 0;
    }

    if (rootNode.data < node.data) {
      return 1 + depthRec(rootNode.right, node);
    }

    return 1 + depthRec(rootNode.left, node);
  }

  function depth(node) {
    return depthRec(root, node);
  }

  function isBalanced() {
    return Math.abs(height(root.left) - height(root.right)) < 2;
  }

  function rebalance() {
    root = buildTree(inorder());
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
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
}

export default Tree;
