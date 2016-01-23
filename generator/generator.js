/**
 * Created by izwel on 16/1/23.
 */
"use strict";
function *F(){
  this.a = 'a';
  this.b = 'b';
}
var f = new F();
console.log(f.a);   //undefined;
//上面代码中，函数F是一个构造函数，又是一个Generator函数。这时，使用new命令就无法生成F的实例了，因为F返回的是一个内部指针。
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
//如果要把Generator函数当作正常的构造函数使用，可以采用下面的变通方法。首先，生成一个空对象，使用bind方法绑定Generator函数内部的this。这样，构造函数调用以后，这个空对象就是Generator函数的实例对象了。

function step1(){
  console.log(1)
  setTimeout(function(){
    console.log(2);
    return 1;
  },3000)
}
function step2(){
  console.log(3);
  return 2;
}
function step3(){
  console.log(4);
  return 3;
}
function step4(){
  console.log(5);
  return 4;
}
function* longRunningTask() {
  try {
    var value1 = yield step1();
    var value2 = yield step2(value1);
    var value3 = yield step3(value2);
    var value4 = yield step4(value3);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
scheduler(longRunningTask());

function scheduler(task) {
  setTimeout(function() {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
      console.log('step return:'+task.value);
      task.value = taskObj.value
      scheduler(task);
    }else{
      console.log('done:'+task.value);
    }
  }, 0);
}