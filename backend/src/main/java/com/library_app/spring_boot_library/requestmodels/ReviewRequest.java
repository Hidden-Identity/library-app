/**
 * @author Luka Baturić
 * @date 01/02/2026
 */

package com.library_app.spring_boot_library.requestmodels;

import lombok.Data;

@Data
public class ReviewRequest {

    private double rating;

    private Long bookId;

    private String reviewDescription;
}
