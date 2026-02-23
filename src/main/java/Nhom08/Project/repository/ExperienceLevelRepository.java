package Nhom08.Project.repository;

import Nhom08.Project.entity.ExperienceLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExperienceLevelRepository extends JpaRepository<ExperienceLevel, Long> {
    List<ExperienceLevel> findByActiveTrueOrderBySortOrderAsc();
    boolean existsByValue(String value);
}
