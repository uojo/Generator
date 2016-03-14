## Grunt-generator

简单的前端项目生成器，作用：**自动生成**文件目录结构，使得**压缩**、**维护**、**调试**时非常方便，让web开发更迅速、简单。

 - 调试：grunt-livereload + Chrome Plug-in （Firefox-LiveReload-2.0.8.xpi）
 - 生成目录：nodejs
 - 维护：项目文件目录都在package.json中编辑

----------

### 安装

    php + node环境 + grunt

### 配置 package.json

 1. _css：当前系统所包含的所有css文件名称，不需要写.css，而且是相对路径
 2. _js：当前系统所包含的所有js文件名称，不需要写.js，而且是相对路径
 3. _src：源文件目录，不需要修改
 4. _dest：目标文件目录，不需要修改

### 使用（本地开发）

1. 终端切到当前目录，执行命令 `node node/build.js` 后，目录`src、dest`及其子目录将自动创建
2. 在php文件中引入 `<?php include "dest/html/assets.html";?>`
3. 基本ok了，方便调试可以执行命令 `grunt blive`（需在chrome或FF中安装LiveReload插件）

### 使用（发布上线）

开始压缩文件，命令行切到根目录，执行命令 `grunt` 后，将在dest/css、dest/js目录下自动生成main.min.js、main.min.css文件，文件创建成功后引入到 xxx.html 

    <script type="text/javascript" src="dest/js/main.min.js"></script>



文件目录结构如下：

    .
    ├── src 存放源文件
    │   └── css
    │   └── js
    │   └── html
    ├── dest 目标文件，即合并、压缩后的文件，用于html文件直接引用
    │   └── css
    │   └── js
    │   └── html
    ├── node
    │   └── dir.js
    │   └── fs2.js
    │   └── build.js 创建js和css的源目录和目标目录
    ├── node_modules 自动生成的
    ├── Gruntfile.js grunt配置文件，用于grunt合并、压缩等功能
    └── package.json 其中写明了当前系统所引用到的所有js、css、grunt模块等信息