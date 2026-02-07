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
}
