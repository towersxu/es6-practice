/**
 * Created by taox on 15-11-2.
 */
"use strict";
{
  let a = 3;
  console.log(a);
}
console.log("--------------------------");
{
  let a =2;
  if (a >1) {
    let b = a*3;
    console.log(b);
    for(let i =a;i<b;i++){
      let j = i+10;
      console.log(j);
    }
    let c = a+b;
    console.log(c);
  }
}
console.log("--------------------------");
{
  //this is the reason why most people insist let declarations must be at the top of the scope
  //console.log(a);
  //console.log(b);
  //if(typeof b ==='undefined'){ //ReferenceError
  //
  //}
  //var a;
  //let b;
}
console.log("--------------------------");
console.log("----------let + for-------");
{
  var funcs = [];
  for(let i =0;i<5;i++){    //better
    funcs.push(function(){
      console.log(i);
    })
  }
  funcs[3]();
  funcs[4]();

  var funcs1 = [];
  for(var j=0;j<5;j++){
    funcs1.push(function(){
      console.log(j);
    })
  }
  funcs1[3]();
  funcs1[4]();
  var funcs2 = [];
  for(var k=0;k<5;k++){
    let j=k;
    funcs2.push(function(){
      console.log(j);
    })
  }
  funcs2[3]();
  funcs2[4]();
}
console.log("--------------------------");
console.log("--------------------------");
console.log("--------------------------");
console.log("--------------------------");
console.log("--------------------------");
console.log("--------------------------");