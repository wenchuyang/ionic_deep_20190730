# ionic初步
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
## 各文件作用

