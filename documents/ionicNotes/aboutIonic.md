# 工作原理
## ionic angular cordova
一般来说，ionic经常与angular和cordova一起出现，那么，它们到底是什么？之间又是什么样的关系呢？
1. ionic css是一套封装好了的移动端UI框架。
2. cordova是一个工具，将使用网页开发得到的东西进行封装之类的操作，使其变得像Android/IOS原生应用。单纯的web页面不能提交到应用商店。
3. angular是js库（jQuery也是js库），ionic对angular进行了扩展和封装，利用angular实现了很多适用于移动端的组件。
所以ionic实际上内在的js是angular库实现的，外层使用ionic css美化，然后使用cordova将其封装成原生应用。
在实际应用的时候，用户看见的是ionic的表象，比如一个好看的camera按钮。而点击按钮的时候，调用的则是angular，又由angular调用Cordova的相机JavaScript API，Cordova向设备请求权限调用相机应用，设备返回结果给Cordova，Cordova再传送到angular的控制器，angular更新ionic。
> Ionic应用打开照相机时整个技术栈的工作流程:
> 1.用户单击按钮
> 2.按钮调用Angular控制器，控制器会通过javascript API调用cordova。
> 3.cordova使用原生SDK和设备通信，请求使用照相机应用。
> 4.设备打开照相机应用(或者请求用户授权)，用户可以照相。
> 5.用户确定照片之后，照相机应用关闭，把图片数据返回给Cordova。
> 6.Cordova把图片数据传递到Angular的控制器。
> 7.图片会更新到Ionic组件中。
参考：https://user-gold-cdn.xitu.io/2017/11/5/512933854ebe7369d31d1270f0fd281b
## 为什么选择ionic
在ionic的文档里边清楚地写出了ionic的目标：Cross-Platform(跨平台), Web Standards-based(基于Web), Beautiful Design(漂亮的设计), Simplicity(简单)。
基于ionic，我们可以使用Web开发技术来开发跨平台的APP，而不需要重新去学Android和iOS开发。

# 项目下各文件作用
## ionic3
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
src下边是我们自己写的代码，而www文件夹下边是ionic serve之后将src下边的代码编译出来的文件。src是给我们看的，www是给浏览器看的。
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
程序的主入口文件，包括scripts，css的引入等。上面我们说到的manifest.json和cordova.js也是在这个文件中引入的。
### app
1. main.ts
`platformBrowserDynamic().bootstrapModule(AppModule);`程序从main.js进入，这里设置了启动module为AppModule。
2. app.module.ts
```
@NgModule({
  declarations: [ MyApp, HomePage ],
  imports: [ BrowserModule, IonicModule.forRoot(MyApp) ],
  bootstrap: [IonicApp],
  entryComponents: [ MyApp, HomePage ],
  providers: [ StatusBar, SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler} ]
})
export class AppModule {}
```
这里的`IonicModule.forRoot(MyApp)`将MyApp设置为root component，MyApp在`app.component.ts`中声明，一般是一个空的component，只用来加载其它应用组件。
3. app.component.ts
这里设置rootPage的值，默认是`rootPage:any = HomePage;`。
4. app.html
app.html起到一个导航的作用，其中`[root]`属性的值一般设置为变量rootPage，我们在app.component.ts中设置过rootPage的值。在ion-nav加载的时候，rootPage引用的HomePage就是根页面。

## ionic4
1. e2e: 端对端测试文件
2. node_modules: 存放项目依赖文件。其中依赖关系在package.json文件中注明，执行`npm install`之后会自动更新此目录下的文件。
3. platforms: 添加平台之后会自动生成，目录下存放生成的android和ios资源文件。
4. plugins: 存放cordova安装的插件，主要是跟设备交互需要的插件。
5. resources: 添加平台的时候download下来的资源文件，存放启动动画和图标之类的。
6. src: 项目工作目录
   1. app: 应用根目录，包括组件，页面，服务，模块等，新建页面之类的都在这里。
   2. assets: 资源目录，存放静态文件如图片，js框架等
   3. environment: 。。。。
   4. global.scss: 全局css文件
   5. index.html, main.ts: index入口文件和主入口文件
   6. karma.conf.js/test.js：测试相关的配置文件
   7. polyfills.ts: 这个文件包含Angular需要的填充，并在应用程序之前加载
7. www: `ionic build --prod` 生成的单页面静态资源文件
8. angular.json: angular配置文件
9. config.xml: 打包成APP的配置文件
10. ionic.config.json: ionic项目配置文件
11. package.json: 配置项目的元数据（包括版本号，项目名，作者，项目描述等信息）以及项目依赖。
12. tsconfig.json: TypeScript项目的根目录，指定用来编译这个项目的根文件和编译选项
13. tslint.json: TypeScript校验

### page, component, service, directive
#### page
页面信息

![page](https://i.loli.net/2019/06/19/5d09c6e49d4d626654.png)
#### component
页面组件

![component](https://i.loli.net/2019/06/19/5d09c6e49d50588498.png)
#### servive
用来封装可复用的业务逻辑代码

![service](https://i.loli.net/2019/06/19/5d09c6e49d4d651340.png)
#### directive
可成为DOM指定扩展行为，或者改变html原有组件默认的行为，比如给按钮添加声音。

![directive](https://i.loli.net/2019/06/19/5d09c6e55faa642891.png)
