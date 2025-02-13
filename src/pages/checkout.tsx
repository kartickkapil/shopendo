import { useCart } from "../context/cart-context";
import CartItemRow from "../features/cart/cart-item-row";
import EmptyCart from "../features/cart/empty-cart";
import OrderSummary from "../features/checkout/order-summary";
import CheckoutForm from "../features/checkout/checkout-form";

export default function Checkout() {
  const { state } = useCart();

  const shippingCost = 99;

  if (state.totalQuantity === 0) {
    return <EmptyCart />;
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Checkout form submitted.");
  };

  return (
    <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
      <div className="mx-auto w-full max-w-lg">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {state.items.map((item) => (
              <CartItemRow key={`${item.product.id}-${item.variant}`} item={item} />
            ))}
          </ul>
        </div>

        <OrderSummary subtotal={state.subtotal} shippingCost={shippingCost} />
      </div>

      <div className="mx-auto w-full max-w-lg">
        <CheckoutForm onSubmit={handleFormSubmit} />

        <div className="mt-10 divide-y divide-gray-200 border-t border-b border-gray-200">
          <button
            type="button"
            disabled
            className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
          >
            Shipping and Payment details
          </button>
          <button
            type="button"
            disabled
            className="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
