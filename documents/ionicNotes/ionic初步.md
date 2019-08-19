# ionic初步（以ionic3为模板）
## 新建项目
1. 安装ionic和cordova `npm install -g ionic cordova`
当然，如果曾经安装过的话这一步请跳过。
`-g`表示全局安装，如果不指定版本的话会默认安装最新版的。需要指定版本的话在后面加上`@版本号`，`npm install -g ionic@x.x.x cordova@x.x.x`。
查看自己有没有安装上的话可以查看自己的ionic和cordova版本`ionic -v`，`cordova -v`。
2. 新建项目 `ionic start helloWorld blank --type=ionic-angular`
`helloWorld`是你的项目名。`blank`是ionic给我们提供的一个模板，类似这样的模板还有tabs，sidemenu，super，tutorial。`--type=ionic-angular`表示创建的是ionic3的项目，如果需要创建ionic4项目的话，不需要加这句话。
3. 进入你的项目目录 `cd helloWorld`
## 运行项目
`ionic serve` 在浏览器中打开你的项目，可以看见你的项目实际效果。
`cordova platform add android/ios` 添加android或者ios平台
`ionic cordova build android` 构建Android平台
`ionic cordova run android` 在安卓机或者模拟器上运行你的程序
`ionic cordova run android -l` livereload，实时加载你对程序的修改
## 修改程序的基本信息
1. 修改名字
config.xml文件中`<name>MyApp</name>`改成自己APP的名字。同时可以修改你想要修改的其它信息。比如description等。
2. 修改图标和启动动画
在resources文件夹中将icon和splash替换掉，然后使用命令`ionic cordova resources [platform] [icon/splash]`生成各种大小的图标和启动动画，其中后面两个是可选项。platform如果不指定的话会自动生成android和ios两个平台的，icon/splash不指定的话也会生成两个平台的。（该文件夹下的readme文件有说明）
    1. `Error: end() has already been called, so it's too late to start piping`遇见这种错误可能是icon和splash大小不对，改成icon（1024 × 1024），splash（2732 × 2732）
## 项目下各文件作用
### node_modules
存放项目依赖的地方。依赖关系在package.json中，执行`npm install`之后会自动更新此目录下的文件。如果模块不在package.json文件中，可以单独使用`npm install xxx`来安装这个模块。后面加上`--save`表示写入package.json文件的dependencies属性中，加`--save-dev`表示写入到package.json文件的devDependencies属性中。
### package.json: 
1. 项目元数据，比如name,version,author,license,description等等
2. scripts模块，这里的功能有点像alias，简化命令。比如下面的
    ```
    "scripts": {
        "livereload": "ionic cordova run android -l --address=192.168.1.88"
    }
    ```
    在package.json文件里边加上这一句之后，`ionic cordova run android -l --address=192.168.1.88`就可以用`npm run livereload`代替了。
3. dependencies和devDependencies，前者是项目运行所依赖的模块，后者是项目开发所依赖的模块。大体结构如下：
    ```
    {
        "dependencies": {
            "cordova-android": "7.1.4"
            "cordova-plugin-statusbar": "^2.4.2",
        }
        "devDependencies": {
            "@ionic/app-scripts": "3.2.2",
            "typescript": "~2.6.2"
        }
    }
    ```
    前面的是模块名称后面的是指定版本号，版本号可能会加上各种限定。
    1. 指定版本号，比如上面的`7.1.4`，安装时安装的是指定版本。遵循“大版本.次要版本.小版本”的格式规定。
    2. 不改变次要版本号的最大指定版本号，波浪号表示，比如上面的`~2.6.2`，意思是不低于`2.6.2`，不高于`2.7.0`。
    3. 不改变大版本号的最大指定版本号，插入号表示，比如上面的`^2.4.2`，意思是不低于`2.4.2`，不高于`3.0.0`。
    4. latest，最新版本。

4. cordova字段，Cordova是代码和设备交互的中间件，cordova字段中设置的是与设备交互所需要的插件、平台信息等。
    ```
    "cordova": {
        "plugins": {
            "cordova-plugin-statusbar": {},
            "cordova-plugin-ionic-webview": {
                "ANDROID_SUPPORT_ANNOTATIONS_VERSION": "27.+"
            }
        },
        "platforms": [
            "android"
        ]
    }
    ```
### package-lock.json
`npm install`的时候自动生成的，记录当前状态下安装的各个npm package的实际状态和版本号。
### platforms
添加平台后会自动生成，里面存放的是资源文件，比如你执行命令`ionic cordova platform add android`，platforms下会得到一个android文件夹，你可以把这个android文件夹当做是一个完整的android项目，用Android studio或者是别的android编辑器打开。
### plugins
存放的是cordova的插件，主要用作与设备的交互，比如调用键盘，相机等。同样写在了package.json文件中，放在cordova属性下。
### resources
添加平台的时候下载下来的资源文件，主要是android和ios的应用图标，启动动画等。
### www
www文件夹里边是打包出来的网页的内容，最终的APP加载的是www文件夹下index.html网页。事实上，在这个文件夹下开启http服务，和在项目文件夹下开启ionic serve可以达到同样的效果。
### config.xml
全局配置文件，我们前面说过，修改app的名字之类的可以在这个文件里边修改。具体的可以点[这里](https://cordova.apache.org/docs/en/latest/config_ref/index.html)

## src文件夹
之所以单独拿出来，因为这部分是我们开发的主要场所，包括用户看到的页面，用户看不到的逻辑事件处理。
### manifest.json
文件在同级目录下的index.html文件中使用link引用。
一个简单的manifest.json文件如下：
```
{
  "name": "Ionic",
  "short_name": "Ionic",
  "start_url": "index.html",
  "icons": [{
    "src": "assets/imgs/logo.png",
    "sizes": "512x512",
    "type": "image/png"
  }]
}
```
其中name是应用名称，short_name是短名称（在应用名称太长的时候会显示短名称），start_url是应用开始的页面，icons里边是各种分辨率下采用的logo。其它的参见[这里](https://lavas.baidu.com/pwa/engage-retain-users/add-to-home-screen/introduction)。
细心的可能会意识到，我们之前修改APP name，应用图标和启动动画的时候，并没有提到这个文件。App name是在config.xml文件中修改的，另外两个是在resources文件夹下修改的。那么，manifest.json文件到底有什么作用呢？
这里可能需要区分一下cordova直接构建的应用和PWA(Progressive Web Apps)的区别。因为这个文件的主要是作用在PWA上。
src/index.html下有这样两段代码
![1566196674_1_.jpg](https://i.loli.net/2019/08/19/j148fvDm5gI7Ub6.png)
默认情况下是这样的，使用cordova构建应用程序，然后生成安装包，安装到移动设备上。如果不需要安装包，让你的应用依托于浏览器，那么可以使用下边默认被注释掉的那段代码，同时把上边的注释掉。前者你可以理解为正常的app，后者像是微信小程序。
据说用Chrome打开支持PWA的网站之后，点击右上角那三个点，添加至主屏幕，即可将应用快捷方式放到桌面上。然而即使我打开了Chrome添加桌面快捷方式的权限，也只能把它添加到浏览器的主页。所以关于ionic构建PWA应用，不能知道自己是否做对了，所以也就不继续讲这个了。感兴趣的可以自己搜一搜。反正关于manifest.json这个文件大概就是这个样子的了。
### service-worker.js
在构建PWA应用的时候需要用到的一个文件，用来做持久的离线缓存，使得即使是在没有网的情况下，打开桌面快捷方式仍然能够正常浏览应用内容。
### index.html

