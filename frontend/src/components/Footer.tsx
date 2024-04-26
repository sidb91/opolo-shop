import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import "../App.css";

const Footer = (): React.JSX.Element => {

  const currentYear: number = new Date().getFullYear();

  return (
    <footer className='footer-container'>
        <Container>
            <Row>
                <Col className='text-center py-1 pt-5'>
                    <p>OpoloShop &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer