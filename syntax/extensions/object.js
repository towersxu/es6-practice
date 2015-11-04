/**
 * Created by towersxu on 2015/11/2.
 */
var x = 2, y = 3, o = {x, y};
console.log(o.x);
var f = {
  x(){
    console.log('x');
  },
  y(){
    console.log('y');
  }
};
f.x();
console.log('----------------------------------------');
{
  function runSomething(o) {
    var x = Math.random(),
      y = Math.random();
    return o.something(x,y);
  }
  var a = runSomething({
    something:function something(x,y){
      if(x>y) {
        return something(y,x);
      }
      return y-x;
    }
  });
  console.log(a);
}

console.log('----------------------------------------');
{
  //function runSomething(o) {
  //  var x = Math.random(),
  //    y = Math.random();
  //  return o.something(x,y);
  //}
  //var b =runSomething({
  //  something(x,y) {
  //    if(x>y){
  //      return something(y,x);
  //    }
  //    return y-x;
  //  }
  //});
  //console.log(b);
}