import React, { useState, useEffect } from 'react';
import { useFetch } from '../components/useFetch';
import '../styles/SingleProduct.css';

const url = 'http://127.0.0.1:8000';
const category_url = url + '/category/';

const AddProducts = () => {
  const { items } = useFetch(category_url);
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(1);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let retrivedSeller = JSON.parse(localStorage.getItem('login'));
    let formData = new FormData();

    const float_price = parseFloat(price).toFixed(2);

    formData.append('product_name', productName);
    formData.append('prod_image', image);
    formData.append('price', Number(float_price));
    formData.append('description', desc);
    formData.append('category', Number(category));
    formData.append('seller', retrivedSeller.seller_id);
    formData.append('stock', Number(stock));
    console.log('Form', formData);

    let result = await fetch(url + '/all-products/', {
      method: 'POST',
      body: formData,
    });
    alert('Posted');
  };

  return (
    <div>
      <h1 className='header'>Add Products</h1>
      <form onSubmit={(e) => handleSubmit(e)} id='add-products'>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='productName'>Product Name</label>
              </td>
              <td>
                <input
                  type='text'
                  name='productName'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder='Name'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='image'>Product Image</label>
              </td>
              <td>
                <input
                  type='file'
                  name='image'
                  accept='image/png, image/jpeg'
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  placeholder='Image File'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='price'>Price</label>
              </td>
              <td>
                <input
                  type='number'
                  name='price'
                  value={price}
                  id='price'
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='Price'
                  step='0.01'
                  min='100'
                  max='10000000'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='desc'>Description</label>
              </td>
              <td>
                <input
                  type='text'
                  name='desc'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder='Description'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='category'>Category</label>
              </td>
              <td>
                <select
                  name='category'
                  id='category'
                  defaultValue={1}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {items.map((item) => {
                    return (
                      <option key={item.category_id} value={item.category_id}>
                        {item.category_name}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='stock'>Stock</label>
              </td>
              <td>
                <input
                  type='number'
                  name='stock'
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder='Stock'
                  required
                  min='1'
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>Add</button>
              </td>
              <td>
                <button type='reset'>Reset </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddProducts;
