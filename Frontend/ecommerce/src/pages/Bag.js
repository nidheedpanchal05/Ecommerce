// Code again
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  FaMinus,
  FaPlus,
  FaEye,
  FaTrash,
  FaCartArrowDown,
} from 'react-icons/fa';
import emptybag from '../images/empty-bag.png';
import '../styles/Bag.css';
import { useStateValue } from '../components/StateProvider';
import { Link } from 'react-router-dom';

const preImgUrl = 'http://127.0.0.1:8000';

const Bag = () => {
  const history = useHistory();
  const [{ bag }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let prices = [];
    bag.map((item) => {
      prices.push(item.price * item.quantity);
    });
    let total = prices.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b);
    }, 0);
    setTotal(parseInt(total));
  }, [quantity, bag]);

  const removeItem = (product) => {
    const confirmToRemove = window.confirm(
      'Sure You want to remove this item? '
    );
    if (confirmToRemove) {
      dispatch({
        type: 'REMOVE_FROM_BAG',
        item: product,
      });
    } else {
      return false;
    }
  };

  const handleQuantity = (changeValue, item) => {
    setTimeout(() => {
      setQuantity(item.quantity);
    }, 200);
    if (item.quantity > 0) {
      if (changeValue === 'INCREMENT') {
        item.quantity += 1;
        if (item.quantity >= 10 && changeValue === 'INCREMENT') {
          alert('cannot add more than 10');
          item.quantity = 10;
        }
      } else if (changeValue === 'DECREMENT') {
        item.quantity -= 1;
        if (item.quantity <= 0 && changeValue === 'DECREMENT') {
          const remove = removeItem(item);
          if (!remove) {
            item.quantity = 1;
          }
        }
      }
    }
  };

  const viewItem = (id) => {
    history.push(`/item/${id}`);
  };

  if (bag?.length !== 0) {
    return (
      <div>
        <section>
          <h1 className='header'>My Shopping Bag</h1>
          <p
            style={{ textAlign: 'center', padding: '0.5rem', color: '#3f3d56' }}
          >
            <span
              style={{
                fontSize: '2rem',
                textShadow: '2px 2px 2px #3b6e7c',
                padding: '0.5rem',
              }}
            >
              {bag?.length}
            </span>
            items in your shopping bag
          </p>
          <table className='bag-items'>
            <tbody>
              {bag.map((item) => {
                return (
                  <tr key={item.product_id} className='item-row'>
                    <td>
                      <img
                        className='bag-img view-item'
                        src={preImgUrl + item.prod_image}
                        alt={preImgUrl + item.prod_image}
                        onClick={() => viewItem(item.product_id)}
                      />
                    </td>
                    <td style={{ width: '40%' }}>{item.product_name}</td>
                    <td>&#x20b9; {item.price} </td>
                    <td>
                      <div className='quantity-btn'>
                        <button
                          type='button'
                          onClick={() => handleQuantity('DECREMENT', item)}
                        >
                          <FaMinus />
                        </button>
                        <input
                          type='number'
                          className='quantity'
                          disabled
                          min='1'
                          max='10'
                          value={item.quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button
                          type='button'
                          onClick={() => handleQuantity('INCREMENT', item)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    <td className='trash-item'>
                      <button
                        style={{ color: '#ea4335' }}
                        type='button'
                        onClick={() => removeItem(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='total'>
            Total : &#x20b9; {total}
            <button
              className='clear-bag'
              onClick={() => {
                if (window.confirm('All items will be removed. Sure?')) {
                  dispatch({
                    type: 'REMOVE_ALL',
                  });
                }
              }}
            >
              <FaTrash /> &nbsp; Empty My Bag
            </button>
          </div>
          <div>
            <button>Checkout</button>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className='empty'>
        <h2 className='header'>Your Bag is Empty</h2>
        <img src={emptybag} className='empty-bag' />

        <button className='shop-btn' onClick={() => history.push('/')}>
          <FaCartArrowDown /> &nbsp; Shop Now
        </button>
      </div>
    );
  }
};

export default Bag;
