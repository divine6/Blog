

在我们使用electron的时候，打包的时候会发现，报错下载失败，为啥呢？因为他的打包文件是有几个文件是git下载，由于网络原因，下载不下来，导致出错；

目录：

一、打开   C:\Users\asus\AppData\Local ,  执行完打包命令以后会发现，变成了两个文件夹

二、具体报错：报错是下面的挨着下载失败的，总共要下载四个

<font color="#2d8cf0">1、electron-v9.3.3-win32-x64.zip</font>
<font color="#2d8cf0">2、winCodeSign-2.6.0.7z    （剩下的几步，需要放的地方都是  electron-builder 这底下）</font>
<font color="#2d8cf0">3、nsis-3.0.4.1.7z</font>
<font color="#2d8cf0">4、nsis-resources-3.4.1.7z</font>


### 一、打开   C:\Users\xxx\AppData\Local ,  执行完打包命令以后会发现，变成了两个文件夹

![](https://img-blog.csdnimg.cn/20201106182557432.png)

### 二、具体报错：报错是下面的挨着下载失败的，总共要下载四个
1、electron-v9.3.3-win32-x64.zip
这里如果按照我第一步的步骤是不会有这个报错的，这个文件时相当的大的，可以点我下载不同版本，也可以把报错下载的后面的那个地址，放在浏览器上，直接下载，然后打开
C:\Users\asus\AppData\Local\electron\Cache     将你下载的压缩包放进去,如图所示，我这里下载了64位和32位两个


![](https://img-blog.csdnimg.cn/2020110618342967.png)

这个放完以后就报错第二个winCodeSign-2.6.0.7z了

 

2、winCodeSign-2.6.0.7z    （这里注意哈，剩下的几步，需要放的地方都是  electron-builder 这底下）
  这里  具体版本和地址，你根据你报错的后面   down 后面的那个路径复制了，然后在浏览器 下载下来，比如，我的报错，down：后面的地址就是下面的

> https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z

（1）打开 C:\Users\asus\AppData\Local\electron-builder\Cache  ，新建文件夹取名 winCodeSign，在这里面再新建一个文件夹 取名  winCodeSign-2.6.0 ，这个取名不是随便取的，是根据上面下载的路径前面的那个名字而来，把下载的东西解压到这个文件夹

![](https://img-blog.csdnimg.cn/20201106185516326.png)
这个放完以后就报错第三个nsis-3.0.4.1.7z了

 

3、nsis-3.0.4.1.7z
这里  具体版本和地址，你根据你报错的后面   down 后面的那个路径复制了，然后在浏览器 下载下来，比如，我的报错，down：后面的地址就是下面的
> https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z


（1）打开 C:\Users\asus\AppData\Local\electron-builder\Cache  ，新建文件夹取名 nsis，在这里面再新建一个文件夹 取名  nsis-3.0.4.1，这个取名不是随便取的，是根据上面下载的路径前面的那个名字而来，把下载的东西解压到这个文件夹

![](https://img-blog.csdnimg.cn/20201106185442746.png)

这个放完以后就报错第四个nsis-resources-3.4.1.7z了
4、nsis-resources-3.4.1.7z
这里  具体版本和地址，你根据你报错的后面   down 后面的那个路径复制了，然后在浏览器 下载下来，比如，我的报错，down：后面的地址就是下面的
> https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z

（1）打开 C:\Users\asus\AppData\Local\electron-builder\Cache\nsis ，新建文件夹取名 nsis-resources-3.4.1，把下载的东西解压到这个文件夹

![](https://img-blog.csdnimg.cn/20201106185408564.png)

5、到这里以后就没别的问题了，你再执行打包命令 npm run build 应该是这样的，就代表打包成功了!
