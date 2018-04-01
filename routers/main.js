var express = require('express');
var router = express.Router();

//为了每次登录后刷新页面还是登录的信息页面，这个时候就借助模版解决这个事情，即把用户信息分配模版{userInfo: req.userInfo}
router.get('/', function(req, res, next) {
	res.render('main/index', {
		userInfo: req.userInfo
	});
})

module.exports = router;