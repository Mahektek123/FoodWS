import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-center' color='white'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                YumYard
              </h6>
              <p>
                Yumyard started in 2024 by 5 members of udhana college.
                we serve delivery service to the people around us.
                We conduct our business in a way that is good for the 
                people, good for the community and good for the planet.
                We take our social responsibilities and our commitment to 
                the society and ethics seriously.
                

              </p>
            </MDBCol>


            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Socials</h6>
              <p>
                <a href='https://www.facebook.com' className='text-reset'>
                  Facebook
                </a>
              </p>
              <p>
                <a href='https://www.instagram.com' className='text-reset'>
                  Instagram
                </a>
              </p>
              <p>
                <a href='https://www.linkedin.com' className='text-reset'>
                  LinkedIn
                </a>
              </p>
            
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Udhna College ,Udhna ,Surat , Gujrat, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                manishsuperbstar@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91 8530033940
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +91 8160250712
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <span className='text-reset fw-bold' >
          YumYard Inc.
        </span>
      </div>
    </MDBFooter>
  );
}