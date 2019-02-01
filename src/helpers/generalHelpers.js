export default {
  testFunction() {
    console.log('testFunction')
  },
  findUnique(a, b) {
    const result = a.filter(item => !b.includes(item))
    return result
  },
  getItemByKeyValue(arr, key, val) {
    let item = false
    arr.forEach(x => {
      if (x[key] === val) {
        item = x
      }
    })

    return item
  },
  checkTimeElapsed(timestamp, hourLimit) {
    const now = Date.now()
    const limit = 60 * 60 * hourLimit * 1000
    const elapsed = now - timestamp

    return elapsed > limit
  }
}