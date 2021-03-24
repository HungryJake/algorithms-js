class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {}; // format: { 'vertex': ['adj1', 'adj2', ...], ... }
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight) {
    // string, string, number
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  shortestPath(start, finish) {
    let nodes = new PriorityQueue();
    let distances = {}; // store each distance from start to each node
    let previous = {}; // store the last node visited
    let result = [];

    // setup configure the pq and hash table
    for (let key in this.adjacencyList) {
      if (key === start) {
        distances[key] = 0;
        nodes.enqueue(key, 0);
      } else {
        distances[key] = Infinity;
        nodes.enqueue(key, Infinity);
      }
    }

    let closest = null;
    while (nodes.values.length > 0) {
      closest = nodes.dequeue();
      for (let key in this.adjacencyList[closest.val]) {
        const neighbor = this.adjacencyList[closest.val][key];
        const candidate = distances[closest.val] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = closest.val;
          nodes.enqueue(neighbor.node, candidate); // why enqueue here? what happens to the initial items in the queue?
        }
        // console.log('------');
      }
    }

    // console.log('previous', previous);
    // console.log('pq', nodes);

    //trace previous dictionary to extract the shortest path
    let next = finish;
    while (next) {
      result.unshift(next);
      next = previous[next];
    }
    return result;
  }
}

module.exports = {
  PriorityQueue,
  WeightedGraph
};
