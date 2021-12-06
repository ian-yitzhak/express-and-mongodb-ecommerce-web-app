const mongoose = require('mongoose')
const connectionString  = 'database string'
const db =  mongoose.connect(
	connectionString,
	{ useNewUrlParser: true, useUnifiedTopology: true }

	)
.then(()=> console.log('Connected successfully'))
.catch((err)=> console.log(err))

module.exports = db



