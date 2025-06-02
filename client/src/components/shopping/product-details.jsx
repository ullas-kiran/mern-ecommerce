import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

const ProductDetailsDialog = ({open,setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={'grid grid-cols-2 gap-8'}>

      </DialogContent>

    </Dialog>
  )
}

export default ProductDetailsDialog