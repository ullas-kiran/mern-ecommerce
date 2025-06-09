const addToCart=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

const fetchCartItems=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}


const updateCartItemQty=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

const deletCartItem=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

module.exports={
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deletCartItem
}