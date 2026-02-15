/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { FC } from "react";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRoles } from "../Utils/useRoles";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";

const ManageLibraryPage: FC = () => {
   const { t } = useTranslation();

   const { roles, loading } = useRoles();

   if (loading) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            <Spinner className="m-5 primary" />
         </Container>
      );
   }

   if (!roles?.includes('admin')) {
      return <Redirect to='/home' />;
   }

   return (
      <Container className="mt-5">
         <h3>{t('manage_library')}</h3>
         <Tabs
            defaultActiveKey="add"
            id="manage-library-tabs"
            className="mb-3"
            mountOnEnter
         >
            <Tab eventKey="add" title={t('add_new_book')}>
               <AddNewBook />
            </Tab>
            <Tab eventKey="quantity" title={t('change_quantity')} unmountOnExit>
            </Tab>
            <Tab eventKey="messages" title={t('messages')} unmountOnExit>
               <AdminMessages />
            </Tab>
         </Tabs>
      </Container>
   );
};

export default ManageLibraryPage;