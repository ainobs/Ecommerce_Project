import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Men', image: '/images/category-men.jpg' },
  { id: 2, name: 'Women', image: '/images/category-women.jpg' },
  { id: 3, name: 'Kids', image: '/images/category-children1.jpg' },
  { id: 4, name: 'Shoes', image: '/images/category-shoe.jpg' },
  { id: 4, name: 'Gadget', image: '/images/category-gadget.jpg' },
  // Add more categories as needed
];

const CategorySection = () => {
  return (
    <div className="pt-8">
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Shop by Category
        </h2>
        <div className="overflow-x-auto flex space-x-4 no-scrollbar lg:justify-center">
          {categories.map((category) => (
            <Link
              to={`/search?query=${category.name}`}
              key={category.id}
              className="flex-shrink-0 relative max-w-xs rounded overflow-hidden transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className=" w-56 h-72 object-cover"
              />
              <div className=" px-4 py-2 absolute bottom-0 right-0 bg-white ">
                <p className=" font-semibold text-center">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
