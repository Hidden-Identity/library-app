/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { useAuth0 } from "@auth0/auth0-react";
import { FC, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {MessageRequestModel } from "../../../models/MessageModel";

const PostNewMessage: FC = () => {
   const { t } = useTranslation();
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();

   const [title, setTitle] = useState('');
   const [question, setQuestion] = useState('');
   const [displayWarning, setDisplayWarning] = useState(false);
   const [displaySuccess, setDisplaySuccess] = useState(false);

   const submitNewQuestion = async () => {
      const url = `http://localhost:8080/api/messages/secure/add/message`;
      const accessToken = await getAccessTokenSilently();

      if (isAuthenticated && title !== '' && question !== '') {
         const messageRequestModel: MessageRequestModel = new MessageRequestModel(title, question);
         const requestOptions = {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageRequestModel)
         };

         const submitNewQuestionResponse = await fetch(url, requestOptions);

         if (!submitNewQuestionResponse.ok) {
            throw new Error('Something went wrong!');
         }

         setTitle('');
         setQuestion('');
         setDisplayWarning(false);
         setDisplaySuccess(true);
      } else {
         setDisplayWarning(true);
         setDisplaySuccess(false);
      }
   }

   return (
      <Card className="mt-3">
         <Card.Header>{t('ask_admin')}</Card.Header>
         <Card.Body>
            <Form>
               {displayWarning && (
                  <Alert variant="danger">
                     {t('fill_all_fields')}
                  </Alert>
               )}
               {displaySuccess && (
                  <Alert variant="success">
                     {t('question_add_success')}
                  </Alert>
               )}
               <Form.Group className="mb-3" controlId="questionTitle">
                  <Form.Label>{t('title')}</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder={t('title')}
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="questionText">
                  <Form.Label>{t('question')}</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={3}
                     value={question}
                     onChange={(e) => setQuestion(e.target.value)}
                  />
               </Form.Group>
               <Button
                  variant="primary"
                  className="mt-3"
                  type="button"
                  onClick={submitNewQuestion}
               >
                  {t('submit_question')}
               </Button>
            </Form>
         </Card.Body>
      </Card>
   );
};

export { PostNewMessage };