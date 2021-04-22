import React from 'react';
import emailjs from 'emailjs-com';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_sdmlib9',
        'cocobowls_template',
        e.target,
        'user_2jhgO0yI5V2SmopE1Bavo'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <h1 className='px-3 headers'>Contact Us</h1>
      <div className='container'>
        <Form onSubmit={sendEmail}>
          <Form.Group controlId='name'>
            {/* <Form.Label>Name</Form.Label> */}
            <Form.Control
              type='text'
              className='form-control'
              placeholder='Name'
              name='name'
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control
              type='email'
              className='form-control'
              placeholder='Email Address'
              name='email'
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            {/* <Form.Label>Subject</Form.Label> */}
            <Form.Control
              type='text'
              className='form-control'
              placeholder='Subject'
              name='subject'
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            {/* <Form.Label>Message</Form.Label> */}
            <Form.Control
              as='textarea'
              className='form-control'
              cols='30'
              rows='8'
              placeholder='Your message'
              name='message'
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='outline-primary'>
            Send Message
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;
