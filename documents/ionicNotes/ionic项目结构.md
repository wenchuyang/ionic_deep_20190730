# ionic project版本 VS ionic CLI版本
project版本的话在package.json文件中"ionic-angular"注明，而CLI版本可以在命令行输入`ionic --version`得到。
# ionic、cordova、angular
1. ionic css是一套封装好了的移动端UI框架。
2. cordova是一个工具，将使用网页开发得到的东西进行封装之类的操作，使其变得像Android/IOS原生应用。单纯的web页面不能提交到应用商店。
3. angular是js库（jQuery也是js库），ionic对angular进行了扩展和封装，利用angular实现了很多适用于移动端的组件。
所以ionic实际上内在的js是angular库实现的，外层使用ionic css美化，然后使用cordova将其封装成原生应用。
# ionic4项目结构
1. e2e: 端对端测试文件
2. node_modules: 存放项目依赖文件。其中依赖关系在package.json文件中注明，执行`npm install`之后会自动更新此目录下的文件。
3. platforms: 添加平台之后会自动生成，目录下存放生成的android和ios资源文件。
4. plugins: 存放cordova安装的插件
5. resources: 添加平台的时候download下来的资源文件，存放启动动画和图标之类的。
6. src: 项目工作目录
   1. app: 应用根目录，包括组件，页面，服务，模块等，新建页面之类的都在这里。
   2. assets: 资源目录，存放静态文件如图片，js框架（不懂..）等
   3. environment: 。。。。不懂
   4. global.scss: 全局css文件
   5. index.html, main.ts: index入口文件和主入口文件
   6. karma.conf.js/test.js：测试相关的配置文件（不懂..）
   7. polyfills.ts: 这个文件包含Angular需要的填充，并在应用程序之前加载（不懂..）
7. www: `ionic build --prod` 生成的单页面静态资源文件
8. angular.json: angular配置文件
9. config.xml: 打包成APP的配置文件
10. ionic.config.json: ionic项目配置文件
11. package.json: 配置项目的元数据（包括版本号，项目名，作者，项目描述等信息）以及项目依赖。
12. tsconfig.json: TypeScript项目的根目录，指定用来编译这个项目的根文件和编译选项
13. tslint.json: TypeScript校验

# page, component, service, directive
## page
页面信息
![page](https://i.loli.net/2019/06/19/5d09c6e49d4d626654.png)
## component
页面组件
![component](https://i.loli.net/2019/06/19/5d09c6e49d50588498.png)
## servive
用来封装可复用的业务逻辑代码
![service](https://i.loli.net/2019/06/19/5d09c6e49d4d651340.png)
## directive
可成为DOM指定扩展行为，或者改变html原有组件默认的行为，比如给按钮添加声音。
![directive](https://i.loli.net/2019/06/19/5d09c6e55faa642891.png)

