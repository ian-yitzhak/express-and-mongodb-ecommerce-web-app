const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Cart = require('../models/Cart')
router.get('/',async (req,res)=>{
	try{
		const product =await Product.find({})
		res.render('index', {product: product})
	}catch(e){
		console.log(e)

	}
	
})

router.get('/add-to-cart/:id', (req,res,next)=>{
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : { items:{}});
	Product.findById(productId , (err,product)=>{
		if(err){
			return res.redirect('/')
		}
		cart.add(product , product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/')
	})


})
router.get('/cart',(req,res)=>{
	if(!req.session.cart){
		return res.render('cart/cart', {products: null})
	}
	var cart = new Cart(req.session.cart);
	res.render('cart/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
})

module.exports = router