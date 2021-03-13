package ae.gov.dubaipolice.readiness.repository;

import ae.gov.dubaipolice.readiness.domain.MemberData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MemberData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MemberDataRepository extends JpaRepository<MemberData, Long> {
}
