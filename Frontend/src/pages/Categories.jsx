import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your images
import freshIcon from "../assets/categories/freshProducts.png";
import dairyIcon from "../assets/categories/Dairy.png";
import healthIcon from "../assets/categories/HealthAndBeauty.png";
import homeIcon from "../assets/categories/Household.png";
import frozenIcon from "../assets/categories/FrozenFood.png";
import snacksIcon from "../assets/categories/Snacks.png";
import meatIcon from "../assets/categories/Meat.png";
import petIcon from "../assets/categories/PetSupplies.png";

const categories = [
  { name: "Fresh Products", icon: freshIcon },
  { name: "Dairy Products", icon: dairyIcon },
  { name: "Health & Beauty", icon: healthIcon },
  { name: "Household", icon: homeIcon },
  { name: "Frozen Food", icon: frozenIcon },
  { name: "Snacks", icon: snacksIcon },
  { name: "Meat", icon: meatIcon },
  { name: "Pet Supplies", icon: petIcon },
];

const CategoryFilter = () => {
  const handleCategoryClick = (category) => {
    alert(`Selected category: ${category}`);
  };

  return (
    <div  >
      <div className="d-flex flex-row flex-nowrap overflow-auto bg-white shadow-sm rounded p-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="text-center mx-3"
            onClick={() => handleCategoryClick(cat.name)}
            style={{ cursor: "pointer", minWidth: "100px" }}
          >
            <img
              src={cat.icon}
              alt={cat.name}
              className="mb-2"
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
            />
            <div className="small">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
