import React from 'react'
import { GlobalContext } from '../App';

export const Info = ({image, title, description}) => {
    const { setCartOpened} = React.useContext(GlobalContext)
  return (
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
          <img className="mb-20" width={170} height={170} src={image} />
          <h2>{title}</h2>
          <p className="opacity-6">{description}</p>
          <button onClick={() => { setCartOpened(false) }}
              className="brownBtn mt-10">
              Go back
          </button>
      </div>
  )
};
export default Info;
