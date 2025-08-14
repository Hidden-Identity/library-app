/**
 * @author Luka Baturić
 * @date 10/08/2025
 */

import { FC, useState } from "react"
import bookImg from '../../Images/BooksImages/book-1.png';
import { useFetchBooks } from "../Utils/useFetchBooks";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { useFetchReviews } from "../Utils/useFetchReviews";
import { LatestReviews } from "./LatestReviews";

const BookCheckoutPage: FC = () => {
   const [httpError, setHttpError] = useState(null);
   const { bookId, books, isLoading } = useFetchBooks({ setHttpError, fetchOne: true });
   const book = books[0];
   const {reviews, totalStars, isLoadingReview} = useFetchReviews({bookId, setHttpError});

   if (isLoading || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {isLoading || isLoadingReview ? <Spinner className="m-5 primary" /> : <p>{httpError}</p>}
         </Container>
      );
   }

   return (
      <Container className="mt-5">
         <Row className="align-items-center">
            <Col sm={12} md={4} lg={3} className="text-center mb-4">
               <Image
                  src={book?.img ?? bookImg}
                  width={226}
                  height={349}
                  alt="Book"
                  thumbnail
               />
            </Col>
            <Container as={Col} xs={12} md={7} lg={5}>
               <h2>{book?.title}</h2>
               <h5 className="text-primary">{book?.author}</h5>
               <p className="lead">{book?.description}</p>
               <StarsReview rating={totalStars} size={32}/>
            </Container>
         <CheckoutAndReviewBox book={book}/>
         </Row>
         <hr />
         <LatestReviews reviews={reviews} bookId={book?.id}/>
      </Container>
   )
}
export default BookCheckoutPage;