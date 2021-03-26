import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    // <footer>
    //   <Container>
    //     <Row>
    //       <Col className='text-center py-3'>Copyright &copy; CocoBowls</Col>
    //     </Row>
    //   </Container>
    // </footer>

    <footer>
      <Container>
        <Row>
          <Col className='footer-column'>
            <ul className='nav'>
              <li className='nav-item'>
                <span className='footer-title'>SHOP</span>
              </li>
              <li className='nav-item'>
                <Link to='/'>All</Link>
              </li>
              <li className='nav-item'>
                <Link to='/#sets'>Sets</Link>
              </li>
              <li className='nav-item'>
                <Link to='/#cutlery'>Cutlery</Link>
              </li>
              <li className='nav-item'>
                <Link to='/#bowls'>Bowls</Link>
              </li>
            </ul>
          </Col>

          <Col className='footer-column'>
            <ul className='nav'>
              <li className='nav-item'>
                <span className='footer-title'>Company</span>
              </li>
              <li className='nav-item'>
                <Link to='/about'>About us</Link>
              </li>
              <li className='nav-item'>
                <Link to='/'>Job postings</Link>
              </li>
              <li className='nav-item'>
                <Link to='/'>Privacy Policy</Link>
              </li>
              <li className='nav-item'>
                <Link to='/'>Terms of Use</Link>
              </li>
            </ul>
          </Col>
          <Col className='footer-column'>
            <ul className='nav'>
              <li className='nav-item'>
                <span className='footer-title'>Contact & Support</span>
              </li>
              <li className='nav-item'>
                <span className='nav-link'>
                  <i className='fas fa-phone'></i>0131 000 000
                </span>
              </li>
              <li className='nav-item'>
                <Link to='/contact'>FAQs</Link>
              </li>
              <li className='nav-item'>
                <Link to='/contact'>Contact us</Link>
              </li>
              <li className='nav-item'>
                <a href='https://www.google.com'>Give feedback</a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className='text-center'>
          <i className='fas fa-ellipsis-h'></i>
        </Row>

        <Row className='text-center'>
          <Col className='box'>
            <span className='copyright quick-links'>
              Copyright &copy; CocoBowls{' '}
              <script>document.write(new Date().getFullYear())</script>
            </span>
          </Col>
          <Col className='box'>
            <ul className='list-inline social-buttons'>
              <li className='list-inline-item'>
                <Link to='#'>
                  <i className='fab fa-instagram'></i>
                </Link>
              </li>
              <li className='list-inline-item'>
                <Link to='#'>
                  <i className='fab fa-facebook-f'></i>
                </Link>
              </li>
              <li className='list-inline-item'>
                <Link to='#'>
                  <i className='fab fa-youtube'></i>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
