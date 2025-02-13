import { useCart, TCartItem } from "../../context/cart-context";
import ProductCard from "../product/product-card";
import { MinusIcon, PlusIcon, TrashIcon } from "../ui/icons/icons";

const CartItemRow: React.FC<{ item: TCartItem }> = ({ item }) => {
  const { dispatch } = useCart();

  const handleIncrement = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      productId: item.product.id,
      variant: item.variant,
      quantity: item.quantity + 1,
    });
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      dispatch({
        type: "REMOVE_ITEM",
        productId: item.product.id,
        variant: item.variant,
      });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        productId: item.product.id,
        variant: item.variant,
        quantity: item.quantity - 1,
      });
    }
  };

  return (
    <ProductCard variant="list">
      <ProductCard.Image variant="small" />
      <div className="ml-4 flex-auto">
        <div className="flex justify-between items-start">
          <div>
            <ProductCard.Title>
              <a href={`/products/${item.product.id}/${item.product.name}`}>{item.product.name}</a>
            </ProductCard.Title>
            <ProductCard.Description>{item.variant}</ProductCard.Description>
          </div>
          <ProductCard.Price>{item.product.price} kr</ProductCard.Price>
        </div>
        <div className="mt-4">
          <span className="inline-flex items-center border border-gray-400 rounded-full">
            <button onClick={handleDecrement} className="p-1 focus:outline-none" aria-label="Decrement quantity">
              {item.quantity === 1 ? <TrashIcon /> : <MinusIcon />}
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button onClick={handleIncrement} className="p-1 focus:outline-none" aria-label="Increment quantity">
              <PlusIcon />
            </button>
          </span>
        </div>
      </div>
    </ProductCard>
  );
};

export default CartItemRow;
