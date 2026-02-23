package Nhom08.Project.repository;

import Nhom08.Project.entity.DegreeLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DegreeLevelRepository extends JpaRepository<DegreeLevel, Long> {
    List<DegreeLevel> findByActiveTrueOrderBySortOrderAsc();
    boolean existsByValue(String value);
}
