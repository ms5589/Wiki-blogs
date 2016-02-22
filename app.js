var http = require('http'),
	router = require('./router'),
    db = require('./db'),
    blog = require('./blog'),
    view = require('./view');


// Populating the router with the equipment resource
router.addRoute('/blog', 'GET', blog.index);
router.addRoute('/blog/new', 'GET', blog.new);
router.addRoute('/blog', 'POST', blog.create);
router.addResource('blog', require('./controllers/blog'));

// Launching the server
new http.Server(router.route).listen(8080);
console.log("Go to Browser");
