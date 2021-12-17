

Function.prototype.Myapply = function(context = window, args = []) {
    const ctx = context
    const fun = Symbol()
    console.log('this :>> ', this);
    ctx[fun] = this

    const res = args.length ? ctx[fun](...args) : ctx[fun]()

    delete ctx[fun]

    return res
}

const person = {
    say(arg1,arg2) {
        return `${this.firstName} ${this.lastName} ${arg1} ${arg2}`
    }
}

const person1 = {
    firstName:'qian',
    lastName:'yong'
}

console.log('person :>> ', person.say.Myapply(person1, ['hello','world']));

//  数组没有max 方法

// const arr = [1,2,3,8,67,95,45]
// console.log('max :>> ', Math.max.apply(null, arr));
