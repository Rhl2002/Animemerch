import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cardimg from './../assets/card-image.webp'

const Card1 = () => {
  return (
    <>
    <Card style={{ width: '15rem' }}>
      <h5 className='d-flex justify-content-center fw-bold mx-auto text-danger'>Trending Tee !</h5>
    <Card.Img variant="top" src={cardimg} />
    <Card.Body>
      <Card.Title>Gojo Sotaru Tee</Card.Title>
      <Card.Text>
       
      </Card.Text>
      <Button variant="danger" className='d-flex justify-content-center mx-auto '>More Details</Button>
    </Card.Body>
  </Card>
    </>
  )
}

export default Card1