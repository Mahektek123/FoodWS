import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./logo.ico";
import avani from "./avani.jpg";
import kinjal from "./kinjal.jpg";
import pinal from "./pinal.jpg";
import manish from "./manish.jpg";
import mahek from "./mahek.jpg";

const Info = () => {
  return (
    <div className="container mt-5 p-4 rounded text-white" style={{ maxWidth: '1000px', borderRadius: '15px', boxShadow: '8 4px 8px rgba(0, 0, 0, 0.9)', border: '2px solid rgba(0, 0, 0, 0.5)', margin: '10px auto', backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)' }}>
      <header className="text-center mb-4">
        <img src={logo} style={{ width: "75px", height: "45px" }} alt="Logo" />
        <h1 className="display-4 text-danger" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Welcome to YumYard</h1>
        <p className="lead" style={{ fontSize: '1.25rem', fontWeight: '500', color: '#FFD700' }}>Your local food delivery experts</p>
      </header>
      <section className="about-us-content">
        <div className="section mb-4">
          <h2 className="text-danger" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Our Story</h2>
          <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
            At Udhna College, five innovative students came together with a shared vision: to revolutionize food delivery for their peers. The team consisted of <span style={{ color: '#FFD700' }}>Manish</span>, a tech-savvy coder; <span style={{ color: '#FFD700' }}>Avani</span>, a marketing whiz; <span style={{ color: '#FFD700' }}>Mahek</span>, an efficient operations manager; <span style={{ color: '#FFD700' }}>Kinjal</span>, a culinary enthusiast; and <span style={{ color: '#FFD700' }}>Pinal</span>, a financial strategist. Their goal was simple but ambitious—to create a food delivery website that catered exclusively to their college community.<br />

            They began by brainstorming and designing a user-friendly interface that would make ordering food effortless. <strong style={{ color: '#FF6347' }}>Manish</strong> coded the website with a focus on seamless navigation and real-time updates, ensuring users could track their orders from kitchen to doorstep. <strong style={{ color: '#FF6347' }}>Avani</strong> crafted an engaging marketing strategy, promoting the site through social media, campus flyers, and word of mouth.<br />

            <strong style={{ color: '#FF6347' }}>Mahek</strong> coordinated with local eateries, securing partnerships and ensuring that the delivery process was smooth and reliable. <strong style={{ color: '#FF6347' }}>Kinjal</strong> curated a diverse menu, featuring popular local dishes and healthy options, all sourced from trusted vendors. <strong style={{ color: '#FF6347' }}>Pinal</strong> handled the budgeting, making sure the project was financially viable and that they could offer competitive prices.<br />

            As the launch day approached, excitement buzzed throughout the campus. The website went live, and it quickly gained traction among students. Orders poured in, and the team worked tirelessly to ensure each delivery was prompt and accurate. They used feedback from their users to make continuous improvements, enhancing the site's functionality and expanding the menu based on popular demand.<br />

            The success of their venture not only improved campus life but also showcased their entrepreneurial spirit. Their initiative became a model for future student-led projects, proving that with creativity, collaboration, and determination, even the smallest ideas can make a big impact.
          </p>
        </div>
        <div className="section mb-4">
          <h2 className="text-danger" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Our Mission</h2>
          <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
            We believe that food should be an experience, not a hassle. Our mission is to provide <span style={{ color: '#FFD700' }}>fast</span>, <span style={{ color: '#FFD700' }}>reliable</span>, and <span style={{ color: '#FFD700' }}>friendly</span> delivery service that brings the joy of dining out directly to you. By partnering with top local restaurants, we ensure you get the best of your city’s culinary scene without leaving home.
          </p>
        </div>
        <div className="section mb-4">
          <h2 className="text-danger" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Meet the Team</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-3">
              <img src={manish} alt="Manish Upadhyay" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #FF6347' }} />
              <p style={{ fontWeight: '500' }}>Manish Upadhyay - <span style={{ color: '#FFD700' }}>Founder & CEO</span></p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={mahek} alt="Mahek Tekrawala" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #FF6347' }} />
              <p style={{ fontWeight: '500' }}>Mahek Tekrawala - <span style={{ color: '#FFD700' }}>Chief Operations Officer</span></p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={avani} alt="Avani Rashyani" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #FF6347' }} />
              <p style={{ fontWeight: '500' }}>Avani Rashyani - <span style={{ color: '#FFD700' }}>Customer Experience Lead</span></p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={kinjal} alt="Kinjal Prajapati" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #FF6347' }} />
              <p style={{ fontWeight: '500' }}>Kinjal Prajapati - <span style={{ color: '#FFD700' }}>Customer Experience Lead</span></p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={pinal} alt="Pinal Gajera" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #FF6347' }} />
              <p style={{ fontWeight: '500' }}>Pinal Gajera - <span style={{ color: '#FFD700' }}>Customer Experience Lead</span></p>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center mt-4">
        <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: '300' }}>&copy; 2024 YumYard. Bringing flavor to your doorstep.</p>
      </footer>
    </div>
  );
};

export default Info;
