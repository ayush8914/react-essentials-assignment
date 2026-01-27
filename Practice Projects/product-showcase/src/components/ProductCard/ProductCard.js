import './ProductCard.css';
import Card from '../Card/Card';

function ProductCard({ name, description, price, image , isOnSale=false, salePrice=price}) {

  return (
    <Card className='product-card'>
      <img src={image} alt={name} />
      <h3>{name} {isOnSale && <span className='sale-badge'>ON Sale!</span>}</h3>
      <p>{description}</p>
      <div className='price-container'>
        {isOnSale ? (
          <>
            <span className='original-price'>${price}</span>
            <span className='sale-price'>${salePrice}</span>
          </>
        ) : (
          <span className='price'>${price}</span>
        )}
      </div>      <button onClick={() => alert(`Added ${name} to cart!`)}>Add to Cart</button>
    </Card>
  );
}

export default ProductCard;