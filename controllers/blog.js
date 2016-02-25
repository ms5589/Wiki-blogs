var view = require('../view'),
    db = require('../db');
    formidable = require('formidable');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
var blog = {
  
  index: function(req, res) {
  console.log(view);
    var blog = db.all('SELECT * FROM Post', function(err, blog){
      if(err) {
        res.writeHead(500, {"Content-Type":"text/html"});
        res.end("<h1>Server Error</h1>");
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(view.render('blog/index', {blog: blog}));
    });
  },

  /*homepage: function(req, res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(view.render('/index'));
  }, */
  
  new: function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(view.render('blog/new'));
  },

  preview: function(req, res, params) {

    console.log("ParamId in preview method: ", params.id);
    db.all('SELECT body from Comment where postid=?', params.id, function(err, post){
       if(err)
        {
          console.log(err);
          res.writeHead(500, {"Content-Type":"text/html"});
          res.end("Server Error!");
        }
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(view.render('blog/comments',post));
    });
  },

  load: function(req, res, params) {

    console.log("paramId in load method: ", params.id);
    db.get('SELECT * from Post where postId=?', params.id, function(err, post){
       if(err)
        {
          console.log(err);
          res.writeHead(500, {"Content-Type":"text/html"});
          res.end("Server Error!");
        }
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(view.render('blog/load',post));
    });

    //blog.load(req,res);
  },
  
  add: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO Comment(postid, body) values (?,?)', params.id, fields.comment);
      console.log("Comment added", params.id);
      blog.index(req, res)
      console.log("Comment added");
    });
  },  

  create: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO Post(title, body) values (?,?)',fields.title, fields.body);
      blog.index(req, res)
      console.log("Body of Post added");
    });
  },

  destroy: function(req, res, params) {
    console.log(params.id);
    db.run('DELETE FROM Post WHERE postId=?', params.id);
    blog.index(req, res);
  }
}

module.exports = exports = blog;
