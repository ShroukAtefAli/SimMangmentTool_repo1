package com.hypercell.orange.repository;

import com.hypercell.orange.domain.Dial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Dial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DialRepository extends JpaRepository<Dial, Long> {}
