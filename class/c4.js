/**
 * Created by taox on 16-1-29.
 */
function sum(x,y){
  this.x = x*2;
  return x+y;
}
var b = new sum(1,2);
var c = sum(1,2);
console.log(b);
console.log(c);

sum.zzz = 'zzz';

console.log(b.x);
console.log(sum.prototype.x);