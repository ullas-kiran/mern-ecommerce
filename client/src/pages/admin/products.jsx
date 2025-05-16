import CommonForm from "@/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { Fragment, useState } from "react"



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
  const [formData,setFormData]=useState(initialFormData)

  function onSubmit(){

  }
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=>setOpenCreateProductDialog(true)}>Add new Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">

      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false)}}>
        <SheetContent side={"right"} className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
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