


function create(obj) {
    // 新声明一个函数
    function C() {}
    // 修改函数的原型指向
    C.prototype = obj
    // 返回这个函数的实例化对象
    return new C()
}

const a = create(null)
console.log('a :>> ', a);

const b = create({name:'qian'})

console.log('object :>> ', b.name);
