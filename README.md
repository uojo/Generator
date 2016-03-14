## Grunt-generator

简单的前端项目生成器，作用：**生成**文件目录结构，使得**压缩**、维护、调试时非常方便，让web开发更迅速、简单。

----------

### 安装

    node环境 + grunt

### 配置 package.json

 1. _css：当前系统所包含的所有css文件名称，不需要写.css，而且是相对路径
 2. _js：当前系统所包含的所有js文件名称，不需要写.js，而且是相对路径
 3. _src：源文件目录，不需要修改
 4. _dest：目标文件目录，不需要修改

### 使用

命令行切到当前目录，执行 `node build.js` 后，会看到目录`src、dest`自动创建，以及在目录`dest/css、dest/js`下创建了`main.css、main.js`

在src目录下根据 package.json 中_src的信息，自己创建相应文件
在xxx.html中引入目标文件，例如 
`<script type="text/javascript" src="dest/js/main.js"></script>`
<script type="text/javascript" src="dest/js/main.js"></script>

待本地开发测试完毕后准备上线喽，开始压缩文件，命令行切到根目录，执行 `grunt` 后，将在dest/css、dest/js目录下自动生成main.min.js、main.min.css文件，文件创建成功后引入到 xxx.html 

    <script type="text/javascript" src="dest/js/main.min.js"></script>



文件目录结构如下：

    .
    ├── src 存放源文件
    │   └── css
    │   └── js
    │   └── tpl
    ├── dest 目标文件，即合并、压缩后的文件，用于html文件直接引用
    │   └── index.js
    ├── node
    │   └── dir.js
    │   └── fs2.js
    ├── node_modules
    ├── Gruntfile.js grunt配置文件，用于grunt合并、压缩等功能
    └── package.json 其中写明了当前系统所引用到的所有js、css、grunt模块等信息
    └── build.js 创建js和css的源目录和目标目录