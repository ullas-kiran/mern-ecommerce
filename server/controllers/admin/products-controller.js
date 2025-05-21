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


module.exports={handleImageUpload}