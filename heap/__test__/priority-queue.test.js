const PriorityQueue = require('../priority-queue').PriorityQueue;
const PqNode = require('../priority-queue').PqNode;

describe('Priority queue tests', () => {
  it('should create priority queue with default type', () => {
    const pq = new PriorityQueue();
    expect(pq.getType()).toEqual('max');
  });

  it('should be able to insert a new node', () => {
    // 41, 39, 33, 18, 27, 12
    const nodes = [];
    nodes.push(new PqNode(41, '41'));
    nodes.push(new PqNode(39, '39'));
    nodes.push(new PqNode(33, '33'));
    nodes.push(new PqNode(18, '18'));
    nodes.push(new PqNode(27, '27'));
    nodes.push(new PqNode(12, '12'));

    const pq = new PriorityQueue(nodes);
    expect(pq.toPriorityArray()).toEqual([41, 39, 33, 18, 27, 12]);
    const node = new PqNode(55, 'fifty five');
    pq.insert(node);
    expect(pq.toPriorityArray()).toEqual([55, 39, 41, 18, 27, 12, 33]);
  });

  it('should be able to extract top', () => {
    const nodes = [];
    nodes.push(new PqNode(41, '41'));
    nodes.push(new PqNode(39, '39'));
    nodes.push(new PqNode(33, '33'));
    nodes.push(new PqNode(18, '18'));
    nodes.push(new PqNode(27, '27'));
    nodes.push(new PqNode(12, '12'));
    const pq = new PriorityQueue(nodes);
    pq.insert(new PqNode(55, 'fifty five'));
    expect(pq.toPriorityArray()).toEqual([55, 39, 41, 18, 27, 12, 33]);
    const top = pq.extractTop();
    expect(top.getValue()).toEqual('fifty five');
    expect(top.getPriority()).toEqual(55);
    expect(pq.toPriorityArray()).toEqual([41, 39, 33, 18, 27, 12]);
  });

  it('should handle empty extract top node', () => {
    const pq = new PriorityQueue();
    expect(pq.extractTop()).toBeNull();
    expect(pq.toPriorityArray()).toHaveLength(0);
  });

  it('should handle 1 item extract top', () => {
    const pq = new PriorityQueue([new PqNode(1, 'one')]);
    expect(pq.extractTop().getValue()).toEqual('one');
    expect(pq.toPriorityArray()).toHaveLength(0);
  });

  it('should be able to extract top till empty', () => {
    const nodes = [];
    nodes.push(new PqNode(41, '41'));
    nodes.push(new PqNode(39, '39'));
    nodes.push(new PqNode(33, '33'));
    nodes.push(new PqNode(18, '18'));
    nodes.push(new PqNode(27, '27'));
    nodes.push(new PqNode(12, '12'));
    const pq = new PriorityQueue(nodes);
    expect(pq.toPriorityArray()).toEqual([41, 39, 33, 18, 27, 12]);
    while (!pq.isEmpty()) {
      pq.extractTop();
    }
    expect(pq.isEmpty()).toBeTruthy();
  });

  it('should be able to extract min top till empty', () => {
    const nodes = [];
    nodes.push(new PqNode(12, '12'));
    nodes.push(new PqNode(18, '27'));
    nodes.push(new PqNode(27, '18'));
    nodes.push(new PqNode(33, '33'));
    nodes.push(new PqNode(39, '39'));
    nodes.push(new PqNode(41, '41'));
    const pq = new PriorityQueue(nodes, 'min');
    expect(pq.toPriorityArray()).toEqual([12, 18, 27, 33, 39, 41]);
    while (!pq.isEmpty()) {
      pq.extractTop();
    }
    expect(pq.isEmpty()).toBeTruthy();
  });

  // [1, 4, 5, 1, 3, 4, 2, 6];
  it('min priority queue with equal values traversal should be ok', () => {
    const nodes = [];
    nodes.push(new PqNode(1, 1));
    nodes.push(new PqNode(4, 4));
    nodes.push(new PqNode(5, 5));
    nodes.push(new PqNode(1, 1));
    nodes.push(new PqNode(3, 3));
    nodes.push(new PqNode(4, 4));
    nodes.push(new PqNode(2, 2));
    nodes.push(new PqNode(6, 6));
    const pq = new PriorityQueue(nodes, 'min');
    expect(pq.toValues()).toEqual([1, 4, 5, 1, 3, 4, 2, 6]);
    while (!pq.isEmpty()) {
      pq.extractTop();
    }
    expect(pq.isEmpty()).toBeTruthy();
  });
});
