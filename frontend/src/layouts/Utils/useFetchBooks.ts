/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
   IBookModel,
   BooksResponse,
   Category,
   IBookWithLinksResponse,
} from "../../models/BookModel";
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
   setHttpError: Dispatch<SetStateAction<any>>;
   page?: number;
   size?: number;
   usePagination?: boolean;
   fetchOne?: boolean;
}

interface IReturn {
   books: IBookModel[];
   setBooks: Dispatch<SetStateAction<IBookModel[]>>;
   bookId: string;
   isLoading: boolean;
   currentPage: number;
   paginate: (pageNumber: number) => void;
   booksPerPage: number;
   totalAmountOfBooks: number;
   totalPages: number;
   setSearch: Dispatch<SetStateAction<string>>;
   searchHandler: () => void;
   categorySelection: string;
   categoryField: (value: string) => void;
   currentLoansCount: number;
   isLoadingCurrentLoansCount: boolean;
   isCheckedOut: boolean;
   isLoadingBookCheckedOut: boolean;
   checkoutBook: () => Promise<void>
}

const useFetchBooks = ({
   setHttpError,
   page = 0,
   size = 9,
   usePagination = false,
   fetchOne = false,
}: IProps): IReturn => {
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();

   const [books, setBooks] = useState<IBookModel[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const [booksPerPage] = useState(5);
   const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [search, setSearch] = useState("");
   const [searchUrl, setSearchUrl] = useState("");
   const [categorySelection, setCategorySelection] = useState("all_categories");

   const [currentLoansCount, setCurrentLoansCount] = useState(0);
   const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
      useState(true);
   const [isCheckedOut, setIsCheckedOut] = useState(false);
   const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

   const bookId = window.location.pathname.split("/")[2];

   useEffect(() => {
      const fetchBooks = async () => {
         const baseUrl = "http://localhost:8080/api/books";
         let url = "";

         if (fetchOne) {
            url = baseUrl + `/${bookId}`;
         } else {
            if (searchUrl === "") {
               url = usePagination
                  ? `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`
                  : `${baseUrl}?page=${page}&size=${size}`;
            } else {
               let searchWithPage = searchUrl.replace(
                  "<pageNumber>",
                  `${currentPage - 1}`
               );
               url = baseUrl + searchWithPage;
            }
         }

         const response = await fetch(url);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         let loadedBooks: IBookModel[] = [];

         if (fetchOne) {
            const responseJson: IBookWithLinksResponse = await response.json();
            const { _links, ...rest } = responseJson;
            loadedBooks = [rest];
         } else {
            const responseJson: BooksResponse = await response.json();
            const responseData = responseJson._embedded.books;

            if (usePagination) {
               setTotalAmountOfBooks(responseJson.page.totalElements);
               setTotalPages(responseJson.page.totalPages);
            }

            for (const key in responseData) {
               loadedBooks.push({
                  id: responseData[key].id,
                  title: responseData[key].title,
                  author: responseData[key].author,
                  description: responseData[key].description,
                  copies: responseData[key].copies,
                  copiesAvailable: responseData[key].copiesAvailable,
                  category: responseData[key].category,
                  img: responseData[key].img
               });
            }
         }

         setBooks(loadedBooks);
         setIsLoading(false);
      };

      fetchBooks().catch((error: any) => {
         setIsLoading(false);
         setHttpError(error.message);
      });

      window.scrollTo(0, 0);
   }, [bookId, booksPerPage, currentPage, fetchOne, page, searchUrl, setHttpError, size, usePagination, isCheckedOut]);

   useEffect(() => {
      if (!fetchOne) {
         return;
      }

      const fetchUserCurrentLoansCount = async () => {
         if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently();
            const url = `http://localhost:8080/api/books/secure/currentloans/count`;
            const requestOptions = {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
               },
            };
            const currentLoansCountResponse = await fetch(url, requestOptions);
            if (!currentLoansCountResponse.ok) {
               throw new Error("Something went wrong!");
            }
            const currentLoansCountResponseJson =
               await currentLoansCountResponse.json();
            setCurrentLoansCount(currentLoansCountResponseJson);
         }
         setIsLoadingCurrentLoansCount(false);
      };
      fetchUserCurrentLoansCount().catch((error: any) => {
         setIsLoadingCurrentLoansCount(false);
         setHttpError(error.message);
      });
   }, [isAuthenticated, getAccessTokenSilently, isCheckedOut, setHttpError, isCheckedOut, fetchOne]);

   useEffect(() => {
      if (!fetchOne) {
         return;
      }

      const fetchUserCheckedOutBook = async () => {
         if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently();
            const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
            const requestOptions = {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
               },
            };
            const bookCheckedOut = await fetch(url, requestOptions);

            if (!bookCheckedOut.ok) {
               throw new Error("Something went wrong!");
            }

            const bookCheckedOutResponseJson = await bookCheckedOut.json();
            setIsCheckedOut(bookCheckedOutResponseJson);
         }
         setIsLoadingBookCheckedOut(false);
      };
      fetchUserCheckedOutBook().catch((error: any) => {
         setIsLoadingBookCheckedOut(false);
         setHttpError(error.message);
      });
   }, [bookId, isAuthenticated, getAccessTokenSilently, setHttpError, fetchOne]);

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

   const searchHandler = () => {
      setCurrentPage(1);

      if (search === "") {
         setSearchUrl("");
      } else {
         setSearchUrl(
            `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
         );
      }
      setCategorySelection("all_categories");
   };

   const categoryField = (value: string) => {
      setCurrentPage(1);
      if (
         Object.values(Category)
            .map((v) => v.toLowerCase())
            .includes(value.toLowerCase() as Category)
      ) {
         setCategorySelection(value.toLowerCase());
         setSearchUrl(
            `/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`
         );
      } else {
         setCategorySelection("all_categories");
         setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
      }
   };

   async function checkoutBook() {
      const accessToken = await getAccessTokenSilently();
      const url = `http://localhost:8080/api/books/secure/checkout?bookId=${books[0]?.id}`;
      const requestOptions = {
         method: "PUT",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
      };
      const checkoutResponse = await fetch(url, requestOptions);
      if (!checkoutResponse.ok) {
         throw new Error("Something went wrong!");
      }
      setIsCheckedOut(true);
   }

   return {
      books,
      setBooks,
      bookId,
      isLoading,
      currentPage,
      paginate,
      booksPerPage,
      totalAmountOfBooks,
      totalPages,
      setSearch,
      searchHandler,
      categorySelection,
      categoryField,
      currentLoansCount,
      isLoadingCurrentLoansCount,
      isCheckedOut,
      isLoadingBookCheckedOut,
      checkoutBook
   };
};

export { useFetchBooks };
