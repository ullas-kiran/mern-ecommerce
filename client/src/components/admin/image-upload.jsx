import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ProductImageUpload = ({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl}) => {

  const inputRef=useRef(null);

  function handleImageFileChange(event){
    console.log(event?.target.files)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className={"text-lg font-semibold mb-2 block"}>Upload Image</Label>
      <div>
        <Input id="img-upload" type={"file"} 
        className={"hidden"}
         ref={inputRef} onChange={handleImageFileChange}/>
      </div>
    </div>
  );
};

export default ProductImageUpload;
