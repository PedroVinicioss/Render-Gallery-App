import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { addItemToCartService } from '../services/ProductsService.js'; 
import { getProduct } from '../services/ProductsService.js'; 

export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.carrinho) {
      setItems(user.carrinho);
    }
  }, [user]);

  async function addItemToCart(id, quantity) {
    try {
      await addItemToCartService(user.id, id, quantity);    
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      // Trate o erro conforme necessário
    }
  }

  async function removeItemFromCart(itemId) {
    try {
      await removeItemToCartService(user.id, itemId);
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.quantidade, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.price * item.quantidade, 0);
  }

  return (
    <CartContext.Provider
      value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice, removeItemFromCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
