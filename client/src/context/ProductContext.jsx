// ProductContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  createProductService,
  deleteProductService,
  fetchProductByIdService,
  fetchProductsService,
  searchProductsService,
  updateProductService,
} from '../services/product';

// Create the product context
export const ProductContext = createContext(undefined);

// Create the ProductProvider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleError = (error) => {
    setLoading(false);
    setError(error || 'An error occurred.');
  };

  const searchProducts = async (query) => {
    try {
      setError('');
      setLoading(true);
      const result = searchProductsService(query);

      setLoading(false);
      return result;
    } catch (error) {
      handleError(error);
      setLoading(false);
      return null;
    }
  };

  // Function to fetch products (implement your own API call)
  const fetchProductById = async (productId) => {
    try {
      setLoading(true);
      const result = await fetchProductByIdService(productId);
      setLoading(false);
      return result;
    } catch (error) {
      handleError(error);
      setLoading(false);
      return null;
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const result = await createProductService(productData);
      setProducts((prevProducts) => {
        const updatedProducts = [result, ...prevProducts];
        return updatedProducts;
      });
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      setLoading(false);
      return false;
    }
  };

  const updateProduct = async (productData) => {
    try {
      setLoading(true);
      const result = await updateProductService(productData);
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((p) => {
          if (p._id === productData._id) {
            return result;
          } else {
            return p;
          }
        });
        return updatedProducts;
      });
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      setLoading(false);
      return false;
    }
  };

  // Function to delete a product (implement your own API call)
  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      const result = await deleteProductService(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== result._id)
      );
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    setError('');
    fetchProductsService()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => handleError(error));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProductById,
        searchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
