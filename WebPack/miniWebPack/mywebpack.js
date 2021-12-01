


//核心思路 
//  1. 找到一个入口文件
//  2. 解析这个入口文件，提取他的依赖。
//  3. 解析这个文件的依赖的依赖，实际上是递归的去创建一个文件间的依赖图，描述所有文件间的依赖关系。
//  4. 把所有解析后的文件打包成一个浏览器可识别的文件。

    const fs = require('fs')
    const babylon = require('babylon')
    const traverse = require('babel-traverse').default
    const path = require('path')
    const babel = require('babel-core')


    let ID = 0
    // 解析文件
    function createAssets(filename) {
        const content = fs.readFileSync(`${filename}.js`, 'utf-8')

        const ast = babylon.parse(content, {sourceType:'module'})
        let dependencies = []

        traverse(ast,{
            ImportDeclaration:({node})=> {
                dependencies.push(node.source.value)
            }
        }) 

        const id = ID++

        const {code} = babel.transformFromAst(ast,null,{presets:['env']})

        return {
            id,
            filename,
            dependencies,
            code
        }
    }
    // 解析文件的依赖
    function createGraph(entry) {
        const mainAssets = createAssets(entry)
        const allAssets = [mainAssets]
        for (const assets of allAssets) {
            const dirname = path.dirname(assets.filename)

            assets.mapping = {}
            
            assets.dependencies.forEach(relativePath => {
                const absolutePath = path.join(dirname,relativePath)
                const childAsset = createAssets(absolutePath) 
                assets.mapping[relativePath] = childAsset.id
                allAssets.push(childAsset)
            }); 
        }
        return allAssets
    }
    // 打包文件成一个浏览器可识别的文件
    function bundle(graph) {
        let modules = ''
        graph.forEach(module => {
            modules += `${module.id}:[
                function(require, module, exports) {
                    ${module.code}
                },
                ${JSON.stringify(module.mapping)},
            ],`
        })
        // 实现require 方法
        const result = `(function(modules) {

            function require(id) {

                const [fn, mapping] = modules[id]

                function localReqiure(relativePath) {
                    return require(mapping[relativePath])
                }

                const module = {exports:{}}

                fn(localReqiure,module, module.exports)

                return module.exports
            }

            require(0)

        })({${modules}})`

        return result
    }
    // 找到入口文件，此处默认是entry文件
    const graph = createGraph('./src/entry')
    const result = bundle(graph)
    console.log(result,);