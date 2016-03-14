/*jslint node: true, plusplus: true, vars: true, white: true, maxerr: 200, regexp: true */
console.time('Finished task in: ');

// var fs2 = require('./fs2');
var fs = require('fs');

function readFile(path) {
	return fs.readFileSync(path, 'utf-8');
}

function logHeader() {
	console.log('\n------------ concat.js ------------\n');
}

function logFooter() {
	console.log('\n-----------------------------------\n');
}

function logError(message) {
	logHeader();
	console.log('ERROR: ' + message);
	logFooter();
}

function minifyCss(css) {
	css = css.replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, '');
	css = css.replace(/\n/ig, '');
	css = css.replace(/\s*:\s*/ig, ':');
	css = css.replace(/\s*\,\s*/ig, ',');
	css = css.replace(/\s*\{\s*/ig, '{');
	css = css.replace(/\s*\}\s*/ig, '}');
	css = css.replace(/\s*\;\s*/ig, ';');
	return css;
}

function isCssFile(tag) {
	tag = tag.split('>')[0].toLowerCase();
	return tag.indexOf('link') === 0 && tag.search('stylesheet') !== -1 && tag.search('.css') !== -1 && tag.search('http://') === -1 && tag.search('href=') !== -1;
}

function isInlineCss(tag) {
	return tag.search(/style/i) === 0;
}

function isLocalScriptFile(tag) {
	tag = tag.split('>')[0].toLowerCase();
	return tag.indexOf('script') === 0 && tag.indexOf('src') !== -1 && tag.indexOf('http://') === -1 && tag.indexOf('https://') === -1 && tag.indexOf('src="//') === -1 && tag.indexOf("src='//") === -1;
}

function isMinified(scriptTag) {
	return scriptTag.split('>')[0].search(/.min.js/i) !== -1;
}

function getUrl(tag, srcOrHref) {
	var start = tag.indexOf(srcOrHref) + srcOrHref.length;
	var semicolonType = tag[start];
	var end = tag.indexOf(semicolonType, start + 1);
	return tag.substring(start + 1, end);
}

function includeCssFile(tag) {
	var part = tag.split('>');
	var fileContent = readFile(getUrl(part[0], 'href='));
	return 'style>' + minifyCss(fileContent) + '</style>' + part[1];
}

function includeScriptFile(tag) {
	var part = tag.split('>');
	var fileContent = readFile(getUrl(part[0], 'src='));
	return 'script>' + fileContent;
}

function parseInlineCss(tag) {
	var css = tag.split('>')[1];
	if (css) {
		css = minifyCss(css);
		return tag.split('>')[0] + '>' + css;
	}
	return tag;
}

function runConcat(fileToRead, fileToSave) {
	var data = readFile(fileToRead).replace(/<!--[\s\S]*?-->/g, ''); //delete comments in the HTML...
	
	data = '_callback("'+ data.replace(/>\s*/g,">").replace(/\s*</g,"<").replace(/"/g,'\\"').replace(/\//g,'\\/') + '")';
	
	// console.log(data);
	// console.log(fileToRead, fileToSave);
	//return;
	
	// fs2.wf(fileToSave, data);
	fs.writeFileSync( fileToSave, data, 'utf8' );
	logHeader();
	console.log('Done! Result was written to: ' + fileToSave);
	console.timeEnd('Finished task in: ');
	logFooter(); //END OF PROGRAM
}

exports.tplmin = runConcat;