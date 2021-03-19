class PqNode {
  constructor(priority, value = null) {
    this.priority = priority;
    this.value = value;
  }

  getPriority() {
    return this.priority;
  }

  getValue() {
    return this.value;
  }
}

class PriorityQueue {
  // #pqArray;
  // #type; // 'min' or 'max'

  constructor(pqArray = [], type = 'max') {
    this.pqArray = pqArray;
    if (type === 'max') {
      this.type = 'max';
    } else {
      this.type = 'min';
    }
  }

  getType() {
    return this.type;
  }

  toArray() {
    return this.pqArray;
  }

  isEmpty() {
    return this.pqArray.length === 0;
  }

  toPriorityArray() {
    let priorityArray = [];
    this.pqArray.forEach((elm) => {
      priorityArray.push(elm.getPriority());
    });
    return priorityArray;
  }

  toValues() {
    let array = [];
    this.pqArray.forEach((elm) => {
      array.push(elm.getValue());
    });
    return array;
  }

  priorityCompare(left, right) {
    return this.type === 'min' ? left < right : left > right;
  }

  insert(node) {
    if (!(node instanceof PqNode)) {
      throw new Error('Inserting an non PqNode');
    }
    // append to the end of the pqArray
    this.pqArray.push(node);
    let nodeIdx = this.pqArray.length - 1;
    let parentIdx = Math.floor((nodeIdx - 1) / 2);
    let currentNode = node;
    while (
      parentIdx >= 0 &&
      this.priorityCompare(currentNode.getPriority(), this.pqArray[parentIdx].getPriority())
    ) {
      // swap node with parent
      const parentNode = this.pqArray[parentIdx];
      this.pqArray[parentIdx] = currentNode;
      this.pqArray[nodeIdx] = parentNode;

      // decrement array index, bubble up
      nodeIdx = parentIdx;
      parentIdx = Math.floor((nodeIdx - 1) / 2);
      currentNode = this.pqArray[nodeIdx];
    }
  }

  extractTop() {
    // swap top node with last node in pq array,
    // tickle down
    // while left or right not undefined
    //    if (left > right) swap left with curr
    //    else swap right with curr

    // [0,  1,  2,  3,  4,  5,  6...]
    // [55, 41, 39, 33, 18, 27, 12]
    if (this.pqArray.length === 0) {
      return null;
    } else if (this.pqArray.length === 1) {
      return this.pqArray.pop();
    }
    const lastNode = this.pqArray.pop();
    const topNode = this.pqArray[0];
    this.pqArray[0] = lastNode;

    let leftChildIdx = 1;
    let rightChildIdx = 2;
    let currIdx = 0;

    while (this.pqArray[leftChildIdx] !== undefined || this.pqArray[rightChildIdx] !== undefined) {
      let leftPriority, rightPriority;
      if (this.pqArray[leftChildIdx] === undefined) {
        leftPriority = this.type === 'min' ? Infinity : -Infinity;
      } else {
        leftPriority = this.pqArray[leftChildIdx].getPriority();
      }

      if (this.pqArray[rightChildIdx] === undefined) {
        rightPriority = this.type === 'min' ? Infinity : -Infinity;
      } else {
        rightPriority = this.pqArray[rightChildIdx].getPriority();
      }

      let currNode = this.pqArray[currIdx];

      if (
        this.priorityCompare(this.pqArray[currIdx], this.pqArray[leftChildIdx]) &&
        this.priorityCompare(this.pqArray[currIdx], this.pqArray[rightChildIdx])
      ) {
        break; // in correct place, done
      } else if (
        this.priorityCompare(leftPriority, rightPriority) &&
        this.priorityCompare(leftPriority, this.pqArray[currIdx].getPriority())
      ) {
        // swap left
        this.pqArray[currIdx] = this.pqArray[leftChildIdx];
        this.pqArray[leftChildIdx] = currNode;
        currIdx = leftChildIdx;
      } else if (this.pqArray[rightChildIdx] === undefined) {
        break; // do not swap right if right index is out of bound
      } else {
        // swap right
        this.pqArray[currIdx] = this.pqArray[rightChildIdx];
        this.pqArray[rightChildIdx] = currNode;
        currIdx = rightChildIdx;
      }
      leftChildIdx = 2 * currIdx + 1;
      rightChildIdx = 2 * currIdx + 2;
    }
    return topNode;
  }
}

module.exports.PqNode = PqNode;
module.exports.PriorityQueue = PriorityQueue;
