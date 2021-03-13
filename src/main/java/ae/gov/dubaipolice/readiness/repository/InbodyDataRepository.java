package ae.gov.dubaipolice.readiness.repository;

import ae.gov.dubaipolice.readiness.domain.InbodyData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InbodyData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InbodyDataRepository extends JpaRepository<InbodyData, Long> {
}
