// html 标签解析
const str = "<div>12<span>45<p></p></span></div>";

console.log(str.match(/<\/\w+>/g));

// 模板字符串
let template = "我是${name}，年龄${age}，性别${gender}";
let data = {
  name: "姓名",
  age: 18,
  gender: "male",
};

function render(template, data) {
  let res = template;
  for (const key in data) {
    res = res.replace(new RegExp("\\$\\{" + key + "\\}", "g"), data[key]);
  }

  return res;
}

console.log(render(template, data));

// 使用正则实现手机号3 4 4 位数分隔
const tel = "18016438098";

function trans(tel) {
  return tel
    .replace(new RegExp("\\d{3}"), (match) => {
      return match + " ";
    })
    .replace(new RegExp("\\d{4}"), (match) => {
      return match + " ";
    });
}

console.log(trans(tel));

// 检测是否是手机号

function isPhoneNumber(num) {
  return /^1[3-9]\d{9}$/.test(num);
}

console.log(isPhoneNumber(tel));

// 千分位分隔 保留三位小数  (正则不会写  写一个遍历的)
function parseToMoney(num) {
  const result = [];
  let count = 0;
  const [interger, decimal] = num.toString().split(".");
  const nums = interger.split("");

  for (let i = nums.length - 1; i >= 0; i--) {
    count++;
    result.unshift(nums[i]);
    if (!(count % 3) && i !== 0) {
      result.unshift(",");
    }
  }

  return decimal ? result.join("") + '.' + decimal.substring(0,3) : result.join("");
}

console.log(parseToMoney(1234.56)); // return '1,234.56'
console.log(parseToMoney(123456789)); // return '123,456,789'
console.log(parseToMoney(1087654.321)); // return '1,087,654.321'
console.log(parseToMoney(1087654.32112)); // return '1,087,654.321'
