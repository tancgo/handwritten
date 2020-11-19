const urls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const sleep = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i);
      resolve(i)
    },1000);
  })
}
const serial = async (arr) => {
  for (const item of arr) {
    await sleep(item)
  }
}

serial(urls)