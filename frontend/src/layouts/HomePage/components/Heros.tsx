/**
 * @author Luka Baturić
 * @date 05/08/2025
 */

import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Heros: FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();

  const heroTexts = [
    {
      header: t('hero_1_title'),
      paragraph: t('hero_1_paragraph')
    },
    {
      header: t('hero_2_title'),
      paragraph: t('hero_2_paragraph')
    },
  ]

  return (
    <>
      <div className="d-none d-lg-block">
        <Row className="g-0 mt-5">
          <Col lg={6}>
            <div className="col-image-left" />
          </Col>
          <Col as={Container} lg={4} className="d-flex justify-content-center align-items-center">
            <div className="ms-2">
              <h1>{heroTexts[0].header}</h1>
              <p className="lead">{heroTexts[0].paragraph}</p>
              <Button
                as={Link as any}
                variant="primary"
                className="main-color btn-lg text-white"
                to={isAuthenticated ? 'search' : '/login'}
              >
                {isAuthenticated ? t('explore_top_books') : t('sign_up')}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="g-0">
          <Col as={Container} lg={4} className="d-flex justify-content-center align-items-center">
            <div className="ms-2">
              <h1>{heroTexts[1].header}</h1>
              <p className="lead">{heroTexts[1].paragraph}</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="col-image-right" />
          </Col>
        </Row>
      </div>
      <Container className="d-lg-none">
        <Row className="m-2">
          <Col xs={12}>
            <div className="col-image-left" />
          </Col>
          <Col xs={12} className="mt-2">
            <h1>{heroTexts[0].header}</h1>
            <p className="lead">{heroTexts[0].paragraph}</p>
            <Button
              as={Link as any}
              variant="primary"
              className="main-color btn-lg text-white mb-3"
              to={isAuthenticated ? 'search' : '/login'}
            >
              {isAuthenticated ? t('explore_top_books') : t('sign_up')}
            </Button>
          </Col>
        </Row>
        <Row className="m-2">
          <Col xs={12}>
            <div className="col-image-right" />
          </Col>
          <Col xs={12} className="mt-2">
            <h1>{heroTexts[1].header}</h1>
            <p className="lead">{heroTexts[1].paragraph}</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export { Heros };