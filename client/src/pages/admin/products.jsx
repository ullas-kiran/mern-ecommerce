import CommonForm from "@/common/form"
import ProductImageUpload from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { fetchAllProducts } from "@/store/admin/product-slice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



const initialFormData={
  image:null,
  title:'',
  description:"",
  category:"",
  brand:"",
  price:"",
  salePrice:"",
  totalStock:""
}

const AdminProducts = () => {

  const [openCreateProductDialog,setOpenCreateProductDialog]=useState(false)
  const [formData,setFormData]=useState(initialFormData);
  const [imageFile,setImageFile]=useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]=useState('')
  const [imageLoadingState,setImageLoadingState]=useState(false); 
  const {productList} = useSelector(state=>state.adminProducts)
  const dispatch = useDispatch()


  function onSubmit(event){
    event.preventDefault();
  }


  useEffect(()=>{
   dispatch(fetchAllProducts())
  },[dispatch])

  console.log("productList",productList)

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">

      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false)}}>
        <SheetContent side={"right"} className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
            <div className="px-6">
            <CommonForm
             formData={formData}
             setFormData={setFormData}
             buttonText={'Add'}
             onSubmit={onSubmit}
             formControls={addProductFormElements}
            />
            </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts