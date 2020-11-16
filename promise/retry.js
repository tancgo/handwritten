// 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
Promise.retry = function (fn, count) {
  return new Promise((resolve, reject) => {
    while (count > 0) {
      try {
        const res = await fn();
        resolve(res)
        return 
      } catch (error) {
        if(!count) reject(error)
      }
      count--;
    }
  })
}