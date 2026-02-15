/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { FC, useState } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";
import { useTranslation } from "react-i18next";
import { useMessages } from "../../Utils/useMessages";
import { AdminMessage } from "./AdminMessage";

const AdminMessages: FC = () => {
   const { t } = useTranslation();

   const [httpError, setHttpError] = useState(null);

   const {
      messages,
      isLoadingMessages,
      currentPage,
      totalPages,
      paginate,
      submitResponseToQuestion
   } = useMessages({ setHttpError, isAdminPage: true });

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
      <Container className="mt-3">
         {messages.length > 0 ? (
            <>
               <h5 className="mb-3">{t('pending_qna')}:</h5>
               <Stack gap={3}>
                  {messages.map((message) => (
                     <AdminMessage
                        key={message.id}
                        message={message}
                        onSubmit={(messageId, questionResponse) =>
                           submitResponseToQuestion(messageId, questionResponse)
                        }
                     />
                  ))}
               </Stack>
            </>
         ) : (
            <h5>{t('no_pending_qna')}</h5>
         )}
         {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
      </Container>
   );
};

export { AdminMessages };