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
});
