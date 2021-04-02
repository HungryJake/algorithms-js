function FrogJump(x, y, d) {
  if (x < 0 || y < 0 || d < 0) {
    return 0;
  } else if (x > y) {
    return 0;
  }
  return Math.ceil((y - x) / d);
}

module.exports = FrogJump;
