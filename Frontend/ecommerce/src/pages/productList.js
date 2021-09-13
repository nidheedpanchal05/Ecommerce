import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFetch } from '../components/useFetch';
import { useFetchCategory } from '../components/fetchCategory';
//import { axios } from 'axios';
import EditProduct from './editProduct';

const url = 'http://127.0.0.1:8000';

const ProductList = () => {
  const { categories } = useFetchCategory(url + '/category/');
  const { loading, items, getItems } = useFetch(url + '/all-products/');
  const [productDetails, setProductDetails] = useState({});
  const [show, setShow] = useState(false);
  const sellerInfo = JSON.parse(localStorage.getItem('login'));
  const sellerId = sellerInfo.seller_id;

  const handleDelete = (itemId) => {
    const sellerConfirm = window.confirm('Sure You want to delete ?');
    if (sellerConfirm) {
      fetch(url + `/all-products/${itemId}/`, {
        method: 'DELETE',
      }).then((result) => {
        console.log(result);
        console.log('Deleted Item', itemId);
      });
      setTimeout(() => {
        getItems();
      }, 500);
    } else {
      console.log('Delete cancel', itemId);
    }
  };

  const showModal = (pid) => {
    setProductDetails(
      items.filter((item) => {
        return item.product_id === pid;
      })
    );

    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#1b6e7c' }}>
          <h1>No Products. </h1>
          <Link to='/seller/addproducts'>Start Adding Now</Link>
        </div>
      ) : (
        <div className='table-container'>
          <h1 className='header'>Product List</h1>

          <table className='list-table'>
            <tbody>
              <tr className='table-headers'>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Edit / Delete</th>
              </tr>
              {items
                .filter((prod) => prod.seller === sellerId)
                .map((item) => {
                  return (
                    <tr key={item.product_id}>
                      <td>
                        <img
                          className='list-item-img'
                          src={url + item.prod_image}
                          alt={url + item.prod_image}
                        />
                      </td>
                      <td>{item.product_name}</td>
                      <td>{item.price}</td>
                      <td>
                        {item.category &&
                          categories
                            .filter((cat) => cat.category_id === item.category)
                            .map((category) => {
                              return category.category_name;
                            })}
                      </td>
                      <td>{item.stock}</td>
                      <td>
                        <div className='edit-col'>
                          <button
                            id='toggle-edit'
                            onClick={() => {
                              showModal(item.product_id);
                            }}
                            className='edit-btn'
                          >
                            <FaPen />
                          </button>
                          <button
                            className='del-btn'
                            onClick={() => {
                              handleDelete(item.product_id);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>
            <EditProduct
              productDetails={productDetails}
              isOpen={show}
              hide={hideModal}
              reFetch={getItems}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
