function numIslands(grid) {
  let count = 0;
  
  if (grid.length === 0) return 0;
  else if (grid[0].length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
      if (grid[i][j] === "1") {
        count++;
        sink(i, j);
      }
    }
  }

  function sink(y, x) {
    // sink self
    grid[y][x] = 0;

    // north
    if (y-1 >= 0 && grid[y-1][x] === "1") {
      sink(y-1, x);
    }
    // east
    if (x+1 < n && grid[y][x+1] === "1") {
      sink(y, x+1);
    }
    // south
    if (y+1 < m && grid[y+1][x] === "1") {
      sink(y+1, x);
    }
    // west
    if (x-1 >= 0 && grid[y][x-1] === "1") {
      sink(y, x-1);
    }
  }

  return count;
}

module.exports = numIslands;
