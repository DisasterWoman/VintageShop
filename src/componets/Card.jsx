import React from 'react'

const Card = ({ imageUrl, title, price, onPlus }) => {
    const [isAdded, setIsAdded] = React.useState(false);
    const onClickPlus = () => {
        onPlus({title,imageUrl,price})
        setIsAdded(!isAdded)
    }
    const [isAddedFav, setIsAddedFav] = React.useState(true);
    const onClickFav = () => {
        setIsAddedFav(!isAddedFav)
    }
    return (
        <div className='d-flex flex-wrap'>
            <div className='card'>
                <div>
                    <img
                        src={isAddedFav ? '/images/heart-unliked.svg' : '/images/heart-liked.png'}
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