/**
 * Created by taox on 16-1-21.
 */

//'use strict';    //打印I am outside,如果注释掉，则回会打印I an inside.
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());