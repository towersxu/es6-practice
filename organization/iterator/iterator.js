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
        var idx = 0;
        return {
            [Symbol.iterator](){ return this;},
            next(){
                var current = steps[idx];
                if(current){
                    idx++;
                    return {value:current,done:false};
                }else{
                    return {value:undefined,done:true}; //如果这里变成了false，那么在for...of中将出现死循环
                }
            },
            return(v) {
                return {value:undefined,done:true};
            }
        }
    },
    actions:['a','b','cd']
};
var it = tasks[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
for(var i of tasks){
    console.log(i);
}