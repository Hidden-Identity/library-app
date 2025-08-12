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

interface IProps {
   book?: IBookModel
}

const CheckoutAndReviewBox: FC<IProps> = ({ book }) => {
   const {t} = useTranslation();

   const isAvailable = book?.copiesAvailable && book.copiesAvailable > 0;

   return (
      <Card className="mt-5 mt-lg-0 col-lg-3 mb-5">
      <Card.Body>
        <div className="mt-3">
          <p>
            <b>0/5</b> {t('books_checked_out')}
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
        <Button as={Link as any} to="/#" variant="success" size="lg" className="mt-3">
          {t('sign_in')}
        </Button>
        <hr />
        <p className="mt-3">{t('number_can_change')}</p>
        <p>{t('sign_in_to_review')}</p>
      </Card.Body>
    </Card>
   )
}

export { CheckoutAndReviewBox };