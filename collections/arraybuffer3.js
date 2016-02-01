/**
 * Created by taox on 16-2-1.
 */
// ArrayBuffer转为字符串，参数为ArrayBuffer对象
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
var a='00';
var buf = str2ab(a);
var x = new Uint16Array(buf);
console.log(x);      //{'0':48,'1':48}
var b = ab2str(x);
console.log(b);       //00