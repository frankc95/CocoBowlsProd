import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';

const CartScreen = ({ match, location, history }) => {
  // get product id from URI
  const productId = match.params.id;

  // to get the actual quantity, location.search is necessary. location.search on its own will get ?gty=x from the URI. I only want the number, hence the reason for setting the output into the Number and splitting on the = sign. This would return an array with ?qty at [0] index and x at [1] index. I want [1] index.
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // the hook used to call in an action requests from functional components
  const dispatch = useDispatch();

  // useSelector to get cart from the state
  const cart = useSelector((state) => state.cart);
  // from cart pull out cartItems
  const { cartItems } = cart;

  // it needs to be defined and next, it takes an arrow function and whatever is inside the function will run as soon as the component loads. As a second argument, it takes an array[] of dependencies.
  useEffect(() => {
    // only dispatch addToCart if there is a productId
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // remove from cart handler function that takes an id as a paremeter.
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // history used to redirect
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row className='py-3'>
      <Meta title='Checkout' />
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {/* check if there is anything in the cart. If there isn't, show message. If there is, show product info in the cart  */}
        {cartItems.length === 0 ? (
          <Message variant='warning'>
            Your cart is empty{' '}
            <Link to='/' className='text-primary'>
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>£{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* Get the number of item and the quantity */}
              {/* Reduce array high order method takes an arrow function with an accumulator and whatever the current item is. 0 is set as the second argument */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {/* Get the price for all items and their quantity */}£{' '}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block btn-secondary'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
