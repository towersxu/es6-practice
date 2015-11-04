/**
 * Created by taox on 15-11-2.
 */

{
  var a = {};
  a.foo = foo;
  a.name = 'xutao';
  function foo(a){
    console.log(this.name+":"+a)
  }
  a.foo('a');
}
console.log('----------------------------------');
{
  var a = [2,3,4];
  var b = [1,...a,5];
  console.log(b);
}
console.log('----------------------------------');
{
  var a = {};
  a.foo = foo;
  a.name = 'xutao';
  function foo(a){
    console.log(this.name+":"+a)
  }

  var b = {};
  b.name = 'xt';
  foo.apply(b,['b']);
  foo(...['a']);
}
console.log('----------------------------------');
{
  //function foo(...z){
  //  console.log(z);
  //}
  //foo(1,2,3,4,5);

}
console.log('----------------------------------');
{
  //function foo(x = 1,y = 2){
  //  console.log(x+y);
  //}
  //foo(2,4);
  //foo(1);
  //foo(null,2);
}