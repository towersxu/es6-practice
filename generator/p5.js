/**
 * Created by taox on 16-1-25.
 */
function *foo(x) {
  if (x < 3) {
    x = yield *foo( x + 1 );
  }
  return x * 2;
}

var b =foo( 1 );
console.log(b);
console.log(b.next());
