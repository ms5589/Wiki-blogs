var view = require('./view'),
    db = require('./db');

// A controller for the Blog resource
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

  new: function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(view.render('blog/new'));
  },

  load: function(req, res, params) {

    //console.log("paramId in load method: ", params.id);
    db.run('SELECT body from Post where postId=?', params.id);
    blog.load(req,res);
    //res.writeHead(200, {"Content-Type":"text/html"});
    //res.end(view.render('blog/load'));
  },


  create: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO Post (title, body, comment) values (?,?,?)',
        fields.title,
        fields.body,
        fields.comment
      );
      blog.index(req, res)
    });
  },

  destroy: function(req, res, params) {
    console.log(params.id);
    db.run('DELETE FROM Post WHERE postId=?', params.id);
    blog.index(req, res);
  }
}

module.exports = exports = blog;
