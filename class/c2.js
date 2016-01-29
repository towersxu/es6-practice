/**
 * Created by izwel on 16/1/26.
 */
"use strict";

class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  toString(){
    console.log("("+this.x +","+ this.y+")");
  }
}

class ThreeDPoint extends Point{
  constructor(x,y,z) {
    super(x,y);
    this.z = z;
  }
  toString(){
    console.log("("+this.x+","+this.y+","+this.z+")")
  }
  goUp(){
    console.log("("+this.x+","+this.y+","+this.z+")")
  }
}
class RevPoint extends Point{
  toString() {
    console.log("("+this.y+","+this.x+")")
  }
}

var point1 = new Point(1,2);
var point2 = new RevPoint(2,1);
var point3 = new ThreeDPoint(1,2,3);
point3.goUp();
console.log(point2.__proto__.__proto__ === point1.__proto__);  //true
console.log(RevPoint.prototype.__proto__ === Point.prototype); //true
console.log(point1.__proto__ === Point.prototype); //true
//point1.__proto__ === Point.prototype === RevPoint.prototype.__proto__=== point2.__proto__.__proto__;
var arr = new Array();

console.log(Array.prototype.__proto__ === Array.__proto__);

