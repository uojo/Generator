var fs = require("fs");

function writeFile(pathname,content){
	
	fs.open(pathname,"w",0644,function(e,fd){
		console.log(e,fd)
		if(e)throw e;
		console.log('.........',pathname,content)
		fs.write(fd, content, 0,'utf8',function(e){
			if(e)throw e;
			fs.closeSync(fd);
		})
	});
}

exports.wf = writeFile;