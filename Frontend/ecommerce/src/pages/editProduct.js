import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useFetchCategory } from '../components/fetchCategory';
import '../styles/EditModal.css';
import axios from 'axios';

const url = 'http://127.0.0.1:8000';

const EditProduct = (props) => {
  const { productDetails, isOpen, hide, reFetch } = props;
  const { categories } = useFetchCategory(url + '/category/');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setName(productDetails[0].product_name);
      setImage(url + productDetails[0].prod_image);
      setPrice(productDetails[0].price);
      setDesc(productDetails[0].description);
      setCategory(productDetails[0].category);
      setStock(productDetails[0].stock);
      console.log(productDetails[0], url + productDetails[0].prod_image);
    }
  }, [isOpen]);

  const handleSubmit = async (e, itemId) => {
    e.preventDefault();

    let retrivedSeller = JSON.parse(localStorage.getItem('login'));
    let formData = new FormData();

    const float_price = parseFloat(price).toFixed(2);

    formData.append('product_name', name);
    formData.append('prod_image', image);
    formData.append('price', Number(float_price));
    formData.append('description', desc);
    formData.append('category', category);
    formData.append('seller', retrivedSeller.seller_id);
    formData.append('stock', stock);

    let result = await fetch(url + `/all-products/${itemId}/`, {
      method: 'PUT',
      body: formData,
    }).then((res) => {
      console.log(res);
      if (res.ok === true) {
        alert('Updated');
        hide();
        reFetch();
      }
    });
  };

  if (isOpen) {
    return (
      <div className='modal'>
        {productDetails.map((item) => {
          return (
            <div key={item.product_id}>
              <div className='modal-head'>
                <h2>{item.product_id} Edit Product</h2>
                <button className='close-btn' type='button' onClick={hide}>
                  <FaTimes />
                </button>
              </div>

              <div className='modal-content'>
                <form
                  name='edit-form'
                  onSubmit={(e) => handleSubmit(e, item.product_id)}
                  id='edit-products'
                >
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
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            placeholder='Price'
                            step='0.01'
                            min='100'
                            max='10000000'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                            placeholder='Description'
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
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
                            defaultValue={productDetails[0].category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categories.map((item) => {
                              return (
                                <option
                                  key={item.category_id}
                                  value={item.category_id}
                                >
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
                            placeholder='Stock'
                            min='1'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button type='submit'>Add</button>
                        </td>
                        <td>
                          <button type='reset'>Fill</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default EditProduct;
