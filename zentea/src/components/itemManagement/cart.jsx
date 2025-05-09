import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeaCartPage = () => {
  const [teaItems, setTeaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeaItems = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/getItem');
        if (!response.ok) {
          throw new Error('Failed to fetch tea items');
        }
        const data = await response.json();
        setTeaItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeaItems();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8070/uploads/${imagePath.split('\\').pop()}`;
  };

  const handleBuyNow = (teaItem) => {
    navigate('/TeaOrderForm', { 
      state: { 
        tea: {
          teaType: teaItem.teaType,
          price: teaItem.price,
          basePrice: teaItem.price // Store the base price for calculations
        } 
      } 
    });
  };

  if (loading) {
    return (
      <div style={styles.centeredText}>
        Loading tea collection...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.centeredText, color: 'red' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Tea Collection</h1>
      <div style={styles.grid}>
        {teaItems.map((tea) => {
          const imageUrl = getImageUrl(tea.image);
          return (
            <div key={tea._id} style={styles.card}>
              <div style={styles.imageContainer}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={tea.teaType}
                    style={styles.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.querySelector('.fallback').style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="fallback" style={styles.fallbackImage}>
                    <span style={{ fontSize: '16px' }}>Image not available</span>
                    <span style={{ fontSize: '12px', marginTop: '5px' }}>{tea.teaType}</span>
                  </div>
                )}
              </div>

              <h2 style={styles.cardTitle}>{tea.teaType}</h2>
              <p style={styles.description}>{tea.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>Rs. {tea.price.toFixed(2)}</span>
                <button
                  style={styles.buyButton}
                  onClick={() => handleBuyNow(tea)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  centeredText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '40px',
    fontSize: '36px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    padding: '0 20px'
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  },
  imageContainer: {
    height: '200px',
    backgroundColor: '#e9ecef',
    borderRadius: '8px',
    marginBottom: '20px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0
  },
  fallbackImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#e9ecef',
    color: '#6c757d',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex'
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px',
    textTransform: 'capitalize'
  },
  description: {
    color: '#6c757d',
    marginBottom: '20px',
    lineHeight: '1.5'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  buyButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease'
  }
};

export default TeaCartPage;