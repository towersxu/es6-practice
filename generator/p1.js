/**
 * Created by taox on 16-1-25.
 */
function *foo(){
  while (true){
    yield Math.random();
  }
}
var a = foo();
console.log(a.next());
console.log(a.next());
console.log(a.next());
a.next();
a.next();