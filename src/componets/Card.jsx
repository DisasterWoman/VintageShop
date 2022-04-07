import React from 'react'
import ContentLoader from "react-content-loader";

const Card = ({id, imageUrl, title, price, onPlus, onFavorite, liked = false, added, loading}) => {
    const [isAdded, setIsAdded] = React.useState(added);
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
                {
                    loading ? (<ContentLoader
                        speed={2}
                        width={380}
                        height={360}
                        viewBox="0 0 300 300"
                        backgroundColor="#ffd5aa"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="40" ry="40" width="165" height="150" />
                        <rect x="0" y="162" rx="6" ry="6" width="165" height="17" />
                        <rect x="17" y="193" rx="7" ry="7" width="44" height="37" />
                        <rect x="110" y="198" rx="7" ry="7" width="26" height="26" />
                    </ContentLoader>) : (
                            <>
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
                            </>
                     )
                }
            </div>
        </div>
    )
}

export default Card;