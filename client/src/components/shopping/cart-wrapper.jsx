import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartItemsContent from "./cart-items-content"


const UserCartWrapper = ({cartItems}) => {

  const totalCartAmount=cartItems && cartItems.length>0?cartItems?.reduce((sum,currentItem)=>{
    return sum + (currentItem?.salePrice > 0?currentItem?.salePrice:currentItem?.price) * currentItem?.quantity
  },0):0

  return (
    <SheetContent className={"sm:max-w-md"}>
       <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
       </SheetHeader>
       <div className="mt-8 space-y-4">
          {
           cartItems && cartItems?.length>0?cartItems?.map((cartItem)=><UserCartItemsContent key={cartItem.productId} cartItem={cartItem}/>):null
          }
       </div>
       <div className="mt-8 space-y-4">
         <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">{totalCartAmount}</span>
         </div>
       </div>
       <Button className={'w-full mt-6'}>Checkout</Button>
    </SheetContent>
  )
}

export default UserCartWrapper