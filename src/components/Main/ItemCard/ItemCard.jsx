function ItemCard() {
    return (
        <div>
            <h2>{ItemCard.name}</h2>
            <img src={item.link} alt={item.name} />
        </div>
    );
}

export default ItemCard;