/**
 * Created by taox on 16-1-25.
 */
function f(z,y){
  return this.x+z+y;
}
//var x =1;
var obj = {
  x:11,
  tx:function(){
    return this.x;
  }
};
//console.log(f.call(obj,1,2));
//console.log(f.apply(obj,[1,2]));
//var g = f.bind(obj);
//console.log(g(1,2));
//console.log(obj.tx());
/*注意在generator中，return一般是无效的，所以如果想让generator中的有效，则可以使用bind*/
function *Fn(){
  this.z = 'z';
  yield this.x = 'x';
  yield this.y = 'y';
}
var obj = {};
var f = Fn.bind(obj)();
console.log(obj);
f.next();
console.log(obj);
f.next();
console.log(obj);
f.next();
console.log(obj);