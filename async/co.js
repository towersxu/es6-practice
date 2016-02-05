/**
 * Created by taox on 16-2-5.
 */
var co =require('co')
co(function* () {
  var result = yield Promise.resolve(true);
  return result;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});