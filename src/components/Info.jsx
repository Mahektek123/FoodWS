import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./logo.ico";
import avani from "./avani.jpg"
import kinjal from "./kinjal.jpg"
import pinal from "./pinal.jpg"
import manish from "./manish.jpg"
import mahek from "./mahek.jpg"

const Info = () => {
  return (
    <div className="container mt-5 p-4 shadow-danger rounded bg-light" style={{ maxWidth: '1420px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.5)', border: '2px solid rgba(255, 0, 0, 0.5)', margin: '10px auto' }}>
      <header className="text-center mb-4">
      <img src={logo} style={{ width: "75px", height: "45px" }} alt="Logo" />
        <h1 className="display-4 text-danger">Welcome to YumYard</h1>
        <p className="lead">Your local food delivery experts</p>
      </header>
      <section className="about-us-content">
        <div className="section mb-4">
          <h2 className="text-danger">Our Story</h2>
          <p>
          At Udhna College, five innovative students came together with a shared vision: to revolutionize food delivery for their peers. The team consisted of Manish, a tech-savvy coder; Avani, a marketing whiz; Mahek, an efficient operations manager; Kinjal, a culinary enthusiast; and Pinal, a financial strategist. Their goal was simple but ambitious—to create a food delivery website that catered exclusively to their college community.<br/>

They began by brainstorming and designing a user-friendly interface that would make ordering food effortless. Manish coded the website with a focus on seamless navigation and real-time updates, ensuring users could track their orders from kitchen to doorstep. Avani crafted an engaging marketing strategy, promoting the site through social media, campus flyers, and word of mouth.<br/>

Mahek coordinated with local eateries, securing partnerships and ensuring that the delivery process was smooth and reliable. Kinjal curated a diverse menu, featuring popular local dishes and healthy options, all sourced from trusted vendors. Pinal handled the budgeting, making sure the project was financially viable and that they could offer competitive prices.<br/>

As the launch day approached, excitement buzzed throughout the campus. The website went live, and it quickly gained traction among students. Orders poured in, and the team worked tirelessly to ensure each delivery was prompt and accurate. They used feedback from their users to make continuous improvements, enhancing the site's functionality and expanding the menu based on popular demand.<br/>

The success of their venture not only improved campus life but also showcased their entrepreneurial spirit. Their initiative became a model for future student-led projects, proving that with creativity, collaboration, and determination, even the smallest ideas can make a big impact.
          </p>
        </div>
        <div className="section mb-4">
          <h2 className="text-danger">Our Mission</h2>
          <p>
            We believe that food should be an experience, not a hassle. Our mission is to provide fast, reliable, and friendly delivery service that brings the joy of dining out directly to you. By partnering with top local restaurants, we ensure you get the best of your city’s culinary scene without leaving home.
          </p>
        </div>
        <div className="section mb-4">
          <h2 className="text-danger">Meet the Team</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-3">
              <img src={manish} alt="Manish Upadhyay" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <p>Manish Upadhyay - Founder & CEO</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={mahek} alt="Mahek Tekrawala" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <p>Mahek Tekrawala - Chief Operations Officer</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={avani} alt="Avani Rashyani" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <p>Avani Rashyani - Customer Experience Lead</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={kinjal} alt="Kinjal Prajapati" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <p>Kinjal Prajapati - Customer Experience Lead</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <img src={pinal} alt="Pinal Gajera" className="img-fluid rounded-circle mb-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <p>Pinal Gajera - Customer Experience Lead</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center mt-4">
        <p className="text-muted">&copy; 2024 YumYard. Bringing flavor to your doorstep.</p>
      </footer>
    </div>
  );
};

export default Info;
