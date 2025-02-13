// ProductDetail.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import inventoryData from "../assets/inventory.json";
import { IProduct } from "../typings/inventory.types";
import Button from "../features/ui/button";
import { useCart } from "../context/cart-context";
import ProductDescription from "../features/product/product-description";
import ColorSelector from "../features/product/color-selector";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const productIdInt = Number(productId);
  const product: IProduct | undefined = inventoryData.items.find((item: IProduct) => item.id === productIdInt);

  const { dispatch, state } = useCart();

  console.log(state);

  const getUniqueColors = (product: IProduct): string[] => {
    return [
      ...new Set(product.options.flatMap((option) => (Array.isArray(option.color) ? option.color : [option.color]))),
    ];
  };

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [colorError, setColorError] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!product.available || isAdded) {
      console.log("Hmmm... that wont work :)");
      return;
    }

    if (!selectedColor) {
      setColorError(true);
      return;
    }

    setColorError(false);
    dispatch({ type: "ADD_ITEM", product, variant: selectedColor });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const colors = getUniqueColors(product);

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <div className="flex flex-col-reverse">
        <div>
          <div className="aspect-square w-full rounded-lg bg-gray-100 object-cover"></div>
        </div>
      </div>

      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <ProductDescription product={product} />

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          <ColorSelector
            availableColors={colors}
            selectedColor={selectedColor}
            onChange={(color) => setSelectedColor(color)}
            disabled={!product.available}
          />

          {colorError && <ErrorMessage message="Please select a color to continue." />}
          {!product.available && <ErrorMessage message="This product is currently unavailable." />}

          <div className="mt-10">
            <Button
              variant={isAdded ? "primary" : "secondary"}
              className="px-4 py-2 text-base"
              disabled={!product.available}
              type="submit"
            >
              {isAdded ? "Product added to bag!" : "Add to bag"}
            </Button>
          </div>
        </form>

        <section className="mt-12">
          <div className="border-t">
            <h3 className="py-6 text-sm font-medium text-gray-900">Features</h3>
            <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
              <li className="pl-2">Weight: {product.weight} kg</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }: { message: string }) => <p className="mt-4 text-sm text-red-600">{message}</p>;

export default ProductDetail;
