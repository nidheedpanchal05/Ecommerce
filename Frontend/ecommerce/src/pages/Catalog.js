import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../components/useFetch';
import { useFetchCategory } from '../components/fetchCategory';
import '../styles/Catalog.css';
import Dropdown from '../components/Dropdown';

const url = 'http://127.0.0.1:8000';

const Catalog = () => {
  const { name } = useParams();
  const [producturl, setProductUrl] = useState(url + '/all-products/products');
  const { categories } = useFetchCategory(url + '/category/');
  const { loading, items, getItems } = useFetch(producturl);
  const [categoryId, setCategoryId] = useState(0);
  const products = items;

  const options = [
    { value: '1', label: 'Latest' },
    { value: '2', label: 'Price High to Low' },
    { value: '3', label: 'Price Low to High' },
    { value: '4', label: 'Oldest' },
  ];

  const handleSelect = (filterOption) => {
    // Data from Dropdown component

    let filterUrl = url + '/all-products/products?ordering=';
    setTimeout(() => {
      if (filterOption === '1') {
        setProductUrl(filterUrl + '-date_added');
      } else if (filterOption === '2') {
        setProductUrl(filterUrl + '-price');
      } else if (filterOption === '3') {
        setProductUrl(filterUrl + 'price');
      } else if (filterOption === '4') {
        setProductUrl(filterUrl + 'date_added');
      } else {
        setProductUrl(producturl);
      }
    }, 100);
  };

  useEffect(() => {
    const changeCategory = categories.map((item) => {
      if (name === item.category_name) {
        setCategoryId(item.category_id);
      }
    });
  });

  return (
    <>
      {loading ? (
        <h1 className='title'>Loading</h1>
      ) : (
        <div>
          <h1 className='title'>{name}'s Fashion Catalog</h1>
          <div className='cat-container'>
            <div className='filters'>
              <p className='title'>Apply Filters</p>
              <form>
                <ul>
                  <li>
                    Sort By
                    <Dropdown
                      data={options}
                      defaultSelected='1'
                      parentCallback={handleSelect}
                    />
                  </li>
                  <li>
                    <label htmlFor='discount'>
                      <input
                        type='checkbox'
                        name='discount'
                        className='filter-item'
                      />
                      Discount
                    </label>
                  </li>
                </ul>
                <button className='filter-item' type='reset'>
                  Clear Filters
                </button>
              </form>
            </div>
            <div className='catalog'>
              {products.map((item) => {
                if (item && item.category === categoryId) {
                  return (
                    <Link
                      to={`/item/${item.product_id}`}
                      className='item-container'
                      key={item.product_id}
                    >
                      <div className='catalog-card' key={item.product_id}>
                        <img
                          className='catalog-card-img'
                          src={item.prod_image}
                          alt={item.prod_image}
                        />

                        <h4 className='catalog-name'>{item.product_name}</h4>
                        <h6 className='catalog-price'>&#x20b9; {item.price}</h6>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Catalog;
