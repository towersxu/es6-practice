/**
 * Created by towersxu on 2015/11/3.
 */

"use strict";
{
    var txt = `
     床前明月光，
     疑是地上霜。
     举头望明月，
     低头思故乡。`;
    console.log(txt);
    var name = "Bob", time = "today";
    console.log(`Hello ${name}, how are you ${time}?`);
    console.log("Hello ${name}, how are you ${time}?");
}
console.log("----------------------------------------");
{
    let name = "xutao";
    let txt = `A text ${upper("warm")} welcome
    to all of you ${upper(name)}`;   //注意：这种用法尽量不要多用和在深层嵌套中用到
    console.log(txt);

}
console.log("----------------------------------------");
{

    bar();
}
function upper(s){
    return s.toUpperCase();
}
function foo(str){
    var name = "foo";
    console.log(str);
}
function bar(){
    var name ="bar";
    foo(`Hello from ${name}`);  //Hello from bar;说明模板字符串中的变量作用域范围在它出现的地方。
}
console.log("----------------------------------------");
