import React, { useEffect } from 'react';
import { useFetch } from '../components/useFetch';
import { Link, useHistory } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import '../styles/Home.css';
import bannerImage from '../images/womens-fashion.png';

const url = 'http://127.0.0.1:8000';
const product_url = url + '/all-products/';

const Home = () => {
  const { loading, items } = useFetch(product_url);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('login')) {
      history.push('/seller');
    }
  });
  return (
    <div className='home'>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <h4 className='header'>Oops...</h4>
          Something went wrong. Try again Later
        </div>
      ) : (
        <section>
          <article className='banner'>
            <div></div>
            <div>
              <h3>Shop The Latest Trends.</h3>
              <p>
                Get upto flat 50% off on our famous Women's Summer Collection.
                Select from your favourite brands.
              </p>
              <button type='button'>Discover More</button>
            </div>
          </article>
          <article>
            <h3 className='section'>Latest Arrivals</h3>
            <div className='latest-container'>
              {items.slice(0, 4).map((item) => {
                return (
                  <div className='card' key={item.product_id}>
                    <img
                      className='card-img'
                      src={url + item.prod_image}
                      alt={url + item.prod_image}
                    />
                    <Link to={`/item/${item.product_id}`} className='card-item'>
                      View Product
                    </Link>
                    <h4 className='name'>{item.product_name}</h4>
                    <h6 className='price'> {item.price}</h6>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      )}
      <footer>
        <Link to='/signup'>
          Sign Up / Sign In <FaSignInAlt className='react-icons' />
        </Link>
      </footer>
    </div>
  );
};

export default Home;
