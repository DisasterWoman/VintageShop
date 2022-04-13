import { Link } from "react-router-dom";
import { GlobalContext } from "../App";
import React from 'react'

    function Header(props) {
        const { cartItems } = React.useContext(GlobalContext);
        const priceCounter = cartItems.reduce((total, obj) => (obj.price + total), 0)
        return (
            <header className="d-flex justify-between align-center">
                <Link to = "/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="images/icon.png" alt="logo" />
                    <div className="headerInfo">
                        <h3 className="text-uppercase">Vintage dress store</h3>
                        <p className="opacity-5">Dresses with history</p>
                    </div>
                </div>
                </Link>
                <ul className="d-flex">
                    <li className="mr-30 cu-p">
                        <img width={20} height={14} src="images/cart.png" alt="cart"
                            onClick={props.onClickCart}
                        />
                        <span onClick={props.onClickCart} >{priceCounter} $</span>
                    </li>
                    <li>
                    <Link to = "/favorites">
                        <img width={21} height={19} src="images/heart-svgrepo-com.svg" alt="heart" />
                    </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                    <img src="images/user.svg" alt='user' />
                        </Link>
                    </li>
                </ul>
            </header>
        )
    }
    export default Header;
