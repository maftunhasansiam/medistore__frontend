import Feature from "@/components/pages/home/feature";
import HeroSection from "@/components/pages/home/hero";
import ProductDetailsPage from "@/components/layout/products/productDetails";
import OrdersPage from "@/components/layout/order/getMyOrders";
import OrderCart from "@/components/layout/order/orderCart";
import CheckoutPage from "@/components/layout/order/checkOut";
import { serverFetch } from "@/lib/fetch/serverFetch";
import CategoryCard from "@/components/pages/home/category";
import MedicineCard from "@/components/layout/products/productPage";

const HomePage = async () => {
  const response = await serverFetch("/api/medicines", {
    method: "GET",
    cache: "no-store", //
  });

  const medicines = response?.data.data || [];
  console.log(medicines);

  // console.log(data);
  return (
    <div className="min-h-screen">
      <HeroSection medicines={medicines} />
      {/* <CategoryCard  /> */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Medicines</h2>
        </div>

        <MedicineCard medicines={medicines} />
      </section>
      <Feature />
      {/* <ProductDetailsPage />
      <OrdersPage />
      <OrderCart />
      <CheckoutPage /> */}

    </div>
  );
};

export default HomePage;