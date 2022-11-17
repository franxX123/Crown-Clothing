// import SHOP_DATA from "../../shop-data.json";
import { CategoriesContext } from "../../context/categories.context";
import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        );
      })}
    </Fragment>
  );
}
