/**
 * Created by taox on 16-1-21.
 */
'use strict';

function f() {
  var x = arguments.length <= 0 || arguments[0] === undefined ? 11 : arguments[0];
  var y = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

  console.log(x + y);
}
f();