import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { addItemToFavService, getProduct } from '../services/ProductsService.js'; 

export const FavContext = createContext();

export function FavProvider(props) {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.favoritos) {
      setItems(user.favoritos);
    }
  }, [user]);

  async function addItemToFav(id) {
    try {
      const isItemInFav = getFavItem(id); 
  
      if (isItemInFav) {
        await addItemToFavService(user.id, id); 
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      } else {
        await addItemToFavService(user.id, id); 
        const product = await getProduct(id);
        setItems(prevItems => [
          ...prevItems,
          {
            id: id,
            nomeProduto: product.nomeProduto,
            path: product.path,
            price: product.price,
          },
        ]);
      }
    } catch (error) {
      console.error('Erro ao adicionar/remover item aos favoritos:', error);
    }
  }

  function getFavCount() {
    return items.length;
  }

  function getFavItem(id){
    return items.some(item => item.id === id);
  }

  return (
    <FavContext.Provider
      value={{ items, setItems, getFavCount, addItemToFav, getFavItem }}
    >
      {props.children}
    </FavContext.Provider>
  );
}
