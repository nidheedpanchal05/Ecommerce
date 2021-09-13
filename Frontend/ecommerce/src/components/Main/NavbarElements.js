import React, { useEffect } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useFetchCategory } from '../fetchCategory';
import { useStateValue } from '../StateProvider';

const Navbar = () => {
  const [{ bag }, dispatch] = useStateValue();

  const history = useHistory();
  const url = 'http://127.0.0.1:8000/category/';
  const { categories } = useFetchCategory(url);

  useEffect(() => {
    localStorage.getItem('login');
  }, [url]);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    window.location.reload();
  };
  return (
    <div className='navbar'>
      {localStorage.getItem('login') ? (
        <ul>
          <li style={{ fontSize: '1.2rem', color: '#ffecee' }}>
            Welcome {JSON.parse(localStorage.getItem('login')).seller_name}
          </li>
          <li>
            <Link to='/' onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {categories.map((category, index) => {
            return (
              <li key={index}>
                <Link to={'/catalog/' + category.category_name}>
                  {category.category_name}
                </Link>
              </li>
            );
          })}
          <li>
            <Link className='icon-btn' to='/my-bag'>
              <FaShoppingBag />
              <sup className='countBagItems'>{bag?.length}</sup>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
