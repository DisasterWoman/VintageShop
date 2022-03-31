
    function Header(props) {
        return (
            <header className="d-flex justify-between align-center">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/images/icon.png" alt="logo" />
                    <div className="headerInfo">
                        <h3 className="text-uppercase">Vintage dress store</h3>
                        <p className="opacity-5">Dresses with history</p>
                    </div>
                </div>
                <ul className="d-flex">
                    <li className="mr-30 cu-p">
                        <img width={20} height={14} src="/images/cart.png" alt="logo"
                            onClick={props.onClickCart}
                        />
                        <span >12 00 $</span>
                    </li>
                    <li>
                        <img width={21} height={19} src="/images/heart-svgrepo-com.svg" alt="logo" />
                    </li>
                    <li>
                    <img src="/images/user.svg" />
                    </li>
                </ul>
            </header>
        )
    }
    export default Header;
