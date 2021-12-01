const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  image: {
    type: String,
    unique:true,  
  },
  title: {
    type: String,
    unique:true,  
  },
  description: {
    type: String,
    unique:true,  
  },
  price: {
    type: Number,
    unique:true,  
  }
})


module.exports = mongoose.model('Product', productSchema)