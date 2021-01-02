import React from 'react';
import { Col, Form } from 'react-bootstrap';

const RadiosForm = ({ question }) => {
  return (
    <Form.Group>
      <Form.Label>{question}</Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Très bien"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Bien"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="Moyen"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
        <Form.Check
          type="radio"
          label="Insuffisant"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
        <Form.Check
          type="radio"
          label="Sans objet"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>
  );
};
export default RadiosForm;
