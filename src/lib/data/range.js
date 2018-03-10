export default function (n, m, polyfill = false, unit = '') {
  let arr = []
  for (let i = n; i <= m; i++) {
    let value = (polyfill && i < 10 ? '0' + i : i) + unit
    arr.push(value)
  }
  return arr
}
