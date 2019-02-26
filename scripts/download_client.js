
var url = "http://p6yhokbdy.bkt.clouddn.com/codemao_client.7z?" + Math.random();
console.log(`下载地址：${url}`);
var ProgressBar = require('progress');
var fs = require('fs');
var http = require('http');

var req = http.request(url);
var file = fs.createWriteStream('client.7z');

req.on('response', function(res){
  res.pipe(file);
  var len = parseInt(res.headers['content-length'], 10);

  console.log();
  var bar = new ProgressBar('正在下载编程猫离线客户端 [:bar] :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: len
  });

  res.on('data', function (chunk) {
    bar.tick(chunk.length);
  });

  res.on('end', function () {
    console.log('\n');
  });
});


req.end();