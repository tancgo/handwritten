const root = require("./bt");

// 层序遍历 预期结果 [[1],[2,3],[4,5,6,7]]

function levelorder(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];

  while (queue.length) {
    const len = queue.length;
    let level = [];

    for (let i = 0; i < len; i++) {
      const cur = queue.shift();
      level.push(cur.val);

      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }

    res.push(level);
    level = [];
  }

  return res;
}

console.log(levelorder(root));
