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
      var temp = req.url.split('/')[2]
      form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO Comment(postid, body) values (?,?)', temp, fields.comment);
      console.log("Comment added", temp);
      blog.index(req, res)
    });
  },  

  create: function(req, res) {
      var form = new formidable.IncomingForm();
      console.log("I am in create");
      form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO Post(title, body) values (?,?)',fields.title, fields.body);
      console.log("TITLE: ",fields.title);
      blog.index(req, res)
      console.log("Body of Post added");
    });
  },

  edit: function(req, res, params) {

    var temp = req.url.split('/')[2];
    console.log("paramId in edit method: ", params.id);
    db.get('SELECT * from Post where postId=?', params.id, function(err, post){
       if(err)
        {
          console.log(err);
          res.writeHead(500, {"Content-Type":"text/html"});
          res.end("Server Error!");
        }
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(view.render('blog/edit',post));
      });
  },
 
change: function(req, res) {
    var temp = req.url.split('/')[2];
    var form = new formidable.IncomingForm();

    console.log("I am in edit going to post");
    
    form.parse(req, function(err, fields, files) {
      console.log("FIELDS", fields);
    db.run('UPDATE Post SET title = ?, body = ? WHERE postId = ?', fields.title, fields.body, temp);
    //db.run('INSERT INTO Post(title, body) values (?,?)',fields.title, fields.body);
    console.log("Changing TITLE: ",fields.title);
    blog.index(req, res)
    console.log("Blog edited");
    });
  },


destroy: function(req, res, params) {
    console.log(params.id);
    db.run('DELETE FROM Post WHERE postId=?', params.id);
    db.run('DELETE FROM Comment WHERE postid=?', params.id);
    blog.index(req, res);
  }
}

module.exports = exports = blog;
