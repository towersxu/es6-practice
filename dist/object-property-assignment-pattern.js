'use strict';

/**
 * Created by taox on 16-1-21.
 */
function bar() {
  return {
    a: '1',
    b: '2',
    c: '3'
  };
}

var _bar = bar();

var a = _bar.a;
var b = _bar.b;
var c = _bar.c;

console.log(a, b, c);

var _bar2 = bar();

var a = _bar2.x;
var b = _bar2.y;
var c = _bar2.z;

console.log(x, y, z);