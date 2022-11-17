import { CategoriesContainer } from "./category-menu.styles.jsx";
import CategoryItem from "../category-item/category-item.component";

export default function CategoryMenu({ categories }) {
  return (
    <CategoriesContainer>
      {categories.map(({ title, id, imageUrl }) => {
        return <CategoryItem key={id} title={title} imageUrl={imageUrl} />;
      })}
    </CategoriesContainer>
  );
}
