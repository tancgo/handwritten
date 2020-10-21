// Object.defineProperty
const obj = {}
Object.defineProperty(obj, 'text', {
  get: function () {
    console.log('get val');
  },
  set: function (newVal) {
    console.log('set val:' + newVal);
    
  }
})