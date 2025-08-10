/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { FC } from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

interface IProps {
   currentPage: number,
   totalPages: number,
   paginate: any
}

const Pagination: FC<IProps> = ({
   currentPage,
   totalPages,
   paginate
}) => {
   const pageNumbers: number[] = [];

   const startPage = Math.max(1, currentPage - 2);
   const endPage = Math.min(totalPages, currentPage + 2);

   for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
   }

   return (
      <BootstrapPagination>
         <BootstrapPagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
         {pageNumbers.map((number) => (
            <BootstrapPagination.Item
               key={number}
               active={number === currentPage}
               onClick={() => paginate(number)}
            >
               {number}
            </BootstrapPagination.Item>
         ))}
         <BootstrapPagination.Last
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
         />
      </BootstrapPagination>
   );
}

export { Pagination };