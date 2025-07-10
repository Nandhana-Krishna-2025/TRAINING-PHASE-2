const Card = ({ title, description, image, price }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full sm:w-80 hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="w-full h-58 object-cover rounded-xl mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm mt-1 mb-2">{description}</p>
      <p className="text-indigo-600 font-bold text-md">{price}</p>
      <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700">
        Add to Cart
      </button>
    </div>
  );
};

export default Card;

