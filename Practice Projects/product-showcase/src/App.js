import './App.css';
import Section from './components/Section/Section';
import ProductCard from './components/ProductCard/ProductCard';
import Products from './data/Products';


function App() {  




  return (
   <div className="App">
     <h1>Product Showcase</h1>
     <Section title="Featured Products">
       {
        Products.slice(0,2).map(product => (
          <ProductCard 
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
            isOnSale={product.isOnSale}
            salePrice={product.salePrice}
          />
        ))
       }
     </Section>

     <Section title="New Arrivals">
      {
        Products.slice(2).map(product => (
          <ProductCard 
            key={product.id}
            {...product}
          />
        ))
      }
      </Section>
   </div>
  );
} 

export default App;