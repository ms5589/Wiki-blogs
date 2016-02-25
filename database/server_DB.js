var sqlite3 = require('sqlite3');

var temp;

var db = new sqlite3.Database('blog.sqlite3')

db.serialize (function() {
db.run("CREATE TABLE if not exists Post(postId INTEGER PRIMARY KEY, title VARCHAR(25) NOT NULL, body VARCHAR(500) NOT NULL)");
db.run("CREATE TABLE if not exists Comment(comntId INTEGER PRIMARY KEY, postid INTEGER NOT NULL, body VARCHAR(250), FOREIGN KEY(postid) REFERENCES Post(postId))");

for(var i=1;i<6;i++){
	console.log(i);
	db.run("INSERT INTO Post (title, body) VALUES ('Title "+i+" ', 'Body of post "+i+" ')");
	db.run("INSERT INTO Comment (postid, body) VALUES (1, 'Comment number "+i+" of comment 1')");
	}
});