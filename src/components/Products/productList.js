import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard";
import Button from "../button/button";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setSortedProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
    setSortedProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    if (categoryFilter === category) {
      setCategoryFilter("");
      setSortedProducts(products);
    } else {
      setCategoryFilter(category);
      const filtered = products.filter((product) =>
        product.category.toLowerCase().includes(category)
      );
      setSortedProducts(filtered);
    }
    setCurrentPage(1);
  };

  const handleSort = (option) => {
    if (sortOption === option) {
      setSortOption("");
      setSortedProducts(products);
    } else {
      setSortOption(option);
      const sorted = [...sortedProducts].sort((a, b) => {
        return option === "price" ? a.price - b.price : b.rating - a.rating;
      });
      setSortedProducts(sorted);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-800">
      <div className="flex flex-wrap sm:flex-nowrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto bg-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowFilters((prev) => !prev)}
            size="small"
            color="primary"
          >
            Filters
          </Button>
          <Button
            onClick={() => navigate("/add-product")}
            size="small"
            color="secondary"
          >
            Add Product
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {["beauty", "fragrances", "furniture", "groceries"].map(
            (category) => (
              <Button
                key={category}
                color={categoryFilter === category ? "primary" : "secondary"}
                size="small"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            )
          )}
          {["price", "rating"].map((option) => (
            <Button
              key={option}
              color={sortOption === option ? "primary" : "secondary"}
              size="small"
              onClick={() => handleSort(option)}
            >
              Sort by {option}
            </Button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            color={currentPage === index + 1 ? "primary" : "secondary"}
            size="small"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
