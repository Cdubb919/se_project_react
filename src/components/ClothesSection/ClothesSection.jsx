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
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
