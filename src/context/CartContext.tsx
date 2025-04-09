import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

interface CartItemResponse {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface CartResponse {
  products: CartItemResponse[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch cart');
      }

      const data: CartResponse = await response.data;
      if (data && data.products) {
        const cartItems = data.products.map((item: CartItemResponse) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
        }));

        setCart(cartItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: CartItem) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const response = await axiosInstance.post('/cart/add', {
        productId: product._id,
      });

      const data = await response.data;

      if (response.status !== 200) {
        toast.error(data.error || 'Failed to add to cart');
        return;
      }

      await fetchCart();
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to remove items from cart');
      return;
    }

    try {
      const response = await axiosInstance.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;

      if (response.status !== 200) {
        toast.error(data.error || 'Failed to remove from cart');
        return;
      }

      await fetchCart();
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to update cart');
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/cart/update/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;

      if (response.status !== 200) {
        toast.error(data.error || 'Failed to update cart');
        return;
      }

      await fetchCart();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const clearCart = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    toast.success('Cart cleared');
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };
