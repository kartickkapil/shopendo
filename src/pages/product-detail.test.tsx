import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import ProductDetail from "./product-detail";

const mockDispatch = vi.fn();

vi.mock("../context/cart-context", () => ({
  useCart: () => ({
    dispatch: mockDispatch,
  }),
}));

vi.mock("../assets/inventory.json", () => ({
  default: {
    items: [
      {
        id: 1,
        name: "Test Product",
        brand: "TestBrand",
        price: "100",
        available: true,
        weight: 1,
        options: [
          { color: "red", quantity: 10 },
          { color: "blue", quantity: 10 },
        ],
      },
      {
        id: 2,
        name: "Unavailable Product",
        brand: "TestBrand",
        price: "100",
        available: false,
        weight: 1,
        options: [{ color: "red", quantity: 10 }],
      },
    ],
  },
}));

vi.mock("../features/product/color-selector", () => ({
  __esModule: true,
  default: ({ availableColors, onChange, disabled }: any) => (
    <div>
      {availableColors.map((color: string) => (
        <button key={color} onClick={() => onChange(color)} disabled={disabled}>
          {color}
        </button>
      ))}
    </div>
  ),
}));

const renderProductDetail = (productId: number, productName: string) => {
  render(
    <MemoryRouter initialEntries={[`/products/${productId}/${productName}`]}>
      <Routes>
        <Route path="/products/:productId/:productName" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(() => {
  mockDispatch.mockClear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("ProductDetail", () => {
  it("adds product to cart and shows visual feedback when added", async () => {
    renderProductDetail(1, "Test Product");

    const redButton = screen.getByRole("button", { name: /red/i });
    fireEvent.click(redButton);

    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    fireEvent.click(addToBagButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_ITEM",
      product: expect.objectContaining({ id: 1 }),
      variant: "red",
    });

    expect(addToBagButton).toHaveTextContent(/product added to bag!/i);

    await act(async () => {
      vi.runAllTimers();
    });
    expect(addToBagButton).toHaveTextContent(/add to bag/i);
  });

  it("shows an error if no color is selected and prevents adding to cart", () => {
    renderProductDetail(1, "Test Product");

    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    fireEvent.click(addToBagButton);

    expect(screen.getByText(/please select a color to continue/i)).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("disables the add to bag button when the product is unavailable", () => {
    renderProductDetail(2, "Unavailable Product");

    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    expect(addToBagButton).toBeDisabled();

    expect(screen.getByText(/this product is currently unavailable/i)).toBeInTheDocument();
  });
});
