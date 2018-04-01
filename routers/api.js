var express = require('express');
var router = express.Router();
var User = require('../models/User'); //引入模型操作数据库

// 统一的返回格式
var responseData;
router.use(function(res, req, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

/**
 *用户注册逻辑
 */
router.post('/user/register', function(req, res, next) {
    var reqData = req.body,
        username = reqData.username,
        password = reqData.password,
        repassword = reqData.repassword;
    /**
     *1、用户名不能为空2、密码不能为空3、两次输入密码必须一致
     */
    // 用户名是否为空
    if (!username) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    // 密码不能为空
    if (!password) {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 两次输入密码不一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '两次输入密码不一致';
        res.json(responseData);
        return;
    }
    /**
     *2、用户是否已经注册：数据库的查询，如果数据库存在和我们药注册的用户名重复，表示该用户已经注册。
     */

    User.findOne({
        username: username
    }).then(function(userInfo) {
        if (userInfo) {
            responseData.code = 4;
            responseData.message = '用户名已经注册';
            res.json(responseData);
            return;
        }
        // 保存用户注册信息刀数据库中，通过对象去操作数据库
        var user = new User({
            username: username,
            password: password
        })
        return user.save();
    }).then(function(newUserInfo) {
        console.log(newUserInfo)
        // 注册成功
        responseData.message = '注册成功';

        responseData.userInfo = {
            id: newUserInfo._id,
            username: newUserInfo.username
        }
        req.cookies.set('userInfo', JSON.stringify({
            id: newUserInfo._id,
            username: newUserInfo.username
        }));

        res.json(responseData);
    })
})

/**
 *用户登录逻辑
 */
router.post('/user/login', function(req, res) {
    var reqData = req.body,
        username = reqData.username,
        password = reqData.password;
    if (!username || !password) {
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return;
    }
    // 查询数据库中相同用户名和密码记录是否存在，如果存在登录成功
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo) {
        if (!userInfo) {
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        // 用户名密码正确，同时返回前端用户信息
        responseData.message = '登录成功';
        responseData.userInfo = {
            id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set('userInfo', JSON.stringify({
            id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
    })
})


/**
 *用户登录逻辑
 */
router.get('/user/logout', function(req, res) {
    req.cookies.set('userInfo', null);
    responseData.message = '退出成功';
    res.json(responseData);
})
module.exports = router;