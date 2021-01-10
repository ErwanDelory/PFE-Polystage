import React from 'react';
import { Col, Form } from 'react-bootstrap';

const RadiosFormBis = ({ question, value }) => {
  return (
    <Form.Group>
      <Form.Label>{question}</Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Oui"
          name={value}
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Non"
          name={value}
          id="formHorizontalRadios2"
        />
      </Col>
    </Form.Group>
  );
};
export default RadiosFormBis;
