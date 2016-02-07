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

- ES5是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
- ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。

###Class的Generator方法
如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。
```javascript
    class Foo {
      constructor(...args) {
        this.args = args;
      }
      * [Symbol.iterator]() {
        for (let arg of this.args) {
          yield arg;
        }
      }
    }
    
    for (let x of new Foo('hello', 'world')) {
      console.log(x);
    }
    // hello
    // world
```

###Class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```javascript
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    
    Foo.classMethod() // 'hello'
    
    var foo = new Foo();
    foo.classMethod()
    // TypeError: undefined is not a function
```
父类的静态方法，可以被子类继承。

```javascript
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    
    class Bar extends Foo {
    }
    
    Bar.classMethod(); // 'hello'
```

静态方法也是可以从super对象上调用的。

```javascript
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    
    class Bar extends Foo {
      static classMethod() {
        return super.classMethod() + ', too';
      }
    }
    
    Bar.classMethod();
```

ES6明确规定，Class内部只有静态方法，没有静态属性。

```javascript
    / 以下两种写法都无效，
    // 但不会报错
    class Foo {
      // 写法一
      prop: 2
    
      // 写法二
      static prop: 2
    }
    
    Foo.prop // undefined
```

###new.target属性
new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```javascript
    function Person(name) {
      if (new.target !== undefined) {
        this.name = name;
      } else {
        throw new Error('必须使用new生成实例');
      }
    }
    
    // 另一种写法
    function Person(name) {
      if (new.target === Person) {
        this.name = name;
      } else {
        throw new Error('必须使用new生成实例');
      }
    }
    
    var person = new Person('张三'); // 正确
    var notAPerson = Person.call(person, '张三');  // 报错
```

需要注意的是，子类继承父类时，new.target会返回子类。
```javascript
   class Rectangle {
     constructor(length, width) {
       console.log(new.target === Rectangle);
       // ...
     }
   }
   
   class Square extends Rectangle {
     constructor(length) {
       super(length, length);
     }
   }
   
   var obj = new Square(3); // 输出 false
```
利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```javascript
    class Shape {
      constructor() {
        if (new.target === Shape) {
          throw new Error('本类不能实例化');
        }
      }
    }
    
    class Rectangle extends Shape {
      constructor(length, width) {
        super();
        // ...
      }
    }
    
    var x = new Shape();  // 报错
    var y = new Rectangle(3, 4);  // 正确
```

注意，在函数外部，使用new.target会报错。

###Mixin模式的实现

Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。
```javascript
    function mix(...mixins) {
      class Mix {}
    
      for (let mixin of mixins) {
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
      }
    
      return Mix;
    }
    
    function copyProperties(target, source) {
      for (let key of Reflect.ownKeys(source)) {
        if ( key !== "constructor"
          && key !== "prototype"
          && key !== "name"
        ) {
          let desc = Object.getOwnPropertyDescriptor(source, key);
          Object.defineProperty(target, key, desc);
        }
      }
    }
    
    class DistributedEdit extends mix(Loggable, Serializable) {
      // ...
    }
```
上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

##promise
- Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。
- 如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。
- ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
```javascript
    var promise = new Promise(function(resolve, reject) {
      // ... some code

      if (/* 异步操作成功 */){
        resolve(value);
      } else {
        reject(error);
      }
    });

    promise.then(function(value) {
      // success
    }, function(value) {
      // failure
    });

```
- 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作.
```javascript
    var p1 = new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('fail')), 3000)
    })
    var p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve(p1), 1000)
    })
    p2.then(result => console.log(result))
    p2.catch(error => console.log(error))
    // Error: fail
```
p1是一个Promise，3秒之后变为rejected。p2的状态由p1决定，1秒之后，p2调用resolve方法，但是此时p1的状态还没有改变，因此p2的状态也不会变。又过了2秒，p1变为rejected，p2也跟着变为rejected。

- Promise.prototype.catch
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

- Promise.all()
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
```javascript
var p = Promise.all([p1, p2, p3]);
```
上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）

- Promise.race()
Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
```javascirpt
    Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

- Promise.resolve()
有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

- Promise.reject()
Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。它的参数用法与Promise.resolve方法完全一致。

- done()
Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
```javascript
    Promise.prototype.done = function (onFulfilled, onRejected) {
      this.then(onFulfilled, onRejected)
        .catch(function (reason) {
          // 抛出一个全局错误
          setTimeout(() => { throw reason }, 0);
        });
    };
```
- finally()
finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
```javascript
    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    };
```

-Generator函数与Promise的结合
使用Generator函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

```javascript
    function getFoo () {
      return new Promise(function (resolve, reject){
        resolve('foo');
      });
    }

    var g = function* () {
      try {
        var foo = yield getFoo();
        console.log(foo);
      } catch (e) {
        console.log(e);
      }
    };

    function run (generator) {
      var it = generator();

      function go(result) {
        if (result.done) return result.value;

        return result.value.then(function (value) {
          return go(it.next(value));
        }, function (error) {
          return go(it.throw(error));
        });
      }

      go(it.next());
    }

    run(g);
```

##arraybuffer
二进制数组（ArrayBuffer对象、TypedArray视图和DataView视图）是JavaScript操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011年2月发布），ES6将它们纳入了ECMAScript规格，并且增加了新的方法。
这个接口的原始设计目的，与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个32位整数，两端的JavaScript脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像C语言那样，直接操作字节，将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。
二进制数组就是在这种背景下诞生的。它很像C语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了JavaScript处理二进制数据的能力，使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。
ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。也就是说给同一个ArrayBuffer，使用不同的视图赋值，相互之间会影响。
```javascript
    var buf = new ArrayBuffer(4);
    var x1 = new Int32Array(buf);   //buf 4*8
    x1[0]=10;
    console.log(x1[0]);      //10
    var x2 = new Int16Array(buf);
    x2[0] = 11;
    console.log(x2[0]);      //11
    console.log(x1[0]);      //11
```


###ArrayBuffer对象
代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

###TypedArray视图
共包括9种类型的视图
- Int8Array：8位有符号整数，长度1个字节。
- Uint8Array：8位无符号整数，长度1个字节。
- Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
- Int16Array：16位有符号整数，长度2个字节。
- Uint16Array：16位无符号整数，长度2个字节。
- Int32Array：32位有符号整数，长度4个字节。
- Uint32Array：32位无符号整数，长度4个字节。
- Float32Array：32位浮点数，长度4个字节。
- Float64Array：64位浮点数，长度8个字节。

它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。
TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。
普通数组的操作方法和属性，对TypedArray数组完全适用。

###DataView视图
可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。

ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。
二进制数组并不是真正的数组，而是类似数组的对象。

很多浏览器操作的API，用到了二进制数组操作二进制数据，下面是其中的几个。

- File API
- XMLHttpRequest
- Fetch API
- Canvas
- WebSockets

```javascript 
    var buf = new ArrayBuffer(64);
    console.log(buf);
    console.log(buf.byteLength);
    //var buf = new ArrayBuffer(32);
    var dataView = new DataView(buf);
    console.log(dataView.getUint8(0)); // 0
```
为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。

```javascript
    var x1 = new Int32Array(buf);   //buf 4*8
    x1[0] = 0xffffffff;
    console.log(x1[0]); // -1
    console.log(x1.length);    //1
    x1[0] = 0xfffffff;
    console.log(x1[0]); // 2^28-1
    console.log(x1.length);    //1
    var x2 = new Float32Array(buf);
    x2[0]  = 0xffffffff;
    console.log(x2[0]); // 2^32
    console.log(x2.length);      //1
    var x3 = new Uint32Array(buf);
    x3[0]  = 0xffffffff;
    console.log(x3.length);     //1
    console.log(x3[0]); // 2^32-1
    var x4 = new Int8Array(buf);
    console.log(x4.length);   //4    32/8
```
可以看出，对同一段内存赋相同的值，不同的视图取出来的值不一样。

###ArrayBuffer.prototype.byteLength
ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。
如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。
```javascript
    if (buffer.byteLength === n) {
      // 成功
    } else {
      // 失败
    }
```

###ArrayBuffer.prototype.slice()
```javascript
    var buffer = new ArrayBuffer(8);
    var newBuffer = buffer.slice(0, 3);
```
上面代码拷贝buffer对象的前3个字节（从0开始，到第3个字节前面结束），生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。

###ArrayBuffer.isView()
ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。
```javascript
    var buffer = new ArrayBuffer(8);
    ArrayBuffer.isView(buffer) // false
    
    var v = new Int32Array(buffer);
    ArrayBuffer.isView(v) // true
```

###字节序
字节序指的是数值在内存中的表示方式。
```javascript
    var buffer = new ArrayBuffer(16);
    var int32View = new Int32Array(buffer);
    
    for (var i = 0; i < int32View.length; i++) {
      int32View[i] = i * 2;
    }
```
上面代码生成一个16字节的ArrayBuffer对象，然后在它的基础上，建立了一个32位整数的视图。由于每个32位整数占据4个字节，所以一共可以写入4个整数，依次为0，2，4，6。
如果在这段数据上接着建立一个16位整数的视图，则可以读出完全不一样的结果。
```javascript
    var int16View = new Int16Array(buffer);
    
    for (var i = 0; i < int16View.length; i++) {
      console.log("Entry " + i + ": " + int16View[i]);
    }
    // Entry 0: 0
    // Entry 1: 0
    // Entry 2: 2
    // Entry 3: 0
    // Entry 4: 4
    // Entry 5: 0
    // Entry 6: 6
    // Entry 7: 0

```
可以看到16位字节返回的是8个整数：0，0，2，0，4，0，6，0
但是如果操是大端字节序，那么上面16为字节返回的8个整数则为：0，0，0，2，0，4，0，6
目前，所有个人电脑几乎都是小端字节序，所以TypedArray数组内部也采用小端字节序读写数据，或者更准确的说，按照本机操作系统设定的字节序读写数据。
这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray数组将无法正确解析，因为它只能处理小端字节序！为了解决这个问题，JavaScript引入DataView对象，可以设定字节序。

```javascript
const BIG_ENDIAN = Symbol('BIG_ENDIAN');
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

function getPlatformEndianness() {
  let arr32 = Uint32Array.of(0x12345678);
  let arr8 = new Uint8Array(arr32.buffer);
  switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
    case 0x12345678:
      return BIG_ENDIAN;
    case 0x78563412:
      return LITTLE_ENDIAN;
    default:
      throw new Error('Unknown endianness');
  }
}
```

###BYTES_PER_ELEMENT
每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数。
```javascript
Int8Array.BYTES_PER_ELEMENT // 1
Uint8Array.BYTES_PER_ELEMENT // 1
Int16Array.BYTES_PER_ELEMENT // 2
Uint16Array.BYTES_PER_ELEMENT // 2
Int32Array.BYTES_PER_ELEMENT // 4
Uint32Array.BYTES_PER_ELEMENT // 4
Float32Array.BYTES_PER_ELEMENT // 4
Float64Array.BYTES_PER_ELEMENT // 8
```

###ArrayBuffer与字符串的互相转换
ArrayBuffer转为字符串，或者字符串转为ArrayBuffer，有一个前提，即字符串的编码方法是确定的。假定字符串采用UTF-16编码（JavaScript的内部编码方式），可以自己编写转换函数。
```javascript
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    function ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    
    // 字符串转为ArrayBuffer对象，参数为字符串
    function str2ab(str) {
      var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
      var bufView = new Uint16Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
```

###溢出
TypedArray数组对于溢出，采用的处理方法是求余值。正向溢出（overflow）的含义是输入值大于当前数据类型的最大值，最后得到的值就等于当前数据类型的最小值加上余值，再减去1；负向溢出（underflow）等于当前数据类型的最大值减去余值，再加上1。
```javascript
var uint8 = new Uint8Array(1);

uint8[0] = 0xff+0x01;
console.log(uint8[0]); // 0

uint8[0] = 0x00-0x01;
console.log(uint8[0]); // 255
```
8位无符号整数的数值范围是0到255，超出这个范围，就是溢出。256相当于正向溢出1，即余值为1，最后的值等于0（0 + 1 -1）；-1相当于负向溢出1，余值也为1，最后的值等于255（255 - 1 + 1）。
Uint8ClampedArray视图的溢出，与上面的规则有所不同。负向溢出都等于0，正向溢出都等于255。
```javascript
var uint8c = new Uint8ClampedArray(1);

uint8c[0] = 256;
console.log(uint8c[0]); // 255

uint8c[0] = -1;
console.log(uint8c[0]); // 0
```

###TypedArray.prototype.buffer
TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性。
```javascript
    var a = new Float32Array(64);
    var b = new Uint8Array(a.buffer);
```

###TypedArray.prototype.byteLength，TypedArray.prototype.byteOffset
byteLength属性返回TypedArray数组占据的内存长度，单位为字节。byteOffset属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始。这两个属性都是只读属性。
```javascript
    var b = new ArrayBuffer(8);
    
    var v1 = new Int32Array(b);
    var v2 = new Uint8Array(b, 2);
    var v3 = new Int16Array(b, 2, 2);
    
    v1.byteLength // 8
    v2.byteLength // 6
    v3.byteLength // 4
    
    v1.byteOffset // 0
    v2.byteOffset // 2
    v3.byteOffset // 2
```

###TypedArray.prototype.length
length属性表示TypedArray数组含有多少个成员。注意将byteLength属性和length属性区分，前者是字节长度，后者是成员长度。
```javascript
    var a = new Int16Array(8);
    
    a.length // 8
    a.byteLength // 16
```

###TypedArray.prototype.set()
TypedArray数组的set方法用于复制数组（普通数组或TypedArray数组），也就是将一段内容完全复制到另一段内存。
```javascript
    var a = new Uint8Array(8);
    var b = new Uint8Array(8);
    
    b.set(a);
```
上面代码复制a数组的内容到b数组，它是整段内存的复制，比一个个拷贝成员的那种复制快得多。
set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象。
```javascript
    var a = new Uint16Array(8);
    var b = new Uint16Array(10);
    
    b.set(a, 2)
```
上面代码的b数组比a数组多两个成员，所以从b[2]开始复制。

###TypedArray.prototype.subarray()
subarray方法是对于TypedArray数组的一部分，再建立一个新的视图。
```javascript
    var a = new Uint16Array(8);
    var b = a.subarray(2,3);
    
    a.byteLength // 16
    b.byteLength // 2
```

###TypedArray.prototype.slice()
TypeArray实例的slice方法，可以返回一个指定位置的新的TypedArray实例。
```javascript
    let ui8 = Uint8Array.of(0, 1, 2);
    ui8.slice(-1)
    // Uint8Array [ 2 ]
```
###TypedArray.of()
TypedArray数组的所有构造函数，都有一个静态方法of，用于将参数转为一个TypedArray实例。
下面三种方法都会生成同样一个TypedArray数组。
```javascript
    // 方法一
    let tarr = new Uint8Array([1,2,3]);
    
    // 方法二
    let tarr = Uint8Array.of(1,2,3);
    
    // 方法三
    let tarr = new Uint8Array(3);
    tarr[0] = 0;
    tarr[1] = 1;
    tarr[2] = 2;
```

###TypedArray.from()
静态方法from接受一个可遍历的数据结构（比如数组）作为参数，返回一个基于这个结构的TypedArray实例。
这个方法还可以将一种TypedArray实例，转为另一种。
```javascript
    var ui16 = Uint16Array.from(Uint8Array.of(0, 1, 2));
    ui16 instanceof Uint16Array // true
```
from方法还可以接受一个函数，作为第二个参数，用来对每个元素进行遍历，功能类似map方法。
```javascript
    Int8Array.of(127, 126, 125).map(x => 2 * x)
    // Int8Array [ -2, -4, -6 ]
    
    Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x)
    // Int16Array [ 254, 252, 250 ]
```
上面的例子中，from方法没有发生溢出，这说明遍历是针对新生成的16位整数数组，而不是针对原来的8位整数数组。也就是说，from会将第一个参数指定的TypedArray数组，拷贝到另一段内存之中（占用内存从3字节变为6字节），然后再进行处理。

###复合视图
由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”。
```javascript
    var buffer = new ArrayBuffer(24);
    
    var idView = new Uint32Array(buffer, 0, 1);
    var usernameView = new Uint8Array(buffer, 4, 16);
    var amountDueView = new Float32Array(buffer, 20, 1);
```
上面代码将一个24字节长度的ArrayBuffer对象，分成三个部分：
- 字节0到字节3：1个32位无符号整数
- 字节4到字节19：16个8位整数
- 字节20到字节23：1个32位浮点数

这种数据结构可以用如下的C语言描述：
```c
    struct someStruct {
      unsigned long id;
      char username[16];
      float amountDue;
    };
```

###DataView视图
如果一段数据包括多种类型（比如服务器传来的HTTP数据），这时除了建立ArrayBuffer对象的复合视图以外，还可以通过DataView视图进行操作。
DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。
DataView视图本身也是构造函数，接受一个ArrayBuffer对象作为参数，生成视图。
```javascript
    DataView(ArrayBuffer buffer [, 字节起始位置 [, 长度]]);
    
    var buffer = new ArrayBuffer(24);
    var dv = new DataView(buffer);
    var v1 = dv.getUint8(0);
   
    // 小端字节序
    var v1 = dv.getUint16(1, true);
    
    // 大端字节序
    var v2 = dv.getUint16(3, false);
    
    // 大端字节序
    var v3 = dv.getUint16(3);
    
    // 在第1个字节，以大端字节序写入值为25的32位整数
    dv.setInt32(0, 25, false);
    
    // 在第5个字节，以大端字节序写入值为25的32位整数
    dv.setInt32(4, 25);
    
    // 在第9个字节，以小端字节序写入值为2.5的32位浮点数
    dv.setFloat32(8, 2.5, true);
```
DataView实例提供8个方法读取内存。
- getInt8：读取1个字节，返回一个8位整数。
- getUint8：读取1个字节，返回一个无符号的8位整数。
- getInt16：读取2个字节，返回一个16位整数。
- getUint16：读取2个字节，返回一个无符号的16位整数。
- getInt32：读取4个字节，返回一个32位整数。
- getUint32：读取4个字节，返回一个无符号的32位整数。
- getFloat32：读取4个字节，返回一个32位浮点数。
- getFloat64：读取8个字节，返回一个64位浮点数。
这一系列get方法的参数都是一个字节序号（不能是负数，否则会报错），表示从哪个字节开始读取。
如果一次读取两个或两个以上字节，就必须明确数据的存储方式，到底是小端字节序还是大端字节序。默认情况下，DataView的get方法使用大端字节序解读数据，如果需要使用小端字节序解读，必须在get方法的第二个参数指定true。

DataView视图提供8个方法写入内存。同get
这一系列set方法，接受两个参数，第一个参数是字节序号，表示从哪个字节开始写入，第二个参数为写入的数据。对于那些写入两个或两个以上字节的方法，需要指定第三个参数，false或者undefined表示使用大端字节序写入，true表示使用小端字节序写入。

如果不确定正在使用的计算机的字节序，可以采用下面的判断方式。
```javascript
var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

//如果返回true，就是小端字节序；如果返回false，就是大端字节序。
```
##二进制数组的应用
###AJAX
传统上，服务器通过AJAX操作只能返回文本数据，即responseType属性默认为text。XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；如果不知道，就设为blob。
```javascript
    var xhr = new XMLHttpRequest();
    xhr.open('GET', someUrl);
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function () {
      let arrayBuffer = xhr.response;
      // ···
    };
    
    xhr.send();
```
如果知道传回来的是32位整数，可以像下面这样处理。
```javascript
    xhr.onreadystatechange = function () {
      if (req.readyState === 4 ) {
        var arrayResponse = xhr.response;
        var dataView = new DataView(arrayResponse);
        var ints = new Uint32Array(dataView.byteLength / 4);
    
        xhrDiv.style.backgroundColor = "#00FF00";
        xhrDiv.innerText = "Array is " + ints.length + "uints long";
      }
    }
```

###Canvas
网页Canvas元素输出的二进制像素数据，就是TypedArray数组。
```javascript
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var uint8ClampedArray = imageData.data;
```
需要注意的是，上面代码的typedArray虽然是一个TypedArray数组，但是它的视图类型是一种针对Canvas元素的专有类型Uint8ClampedArray。这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的8位整数，即只能取值0～255，而且发生运算的时候自动过滤高位溢出。这为图像处理带来了巨大的方便.
Uint8ClampedArray类型确保将小于0的值设为0，将大于255的值设为255。注意，IE 10不支持该类型。

###websocket
WebSocket可以通过ArrayBuffer，发送或接收二进制数据。
```javascript
    var socket = new WebSocket('ws://127.0.0.1:8081');
    socket.binaryType = 'arraybuffer';
    
    // Wait until socket is open
    socket.addEventListener('open', function (event) {
      // Send binary data
      var typedArray = new Uint8Array(4);
      socket.send(typedArray.buffer);
    });
    
    // Receive binary data
    socket.addEventListener('message', function (event) {
      var arrayBuffer = event.data;
      // ···
    });
```

###Fetch API
Fetch API取回的数据，就是ArrayBuffer对象。
```javascript
    fetch(url)
    .then(function(request){
      return request.arrayBuffer()
    })
    .then(function(arrayBuffer){
      // ...
    });

```

###File API
如果知道一个文件的二进制数据类型，也可以将这个文件读取为ArrayBuffer对象。
```javascript
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      var arrayBuffer = reader.result;
      // ···
    };
```

##set
- ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
- Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
```javascript
    var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
    items.size // 5
```
- 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
- 两个对象总是不相等的。
```javascript
    let set = new Set();
    set.add({})
    set.size // 1
    set.add({})
    set.size // 2
```
Array.from方法可以将Set结构转为数组。
```javascript
    var items = new Set([1, 2, 3, 4, 5]);
    var array = Array.from(items);
```
这就提供了一种去除数组的重复元素的方法。
```javascript
    function dedupe(array) {
      return Array.from(new Set(array));
    }
    
    dedupe([1,1,2,3]) // [1, 2, 3]
    
    let unique = [...new Set(arr)];  //快捷去重
```
###遍历
Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
```javascript
    Set.prototype[Symbol.iterator] === Set.prototype.values
```
这意味着，可以省略values方法，直接用for...of循环遍历Set。
由于扩展运算符（...）内部使用for...of循环，所以也可以用于Set结构。
```javascript
    let set = new Set(['red', 'green', 'blue']);
    
    for (let x of set) {
      console.log(x);
    }
    // red
    // green
    // blue
    let arr = [...set];// ['red', 'green', 'blue']
```
数组的map和filter方法也可以用于Set了。
因此使用Set，可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
```javascript
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    
    // 并集
    let union = new Set([...a, ...b]);
    // [1, 2, 3, 4]
    
    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // [2, 3]
    
    // 差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    // [1]
```

###WeakSet
WeakSet结构与Set类似，也是不重复的值的集合。
- WeakSet的成员只能是对象，而不能是其他类型的值。
- WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

WeakSet结构有以下三个方法。
- WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在WeakSet实例之中。

WeakSet不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

```javascript
    const foos = new WeakSet()
    class Foo {
      constructor() {
        foos.add(this)
      }
      method () {
        if (!foos.has(this)) {
          throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！')
        }
      }
    }
```
上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用WeakSet的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。

##Map
JavaScript的对象（Object），本质上是键值对的集合（Hash结构），但是只能用字符串当作键。这给它的使用带来了很大的限制。
为了解决这个问题，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。

只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
```javascript
   var map = new Map();
   
   var k1 = ['a'];
   var k2 = ['a'];
   
   map
   .set(k1, 111)
   .set(k2, 222);
   
   map.get(k1) // 111
   map.get(k2) // 222
```
同样的值的两个实例，在Map结构中被视为两个键。

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。


##thunk
Thunk函数现在可以用于Generator函数的自动流程管理。
```javascript
    var fs = require('fs');
    var thunkify = require('thunkify');
    var readFile = thunkify(fs.readFile);
    
    var gen = function* (){
      var r1 = yield readFile('package.json');
      console.log(r1.toString());
      var r2 = yield readFile('.gitignore');
      console.log(r2.toString());
    };
    
    var g = gen();
    
    var r1 = g.next();
    r1.value(function(err, data){
      if (err) throw err;
      var r2 = g.next(data);
      r2.value(function(err, data){
        if (err) throw err;
        g.next(data);
      });
    });
```

##co模块的原理
Generator就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。
（1）回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
（2）Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。
co模块其实就是将两种自动执行器（Thunk函数和Promise对象），包装成一个模块。使用co的前提条件是，Generator函数的yield命令后面，只能是Thunk函数或Promise对象。

##基于Promise对象的自动执行
```javascript
    var fs = require('fs');
    
    var readFile = function (fileName){
      return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
          if (error) reject(error);
          resolve(data);
        });
      });
    };
    
    var gen = function* (){
      var f1 = yield readFile('/etc/fstab');
      var f2 = yield readFile('/etc/shells');
      console.log(f1.toString());
      console.log(f2.toString());
    };
    function run(gen){
      var g = gen();
    
      function next(data){
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function(data){
          next(data);
        });
      }
    
      next();
    }
    
    run(gen);
```

##装饰器
修饰器（Decorator）是一个表达式，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。
修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。
```javascript
    function testable(target) {
      target.isTestable = true;
    }
    
    @testable
    class MyTestableClass {}
    console.log(MyTestableClass.isTestable) // true
```

##解构
ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
```javascript
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
解构赋值允许指定默认值。
```javascript
    var [foo = true] = [];
    foo // true
    
    [x, y = 'b'] = ['a'] // x='a', y='b'
    [x, y = 'b'] = ['a', undefined] // x='a', y='b'
```
注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
```javascript
    var [x = 1] = [undefined];
    x // 1
    var [x = 1] = [null];
    x // null
```
如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
```javascript
    function f(){
      console.log('aaa');
    }
    
    let [x = f()] = [1];
```
ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
- （1）交换变量的值
```javascript
    [x, y] = [y, x];
```
- （2）从函数返回多个值
```javascript
    // 返回一个数组
    
    function example() {
      return [1, 2, 3];
    }
    var [a, b, c] = example();
    
    // 返回一个对象
    
    function example() {
      return {
        foo: 1,
        bar: 2
      };
    }
    var { foo, bar } = example();
```
- （3）函数参数的定义
```javascript
    // 参数是一组有次序的值
    function f([x, y, z]) { ... }
    f([1, 2, 3])
    
    // 参数是一组无次序的值
    function f({x, y, z}) { ... }
    f({z: 3, y: 2, x: 1})
```
- （4）提取JSON数据
```javascript
    var jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    }
    
    let { id, status, data: number } = jsonData;
    
    console.log(id, status, number)
    // 42, OK, [867, 5309]
```

- （5）函数参数的默认值
```javascript
    jQuery.ajax = function (url, {
      async = true,
      beforeSend = function () {},
      cache = true,
      complete = function () {},
      crossDomain = false,
      global = true,
      // ... more config
    }) {
      // ... do stuff
    };
```
指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

- （6）遍历Map结构
```javascript
    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    
    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }
    // first is hello
    // second is world
```

- （7）输入模块的指定方法
```javascript
    const { SourceMapConsumer, SourceNode } = require("source-map");
```

##Number
```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.EPSILON
Number.EPSILON的实质是一个可以接受的误差范围。

function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON
}
withinErrorMargin(0.1 + 0.2, 0.3)
// true
withinErrorMargin(0.2 + 0.2, 0.3)
// false
```
JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

##Math
Math.trunc()
- Math.trunc方法用于去除一个数的小数部分，返回整数部分。
- 对于非数值，Math.trunc内部使用Number方法将其先转为数值。
- 对于空值和无法截取整数的值，返回NaN。
```javascript
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
```

Math.sign方法用来判断一个数到底是正数、负数、还是零。

参数为正数，返回+1；
参数为负数，返回-1；
参数为0，返回0；
参数为-0，返回-0;
其他值，返回NaN。

```javascript
Math.sign(-5) // -1
console.log(Math.sign('5')); // +1
Math.sign(0) // +0
Math.sign('-0') // -0
Math.sign(NaN) // NaN
```

Math.cbrt方法用于计算一个数的立方根。

Math.clz32()
Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
左移运算符（<<）与Math.clz32方法直接相关。

Math.imul方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。

如果只考虑最后32位，大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过32位的部分溢出）。之所以需要部署这个方法，是因为JavaScript有精度限制，超过2的53次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。

Math.fround方法返回一个数的单精度浮点数形式。

console.log(Math.fround(0.3)) //0.30000001192092896

- Math.hypot方法返回所有参数的平方和的平方根。

Math.expm1()
Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。

Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

- Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
- Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
- Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
- Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine)
- Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
- Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

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


###property
ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
```javascript
    var foo = "bar";
    var bar = {
      foo,
      zar:'zar'
    };
    console.log(bar);

    var obj = {
      * m(){
        yield 'hello world';
      }
    }
```

ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
```javascript
var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
有两种特殊情况：bind方法创造的函数，name属性返回“bound”加上原函数的名字；Function构造函数创造的函数，name属性返回“anonymous”。

如果对象的方法是一个Symbol值，那么name属性返回的是这个Symbol值的描述。
```javascript
    const key1 = Symbol('description');
    const key2 = Symbol();
    let obj = {
      [key1]() {},
      [key2]() {},
    };
    obj[key1].name // "[description]"
    obj[key2].name // ""
```

###Object.assign()
Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。
注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
```javascript
    var target = { a: 1, b: 1 };

    var source1 = { b: 2, c: 2 };
    var source2 = { c: 3 };

    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
```
Object.assign只拷贝自身属性，不可枚举的属性（enumerable为false）和继承的属性不会被拷贝。
```javascript
    Object.assign({b: 'c'},
      Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
      })
    )
    // { b: 'c' }
```
属性名为Symbol值的属性，也会被Object.assign拷贝。

对于嵌套的对象，Object.assign的处理方法是替换，而不是添加。
```javascript
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
```

- 为对象添加属性
```javascript
 class Point {
   constructor(x, y) {
     Object.assign(this, {x, y});
   }
 }
```
- 为对象添加方法
```javascript
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

```

- 克隆对象
```javascript
    function clone(origin) {
      return Object.assign({}, origin);
    }
```
不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
```javascript
    function clone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }
```

属性的可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

```javascript
let obj = { foo: 123 };
 Object.getOwnPropertyDescriptor(obj, 'foo')
 //   { value: 123,
 //     writable: true,
 //     enumerable: true,
 //     configurable: true }
```
ES5有三个操作会忽略enumerable为false的属性。

for...in 循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()：返回对象自身的所有可枚举的属性的键名
JSON.stringify()：只串行化对象自身的可枚举的属性

ES6新增了两个操作，会忽略enumerable为false的属性。

Object.assign()：只拷贝对象自身的可枚举的属性
Reflect.enumerate()：返回所有for...in循环会遍历的属性

ES6规定，所有Class的原型的方法都是不可枚举的。

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。

__proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括IE11）都部署了这个属性。
该属性没有写入ES6的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的API，只是由于浏览器广泛支持，才被加入了ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

在实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下。

Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。
```javascript
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```
该方法与setPrototypeOf方法配套，用于读取一个对象的prototype对象。
ES5引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

