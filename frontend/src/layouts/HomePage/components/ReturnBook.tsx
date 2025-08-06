/**
 * @author Luka Baturić
 * @date 05/08/2025
 */

import { FC } from "react";
import bookImg from '../../../Images/BooksImages/book-1.png';
import { type IBook } from "./Carousel";
import { Button, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface IProps {
  book: IBook,
  index: number
}

const ReturnBook: FC<IProps> = ({ book, index }) => {
  const { t } = useTranslation();

  return (
    <Col xs={6} sm={6} md={4} lg={3} className="mb-3 text-center">
      <img src={bookImg} width="151" height="233" alt="book" style={{ filter: `hue-rotate(${book?.hueFilterDeg}deg)`}}/>
      <h6 className="mt-2">{`${t('book')} ${index}`}</h6>
      <p>{book.author}</p>
      <Button href="#" className="main-color text-white">
        {t('reserve')}
      </Button>
    </Col>
  )
}

export { ReturnBook };