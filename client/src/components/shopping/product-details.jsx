import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

const ProductDetailsDialog = ({open,setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={'grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'}>

      </DialogContent>

    </Dialog>
  )
}

export default ProductDetailsDialog