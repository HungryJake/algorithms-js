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
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  shortestPath(start, finish) {
    let nodes = new PriorityQueue();
    let distances = {}; // store each distance from start to each node
    let previous = {}; // store the last node visited

    // setup
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        nodes.enqueue(vertex, 0);
        distances[vertex] = 0;
      } else {
        nodes.enqueue(vertex, Infinity);
        distances[vertex] = Infinity;
      }
      previous[vertex] = null;
    }
    // console.log('nodes: ', nodes);
    // console.log('distances: ', distances);
    // console.log('previous: ', previous);

    while (nodes.values.length > 0) {
      let smallest = nodes.dequeue().val; // get A out
      if (smallest === finish) {
        // done
        console.log('Done!');
        // build the path to return
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        this.adjacencyList[smallest.val].forEach((neighbor) => {
          console.log('neighbors: ', neighbor);
          if 
          const dist = neighbor.weight + distances[]
        });
      }
      console.log('---');
    }
  }
}

module.exports = {
  PriorityQueue,
  WeightedGraph
};
