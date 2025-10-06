//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../Main/ItemCard/ItemCard";

function ClothesSection({ clothingItems }) {
  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
  };

  console.log(
    "Clothing item IDs:",
    clothingItems.map((item) => item._id)
  );

  return (
    <div className="clothes-section">
      <div>
        <p>Your Items</p>
        <button>Add New</button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
