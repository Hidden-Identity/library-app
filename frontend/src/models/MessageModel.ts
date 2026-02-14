/**
 * @author Luka Baturić
 * @date 14/02/2026
 */

import { HalResource } from "hal-types";
import { IPageMetadata } from "./PageMetadata";

interface IMessageModel {
   title: string;
   question: string;
   id?: number;
   userEmail?: string;
   adminEmail?: string;
   response?: string;
   closed?: boolean;
}

class MessageRequestModel {
   constructor(
      public title: string,
      public question: string,
   ) {}
}

interface IMessageWithLinksResponse extends IMessageModel {
   _links: {
      self: { href: string };
      message: { href: string };
   };
}

type MessagesResponse = HalResource<{
   _embedded: {
      messages: IMessageWithLinksResponse[];
   };
   page: IPageMetadata;
}>;

export { type IMessageModel, type MessagesResponse, MessageRequestModel };
