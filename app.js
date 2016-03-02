const PORT = 9090;
var http = require('http'),
	fs = require('fs'),
	router = require('./router'),
    db = require('./db'),
    blog = require('./controllers/blog'),
    view = require('./view');
    //read the files here using path
  var data1 = fs.readFileSync('prism/prism.css', {encoding: "utf-8"});
  var data2= fs.readFileSync('prism/prism.js', {encoding: "utf-8"});
  var img = fs.readFileSync('cali.jpg');

// Populating the router with the equipment resource
//router.addResource('index', require());
//add route
router.addRoute('/prism.js','GET', function(req, res){ 
		res.writeHead(200, {'Content-Type': 'text/javascript'})
		res.end(data2);
	});
router.addRoute('/prism.css','GET', function(req, res){ 
		res.writeHead(200, {'Content-Type': 'text/css'})
		res.end(data1);
	});

router.addRoute('/cali.jpg','GET', function(req, res){ 
		res.writeHead(200, {'Content-Type': 'image/*'})
		res.end(img);
	});


router.addRoute('/index', 'POST', blog.homepage);
router.addRoute('/blog', 'GET', blog.index);
router.addRoute('/blog/:id/edit', 'POST', blog.edit);
router.addRoute('/blog/new', 'GET', blog.new);
router.addRoute('/blog/:id/change', 'POST', blog.change);
router.addRoute('/blog', 'POST', blog.create);
router.addRoute('/blog/:id/add', 'POST', blog.add);
router.addRoute('/blog/:id/load', 'GET', blog.load);
router.addRoute('/blog/:id/preview', 'GET', blog.preview);
router.addResource('blog', require('./controllers/blog'));

// Launching the server
new http.Server(router.route).listen(PORT);
console.log("Hosting at PORT:",PORT);