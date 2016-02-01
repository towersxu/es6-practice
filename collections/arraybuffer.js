/**
 * Created by taox on 16-2-1.
 */
var buf = new ArrayBuffer(4);
console.log(buf);
console.log(buf.byteLength);
//var buf = new ArrayBuffer(32);
var dataView = new DataView(buf);
console.log(dataView.getUint8(0)); // 0


var x1 = new Int32Array(buf);   //buf 4*8
x1[0] = 0xffffffff;
console.log(x1[0]); // -1
console.log(x1.length);    //1
x1[0] = 0xfffffff;
console.log(x1[0]); // 2^28-1
console.log(x1.length);    //1
var x2 = new Float32Array(buf);
x2[0]  = 0xffffffff;
console.log(x2[0]); // 2^32
console.log(x2.length);      //1
var x3 = new Uint32Array(buf);
x3[0]  = 0xffffffff;
console.log(x3.length);     //1
console.log(x3[0]); // 2^32-1
var x4 = new Int8Array(buf);
console.log(x4.length);   //4    32/8

var x5 = new Float32Array(buf);
x5[0]='你';
console.log(x5[0]);