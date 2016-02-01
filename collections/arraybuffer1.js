/**
 * Created by taox on 16-2-1.
 */
var buf = new ArrayBuffer(4);
var x1 = new Int32Array(buf);   //buf 4*8
x1[0]=10;
console.log(x1[0]);      //10
var x2 = new Uint32Array(buf);
x2[0] = 11;
console.log(x2[0]);      //11
console.log(x1[0]);      //11