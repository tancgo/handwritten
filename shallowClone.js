function shallowClone(obj) {
  // 只拷贝对象
  if (typeof obj !== "object") return;

  // 根据obj的类型决定新建一个数组还是对象
  // 判断是否是一个数组 Array.isArray(obj)  Object.prototype.toString.call(obj)  obj instanceof Array
  const newObj = obj instanceof Array ? [] : {};

  // 遍历obj, 并且判断是obj的属性才拷贝
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = object[key];
    }
  }

  return newObj;
}
