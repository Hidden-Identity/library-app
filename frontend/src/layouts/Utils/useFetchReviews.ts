/**
 * @author Luka Baturić
 * @date 14/08/2025
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IReviewModel, ReviewsResponse } from "../../models/ReviewModel";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

interface IProps {
   bookId: string;
   setHttpError: Dispatch<SetStateAction<any>>;
   usePagination?: boolean;
}

interface IReturn {
   reviews: IReviewModel[];
   totalStars: number;
   isLoadingReview: boolean;
   isReviewLeft: boolean;
   isLoadingUserReview: boolean;
   submitReview: (rating: number, description: string) => Promise<void>;
   currentPage: number;
   paginate: (pageNumber: number) => void;
   reviewsPerPage: number;
   totalAmountOfReviews: number;
   totalPages: number;
}

const useFetchReviews = ({
   bookId,
   setHttpError,
   usePagination = false,
}: IProps): IReturn => {
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();

   const [reviews, setReviews] = useState<IReviewModel[]>([]);
   const [totalStars, setTotalStars] = useState(0);
   const [isLoadingReview, setIsLoadingReview] = useState(true);

   const [isReviewLeft, setIsReviewLeft] = useState(false);
   const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

   const [currentPage, setCurrentPage] = useState(1);
   const [reviewsPerPage] = useState(5);
   const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      const fetchBookReviews = async () => {
         const baseUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
         let url = baseUrl;

         if (usePagination) {
            url = `${baseUrl}&page=${currentPage - 1}&size=${reviewsPerPage}`
         }

         const response = await fetch(url);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const responseJson: ReviewsResponse = await response.json();
         const responseData = responseJson._embedded.reviews;

         if (usePagination) {
            setTotalAmountOfReviews(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
         }

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

         if (loadedReviews && !usePagination) {
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
   }, [bookId, setHttpError, isReviewLeft, usePagination, currentPage, reviewsPerPage]);

   useEffect(() => {
      if (usePagination) {
         return;
      }

      const fetchUserReviewBook = async () => {
         if (isAuthenticated) {
               const accessToken = await getAccessTokenSilently();
               const url = `http://localhost:8080/api/reviews/secure/user/book?bookId=${bookId}`;
               const requestOptions = {
                  method: 'GET',
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                     'Content-Type': 'application/json'
                  }
               };
               const userReview = await fetch(url, requestOptions);

               if (!userReview.ok) {
                  throw new Error('Something went wrong');
               }

               const userReviewResponseJson = await userReview.json();

               setIsReviewLeft(userReviewResponseJson);
         }
         setIsLoadingUserReview(false);
      }

      fetchUserReviewBook().catch((error: any) => {
         setIsLoadingUserReview(false);
         setHttpError(error.message);
      })
   }, [bookId, isAuthenticated, getAccessTokenSilently, setHttpError, usePagination]);

   const submitReview = async (rating: number, description: string) => { 
      const reviewRequestModel = new ReviewRequestModel(rating, Number(bookId), description);
      const url = `http://localhost:8080/api/reviews/secure`;
      const accessToken = await getAccessTokenSilently();
      const requestOptions = {
         method: 'POST',
         headers: {
               Authorization: `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
         },
         body: JSON.stringify(reviewRequestModel)
      };

      const returnResponse = await fetch(url, requestOptions);

      if (!returnResponse.ok) {
         throw new Error('Something went wrong!');
      }

      setIsReviewLeft(true);
   }

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
   
   return {
      reviews,
      totalStars,
      isLoadingReview,
      isReviewLeft,
      isLoadingUserReview,
      submitReview,
      currentPage,
      reviewsPerPage,
      totalAmountOfReviews,
      totalPages,
      paginate
   };
};

export { useFetchReviews };
