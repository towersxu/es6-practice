/**
 * Created by taox on 16-1-20.
 */
'use strict';
var a = Array(3);
console.log(a);    //[,,]
var a1 = Array(3,4);
console.log(a1);   //[3,4]

var b = Array.of(3);
console.log(b);    //[3]
var b1 = Array.of(3,4);
console.log(b1);    //[3,4]

class MyCoolArray extends Array {
  sum() {
    return this.reduce( function reducer(acc,curr){
      return acc + curr;
    }, 0 );
  }
}

var x = new MyCoolArray( 3 );
x.length;                       // 3 -- oops!
console.log(x.sum());             // 0
var z = MyCoolArray.of( 3 );
z.length;                       // 1
console.log(z.sum());             // 3