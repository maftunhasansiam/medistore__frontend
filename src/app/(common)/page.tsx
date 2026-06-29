import Feature from "@/components/pages/home/feature";
import HeroSection from "@/components/pages/home/hero";
import MedicinesPage from "./(products)/medicines/page";
import CategoryPage from "./(products)/category/page";

const HomePage = async () => {


  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryPage></CategoryPage>
      {/* <CategoryCard  /> */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8"></div>
        <MedicinesPage />
      </section>
      <Feature />
    </div>
  );
};

export default HomePage;