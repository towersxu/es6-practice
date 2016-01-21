/**
 * Created by taox on 16-1-21.
 */
var x =NaN,
  y=0;
  z=-0;
console.log(x === NaN);          //false
console.log(y === z);             //true
console.log(Object.is(x,NaN));    //true
console.log(Object.is(x,y));      //false