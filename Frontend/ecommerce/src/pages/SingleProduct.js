import React, { useState, useEffect } from 'react';
import { FaHeart, FaPlus, FaArrowLeft, FaStar } from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import { useFetch } from '../components/useFetch';
import { useStateValue } from '../components/StateProvider';

import '../styles/SingleProduct.css';
const url = 'http://127.0.0.1:8000';

const Seller = (props) => {
  const { sellerId } = props;
  const { loading, items } = useFetch(url + '/seller/');
  const sellers = items.filter((item) => {
    return item.seller_id === Number(sellerId);
  });
  const singleSeller = sellers.map((seller) => {
    return seller.company_name;
  });
  return <h3 className='brand'>{singleSeller}</h3>;
};

const SingleProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, items } = useFetch(url + '/all-products/');
  const [bagItem, isBagItem] = useState(false);
  const [{ bag }, dispatch] = useStateValue();

  const singleItem = items.filter((item) => {
    return item.product_id === Number(id);
  });

  useEffect(() => {
    const temp = bag.find((item) => item.product_id === Number(id));
    if (bag && temp) {
      isBagItem(true);
    }
  });

  const handleBag = (product) => {
    // Add item to bag
    // add quantity

    if (bagItem) {
      history.push('/my-bag');
    }
    if (!bagItem) {
      // add key value pair for quantity
      product['quantity'] = 1;
      isBagItem(true);
      dispatch({
        type: 'ADD_TO_BAG',
        item: product,
      });
    }
  };

  return (
    <div className='main'>
      <button className='btn' onClick={() => history.goBack()}>
        <FaArrowLeft /> Back
      </button>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {singleItem.map((item) => {
            return (
              <div key={item.product_id} className='container'>
                <div className='img-container'>
                  <img src={url + item.prod_image} alt={item.product_name} />
                </div>
                <div className='product-info'>
                  <Seller sellerId={item.seller} />
                  <h1 className='name'>{item.product_name}</h1>
                  <h2 className='price'>&#x20b9; {item.price}</h2>
                  <p className='sub-title stock'>
                    {item.stock && item.stock > 0
                      ? `Stock Left: ${item.stock}`
                      : 'Out of Stock'}
                  </p>
                  <h5 className='desc'>{item.description}</h5>
                  <p>
                    Ratings
                    <span className='rating'>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </span>
                  </p>
                  <p className='sub-title'>
                    About Product
                    <button>
                      <FaPlus />
                    </button>
                  </p>

                  <button
                    className='bag-btn'
                    onClick={() => handleBag(item)}
                    type='button'
                  >
                    {bagItem ? 'Go To Cart' : 'Add To Bag'}
                  </button>
                  <button className='wish-btn' type='button'>
                    <FaHeart />
                    <span style={{ width: '10px' }}></span>
                    Wish List
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
