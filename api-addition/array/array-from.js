/**
 * Created by taox on 16-1-20.
 */
  'use strict';
let arrayLike  = {
  '1':'a',
  '2':'b',
  '4':'c',
  'length':3
};
let arr2 = Array.from(arrayLike);
console.log(arr2);

var arrLike = {
  length: 3,
  0: "foo",
  2: "bar",
  3: "zaa"
};

var arr = Array.prototype.slice.call( arrLike );
console.log(arr);
console.log('--------------------->')
var arr3 = Array.from(arrayLike,function mapper(value,index){
  if(typeof value === "string"){
    return value.toUpperCase();
  }else{
    return value;
  }
});
console.log(arr3);