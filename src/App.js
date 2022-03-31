import './App.scss';
import Header from './componets/Header';
import Carousel from './componets/Carousel';
import { SliderImages } from './data/SliderImages';
import SearchBlock from './componets/SearchBlock';
import Card from './componets/Card';
import React from 'react';
import Drawer from './componets/Drawer';
import axios from 'axios';
function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [value, setValues] = React.useState('');

  const resetInputField = () => {
    setValues("");
  };

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
   
    React.useEffect(() => {
      axios.get('http://localhost:3001/items')
      .then((res) => {
        setItems(res.data)
      });
      axios.get(' http://localhost:3001/cart')
      .then((res) => {
        setCartItems(res.data);
      });
    }, [])

  const onAddToCart = (obj) => {
    axios.post(' http://localhost:3001/cart', obj).then((res) => { setItems(res.data)
  })
    setCartItems((prev) => [...prev, obj]);
  };
  const onRemoveItem = (id) => {
    console.log(id);
     axios.delete('http://localhost:3001/cart/' + id)
     setCartItems((prev) => prev.filter(items => items.id !== id));
  }; 

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer
        onRemove={onRemoveItem}
        items={cartItems}
        onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className='content'>
        <Carousel slides={SliderImages} />
        <div className="search-container
            d-flex align-center justify-between mb-40  ">
          <h1>{value ? `Search by request: ${value}` : 'All dresses'}</h1>
          <div className='search-block d-flex'>
            <img className='mr-20 mt-5 mb-5' src='/images/search.svg' width={12} height={13} ></img>
            <input placeholder='Search...'
              value={value}
              onChange={(event) => setValues(event.target.value)
              }
            ></input>
            {value && (<img
              onClick={resetInputField}
              className='mr-5 mt-5 mb-5 remove'
              src='/images/remove-btn.svg'
              width={12} height={13}
            ></img>)}
          </div>
        </div>
        <div className='d-flex flex-wrap m-20'>
          {items
            .filter((obj) => obj.title.toLowerCase().includes(value.toLowerCase()))
            .map((obj) => (
              <Card
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                onPlus={(item) => onAddToCart(item)}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

