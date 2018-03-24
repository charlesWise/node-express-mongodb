/**
 * 应用程序的启动（入口）文件
 */
var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
    res.send('<h1>欢迎来到我的地盘</h1>');
})

app.listen(8080);