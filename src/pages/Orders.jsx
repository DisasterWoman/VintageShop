import Card from '../componets/Card';
import React from 'react';
import axios from 'axios';
import { GlobalContext } from '../App';

function Orders() {
    const {onAddToFavourites, onAddToCart} = React.useContext(GlobalContext)
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
       async function asyncData() {
           try {
               const { data } = await axios.get('https://624849c3229b222a3fd62848.mockapi.io/orders');
               //console.log(data.map(obj => obj.items).flat())
               setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], [])); 
               setIsLoading(false);
           } catch (error) {
               alert('Error ');
               console.error(error);
           }
        }
        asyncData()
    }, [])

    return (
        <div className='content'>
            <div className="search-container
            d-flex align-center justify-between mb-40">
                <h1>My orders</h1>
            </div>
            <div className='d-flex flex-wrap m-20'>
                {(isLoading ? [...Array(6)] : orders)
                    .map((item, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...item}

                        />
                    ))}
            </div>
        </div>
    );
}

export default Orders;