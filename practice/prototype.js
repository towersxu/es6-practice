/**
 * Created by izwel on 16/1/23.
 */
//function han(){
//
//}
//han.prototype.a = function(){
//  //console.log('this is prototype a')
//  return 'a';
//}
////var b = new han();
////b.a();
//var c = han();
//console.log(c);
//console.log(typeof c)

////var a;
//'use strict';
//console.log(a);
//let a;
//var a = 'a';
//console.log(global.a);
//"use strict";
//console.log(global);
"use strict";
function *g(){
  this.a = 'a';
  this.b = 'b';
}
g.prototype.gf = function(){
  console.log(1);
}
function h(){
  this.a1 = 'a1';
  this.b1 = 'b1';
}
h.prototype.hf = function(){
  console.log(2);
}
let obj = g();
//let obj2 = h();      //error;
let obj3 = new g();
let obj4 = new h();
console.log(obj);
console.log(typeof obj);   //object
console.log(typeof obj3);  //object
console.log(typeof obj4);  //object
obj.gf();     //1
obj3.gf();    //1
obj4.hf();    //2
//console.log(obj4.hf());