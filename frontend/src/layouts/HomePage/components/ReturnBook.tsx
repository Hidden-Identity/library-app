/**
 * @author Luka Baturić
 * @date 05/08/2025
 */

import { FC } from "react";
import bookImg from '../../../Images/BooksImages/book-1.png';
import { Button, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BookModel from "../../../models/BookModel";

interface IProps {
  book: BookModel
}

const ReturnBook: FC<IProps> = ({ book }) => {
  const { t } = useTranslation();

  return (
    <Col xs={6} sm={6} md={4} lg={3} className="mb-3 text-center">
      <img src={book?.img ? book.img : bookImg} width="151" height="233" alt="book" />
      <h6 className="mt-2">{book.title}</h6>
      <p>{book?.author ?? 'N/A'}</p>
      <Button variant="primary" href="#" className="text-white">
        {t('reserve')}
      </Button>
    </Col>
  )
}

export { ReturnBook };