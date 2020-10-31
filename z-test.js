function add(...args) {
  const curied = function (...params) {
    return add(...args.concat(params));
  };

  curied.toString = () => args.reduce((a, b) => a + b);

  return curied;
}

console.log(add(1)(2, 3)(4) | 0);
