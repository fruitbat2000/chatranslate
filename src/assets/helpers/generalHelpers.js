export default {
  testFunction() {
    console.log('testFunction')
  },
  findUnique(a, b) {
    const result = a.filter(item => !b.includes(item))
    return result
  }
}