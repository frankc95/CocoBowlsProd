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

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const productCatBowl = useSelector((state) => state.productCatBowl);
  const { products: productsCatBowl } = productCatBowl;

  const productCatSet = useSelector((state) => state.productCatSet);
  const { products: productsCatSet } = productCatSet;

  const productCatCutlery = useSelector((state) => state.productCatCutlery);
  const { products: productsCatCutlery } = productCatCutlery;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(listCatBowlProducts());
    dispatch(listCatSetProducts());
    dispatch(listCatCutleryProducts());
  }, [dispatch, keyword, pageNumber]);

  // useEffect(() => {
  //   dispatch(listProducts(keyword));
  //   dispatch(listCatBowlProducts());
  //   dispatch(listCatSetProducts());
  //   dispatch(listCatCutleryProducts());
  // }, [dispatch, keyword]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1100, itemsToShow: 4 },
  ];

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
      {/* <h1>Latest Products</h1> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {keyword ? (
            <>
              <Row className='py-3'>
                {products.map((product) => (
                  <Col
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className='py-3'
                  >
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
                <h1>Sets</h1>
                <Carousel breakPoints={breakPoints}>
                  {productsCatSet.map((product) => (
                    <Col key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Carousel>
              </Row>

              <div className='sp' id='bowls'></div>
              <Row className='justify-content-center'>
                <h1>Bowls</h1>
                <Carousel breakPoints={breakPoints}>
                  {productsCatBowl.map((product) => (
                    <Col key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Carousel>
              </Row>

              <div className='sp' id='cutlery'></div>
              <Row className='justify-content-center'>
                <h1>Cutlery</h1>
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
