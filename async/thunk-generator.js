/**
 * Created by taox on 16-2-5.
 */
var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFile('package.json');
  console.log(r1.toString());
  var r2 = yield readFile('.gitignore');
  console.log(r2.toString());
};

var g = gen();

var r1 = g.next();
r1.value(function(err, data){
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function(err, data){
    if (err) throw err;
    g.next(data);
  });
});