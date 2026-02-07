/**
 * @author Luka Baturić
 * @date 07/02/2026
 */

import { FC } from "react";
import { Button, ListGroup, Modal, Row, Col, Image } from "react-bootstrap";
import bookImg from '../../../Images/BooksImages/book-1.png';
import { IShelfCurrentLoan } from "../../../models/ShelfCurrentLoans";
import { useTranslation } from "react-i18next";

interface IProps {
   selectedLoan: IShelfCurrentLoan;
   onHide: () => void;
   returnBook: (bookId: number) => Promise<void>;
   renewLoan: (bookId: number) => Promise<void>;
}

export const LoansModal: FC<IProps> = ({
   selectedLoan,
   onHide,
   returnBook,
   renewLoan
}) => {
   const { t } = useTranslation();
   const { book, daysLeft } = selectedLoan;

   const dueText = () => {
      if (daysLeft > 0) {
         return <p className="text-secondary">{daysLeft} {t('days_left_till_due')}.</p>;
      }

      if (daysLeft === 0) {
         return <p className="text-success">{t('due_today')}.</p>;
      }

      return (
         <p className="text-danger">{Math.abs(daysLeft)} {t('days_past_due')}.</p>
      );
   };

   return (
      <Modal show={true} onHide={onHide} backdrop="static" centered>
         <Modal.Header closeButton>
            <Modal.Title>{t('loan_options')}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row className="align-items-center mb-3">
               <Col xs="auto">
                  <Image
                     src={book?.img ?? bookImg}
                     width={56}
                     height={87}
                     alt="Book"
                  />
               </Col>
               <Col>
                  <h6 className="mb-0">{book.author}</h6>
                  <h5>{book.title}</h5>
               </Col>
            </Row>
            <hr className="my-3" />
            {dueText()}
            <ListGroup className="mt-3">
               <ListGroup.Item
                  action
                  onClick={() => {
                     returnBook(book.id);
                     onHide();
                  }}
               >
                  {t('return_book')}
               </ListGroup.Item>
               <ListGroup.Item
                  action
                  disabled={daysLeft < 0}
                  onClick={() => {
                     if (daysLeft >= 0) {
                        renewLoan(book.id);
                        onHide();
                     }
                  }}
               >
                  {daysLeft < 0 ? t('late_dues_unrenewable') : t('renew_loan_for_7_days')}
               </ListGroup.Item>
            </ListGroup>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
               {t('close')}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};