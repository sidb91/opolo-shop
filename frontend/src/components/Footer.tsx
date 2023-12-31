import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = (): React.JSX.Element => {

  const currentYear: number = new Date().getFullYear();

  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>OpoloShop &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer