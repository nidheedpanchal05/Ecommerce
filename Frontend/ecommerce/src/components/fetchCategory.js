import React, { useEffect, useState } from 'react';

const useFetchCategory = (url) => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const response = await fetch(url);
    const categories = await response.json();
    setCategories(categories);
  };
  useEffect(() => {
    getCategories();
  }, [url]);
  return { categories };
};

export { useFetchCategory };
