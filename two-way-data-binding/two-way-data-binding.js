/**
 *  Proxy
    代理的是 对象
    可以拦截到数组的变化
    拦截的方法多达13种
    返回一个拦截后的数据
     
*   Object.defineProperty
    代理的是属性
    对数组数据的变化无能为力
    直接修改原始数据
 */
// Object.defineProperty
const obj = {};
Object.defineProperty(obj, "text", {
  get: function () {
    console.log("get val");
  },
  set: function (newVal) {
    console.log("set val:" + newVal);
  },
});
