/**
 * Created by towersxu on 2015/11/9.
 */
function *foo(x){
    if(x < 3){
        x = yield *foo(x+1);
    }
    return x * 2;
}
var it =foo(1);
//var it = foo[Symbol.iterator]()
console.log(it.next());
console.log(it.next());
console.log('------------------------');
function *foo1(){
    try{
        var x = yield 1;
        var y = yield 2;
        var z = yield 3;
    }
    finally {
        console.log("cleanup!");
    }
    console.log(x,y,z)
}
var it1 = foo1();
console.log(it1.next()); //start up the generator
console.log(it1.next("bar")); //answer first question
console.log(it1.next("baz")); //answer second question
console.log(it1.next("foo")); //answer third question
console.log('----------------------------');
function *foo2(){
    try{
        console.log('will yield 1');
        yield 1;
    }catch (e){
        console.log('catch a error from foo2');
        console.log(e);
    }
    yield 2;
    throw "foo:e2"; //这个异常抛出会被bar捕获。
}
function *bar(){
    try{
        yield *foo2();
        console.log("never gets here");
    }catch(e){
        console.log('catch a error from bar');
        console.log(e)
    }
}
var it2 = bar();
try {
    it2.next();
    it2.throw("e1");
    it2.next();
}catch (err){
    console.log("never gets here1")
}
it.next();
console.log('----------------------------');
