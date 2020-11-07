const root = require("./bt");

// 中序遍历左根右  预期结果 [4,2,5,1,6,3,7]

// 解法1：递归
function inorderTraversal0(root) {
  const res = [];

  const inorder = (node) => {
    if (!node) return;

    inorder(node.left);
    res.push(node.val);
    inorder(node.right);
  };

  inorder(root);

  return res;
}

// 解法1：栈
function inorderTraversal(root) {
  const stack = [];
  const res = [];

  let pointer = root;

  while (stack.length || pointer) {
    // 将所有左子树压入栈中
    while (pointer) {
      stack.push(pointer);
      pointer = pointer.left;
    }

    // 弹出栈顶元素
    const peak = stack.pop();
    res.push(peak.val);
    // 指针指向右子树
    pointer = peak.right;
  }

  return res;
}

// 解法3：标记法模拟递归手动维护一个栈
function inorderTraversal1(root) {
  if (!root) return [];
  const stack = [[root, 0]];
  const res = [];

  while (stack.length) {
    const [node, has] = stack.pop();

    if (!node) continue;

    if (!has) {
      stack.push([node.right, 0]);
      stack.push([node, 1]);
      stack.push([node.left, 0]);
    } else {
      res.push(node.val);
    }
  }

  return res;
}

console.log(inorderTraversal0(root), "递归");
console.log(inorderTraversal(root), "栈");
console.log(inorderTraversal1(root), "栈模拟递归过程");
