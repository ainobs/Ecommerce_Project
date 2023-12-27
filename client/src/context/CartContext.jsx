import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext(undefined);

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    email: '',
  });

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  //   function mergeCarts(localCart: CartItem[], remoteCart: CartItem[]): CartItem[] {
  //     const mergedCart = [...localCart];

  //     for (const remoteCartItem of remoteCart) {
  //       const existingItem = localCart.find((item) => item.id === remoteCartItem.id);
  //       if (!existingItem) {
  //         mergedCart.push(remoteCartItem);
  //       }
  //     }

  //     return mergedCart;
  //   }

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Calculate subtotal and total
  const subtotal = cart.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0
  );
  const total = subtotal;

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        // If it exists, update the quantity
        const updatedCart = prevCart.map((cartItem) =>
          cartItem._id === item._id ? item : cartItem
        );
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      } else {
        // If it doesn't exist, add it to the cart
        saveCartToLocalStorage([...prevCart, item]);
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      saveCartToLocalStorage(updatedCart); // Save cart data to localStorage
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        shippingInfo,
        setShippingInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
