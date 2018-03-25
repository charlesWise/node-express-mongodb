/**
 * 应用程序的启动（入口）文件
 */
var express = require('express');
var swig = require('swig'); //加载模板引擎

var app = express();

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

//配置应用模块，定义当前应用所使用的模板引擎，第一个参数：模板引擎名称同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数是必须是views，第二个参数的目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数是和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

/**
 * 根据不同的功能划分模块
 */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

// app.get('/', function(req, res, next) {
    // res.send('<h1>欢迎来到我的地盘</h1>');

    /**
     * 读取views目录下的指定文件，解析并返回给客户端
     * 第一个参数，表示模板的文件，相对于views目录 view/index.html
     * 第二个参数，传递给模板使用的数据
     */
//     res.render('index');
// })

app.listen(8080);