import './App.scss';
import Header from './componets/Header';
import React from 'react';
import { Route } from 'react-router-dom'
import Drawer from'./componets/Drawer';
import Home from './pages/Home'
import axios from 'axios';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const GlobalContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [value, setValues] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  const resetInputField = () => {
   return setValues("");
  };

  React.useEffect(() => {
    async function fetchData() {

  try {

      const cartResponse = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/cart');
      const favResponse = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/favourites');
      const itemsResponse = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/Items');

      setIsLoading(false)
      setCartItems(cartResponse.data);
      setFavorites(favResponse.data);
      setItems(itemsResponse.data);
    }
   catch (error) {
    console.error('error making request')
   }
  }
    fetchData();
  }, []);

  const onAddToCart = async(obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
     await axios.delete(`https://624849c3229b222a3fd62848.mockapi.io/cart/${findItem.id}`);
       setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
      } else { 
      setCartItems((prev) => [...prev, obj]);
      const { data } = await axios.post('https://624849c3229b222a3fd62848.mockapi.io/cart', obj)
      setCartItems((prev) => prev.map(item => {
        if (item.parentId === data.parentId) {
          return{
            ...item,
            id: data.id
          };
        } else {
          return item;
        }
      }));
      }
    } catch (error) {
      console.error("error adding item to cart")
    }
  };
  const onRemoveItem = (id) => {
   try {
     axios.delete('https://624849c3229b222a3fd62848.mockapi.io/cart/' + id)
     setCartItems((prev) => prev.filter(items => items.id !== id));
   } catch (error) {
     console.error('error removing item from cart')
   }
  };
  
  const onAddToFavourites = async (item) => {
    try {
      if (favorites.find((favObj) => favObj.title === item.title)) {
        axios.delete(`https://624849c3229b222a3fd62848.mockapi.io/favourites/${item.id}`);
        setFavorites((prev) => prev.filter((obj) => obj.title !== item.title));
      } else {
      await axios.post('https://624849c3229b222a3fd62848.mockapi.io/favourites', item)
        setFavorites((prev) => [...prev, item])
      }
    } catch (err) {
      alert('Failed to add to favorites');
    }
  };
  const hasCartItem = (id) => { 
   return cartItems.some((addObj) => Number(addObj.parentId) === Number(id))
   };
   const hasFavItem = (title) => {
     return favorites.some((favObj) => favObj.title === title); 
   };
  return (
    <GlobalContext.Provider value={{ items, cartItems, setCartItems, favorites, hasCartItem, hasFavItem, setCartOpened, onAddToFavourites, onAddToCart}}>
      <div className="wrapper clear">
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
          />
          
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items} 
            cartItems={cartItems}
            value={value}
            setValues={setValues}
            resetInputField={resetInputField}
            onAddToCart={onAddToCart}
            onAddToFavourites={onAddToFavourites}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites 
            onAddToFavourites={onAddToFavourites} />
        </Route>
        <Route path="/orders" exact>
          <Orders 
            />
        </Route>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

