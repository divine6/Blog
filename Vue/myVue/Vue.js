
import Observer  from "./observer.js"
import Compiler from "./compiler.js"
/**
 * 初始化 Vue
 * 接受各种配置参数
 */
export default class Vue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods

        this.initRootElement(options)

        this._proxyData(this.$data)

        new Observer(this.$data)

        new Compiler(this)
    }
    /**
     * @description 挂在根节点
     * @param {*} options 初始化配置
     */
    initRootElement(options) {
        if(typeof options.el === 'string') {
            this.$el = document.querySelector(options.el)
        } else if(options.el instanceof HTMLElement) {
            this.$el = options.el
        }
        if(!this.$el){
            throw new Error('传入的el不合法，请传入css selector 或者HTMLElement')
        }
    }
    /**
     * @description 利用Object.defineProperty做数据代理，能够通过this 直接访问到数据
     * @param {*} data 将要代理的数据对象
     */
    _proxyData(data) {
        Object.keys(data).forEach(key=> {
            Object.defineProperty(this, key, {
                configurable:true,
                enumerable:true,
                get(){
                  return data[key]
                },
                set(newValue) {
                    if(newValue === data[key]) return
                    data[key] = newValue
                }
            })
        })
    }
}