import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Notyf } from 'notyf';

const EvalStage = () => {
  const location = useLocation();
  const history = useHistory();
  const [question, setQuestion] = useState([]);
  const { register, handleSubmit } = useForm();
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/questions', {
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
      .then((data) => {
        return setQuestion(data.data);
      });
  }, []);

  const redirect = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    console.log(data);
    fetch(`http://localhost:5000/api/eval/questions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ data, id: location.state.id }),
    }).then((res) => {
      res.json();
      notyf.success('Évaluation du stage réussie !');
      setTimeout(redirect, 3000);
    });
  };

  return (
    <div>
      <Container>
        <h3>
          Évaluation de l'élève {location.state.prenom} {location.state.nom}
        </h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row xs={1} md={2}>
            {question?.map((data) => (
              <Col key={data.idquest}>
                {data.choix === null ? (
                  <Form.Group controlId={data.idquest}>
                    <Form.Label>{data.question}</Form.Label>
                    <Form.Control
                      name={data.idquest}
                      style={{ width: '90%' }}
                      type="text"
                      placeholder={data.question}
                      ref={register}
                    />
                  </Form.Group>
                ) : (
                  <p></p>
                )}
                {data.choix === 'notation' ? (
                  <Form.Group>
                    <Form.Label>{data.question}</Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Très bien"
                        name={data.idquest}
                        id="formHorizontalRadios1"
                        value="Très bien"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Bien"
                        name={data.idquest}
                        id="formHorizontalRadios2"
                        value="Bien"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Moyen"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="Moyen"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Insuffisant"
                        name={data.idquest}
                        id="formHorizontalRadios4"
                        value="Insuffisant"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Sans objet"
                        name={data.idquest}
                        id="formHorizontalRadios5"
                        value="Sans objet"
                        ref={register}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  <p></p>
                )}
                {data.choix === 'classement' ? (
                  <Form.Group>
                    <Form.Label>{data.question}</Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Parmi les meilleurs"
                        name={data.idquest}
                        id="formHorizontalRadios1"
                        value="Parmi les meilleurs"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Au dessus de la moyenne"
                        name={data.idquest}
                        id="formHorizontalRadios2"
                        value="Au dessus de la moyenne"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="À la moyenne"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="À la moyenne"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="En dessous de la moyenne"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="En dessous de la moyenne"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Parmi les plus mauvais"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="Parmi les plus mauvais"
                        ref={register}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  <p></p>
                )}
                {data.choix === 'ouinon' ? (
                  <Form.Group>
                    <Form.Label>{data.question}</Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Oui"
                        name={data.idquest}
                        id="formHorizontalRadios1"
                        value="Oui"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Non"
                        name={data.idquest}
                        id="formHorizontalRadios2"
                        value="Non"
                        ref={register}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  <p></p>
                )}
                {data.choix === 'contrat' ? (
                  <Form.Group>
                    <Form.Label>{data.question}</Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="CDI"
                        name={data.idquest}
                        id="formHorizontalRadios1"
                        value="CDI"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="CDD"
                        name={data.idquest}
                        id="formHorizontalRadios2"
                        value="CDD"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Prolongation du stage"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="Prologation du stage"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="Contrat de thèse entreprise"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="Contrat de thèse entreprise"
                        ref={register}
                      />
                      <Form.Check
                        type="radio"
                        label="VIE"
                        name={data.idquest}
                        id="formHorizontalRadios3"
                        value="VIE"
                        ref={register}
                      />
                    </Col>
                  </Form.Group>
                ) : (
                  <p></p>
                )}
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
      </Container>
    </div>
  );
};
export default EvalStage;
