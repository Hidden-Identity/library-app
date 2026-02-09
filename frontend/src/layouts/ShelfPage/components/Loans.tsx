/**
 * @author Luka Baturić
 * @date 07/02/2026
 */

import { FC, useState } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoans } from "../../Utils/useLoans";
import bookImg from '../../../Images/BooksImages/book-1.png';
import { useTranslation } from "react-i18next";
import { LoansModal } from "./LoansModal";
import { IShelfCurrentLoan } from "../../../models/ShelfCurrentLoans";

const Loans: FC = () => {
   const { t } = useTranslation();

   const [httpError, setHttpError] = useState(null);
   const [selectedLoan, setSelectedLoan] = useState<IShelfCurrentLoan | null>(null);

   const { shelfCurrentLoans, isLoadingUserLoans, returnBook, renewLoan } = useLoans({ setHttpError });

   if (isLoadingUserLoans || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {httpError
               ? <div className='container m-5'><p>{httpError}</p></div>
               : <Spinner className="m-5 primary" />}
         </Container>
      );
   }

   return (
      <Container className="mt-2">
         {shelfCurrentLoans.length > 0
            ? (
               <>
                  <h5 className="mb-3">{t('current_loans')}:</h5>
                  {shelfCurrentLoans.map((loan) => {
                     const book = loan.book;
                     const dueText = loan.daysLeft > 0
                        ? <p className="text-secondary">{loan.daysLeft} {t('days_left_till_due')}.</p>
                        : loan.daysLeft === 0
                           ? <p className="text-success">{t('due_today')}.</p>
                           : <p className="text-danger">{Math.abs(loan.daysLeft)} {t('days_past_due')}.</p>;

                     return (
                        <div key={book.id} className="mb-4">
                           <Row className="g-4 align-items-center justify-content-around">
                              <Col xs={12} lg={4} className="text-center">
                                 <Image
                                    src={book?.img ?? bookImg}
                                    width="226"
                                    height="349"
                                    alt="Book"
                                    fluid
                                 />
                              </Col>
                              <Col xs={12} lg={4}>
                                 <Card>
                                    <Card.Body>
                                       <h4>{t('loan_options')}</h4>
                                       {dueText}
                                       <ListGroup className="mt-3">
                                          <ListGroup.Item action onClick={() => setSelectedLoan(loan)}>
                                             {t('manage_loan')}
                                          </ListGroup.Item>
                                          <ListGroup.Item
                                             as={Link}
                                             to="search"
                                             action
                                          >
                                             {t('search_more_books')}?
                                          </ListGroup.Item>
                                       </ListGroup>
                                       <hr className="my-3" />
                                       <p>
                                          {t('help_others_by_reviewing')}.
                                       </p>
                                       <Button
                                          as={Link as any}
                                          to={`/checkout/${book.id}`}
                                          variant="primary"
                                       >
                                          {t('leave_a_review')}
                                       </Button>
                                    </Card.Body>
                                 </Card>
                              </Col>
                           </Row>
                              {selectedLoan === loan && (
                                 <LoansModal
                                    selectedLoan={loan}
                                    onHide={() => setSelectedLoan(null)}
                                    returnBook={returnBook}
                                    renewLoan={renewLoan}
                                 />
                              )}
                           <hr className="my-4" />
                        </div>
                     );
                  })}
               </>
            ) : (
               <>
                  <h3 className="mt-3">{t('currently_no_loans')}</h3>
                  <Button as={Link as any} to="search">
                     {t('search_for_new_book')}
                  </Button>
               </>
            )}
      </Container>
   );

}

export { Loans };