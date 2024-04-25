import { create } from "zustand";
import { CartData } from "./data";
import { Cart } from "./types";

interface CartQuery {
  carts: Cart[];
  total: number;
  totalQuantity: number;
}

interface CartQueryStore {
  cartQuery: CartQuery;
  setRemoveCart: (id: string) => void;
  setIncrease: (id: string) => void;
  setDecrease: (id: string) => void;
  clearCart: () => void;
}

const initialQuantity = CartData.reduce((acc, cart) => acc + cart.amount, 0);
const initialTotalPrice = CartData.reduce(
  (acc, cart) => acc + parseFloat(cart.price),
  0
);

const useCartQueryStore = create<CartQueryStore>((set) => {
  const cartQuery: CartQuery = {
    carts: CartData,
    total: initialTotalPrice,
    totalQuantity: initialQuantity,
  };

  return {
    cartQuery,
    setRemoveCart: (id) => {
      set((state) => ({
        cartQuery: {
          ...state.cartQuery,
          carts: state.cartQuery.carts.filter((cart) => cart.id !== id),
          total:
            state.cartQuery.total -
            (state.cartQuery.carts.find((cart) => cart.id === id)?.amount ||
              0) *
              parseFloat(
                state.cartQuery.carts.find((cart) => cart.id === id)?.price ||
                  "0"
              ),
          totalQuantity:
            state.cartQuery.totalQuantity -
            (state.cartQuery.carts.find((cart) => cart.id === id)?.amount || 0),
        },
      }));
    },
    setIncrease: (id) => {
      set((state) => ({
        cartQuery: {
          ...state.cartQuery,
          carts: state.cartQuery.carts.map((cart) =>
            cart.id === id ? { ...cart, amount: cart.amount + 1 } : cart
          ),
          total:
            state.cartQuery.total +
            parseFloat(
              state.cartQuery.carts.find((cart) => cart.id === id)?.price || "0"
            ),
          totalQuantity: state.cartQuery.totalQuantity + 1,
        },
      }));
    },
    setDecrease: (id) => {
      set((state) => ({
        cartQuery: {
          ...state.cartQuery,
          carts: state.cartQuery.carts.map((cart) =>
            cart.id === id ? { ...cart, amount: cart.amount - 1 } : cart
          ),
          total:
            state.cartQuery.total -
            parseFloat(
              state.cartQuery.carts.find((cart) => cart.id === id)?.price || "0"
            ),
          totalQuantity: state.cartQuery.totalQuantity - 1,
        },
      }));
    },
    clearCart: () => {
      set((state) => ({
        cartQuery: {
          ...state.cartQuery,
          carts: [],
          total: 0,
          totalQuantity: 0,
        },
      }));
    },
  };
});

export default useCartQueryStore;
