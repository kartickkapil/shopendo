import ProductCard from "../features/product/product-card";
import inventoryData from "../assets/inventory.json";
import { IProduct } from "../typings/inventory.types";

const Products = () => {
  const products: IProduct[] = inventoryData.items;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} variant="grid" href={`/products/${product.id}/${product.name}`}>
          <ProductCard.Image />
          <ProductCard.Title className="mt-4">{product.name}</ProductCard.Title>
          <ProductCard.Description>
            {product.options.length > 1 ? `${product.options.length} colors` : product.options[0].color}
          </ProductCard.Description>
          <ProductCard.Price className="mt-2">{product.price} kr</ProductCard.Price>
        </ProductCard>
      ))}
    </div>
  );
};

export default Products;
