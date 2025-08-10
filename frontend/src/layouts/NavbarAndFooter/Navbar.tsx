/**
 * @author Luka Baturić
 * @date 04/08/2025
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { languages } from '../../translations/i18n';
import { NavLink } from 'react-router-dom';

const AppNavbar: FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <Navbar sticky="top" expand="lg" variant="dark" className="main-color py-3">
      <Container fluid>
        <img src="logo.png" alt="" height="35" className="me-2" />
        <Navbar.Brand>{t('library')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav>
            <Nav.Link as={NavLink} to="/home">{t('home')}</Nav.Link>
            <Nav.Link as={NavLink} to="/search">{t('search_books')}</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item className="m-1">
              <Button variant="outline-light" href="#">{t('sign_in')}</Button>
            </Nav.Item>
            <NavDropdown
              title={<FontAwesomeIcon icon={faLanguage} size='lg' />}
              id="language-dropdown"
              className="m-1"
              align="end"
            >
              {(Object.keys(languages) as Array<keyof typeof languages>).map((lng) => (
                <NavDropdown.Item
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  active={i18n.resolvedLanguage === lng}
                >
                  {i18n.resolvedLanguage === lng
                    ? languages[lng]?.nativeName
                    : `${languages[lng]?.foreignName} (${languages[lng]?.nativeName})`}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { AppNavbar };