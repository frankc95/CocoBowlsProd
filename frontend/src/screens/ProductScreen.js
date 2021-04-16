import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listProductDetails, reviewProduct } from '../actions/productActions';
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
  // useState hook takes two parameters, name of the initial state and name the function that will change the state. It also takes a default value inside ().
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // the hook used to call in an action requests from functional components
  const dispatch = useDispatch();

  // the hook used to select the parts of the state that will be used in a given component
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // the hook used to select the parts of the state that will be used in a given component
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // the hook used to select the parts of the state that will be used in a given component
  const productReview = useSelector((state) => state.productReview);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReview;

  // define useEffect, apply an arrow function and whatever is inside the function will run as soon as the component loads. As the second argument, it takes an array[] of dependencies.
  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    // I destructured history from props as history is needed to use push so redirect is available.
    // match.params.id is used to get the id from URI
    // I pass the quantity by adding query string (?) of qty and set it to whatever ${qty} is.
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  // Review handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      reviewProduct(match.params.id, {
        rating,
        comment,
      })
    );
  };

  // modal
  const options = {
    buttons: {
      backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '10px',
      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: true,
      showNextButton: true,
      showPrevButton: true,
      showThumbnailsButton: true,
      size: '40px',
    },
    caption: {
      showCaption: false,
    },
  };

  return (
    <>
      <Link className='btn btn-outline-primary my-3' to='/'>
        Go Back
      </Link>
      {/* If loading show loader component, if error show message component, else, show product details */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className='justify-content-center'>
            <Col xl={4} lg={5} md={6} className='product-img'>
              <SRLWrapper options={options}>
                <Image src={product.image} alt={product.name} fluid />
                <Image src={product.image2} alt='' fluid />
                <Image src={product.image3} alt='' fluid />
                <Image src={product.image4} alt='' fluid />
              </SRLWrapper>
            </Col>
            <Col xl={5} lg={7} md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.rating && (
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  )}
                </ListGroup.Item>
                <ListGroup.Item variant='flush'>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>£{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant='flush'>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* product.countInStock is greater than 0, then display the following: */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        {/* Form.Control has assigned the following props */}
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* I began by opening an array '[]', I use the spread operator '...' and then the array constructor 'Array()', which takes product.countInStock as the parameter.  
                        .keys() will separate each individual quantity value with a coma - ','
                        .map() method will map through an array
                        array starts with 0 and I wish the output to be eg. 1,2,3,4,5 instead of 0,1,2,3,4 , hence the reason for setting whatever the x is + 1
                        */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    variant='outline-secondary'
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    // disabled prop to disable button with not in stock
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='py-3 justify-content-center'>
            <Col md={8}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='warning'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='outline-secondary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please{' '}
                      <Link to='/login'>
                        <strong>sign in</strong>
                      </Link>{' '}
                      to leave a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
