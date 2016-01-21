/**
 * Created by taox on 16-1-21.
 */
function bar(){
  return {
    a:'1',
    b:'2',
    c:'3'
  }
}
var {a:a,b:b,c:c} = bar();
console.log(a,b,c);
var {x:a,y:b,z:c} = bar();
console.log(x,y,z);