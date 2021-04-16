import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
  // useState hook takes two parameters, name of the initial state and name the function that will change the state. It also takes a default value inside ().
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // the hook used to call in an action requests from functional components
  const dispatch = useDispatch();

  // the hook used to select the parts of the state that will be used in a given component
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // if not logged in, used to redirect user to a desired desitnation after logging in.
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // define useEffect, apply an arrow function and whatever is inside the function will run as soon as the component loads. As the second argument, it takes an array[] of dependencies.
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    // dependencies
  }, [history, userInfo, redirect]);

  // login handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Meta title='Sign In' />
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='outline-primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
