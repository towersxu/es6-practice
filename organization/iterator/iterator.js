/**
 * Created by towersxu on 2015/11/3.
 */
var Fib = {
    [Symbol.iterator](){
        var n1=1,n2=1;
        return {
            [Symbol.iterator](){
                return this;
            },
            next(){
                var current = n2;
                n2 = n1;
                n1 = n1+current;
                return {value:current,done:false};
            },
            return(v) {
                console.log("Fibonacci sequence abandoned!");
                return {value:v,done:true};
            }
        }
    }
};
for (var v of Fib){
    console.log(v);
    if(v>50) break;
}
console.log('-------------------------------');
var tasks = {
    [Symbol.iterator](){
        var steps = this.actions.slice();
        return {
            [Symbol.iterator](){ return this;},
            next(){
                
            }
        }
    },
    actions:[]
};