import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import Rating from './Rating';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-light' fade>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className='img-wrapper'>
            {/* <div className='overlay-v'></div> */}
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} />
              <Carousel.Caption>
                <h1>{product.name}</h1>
                <h1>£{product.price}</h1>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </Carousel.Caption>
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
