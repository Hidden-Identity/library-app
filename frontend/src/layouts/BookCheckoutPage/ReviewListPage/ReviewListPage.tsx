/**
 * @author Luka Baturić
 * @date 04/02/2026
 */

import { FC, useState } from 'react';
import { Pagination } from '../../Utils/Pagination';
import { Review } from '../../Utils/Review';
import { Container, Row, Spinner, Stack } from 'react-bootstrap';
import { useFetchReviews } from '../../Utils/useFetchReviews';
import { useTranslation } from 'react-i18next';

const ReviewListPage: FC = () => {
   const { t } = useTranslation();

   const [httpError, setHttpError] = useState(null);

   const bookId = (window.location.pathname).split('/')[2];
   const {
      reviews,
      isLoadingReview,
      currentPage,
      reviewsPerPage,
      totalAmountOfReviews,
      totalPages,
      paginate
   } = useFetchReviews({ bookId, setHttpError, usePagination: true });

   if (isLoadingReview || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {httpError
               ? <div className='container m-5'><p>{httpError}</p></div>
               : <Spinner className="m-5 primary" />}
         </Container>
      );
   }

   const indexOfLastReview: number = currentPage * reviewsPerPage;
   const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;
   let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews
      ? reviewsPerPage * currentPage
      : totalAmountOfReviews;

   return (
      <Container className="mt-5">
         <Stack gap={2} className="mb-3">
            <h3>{t('comments')}: ({reviews.length})</h3>
            <p>{t('showing')} {indexOfFirstReview + 1} - {lastItem} {t('out_of')} {totalAmountOfReviews} {t('items')}:</p>
         </Stack>
         <Row>
            {reviews.map((review) => (
               <Review review={review} key={review.id} />
            ))}
         </Row>
         {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
      </Container>
   );
}

export {ReviewListPage};