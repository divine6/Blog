
/**
 * 依赖收集器
 */
export default class Dep {

    constructor() {
        this.subs = []
    }
    // 添加依赖
    addSub(watcher){
        watcher && watcher.update && this.subs.push(watcher)
    }
    // 发送通知
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}