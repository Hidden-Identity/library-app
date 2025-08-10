/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IBookModel, BooksResponse } from "../../models/BookModel";

interface IProps {
   page?: number;
   size?: number;
   usePagination?: boolean;
}

interface IReturn {
   books: IBookModel[];
   isLoading: boolean;
   httpError: any;
   currentPage: number;
   paginate: (pageNumber: number) => void;
   booksPerPage: number;
   totalAmountOfBooks: number;
   totalPages: number;
   setSearch: Dispatch<SetStateAction<string>>
   searchHandler: () => void;
}

const useFetchBooks = ({
   page = 0,
   size = 9,
   usePagination = false,
}: IProps): IReturn => {
   const [books, setBooks] = useState<IBookModel[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [httpError, setHttpError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [booksPerPage] = useState(5);
   const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [search, setSearch] = useState('');
   const [searchUrl, setSearchUrl] = useState('');

   useEffect(() => {
      const fetchBooks = async () => {
         const baseUrl = "http://localhost:8080/api/books";
         let url = '';

         if (searchUrl === '') {
            url = usePagination
            ? `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`
            : `${baseUrl}?page=${page}&size=${size}`;
         } else {
            url = baseUrl + searchUrl;
         }

         const response = await fetch(url);

         if (!response.ok) {
            throw new Error("Something went wrong!");
         }

         const responseJson: BooksResponse = await response.json();
         const responseData = responseJson._embedded.books;

         if (usePagination) {
            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
         }

         const loadedBooks: IBookModel[] = [];

         for (const key in responseData) {
            loadedBooks.push({
               id: responseData[key].id,
               title: responseData[key].title,
               author: responseData[key].author,
               description: responseData[key].description,
               copies: responseData[key].copies,
               copiesAvailable: responseData[key].copiesAvailable,
               category: responseData[key].category,
               img: responseData[key].img,
            });
         }

         setBooks(loadedBooks);
         setIsLoading(false);
      };

      fetchBooks().catch((error: any) => {
         setIsLoading(false);
         setHttpError(error.message);
      });

      window.scrollTo(0,0);
   }, [booksPerPage, currentPage, page, searchUrl, size, usePagination]);

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

   const searchHandler = () => {
      if (search === '') {
         setSearchUrl('');
      } else {
         setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
      }
   }

   return {
      books,
      isLoading,
      httpError,
      currentPage,
      paginate,
      booksPerPage,
      totalAmountOfBooks,
      totalPages,
      setSearch,
      searchHandler
   };
};

export { useFetchBooks };
