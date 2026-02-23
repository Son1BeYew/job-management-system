package Nhom08.Project.repository;

import Nhom08.Project.entity.EducationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationLevelRepository extends JpaRepository<EducationLevel, Long> {
    List<EducationLevel> findByActiveTrueOrderBySortOrderAsc();
    boolean existsByValue(String value);
}
