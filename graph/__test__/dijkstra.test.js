const { WeightedGraph } = require('../dijkstra.js');

describe('Dijkstra algorithm tests', () => {
  it('should return a 6 vertex graph start to end', () => {
    let graph = new WeightedGraph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addEdge('A', 'B', 4);
    graph.addEdge('B', 'E', 3);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('D', 'F', 1);
    graph.addEdge('F', 'E', 1);
    expect(graph.shortestPath('A', 'F')).toEqual(['A', 'C', 'D', 'F']);
  });

  it('should return 5 vertex graph from start to end', () => {
    const graph = new WeightedGraph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addEdge('A', 'B', 6);
    graph.addEdge('A', 'D', 1);
    graph.addEdge('B', 'D', 2);
    graph.addEdge('D', 'E', 1);
    graph.addEdge('B', 'E', 2);
    graph.addEdge('B', 'C', 5);
    graph.addEdge('E', 'C', 5);
    expect(graph.shortestPath('A', 'C')).toEqual(['A', 'D', 'E', 'C']);
  });
});
