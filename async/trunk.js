/**
 * Created by taox on 16-2-5.
 */
"use strict";

var fs = require('fs');

var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
var readFileThunk = Thunk(fs.readFile);
readFileThunk('package.json')(function(error,data){
  console.log(typeof  data);
});