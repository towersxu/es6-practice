"use strict";

/**
 * Created by taox on 16-1-25.
 */
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter;
  },
  incCounter: incCounter
};