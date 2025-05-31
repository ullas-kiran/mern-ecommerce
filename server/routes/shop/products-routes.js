const express=require('express');

const {getFilteredProducts,getProductsDetails} =require('../../controllers/shop/products-controller');

const router=express.Router();

router.get('/get',getFilteredProducts)
router.get('/get/:id',getProductsDetails)

module.exports=router;