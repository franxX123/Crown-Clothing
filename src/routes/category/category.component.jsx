import { CategoryContainer } from "./category.styles.jsx";
import ProductCard from "../../components/product-card/product-card.component";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/categories.context";
import { useContext, useEffect, useState } from "react";

export default function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  // NOTE: initially categoriesMap[category] is undefined
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  // Since categoriesMap is obtained asynchronously we must safeguard against it
  // in case the fetching is too slow.
  return (
    <CategoryContainer>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </CategoryContainer>
  );
}
