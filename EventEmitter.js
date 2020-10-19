class EventEmitter {
  constructor() {
    // 事件对象，存放订阅的名字和事件，例如：{click: {handle1, handle2}}
    this.events = {};
  }

  // 订阅事件的方法
  on(eventName, callback) {
    if (!this.events[eventName]) {
      // 一个名字可以订阅多个事件函数
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  // 触发事件的方法
  emit(eventName, ...rest) {
    // 遍历执行所有订阅的事件
    this.events[eventName] &&
      this.events[eventName].forEach((f) => f.apply(this, rest));
  }

  // 移除订阅事件
  remove(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (f) => f != callback
      );
    }

    console.log(this.events);
  }
}

const event1 = new EventEmitter();
const handle = (...pyload) => console.log(pyload);
event1.on("click", handle);
event1.emit("click", 100, 200, 300, 100);
event1.remove("click", handle);
event1.emit("click", 100, 200, 300, 100);