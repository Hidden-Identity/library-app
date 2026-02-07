/**
 * @author Luka Baturić
 * @date 07/02/2026
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IShelfCurrentLoan } from "../../models/ShelfCurrentLoans";
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
   setHttpError: Dispatch<SetStateAction<any>>;
}

interface IReturn {
   shelfCurrentLoans: IShelfCurrentLoan[];
   isLoadingUserLoans: boolean;
   returnBook: (bookId: number) => Promise<void>;
   renewLoan: (bookId: number) => Promise<void>;
}

const useLoans = ({ setHttpError }: IProps): IReturn => {
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();

   const [shelfCurrentLoans, setShelfCurrentLoans] = useState<IShelfCurrentLoan[]>([]);
   const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
   const [checkout, setCheckout] = useState(false);

   useEffect(() => {
      const fetchUserCurrentLoans = async () => {
         if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently();
            const url = `http://localhost:8080/api/books/secure/currentloans`;
            const requestOptions = {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
               },
            };
            const shelfCurrentLoansResponse = await fetch(url, requestOptions);

            if (!shelfCurrentLoansResponse.ok) {
               throw new Error("Something went wrong!");
            }

            const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();

            setShelfCurrentLoans(shelfCurrentLoansResponseJson);
         }
         setIsLoadingUserLoans(false);
      };

      fetchUserCurrentLoans().catch((error: any) => {
         setIsLoadingUserLoans(false);
         setHttpError(error.message);
      });
   }, [isAuthenticated, getAccessTokenSilently, checkout, setHttpError]);

   const performLoansAction = async (url: string) => {
      const accessToken = await getAccessTokenSilently();
      const requestOptions = {
         method: "PUT",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
         throw new Error("Something went wrong!");
      }

      setCheckout(!checkout);
   };

   const returnBook = async (bookId: number) => {
      performLoansAction(`http://localhost:8080/api/books/secure/return?bookId=${bookId}`);
   };

   const renewLoan = async (bookId: number) => {
      performLoansAction(`http://localhost:8080/api/books/secure/renew/loan?bookId=${bookId}`);
   };

   return { shelfCurrentLoans, isLoadingUserLoans, returnBook, renewLoan };
};

export { useLoans };
