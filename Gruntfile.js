module.exports = function(grunt) {
	
	var pkg = grunt.file.readJSON('package.json')
		pkg._js = (pkg._js.join('.js,')+'.js').split(',');
		pkg._css = (pkg._css.join('.css,')+'.css').split(',');
		
		//console.log(pkg._css);
	
	//watch-中间件-start
    // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35729;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    /*<script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>*/
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function(connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径
            connect.static(options.base[0]),
            // 启用目录浏览(相当于IIS中的目录浏览)
            connect.directory(options.base[0])
        ];
    };
	//watch-中间件-end
	
	// 项目配置(任务配置)
	grunt.initConfig({
		// 读取我们的项目配置并存储到pkg属性中
		pkg: pkg,
		dirs:{
			src : pkg._src,
			dest : pkg._dest
		},
        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 8000,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: '127.0.0.1',
                // 物理路径(默认为. 即根目录)
                base: '.',
				keepalive: true
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            },
			  all: {
				options: {
				  open: true,
				  base: [
					''
				  ]
				}
			  }
        },
        // 通过watch任务，来监听文件是否有更改
        watch: {
            client: {
                // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
                options: {
                    livereload: true
                },
                files: ['src/html/*','src/css/*','src/js/*','src/files/*']
            },
			scripts: {
				files: pkg._src + 'js/*.js',
				tasks: ['concat:abJS'],
				options: {
					livereload: true,
				}
			},
			css: {
				files: pkg._src + 'css/*.css',
				tasks: ['concat:abCSS'],
				options: {
					livereload: true
				},
			}
        },
		// 合并文件
		concat: {
			abJS: {
				src: pkg._js,
				dest: '<%= dirs.dest %>js/main.concat.js'
			},
			abCSS: {
				src: pkg._css,
				dest: '<%= dirs.dest %>css/main.concat.css'
			}
		},
		// 压缩js
		uglify: {
			ab:{
				files: {
					'<%= dirs.dest %>js/main.min.js' : '<%= dirs.dest %>js/main.concat.js'
				}
			}

		},
		// 压缩css
		cssmin: {
			ab:{
				files: {
					'<%= dirs.dest %>css/main.min.css' : '<%= dirs.dest %>css/main.concat.css'
				}
			}

		}
	}); // grunt.initConfig配置完毕
	
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	// watch
	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('live', ['connect', 'watch:client']);
	//当您准备配合浏览使用 livereload，执行blive任务
	grunt.registerTask('blive', ['watch:client']);
	//启动文件服务器
	grunt.registerTask('serve', ['connect:all']);
	//tpl-min
	grunt.registerTask('abJS', ['concat:abJS','uglify:ab']);
	grunt.registerTask('abCSS', ['concat:abCSS','cssmin:ab']);
	grunt.registerTask('default', ['concat','uglify','cssmin']);
	
	
};