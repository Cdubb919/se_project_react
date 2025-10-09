import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onAddClick, handleCardClick }) {

  return (
    <div className="clothes-section">
      <div>
        <p>Your Items</p>
        <button onClick={onAddClick}>Add New</button>
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
