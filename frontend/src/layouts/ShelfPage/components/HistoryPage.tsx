/**
 * @author Luka Baturić
 * @date 08/02/2026
 */

import { FC, useState } from "react";
import { Button, Card, Col, Container, Image, Row, Spinner, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "../../Utils/useHistory";
import { Link } from "react-router-dom";
import { Pagination } from "../../Utils/Pagination";
import bookImg from "../../../Images/BooksImages/book-1.png"

const History: FC = () => {
   const { i18n, t } = useTranslation();

   const [httpError, setHttpError] = useState(null);

   const { histories, isLoadingHistory, currentPage, totalPages, paginate } = useHistory({ setHttpError });

   if (isLoadingHistory || httpError) {
      return (
         <Container className="d-flex justify-content-center align-items-center">
            {httpError
               ? <div className='container m-5'><p>{httpError}</p></div>
               : <Spinner className="m-5 primary" />}
         </Container>
      );
   }

   const localizeDate = (dateString: string): string => new Date(dateString).toLocaleString(
      i18n.language,
      { month: "numeric", day: "numeric", year: "numeric" }
   );

   return (
      <div className="mt-2">
         {histories.length > 0 ? (
            <>
               <h5>{t('recent_history')}:</h5>
               <Stack gap={3}>
                  {histories.map((history) => {
                     return (
                        <Card key={history.id} className="shadow-sm">
                           <Card.Body>
                              <Row className="g-3 align-items-start">
                                 <Col xs={12} lg={2} className="text-center">
                                    <Image
                                       src={history.img ?? bookImg}
                                       width={123}
                                       height={196}
                                       alt="Book"
                                    />
                                 </Col>
                                 <Col>
                                    <Card.Title>{history.author}</Card.Title>
                                    <Card.Subtitle className="mb-2 fs-5 fw-semibold">
                                       {history.title}
                                    </Card.Subtitle>
                                    <Card.Text>{history.description}</Card.Text>
                                    <hr className="my-3" />
                                    <Stack gap={1}>
                                       <small className="text-muted">
                                          {t('checked_out_on')}: {localizeDate(history.checkoutDate)}
                                       </small>
                                       <small className="text-muted">
                                          {t('returned_on')}: {localizeDate(history.returnedDate)}
                                       </small>
                                    </Stack>
                                 </Col>
                              </Row>
                           </Card.Body>
                        </Card>
                     );
                  })}
               </Stack>
            </>
         ) : (
            <>
               <h3 className="mt-3">{t('currently_no_history')}</h3>
               <Button as={Link as any} to="search">
                  {t('search_for_new_book')}
               </Button>
            </>
         )}
         {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
      </div>
   );
}

export { History };