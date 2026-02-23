package Nhom08.Project.repository;

import Nhom08.Project.entity.JobBenefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobBenefitRepository extends JpaRepository<JobBenefit, Long> {
    List<JobBenefit> findByActiveTrueOrderBySortOrderAsc();
    boolean existsByValue(String value);
}
