/**
 * Created by taox on 16-1-26.
 */
"use strict";

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '('+this.x+','+this.y+')';
  }
  toValue() {
    return this.x + this.y;
  }
}

var p0 = new Point(1,2);
console.log(p0);
console.log(p0.constructor===Point.prototype.constructor);   //true
console.log(Point === Point.prototype.constructor)       // true
console.log(p0.constructor===Point);                        //true
console.log(p0.prototype);                        //undefined
console.log(Point.prototype.toString)             //[Function]
console.log(Point.prototype.toValue)              //[Function]

console.log("--------------------------------------------------------");
Object.assign(Point.prototype, {
  moveUp(){
    this.y = this.y+1;
    return this;
  },
  moveDown(){
    this.y = this.y-1;
    return this;
  }
});

console.log(Point.prototype.moveUp);             //[Function]
console.log(Point.prototype.moveDown);             //[Function]

console.log(Object.keys(Point.prototype));        //['moveUp','moveDown']
console.log(Object.getOwnPropertyNames(Point.prototype));        //['constructor', 'toString', 'toValue', 'moveUp', 'moveDown']

Point.prototype.moveLeft = function(){
  this.x = this.x - 1;
};
Point.prototype.moveRight = function(){
  this.x = this.x + 1;
};

console.log(Object.keys(Point.prototype));         //['moveUp','moveDown', 'moveLeft', 'moveRight' ]
console.log("--------------------------------------------------------");
console.log(p0.hasOwnProperty('x')); // true
console.log(p0.hasOwnProperty('y')); // true
console.log(p0.hasOwnProperty('toString')); // false
console.log(p0.__proto__.hasOwnProperty('toString')); // true

console.log("--------------------------------------------------------");
var p1 = new Point(2,3);
var p2 = new Point(3,2);

console.log(p1.__proto__ === p2.__proto__)    //true

p1.__proto__.printName = function () { return 'Oops' };

console.log(p1.printName()); // "Oops"
console.log(p2.printName()); // "Oops"

var p3 = new Point(4,2);
console.log(p3.printName()); // "Oops"