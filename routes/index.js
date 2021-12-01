const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/',async (req,res)=>{
	try{
		const product =await Product.find({})
		res.render('index', {product: product})
	}catch(e){
		console.log(e)

	}
	
})

module.exports = router