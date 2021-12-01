
import Dep from "./Dep.js"

/**
 * 数据监听器，结合发布订阅者模式
 */
export default class Watcher {
    /**
     * @param {*} vm Vue 实例
     * @param {*} key data 的属性
     * @param {*} cb 数据更新的回调
     */
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        window.target = this

        this.oldValue = vm[key]

        window.target = null

    }
    /*
     * 数据变化的时候更新视图
     * 数据变化的时机才会调用update
     */
    update() {
        let newValue = this.vm[this.key]
        if(newValue === this.oldValue) {
            return
        }
        this.cb(newValue)
    }
}