/**
 * @author Luka Baturić
 * @date 04/08/2025
 */

import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Carousel as BootstrapCarousel, Button, Container, Row, Spinner } from "react-bootstrap";
import { ReturnBook } from "./ReturnBook";
import BookModel from "../../../models/BookModel";
import { chunk } from "lodash";

const Carousel: FC = () => {
  const { t } = useTranslation();

  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = "http://localhost:8080/api/books";
      const url = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      const loadedBooks: BookModel[] = []

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img
        })
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };

    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, [])

  if (isLoading || httpError) {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        {isLoading ? <Spinner className="m-5 primary"/> : <p>{httpError}</p>}
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title text-center mb-4">
        <h3>{t('find_your_next_book')}</h3>
      </div>
      <BootstrapCarousel indicators={false} interval={null} variant="dark" className="d-none d-lg-block">
        {chunk(books, 3).map((group, index) => (
          <BootstrapCarousel.Item key={index}>
            <Row className="justify-content-center align-items-center">
              {group.map(book => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </Row>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
      <Row className="d-lg-none justify-content-center">
        <ReturnBook book={books[0]} key={books[0].id} />
      </Row>
      <div className="homepage-carousel-title mt-4 text-center">
        <Button variant="outline-secondary" size="lg" href="#">
          {t('view_more')}
        </Button>
      </div>
    </Container>
  );
}

export { Carousel };