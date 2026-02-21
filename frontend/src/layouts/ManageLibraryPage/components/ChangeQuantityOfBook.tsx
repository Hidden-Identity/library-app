/**
 * @author Luka Baturić
 * @date 21/02/2026
 */

import { FC } from "react";
import { Button, Card, Col, Row, Stack, Image } from "react-bootstrap";
import bookImg from '../../../Images/BooksImages/book-1.png';
import { IBookModel } from "../../../models/BookModel";
import { useManageBooks } from "../../Utils/useManageBooks";
import { useTranslation } from "react-i18next";

interface IProps {
   book: IBookModel
}

const ChangeQuantityOfBook: FC<IProps> = ({ book }) => {
   const { t } = useTranslation();

   const { quantity, remaining, deleteBook, increaseQuantity, decreaseQuantity } = useManageBooks(book);

   return (
      <Card className="mt-3 shadow mb-3 bg-body rounded p-3">
         <Row className="g-0 align-items-center">
            <Col md={2} className="text-center">
               <Image
                  src={book.img ?? bookImg}
                  fluid
                  width={123}
                  height={196}
               />
            </Col>
            <Col md={6}>
               <Card.Body>
                  <Card.Title>{book.author}</Card.Title>
                  <Card.Subtitle className="mb-2 fs-4">{book.title}</Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
               </Card.Body>
            </Col>
            <Col md={3} className="mt-3 text-center">
               <Stack gap={2}>
                  <div>
                     {t('total_quantity')}: <b>{quantity}</b>
                  </div>
                  <div>
                     {t('books_remaining')}: <b>{remaining}</b>
                  </div>
               </Stack>
            </Col>
            <Col md={2} className="mt-3 text-start">
               <Button
                  variant="danger"
                  size="sm"
                  onClick={deleteBook}
               >
                  {t('delete')}
               </Button>
            </Col>
         </Row>
         <Row xs={12} className="m1 mt-3">
            <Stack gap={2}>
               <Button
                  variant="success"
                  onClick={increaseQuantity}
               >
                  {t('add_quantity')}
               </Button>
               <Button
                  variant="warning"
                  onClick={decreaseQuantity}
               >
                  {t('decrease_quantity')}
               </Button>
            </Stack>
         </Row>
      </Card>
   );
};

export { ChangeQuantityOfBook };