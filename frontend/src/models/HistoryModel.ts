/**
 * @author Luka Baturić
 * @date 08/02/2026
 */

import { HalResource } from "hal-types";
import { IPageMetadata } from "./PageMetadata";

interface IHistoryModel {
   id: number;
   userEmail: string;
   checkoutDate: string;
   returnedDate: string;
   title: string;
   author: string;
   description: string;
   img: string;
}

interface IHistoryWithLinksResponse extends IHistoryModel {
   _links: {
      self: { href: string };
      history: { href: string };
   };
}

type HistoryResponse = HalResource<{
   _embedded: {
      histories: IHistoryWithLinksResponse[];
   };
   page: IPageMetadata;
}>;

export {type IHistoryModel, type HistoryResponse};