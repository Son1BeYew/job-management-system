package Nhom08.Project.repository;

import Nhom08.Project.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
    
    Optional<Employer> findByUserId(Long userId);
    
    Optional<Employer> findByCompanyName(String companyName);
    
    boolean existsByTaxCode(String taxCode);
    
    @Query("SELECT e FROM Employer e WHERE e.province = :province")
    List<Employer> findByProvince(@Param("province") String province);
    
    @Query("SELECT e FROM Employer e WHERE LOWER(e.companyName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employer> searchByCompanyName(@Param("keyword") String keyword);
}
