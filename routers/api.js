var express = require('express');
var router = express.Router();

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
 *1、用户名不能为空2、密码不能为空3、两次输入密码必须一致
 *用户是否已经注册：数据库的查询
 */
router.post('/user/register', function(req, res, next) {
	var reqData = req.body,
		username = reqData.username,
		password = reqData.password,
		repassword = reqData.repassword;
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
	// 注册成功
	responseData.message = '注册成功';
	res.json(responseData);
})

module.exports = router;