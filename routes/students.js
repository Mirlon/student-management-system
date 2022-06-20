var express = require('express')
var app = express()

// SHOW LIST OF STUDENTS
app.get('/', function(req, res, next) {

    // render to views/index.ejs template file
	{title: 'School Management App'}

	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM students',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('user/list', {
					title: 'Students List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('user/list', {
					title: 'Students List', 
					data: rows
				})
			}
		})
	})
})

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

// SHOW ADD USER FORM
app.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('user/add', {
		title: 'School Management App',
		name: '',
		weight: '',
		height: '',
		hair_color: '',		
		gpa: ''		
	})
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('weight', 'weight is required').notEmpty()             //Validate email
    req.assert('height', 'height is required').notEmpty()  //Validate phone_num
    req.assert('hair_color', 'hair color is required').notEmpty()  //Validate age
    req.assert('gpa', 'gpa is required').notEmpty()  //Validate age

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var user = {
			name: req.sanitize('name').escape().trim(),
			weight: req.sanitize('weight').escape().trim(),
			height: req.sanitize('height').escape().trim(),
			hair_color: req.sanitize('hair_color').escape().trim(),
			gpa: req.sanitize('gpa').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO students SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/user/add.ejs
					res.render('user/add', {
						title: 'Add New Student',
						name: user.name,
						weight: user.weight,
						height: user.height,
						hair_color: user.hair_color,					
						gpa: user.gpa					
					})
				} else {				
					req.flash('success', 'Data added successfully!')
					
					// render to views/user/add.ejs
					res.render('user/add', {
						title: 'Add New Student',
						name: '',
						weight: '',
						height: '',
						hair_color: '',					
						gpa: ''					
					})
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('user/add', { 
            title: 'Add New Student',
            name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            hair_color: req.body.hair_color,
            gpa: req.body.gpa
        })
    }
})

// SHOW EDIT USER FORM
app.get('/edit/(:name)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM students WHERE name = "' + req.params.name + '"', function(err, rows, fields) {
			if(err) throw err
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Student not found with name = ' + req.params.name)
				res.redirect('/students')
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				res.render('user/edit', {
					title: 'Edit Student Info', 
					//data: rows[0],
					name: rows[0].name,
					weight: rows[0].weight,
					height: rows[0].height,
					hair_color: rows[0].hair_color,					
					gpa: rows[0].gpa					
				})
			}			
		})
	})
})

// EDIT USER POST ACTION
app.put('/edit/(:name)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('weight', 'weight is required').notEmpty()             //Validate email
	req.assert('height', 'height is required').notEmpty()             //Validate email
    req.assert('hair_color', 'hair color is required').notEmpty()  //Validate phone_num
    req.assert('gpa', 'gpa is required').notEmpty()  //Validate age

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var user = {
			name: req.sanitize('name').escape().trim(),
			weight: req.sanitize('weight').escape().trim(),
			height: req.sanitize('height').escape().trim(),
			hair_color: req.sanitize('hair_color').escape().trim(),
			gpa: req.sanitize('gpa').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE students SET ? WHERE name = "' + req.params.name + '"', user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/user/add.ejs
					res.render('user/edit', {
						title: 'Edit Student Info',
					    name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            hair_color: req.body.hair_color,
            gpa: req.body.gpa
					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/user/add.ejs
					res.render('user/edit', {
						title: 'Edit Student Info',
					    name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            hair_color: req.body.hair_color,
            gpa: req.body.gpa
					})
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('user/edit', { 
            title: 'Edit Student Info',            
		    name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            hair_color: req.body.hair_color,
            gpa: req.body.gpa
        })
    }
})

// DELETE USER
app.delete('/delete/(:name)', function(req, res, next) {
	var user = { name: req.params.name }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM students WHERE name = "' + req.params.name + '"', user, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to students list pemail
				res.redirect('/users')
			} else {
				req.flash('success', 'Student deleted successfully! name = ' + req.params.name)
				// redirect to students list pemail
				res.redirect('/users')
			}
		})
	})
})

module.exports = app
