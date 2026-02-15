/**
 * @author Luka Baturić
 * @date 15/02/2026
 */

package com.library_app.spring_boot_library.requestmodels;

import lombok.Data;

@Data
public class AdminQuestionRequest {

    private Long id;

    private String response;
}
