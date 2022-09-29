/* eslint-disable no-console */
import Tree from './Tree';

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(
  'Tree should be initally balanced (expected true): ',
  tree.isBalanced()
);
console.log('Elements in level order: ', tree.levelOrder());
console.log('Elements in level preorder: ', tree.preorder(tree.root));
console.log('Elements in level postorder: ', tree.postorder(tree.root));
console.log('Elements in level inorder: ', tree.inorder(tree.root));
console.log('Inserting 150 numbers...');
for (let i = 0; i < 150; i += 1) {
  tree.insert(tree.root, i);
}
console.log('Tree shoulde be unbalanced (expected false): ', tree.isBalanced());
console.log('Balancing tree...');
tree.rebalance();
console.log('Tree should be balanced (expected true): ', tree.isBalanced());
console.log('Elements in level order: ', tree.levelOrder());
console.log('Elements in level preorder: ', tree.preorder(tree.root));
console.log('Elements in level postorder: ', tree.postorder(tree.root));
console.log('Elements in level inorder: ', tree.inorder(tree.root));
