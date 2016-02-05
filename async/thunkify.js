/**
 * Created by taox on 16-2-5.
 */
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  console.log(typeof str)
});