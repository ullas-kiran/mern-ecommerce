const express = require('express');

const {addToCart,fetchCartItems,updateCartItemQty,deletCartItem}=require('../../controllers/shop/cart-controller');

const router=express.Router();

router.post('/add',addToCart);
router.get('/get/:userId',fetchCartItems);
router.put('/update-cart',updateCartItemQty);
router.delete('/delete/:userId/:productId',deletCartItem);  

module.exports=router;