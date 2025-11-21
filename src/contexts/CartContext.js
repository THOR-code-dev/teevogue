import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'becca-giyim-cart';

const defaultItem = (product, options = {}) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  image: product.heroImage || product.image,
  gender: product.gender,
  category: product.category,
  color: options.color || null,
  size: options.size || null,
  quantity: options.quantity || 1,
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.warn('Sepet verisi okunamadı', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, options) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && item.size === options?.size && item.color === options?.color
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += options?.quantity || 1;
        return updated;
      }
      return [...prev, defaultItem(product, options)];
    });
  };

  const updateQuantity = (productId, quantity, meta = {}) => {
    if (quantity <= 0) return removeItem(productId, meta);
    setItems(prev => prev.map(item => {
      if (item.id === productId && item.size === meta.size && item.color === meta.color) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeItem = (productId, meta = {}) => {
    setItems(prev => prev.filter(item => 
      !(item.id === productId && item.size === meta.size && item.color === meta.color)
    ));
  };

  const clearCart = () => setItems([]);

  const summary = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, subtotal, currency: 'TRY' };
  }, [items]);

  const value = {
    items,
    summary,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart yalnızca CartProvider içinde kullanılabilir');
  }
  return context;
};
