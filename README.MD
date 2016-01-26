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
                    return {value:undefined,done:true}; 
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
    console.log(arr3);    //[undefined,'A,'B']
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

- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

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

##let和block-scoped
ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```javascript
    for(let i = 0; i < arr.length; i++){}
    
    console.log(i)//ReferenceError: i is not defined
```
for循环的计数器，就很合适使用let命令。

```javascript
    var a = [];
    for (let i = 0; i < 10; i++) {
      a[i] = function () {
        console.log(i);
      };
    }
    a[6](); // 6
```
上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。

```javascript
    var tmp = 123;
    
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }
```
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
    // 报错
    function () {
      let a = 10;
      var a = 1;
    }
```
let不允许在相同作用域内，重复声明同一个变量。

```javascript
    // IIFE写法
    (function () {
      var tmp = ...;
      ...
    }());
    
    // 块级作用域写法
    {
      let tmp = ...;
      ...
    }
```
块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。

```javascript
    function f() { console.log('I am outside!'); }
    (function () {
      if(false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
      }
    
      f();
    }());
```
上面代码在ES5中运行，会得到“I am inside!”，但是在ES6中运行，会得到“I am outside!”。这是因为ES5存在函数提升，不管会不会进入 if代码块，函数声明都会提升到当前作用域的顶部，得到执行；而ES6支持块级作用域，不管会不会进入if代码块，其内部声明的函数皆不会影响到作用域的外部。
严格模式下，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。

```javascript
    var x = 1;
    
    function f(x, y = x) {
      console.log(y);
    }
    
    f(2) // 2
```
一个需要注意的地方是，如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即先是当前函数的作用域，然后才是全局作用域。
上面代码中，参数y的默认值等于x。调用时，由于函数作用域内部的变量x已经生成，所以y等于参数x，而不是全局变量x。

```javascript
    let x = 1;
    
    function f(y = x) {
      let x = 2;
      console.log(y);
    }
    
    f() // 1
```
如果调用时，函数作用域内部的变量x没有生成，结果就会不一样。上面代码中，函数调用时，y的默认值变量x尚未在函数内部生成，所以x指向全局变量，结果又不一样。
如果此时，全局变量x不存在，就会报错。

```javascript
    function throwIfMissing() {
      throw new Error('Missing parameter');
    }
    
    function foo(mustBeProvided = throwIfMissing()) {
      return mustBeProvided;
    }
    
    foo()
    // Error: Missing parameter
```
利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（即函数名之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行（即如果参数已经赋值，默认值中的函数就不会运行），这与python语言不一样。

另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。
```javascript
    function foo(optional = undefined) { ··· }
```

###rest参数和扩展运算符（spread）
ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
```javascript
    function add(...values) {
      let sum = 0;
    
      for (var val of values) {
        sum += val;
      }
    
      return sum;
    }
    
    add(2, 5, 3) // 10
```
上面代码的add函数是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数。
注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

函数的length属性，不包括rest参数。
```javascript
    (function(a) {}).length  // 1
    (function(...a) {}).length  // 0
    (function(a, ...b) {}).length  // 1
```

扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
    console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5
```

由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
```javascript
    // ES5的写法
    function f(x, y, z) {
      // ...
    }
    var args = [0, 1, 2];
    f.apply(null, args);
    
    // ES6的写法
    function f(x, y, z) {
      // ...
    }
    var args = [0, 1, 2];
    f(...args);
```
##iterator,generator
```javascript
    function* g() {}

    g.prototype.hello = function () {
      return 'hi!';
    };

    let obj = g();

    obj instanceof g // true
    obj.hello() // 'hi!'
```
Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。
上面代码表明，Generator函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
另外，generator必须在使用next执行完成所有的yield之后才会调用

```javascript
function *F(){
  this.a = 'a';
  this.b = 'b';
}
var f = new F();
console.log(f.a);   //undefined;
```

//上面代码中，函数F是一个构造函数，又是一个Generator函数。这时，使用new命令就无法生成F的实例了，因为F返回的是一个内部指针。
```javascript
function *Fn(){
  this.z = 'z';
  yield this.x = 'x';
  yield this.y = 'y';
}
var obj = {};
var f = Fn.bind(obj)();
console.log(obj);
f.next();
console.log(obj);
f.next();
console.log(obj);
f.next();
console.log(obj);
```
//如果要把Generator函数当作正常的构造函数使用，可以采用上面的变通方法。首先，生成一个空对象，使用bind方法绑定Generator函数内部的this。这样，构造函数调用以后，这个空对象就是Generator函数的实例对象了。

js默认iterators通常不会有返回值，因为会被"iterator loop"覆盖掉。但是如果是自定义的`iterator`或者`generator`，可以通过定义返回值，则可以被yield捕获到。
```javascript
    /*generator/p4.js*/
    function *foo() {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }
    
    function *bar() {
      var x = yield *foo();
      console.log( "x:", x );
    }
    
    for (var v of bar()) {
      console.log( v );
    }
```


注意，yield语句是同步运行，不是异步运行（否则就失去了取代回调函数的设计目的了）。实际操作中，一般让yield语句返回Promise对象。

```javascript
var Q = require('q');

function delay(milliseconds) {
  var deferred = Q.defer();
  setTimeout(deferred.resolve, milliseconds);
  return deferred.promise;
}

function* f(){
  yield delay(100);
};
```

多个任务按顺序一个接一个执行时，yield语句可以按顺序排列。多个任务需要并列执行时（比如只有A任务和B任务都执行完，才能执行C任务），可以采用数组的写法。
```javascript
function* parallelDownloads() {
  let [text1,text2] = yield [
    taskA(),
    taskB()
  ];
  console.log(text1, text2);
}

```
上面代码中，yield语句的参数是一个数组，成员就是两个任务taskA和taskB，只有等这两个任务都完成了，才会接着执行下面的语句。

```javascript
    var it = foo();
    console.log(it.next());              // { value: 1, done: false }
    try {
      it.throw( "Oops!" );
    }
    catch (err) {
      console.log( err ); // Exception: Oops!
    }
    console.log(it.next());                // { value: undefined, done: true }
```
退出generator

##module
- module是基于文件的，一个文件一个module。
- 关键字import和export都必须在顶层作用域
- ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件lib.js的例子。
```javascript
    // module/lib.js
    var counter = 3;
    function incCounter() {
      counter++;
    }
    module.exports = {
      get counter() {
        return counter;
      },
      incCounter: incCounter,
    };
    
    //module/main.js
    var incCounter = require('./lib').incCounter;
    
    incCounter();
    var counter = require('./lib').counter;
    console.log(counter);  // 4
    incCounter();
    console.log(counter); // 4
```

--ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的”符号连接“，原始值变了，输入值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
```javascript
    // module/lib1.js
    export let counter = 3;
    export function incCounter() {
      counter++;
    }
    
    // module/main1.js
    import { counter, incCounter } from './lib';
    console.log(counter); // 3
    incCounter();
    console.log(counter); // 4
```

###CommonJS模块的加载原理

CommonJS的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。该对象的id属性是模块名，exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。
以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
由于CommonJS模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。
```javascript
    var a = require('a'); // 安全的写法
    var foo = require('a').foo; // 危险的写法
    
    exports.good = function (arg) {
      return a.foo('good', arg); // 使用的是 a.foo 的最新值
    };
    
    exports.bad = function (arg) {
      return foo('bad', arg); // 使用的是一个部分加载时的值
    };
```
上面代码中，如果发生循环加载，require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。


###ES6模块的循环加载
ES6处理“循环加载”与CommonJS有本质的不同。ES6模块是动态引用，遇到模块加载命令import时，不会去执行模块，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

```javascript
    // a.js
    import {bar} from './b.js';
    export function foo() {
      bar();
      console.log('执行完毕');
    }
    foo();
    
    // b.js
    import {foo} from './a.js';
    export function bar() {
      if (Math.random() > 0.5) {
        foo();
      }
    }
```
按照CommonJS规范，上面的代码是没法执行的。a先加载b，然后b又加载a，这时a还没有任何执行结果，所以输出结果为null，即对于b.js来说，变量foo的值等于null，后面的foo()就会报错。
a.js之所以能够执行，原因就在于ES6加载的变量，都是动态引用其所在的模块。只要引用是存在的，代码就能执行。
###部署iterator接口
利用Generator函数，可以在任意对象上部署iterator接口。

###作为数据结构
Generator可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。


##class
ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
```javascript
    /*class/c1.js*/
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
    console.log(Point === Point.prototype.constructor)          // true
    console.log(p0.constructor===Point);                        //true
    console.log(p0.prototype);                        //undefined
    console.log(Point.prototype.toString)             //[Function]
    console.log(Point.prototype.toValue)              //[Function]
```
类的数据类型就是函数，类本身就指向构造函数;构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。在类的实例上面调用方法，其实就是调用原型上的方法。

```javascript
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
    
    console.log(Point.prototype.moveUp)             //[Function]
    console.log(Point.prototype.moveDown)             //[Function]
    
    console.log(Object.keys(Point.prototype));        //['moveUp','moveDown']
```
由于类的方法（除constructor以外）都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
类的内部所有定义的方法，都是不可枚举的（enumerable）。使用assign添加的方法则是可枚举的。

```javascript

    Point.prototype.moveLeft = function(){
      this.x = this.x - 1;
    };
    Point.prototype.moveRight = function(){
      this.x = this.x + 1;
    };
    
    console.log(Object.keys(Point.prototype));         //['moveUp','moveDown', 'moveLeft', 'moveRight' ]
```
采用ES5的写法,在原型上添加方法，该方法则是可枚举的。

- `constructor`方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
- constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。结果导致实例对象不是这个类的实例

```javascript
    console.log(p0.hasOwnProperty('x')); // true
    console.log(p0.hasOwnProperty('y')); // true
    console.log(p0.hasOwnProperty('toString')); // false
    console.log(p0.__proto__.hasOwnProperty('toString')); // true
```
- 与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。上面代码中，p0（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与ES5的行为保持一致。
```javascript
    var p1 = new Point(2,3);
    var p2 = new Point(3,2);
    
    console.log(p1.__proto__ === p2.__proto__)    //true
    
    p1.__proto__.printName = function () { return 'Oops' };
    
    console.log(p1.printName()) // "Oops"
    console.log(p2.printName()) // "Oops"
    
    var p3 = new Point(4,2);
    console.log(p3.printName()) // "Oops"
```

- 与ES5一样，类的所有实例共享一个原型对象。这也意味着，可以通过实例的__proto__属性为Class添加方法。
##object

###object.is()
ES5比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
```javascript
    var x =NaN,
      y=0;
      z=-0;
    console.log(x === NaN);          //false
    console.log(y === z);             //true
    console.log(Object.is(x,NaN));    //true
    console.log(Object.is(x,y));      //false
```
一般清空下还是应该用`===`进行值的比较，只有在遇到-0或者NaN等值比较是才使用Object.is()

###Object.getOwnPropertySymbols()
