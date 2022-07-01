// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex)=> {
  const result = Array.from(list);
  const removed = result.splice(startIndex, 1)[0];
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;