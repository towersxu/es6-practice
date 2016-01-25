/**
 * Created by taox on 16-1-25.
 */
function *foo(){
  var arr = [yield 1,yield 2,yield 3];
  return arr;
  //console.log(x);
}
var a = foo();
var b = a.next();
//console.log(b);
//var c= a.next();
//console.log(c);
//
//a.next();
//a.next();
while(!b.done){
  console.log(a);
  console.log(b);
  //console.log(b.value);
  b = a.next();
}