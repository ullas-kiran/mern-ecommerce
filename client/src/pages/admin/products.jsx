import CommonForm from "@/common/form";
import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !==null ? dispatch(editProduct({
      id:currentEditedId,formData
    })).then((data)=>{
      console.log(data,'edit');
      if(data?.payload?.success){
         dispatch(fetchAllProducts());
         setCurrentEditedId(null);
        setOpenCreateProductDialog(false);
        setFormData(initialFormData);
      }
    }):
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success("Product add successfully");
      }
    });
  }

  function handleDelete(getCurrentProductId){
     dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
     }).catch((err)=>{
      console.log(err)
     })
  }

  function isFormValid(){
    Object.keys(formData).map((key)=>formData[key] !== '').every(item=>item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          {currentEditedId !== null ?'Edit Product':'Add New Product'}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile handleDelete={handleDelete} setFormData={setFormData} setOpenCreateProductDialog={setOpenCreateProductDialog} setCurrentEditedId={setCurrentEditedId} product={productItem} />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side={"right"} className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
                {currentEditedId !== null ?'Edit Product':'Add New Product'}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentEditedId !== null}
          />
          <div className="px-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText= {currentEditedId !== null ?'Edit':'Add'}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
