


const a = {name:'zhansan'}
Object.assign(a,{name:'qian'},{age:18},{like:'ball'})

console.log('a :>> ', a);

Object.myAssign = function(target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let ret = Object(target)
    source.forEach(function(obj) {
        if (obj != null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key]
                }
            }
        }
    })
    return ret
}

Object.myAssign(a,{name:'qian'},{age:18},{like:'ball'})
