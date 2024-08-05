import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import IMG1 from './image1.jpg';
import IMG2 from './image2.jpg';
import IMG3 from './image3.jpg';
import IMG4 from './image4.jpg';
import IMG5 from './image5.jpg';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const goToOrderPage = () => {
    navigate('/order');
  };

  return (
    <div className="carousel-container">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={IMG1} className="imgs" alt="image1" />
          </div>
          <div className="carousel-item">
            <img src={IMG2} className="imgs" alt="image2" />
          </div>
          <div className="carousel-item">
            <img src={IMG3} className="imgs" alt="image3" />
          </div>
          <div className="carousel-item">
            <img src={IMG4} className="imgs" alt="image4" />
          </div>
          <div className="carousel-item">
            <img src={IMG5} className="imgs" alt="image5" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="carousel-overlay">
        <div className="carousel-text">
          <h2>Deals of the Day</h2>
          <button className="btn btn-danger" onClick={goToOrderPage}>Order Now</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
