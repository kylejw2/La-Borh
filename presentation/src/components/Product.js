import React from 'react';

const Product = (props) => {
    return (
        <div className='product'>
            <img src={props.image} width={props.width} alt=''/>
            <h6>{props.name}</h6>
            <h6>$ {props.price}</h6>
        </div>
    )
}

export default Product;