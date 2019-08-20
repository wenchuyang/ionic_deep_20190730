# ionic4项目结构
1. e2e: 端对端测试文件
2. node_modules: 存放项目依赖文件。其中依赖关系在package.json文件中注明，执行`npm install`之后会自动更新此目录下的文件。
3. platforms: 添加平台之后会自动生成，目录下存放生成的android和ios资源文件。
4. plugins: 存放cordova安装的插件，主要是跟设备交互需要的插件。
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

