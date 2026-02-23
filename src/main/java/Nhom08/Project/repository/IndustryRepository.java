package Nhom08.Project.repository;

import Nhom08.Project.entity.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IndustryRepository extends JpaRepository<Industry, Long> {
    List<Industry> findByActiveTrueOrderBySortOrderAsc();
    boolean existsByValue(String value);
}
