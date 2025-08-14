/**
 * @author Luka Baturić
 * @date 14/08/2025
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IReviewModel, ReviewsResponse } from "../../models/ReviewModel";
import { IBookModel } from "../../models/BookModel";

interface IProps {
   bookId: string;
   setHttpError: Dispatch<SetStateAction<any>>;
}

interface IReturn {
   reviews: IReviewModel[];
   totalStars: number;
   isLoadingReview: boolean;
}

const useFetchReviews = ({
   bookId,
   setHttpError
}: IProps): IReturn => {
   const [reviews, setReviews] = useState<IReviewModel[]>([]);
   const [totalStars, setTotalStars] = useState(0);
   const [isLoadingReview, setIsLoadingReview] = useState(true);

   useEffect(() => {
      const fetchBookReviews = async () => {
         const url = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

         const response = await fetch(url);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const responseJson: ReviewsResponse = await response.json();
         const responseData = responseJson._embedded.reviews;
         const loadedReviews: IReviewModel[] = [];
         let weightedStarReviews: number = 0;

         for (const key in responseData) {
            loadedReviews.push({
               id: responseData[key].id,
               userEmail: responseData[key].userEmail,
               date: responseData[key].date,
               rating: responseData[key].rating,
               book_id: responseData[key].bookId,
               reviewDescription: responseData[key].reviewDescription,
            });
            weightedStarReviews =
               weightedStarReviews + responseData[key].rating;
         }

         if (loadedReviews) {
            const round = (
               Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
            ).toFixed(1);
            setTotalStars(Number(round));
         }

         setReviews(loadedReviews);
         setIsLoadingReview(false);
      };

      fetchBookReviews().catch((error: any) => {
         setIsLoadingReview(false);
         setHttpError(error.message);
      });
   }, [bookId, setHttpError]);

   return {
      reviews,
      totalStars,
      isLoadingReview
   };
};

export { useFetchReviews };
