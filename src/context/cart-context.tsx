import { createContext, useReducer, useContext, ReactNode } from "react";
import { IProduct } from "../typings/inventory.types";

export type TCartItem = {
  product: IProduct;
  variant: string;
  quantity: number;
};

type TCartState = {
  items: TCartItem[];
  subtotal: number;
  totalQuantity: number;
};

type Action =
  | { type: "ADD_ITEM"; product: IProduct; variant: string }
  | { type: "REMOVE_ITEM"; productId: number; variant: string }
  | {
      type: "UPDATE_QUANTITY";
      productId: number;
      variant: string;
      quantity: number;
    };

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<{
  state: TCartState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const calculateCartTotals = (items: TCartItem[]) => {
  return items.reduce(
    (acc, item) => {
      const itemTotal = parseFloat(item.product.price) * item.quantity;
      acc.subtotal += itemTotal;
      acc.totalQuantity += item.quantity;
      return acc;
    },
    { subtotal: 0, totalQuantity: 0 }
  );
};

const cartReducer = (state: TCartState, action: Action): TCartState => {
  let newItems: TCartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id && item.variant === action.variant
      );

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.product.id && item.variant === action.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.product, variant: action.variant, quantity: 1 }];
      }
      break;
    }

    case "REMOVE_ITEM": {
      newItems = state.items.filter(
        (item) => !(item.product.id === action.productId && item.variant === action.variant)
      );
      break;
    }

    case "UPDATE_QUANTITY": {
      newItems = state.items.map((item) =>
        item.product.id === action.productId && item.variant === action.variant
          ? { ...item, quantity: Math.max(1, action.quantity) }
          : item
      );
      break;
    }

    default:
      return state;
  }

  const { subtotal, totalQuantity } = calculateCartTotals(newItems);
  return { items: newItems, subtotal, totalQuantity };
};

const initialCartState: TCartState = {
  items: [],
  subtotal: 0,
  totalQuantity: 0,
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>.");
  }
  return context;
};
