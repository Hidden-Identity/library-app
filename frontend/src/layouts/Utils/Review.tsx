/**
 * @author Luka Baturić
 * @date 14/08/2025
 */

import { FC } from "react";
import { IReviewModel } from "../../models/ReviewModel";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import { StarsReview } from "./StarsReview";

interface IProps {
   review: IReviewModel;
}

const Review: FC<IProps> = ({ review }) => {
   const { i18n } = useTranslation();

   const date = new Date(review.date);
   const dateRender = date.toLocaleString(i18n.language, {
      month: "long",
      day: "numeric",
      year: "numeric",
   });

   return (
      <>
         <Col xs={12} md={8} className="mb-3">
            <h5>{review.userEmail}</h5>
            <Row className="mb-2">
               <Col xs={6}>{dateRender}</Col>
               <Col xs={6}>
                  <StarsReview rating={review.rating} size={16} />
               </Col>
            </Row>
            <p>{review.reviewDescription}</p>
         </Col>
         <hr />
      </>
   );
}

export { Review };
