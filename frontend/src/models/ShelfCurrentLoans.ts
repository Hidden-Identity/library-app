/**
 * @author Luka Baturić
 * @date 07/02/2026
 */

import { IBookModel } from "./BookModel";

export interface IShelfCurrentLoan {
   book: IBookModel;
   daysLeft: number;
}