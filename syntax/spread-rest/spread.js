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
  function foo(x,y,...z){
    console.log(x,y,z);
  }
  foo(1,2,3,4,5)
}