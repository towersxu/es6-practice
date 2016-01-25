/**
 * Created by taox on 16-1-25.
 */
"use strict";

var _lib = require("./lib1");

console.log(_lib.counter); // 3
(0, _lib.incCounter)();
console.log(_lib.counter); // 4