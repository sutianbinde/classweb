var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

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

//退出
router.post('/logout', function(req, res, next) {
	
	req.session.username = ""; //清除session中的用户信息
	req.session.password = "";
	res.end('{"success":"true"}');
});


//管理员列表
router.post('/AdminList', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 5;
	handler(req, res, "user", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
});


//添加管理员
router.post('/add', function(req, res, next) {
	//console.log(req.body);
	var md5 = crypto.createHash('md5');
	req.body.password = md5.update(req.body.password).digest('base64');
	handler(req, res, "user", req.body,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，添加失败"}');
		}else{
			res.end('{"success":"添加成功"}');
		}
	});
});


//删除用户
router.post('/delete', function(req, res, next) {
	
	handler(req, res, "user", {"_id" : ObjectId(req.body._id)},function(data){
		
		console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，删除失败"}');
		}else{
			var obj = {
	          success:"删除成功"
	        };
	        var str = JSON.stringify(obj);
	        res.end(str);
		}
		
	});
});


//编辑更新用户
router.post('/update', function(req, res, next) {
	//console.log(req.body);
	
	var selectors = [
    	{"_id":ObjectId(req.body._id)},
    	{"$set":{
    			name:req.body.name, //用户名称
				phone:req.body.phone //联系电话
    		}
    	}
    ];
	handler(req, res, "user", selectors,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，修改失败"}');
		}else{
			res.end('{"success":"修改成功"}');
		}
		
	});
	
});



module.exports = router;
