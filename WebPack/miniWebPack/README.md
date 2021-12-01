# my-mini-webpack
用于学习webpack 打包原理的项目，手写webpack 源码 适用于学习。


## 概念

 静态模块打包器
1. chunk 和 bundle 的区别?

- Chunk  **打包过程**中的概念(modules 集合) 

webpack 从一个入口文件开始，入口模块引用其他模块，其他模块引用其他模块.... 
webpack 通过模块间的引用关系，逐个打包模块，这些 module就形成了一个chunk
如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个chunk。

- Bundle

webpack 为我们打包完成后最终输出的一个或者多个打包好的文件。

2. chunk 和 bundle 的关系是什么?
大多数情况下，一个chunk 会产生一个bundle 但也有例外，如果加入了devtool: soucre-map 一个entry 一个 chunk 对应1两个bundle 

Chunk 是过程中的代码块，Bundle 是打包结果输出的代码块,Chunk 在构建完成呈现为Bundle

### Plugin 和 Loader 分别是做什么的，怎么工作的？
 - loader
模块转换器，将非 js 模块转化为webpack 能识别的js 模块。本质上 webpack loader 将所有类型的文件转换为应用程序的 **依赖图**  可以直接引用的模块。

 - Plugin
扩展插件， webpack 运行的各个阶段， 都会广播出对应的事件，插件去监听对应的事件，

 - Compiler
对象， 包含了webpack 环境的所有配置信息，包含options loader、plugins webpack 启动的时候实例化 它是全局唯一的，可以把它理解为webpack 实例。

 - Compliation
包含了当前模块的资源，编译生成资源，webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一次信的Compliation。

