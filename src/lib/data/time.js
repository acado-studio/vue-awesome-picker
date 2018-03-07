function range(n, m, polyfill = false, unit = '') {
  let arr = []
  for (let i = n; i <= m; i++) {
    let value = (polyfill && i < 10 ? '0' + i : i) + unit
    arr.push(value);
  }
  return arr
}

export default [range(0, 23, true, '点'), range(0, 59, true, '分'), range(0, 59, true, '秒')];
