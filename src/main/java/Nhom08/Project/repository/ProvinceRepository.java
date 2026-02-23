package Nhom08.Project.repository;

import Nhom08.Project.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Long> {
    List<Province> findByActiveTrueOrderBySortOrderAsc();
    boolean existsByValue(String value);
}
