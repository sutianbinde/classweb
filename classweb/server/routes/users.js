var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');

/* POST users listing. */
//登录
router.post('/login', function(req, res, next) {
	var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

	handler(req, res, "user", {name: req.body.username},function(data){
		if(data.length===0){
			res.end('{"err":"抱歉，系统中并无该用户，如有需要，请向管理员申请"}');
		}else if(data[0].password !== password){
			res.end('{"err":"密码不正确"}');
		}else if(data.length!==0&&data[0].password===password){
			
			req.session.username = req.body.username; //存session
			req.session.password = password;
			
			res.end('{"success":"true"}');
		}
		
	});
	
});

module.exports = router;
