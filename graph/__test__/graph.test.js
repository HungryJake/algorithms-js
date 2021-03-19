const Graph = require('../graph');

describe('Test graph data structure', () => {
  it('should successfully create a graph object, and ', () => {
    let graph = new Graph();
    expect(graph.isEmpty()).toBeTruthy();
    graph.addVertex('Dallas');
    graph.removeVertex('Dallas');
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('should allow graph to add edges', () => {
    let graph = new Graph();
    expect(graph.isEmpty()).toBeTruthy();
    graph.addVertex('Dallas');
    graph.addVertex('Tokyo');
    graph.addEdge('Dallas', 'Tokyo');

    expect(graph.hasDirectEdgeFromTo('Dallas', 'Tokyo'));
    expect(graph.hasDirectEdgeFromTo('Tokyo', 'Dallas'));

    graph.removeVertex('Dallas');
    graph.removeVertex('Tokyo');
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('should allow graph to remove edges', () => {
    let graph = new Graph();
    expect(graph.isEmpty()).toBeTruthy();
    graph.addVertex('Dallas');
    graph.addVertex('Tokyo');
    graph.addEdge('Dallas', 'Tokyo');

    expect(graph.hasDirectEdgeFromTo('Dallas', 'Tokyo')).toBeTruthy();
    expect(graph.hasDirectEdgeFromTo('Tokyo', 'Dallas')).toBeTruthy();
    graph.removeEdge('Dallas', 'Tokyo');
    expect(graph.hasDirectEdgeFromTo('Tokyo', 'Dallas')).toBeFalsy();
    expect(graph.hasDirectEdgeFromTo('Dallas', 'Tokyo')).toBeFalsy();

    graph.removeVertex('Dallas');
    graph.removeVertex('Tokyo');
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('should handle a more complex positive test case', () => {
    let graph = new Graph();
    expect(graph.isEmpty()).toBeTruthy();
    graph.addVertex('Dallas');
    graph.addVertex('Tokyo');
    graph.addVertex('Aspen');
    graph.addVertex('Los Angeles');
    graph.addVertex('Hong Kong');

    graph.addEdge('Dallas', 'Tokyo');
    graph.addEdge('Dallas', 'Aspen');
    graph.addEdge('Hong Kong', 'Tokyo');
    graph.addEdge('Hong Kong', 'Dallas');
    graph.addEdge('Los Angeles', 'Hong Kong');
    graph.addEdge('Los Angeles', 'Aspen');

    expect(graph.hasDirectEdgeFromTo('Dallas', 'Tokyo')).toBeTruthy();
    expect(graph.hasDirectEdgeFromTo('Tokyo', 'Dallas')).toBeTruthy();
    graph.removeEdge('Dallas', 'Tokyo');
    expect(graph.hasDirectEdgeFromTo('Tokyo', 'Dallas')).toBeFalsy();
    expect(graph.hasDirectEdgeFromTo('Dallas', 'Tokyo')).toBeFalsy();

    graph.removeVertex('Dallas');
    graph.removeVertex('Tokyo');
    graph.removeVertex('Aspen');
    graph.removeVertex('Los Angeles');
    graph.removeVertex('Hong Kong');
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('should traverse the graph with DFS iterative traversal', () => {
    let graph = new Graph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    const dfsResult = graph.dfsIterative('A');
    expect(dfsResult).toEqual(['A', 'C', 'E', 'F', 'D', 'B']);
    graph.removeVertex('A');
    graph.removeVertex('B');
    graph.removeVertex('C');
    graph.removeVertex('D');
    graph.removeVertex('E');
    graph.removeVertex('F');
  });

  it('should traverse the graph with DFS recursive traversal', () => {
    let graph = new Graph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    const dfsResult = graph.dfsRecursive('A');
    expect(dfsResult).toEqual(['A', 'B', 'D', 'E', 'C', 'F']);
    graph.removeVertex('A');
    graph.removeVertex('B');
    graph.removeVertex('C');
    graph.removeVertex('D');
    graph.removeVertex('E');
    graph.removeVertex('F');
  });

  it('should traverse the graph with BFS traversal', () => {
    let graph = new Graph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    const bfsResult = graph.bfsIterative('A');
    expect(bfsResult).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    graph.removeVertex('A');
    graph.removeVertex('B');
    graph.removeVertex('C');
    graph.removeVertex('D');
    graph.removeVertex('E');
    graph.removeVertex('F');
  });
});
