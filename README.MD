# 练习笔记
##Array
### Array.form()

`Array.form`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。
```javascript
    'use strict';
    let arrayLike  = {
      '1':'a',
      '2':'b',
      '4':'c',
      'length':3
    };
    let arr2 = Array.from(arrayLike); //arr2的结果为undefined,'a','b'
```
在类数组对象中，length属性控制着数组的长度，key的值则是其在数组中的位置。
```javascript
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
console.log(Array.from(it));     //['a','b','cd']
console.log(Array.from(tasks));  //['a','b','cd']
```
使用Array.from将可遍历（iterable）的对象转换为数组。
```javascript
    var arr3 = Array.from(arrayLike,function mapper(value,index){
      if(typeof value === "string"){
        return value.toUpperCase();
      }else{
        return value;
      }
    });
    console.log(arr3);
```
Array.from还可以将每个元素进行处理。

###Array.of()
这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
```javascript
    var a = Array(3);
    console.log(a);    //[,,]
    var a1 = Array(3,4);
    console.log(a1);   //[3,4]
    
    var b = Array.of(3);
    console.log(b);    //[3]
    var b1 = Array.of(3,4);
    console.log(b1);    //[3,4]

    class MyCoolArray extends Array {
      sum() {
        return this.reduce( function reducer(acc,curr){
          return acc + curr;
        }, 0 );
      }
    }
    var x = new MyCoolArray( 3 );
    x.length;                       // 3 -- oops!
    console.log(x.sum());             // 0
    var z = MyCoolArray.of( 3 );
    z.length;                       // 1
    console.log(z.sum());             // 3
```

###copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
它接受三个参数。

*target（必需）：从该位置开始替换数据。
*start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
*end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

###find()和findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

```javascript
    var a = [1,2,3,4,5];

    (a.indexOf( 3 ) != -1);             // true
    (a.indexOf( 7 ) != -1);             // false
    
    (a.indexOf( "2" ) != -1);           // false
    
    [NaN].indexOf(NaN)
    // -1
    
    [NaN].findIndex(y => Object.is(NaN, y))
```
*indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

###数组实例的entries()，keys()和values()
ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象


