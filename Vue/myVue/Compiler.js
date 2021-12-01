
import Watcher from "./Watcher.js"

/**
 * 编译 html 模板，解析指令 以及 {{}}
 */
export default class Compiler {

    constructor(vm) {
        this.vm = vm
        this.el = vm.$el
        this.methods = vm.$methods
        this.compiler(vm.$el)
    }
    // 编译模板
    compiler(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)) {
                this.compilerText(node)
            } else if(this.isElementNode(node)) {
                this.compilerElement(node)
            }
            // 存在子节点
            if(node && node.childNodes.length > 0){
                this.compiler(node)
            }
        })
    }
    /**
     * 编译文本节点
     */
    compilerText(node) {
        let reg = /\{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(node.textContent)) {
            const key = RegExp.$1.trim()
            node.textContent  = value.replace(reg, this.vm[key])
            new Watcher(this.vm, key, (newValue)=> {
                node.textContent = newValue
            })
        }
    }
    /**
     * 编译元素节点
     * v-text v-html v-model v-on:click
     */
    compilerElement(node) {
        Array.from(node.attributes).forEach(attr => {
            const attrName = attr.name
            if(this.isDirective(attrName)) {
                let directiveName =  attrName.includes(':')  ? attrName.substr(5) : attrName.substr(2)
                let key = attr.value
                this.update(node, key, directiveName)
            }
        })
    }
    update(node, key, directiveName) {
        const updateFn = this[directiveName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key, directiveName)
    }
    textUpdater(node, value, key, ) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue)=> node.textContent = newValue)
    }
    htmlUpdater(node, value, key, ) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue)=> node.innerHTML = newValue)
    }
    modelUpdater(node, value, key, ) {
        node.value = value
        new Watcher(this.vm, key, (newValue)=> node.value = newValue)
        node.addEventListener('input',()=> {
            this.vm[key] = node.value
        })
    }
    clickUpdater(node, value, key, directiveName) {
        node.addEventListener(directiveName, this.methods[key])
    }

    /**
     * @param {*} node 节点对象
     * @returns boolean 是否是文本节点
     */
    isTextNode(node) {
        return node.nodeType === 3
    }
    /**
     * @param {*} node 节点对象
     * @returns boolean 是否是元素节点
     */
    isElementNode(node) {
        return node.nodeType === 1
    }
    /**
     * 元素属性是否是指令
     *  v- 开头的都是指令
     */
    isDirective(attrName) {
       return attrName.startsWith('v-')
    }
}