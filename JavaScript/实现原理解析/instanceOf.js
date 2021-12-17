

function myInstanceOf (a,b) {
    let left = a.__proto__
    let right = b.prototype
    while(true) {
        if(left == null ) {
            return false
        }
        if(left === right) {
            return true
        }
        letf = left.__proto__
    }
}

// __proto__ 浏览器不支持时，使用 Object.getPrototypeOf()

function myInstanceOf (a,b) {
    let left = Object.getPrototypeOf(a)
    let right = b.prototype
    while(true) {
        if(left == null ) {
            return false
        }
        if(left === right) {
            return true
        }
        letf = Object.getPrototypeOf(left)
    }
}
