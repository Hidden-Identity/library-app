/**
 * @author Luka Baturić
 * @date 21/02/2026
 */

import { FC, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { Pagination } from "../../Utils/Pagination";
import { useFetchBooks } from "../../Utils/useFetchBooks";
import { ChangeQuantityOfBook } from "./ChangeQuantityOfBook";
import { useTranslation } from "react-i18next";

const ChangeQuantityOfBooks: FC = () => {
   const { t } = useTranslation();

   const [httpError, setHttpError] = useState(null);

   const {
      books,
      isLoading,
      currentPage,
      paginate,
      booksPerPage,
      totalAmountOfBooks,
      totalPages
   } = useFetchBooks({ setHttpError, usePagination: true });

   const indexOfLastBook = currentPage * booksPerPage;
   const indexOfFirstBook = indexOfLastBook - booksPerPage;
   const lastItem = booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

   if (isLoading || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {httpError
               ? <div className='container m-5'><p>{httpError}</p></div>
               : <Spinner className="m-5 primary" />}
         </Container>
      );
   }

   return (
      <Container className="mt-5">
         {totalAmountOfBooks > 0 ? (
            <>
               <Row className="mt-3">
                  <Col>
                     <h3>{t('number_of_results')}: ({totalAmountOfBooks})</h3>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <p>{t('showing')} {indexOfFirstBook + 1} - {lastItem} {t('out_of')} {totalAmountOfBooks} {t('items')}:</p>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     {books.map((book) => (
                        <ChangeQuantityOfBook
                           book={book}
                           key={book.id}
                        />
                     ))}
                  </Col>
               </Row>
            </>
         ) : (
            <Alert variant="info">{t('add_book_to_change_quantity')}</Alert>
         )}
         {totalPages > 1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
         }
      </Container>
   );
};

export { ChangeQuantityOfBooks };