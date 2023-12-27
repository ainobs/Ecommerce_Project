import React, { useEffect, useState } from 'react';
import { useProduct } from '../../../hooks/useProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { FiImage, FiX } from 'react-icons/fi';
import compressImageUpload from '../../../utils/compressImageUpload';
import Loading from '../../../component/loading';
import CustomSelect from '../../../component/CustomSelect';
import ProductTagsInput from '../../../component/ProductTagsInput';
import ColorPicker from '../../../component/ColorPicker';
import AddSizes from '../../../component/AddSizes';
import { categories } from '../../../constant/categories';

const NewProduct = () => {
  const { id } = useParams();
  const { createProduct, fetchProductById, updateProduct } = useProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [formdata, setFormdata] = useState({
    _id: '',
    name: '',
    images: [],
    tags: [],
    brand: '',
    description: '',
    colors: [],
    category: '',
    sizes: [],
    countInStock: 0,
    sellingPrice: 0,
    costPrice: 0,
    material: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    category: '',
    sellingPrice: '',
    costPrice: '',
    images: '',
    sizes: '',
    // Add more fields as needed
  });

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const currentProduct = await fetchProductById(id);

        if (currentProduct) {
          setFormdata(currentProduct);
        }
        setLoadingPage(false);
      } else {
        setFormdata({
          _id: '',
          name: '',
          images: [],
          tags: [],
          brand: '',
          description: '',
          colors: [],
          category: '',
          sizes: [],
          countInStock: 0,
          sellingPrice: 0,
          costPrice: 0,
          material: '',
        });
        setLoadingPage(false);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize the formErrors object
    const errors = {
      name: '',
      category: '',
      sellingPrice: '',
      costPrice: '',
      images: '',
      sizes: '',
      // Initialize errors for other fields
    };
    setFormErrors(errors);

    // Validate each input field
    if (formdata.name.trim() === '') {
      errors.name = 'Product Name is required';
    }

    if (formdata?.category === '') {
      errors.category = 'Category is required';
    }

    if (isNaN(formdata.sellingPrice) || formdata.sellingPrice <= 0) {
      errors.sellingPrice = 'Selling Price must be a positive number';
    }

    // if (image1 === '' && image2 === '' && image3 === '' && image4 === '') {
    //   errors.images = 'At least one image must be uploaded';
    // }

    if (isNaN(formdata.costPrice) || formdata.costPrice <= 0) {
      errors.costPrice = 'Cost Price must be a positive number';
    }

    if (formdata.countInStock === 0 && formdata.sizes.length === 0) {
      errors.sizes = 'Either Count in Stock or Sizes must be set';
    }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== '');

    if (hasErrors) {
      // If there are errors, update the formErrors state
      setFormErrors(errors);
    } else {
      let result;
      if (id) {
        result = await updateProduct(formdata);
      } else {
        result = await createProduct(formdata);
      }
      if (result) {
        navigate('/dashboard/products');
      }
    }
  };

  const handleImageUpload = async (event) => {
    try {
      setLoading(true);
      const files = event.target.files;
      if (files) {
        const compressedImage = await compressImageUpload(files[0], 1024);
        setFormdata({
          ...formdata,
          images: [...formdata.images, compressedImage],
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('image upload', error);
    }
  };
  console.log(formdata);
  const handleRemoveImage = (indexToRemove) => {
    // Create a copy of the images array without the removed image
    const updatedImages = formdata.images.filter(
      (_, index) => index !== indexToRemove
    );

    // Update the formdata state with the updated images array
    setFormdata({
      ...formdata,
      images: updatedImages,
    });
  };

  const handleSizes = (value) => {
    setFormdata({ ...formdata, sizes: value });
  };

  const handleColor = (value) => {
    setFormdata({ ...formdata, colors: value });
  };

  const handleTags = (value) => {
    setFormdata({ ...formdata, tags: value });
  };

  const handleCountInStock = (value) => {
    setFormdata({ ...formdata, countInStock: value });
  };

  const handleCategory = (value) => {
    setFormdata({ ...formdata, category: value });
  };

  const handleMaterial = (value) => {
    setFormdata({ ...formdata, material: value });
  };

  if (loadingPage) {
    return <Loading />;
  }

  return (
    <div className="md:p-4">
      {!id ? (
        <h2 className="text-2xl font-semibold mb-4">New Product</h2>
      ) : (
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      )}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            {/* Product Name */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Product Name</h3>
              <input
                type="text"
                value={formdata.name}
                onChange={(e) =>
                  setFormdata({ ...formdata, name: e.target.value })
                }
                className="p-2 focus:outline-none border focus:border-orange-500"
              />
              {formErrors.name && (
                <div className="text-red-500 text-sm">{formErrors.name}</div>
              )}
            </div>

            {/* Product Category */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Category</h3>
              <CustomSelect
                options={categories.map((category) => category.name)}
                onChange={handleCategory}
                value={formdata.category}
              />
              {formErrors.category && (
                <div className="text-red-500 text-sm">
                  {formErrors.category}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Selling Price */}
              <div>
                <h3 className="font-medium mb-2">Selling Price</h3>
                {/* Add selling price input */}
                {/* Example: */}
                <input
                  type="number"
                  value={formdata.sellingPrice}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      sellingPrice: parseFloat(e.target.value),
                    })
                  }
                  className="p-2 focus:outline-none border focus:border-orange-500"
                />
                <div className="text-gray-500 text-xs">
                  This is the amount you are selling this product
                </div>
                {formErrors.sellingPrice && (
                  <div className="text-red-500 text-sm">
                    {formErrors.sellingPrice}
                  </div>
                )}
              </div>

              {/* Cost Price */}
              <div>
                <h3 className="font-medium mb-2">Cost Price</h3>
                {/* Add cost price input */}
                {/* Example: */}
                <input
                  type="number"
                  value={formdata.costPrice}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      costPrice: parseFloat(e.target.value),
                    })
                  }
                  className="p-2 focus:outline-none border focus:border-orange-500"
                />
                {formErrors.costPrice && (
                  <div className="text-red-500 text-sm">
                    {formErrors.costPrice}
                  </div>
                )}
              </div>
            </div>

            {/* Product Tags */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Tags</h3>
              <ProductTagsInput tags={formdata.tags} setTags={handleTags} />
            </div>

            {/* Product Specifications */}
            <div>
              <h3 className="font-medium mb-2">Brand</h3>
              {/* Add brand textarea */}
              {/* Example: */}
              <input
                value={formdata.brand}
                onChange={(e) =>
                  setFormdata({ ...formdata, brand: e.target.value })
                }
                className="p-2 focus:outline-none border focus:border-orange-500"
              />
            </div>

            {/* Product Description */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Description</h3>
              {/* Add description textarea */}
              {/* Example: */}
              <textarea
                rows={6}
                value={formdata.description}
                onChange={(e) =>
                  setFormdata({ ...formdata, description: e.target.value })
                }
                className="w-full focus:outline-orange-500"
              />
            </div>
          </div>

          <div className="mb-4">
            {/* Product Images */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Product Images</label>
              <div className="flex">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" // Hide the default file input
                  id="image-upload"
                />
                {loading ? (
                  <div>Uploading...</div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 border border-orange-500 bg-orange-500 bg-opacity-10 py-1 px-2 rounded"
                  >
                    Add Image <FiImage className="text-orange-500" />
                  </label>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {formdata.images.map((image, index) => (
                  <div key={index} className="w-36 h-36  relative">
                    <img
                      src={image}
                      alt={`Product Image `}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FiX /> {/* Remove icon */}
                    </button>
                  </div>
                ))}
              </div>

              {formErrors.images && (
                <div className="text-red-500 text-sm">{formErrors.images}</div>
              )}
            </div>
            {/* Available Colors */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Available Colors</h3>
              <ColorPicker
                availableColors={formdata.colors}
                setAvailableColors={handleColor}
              />
            </div>
            <div className="mb-4">
              <AddSizes
                sizes={formdata.sizes}
                setSizes={handleSizes}
                totalCountInStock={formdata.countInStock}
                setTotalCountInStock={handleCountInStock}
              />
              {formErrors.sizes && (
                <div className="text-red-500 text-sm">{formErrors.sizes}</div>
              )}
            </div>
            {/* Material/Texture */}
            <div>
              <h3 className="font-medium mb-2">Material/Texture</h3>

              <CustomSelect
                onChange={handleMaterial}
                options={['Cotton', 'Wool', 'Metal', 'Others']}
                value={formdata.material}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className={
              'bg-orange-500 text-white font-medium px-4 py-2 rounded '
            }
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
