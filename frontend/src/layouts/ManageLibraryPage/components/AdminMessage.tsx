/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { FC, useState } from "react";
import { IMessageModel } from "../../../models/MessageModel";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface IProps {
   message: IMessageModel;
   onSubmit: (id: number, response: string) => void;
}

const AdminMessage: FC<IProps> = ({ message, onSubmit }) => {
   const { t } = useTranslation();

   const [displayWarning, setDisplayWarning] = useState(false);
   const [response, setResponse] = useState("");

   const handleSubmit = () => {
      if (!message.id || !response.trim()) {
         setDisplayWarning(true);
         return;
      }

      onSubmit(message.id, response);
      setDisplayWarning(false);
      setResponse("");
   };

   return (
      <Card className="shadow-sm">
         <Card.Body>
            <Card.Title>{t('case')} #{message.id}: {message.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
               {message.userEmail}
            </Card.Subtitle>
            <Card.Text>{message.question}</Card.Text>
            <hr />
            <h5 className="mb-3">{t('response')}</h5>
            {displayWarning && (
               <Alert variant="danger">{t('fill_all_fields')}.</Alert>
            )}
            <Form>
               <Form.Group className="mb-3">
                  <Form.Label>{t('description')}</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={3}
                     value={response}
                     onChange={(e) => setResponse(e.target.value)}
                  />
               </Form.Group>
               <Button variant="primary" onClick={handleSubmit}>
                  {t('submit_response')}
               </Button>
            </Form>
         </Card.Body>
      </Card>
   );
};

export { AdminMessage };