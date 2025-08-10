/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { FC } from "react"
import { useFetchBooks } from "../Utils/useFetchBooks";
import { Button, Col, Container, Dropdown, Form, Row, Spinner } from "react-bootstrap";
import { SearchBook } from "./components/SearchBook";
import { useTranslation } from "react-i18next";
import { Pagination } from "../Utils/Pagination";
import { Category } from "../../models/BookModel";

const SearchBooksPage: FC = () => {
   const { t } = useTranslation();

   const {
      books,
      isLoading,
      httpError,
      currentPage,
      paginate,
      booksPerPage,
      totalAmountOfBooks,
      totalPages,
      searchHandler,
      setSearch,
      categorySelection,
      categoryField
   } = useFetchBooks({ usePagination: true });

   const indexOfLastBook = currentPage * booksPerPage;
   const indexOfFirstBook = indexOfLastBook - booksPerPage;
   let lastIndexOnCurrentPage = booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

   if (isLoading || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {isLoading ? <Spinner className="m-5 primary" /> : <p>{httpError}</p>}
         </Container>
      );
   }

   return (
      <Container>
         <Row className="mt-5">
            <Col md={6}>
               <Form
                  className="d-flex"
                  onSubmit={e => {
                     e.preventDefault();
                     searchHandler();
                  }}
               >
                  <Form.Control
                     type="search"
                     placeholder={t('search')}
                     aria-label="Search"
                     className="me-2"
                     onChange={e => setSearch(e.target.value)}
                  />
                  <Button variant="outline-success" onClick={() => searchHandler()}>{t('search')}</Button>
               </Form>
            </Col>
            <Col md={4}>
               <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdownMenuButton1">
                     {t(`${categorySelection}`)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={() => categoryField(t('all_categories'))}>{t('all_categories')}</Dropdown.Item>
                     <Dropdown.Item onClick={() => categoryField(Category.FICTION)}>{t('fiction')}</Dropdown.Item>
                     <Dropdown.Item onClick={() => categoryField(Category.BIOGRAPHY)}>{t('biography')}</Dropdown.Item>
                     <Dropdown.Item onClick={() => categoryField(Category.SCIENCE)}>{t('science')}</Dropdown.Item>
                     <Dropdown.Item onClick={() => categoryField(Category.COMICS)}>{t('comics')}</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Col>
            {totalAmountOfBooks > 0
               ? <>
                  <div className="mt-3">
                     <h5>{t('number_of_results')}: ({totalAmountOfBooks})</h5>
                  </div>
                  <p>{t('showing')} {indexOfFirstBook + 1} - {lastIndexOnCurrentPage} {t('out_of')} {totalAmountOfBooks} {t('items')}:</p>
                  {books.map(book => (
                     <SearchBook book={book} key={book.id} />
                  ))}
               </>
               : (
                  <div className="m-5">
                     <h3>{t('cant_find_desired')}</h3>
                     <Button variant="primary" href="#"
                        className="px-4 me-md-2 mt-1 fw-bold text-white"
                     >
                        Library Services
                     </Button>
                  </div>
               )
            }
            {totalPages > 1 &&
               <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
         </Row>
      </Container>
   );
}

export default SearchBooksPage;