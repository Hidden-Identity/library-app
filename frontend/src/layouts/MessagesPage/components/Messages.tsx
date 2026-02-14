/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMessages } from "../../Utils/useMessages";
import { Card, Container, Spinner, Stack } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";


const Messages: FC = () => {
   const { t } = useTranslation();

   const [httpError, setHttpError] = useState(null);

   const { messages, isLoadingMessages, currentPage, totalPages, paginate } = useMessages({ setHttpError });

   if (isLoadingMessages || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {httpError
               ? <div className='container m-5'><p>{httpError}</p></div>
               : <Spinner className="m-5 primary" />}
         </Container>
      );
   }

   return (
      <div className="mt-2">
         {messages.length > 0 ? (
            <>
               <h5>{t('current_qna')}:</h5>
               <Stack gap={3} className="mt-2">
                  {messages.map((message) => (
                     <Card key={message.id} className="shadow-sm">
                        <Card.Body>
                           <Card.Title>{t('case')} #{message.id}: {message.title}</Card.Title>
                           <Card.Subtitle className="mb-2 text-muted">
                              {message.userEmail}
                           </Card.Subtitle>
                           <Card.Text>{message.question}</Card.Text>
                           <hr />
                           <div>
                              <h5>{t('response')}:</h5>
                              {message.response && message.adminEmail ? (
                                 <>
                                    <Card.Subtitle className="mb-2 text-muted">
                                       {message.adminEmail} ({t('admin')})
                                    </Card.Subtitle>
                                    <Card.Text>{message.response}</Card.Text>
                                 </>
                              ) : (
                                 <Card.Text className="fst-italic text-muted">
                                    {t('pending_response')}
                                 </Card.Text>
                              )}
                           </div>
                        </Card.Body>
                     </Card>
                  ))}
               </Stack>
            </>
         ) : (
            <h5>{t('no_questions')}</h5>
         )}
         {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
      </div>
   );
}

export { Messages };