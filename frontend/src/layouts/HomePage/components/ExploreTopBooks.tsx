/**
 * @author Luka Baturić
 * @date 04/08/2025
 */

import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ExploreTopBooks: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-5 mb-4 bg-dark header">
      <Container fluid className="py-5 text-white d-flex justify-content-center align-items-center">
        <Row>
          <Col className="text-center">
            <h1 className="display-5 fw-bold">{t('find_next_adventure')}</h1>
            <p className="col-md-8 fs-4 mx-auto">{t('what_would_you_read')}</p>
            <Button variant="primary" size="lg" className="main-color text-white" href="#">
              {t('explore_top_books')}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { ExploreTopBooks };
