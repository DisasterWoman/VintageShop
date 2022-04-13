import Card from '../componets/Card';
import React from 'react';
import { GlobalContext } from '../App'

function Favorites({onAddToFavourites}) {
    const {favorites} = React.useContext(GlobalContext);
    //console.log(favorites)
    return(
        <div className='content'>
            <div className="search-container
            d-flex align-center justify-between mb-40">
            <h1>My favorite</h1>
            </div>
            <div className='d-flex flex-wrap m-20'>
                {favorites
                    .map((obj, item) => (
                        <Card
                            key={item}
                            title={obj.title}
                            price={obj.price}
                            imageUrl={obj.imageUrl}
                            id={obj.id}
                            liked={true}
                            onFavorite={onAddToFavourites}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Favorites;