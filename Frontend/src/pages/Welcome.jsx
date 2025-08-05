"use client"
import { useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react" // Using Lucide React for the icon
import "../css/Welcome.css" 
import "bootstrap/dist/css/bootstrap.min.css"

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      {/* Centered Content */}
      <div className="centered-content">
        {/* Grocify Symbol */}
        <div className="grocify-symbol">
          <ShoppingCart className="grocify-icon" />
          <span className="sr-only">Grocify Logo</span>
        </div>
        <h1 className="grocify-title">Grocify</h1>
        <p className="grocify-tagline">Your fresh groceries, delivered right to your door.</p>
        {/* Buy the product button */}
        <div className="mt-10">
          <button
            className="btn btn-success px-8 py-4 rounded-pill shadow-sm custom-btn-primary"
            onClick={() => navigate("/Home")}
          >
            Start Grocery Journey
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
