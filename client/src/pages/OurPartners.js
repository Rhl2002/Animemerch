import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import art1 from './../assets/art1.avif'
import art2 from './../assets/art2.webp'
import art3 from './../assets/art3.jpg'
import art4 from './../assets/art4.webp'
import art5 from './../assets/art5.jpg'
import art6 from './../assets/art6.jpg'
import art7 from './../assets/art7.jpg'
import art8 from './../assets/art8.jpg'
import art9 from './../assets/art9.jpg'

const OurPartners = () => {
  return (
    <Container>
    <Row>
        <h1 className='d-flex justify-content-center mx-auto fw-bold  my-5'>Our Best Picks !</h1>
      <Col className='m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art1} alt='asdf' className='card d-flex justify-content-center mx-auto w-75'/></Col>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art2} alt='asdf' className='card d-flex justify-content-center mx-auto w-75'/></Col>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art3} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
   
    </Row>
    <Row className='mt-5'>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art4} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art5} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art6} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
    </Row>

    <Row className='mt-5'>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art7} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art8} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
      <Col className=' m-2'><h3 className='d-flex justify-content-center mx-auto'>Shivam J.</h3><img src={art9} alt='asdf' className='card d-flex justify-content-center mx-auto w-50'/></Col>
    </Row>
  </Container>
  );
}

export default OurPartners;