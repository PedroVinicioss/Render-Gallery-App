import React, {createContext, useState} from 'react';

import { getProduct } from '../services/ProductsService.js';

export const FavContext = createContext();

export function FavProvider(props) {
  const [items, setItems] = useState([]);
  
  function addItemToFav(id) {
    const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == id));
      if(!item) {
          return [...prevItems, {
              id,
              qty: 1,
              product,
              totalPrice: product.price 
          }];
      }
      else { 
        return prevItems.filter((item) => item.id !== id);
      }
    });

  }

  function getFavCount() {
      return items.reduce((sum, item) => (sum + item.qty), 0);
  }
  
  function getFavItem(id){
    const item = items.find((item) => (item.id == id));
    if(item){
      return true;
    }
    return false;
  }

  function getTotalPrice() {
      return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }  
  
  return (
    <FavContext.Provider 
      value={{items, setItems, getFavCount, addItemToFav, getTotalPrice, getFavItem}}>
      {props.children}
    </FavContext.Provider>
  );
}

