/**
 * @author Luka Baturić
 * @date 09/08/2025
 */

import { HalResource } from "hal-types";

enum Category {
  FICTION = 'fiction',
  BIOGRAPHY = 'biography',
  SCIENCE = 'science',
  COMICS = 'comics'
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

interface IBookWithLinks extends IBookModel {
  _links: {
    self: { href: string };
    book: { href: string };
  };
}

interface PageMetadata {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

type BooksResponse = HalResource<{
  _embedded: {
    books: IBookWithLinks[];
  };
  page: PageMetadata;
}>;

export {type IBookModel, type BooksResponse, Category};