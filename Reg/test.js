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
    res = res.replace(new RegExp("\\$\\{" + key + "\\}", 'g'), data[key]);
  }

  return res;
}

console.log(render(template, data));
