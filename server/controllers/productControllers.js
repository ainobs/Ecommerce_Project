import { body, param, validationResult } from 'express-validator';
import Product from '../models/product.js';
import { Types } from 'mongoose';

export const getAllProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();

    return res.status(200).json({
      status: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching all products:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const {
      query = '',
      minPrice,
      maxPrice,
      brand,
      color,
      size,
      category,
    } = req.query;
    const filters = [];

    if (query && query !== 'all') {
      filters.push({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
          { colors: { $in: [new RegExp(query, 'i')] } },
          { category: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
        ],
      });
    }

    if (minPrice || maxPrice) {
      filters.push({
        sellingPrice: {
          $gte: minPrice ? Number(minPrice) : 0,
          $lte: maxPrice ? Number(maxPrice) : Types.Decimal128.MAX_VALUE,
        },
      });
    }

    if (size && size !== 'all') {
      filters.push({ 'sizes.size': size });
    }

    if (category && category !== 'all') {
      filters.push({ category });
    }

    if (brand && brand !== 'all') {
      filters.push({ brand });
    }

    if (color && color !== 'all') {
      filters.push({ colors: { $in: [color] } });
    }

    const filterObject = filters.length > 0 ? { $and: filters } : {};

    const products = await Product.aggregate([{ $match: filterObject }]);

    return res.status(200).json({
      status: true,
      products,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Use express-validator to validate the request body
    await Promise.all([
      body('name').notEmpty().withMessage('Name is required'),
      body('countInStock')
        .isInt()
        .withMessage('Count in stock must be an integer'),
      body('sellingPrice')
        .isNumeric()
        .withMessage('Selling price must be a number'),
      body('costPrice').isNumeric().withMessage('Cost price must be a number'),
      // Add more validation rules as needed for other fields
    ]);

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract validated data from the request body
    const {
      name,
      description,
      countInStock,
      images,
      tags,
      brand,
      colors,
      category,
      sizes,
      sellingPrice,
      costPrice,
      material,
    } = req.body;

    // Create a new product document
    const newProduct = new Product({
      name,
      description,
      countInStock,
      images,
      tags,
      brand,
      colors,
      category,
      sizes,
      sellingPrice,
      costPrice,
      material,
    });

    // Save the product to the database
    await newProduct.save();

    return res.status(201).json({
      status: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Use express-validator to validate the request body and URL parameters
    await Promise.all([
      param('productId').isMongoId().withMessage('Invalid product ID'),
      body('name').notEmpty().withMessage('Name is required'),
      body('countInStock')
        .isInt()
        .withMessage('Count in stock must be an integer'),
      body('sellingPrice')
        .isNumeric()
        .withMessage('Selling price must be a number'),
      body('costPrice').isNumeric().withMessage('Cost price must be a number'),
      // Add more validation rules as needed for other fields
    ]);

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract validated data from the request body
    const {
      name,
      description,
      countInStock,
      images,
      tags,
      brand,
      colors,
      category,
      sizes,
      sellingPrice,
      costPrice,
      material,
    } = req.body;

    // Extract the product ID from the URL parameter
    const productId = req.params.productId;

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        countInStock,
        images,
        tags,
        brand,
        colors,
        category,
        sizes,
        sellingPrice,
        costPrice,
        material,
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    // Use express-validator to validate the URL parameter (productId)
    await param('productId')
      .isMongoId()
      .withMessage('Invalid product ID')
      .run(req);

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract the product ID from the URL parameter
    const productId = req.params.productId;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: true,
      product,
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    // Use express-validator to validate the URL parameter (productId)
    await param('productId')
      .isMongoId()
      .withMessage('Invalid product ID')
      .run(req);

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract the product ID from the URL parameter
    const productId = req.params.productId;

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Product deleted successfully',
      deletedProduct,
    });
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};
