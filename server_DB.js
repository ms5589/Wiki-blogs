var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('blog.sqlite3')

db.serialize (function() {
db.run("CREATE TABLE if not exists Post(postId INTEGER PRIMARY KEY, title VARCHAR(25) NOT NULL, body VARCHAR(500) NOT NULL)");
		 //CREATE TABLE Comment (comntId INTEGER PRIMARY KEY, body VARCHAR(500) PRIMARY KEY FOREIGN KEY REFERENCES Post(postId)); ")

for(var i=0;i<20;i++){

db.run("INSERT INTO Post (title, body) VALUES ('Title ', 'Body of post ')");

	db.each("SELECT * from Post", function(err, row){
		if(err) return console.log(row);
		
	})
  }
  //console.log(row);
});