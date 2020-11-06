const arr = [5, 8, 11, 1, 78, 9, 2];

function quickSort(array) {
  function rec(array) {
    if (array.length <= 1) {
      return array;
    }

    const left = [];
    const right = [];
    const mid = array[0];

    for (let i = 1; i < array.length; i++) {
      const cur = array[i];
      if (cur < mid) {
        left.push(cur);
      } else {
        right.push(cur);
      }
    }

    return [...rec(left), mid, ...rec(right)];
  }

  const res = rec(array);
  return res;
}

console.log(quickSort(arr));
