

import Vue from './Vue.js'


 const vm = new Vue({
    el:'#app',
    data:{
        msg:'hello',
        person:{
            name:'zhangsan',
            age:20
        },
        html:'<div style="color:skyblue">这段是html文本</div>',
        name: 'zhangsan'
    },
    methods:{
        handler(){
            console.log('click 事件触发')
        }
    }
})
