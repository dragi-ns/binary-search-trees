import Node from './Node';

describe('Node', () => {
  it('sets null as the default initial values', () => {
    const node = Node();
    expect(node.data).toBe(null);
    expect(node.left).toBe(null);
    expect(node.right).toBe(null);
  });

  it('corretly passes the given initial values', () => {
    const node = Node('root', Node('left'), Node('right'));
    expect(node.data).toBe('root');
    expect(node.left.data).toBe('left');
    expect(node.right.data).toBe('right');
  });
});
