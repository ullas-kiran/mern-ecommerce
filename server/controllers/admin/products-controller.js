const { imageUploadUtil } = require("../../helpers/cloudinary");

const handleImageUpload=async(req,res)=>{
     
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
const dataUri = `data:${req.file.mimetype};base64,${b64}`;
const result = await imageUploadUtil(dataUri);

        res.json({
            success:true,
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
          success:false,
          message:"Error occured"
        })
    }
}

// add new product

const addProduct=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

// fetch all product

const fetchAllProducts=async(req,res)=>{
      try {
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

// edit product

const editProduct=async(req,res)=>{
      try {
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

// delete product

const deleteProduct=async(req,res)=>{
      try {
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}


module.exports={handleImageUpload}