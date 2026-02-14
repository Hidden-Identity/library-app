/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { useAuth0 } from "@auth0/auth0-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMessageModel, MessagesResponse } from "../../models/MessageModel";

interface IProps {
   setHttpError: Dispatch<SetStateAction<any>>;
   isAdminPage?: boolean
}

interface IReturn {
   messages: IMessageModel[];
   isLoadingMessages: boolean;
   currentPage: number;
   paginate: (pageNumber: number) => void;
   messagesPerPage: number;
   totalPages: number;
}

const useMessages = ({
   setHttpError,
   isAdminPage = false
}: IProps): IReturn => {
   const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

   const [isLoadingMessages, setIsLoadingMessages] = useState(true);
   const [messages, setMessages] = useState<IMessageModel[]>([]);
   const [messagesPerPage] = useState(5);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      const fetchUserMessages = async () => {
         if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently();
            const endpointParams = isAdminPage ? 'findByClosed?closed=false' : `findByUserEmail?userEmail=${user?.email}`;
            const url = `http://localhost:8080/api/messages/search/${endpointParams}&page=${currentPage - 1}&size=${messagesPerPage}`;
            const requestOptions = {
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
               }
            };

            const messagesResponse = await fetch(url, requestOptions);

            if (!messagesResponse.ok) {
               throw new Error('Something went wrong!');
            }

            const messagesResponseJson: MessagesResponse = await messagesResponse.json();

            setMessages(messagesResponseJson._embedded.messages);
            setTotalPages(messagesResponseJson.page.totalPages);
         }
         setIsLoadingMessages(false);
      }
      fetchUserMessages().catch((error: any) => {
         setIsLoadingMessages(false);
         setHttpError(error.messages);
      })

   }, [isAuthenticated, user, getAccessTokenSilently, currentPage, messagesPerPage, setHttpError]);

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

   return { messages, isLoadingMessages, currentPage, paginate, messagesPerPage, totalPages }
};

export { useMessages };