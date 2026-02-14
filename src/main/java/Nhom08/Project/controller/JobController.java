package Nhom08.Project.controller;

import Nhom08.Project.dto.JobCreateDTO;
import Nhom08.Project.entity.Employer;
import Nhom08.Project.entity.Job;
import Nhom08.Project.entity.User;
import Nhom08.Project.repository.EmployerRepository;
import Nhom08.Project.repository.UserRepository;
import Nhom08.Project.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private EmployerRepository employerRepository;
    
    @Autowired
    private UserRepository userRepository;

    /**
     * Get employer info for auto-fill
     */
    @GetMapping("/employer-info")
    public ResponseEntity<?> getEmployerInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(403).body(Map.of("error", "Not authenticated"));
        }

        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!currentUser.isEmployer()) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }

        Employer employer = employerRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin công ty"));

        Map<String, Object> info = new HashMap<>();
        info.put("companyName", employer.getCompanyName());
        info.put("address", employer.getAddress());
        info.put("contactName", employer.getContactName());
        info.put("contactPhone", employer.getContactPhone());
        info.put("email", currentUser.getEmail());
        info.put("description", employer.getDescription());

        return ResponseEntity.ok(info);
    }

    /**
     * Create a new job posting
     */
    @PostMapping("/create")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreateDTO dto) {
        try {
            User currentUser = getCurrentUser();
            if (!currentUser.isEmployer()) {
                return ResponseEntity.status(403).body(Map.of("error", "Unauthorized - Only employers can post jobs"));
            }

            Employer employer = employerRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new RuntimeException("Employer profile not found"));

            Job job = jobService.createJob(dto, employer.getId());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Đăng tin tuyển dụng thành công",
                    "jobId", job.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }

    /**
     * Get all jobs by current employer
     */
    @GetMapping("/my-jobs")
    public ResponseEntity<?> getMyJobs() {
        User currentUser = getCurrentUser();
        if (!currentUser.isEmployer()) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }

        Employer employer = employerRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Employer profile not found"));

        List<Job> jobs = jobService.getJobsByEmployer(employer.getId());
        return ResponseEntity.ok(jobs);
    }

    /**
     * Get all active jobs (public)
     */
    @GetMapping("/active")
    public ResponseEntity<List<Job>> getAllActiveJobs() {
        List<Job> jobs = jobService.getAllActiveJobs();
        return ResponseEntity.ok(jobs);
    }

    /**
     * Get job by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Update job
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobCreateDTO dto) {
        try {
            User currentUser = getCurrentUser();
            if (!currentUser.isEmployer()) {
                return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
            }

            Employer employer = employerRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new RuntimeException("Employer profile not found"));

            Job job = jobService.updateJob(id, dto, employer.getId());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Cập nhật tin tuyển dụng thành công",
                    "job", job
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }

    /**
     * Delete job
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        try {
            User currentUser = getCurrentUser();
            if (!currentUser.isEmployer()) {
                return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
            }

            Employer employer = employerRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new RuntimeException("Employer profile not found"));

            jobService.deleteJob(id, employer.getId());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Xóa tin tuyển dụng thành công"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }

    /**
     * Search jobs
     */
    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(@RequestParam String keyword) {
        List<Job> jobs = jobService.searchJobs(keyword);
        return ResponseEntity.ok(jobs);
    }
    
    /**
     * Helper: Get current authenticated user
     */
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            throw new RuntimeException("Not authenticated");
        }
        
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
