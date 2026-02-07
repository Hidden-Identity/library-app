/**
 * @author Luka Baturić
 * @date 07/02/2026
 */

package com.library_app.spring_boot_library.responsemodels;

import com.library_app.spring_boot_library.entity.Book;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }

    private Book book;

    private int daysLeft;
}
