import { IProduct } from "../../typings/inventory.types";
import Badge from "../ui/badge";

interface ProductDescriptionProps {
  product: IProduct;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
        <Badge variant="success">{product.brand}</Badge>
      </div>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">{product.price} kr</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base text-gray-700">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
