import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  isEditMode,
  imageLoadingState,
  setImageLoadingState,
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event?.target.files);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrag(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `http://localhost:5000/api/admin/products/upload-image`,
      data
    );
    if (response?.data?.success) {
      setUploadedImageUrl(response.data?.result?.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4 px-6">
      <Label className={"text-lg font-semibold mb-2 block"}>Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrag={handleDrag}
        className={` ${isEditMode?'opacity-60':''} border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          disabled={isEditMode}
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={
              `${isEditMode?'cursor-not-allowed':'cursor-pointer'}flex flex-col items-center justify-center h-32`
            }
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and Drop or clicked to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className={"h-10 bg-gray-100"} />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant={"ghost"}
              size={"icon"}
              className={"text-muted-foreground hover:text-foreground"}
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
