const mongoose = require('mongoose')
const connectionString  = 'mongodb+srv://ian_test:AefvvOADSQqCvITF@ian.qfm7u.mongodb.net/shop?retryWrites=true&w=majority'
const db =  mongoose.connect(
	connectionString,
	{ useNewUrlParser: true, useUnifiedTopology: true }

	)
.then(()=> console.log('Connected successfully'))
.catch((err)=> console.log(err))

module.exports = db



