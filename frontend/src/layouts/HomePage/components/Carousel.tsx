/**
 * @author Luka Baturić
 * @date 04/08/2025
 */

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Carousel as BootstrapCarousel, Button, Container, Row } from "react-bootstrap";
import { ReturnBook } from "./ReturnBook";

export interface IBook {
  author: string,
  hueFilterDeg?: number
}

const Carousel: FC = () => {
  const { t } = useTranslation();
  const carouselItems: IBook[] = [
    {
      author: 'Luka B.',
      hueFilterDeg: 0
    },
    {
      author: 'Ivan H.',
      hueFilterDeg: -40
    },
    {
      author: 'Marko P.',
      hueFilterDeg: 210
    }
  ];

  return (
    <Container className="mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title text-center mb-4">
        <h3>{t('find_your_next_book')}</h3>
      </div>
      <BootstrapCarousel indicators={false} interval={null} variant="dark" className="d-none d-lg-block">
        {carouselItems.map((book, index) => {
          index = index * 2 + index

          return (
            <BootstrapCarousel.Item key={index}>
              <Row className="justify-content-center align-items-center">
                <ReturnBook book={book} index={++index} />
                <ReturnBook book={book} index={++index} />
                <ReturnBook book={book} index={++index} />
              </Row>
            </BootstrapCarousel.Item>
          )
        })}
      </BootstrapCarousel>
      <Row className="d-lg-none justify-content-center">
        <ReturnBook book={carouselItems[0]} index={1} />
      </Row>
      <div className="homepage-carousel-title mt-4 text-center">
        <Button variant="outline-secondary" size="lg" href="#">
          {t('view_more')}
        </Button>
      </div>
    </Container>
  );
}

export { Carousel };