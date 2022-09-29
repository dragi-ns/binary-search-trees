import Tree from './Tree';

describe('Tree', () => {
  it('builds a balanced binary tree from the given array of data', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    // Don't judge 🥲

    // Root
    expect(tree.root.data).toBe(8);

    // Left subtree
    expect(tree.root.left.data).toBe(4);

    expect(tree.root.left.left.data).toBe(3);
    expect(tree.root.left.right.data).toBe(7);

    expect(tree.root.left.left.left.data).toBe(1);
    expect(tree.root.left.left.right).toBe(null);

    expect(tree.root.left.right.left.data).toBe(5);
    expect(tree.root.left.right.right).toBe(null);

    // Right subtree
    expect(tree.root.right.data).toBe(67);

    expect(tree.root.right.left.data).toBe(23);
    expect(tree.root.right.right.data).toBe(6345);

    expect(tree.root.right.left.left.data).toBe(9);
    expect(tree.root.right.left.right).toBe(null);

    expect(tree.root.right.right.left.data).toBe(324);
    expect(tree.root.right.right.right).toBe(null);
  });

  it('inserts a node as a leaf in the correct location', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9]);
    tree.insert(tree.root, 69);
    expect(tree.root.right.right.data).toBe(69);
  });

  it("doesn't insert a node as a leaf if given value already exists", () => {
    const tree = Tree([1, 7, 4, 23, 8, 9]);
    tree.insert(tree.root, 23);
    expect(tree.root.right.left.data).toBe(9);
    expect(tree.root.right.right).toBe(null);
  });

  it('returns a node with the given value', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9]);
    const node = tree.find(tree.root, 23);
    expect(node).not.toBe(null);
    expect(node.left.data).toBe(9);
    expect(node.right).toBe(null);
  });

  it("returns null if a node with the given value doesn't exist", () => {
    const tree = Tree([1, 7, 4, 23, 8, 9]);
    const node = tree.find(tree.root, 69);
    expect(node).toBe(null);
  });

  it('correctly removes a leaf node', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const removedNode = tree.remove(5);
    expect(removedNode.data).toBe(5);
    expect(tree.root.left.right.left).toBe(null);
  });

  it('correctly removes a node with only one child node', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const removedNode = tree.remove(6345);
    expect(removedNode.data).toBe(6345);
    expect(tree.root.right.right.data).toBe(324);
  });

  it('correctly removes a node with two children', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const removedNode = tree.remove(4);
    expect(removedNode.data).toBe(4);
    expect(tree.root.left.data).toBe(5);
    expect(tree.root.left.right.left).toBe(null);
  });

  it("returns null if a node with a given value doesn't exists", () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const removedNode = tree.remove(69);
    expect(removedNode).toBe(null);
  });

  it('returns an array of values if no function is given', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.levelOrder()).toEqual([8, 4, 67, 3, 7, 23, 6345, 1, 5, 9, 324]);
  });

  it('returns an empty array if a tree is empty', () => {
    const tree = Tree([]);
    expect(tree.levelOrder()).toEqual([]);
  });

  it('calls callback function instead of returning an array', () => {
    const callback = jest.fn();
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.levelOrder(callback)).toBe(null);
    expect(callback.mock.calls.length).toBe(11);
    expect(callback.mock.calls[0][0].data).toBe(8);
    expect(callback.mock.calls[5][0].data).toBe(23);
    expect(callback.mock.calls[10][0].data).toBe(324);
  });

  it('returns an array of values if no function is given', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.inorder(tree.root)).toEqual([
      1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345,
    ]);
  });

  it('returns an empty array if a tree is empty', () => {
    const tree = Tree([]);
    expect(tree.inorder(tree.root)).toEqual([]);
  });

  it('calls callback function instead of returning an array', () => {
    const callback = jest.fn();
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.inorder(tree.root, callback)).toBe(null);
    expect(callback.mock.calls.length).toBe(11);
    expect(callback.mock.calls[0][0].data).toBe(1);
    expect(callback.mock.calls[5][0].data).toBe(8);
    expect(callback.mock.calls[10][0].data).toBe(6345);
  });

  it('returns an array of values if no function is given', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.preorder(tree.root)).toEqual([
      8, 4, 3, 1, 7, 5, 67, 23, 9, 6345, 324,
    ]);
  });

  it('returns an empty array if a tree is empty', () => {
    const tree = Tree([]);
    expect(tree.preorder(tree.root)).toEqual([]);
  });

  it('calls callback function instead of returning an array', () => {
    const callback = jest.fn();
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.preorder(tree.root, callback)).toBe(null);
    expect(callback.mock.calls.length).toBe(11);
    expect(callback.mock.calls[0][0].data).toBe(8);
    expect(callback.mock.calls[5][0].data).toBe(5);
    expect(callback.mock.calls[10][0].data).toBe(324);
  });

  it('returns an array of values if no function is given', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.postorder(tree.root)).toEqual([
      1, 3, 5, 7, 4, 9, 23, 324, 6345, 67, 8,
    ]);
  });

  it('returns an empty array if a tree is empty', () => {
    const tree = Tree([]);
    expect(tree.postorder(tree.root)).toEqual([]);
  });

  it('calls callback function instead of returning an array', () => {
    const callback = jest.fn();
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    expect(tree.postorder(tree.root, callback)).toBe(null);
    expect(callback.mock.calls.length).toBe(11);
    expect(callback.mock.calls[0][0].data).toBe(1);
    expect(callback.mock.calls[5][0].data).toBe(9);
    expect(callback.mock.calls[10][0].data).toBe(8);
  });

  it('returns 0 if a given node is a leaf node', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const node = tree.find(324);
    const height = tree.height(node);
    expect(height).toBe(0);
  });

  it('returns correct height for a given node', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const node = tree.find(tree.root, 4);
    const height = tree.height(node);
    expect(height).toBe(2);
  });

  it('returns 0 if a given node is a root node', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const depth = tree.depth(tree.root, tree.root);
    expect(depth).toBe(0);
  });

  it('returns correct depth for a given node', () => {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    const node = tree.find(tree.root, 9);
    const depth = tree.depth(tree.root, node);
    expect(depth).toBe(3);
  });
});
