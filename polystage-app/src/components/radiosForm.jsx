import React from 'react';
import { Col, Form } from 'react-bootstrap';

const RadiosForm = ({ question, value }) => {
  return (
    <Form.Group>
      <Form.Label>{question}</Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Très bien"
          name={value}
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Bien"
          name={value}
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="Moyen"
          name={value}
          id="formHorizontalRadios3"
        />
        <Form.Check
          type="radio"
          label="Insuffisant"
          name={value}
          id="formHorizontalRadios4"
        />
        <Form.Check
          type="radio"
          label="Sans objet"
          name={value}
          id="formHorizontalRadios5"
        />
      </Col>
    </Form.Group>
  );
};
export default RadiosForm;
