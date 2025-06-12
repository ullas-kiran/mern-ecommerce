import React from 'react'
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

const UserCartItemsContent = ({cartItem}) => {
  console.log(cartItem,"cartItems");
  return (
    <div className="flex items-center space-x-4">
       <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 object-cover" />
       <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button variant={'outline'} size={'icon'} className={'h-8 w-8 rounded-full'}>
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span>{cartItem?.quantity}</span>
            <Button variant={'outline'} size={'icon'} className={'h-8 w-8 rounded-full'}>
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
       </div>
    </div>
  )
}

export default UserCartItemsContent