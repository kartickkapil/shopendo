import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CartItemRow from './cart-item-row';
import { TCartItem } from '../../context/cart-context';

const mockDispatch = vi.fn();

vi.mock('../../context/cart-context', () => {
  const actual = vi.importActual('../../context/cart-context');
  return {
    ...actual,
    useCart: () => ({ dispatch: mockDispatch }),
  };
});

describe('CartItemRow', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  const sampleItem: TCartItem = {
    product: {
      id: 1,
      name: 'Test Product',
      brand: 'TestBrand',
      price: '100',
      available: true,
      weight: 1,
      options: [{ color: 'red', quantity: 10 }],
    },
    variant: 'red',
    quantity: 1,
  };

  it('dispatches UPDATE_QUANTITY with incremented quantity when the increment button is clicked', () => {
    render(
      <MemoryRouter>
        <CartItemRow item={sampleItem} />
      </MemoryRouter>
    );
    const incrementButton = screen.getByRole('button', {
      name: /increment quantity/i,
    });
    fireEvent.click(incrementButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      productId: sampleItem.product.id,
      variant: sampleItem.variant,
      quantity: sampleItem.quantity + 1,
    });
  });

  it('dispatches UPDATE_QUANTITY with decremented quantity when the decrement button is clicked and quantity > 1', () => {
    const itemWithHigherQty = { ...sampleItem, quantity: 3 };
    render(
      <MemoryRouter>
        <CartItemRow item={itemWithHigherQty} />
      </MemoryRouter>
    );
    const decrementButton = screen.getByRole('button', {
      name: /decrement quantity/i,
    });
    fireEvent.click(decrementButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      productId: itemWithHigherQty.product.id,
      variant: itemWithHigherQty.variant,
      quantity: itemWithHigherQty.quantity - 1,
    });
  });

  it('dispatches REMOVE_ITEM when the decrement button is clicked and quantity is 1', () => {
    render(
      <MemoryRouter>
        <CartItemRow item={sampleItem} />
      </MemoryRouter>
    );
    const decrementButton = screen.getByRole('button', {
      name: /decrement quantity/i,
    });
    fireEvent.click(decrementButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      productId: sampleItem.product.id,
      variant: sampleItem.variant,
    });
  });
});
