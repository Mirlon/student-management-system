var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'ec2-54-80-122-11.compute-1.amazonaws.com', 	// database host
    user: 'lgjosuktjsjvng', 		// your database username
    password: 'bfa6475ddeaa49d726b66897e83d02aae4be30f45d22732fc80a680ee0f1c844', 		// database password
    db: 'd7816v8v7j7d5t' 		// your database name
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "create table students(name varchar(25), weight int(3), height int(3), hair_color varchar(20), gpa int(2))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        throw new Error('This is not an error. This is just to abort javascript');
    });
});