/**
 * @author Luka Baturić
 * @date 12/08/2025
 */

import { FC } from "react";
import { IBookModel } from "../../models/BookModel";
import { useTranslation } from "react-i18next";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { capitalize } from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import { LeaveAReview } from "../Utils/LeaveAReview";

interface IProps {
   book?: IBookModel;
   currentLoansCount: number;
   isCheckedOut: boolean;
   checkoutBook: () => Promise<void>;
   isReviewLeft: boolean;
   submitReview: (rating: number, description: string) => Promise<void>;
}

const CheckoutAndReviewBox: FC<IProps> = ({ book, currentLoansCount, isCheckedOut, checkoutBook, isReviewLeft, submitReview }) => {
   const { t } = useTranslation();
   const { isAuthenticated } = useAuth0();

   const isAvailable = book?.copiesAvailable && book.copiesAvailable > 0;

   const buttonRender = () => {
      if (!isAuthenticated) {
         return (
            <Button as={Link as any} to="/login" variant="success" size="lg" className="mt-3">
               {t('sign_in')}
            </Button>
         );
      }
      if (isCheckedOut) {
         return <p><b>{t('book_checked_out')}</b></p>;
      }
      if (currentLoansCount >= 5) {
         return <p className="text-danger">{t('too_many_books')}</p>;
      }

      return <Button onClick={() => checkoutBook()} variant="success" size="lg" className="mt-3">{t('checkout')}</Button>;
   };

   const reviewRender = () => {
      if (!isAuthenticated) {
         return <><hr /><p>{t('sign_in_to_review')}</p></>;
      }

      if (isReviewLeft) {
         return <p><b>{t('thank_you_for_review')}</b></p>;
      }

      return <LeaveAReview submitReview={submitReview} />;
   };

   return (
      <Card className="mt-5 mt-lg-0 col-lg-3 mb-5">
         <Card.Body>
            <div className="mt-3">
               <p>
                  <b>{currentLoansCount}/5</b> {t('books_checked_out')}
               </p>
               <hr />
               <h4 className="mb-0">{isAvailable ? capitalize(t('available')) : t('wait_list')}</h4>
               <Row>
                  <Col xs={6} className="lead">
                     <b>{book?.copies ?? 0}</b> {t('copies')}
                  </Col>
                  <Col xs={6} className="lead">
                     <b>{book?.copiesAvailable ?? 0}</b> {t('available')}
                  </Col>
               </Row>
            </div>
            {buttonRender()}
            <hr />
            <p className="mt-3">{t('number_can_change')}</p>
            <p>{reviewRender()}</p>
         </Card.Body>
      </Card>
   )
}

export { CheckoutAndReviewBox };