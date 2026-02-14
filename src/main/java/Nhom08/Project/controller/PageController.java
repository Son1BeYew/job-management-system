package Nhom08.Project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/login")
    public String loginPage() {
        return "redirect:/candidate-login.html";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "redirect:/candidate-register.html";
    }

    @GetMapping("/403")
    public String accessDenied() {
        return "403";
    }

    /**
     * Trang đăng tuyển dụng
     */
    @GetMapping("/quan-ly-dang-tuyen/post-job")
    public String postJob() {
        return "redirect:/post-job.html";
    }

    /**
     * Trang quản lý đăng tuyển
     */
    @GetMapping("/quan-ly-dang-tuyen")
    public String manageJobs() {
        return "redirect:/quan-ly-dang-tuyen.html";
    }

    /**
     * Trang quản lý ứng viên
     */
    @GetMapping("/quan-ly-ung-vien")
    public String manageCandidates() {
        return "redirect:/quan-ly-ung-vien.html";
    }
}
