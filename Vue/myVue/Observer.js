import Dep from "./Dep.js"


/**
 * 递归遍历data 所有属性 劫持数据
 */
export default class Observer {
    constructor(data) {
        this.traverse(data)
    }
    // 递归遍历data里的所有属性
    traverse(data) {
        if(!data || typeof data !=="object") {
            return
        }
        Object.keys(data).forEach(key=> {
            this.defineReactive(data, key, data[key])
        })
    }
    //  给传入的数据设置getter setter
    defineReactive(obj, key, value) {
        this.traverse(value)
        const dep = new Dep()

        let that = this

        Object.defineProperty(obj, key, {
            configurable:true,
            enumerable:true,
            get(){
                window.target && dep.addSub(window.target)
                return value
            },
            set(newValue) {
                if(newValue === value) return

                value = newValue

                that.traverse(newValue)

                dep.notify()
            }
        })
    }
}