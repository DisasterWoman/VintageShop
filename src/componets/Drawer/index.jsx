import React from 'react';
import axios from 'axios';
import { GlobalContext } from "../../App";
import Info from "../Info";
import styles from './Drawer.module.scss';
console.log(styles)


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onRemove, onClose, items=[], opened }) => {

    const { cartItems, setCartItems } = React.useContext(GlobalContext);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [orderId, setOrserId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const priceCounter = cartItems.reduce((total, obj) => (obj.price + total), 0)

    const onClickOrder = async () => {
      try {
          setIsLoading()
          const { data } = await axios.post('https://624849c3229b222a3fd62848.mockapi.io/orders', {items: cartItems});
          setOrserId(data.id); 
          setIsCompleted(true);
          setCartItems([]);

          for (let i = 0; i < cartItems.length; i++) {
              const item = cartItems[i];
             await axios.delete('https://624849c3229b222a3fd62848.mockapi.io/cart/' + item.id)
             await delay(1000);
          } 

      } catch (error) {
          console.log('Order was not completed')
      }
      setIsLoading(false);
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : '' }`}>
                <div className={styles.drawer}>
                    <h2 className={" d-flex justify-between m-20 "}>Cart<img
                        className={"remove-btn  cu-p"}
                        onClick={onClose}
                        width={23}
                        height={23}
                        src="/images/remove-btn.svg"
                        alt="close" /> </h2>
                        {items.length > 0 ? (
                            <>
                            <div className="items">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <img src={obj.imageUrl}
                                        width={70}
                                        height={70}
                                    />
                                    <div className={"mr-20 flex"}>
                                        <p className={"mb-5"}>{obj.title} </p>
                                        <span>Price: </span>
                                        <b>{obj.price} $</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className={"remove-btn"}
                                        width={15}
                                        height={15}
                                        src="images/remove-btn.svg"
                                        alt="remove" />
                                </div>
                                ))}
                            </div>
                            <div className={"cartTotalBlock m-10"}>
                                <ul >
                                    <li>
                                        <span>Total:</span>
                                        <div> </div>
                                        <b>{priceCounter} $ </b>
                                    </li>
                                </ul>
                            <button disabled = {isLoading} onClick={onClickOrder} className={"brownBtn mb-20 ml-50"}> Checkout  <img
                                    className={"arrow"}
                                    width={13}
                                    height={12}
                                    src="images/arrow.svg"
                                    alt="logo" />
                                </button>
                            </div>
                            </>
                        ) : (
                    <Info title={isCompleted ? "Order completed" : "Empty cart"}
                            description={isCompleted ? `Your order # ${orderId} is on the way ` : "Add at least one dress to place an order."} 
                            image={isCompleted ? 'images/thank-you.png' : 'images/empty-cart.png'}
                             />
                        )}
                </div>
            </div>
    )
}

export default Drawer;