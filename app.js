const PORT = 9090;
var http = require('http'),
	router = require('./router'),
    db = require('./db'),
    blog = require('./controllers/blog'),
    view = require('./view');


// Populating the router with the equipment resource
//router.addResource('index', require());
router.addRoute('/index', 'POST', blog.homepage);
router.addRoute('/blog', 'GET', blog.index);
router.addRoute('/blog/new', 'GET', blog.new);
router.addRoute('/blog', 'POST', blog.create);
router.addRoute('/blog/:id/load', 'GET', blog.load);
router.addResource('blog', require('./controllers/blog'));

// Launching the server
new http.Server(router.route).listen(PORT);
console.log("Hosting at PORT:",PORT);
 
 // select * from Post INNER JOIN comments ON Post.postId = comments.postId where postId=?
 //select post.title  AS title, Post.body as body
 /*
	if(request.url == " " || request.url == "/" || request.url == "/index.html" || request.url == "/index" )
	{
		var data = fs.readFileSync('index.html', {encoding: "utf-8"});
		response.end(data);
	}

 */