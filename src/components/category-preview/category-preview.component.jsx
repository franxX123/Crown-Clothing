import {
  CategoryPreviewContainer,
  PreviewComponent,
  TitleComponent,
} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";

export default function CategoryPreview({ title, products }) {
  return (
    <CategoryPreviewContainer>
      <h2>
        <TitleComponent to={title.toLowerCase()}>
          {title.toUpperCase()}
        </TitleComponent>
      </h2>

      <PreviewComponent>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return (
              <ProductCard key={product.id} product={product}></ProductCard>
            );
          })}
      </PreviewComponent>
    </CategoryPreviewContainer>
  );
}
