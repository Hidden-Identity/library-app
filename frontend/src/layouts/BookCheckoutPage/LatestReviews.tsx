/**
 * @author Luka Baturić
 * @date 14/08/2025
 */

import { FC } from "react";
import { IReviewModel } from "../../models/ReviewModel";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Review } from "../Utils/Review";

interface IProps {
   reviews: IReviewModel[];
   bookId?: number;
}

const LatestReviews: FC<IProps> = ({
   reviews,
   bookId
}) => {
   const { t } = useTranslation();

   const hasReviews = reviews.length > 0;

   return (
      <Row className="mt-5">
         <Col xs={12} md={2} className="mb-3 mb-md-0">
            <h2>{t('latest_reviews')}:</h2>
         </Col>
         <Col xs={12} md={10}>
            {hasReviews ? (
               <>
                  {reviews.slice(0, 3).map((eachReview) => (
                     <Review review={eachReview} key={eachReview.id} />
                  ))}
                  <div className="m-3">
                     <Button
                        as={Link as any}
                        to={`/reviews/${bookId ?? ""}`}
                        className="main-color text-white"
                     >
                        {t('read_all_reviews')}
                     </Button>
                  </div>
               </>
            ) : (
               <div className="m-3">
                  <p className="lead">
                     {t('no_reviews_for_book')}
                  </p>
               </div>
            )}
         </Col>
      </Row>
   );
}

export { LatestReviews };