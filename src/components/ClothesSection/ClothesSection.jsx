import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onAddClick,
  handleCardClick,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes__section-header">
        <p>Your Items</p>
        <button className="clothes__add-button" onClick={onAddClick}>
          {" "}
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => handleCardClick(item)}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
