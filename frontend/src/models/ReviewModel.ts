/**
 * @author Luka Baturić
 * @date 14/08/2025
 */

import { HalResource } from "hal-types";
import { IPageMetadata } from "./PageMetadata";

interface IReviewModel {
   id: number;
   userEmail: string;
   date: string;
   rating: number;
   book_id: number;
   reviewDescription?: number;
}

interface IReviewWithLinksResponse extends IReviewModel {
   _links: {
      self: { href: string };
      review: { href: string };
   };
}

type CamelCaseReview = Omit<IReviewWithLinksResponse, "book_id"> & {
  bookId: IReviewWithLinksResponse["book_id"];
};

type ReviewsResponse = HalResource<{
   _embedded: {
      reviews: CamelCaseReview[];
   };
   page: IPageMetadata;
}>;

export {
   type IReviewModel,
   type ReviewsResponse,
   type IReviewWithLinksResponse,
};
