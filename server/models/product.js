import mongoose, { Document, Schema, Model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    brand: {
      type: String,
    },
    colors: {
      type: [String],
    },
    category: {
      type: String,
    },
    sizes: [
      {
        size: {
          type: String,
        },
        quantity: {
          type: String,
        },
      },
    ],
    sellingPrice: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    material: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
