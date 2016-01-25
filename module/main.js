/**
 * Created by taox on 16-1-25.
 */
// main.js
var incCounter = require('./lib').incCounter;

incCounter();
var counter = require('./lib').counter;
console.log(counter);  // 4
incCounter();
console.log(counter); // 4