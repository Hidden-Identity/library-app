/**
 * @author Luka Baturić
 * @date 09/02/2026
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HistoryResponse, IHistoryModel } from "../../models/HistoryModel";
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
   setHttpError: Dispatch<SetStateAction<any>>;
}

interface IReturn {
   histories: IHistoryModel[];
   isLoadingHistory: boolean;
   currentPage: number;
   totalPages: number;
   paginate: (pageNumber: number) => void;
}

const useHistory = ({ setHttpError }: IProps): IReturn => {
   const { isAuthenticated, user } = useAuth0();

   const [histories, setHistories] = useState<IHistoryModel[]>([]);
   const [isLoadingHistory, setIsLoadingHistory] = useState(true);

   // Pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      const fetchUserHistory = async () => {
         if (isAuthenticated) {
            const url = `http://localhost:8080/api/histories/search/findBooksByUserEmail?userEmail=${user?.email}&page=${currentPage - 1}&size=5`;
            const requestOptions = {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            };

            const historyResponse = await fetch(url, requestOptions);

            if (!historyResponse.ok) {
               throw new Error("Something went wrong!");
            }

            const historyResponseJson: HistoryResponse = await historyResponse.json();

            setHistories(historyResponseJson._embedded.histories);
            setTotalPages(historyResponseJson.page.totalPages);
         }

         setIsLoadingHistory(false);
      };

      fetchUserHistory().catch((error: any) => {
         setIsLoadingHistory(false);
         setHttpError(error.message);
      });
   }, [currentPage, isAuthenticated, setHttpError, user]);

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

   return { histories, isLoadingHistory, currentPage, totalPages, paginate };
};

export { useHistory };
