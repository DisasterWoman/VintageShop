import React from 'react'

const Card = ({id, imageUrl, title, price, onPlus, onFavorite, liked = false}) => {
    const [isAdded, setIsAdded] = React.useState(false);
    const onClickPlus = () => {
        onPlus({title, imageUrl, price, id})
        setIsAdded(!isAdded)
    }
    const [isAddedFav, setIsAddedFav] = React.useState(liked);
    const onClickFav = () => {
        onFavorite({title, imageUrl, price, id})
        setIsAddedFav(!isAddedFav)
    }
    return (
        <div className='d-flex flex-wrap'>
            <div className='card'>
                <div>
                    <img
                        src={isAddedFav ? '/images/heart-liked.png ' : '/images/heart-unliked.svg'}
                        width={23}
                        height={23}
                        alt="unliked"
                        onClick={onClickFav}
                    />
                </div>
                <img src={imageUrl}
                    className='item'
                    width="165" height="150"
                />
                <h5> {title} </h5>
                <div className="d-flex justify-between align-center m-20">
                    <div className="d-flex flex-column" >
                        <span>Price:</span>
                        <b>{price} $</b>
                    </div>
                    <img
                        src={isAdded ? '/images/checked.svg' : '/images/plus.svg'}
                        alt='plus'
                        onClick={onClickPlus}
                    />
                </div>
            </div>
        </div>

    )
}

export default Card;