/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { FC } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { PostNewMessage } from "./components/PostNewMessage";
import { useTranslation } from "react-i18next";

const MessagesPage: FC = () => {
   const { t } = useTranslation();

   return (
      <Container className="mt-3 mb-2">
         <Tabs
            defaultActiveKey="submit"
            id="messages-tabs"
            className="mb-3"
            mountOnEnter
         >
            <Tab eventKey="submit" title={t('submit_question')}>
               <PostNewMessage />
            </Tab>
         </Tabs>
      </Container>
   );
};

export default MessagesPage;