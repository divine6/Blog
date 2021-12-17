
Function.prototype.myBind = function (context, ...args) {
    //新建一个变量赋值为this，表示当前函数
    const fn = this
    //判断有没有传参进来，若为空则赋值[]
    args = args ? args : []
    //返回一个newFn函数，在里面调用fn

    return function newFn(...newArgs) {
        if(this instanceof newFn) {
            return new fn(...args,...newArgs)
        }
        return fn.apply(context, [...args,...newArgs])
    }
}

const person1 = {
    name:'qian yong'
}

// const person2 = {
//     say(name) {
//         console.log(this.name)
//         this.name = name
//     }
// }

// const say1 = person2.say.myBind(person1)

// say1()

// 作为构造函数

const fun = function(name) {
    this.name = name
}
fun.prototype.hello = function() {
    console.log(this.name)
}
const newP = fun.myBind(person1)

const ns = new newP('zhangsan')

ns.hello()