import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export const searchProductsService = async (query) => {
  try {
    const response = await api.get('/products/search', {
      params: query,
    });
    console.log(response);
    return response.products;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error('Error fetching products:', errorMessage);
    throw errorMessage;
  }
};

export const fetchProductsService = async () => {
  try {
    const response = await api.get('/products'); // Replace with your API endpoint
    return response.products;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error('Error fetching products:', errorMessage);
    throw errorMessage;
  }
};

export const fetchProductByIdService = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`); // Replace with your API endpoint
    const product = response.product;
    return product;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(
      `Error fetching product with ID ${productId}:`,
      getBackendErrorMessage(errorMessage)
    );
    throw error;
  }
};

export const createProductService = async (productData) => {
  try {
    const response = await api.post(`/products`, productData);
    const product = response.product;
    return product;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(
      `Error updating product `,
      getBackendErrorMessage(errorMessage)
    );
    throw error;
  }
};

export const updateProductService = async (productData) => {
  try {
    const response = await api.put(`/products/${productData._id}`, productData);
    const product = response.product;
    return product;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(
      `Error updating product `,
      getBackendErrorMessage(errorMessage)
    );
    throw error;
  }
};

export const deleteProductService = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    const product = response.deletedProduct;
    return product;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(
      `Error updating product `,
      getBackendErrorMessage(errorMessage)
    );
    throw error;
  }
};
