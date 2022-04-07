


const Drawer = ({onRemove,onClose, items=[]}) => {
    return (
            <div className="overlay">
                <div className="drawer">
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
                                        src="/images/remove-btn.svg"
                                        alt="remove" />
                                </div>
                                ))}
                            </div>
                            <div className={"cartTotalBlock m-10"}>
                                <ul >
                                    <li>
                                        <span>Total:</span>
                                        <div> </div>
                                        <b>21 498 $ </b>
                                    </li>
                                </ul>
                                <button className={"brownBtn mb-20 ml-50"}> Checkout  <img
                                    className={"arrow"}
                                    width={13}
                                    height={12}
                                    src="/images/arrow.svg"
                                    alt="logo" />
                                </button>
                            </div>
                            </>
                        ) : (
                            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                                <img className="mb-20" width={150} height={150} src='/images/empty-cart.png' />
                                <h2>Empty cart</h2>
                                <p className="opacity-6">Add at least one dress to place an order.</p>
                            <button onClick={onClose}
                            className="brownBtn mt-10">
                                    Go back
                                </button>
                            </div>
                        )}
                </div>
            </div>
        
    )
}

export default Drawer;