/**
 * @author Luka Baturić
 * @date 10/08/2025
 */

import { FC } from "react"
import bookImg from '../../Images/BooksImages/book-1.png';
import { useFetchBooks } from "../Utils/useFetchBooks";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";

const BookCheckoutPage: FC = () => {
   const { books, isLoading, httpError } = useFetchBooks({ fetchOne: true });
   const book = books[0];

   if (isLoading || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {isLoading ? <Spinner className="m-5 primary" /> : <p>{httpError}</p>}
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
               <StarsReview rating={4.5} size={32}/>
            </Container>
         <CheckoutAndReviewBox book={book}/>
         </Row>
         <hr />
      </Container>
   )
}
export default BookCheckoutPage;