
import { create } from 'zustand';
import type { Product, Order } from './data';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type Address = {
    id: string;
    type: 'Home' | 'Work';
    line1: string;
    city: string;
    state: string;
    zip: string;
    isPrimary: boolean;
}

type PaymentMethod = {
    id: string;
    type: 'Visa' | 'Mastercard';
    last4: string;
    isPrimary: boolean;
}


type User = {
    name: string;
    email: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
}

type AuthState = {
    isLoggedIn: boolean;
    user: User | null;
    login: () => void;
    logout: () => void;
}

const mockUser: User = {
    name: "John Doe",
    email: "johndoe@milkyway.com",
    addresses: [
        { id: 'addr1', type: 'Home', line1: "123 Dairy Lane", city: "Mootown", state: "CA", zip: "90210", isPrimary: true },
        { id: 'addr2', type: 'Work', line1: "456 Corporate Blvd", city: "Metropolis", state: "NY", zip: "10001", isPrimary: false },
    ],
    paymentMethods: [
        { id: 'pay1', type: 'Visa', last4: '1234', isPrimary: true }
    ]
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: () => set({ isLoggedIn: true, user: mockUser }),
            logout: () => set({ isLoggedIn: false, user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

type OrderState = {
    orders: Order[];
    addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order: Order) => set((state) => ({ orders: [order, ...state.orders] })),
        }),
        {
            name: 'order-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
