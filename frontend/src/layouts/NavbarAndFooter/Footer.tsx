/**
 * @author Luka Baturić
 * @date 05/08/2025
 */

import { FC } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <Container as="footer" fluid className="py-5 main-color text-white">
      <Row className="align-items-center">
        <Col xs={6}>
          <p className="mb-0">&copy; {t('library_app')}</p>
        </Col>
        <Col xs={6}>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href="#" className="px-2 text-white">
                {t('home')}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="px-2 text-white">
                {t('search_books')}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export { Footer };