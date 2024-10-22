var mongoose = require('mongoose');

// 用户对表结构
module.exports = new mongoose.Schema({
	// 用户名
	username: String,
	// 密码
	password: String,
	// 是否管理员
	isAdmin: {
		type: Boolean,
		default: false
	}
})