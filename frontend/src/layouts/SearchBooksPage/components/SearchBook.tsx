/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { FC } from "react";
import bookImg from '../../../Images/BooksImages/book-1.png';
import { IBookModel } from "../../../models/BookModel";
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Image, Row } from "react-bootstrap";

interface IProps {
   book: IBookModel
}

const SearchBook: FC<IProps> = ({ book }) => {
   const { t } = useTranslation();

   return (
      <Card className="mt-3 shadow p-3 mb-3 bg-body rounded">
         <Row className="g-0">
            <Col md={2} className="d-flex justify-content-center align-items-center">
               <Image
                  src={book?.img ?? bookImg}
                  width={123}
                  height={196}
                  alt="Book"
                  fluid
               />
            </Col>
            <Col md={6}>
               <Card.Body>
                  <Card.Title as="h5">{book.author}</Card.Title>
                  <h4>{book.title}</h4>
                  <Card.Text>{book.description}</Card.Text>
               </Card.Body>
            </Col>
            <Col md={4} className="d-flex justify-content-center align-items-center">
               <Button className="text-white" href="#">
                  {t('view_details')}
               </Button>
            </Col>
         </Row>
      </Card>
   );
}

export { SearchBook };