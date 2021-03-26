import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';
import FAQs from '../components/FAQs';

const ContactScreen = () => {
  const [faqs, setfaqs] = useState([
    {
      question: 'Where can I buy CocoBowls products?',
      answer:
        'Right on this website. Unfortunately, there is no physical store at the moment.',
      open: false,
    },
    {
      question: 'Which payment methods are accepted?',
      answer:
        'At the moment, CocoBowls will only accept PayPal payments as well as Credit/Debit card payments.',
      open: false,
    },
    {
      question: 'How do I return something?',
      answer:
        'We hope you will love our products! But if something looks or feels amiss when they arrive, we will replace them or refund you. Please, contact us first to discuss your options.',
      open: false,
    },
    {
      question: 'What should I do if my product/s has been damaged or broken?',
      answer:
        'You should... breathe easy! All of our products come with a 30 day damage guarantee - please refer to our product guarantee and returns policy here.',
      open: false,
    },
    {
      question: 'How long will my Coconut Bowls last?',
      answer: 'With the correct care your Coconut Bowls can last a lifetime!',
      open: false,
    },
    {
      question: 'How should I care for my natural products?',
      answer:
        '1. Hand wash with warm soapy water after each use. Do not soak and allow to air dry. 2. Avoid extreme temperatures including refrigerator, microwave and dishwasher. 3. Avoid use with extremely hot foods. 3. Rehydrate with coconut oil polish to restore shine (every 10 or so uses).',
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <>
      <Row className='py-3 justify-content-center'>
        <Col md={8}>
          <div className='faqs'>
            <h1 className='px-3'>FAQs</h1>
            {faqs.map((faq, i) => (
              <FAQs faq={faq} index={i} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </Col>
      </Row>
      <Row className='py-3 justify-content-center'>
        <Col md={8}>
          <ContactForm />
        </Col>
      </Row>
    </>
  );
};

export default ContactScreen;
