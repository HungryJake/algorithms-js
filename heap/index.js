const { PriorityQueue, PqNode } = require('./priority-queue.js');

// merge k sorted lists
function mergeKSortedList(inputArray) {
  let result = [];
  const pq = new PriorityQueue([], 'min');

  let pointers = new Array(inputArray.length);
  pointers.fill(0);
  for (let i = 0; i < pointers.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      const pqNode = new PqNode(inputArray[i][j]);
      pq.insert(pqNode);
    }
  }

  while (!pq.isEmpty()) {
    const top = pq.extractTop();
    result.push(top.getPriority());
  }
  return result;
}

console.log(
  'result: ',
  mergeKSortedList([
    [1, 4, 5],
    [1, 3, 4],
    [2, 6]
  ])
);
