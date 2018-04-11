var floor = Math.floor, random = Math.random;

function g(start, end, arr ) {
  var arr = arr || [];
  while (start !== end) {
    arr.push(start++);
  }
  return arr;
}
var firstNums = g(1, 34);
var queue = [];
for(var i = 0; i < 6; ++i) {
  [].push.apply(queue, firstNums.splice(floor(random() *  firstNums.length), 1));
}
queue.sort((a, b) => a - b).push(floor(random() *  16) + 1);
console.log(queue.join(','));  // 输出结果