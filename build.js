var _dir = require("./node/dir");
var _fs2 = require("./node/fs2");
var pk = require("./package.json");

exports.init = function(pk){
	
	// 创建目标目录
	var dir = pk._dest+ "html/";
	
	// 创建目录
	_dir.mkSync( dir, function(e){
		if(e){
			console.log('目录创建失败');
		}else{
			
			// css
			var css_str='<link href="'+ pk._css.join('.css" type="text/css" rel="stylesheet">\n<link href="') + '.css" type="text/css" rel="stylesheet">';
			
			// js
			var js_str='<script src="'+ pk._js.join('.js"></script>\n<script src="') + '.js"></script>';
			
			// 写文件
			_fs2.wf( dir+"assets.html", css_str + "\n\n" + js_str);
			
			console.log("debugJS 创建成功");
		}
	});

	//mk_destDIR
	_dir.mkSync( pk._dest+"css/");
	_dir.mkSync( pk._dest+"js/");
	
}

exports.init(pk);
