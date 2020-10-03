function myflat(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? myflat(item, depth - 1) : item);
      }, [])
    : [...arr];
}

Array.prototype.myflat = function (depth = 1) {
  // depth = false / '-1'等情况
  if (!Number(depth) || Number(depth) < 0) {
    return this;
  }

  const arr = [].concat(this);

  return depth > 0
    ? arr.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? item.myflat(--depth) : item);
      }, [])
    : arr.slice();
};

var arr = [1, [2, [3, 4]]];

console.log(arr.myflat(), 'proto');

console.log(myflat(arr));


