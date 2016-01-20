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
                    return {value:undefined,done:true}; //�����������false����ô��for...of�н�������ѭ��
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
console.log(it.length);           //undefined
console.log(tasks.length);           //undefined
console.log(Array.from(it));
console.log(Array.from(tasks));   //使用arrary将迭代内容转换为数组。//使用arrary将可遍历（iterable）的对象转换为数组。
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
for(var i of tasks){
    console.log(i);
}
