var express = require('express')
var app = express()


app.get('/rectangles', function(req, res, next) {

    // render to views/index.ejs template file
	{title: 'School Management App'}

	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM students',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('user/rects', {
					title: 'Students List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('user/rects', {
					title: 'Students List', 
					data: rows
				})
			}
		})
	})
})


module.exports = app
