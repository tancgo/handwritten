const root = require("./bt");

// 后序遍历左右根  预期结果 [4,5,2,6,7,3,1]

// 解法1：递归
var postorderTraversal0 = function (root) {
  const res = [];
  const postorder = (root) => {
    if (!root) return;
    postorder(root.left);
    postorder(root.right);
    res.push(root.val);
  };

  postorder(root);

  return res;
};

// 解法2：栈
function postorderTraversal(root) {
  if (!root) return [];
  const stack = [root];
  const res = [];
  // 前序是根左右，后序是左右根(前序调整为根右左，逆序输出)
  while (stack.length) {
    const node = stack.pop();

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);

    res.push(node.val);
  }
  return res.reverse();
}

// 解法3：标记法模拟递归手动维护一个栈
function postorderTraversal1(root) {
  if (!root) return [];
  const stack = [[root, 0]];
  const res = [];

  while (stack.length) {
    const [node, has] = stack.pop();

    if (!node) continue;

    if (!has) {
      stack.push([node, 1]);
      stack.push([node.right, 0]);
      stack.push([node.left, 0]);
    } else {
      res.push(node.val);
    }
  }

  return res;
}

console.log(postorderTraversal0(root), "递归");
console.log(postorderTraversal(root), "栈");
console.log(postorderTraversal1(root), "栈模拟递归过程");
