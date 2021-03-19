class graph {
  // private members
  //#adjacencies; // object of adjacency arrays: { [...], [...], [...], ... }

  constructor() {
    this.adjacencies = {};
  }

  isEmpty() {
    return Object.keys(this.adjacencies).length === 0 && this.adjacencies.constructor === Object;
  }

  addVertex(vertex) {
    if (typeof vertex !== 'string') {
      throw new Error('Vertex must be a string');
    }
    if (this.adjacencies[vertex]) {
      throw new Error('Vertex already exist');
    }
    this.adjacencies[vertex] = [];
  }

  removeVertex(vertex) {
    if (!this.adjacencies[vertex]) {
      throw new Error('Vertex does not exist');
    }
    if (!this.adjacencies[vertex]) {
      throw new Error(`${vertex} does not exist`);
    }
    // loop through all vertexes
    //   every adjacency vertex, remove edge from it
    // remove vertex key in adjacency object
    let adjCount = this.adjacencies[vertex].length;
    while (adjCount > 0) {
      const adjVertex = this.adjacencies[vertex][adjCount - 1];
      this.removeEdge(vertex, adjVertex);
      adjCount = this.adjacencies[vertex].length;
    }
    delete this.adjacencies[vertex];
  }

  addEdge(vertex1, vertex2) {
    if (typeof vertex1 !== 'string' || typeof vertex2 !== 'string') {
      throw new Error('Vertex must be a string');
    }
    if (!this.adjacencies[vertex1]) {
      throw new Error(`${vertex1} does not exist`);
    }
    if (!this.adjacencies[vertex2]) {
      throw new Error(`${vertex2} does not exist`);
    }
    if (
      this.adjacencies[vertex1].includes(vertex2) ||
      this.adjacencies[vertex2].includes(vertex1)
    ) {
      throw new Error('Edge already exist');
    }
    this.adjacencies[vertex1].push(vertex2);
    this.adjacencies[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    if (typeof vertex1 !== 'string' || typeof vertex2 !== 'string') {
      throw new Error('Vertex must be a string');
    }
    const idx2 = this.adjacencies[vertex1].indexOf(vertex2);
    if (idx2 === -1) {
      throw new Error(`Vertex: ${vertex2} not found in ${vertex1}`);
    }
    this.adjacencies[vertex1].splice(idx2, 1);
    const idx1 = this.adjacencies[vertex2].indexOf(vertex1);
    if (idx1 === -1) {
      throw new Error(`Vertex: ${vertex1} not found in ${vertex2}`);
    }
    this.adjacencies[vertex2].splice(idx1, 1);
  }

  hasDirectEdgeFromTo(from, to) {
    if (typeof from !== 'string' || typeof to !== 'string') {
      throw new Error('Vertex must be a string');
    }
    if (!this.adjacencies[from]) {
      throw new Error('From vertex does not exist');
    }
    return this.adjacencies[from].indexOf(to) !== -1;
  }

  dfsIterative(startFrom) {
    if (this.isEmpty()) {
      return [];
    }
    if (!this.adjacencies[startFrom]) {
      throw new Error('Start vertex does not exist in the graph');
    }
    let results = [];
    let discovered = {};
    discovered[startFrom] = true;
    let path = [startFrom];
    const currVertex = startFrom;
    while (path.length > 0) {
      const currVertex = path.pop();
      results.push(currVertex);
      this.adjacencies[currVertex].forEach((neighbor) => {
        if (!discovered[neighbor]) {
          discovered[neighbor] = true;
          path.push(neighbor);
        }
      });
    }
    return results;
  }

  dfsRecursive(startFrom) {
    if (this.isEmpty()) {
      return [];
    }
    if (!this.adjacencies[startFrom]) {
      throw new Error('Start vertex does not exist in the graph');
    }
    let self = this;

    let results = [];
    let discovered = {};
    discovered[startFrom] = true;

    function visit(vertex) {
      discovered[vertex] = true;
      results.push(vertex);
      const neighbors = self.adjacencies[vertex];
      for (let i = 0; i < neighbors.length; i++) {
        const currNeighbor = neighbors[i];
        if (!discovered[currNeighbor]) {
          visit(currNeighbor);
        }
      }
    }
    visit(startFrom);
    return results;
  }

  bfsIterative(start) {
    if (this.isEmpty()) {
      return [];
    }
    if (!this.adjacencies[start]) {
      throw new Error('Start vertex does not exist in the graph');
    }

    let queue = [start];
    let result = [];
    let discovered = {};
    discovered[start] = true;
    while (queue.length > 0) {
      const currVertex = queue.shift();
      result.push(currVertex);
      this.adjacencies[currVertex].forEach((vertex) => {
        if (!discovered[vertex]) {
          discovered[vertex] = true;
          queue.push(vertex);
        }
      });
    }
    return result;
  }
}

module.exports = graph;
