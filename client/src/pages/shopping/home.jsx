import bannerOne from "@/assets/banner-1.webp";
import bannerTwo from "@/assets/banner-2.webp";
import bannerThree from "@/assets/banner-3.webp";
import ProductDetailsDialog from "@/components/shopping/product-details";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductsDetails } from "@/store/shop/product-slice";
import { BabyIcon, ChevronsLeftIcon, ChevronsRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const categoriesWithIcon = [
    {
      id: "men",
      label: "Men",
      icon: ShirtIcon,
    },
    {
      id: "women",
      label: "Women",
      icon: CloudLightning,
    },
    {
      id: "kids",
      label: "Kids",
      icon: BabyIcon,
    },
    {
      id: "footwear",
      label: "Footwear",
      icon: UmbrellaIcon,
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: WatchIcon,
    },
  ];


  const brandsWithIcon = [
    { id: "nike", label: "Nike",icon:ShirtIcon },
    { id: "adidas", label: "Adidas",icon:ShirtIcon },
    { id: "puma", label: "Puma",icon:ShirtIcon },
    { id: "levi", label: "Levi's",icon:ShirtIcon },
    { id: "zara", label: "Zara",icon:ShirtIcon },
    { id: "h&m", label: "H&M",icon:ShirtIcon },
  ]

const ShoppingHome = () => {
  const [currentSlide,setCurrentSlide]=useState(0);
  const {productList,productDetails} = useSelector(state=>state.shopProducts); 
  const [openDetailsDialogue,setOpenDetailsDialogue]=useState(false)
  const {user} = useSelector(state=>state.auth);   
  const slides=[bannerOne,bannerTwo,bannerThree];
  const dispatch=useDispatch();
  const navigate=useNavigate();

    function handleAddToCart(getCurrentProductId){
    dispatch(addToCart({userId:user?.id,productId:getCurrentProductId,quantity:1})).then((data)=>{
   
      if(data?.payload?.success){  
       dispatch(fetchCartItems(user?.id))
       toast.success("Product is added to cart");
     }  
  
    })
  }


  useEffect(()=>{
    if(productDetails !== null){
      setOpenDetailsDialogue(true)
    }
  },[productDetails])

  useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentSlide((prevSlide)=>(prevSlide+1)%slides.length)
    },2000)

    return ()=>clearInterval(timer)
  },[])


  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }))
  },[dispatch])

  function handleNavigateToListingPage(getCurrentItem,getCurrentSection){
    sessionStorage.removeItem("filters");

    const currentFilter={
      [session]:[getCurrentItem.id]
    }

    sessionStorage.setItem('filters',JSON.stringify(currentFilter));

    navigate(`/shop/listing`)
  }

    function handleGetProductDetails(getCurrentProductId){
      dispatch(fetchProductsDetails(getCurrentProductId))
    }

  return (
    <div className="flex flex-col min-h-full">
       <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide,index)=><img key={index} src={slide} alt={'banner'} className={` ${index===currentSlide?'opacity-100':'opacity-0'}  absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}/>)
        }
        <Button onClick={()=>setCurrentSlide((prevSlide)=>(prevSlide-1+slides.length)%slides.length)} className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80`} variant={'outline'} size={'icon'}>
          <ChevronsLeftIcon className="w-4 h-4"/>
        </Button>
          <Button onClick={()=>setCurrentSlide((prevSlide)=>(prevSlide+1)%slides.length)} className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80`} variant={'outline'} size={'icon'}>
          <ChevronsRightIcon className="w-4 h-4"/>
        </Button>
        </div>  
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
             <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                {
                  categoriesWithIcon.map((categoryItem,index)=><Card onClick={()=>handleNavigateToListingPage(categoryItem,'category')} className={'cursor-pointer hover:shadow-lg transition-shadow'} key={categoryItem.id}>
                      <CardContent className={'flex flex-col items-center justify-center p-6'}>
                            <categoryItem.icon className="w-12 h-12 mb-4 text-primary"/>
                            <span className="font-bold">{categoryItem.label}</span>
                      </CardContent>
                  </Card>)
                }
             </div>
          </div>
        </section>   

          <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
             <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4">
                {
                  brandsWithIcon.map((brandItem,index)=><Card onClick={()=>handleNavigateToListingPage(brandItem,'brand')} className={'cursor-pointer hover:shadow-lg transition-shadow'} key={brandItem.id}>
                      <CardContent className={'flex flex-col items-center justify-center p-6'}>
                            <brandItem.icon className="w-12 h-12 mb-4 text-primary"/>
                            <span className="font-bold">{brandItem.label}</span>
                      </CardContent>
                  </Card>)
                }
             </div>
          </div>
        </section>   
        
        <section className="py-12">
             <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {
                productList && productList?.length>0?productList?.map((productItem)=><ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails}  key={productItem} product={productItem}/>):null
              }
             </div>
             </div>
        </section>
       <ProductDetailsDialog open={openDetailsDialogue} setOpen={setOpenDetailsDialogue} productDetails={productDetails}/>
    </div>
  )
}

export default ShoppingHome