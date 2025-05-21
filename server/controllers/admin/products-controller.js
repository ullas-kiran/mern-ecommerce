const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

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
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body;
        const newlyCreatedProduct= new Product({image,title,description,category,brand,price,salePrice,totalStock});
        await newlyCreatedProduct.save();
        res.status(201).json({
            success:true,
            data:newlyCreatedProduct
        })
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
        const listProducts=await Product.find({});
        res.status(200).json({
            success:true,
            data:listProducts
        })
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
        const {id}=req.params;
          const {image,title,description,category,brand,price,salePrice,totalStock}=req.body;

          const findProduct = await Product.findById(id);
          if(!findProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
          }

          findProduct.title=title||findProduct.title;
          findProduct.description=description||findProduct.description;
          findProduct.category=category||findProduct.category;
          findProduct.brand=brand||findProduct.brand;
          findProduct.price=price||findProduct.price;
          findProduct.salePrice=salePrice||findProduct.salePrice;
          findProduct.totalStock=totalStock||findProduct.totalStock;
          findProduct.image=image||findProduct.image;


           await findProduct.save();
           res.status(200).json({
            success:true,
            data:findProduct
           })

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


module.exports={handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct}