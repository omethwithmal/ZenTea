import React from "react";
import './ProductCards.css';
import Footer from "../Footer/Footer"; // Footer එක import කර ඇත.

import img1 from '../../assets/GreenTea.jpg'
import img2 from '../../assets/BlackTea.jpg'
import img3 from '../../assets/HerbalTea.jpg'
import img4 from '../../assets/OolongTea.jpg'
import img5 from '../../assets/WhiteTea.jpg'
import img6 from '../../assets/MatchaTea.jpg'
import img7 from '../../assets/ChamomileTea.jpg'
import img8 from '../../assets/EarlGreyTea.jpg'

const ProductCards = () => {
  return (
    <>
      <div className="IT22090508-product-body">
        <section className="IT22090508-product-section">
          <h2 className="IT22090508-section-title">Our Tea Collection</h2>
          <div className="IT22090508-product-container">
            {[
              { img: img1, alt: "Green Tea", title: "Green Tea", description: "Refreshing and energizing green tea.", price: "Rs.1250.00" },
              { img: img2, alt: "Black Tea", title: "Black Tea", description: "Bold and robust black tea.", price: "Rs.2500.00" },
              { img: img3, alt: "Herbal Tea", title: "Herbal Tea", description: "Calming herbal tea blend.", price: "Rs.1500.00" },
              { img: img4, alt: "Oolong Tea", title: "Oolong Tea", description: "Smooth and aromatic oolong tea.", price: "Rs.2200.00" },
              { img: img5, alt: "White Tea", title: "White Tea", description: "Delicate and floral white tea.", price: "Rs.3100.00" },
              { img: img6, alt: "Matcha Tea", title: "Matcha Tea", description: "Premium Japanese matcha powder.", price: "Rs.2700.00" },
              { img: img7, alt: "Chamomile Tea", title: "Chamomile Tea", description: "Soothing chamomile herbal tea.", price: "Rs.1450.00" },
              { img: img8, alt: "Earl Grey Tea", title: "Earl Grey Tea", description: "Classic bergamot-infused black tea.", price: "Rs.4100.00" },
            ].map((product, index) => (
              <div key={index} className="IT22090508-product-card">
                <img src={product.img} alt={product.alt} className="IT22090508-product-image" />
                <h3 className="IT22090508-product-title">{product.title}</h3>
                <p className="IT22090508-product-description">{product.description}</p>
                <p className="IT22090508-product-price">{product.price}</p>
                <button className="IT22090508-buy-now-button">Buy Now</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer should be outside the cart section */}
      <Footer />
    </>
  );
};

export default ProductCards;
