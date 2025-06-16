import bannerOne from "@/assets/banner-1.webp";
import bannerTwo from "@/assets/banner-1.webp";
import bannerThree from "@/assets/banner-1.webp";
import { Button } from "@/components/ui/button";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

const ShoppingHome = () => {

  const slides=[bannerOne,bannerTwo,bannerThree];

  return (
    <div className="flex flex-col min-h-full">
       <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide,index)=><img key={slide} src={slide} alt={'banner'} className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"/>)
        }
        <Button className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80`} variant={'outline'} size={'icon'}>
          <ChevronsLeftIcon className="w-4 h-4"/>
        </Button>
          <Button className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80`} variant={'outline'} size={'icon'}>
          <ChevronsRightIcon className="w-4 h-4"/>
        </Button>
        </div>  
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
             <h2>Shop by category</h2>
          </div>
        </section>   
    </div>
  )
}

export default ShoppingHome