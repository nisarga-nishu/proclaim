var express = require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var app = express();
var http    = require("http");
var path    = require("path");
var querystring = require("querystring");
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var obj = {};
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({resave:true,secret: "proclaim",saveUninitialized: true}));
var sess;

var fs = require('fs');
var multer  = require('multer')
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/upload', express.static('upload'));


const fileUpload = require('express-fileupload');
app.use(fileUpload());

var connection = require('./connection');

	
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');	

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/sign-up', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/sign-up.html'));
});

app.get('/guest-user', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/guest-user.html'));
});

app.post('/login-guest-user', function(req,res) {
	var data = {
        "Data":""
    };
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var customer_type = req.body.customer_type;
	var industry = req.body.industry;
	var business_location = req.body.business_location;
	var email = req.body.email;
	var min = Math.ceil(1111);
	var max = Math.floor(9999);
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	getToken(first_name,rand, function(token){

		sess = req.session;
		sess.userlogin = 1;
		sess.user_id = 0;
		sess.user_name = "guest";
		sess.token = token;
		data["status"] = "success";
		data["msg"] = "Successfully logged in..";
		res.json(data);
	});
});

var getToken = function(name,rand,callback) {
    var token = name+rand;
	 connection.query("SELECT * from ticket WHERE token=?",[token], function(err, rows, fields) {
		if(rows.length <= 0){
			return callback(token);
		 }else{
			var min = Math.ceil(1111);
			var max = Math.floor(9999);
			var rand = Math.floor(Math.random() * (max - min + 1)) + min; 
			callback(name+rand);
		 }
    }); 
	
};

app.post('/submit-sign-up', function(req,res) {
	var data = {
        "Data":""
    };
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var customer_type = req.body.customer_type;
	var industry = req.body.industry;
	var business_location = req.body.business_location;
	var email = req.body.email;
	var password = req.body.password;
	//var user_name = email.substring(0, email.indexOf("@"));
	//var user_name = getUserName(first_name,'',res);
	var min = Math.ceil(1111);
	var max = Math.floor(9999);
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	getUserName(first_name,rand, function(user_name){
		connection.query("SELECT * from account WHERE email=?",[email],function(err, rows, fields){
			if(rows.length <= 0){
				var db_data={
					"user_name":user_name,
					"first_name":first_name,
					"last_name":last_name,
					"customer_type":customer_type,
					"industry":industry,
					"business_location":business_location,
					"email":email,
					"password":password,
					"insert_date":formatted
					}
				connection.query('INSERT INTO account SET ?',db_data, function (error, results, fields) {
				  if (error) {
					data["msg"] = "Error occurred!";
					res.json(data);
				  }else{
					data["user_name"] = user_name;
					data["status"] = "success";
					data["msg"] = "Successfully created account!";
					res.json(data);
				  }
				  });	
			   
			}else{
				data["status"] = "error";
				data["msg"] = "Email is already registered";
				res.json(data);
			}
		});
	})
	
	
});


var getUserName = function(name,rand,callback) {
    var user_name = name+rand;
	 connection.query("SELECT * from account WHERE user_name=?",[user_name], function(err, rows, fields) {
		if(rows.length <= 0){
			return callback(user_name);
		 }else{
			var min = Math.ceil(1111);
			var max = Math.floor(9999);
			var rand = Math.floor(Math.random() * (max - min + 1)) + min; 
			callback(name+rand);
		 }
    }); 
	
};

app.post('/submit-login', function(req,res){
	var data = {
        "Data":""
    };
	var user_name=req.body.user_name;
	connection.query("SELECT * from account WHERE user_name=?",[user_name],function(err, rows, fields){
        if(rows.length != 0){
			sess = req.session;
			 
			if(rows[0].password==req.body.password)
			{
				sess.userlogin = 1;
				sess.user_id = rows[0].id;
				sess.user_name = rows[0].user_name;
				sess.token = "";
				data["status"] = "success";
				data["msg"] = "Successfully logged in..";
				res.json(data);
			}
			else
			{
				data["msg"] = "Password is incorrect.";
				res.json(data);
			}
           
        }else{
            data["msg"] = "Username or password is incorrect.";
            res.json(data);
        }
    });
});

app.get('/dashboard', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/dashboard.html'));
	}else{
		res.redirect('/');
	}	
});

app.get('/logout',function(req,res){
	req.session.destroy(function(err) {
	  if(err) {
		console.log(err);
	  } else {
		res.redirect('/');
	  }
	});
});

app.get('/work-harassment', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/work-harassment.html'));
	}else{
		res.redirect('/');
	}
});

app.get('/damaging-historic-monuments', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/damaging-historic-monuments.html'));
	}else{
		res.redirect('/');
	}
});

app.get('/inciting-violence-bullying', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/inciting-violence-bullying.html'));
	}else{
		res.redirect('/');
	}
});

app.get('/social-media-propaganda', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/social-media-propaganda.html'));
	}else{
		res.redirect('/');
	}
});

app.get('/stone-pelting', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/stone-pelting.html'));
	}else{
		res.redirect('/');
	}
});

app.get('/favoring-enemies', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/favoring-enemies.html'));
	}else{
		res.redirect('/');
	}
});

app.get('/other-offences', function(req, res) {
	sess = req.session;
	if(sess.userlogin) {
		res.sendFile(path.join(__dirname + '/views/other-offences.html'));
	}else{
		res.redirect('/');
	}
});

app.post('/upload-file', function(req,res) {
	 var data = {
        "Data":""
    };
	let file = req.files.file;
	file.mv(path.join(__dirname+'/upload/'+file.name), function(err) {
		if (err){
			data["msg"] = "Error occurred!";
			res.json(data);
		}else{
			data["file_name"] = file.name;
			res.json(data);
		}
	});
});	

app.post('/submit-ticket', function(req,res) {
	sess = req.session;	
	var data = {
        "Data":""
    };
	var threat_faced = req.body.threat_faced;
	var priority = req.body.priority;
	var datetime = req.body.datetime;
	var location = req.body.location;
	var desc_offence = req.body.desc_offence;
	var name_offenders = req.body.name_offenders;
	var image_name_arr = req.body.image_name_array;
	var image_name_array = image_name_arr.split(',');
	var evidence1='';
	var evidence2='';
	var evidence3='';
	if(typeof image_name_array[0] != 'undefined') {
		evidence1 = image_name_array[0];
	}
	if(typeof image_name_array[1] != 'undefined') {
		evidence2 = image_name_array[1];
	}
	if(typeof image_name_array[2] != 'undefined') {
		evidenc2 = image_name_array[2];
	}

	
	connection.query("SELECT * from ticket ORDER BY ticket_id DESC LIMIT 1", function(err, rows, fields){
        if(rows.length == 0){
			var ticket_no = 1411;
		}else{
			var ticket_no = parseInt(rows[0].ticket_no) + 1;
		}
			var db_data={
				"token":sess.token,
				"user_id":sess.user_id,
				"threat_faced":threat_faced,
				"priority":priority,
				"ticket_no":ticket_no,
				"datetime":datetime,
				"location":location,
				"desc_offence":desc_offence,
				"name_offenders":name_offenders,
				"evidence1":evidence1,
				"evidence2":evidence2,
				"evidence3":evidence3,
				"insert_date":formatted
				}
			connection.query('INSERT INTO ticket SET ?',db_data, function (error, results, fields) {
			  if (error) {
				data["msg"] = "Error occurred!";
				res.json(data);
			  }else{
				  /* if(priority==1){
					connection.query("SELECT * from account WHERE user_id=?",[sess.user_id],function(err, rs, fields){
						 if(rs.length != 0){
							var email = rs[0].email;
							nodemailer.mail({
								from: "Proclaim <hemant650@gmail.com>", 
								to: 'hemant650@gmail.com', 
								subject: "High priority complaint", 
								html: "<b>complaint ticket created</b>" 
							}); 
							
						 }
					});		 
				  } */
				  
				data["status"] = "success";
				data["msg"] = "Successfully created!";
				res.json(data);

			  }
			  });	
           
        
    });
	
});

app.get('/test',function(req,res){
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'smtp.gmail.com',
		pass: ''
	  }
	});

	var mailOptions = {
	  from: 'hemant650@gmail.com',
	  to: 'hemant650@gmail.com',
	  subject: 'Sending Email using Node.js'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
});

app.get('/list-ticket',function(req,res){
	sess = req.session;
	if(sess.userlogin) {
		if(sess.token=="") {
			connection.query("SELECT * from ticket WHERE user_id=?",[sess.user_id],function(err, result){

				if(err){
					throw err;
				} else {
					obj = {print: result};
					res.render('list-ticket', obj);                
				}
			});
		}else{
			connection.query("SELECT * from ticket WHERE token=?",[sess.token],function(err, result){

				if(err){
					throw err;
				} else {
					obj = {print: result};
					res.render('list-ticket', obj);                
				}
			});
		}
	}else{
		res.redirect('/');
	}
	
});

app.get('/view-ticket/:id', function(req, res) {
    var ticket_id = req.params.id;
	sess = req.session;
	if(sess.userlogin) {
		connection.query("SELECT * from ticket WHERE ticket_id=?",[ticket_id],function(err, result){

			if(err){
				throw err;
			} else {
				obj = {print: result};
				res.render('view-ticket', obj);                
			}
		});
	}else{
		res.redirect('/');
	}
});

app.get('/forgot-username', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/forgot-username.html'));
});

app.post('/get-username', function(req,res) {
	 var data = {
        "Data":""
    };
	var email = req.body.email;
	connection.query("SELECT * from account WHERE email=?",[email],function(err, rows, fields){
        if(rows.length != 0){
			data["status"] = "success";
			data["user_name"] = rows[0].user_name;
			res.json(data);
        }else{
            data["msg"] = "No record found!";
            res.json(data);
        }
    });
	
});

app.post('/get-password', function(req,res) {
	 var data = {
        "Data":""
    };
	var user_name = req.body.user_name;
	var email = req.body.email;
	connection.query("SELECT * from account WHERE user_name=? AND email=?",[user_name,email],function(err, rows, fields){
        if(rows.length != 0){
			data["status"] = "success";
			data["password"] = rows[0].password;
			res.json(data);
        }else{
            data["msg"] = "No record found!";
            res.json(data);
        }
    });
	
});

app.get('/forgot-password', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/forgot-password.html'));
});


app.listen(8081);

console.log("Running at Port 8081");