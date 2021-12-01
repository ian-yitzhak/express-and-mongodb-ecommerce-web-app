const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const multer = require('multer')
const fs = require('fs')
const path = require('path');
const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null, './public/img')
    },

    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    },
})

const upload  = multer({
    storage: storage,
    limits:{
        fieldSize : 1024 * 1024 * 3,
    },
});

router.get('/new', (req,res)=>{
    res.render('new/new')
})
//post new html
router.post('/new',upload.single('image'), async (req,res)=>{

     const product = new Product({

        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename

    })
    try{
        await product.save()
        res.redirect('/')
    }catch(e){
        console.log(e)
    }
})

module.exports = router