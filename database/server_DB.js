var sqlite3 = require('sqlite3');

var temp;

var db = new sqlite3.Database('blog.sqlite3')

db.serialize (function() {
db.run("CREATE TABLE if not exists Post(postId INTEGER PRIMARY KEY, title VARCHAR(25) NOT NULL, body VARCHAR(500) NOT NULL, comment VARCHAR(250))");
db.run("CREATE TABLE if not exists Comment(comntId INTEGER PRIMARY KEY, body VARCHAR(250), FOREIGN KEY(comntId) REFERENCES Post(postId))");

for(var i=1;i<6;i++){
	console.log(i);
	db.run("INSERT INTO Post (title, body, comment) VALUES ('Title "+i+" ', 'Body of post "+i+" ', 'Comment is, "+i+" ')");
	db.run("INSERT INTO Comment (body) VALUES ('Body of comment "+i+"')");


	db.each("SELECT * from Post", function(err, row){
		if(err) return console.log(row);
	})

	db.each("SELECT * from Comment", function(err, row){
		if(err) return console.log(row);
	})
  }
});