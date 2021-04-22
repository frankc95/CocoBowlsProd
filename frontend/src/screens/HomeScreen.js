import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import { listCatBowlProducts } from '../actions/productActions';
import { listCatSetProducts } from '../actions/productActions';
import { listCatCutleryProducts } from '../actions/productActions';

const HomeScreens = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  // the hook used to call in an action requests from functional components
  const dispatch = useDispatch();

  // the hook used to select the parts of the state that will be used in a given component
  // productList links back to productList defined in store.js file
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  // the hook used to select the parts of the state that will be used in a given component
  const productCatBowl = useSelector((state) => state.productCatBowl);
  // variable names must be unique when used in the same component hence the reason for assigning difderent var name for products.
  const { products: productsCatBowl } = productCatBowl;

  // the hook used to select the parts of the state that will be used in a given component
  const productCatSet = useSelector((state) => state.productCatSet);
  const { products: productsCatSet } = productCatSet;

  // the hook used to select the parts of the state that will be used in a given component
  const productCatCutlery = useSelector((state) => state.productCatCutlery);
  const { products: productsCatCutlery } = productCatCutlery;

  // define useEffect, apply an arrow function and whatever is inside the function will run as soon as the component loads. As the second argument, it takes an array[] of dependencies.
  useEffect(() => {
    // sends a request to the backend to list all the products
    dispatch(listProducts(keyword, pageNumber));
    // sends a request to the backend to list all the category bowl products
    dispatch(listCatBowlProducts());
    // sends a request to the backend to list all the category set products
    dispatch(listCatSetProducts());
    // sends a request to the backend to list all the category cutlery products
    dispatch(listCatCutleryProducts());
    // an array[] with dependencies
  }, [dispatch, keyword, pageNumber]);

  // carousel breakpoints
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1100, itemsToShow: 4 },
  ];

  // return JSX
  return (
    <>
      <Meta title='Home' />
      {!keyword ? (
        <>
          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {/* If loading show loader component, if error show message component, if search keyword show searched product/s, else, show carousels with products */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {keyword ? (
            <>
              <Row className='py-3'>
                {/* Looping through products array */}
                {products.map((product) => (
                  <Col
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className='py-3'
                  >
                    {/* Passing props to child component - (Product) */}
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ''}
              />
            </>
          ) : (
            <>
              <div className='sp' id='sets'></div>
              <Row className='justify-content-center'>
                <h1 className='headers'>Sets</h1>
                <Carousel breakPoints={breakPoints}>
                  {/* Mapping through products array */}
                  {productsCatSet.map((product) => (
                    <Col key={product._id}>
                      {/* Passing props to child component - (Product) */}
                      <Product product={product} />
                    </Col>
                  ))}
                </Carousel>
              </Row>

              <div className='sp' id='bowls'></div>
              <Row className='justify-content-center'>
                <h1 className='headers'>Bowls</h1>
                <Carousel breakPoints={breakPoints}>
                  {/* Mapping through products array */}
                  {productsCatBowl.map((product) => (
                    <Col key={product._id}>
                      {/* Passing props to child component - (Product) */}
                      <Product product={product} />
                    </Col>
                  ))}
                </Carousel>
              </Row>

              <div className='sp' id='cutlery'></div>
              <Row className='justify-content-center'>
                <h1 className='headers'>Cutlery</h1>
                <Carousel breakPoints={breakPoints}>
                  {productsCatCutlery.map((product) => (
                    <Col key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Carousel>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreens;
