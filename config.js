var config = {
    database: {
        host: 'ec2-54-80-122-11.compute-1.amazonaws.com', 	// database host
        user: 'lgjosuktjsjvng', 		// your database username
        password: 'bfa6475ddeaa49d726b66897e83d02aae4be30f45d22732fc80a680ee0f1c844', 		// database password
        db: 'd7816v8v7j7d5t', 		// your database name
        port: '5432'
    },
    // database: {
    //     host: 'localhost', 	// database host
    //     user: 'root', 		// your database username
    //     password: 'voldemort', 		// database password
    //     db: 'sch_mngr' 		// your database name
    // },
    server: {
        host: 'localhost',
        port: '5000'
    }
}

module.exports = config
