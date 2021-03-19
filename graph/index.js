const { WeightedGraph, PriorityQueue } = require('./dijkstra');

let graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('C', 'D', 2);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('B', 'E', 3);
graph.addEdge('E', 'F', 1);
console.log(graph.shortestPath('A', 'E'));
