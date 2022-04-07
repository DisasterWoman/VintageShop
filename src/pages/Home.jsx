import Card from '../componets/Card';
import Carousel from '../componets/Carousel';
import { SliderImages } from '../data/SliderImages';

function Home({ value, setValues, resetInputField, items, onAddToCart, onAddToFavourites, cartItems, isLoading}) {

    const renderItems = () => {
        return (isLoading ? [...Array(6)] : items.filter((obj) => obj.title.toLowerCase().includes(value.toLowerCase()))) 
                    
                    .map((obj, index) => (
                        <Card
                            key={index}
                            onPlus={(item) => onAddToCart(item)}
                            onFavorite={(item) => onAddToFavourites(item)}
                            added={cartItems.some((addObj) => Number(addObj.id) === Number(obj.id))}
                            loading={isLoading}
                            {...obj}
                        />
                    ))
    };
    return(
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
            {console.log(cartItems, items)}
            <div className='d-flex flex-wrap m-20'>
                {renderItems()}
            </div>
        </div>
    );
}
export default Home;