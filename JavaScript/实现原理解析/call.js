


Function.prototype.myCall =function(context = window,...args) {
    const ctx = context 
    const fun = Symbol()
    ctx[fun] = this
    args = args.length  ? args : []

    const res = args.length ? ctx[fun](...args) : ctx[fun]()
    delete ctx[fun]
    return res
}


const person = {
    say(...str) {
        console.log('str :>> ', str);
        return `${this.firstName} ${this.lastName}${str}`
    }
}
const person2 = {
    firstName: 'qian',
    lastName: 'yong'
}

console.log(person.say.myCall(person2))
console.log(person.say.myCall(person2, '===> hello !', 123))