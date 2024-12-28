import React, { useState } from "react";
import Button from "../button/button";

const ProductCard = ({ product }) => {
  const [showReviews, setShowReviews] = useState(false);

  if (!product) {
    return <div>Loading...</div>;
  }

  const toggleReviews = () => {
    setShowReviews((prev) => !prev);
  };

  return (
    <div className="w-full sm:w-80 min-h-[600px] rounded-lg overflow-hidden shadow-lg p-6 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg text-black">
      <img
        className="w-full h-56 object-cover rounded-md"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-2xl mb-2 text-black">{product.title}</h2>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>

        <div className="flex justify-between items-center mb-4">
          <Button color="secondary" size="small" className="bg-yellow-500 hover:bg-yellow-400">
            ${product.price}
          </Button>
          <span className="text-sm text-gray-400 line-through">
            ${(
              product.price +
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <Button color="tertiary" size="small" className="bg-red-500 hover:bg-red-400">
            Rating: {product.rating} ⭐
          </Button>
        </div>

        <p className="text-sm text-gray-700">Brand: {product.brand}</p>
        <p className="text-sm text-gray-700 mt-2">Stock: {product.stock}</p>
        <p className="text-sm text-gray-700 mt-2">
          Return Policy: {product.returnPolicy}
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-700">Category: {product.category}</p>
          <div className="flex flex-wrap mt-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-300 text-gray-800 px-2 py-1 mr-2 mt-2 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Button color="primary" size="regular" onClick={toggleReviews} className="bg-blue-700 hover:bg-blue-600">
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </Button>
        </div>

        {showReviews && (
          <div className="mt-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="mt-2">
                <p className="text-sm font-semibold">{review.reviewerName}:</p>
                <p className="text-sm text-gray-700">
                  Rating: {review.rating} ⭐
                </p>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
