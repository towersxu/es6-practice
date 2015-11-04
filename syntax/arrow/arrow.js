/**
 * Created by towersxu on 2015/11/3.
 */
var foo = (x,y) =>x+y;
var z = foo(1,2);
console.log(z);
var f = (x,y) =>{
  //console.log(arguments[0]);
  //console.log(arguments[1]);
    var z = x*2+y;
    y++;
    x *=3;
    return x+y+z;
};
console.log(f(2,4));

var a=[1,2,3,4,5];
a = a.map(v=>v*2);
console.log(a);
console.log('---------------------------');
var people = {
    name:'people',
    say:function(){
        this.message();
    },
    message:function(){
        console.log(this.name);
    }
};
people.say();
var people1 = {
    name:'people1',
    say:()=>{
        console.log(this);
        this.message();  //这里的this并不是指向people1的，而是指向全局对象的。
    },
    message:()=>{
        console.log(this);
    }
};
function message(){
    console.log('this is object');
}
people1.say();