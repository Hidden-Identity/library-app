/**
 * @author Luka Baturić
 * @date 15/02/2026
 */

package com.library_app.spring_boot_library.requestmodels;

import lombok.Data;

@Data
public class AddBookRequest {

    private String title;

    private String author;

    private String description;

    private int copies;

    private String category;

    private String img;
}
