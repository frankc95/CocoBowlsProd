import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  // the hook used to call in an action requests from functional components
  const dispatch = useDispatch();

  // the hook used to select the parts of the state that will be used in a given component
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // logout handler
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Link to='top' smooth={true} offset={-70} duration={100}>
              <Navbar.Brand className='logo'>
                <Image src='/images/logo.png' alt='logo' />
              </Navbar.Brand>
            </Link>
          </LinkContainer>
          <div className='content'>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <div className='mr-auto'>
                <NavDropdown
                  title='Products'
                  id='products'
                  className='nav-link'
                >
                  <LinkContainer to='/'>
                    <Link to='sets' smooth={true} offset={-70} duration={100}>
                      Sets
                    </Link>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <Link to='bowls' smooth={true} offset={-70} duration={100}>
                      Bowls
                    </Link>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <Link
                      to='cutlery'
                      smooth={true}
                      offset={-70}
                      duration={100}
                    >
                      Cutlery
                    </Link>
                  </LinkContainer>
                </NavDropdown>

                <LinkContainer to='/contact'>
                  <Nav.Link>
                    <i className='fas fa-envelope'></i> Contact
                  </Nav.Link>
                </LinkContainer>
              </div>
              <div className='ml-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>

                {userInfo && userInfo.isAdmin ? (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : (
                  <>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick={logoutHandler}>
                          <i className='fas fa-sign-out-alt'></i>Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to='/login'>
                        <Nav.Link>
                          <i className='fas fa-sign-in-alt'></i> Sign In
                        </Nav.Link>
                      </LinkContainer>
                    )}
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
