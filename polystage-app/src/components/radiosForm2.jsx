import React from 'react';
import { Col, Form } from 'react-bootstrap';

const RadiosFormBis = ({ question }) => {
  return (
    <Form.Group>
      <Form.Label>{question}</Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Oui"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Non"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
      </Col>
    </Form.Group>
  );
};
export default RadiosFormBis;
