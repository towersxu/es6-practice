/**
 * Created by taox on 16-1-29.
 */
"use strict";

class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  toString(){
    console.log("(1)")
  }
  goUp(){
    console.log("(2)")
  }

  commit() {
    //this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();
//x.goUp();
x.push(1);
x.push(2);
console.log(x.toString());
console.log(x.history) // [[]]
//x.commit();
x.push(3);
console.log(x.history) // [[]]
//x.commit();

//x.revert();
console.log(x) // [[]]
//x.commit();