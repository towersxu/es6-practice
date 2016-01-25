/**
 * Created by taox on 16-1-25.
 */
"use strict";
function *foo(){
  var x = yield 1;
  var y = yield 6;
  var z = yield 11;
  //return {
  //  x:x,
  //  y:y,
  //  z:z
  //}
}
//for(let i of foo()){
//  console.log(i);
//  if(i>5){
//    break;
//  }
//}
var it = foo();

console.log(it.next());              // { value: 1, done: false }

try {
  it.throw( "Oops!" );
}
catch (err) {
  console.log( err ); // Exception: Oops!
}

console.log(it.next());