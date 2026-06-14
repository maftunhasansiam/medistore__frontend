import AddToCartSection from "@/components/pages/products/productPage";
import Feature from "@/components/pages/home/feature";
import HeroSection from "@/components/pages/home/hero";
import ProductDetailsPage from "@/components/pages/products/productDetails";
import OrdersPage from "@/components/pages/order/getMyOrders";
import OrderCart from "@/components/pages/order/orderCart";
import CheckoutPage from "@/components/pages/order/checkOut";
import { serverFetch } from "@/lib/fetch/serverFetch";
import CategoryCard from "@/components/pages/home/category";

const HomePage = async () => {
  const data = await serverFetch("/api/auth");
  // console.log(data);
  return (
    <div>
      <HeroSection data={data}  />
      {/* <CategoryCard  /> */}
      <AddToCartSection />
      <Feature />
      <ProductDetailsPage />
      <OrdersPage />
       <OrderCart />
      <CheckoutPage />

    </div>
  );
};

export default HomePage;