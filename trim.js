const findLeft = (s) => {
  let left = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      left += 1;
    } else {
      break
    }
  }

  return left;
}

const findRight = (s) => {
  let right = s.length - 1;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ' ') {
      right -= 1;
    } else {
      break
    }
  }

  return right;
}

const trim = (s) => {
  const left = findLeft(s)
  const right = findRight(s)

  console.log(left, right);

  return s.slice(left, right + 1)
}

const a = ' ab c '
const b = '   abc'
const c = 'abc   '

console.log(trim(a));
console.log(trim(b));
console.log(trim(c));