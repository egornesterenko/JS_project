

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const session = require('express-session');
let userID;
// app.use(connect.cookieParser());
app.use(session({
	name: userID,
	saveUninitialized: true,
	resave: false,
	secret: 'sssh, quiet! it\'s a secret!',
	cookie: {
		maxAge: 720000000,
		sameSite: true
	}
}));


function checkLoginBefore(req, res, next) {
	if (!req.session.userId) {
		res.redirect('/signIn.html')
	} else {
		next();
	}
}
function checkLoginAfter(req, res, next) {
	if (req.session.userId) {
		res.redirect('/')
	} else {
		next();
	}
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'media/PostPhoto')
	},
	filename: function (req, file, cb) {
		let ext = file.originalname;
		let i = ext.lastIndexOf('.');
		ext = ext.substr(i+1, ext.length);
		cb(null, `${Date.now()}.${ext}`)
	}
})

const upload = multer({ storage: storage});


app.get('/account', checkLoginBefore, (req, res) => {
	res.sendFile('account.html', { root: '.' })
});

app.post('/get_user_acc', (req, res) => {
	let users = JSON.parse(fs.readFileSync("JSON/users.json"));
	users.forEach((item) => {
		if(item.userId === req.session.userId){
			res.send(item)
		}
	});
});

app.post('/get_feedback', (req, res) => {
	res.send(JSON.parse(fs.readFileSync("JSON/feedback.json")));
});

app.post('/get_user_articles', (req, res) => {
	let obj = JSON.parse(fs.readFileSync("JSON/articles.json"));
	let arr = [];
	
	obj.forEach((item) => {
		if(item.userId === req.session.userId){
			arr.push(item)
		}
	});
	res.send(arr)
});

app.post('/get_user_by_article', (req, res) => {
	let users = JSON.parse(fs.readFileSync("JSON/users.json"));
	let arr = [];
	
	users.forEach((item) => {
		arr.push(item);
	});
	res.send(arr)
});


app.get('/logout', checkLoginBefore, (req, res) => {
	req.session.destroy(err => {
		userID = 0;
		res.clearCookie('sid');
		res.redirect('/')
	})
});

app.get('/gallery*', (req, res) => {
	res.sendFile('findArticle.html', { root: '.' })
});

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: '.' })
});

app.get('/article*', (req, res) => {
	res.sendFile('article.html', { root: '.' })
});

app.post('/article', (req, res) => {
	let obj = JSON.parse(fs.readFileSync("JSON/articles.json"));
	obj.forEach((item) => {
		if(item.articleId === req.body.id){
			res.send(item)
		}
	});
});


app.get('/login', checkLoginAfter, (req, res) => {
	res.sendFile('./signIn.html', { root: '.' })

});

app.get('/signup', checkLoginAfter, (req, res) => {
	res.sendFile('./signUp.html', { root: '.' })
});

app.get('/*', function(req, res) {
	res.sendFile(req.url.substring(1), { root: '.' })
});


app.post('/loadUser', function(req, res){
	if (!req.session.userId) {
		res.send({
			html: `<li><a class="text" href="/login"><i class="fas fa-sign-in-alt"></i>&#160;Login</a></li>
             	<li><a class="text" href="/signup"><i class="fas fa-plus"></i>&#160;Register</a></li>`
			}
		)
	}
	else{
		res.send({
			html: `<li><a href="http://localhost:8080/makeArticle.html">Create article</a></li>
			<li><a class="text" href="/account"><i class="fas fa-user"></i>&#160;Homepage</a></li>
        			<li><a class="text" href="/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>`,
			id: req.session.userId
			}
		)
	}
});


app.listen(8080);

app.post('/gallery', function(req, res){
	let obj = JSON.parse(fs.readFileSync("JSON/articles.json"));
	function filter_by_topic(value){
		return value.topic === req.body.topic;
	}
	if(req.body.topic){
		obj = obj.filter(filter_by_topic);
	}
	res.send(obj);
	
});


app.post('/makeArticle.html', upload.array('photo', 12), function (req, res, next) {
	let article = JSON.parse(fs.readFileSync("JSON/articles.json"));
	let photoNames = [];
	req.files.forEach((item) => {photoNames.push(`../media/PostPhoto/${item.filename}`)})
	req.body.photos = photoNames;
	if (photoNames.length == 0) {
		photoNames.push(`../media/PostPhoto/no-image.png`);
	}
	let d = Date(Date.now()); 
	article.push(req.body);
	Object.assign(article[article.length-1], {userId: `${userID}`});
	Object.assign(article[article.length-1], {articleId: `${Math.random().toString(36).substr(2, 9)}`});
	Object.assign(article[article.length-1], {time: `${d.toString() }`});
	fs.writeFileSync('JSON/articles.json', JSON.stringify(article), 'utf8');
	res.redirect(req.get('referer'));
	res.end("");
});


app.post('/signUp.html', function (req, res) {
	let users = JSON.parse(fs.readFileSync("JSON/users.json"));
	let out = 0;
	users.forEach((item) => {
		if(item.login === req.body.login){
			res.end("Sorry, user with this login already exists");
			out++;
		}
		else if(item.email === req.body.email){
			res.end("Sorry, user with this email already exists");
			out++;
		}
		else if(item.telephone === req.body.telephone){
			res.end("Sorry, user with this telephone already exists");
			out++;
		}
	});
	if(out === 0){
		const newId = String(Date.now());
		req.body.userId = newId;
		users.push(req.body);
		req.session.userId = newId;
		userID = req.session.userId;
		fs.writeFileSync('JSON/users.json', JSON.stringify(users), 'utf8');
		res.end("we are winners");
	}
});


app.post('/signIn.html', function (req, res) {
	let users = JSON.parse(fs.readFileSync("JSON/users.json"));
	let sign = 0;
	let log = 0;
	users.forEach((item) => {
		if(item.login === req.body.login){
			log++;
			if(item.pass === req.body.password || item.password === req.body.password){
				sign++;
				req.session.userId = item.userId;
				userID = req.session.userId;
				res.end("we are winners");
			}
		}
	});
	if(!log){
		res.end('Sorry, your entered wrong data')
	}
	else if(!sign){
		res.end('Sorry, your password is wrong')
	}
});


app.post('/remove_article', function(req, res){
	let art = JSON.parse(fs.readFileSync("JSON/articles.json"));
	const num = req.body.num;
	art[num].photos.forEach((item) => {
		const oldPath = item.substr(3);
		try{
			fs.unlinkSync(oldPath);
		}
		catch (e) {
			console.log(e)
		}
	});
	art.splice(num, 1);
	fs.writeFileSync('JSON/articles.json', JSON.stringify(art), 'utf8');
	res.end('OK')
});


app.post('/post_feedback', function (req, res) {
	let feedback = JSON.parse(fs.readFileSync("JSON/feedback.json"));
	const users = JSON.parse(fs.readFileSync("JSON/users.json"));
	let obj = {};
	let now = new Date();
	console.log(req.url);
	obj.time = String(now).substr(0, 24);
	console.log(users);
	console.log(feedback);
	users.forEach((item) => {
		if(item.userId === req.session.userId){
			obj.name = `${item.firtname} ${item.lastname}`;
		}
	});
	obj.text = req.body.text;
	feedback.push(obj);
	fs.writeFileSync('JSON/feedback.json', JSON.stringify(feedback), 'utf8');
	res.send("OK")
});


