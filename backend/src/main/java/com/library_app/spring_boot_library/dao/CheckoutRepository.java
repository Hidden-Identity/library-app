/**
 * @author Luka Baturić
 * @date 17/08/2025
 */

package com.library_app.spring_boot_library.dao;

import com.library_app.spring_boot_library.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    List<Checkout> findBooksByUserEmail(String userEmail);
}
