import { Link } from "react-router-dom";
import Dropdown from "../ui/dropdown";
import { useCart } from "../../context/cart-context";
import CartItemRow from "../cart/cart-item-row";
import { BagIcon } from "../ui/icons/icons";
import EmptyCart from "../cart/empty-cart";

const Navbar = () => {
  const { state } = useCart();

  return (
    <>
      <header className="relative bg-white">
        <nav className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative border-b border-gray-200 px-4 sm:static sm:px-0">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1">
                <Link to="/">Shopendo</Link>
              </div>
              <div className="flex">
                <div className="flow-root text-sm lg:relative lg:ml-8">
                  <Dropdown
                    trigger={
                      <button type="button" className="group -m-2 flex items-center p-2" aria-expanded="false">
                        <BagIcon />
                        <span className="ml-2 text-sm font-medium text-gray-500 group-hover:text-gray-800">
                          {state.totalQuantity}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </button>
                    }
                  >
                    {state.totalQuantity === 0 ? (
                      <EmptyCart />
                    ) : (
                      <>
                        <h2 className="sr-only">Shopping Cart</h2>
                        <div className="mx-auto max-w-2xl px-4">
                          <ul role="list" className="divide-y divide-gray-200">
                            {state.items.map((item) => (
                              <CartItemRow key={`${item.product.id}-${item.variant}`} item={item} />
                            ))}
                          </ul>

                          <div className="border-t border-gray-200 pt-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>{state.subtotal} kr</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping is calculated at checkout.</p>
                            <div className="mt-6">
                              <Link
                                to="/checkout"
                                className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-xs hover:bg-green-700"
                              >
                                Checkout
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
