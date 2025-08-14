"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../css/Home.css"
import Navbar from "../components/Navbar"
import freshVegetablesImg from "../assets/fresh_vegetables.png"
import { config } from "../services/config"
import { getAverageRatingAPI } from "../services/feedback"
import {
  FaAppleAlt,
  FaCheese,
  FaBreadSlice,
  FaSnowflake,
  FaBox,
  FaCoffee,
  FaHeart,
  FaBroom,
  FaDog,
  FaThLarge,
} from "react-icons/fa"


const categories = [
  { name: "All Categories", icon: <FaThLarge />, displayName: "All" },
  { name: "FRESHPRODUCTS", icon: <FaAppleAlt />, displayName: "Fruits & Vegetables" },
  { name: "DAIRY", icon: <FaCheese />, displayName: "Breakfast & Dairy" },
  { name: "BEVERAGES", icon: <FaBreadSlice />, displayName: "Beverages" },
  { name: "FROZENFOOD", icon: <FaSnowflake />, displayName: "Frozen Food" },
  { name: "PACKAGEDFOOD", icon: <FaBox />, displayName: "Biscuits, Snacks" },
  { name: "BAKERY", icon: <FaCoffee />, displayName: "Grocery & Staples" },
  { name: "HEALTHNBEAUTY", icon: <FaHeart />, displayName: "Health, Beauty" },
  { name: "HOUSEHOLD", icon: <FaBroom />, displayName: "Household Care" },
  { name: "PETFOOD", icon: <FaDog />, displayName: "Pet Care" },
]

function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [ratings, setRatings] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.serverUrl}/products`)
        const productList = res.data
        setProducts(productList)
        setFilteredProducts(productList)

        const ratingMap = {}
        for (const product of productList) {
          try {
            const res = await getAverageRatingAPI(product.id)
            ratingMap[product.id] = res.data
          } catch {
            ratingMap[product.id] = 4.0
          }
        }
        setRatings(ratingMap)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchProducts()
  }, [])

  const filterByCategory = (category) => {
    setSelectedCategory(category)
    if (category === "All Categories") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.category.toUpperCase() === category.toUpperCase())
      setFilteredProducts(filtered)
    }
  }

  const goToDetails = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className="home-page">
      <Navbar products={products} />

      {/* Category Navigation */}
      <div className="category-navigation">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="category-grid">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
                    onClick={() => filterByCategory(cat.name)}
                  >
                    <div className="category-icon">{cat.icon}</div>
                    <span className="category-name">{cat.displayName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="hero-content">
                <h1 className="hero-title">
                  Fresh
                  <br />
                  <span className="hero-subtitle">Vegetables & Groceries</span>
                </h1>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hero-image">
                <img src={freshVegetablesImg} alt="Fresh Vegetables" className="img-fluid" style={{ maxHeight: 300, maxWidth: 400, borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(40,167,69,0.10)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header">
                <h2 className="section-title">
                  Top Savers Today
                  <span className="sale-badge">SALE</span>
                </h2>
                <button className="btn btn-link view-all-btn">View All</button>
              </div>
            </div>
          </div>

          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                  <div className="product-card" onClick={() => goToDetails(product.id)}>
                    <div className="product-image-container">
                      <img
                        src={
                          localStorage.getItem("product_img_" + product.name) ||
                          product.image ||
                          "/placeholder.svg?height=200&width=200" ||
                          "/placeholder.svg"
                        }
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{product.name}</h5>
                      <p className="product-description">
                        {product.description
                          ? product.description.slice(0, 60) + (product.description.length > 60 ? "..." : "")
                          : "No description available."}
                      </p>
                      <div className="product-rating">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i} className={`star ${i <= Math.round(ratings[product.id] || 4) ? "filled" : ""}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="product-pricing">
                        <span className="original-price">₹{Math.round(product.price * 1.2)}</span>
                        <span className="current-price">₹{product.price}</span>
                      </div>
                      <button className="btn btn-add-cart">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="no-products">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
