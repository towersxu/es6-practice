/**
 * Created by towersxu on 2015/11/2.
 */
{
  var o = {
    __id:10,
    get id(){return this.__id++;},
    set id(v) {this.__id = v}
  }
  console.log(o.id);
  console.log(o.id);
  o.id=20;
  console.log(o.id);
  console.log(o.__id);
  console.log(o.__id);
}