import CategoryCard from "@/components/categoryCard";
import { serverFetch } from "@/lib/fetch/serverFetch";


const CategoryPage = async () => {
  const category = await serverFetch("/api/categories", {
    method: "GET",
  });

  return (
    <div>
      <CategoryCard category={category} />
    </div>
  );
};

export default CategoryPage;