/**
 * @author Luka Baturić
 * @date 15/02/2026
 */

import { ChangeEvent, FC } from "react";
import { Alert, Button, Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useManageBooks } from "../../Utils/useManageBooks";
import { Category } from "../../../models/BookModel";

const AddNewBook: FC = () => {
   const { t } = useTranslation();

   const {
      title,
      setTitle,
      author,
      setAuthor,
      description,
      setDescription,
      copies,
      setCopies,
      category,
      setCategory,
      displayWarning,
      displaySuccess,
      handleImageUpload,
      submitNewBook
   } = useManageBooks();

   return (
      <Card className="mt-4">
         <Card.Header>{t('add_new_book')}</Card.Header>
         <Card.Body>
            {displaySuccess && (
               <Alert variant="success">{t('book_add_success')}</Alert>
            )}
            {displayWarning && (
               <Alert variant="danger">{t('fill_all_fields')}.</Alert>
            )}
            <Form>
               <Row>
                  <Col md={6} className="mb-3">
                     <Form.Group>
                        <Form.Label>{t('title')}</Form.Label>
                        <Form.Control
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col md={3} className="mb-3">
                     <Form.Group>
                        <Form.Label>{t('author')}</Form.Label>
                        <Form.Control
                           type="text"
                           value={author}
                           onChange={(e) => setAuthor(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
                  <Col md={3} className="mb-3">
                     <Form.Label>{t('category')}</Form.Label>
                     <Dropdown>
                        <Dropdown.Toggle className="w-100" variant="secondary">
                           {t(category)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => setCategory(Category.FICTION)}>
                              {t('fiction')}
                           </Dropdown.Item>
                           <Dropdown.Item onClick={() => setCategory(Category.BIOGRAPHY)}>
                              {t('biography')}
                           </Dropdown.Item>
                           <Dropdown.Item onClick={() => setCategory(Category.SCIENCE)}>
                              {t('science')}
                           </Dropdown.Item>
                           <Dropdown.Item onClick={() => setCategory(Category.COMICS)}>
                              {t('comics')}
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </Col>
               </Row>
               <Form.Group className="mb-3">
                  <Form.Label>{t('description')}</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={3}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </Form.Group>
               <Row>
                  <Col md={3} className="mb-3">
                     <Form.Group>
                        <Form.Label>{t('copies')}</Form.Label>
                        <Form.Control
                           type="number"
                           value={copies}
                           onChange={(e) => setCopies(Number(e.target.value))}
                        />
                     </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                     <Form.Group>
                        <Form.Label>{t('upload_img')}</Form.Label>
                        <Form.Control
                           type="file"
                           onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              e.target.files && handleImageUpload(e.target.files[0])
                           }
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Button variant="primary" onClick={submitNewBook}>
                  {t('add')}
               </Button>
            </Form>
         </Card.Body>
      </Card>
   );
};

export { AddNewBook };