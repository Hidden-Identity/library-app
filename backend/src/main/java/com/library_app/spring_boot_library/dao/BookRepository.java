/**
 * @author Luka Baturić
 * @date 08/08/2025
 */

package com.library_app.spring_boot_library.dao;

import com.library_app.spring_boot_library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
