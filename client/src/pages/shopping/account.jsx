import accImg from "@/assets/account.jpg"
import { Tabs } from "@/components/ui/tabs"

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
       <div className="relative h-[350px] w-full overflow-hidden">
        <img src={accImg}
         className="h-full w-full object-cover object-center"
        />
        </div> 
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
           <Tabs defaultValues="orders">

           </Tabs>
          </div>
        </div>     
    </div>
  )
}

export default ShoppingAccount