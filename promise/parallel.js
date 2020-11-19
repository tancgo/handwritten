const urls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const getResults = (all) => {
  const promises = []
  for (const item of all) {
    promises.push(new Promise((resolve) => { resolve(item) }))
  }

  return Promise.all(promises)
}

const parallel = async (urls, max) => {
  const arr = urls.slice();

  for (let i = 0; i < arr.length; i = i + max) {
    const res = await getResults(arr.slice(i, i + max))
    console.log(res, 'res');
  }
}

parallel(urls, 3)