package Nhom08.Project.service;

import Nhom08.Project.entity.Role;
import Nhom08.Project.entity.User;
import Nhom08.Project.repository.RoleRepository;
import Nhom08.Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Initialize default roles and admin user on application startup
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create ROLE_ADMIN if not exists
        if (!roleRepository.existsByName(Role.ADMIN)) {
            Role adminRole = new Role(Role.ADMIN, "Quản trị viên hệ thống");
            roleRepository.save(adminRole);
            System.out.println("✅ Created role: ROLE_ADMIN");
        }

        // Create ROLE_CANDIDATE if not exists
        if (!roleRepository.existsByName(Role.CANDIDATE)) {
            Role candidateRole = new Role(Role.CANDIDATE, "Ứng viên tìm việc");
            roleRepository.save(candidateRole);
            System.out.println("✅ Created role: ROLE_CANDIDATE");
        }

        // Create ROLE_EMPLOYER if not exists
        if (!roleRepository.existsByName(Role.EMPLOYER)) {
            Role employerRole = new Role(Role.EMPLOYER, "Nhà tuyển dụng");
            roleRepository.save(employerRole);
            System.out.println("✅ Created role: ROLE_EMPLOYER");
        }

        // Create default Admin user if not exists
        String adminEmail = "admin@careerviet.vn";
        if (!userRepository.existsByEmail(adminEmail)) {
            Role adminRole = roleRepository.findByName(Role.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));
            
            User adminUser = new User();
            adminUser.setEmail(adminEmail);
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setFullName("Administrator");
            adminUser.setPhone("0900000000");
            adminUser.setRole(adminRole);
            adminUser.setEnabled(true);
            
            userRepository.save(adminUser);
            System.out.println("✅ Created default admin user: " + adminEmail + " / admin123");
        }
    }
}

