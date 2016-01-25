/**
 * Created by taox on 16-1-25.
 */

function *foo() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

function *bar() {
  var x = yield *foo();
  console.log( "finish loop,x:", x );
  //return x;
}

//for (var v of bar()) {
//  console.log( v );
//}
var x = bar();
var b = x.next();
while(!b.done){
  console.log(b);
  b =x.next();
}
