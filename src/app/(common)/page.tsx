import AddToCartSection from "@/components/pages/products/productPage";
import Feature from "@/components/pages/home/feature";
import HeroSction from "@/components/pages/home/hero";
import ProductDetailsPage from "@/components/pages/products/productDetails";
import OrdersPage from "@/components/pages/order/getMyOrders";
import OrderCart from "@/components/pages/order/orderCart";
import CheckoutPage from "@/components/pages/order/checkOut";
import CategoryPage from "@/components/pages/home/category";

const HomePage = () => {
  return (
    <div>
      <HeroSction />
      <CategoryPage />
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