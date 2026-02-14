package Nhom08.Project.controller;

import Nhom08.Project.entity.Role;
import Nhom08.Project.repository.EmployerRepository;
import Nhom08.Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    /**
     * Get dashboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Total users (all roles)
        long totalUsers = userRepository.count();
        stats.put("totalUsers", totalUsers);
        
        // Total employers
        long totalEmployers = employerRepository.count();
        stats.put("totalEmployers", totalEmployers);
        
        // Users by role
        long adminCount = userRepository.findByRoleName(Role.ADMIN).size();
        long candidateCount = userRepository.findByRoleName(Role.CANDIDATE).size();
        long employerUserCount = userRepository.findByRoleName(Role.EMPLOYER).size();
        
        stats.put("adminCount", adminCount);
        stats.put("candidateCount", candidateCount);
        stats.put("employerUserCount", employerUserCount);
        
        return ResponseEntity.ok(stats);
    }
}
