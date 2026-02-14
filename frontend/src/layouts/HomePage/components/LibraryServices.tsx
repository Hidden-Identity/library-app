/**
 * @author Luka Baturić
 * @date 05/08/2025
 */

import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LibraryServices: FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();

  return (
    <Container className="my-5">
      <Row className="p-4 align-items-center border shadow-lg">
        <Col lg={7} className="p-3">
          <h1 className="display-4 fw-bold">
            {t('cant_find_desired')}
          </h1>
          <p className="lead">
            {t('contact_library_admin')}
          </p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
            <Button
              as={Link as any}
              className="main-color btn-lg text-white"
              to={isAuthenticated ? '/messages' : '/login'}
            >
              {isAuthenticated ? t('library_services') : t('sign_up')}
            </Button>
          </div>
        </Col>
        <Col lg={{ span: 4, offset: 1 }} className="shadow-lg lost-image" />
      </Row>
    </Container>
  )
}

export { LibraryServices };