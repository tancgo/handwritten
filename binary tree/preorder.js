const root = require("./bt");

// 前序遍历根左右  预期结果 [1,2,4,5,3,6,7]

// 解法1：递归
function preorderTraversal0(root) {
  const res = [];

  const preorder = (node) => {
    if (!node) return;

    res.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };

  preorder(root);

  return res;
}

// 解法2：栈
function preorderTraversal(root) {
  const stack = [root];
  const res = [];

  while (stack.length) {
    const cur = stack.pop();

    if (cur.right) stack.push(cur.right);
    if (cur.left) stack.push(cur.left);

    res.push(cur.val);
  }

  return res;
}

// 解法3：标记法模拟递归手动维护一个栈
function preorderTraversal1(root) {
  if (!root) return [];
  const stack = [[root, 0]];
  const res = [];

  while (stack.length) {
    const [node, has] = stack.pop();

    if (!node) continue;

    if (!has) {
      stack.push([node.right, 0]);
      stack.push([node.left, 0]);
      stack.push([node, 1]);
    } else {
      res.push(node.val);
    }
  }

  return res;
}

console.log(preorderTraversal0(root), "递归");
console.log(preorderTraversal(root), "栈");
console.log(preorderTraversal1(root), "栈模拟递归过程");
