package ae.gov.dubaipolice.readiness.repository;

import ae.gov.dubaipolice.readiness.domain.InBodyResultsSheet;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InBodyResultsSheet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InBodyResultsSheetRepository extends JpaRepository<InBodyResultsSheet, Long> {
}
