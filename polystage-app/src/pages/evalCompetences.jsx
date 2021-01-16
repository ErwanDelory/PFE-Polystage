import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const EvalCompetences = () => {
  const location = useLocation();
  const history = useHistory();
  const [question, setQuestion] = useState([]);
  const [message, setMessage] = useState('');
  const [stateError, setStateError] = useState(false);
  const [stateSuccess, setStateSucces] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch('http://localhost:5000/api/competences', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((mes) => {
        return setQuestion(mes.data);
      });
  }, []);

  const redirect = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    console.log(data);
    fetch(`http://localhost:5000/api/eval/competences`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ data, id: location.state.id }),
    }).then((res) => {
      res.json();
      setMessage('Évaluation des compétences réussie !');
      setStateSucces(true);
      setStateError(false);
      setTimeout(redirect, 3000);
    });
  };

  return (
    <div className="evalComp">
      <Container>
        <h3>
          Évaluation des compétences de l'élève {location.state.prenom}{' '}
          {location.state.nom}
        </h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row xs={1} md={2}>
            {question?.map((data) => (
              <Col key={data.idcompetence}>
                <Form.Group>
                  <Form.Label>
                    {data.sigle}: {data.libelle}
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label={data.libelle1}
                      name={data.idcompetence}
                      id="formHorizontalRadios1"
                      value={data.libelle1}
                      ref={register}
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle2}
                      name={data.idcompetence}
                      id="formHorizontalRadios2"
                      value={data.libelle2}
                      ref={register}
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle3}
                      name={data.idcompetence}
                      id="formHorizontalRadios3"
                      value={data.libelle3}
                      ref={register}
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle4}
                      name={data.idcompetence}
                      id="formHorizontalRadios4"
                      value={data.libelle4}
                      ref={register}
                    />
                    <Form.Check
                      type="radio"
                      label={data.libelle5}
                      name={data.idcompetence}
                      id="formHorizontalRadios5"
                      value={data.libelle5}
                      ref={register}
                    />
                  </Col>
                </Form.Group>
              </Col>
            ))}
          </Row>
          <div className="text-center">
            <Button variant="info" type="submit" text-center>
              Envoyer
            </Button>
          </div>
        </Form>
        <br />
        {message && stateError ? (
          <Alert variant="danger">{message}</Alert>
        ) : (
          <p></p>
        )}
        {message && stateSuccess ? (
          <Alert variant="success">{message}</Alert>
        ) : (
          <p></p>
        )}
      </Container>
    </div>
  );
};
export default EvalCompetences;
