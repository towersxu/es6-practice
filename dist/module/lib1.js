"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incCounter = incCounter;
/**
 * Created by taox on 16-1-25.
 */
var counter = exports.counter = 3;
function incCounter() {
  exports.counter = counter += 1;
}