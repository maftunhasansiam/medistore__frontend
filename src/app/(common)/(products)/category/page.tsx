import CategoryCard from "@/components/pages/home/category";
import { serverFetch } from "@/lib/fetch/serverFetch";
import React from "react";

const CategoryPage = async () => {
  const category = await serverFetch("/api/categories", {
    method: "GET",
  });
  // console.log(category.data);
  return (
    <div>
      <CategoryCard category={category} />
    </div>
  );
};

export default CategoryPage;