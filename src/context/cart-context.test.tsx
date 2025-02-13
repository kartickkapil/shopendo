import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./cart-context";
import { IProduct } from "../typings/inventory.types";

const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

const sampleProduct: IProduct = {
  id: 1,
  name: "Test Product",
  brand: "TestBrand",
  price: "100",
  available: true,
  weight: 1,
  options: [{ color: "red", quantity: 10 }],
};

describe("CartContext", () => {
  it("should add an item and update quantity if it exists", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "red",
      });
    });
    expect(result.current.state.items.length).toBe(1);
    expect(result.current.state.items[0].quantity).toBe(1);

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "red",
      });
    });
    expect(result.current.state.items.length).toBe(1);
    expect(result.current.state.items[0].quantity).toBe(2);
  });

  it("should add different product variant separately", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "red",
      });
    });
    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "blue",
      });
    });
    expect(result.current.state.items.length).toBe(2);
  });

  it("should update quantity of an item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "red",
      });
    });

    expect(result.current.state.items[0].quantity).toBe(1);
    expect(result.current.state.totalQuantity).toBe(1);
    expect(result.current.state.subtotal).toBe(100);

    act(() => {
      result.current.dispatch({
        type: "UPDATE_QUANTITY",
        productId: sampleProduct.id,
        variant: "red",
        quantity: 5,
      });
    });

    expect(result.current.state.items[0].quantity).toBe(5);
    expect(result.current.state.totalQuantity).toBe(5);
    expect(result.current.state.subtotal).toBe(500);
  });

  it("should remove an item from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "red",
      });
    });
    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        product: sampleProduct,
        variant: "blue",
      });
    });

    expect(result.current.state.items.length).toBe(2);
    expect(result.current.state.totalQuantity).toBe(2);
    expect(result.current.state.subtotal).toBe(200);

    act(() => {
      result.current.dispatch({
        type: "REMOVE_ITEM",
        productId: sampleProduct.id,
        variant: "red",
      });
    });

    expect(result.current.state.items.length).toBe(1);
    expect(result.current.state.items[0].variant).toBe("blue");
    expect(result.current.state.totalQuantity).toBe(1);
    expect(result.current.state.subtotal).toBe(100);
  });
});
