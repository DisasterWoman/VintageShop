import React from 'react'
import ContentLoader  from "react-content-loader";
import { GlobalContext } from "../../App"
import styles from './Card.module.scss';

const Card = ({id, imageUrl, title, price, onPlus, onFavorite, loading = false}) => {

    const { hasCartItem } = React.useContext(GlobalContext);
    const { hasFavItem } = React.useContext(GlobalContext);
    const obj = { title, imageUrl, price, id, parentId: id};
    const onClickPlus = () => {
        onPlus(obj)
    }
    const onClickFav = () => {
        onFavorite(obj)
    }
    return (
        <div className={styles.container}>
            <div className= {styles.card}>
                {
                    loading ? (<ContentLoader
                        className={styles.loader}
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
                            {onFavorite && (
                                        <img
                                            src={hasFavItem(title) ? 'images/heart-liked.png ' : 'images/heart-unliked.svg'}
                                            width={23}
                                            height={23}
                                            alt="unliked"
                                            onClick={onClickFav}
                                        />
                            )}
                            </div>
                                <img src={imageUrl}
                                    className={styles.item}
                                    width="165" height="150"
                                />
                                <h5> {title} </h5>
                                <div className="d-flex justify-between align-center m-20">
                                    <div className="d-flex flex-column" >
                                        <span>Price:</span>
                                        <b>{price} $</b>
                                    </div>
                                    {onPlus && (<img
                                        className={styles.plus}
                                        src={hasCartItem(id) ? 'images/checked.svg' : 'images/plus.svg'}
                                        alt='plus'
                                        onClick={onClickPlus}
                                    />
                                    )}
                            </div>
                        </>
                     )
                }
            </div>
        </div>
    )
}

export default Card;