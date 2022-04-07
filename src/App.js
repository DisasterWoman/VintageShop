import './App.scss';
import Header from './componets/Header';
import React from 'react';
import { Route } from 'react-router-dom'
import Drawer from './componets/Drawer';
import Home from './pages/Home'
import axios from 'axios';
import Favorites from './pages/Favorites';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [value, setValues] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

  const resetInputField = () => {
    setValues("");
  };

  React.useEffect(() => {
    async function fetchData () {
      
    const cartResponse = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/cart');
    const favResponse = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/favourites');
    const itemsResponse = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/Items');  
  
        setIsLoading(false)

        setCartItems(cartResponse.data);
        setFavorites(favResponse.data);
        setItems(itemsResponse.data);

    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://624849c3229b222a3fd62848.mockapi.io/cart/${obj.id}`);
       setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else { 
      axios.post('https://624849c3229b222a3fd62848.mockapi.io/cart', obj)
      setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
    }
  };
  const onRemoveItem = (id) => {
    axios.delete('https://624849c3229b222a3fd62848.mockapi.io/cart/' + id)
    setCartItems((prev) => prev.filter(items => items.id !== id));
  };
  const onAddToFavourites = async (item) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(item.id))) {
        axios.delete(`https://624849c3229b222a3fd62848.mockapi.io/favourites/${item.id}`);
        setFavorites((prev) => prev.filter((obj) => Number(obj.id) !== Number(item.id)));
      } else {
        const { data } = await axios.post('https://624849c3229b222a3fd62848.mockapi.io/favourites', item)
        setFavorites((prev) => [...prev, data])
        //console.log(resp.data);
      }
    } catch (err) {
      alert('Failed to add to favorites');
    }
  };
  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer
        onRemove={onRemoveItem}
        items={cartItems}
        onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <Route path="/" exact>
        <Home
              items={items}
              cartItems = {cartItems}
              value={value}
              setValues={setValues}
              resetInputField={resetInputField}
              onAddToCart={onAddToCart}
              onAddToFavourites={onAddToFavourites} 
              isLoading = {isLoading}
        />
      </Route>
      <Route path="/favorites" exact>
        <Favorites items={favorites}
          onAddToFavourites={onAddToFavourites} />
      </Route>
    </div>
  );
}

export default App;

