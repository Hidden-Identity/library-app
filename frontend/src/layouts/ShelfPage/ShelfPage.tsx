/**
 * @author Luka Baturić
 * @date 07/02/2026
 */

import { FC } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { Loans } from "./components/Loans";
import { useTranslation } from "react-i18next";

const ShelfPage: FC = () => {
   const { t } = useTranslation();

   return (
      <Container className="mt-3">
         <Tabs
            defaultActiveKey="loans"
            id="shelf-tabs"
            className="mb-3"
            mountOnEnter
         >
            <Tab eventKey="loans" title={t('loans')}>
               <Loans />
            </Tab>
            <Tab eventKey="history" title={t('your_history')}>
            </Tab>
         </Tabs>
      </Container>
   );
};

export default ShelfPage;