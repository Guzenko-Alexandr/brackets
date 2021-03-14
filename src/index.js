module.exports = function check(str, bracketsConfig) {
  const openedSeq = [];
  const opened = {};
  const closed = {};
  bracketsConfig.forEach(pair => {
    opened[pair[0]] = pair[1];
    closed[pair[1]] = pair[0];
  });

  for (bracket of str) {
    if (closed[bracket] === opened[bracket]) {
      if (openedSeq[0] === bracket) {
        openedSeq.shift();
      } else {
        openedSeq.unshift(bracket);
      }
    } else if (Object.keys(closed).includes(bracket)) {
      if (openedSeq[0] === closed[bracket]) {
        openedSeq.shift();
      } else {
        return false;
      }
    } else if (Object.keys(opened).includes(bracket)) {
      openedSeq.unshift(bracket);
    } else {
      return false;
    }
  }
  if (openedSeq.length)
    return false;
  return true;
}