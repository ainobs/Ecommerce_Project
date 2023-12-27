import { BsCurrencyPound } from 'react-icons/bs';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    imageUrl: '/images/product2.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 120,
    imageUrl: '/images/product2.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 80,
    imageUrl: '/images/product2.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 150,
    imageUrl: '/images/product2.jpg',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 90,
    imageUrl: '/images/product2.jpg',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 110,
    imageUrl: '/images/product2.jpg',
  },
];

const FeatureProductSection = () => {
  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        {/* First Row */}
        <div className="flex flex-col md:flex-row mb-8">
          <h2 className="text-3xl text-center md:text-4xl font-bold whitespace-nowrap md:w-1/3">
            Feature Products
          </h2>
          <p className=" md:w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            metus vel arcu. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam ac metus vel arcu.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam ac metus vel arcu.
          </p>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="md:w-1/2 relative">
            <img
              src={'/images/hero5.jpg'}
              alt={products[0].name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute right-0 bottom-0 bg-orange-500 text-white px-4">
              <p className="text-lg font-semibold mt-2">{products[0].name}</p>
              <p className="flex items-center">
                <BsCurrencyPound />
                {products[0].price}
              </p>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product) => (
              <div key={product.id}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-semibold w-1/2 overflow-hidden text-ellipsis whitespace-nowrap ">
                    {product.name}
                  </p>
                  <p className="text-orange-600 flex items-center ">
                    <BsCurrencyPound />
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductSection;
