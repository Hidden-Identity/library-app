/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { HalResource } from "hal-types";
import { IPageMetadata } from "./PageMetadata";

enum Category {
   FICTION = "fiction",
   BIOGRAPHY = "biography",
   SCIENCE = "science",
   COMICS = "comics",
}

interface IBookModel {
   id: number;
   title: string;
   author?: string;
   description?: string;
   copies?: number;
   copiesAvailable?: number;
   category?: string;
   img?: string;
}

interface IBookWithLinksResponse extends IBookModel {
   _links: {
      self: { href: string };
      book: { href: string };
   };
}

type BooksResponse = HalResource<{
   _embedded: {
      books: IBookWithLinksResponse[];
   };
   page: IPageMetadata;
}>;

export {
   type IBookModel,
   type BooksResponse,
   type IBookWithLinksResponse,
   Category
};
