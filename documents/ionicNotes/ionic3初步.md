# ionic3项目构建
## 新建项目
1. 安装ionic和cordova `npm install -g ionic cordova`
当然，如果曾经安装过的话这一步请跳过。
`-g`表示全局安装，如果不指定版本的话会默认安装最新版的。需要指定版本的话在后面加上`@版本号`，`npm install -g ionic@x.x.x cordova@x.x.x`。
查看自己有没有安装上的话可以查看自己的ionic和cordova版本`ionic -v`，`cordova -v`。
2. 新建项目 `ionic start helloWorld blank --type=ionic-angular`
`helloWorld`是你的项目名。`blank`是ionic给我们提供的一个模板，类似这样的模板还有tabs，sidemenu，super，tutorial。`--type=ionic-angular`表示创建的是ionic3的项目，如果需要创建ionic4项目的话，不需要加这句话。
3. 进入你的项目目录 `cd helloWorld`
### ionic project version & ionic CLI version
project版本的话在package.json文件中"ionic-angular"注明，而CLI版本可以在命令行输入`ionic --version`得到。两者可以不一致。
## 运行项目
`ionic serve` 在浏览器中打开你的项目，可以看见你的项目实际效果。
`cordova platform add android/ios` 添加android或者ios平台
`ionic cordova run android` 在安卓机或者模拟器上运行你的程序
`ionic cordova run android -l` livereload，实时加载你对程序的修改，与上一个不同的是，在运行这条命令之后，打开chrome的inspect功能，可以在控制台的Sources中看见src，看见你自己写的js文件，可以直接debug。而上面那条命令只能看见编译之后的www文件夹下的文件。
## 修改程序的基本信息
1. 修改名字
config.xml文件中`<name>MyApp</name>`改成自己APP的名字。同时可以修改你想要修改的其它信息。比如description等。
2. 修改图标和启动动画
在resources文件夹中将icon和splash替换掉，然后使用命令`ionic cordova resources [platform] [icon/splash]`生成各种大小的图标和启动动画，其中后面两个是可选项。platform如果不指定的话会自动生成android和ios两个平台的，icon/splash不指定的话也会生成两个平台的。（该文件夹下的readme文件有说明）
    1. `Error: end() has already been called, so it's too late to start piping`遇见这种错误可能是icon和splash大小不对，改成icon（1024 × 1024），splash（2732 × 2732）
## 开发
### 添加页面 `ionic g page detail`
```
this.navCtrl.push("DetailPage", {
    "time": new Date()
});
```
进入DetailPage页面，传入的参数是当前时间。
在detail页面接收参数的话，在constructor里边使用NavParams接收
```
constructor(public navParams: NavParams) {
    this.date = this.navParams.get("time");
}
```
### 连接数据库
#### Storage
ionic带的Storage插件可以实现简单的数据存储。为什么说是简单的数据存储？因为它对数据库的操作有限。自带有set和get方法来进行键值对的存取，`set(key, value)`的使用注意第二次运行的话key对应的value值会被覆盖。或许是我没有找到更合适的方法来使用Storage进行复杂数据的存储....
#### Sqlite





## 打包
### 打包成APK
`ionic cordova build android`，运行该命令可以得到一个debug的包，你可以把这个包单独拿出来安装到你的手机上。如果安装的是debug的包，与电脑用数据线连接上打开应用之后，你可以在Chrome地址栏输入`chrome://inspect`查看或编辑你的应用样式。
`ionic cordova build android --release`，得到的是release的包。如果你仅仅只是这样运行一条命令，得到的APK名字应该是带`_unsigned`的，也就是，未签名的包。这样的安装包是不能安装到你的移动设备上去的。debug版本会自动签名，debug签名与自定义签名不同。
`ionic cordova build android --prod`，prod参数全称是product，官方解释是"Build the application for production"。事实上，这个参数主要是用来优化和压缩你的代码，在编译的时候忽略你import了但是没有用到的插件，编译ts文件将其悉数放到一个main.js文件中进行压缩，编译scss文件将其悉数放到main.css文件中然后进行压缩....相比较而言你会发现同样是release的包，prod的比没有prod的会大一些。
说到大小，除去prod的影响，debug的包和release的包同样存在差异。debug的包包含调试信息，并且不进行任何优化，因为优化会增加调试的复杂程度。而release的包不包含调试信息，并且会对应用程序的大小和运行速度进行优化。所以同一个程序release的包一般来讲会比debug的包小一些。
### 文件签名
#### 生成签名文件
在你安装jdk的时候，jdk/jre/bin/keytool.exe也会自动安装上，这个程序可以用来生成签名证书。直接用keytool命令，后边加上-help可查看所有命令。
`keytool -genkey -v -keystore deep.keystore -alias deep -keyalg RSA -keysize 2048 -validity 36500`
`-genkey`生成key
`-v`即verbose，显示细节
`-keystore deep.keystore`密钥库名称是deep.keystore
`-alias deep`密钥库别名为deep
`-keyalg RSA -keysize 2048`加密算法是RSA，密钥长度为2048
`-validity 36500`密钥有效期为36500天
运行命令之后会提示你输入**密钥库的口令**，输完口令之后有一串信息，这串信息可不填直接回车。最后还会出现一个密钥口令输入，是你**为别名设置的密钥口令**。然后你会在当前命令运行的目录下看见新生成的`deep.keystore`。
#### 手动签名
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore deep.keystore app-release-unsigned.apk deep`
`-sigalg SHA1withRSA`签名算法的名称是SHA1withRSA
`-digestalg SHA1`摘要算法的名称是SHA1
`-keystore deep.keystore`密钥库的位置，后边的deep.keystore是密钥库的路径，相对于当前命令运行的目录
`app-release-unsigned.apk`待签名文件的位置，相对于当前命令运行目录
`deep`密钥库别名
然后你的app-release-unsigned.apk就是已经签名了的apk文件了，这个签名文件是需要保存好的，下次还需要继续使用。如果签名不一致的话是不能进行版本更新的。
#### 自动签名
1. 在platform/android/目录下创建release-signing.properties文件
2. 在文件中写入
```
storeFile=deep.keystore // 签名文件相对路径（相对于release-signing.properties文件所在路径）
key.store.password=123456  // 签名文件密码（你前面输入的密钥库口令）
key.alias=deep // 设置的别名
key.alias.password=123456  // 别名密码（你前面输入的别名密钥库口令）
```
3. 把签名文件放到release-signing.properties同级目录下（主要是方便，可以自己写相对路径，别写错了就行）
4. 运行打包命令`ionic cordova build android --prod --release`，在build successful之后你可以看见签名APK的生成路径。






 