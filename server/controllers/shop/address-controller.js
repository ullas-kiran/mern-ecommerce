const addAddress=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}

const fetchAllAddress=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}

const editAddress=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}


const deleteAddress=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}


module.exports={addAddress,editAddress,fetchAllAddress,deleteAddress}