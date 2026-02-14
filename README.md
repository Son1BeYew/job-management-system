# CareerViet - Hệ Thống Quản Lý Tuyển Dụng

[![Java](https://img.shields.io/badge/Java-17-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0--M1-brightgreen)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Nền tảng tuyển dụng trực tuyến toàn diện kết nối nhà tuyển dụng và ứng viên, tích hợp AI hỗ trợ chấm điểm CV và tạo CV chuyên nghiệp.

---

## Mục Lục

- [Tổng Quan](#tổng-quan)
- [Tính Năng](#tính-năng)
- [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt & Khởi Chạy](#cài-đặt--khởi-chạy)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [API Endpoints](#api-endpoints)
- [Phân Quyền](#phân-quyền)
- [Giao Diện](#giao-diện)
- [Thành Viên Nhóm](#thành-viên-nhóm)

---

## Tổng Quan

**CareerViet** là hệ thống quản lý tuyển dụng được xây dựng trên nền tảng Spring Boot, cung cấp giải pháp kết nối giữa nhà tuyển dụng và ứng viên. Hệ thống hỗ trợ ba vai trò chính: **Quản trị viên (Admin)**, **Nhà tuyển dụng (Employer)** và **Ứng viên (Candidate)**, mỗi vai trò có giao diện và chức năng riêng biệt.

### Điểm nổi bật

- Hệ thống đăng ký đa bước dành cho nhà tuyển dụng
- Tích hợp AI chấm điểm CV và tạo CV chuyên nghiệp
- Tìm kiếm việc làm nâng cao với bộ lọc đa tiêu chí
- Phân quyền chi tiết với Spring Security
- Triển khai dễ dàng với Docker

---

## Tính Năng

### Ứng Viên
| Tính năng | Mô tả |
|-----------|--------|
| Đăng ký / Đăng nhập | Tạo tài khoản và xác thực bằng email |
| Tìm việc làm | Tìm kiếm nâng cao theo vị trí, mức lương, ngành nghề |
| Chấm điểm CV (AI) | Upload CV (PDF/DOCX) để nhận đánh giá và gợi ý cải thiện |
| Tạo CV bằng AI | Chọn mẫu CV theo ngành nghề, phong cách và tạo CV chuyên nghiệp |
| Chỉnh sửa CV | Giao diện WYSIWYG để chỉnh sửa CV trực tiếp |

### Nhà Tuyển Dụng
| Tính năng | Mô tả |
|-----------|--------|
| Đăng ký 2 bước | Bước 1: Tạo tài khoản — Bước 2: Thông tin công ty |
| Dashboard | Tổng quan hoạt động tuyển dụng |
| Quản lý đăng tuyển | Tạo, chỉnh sửa, xóa tin tuyển dụng |
| Quản lý ứng viên | Xem và quản lý hồ sơ ứng tuyển |

### Quản Trị Viên
| Tính năng | Mô tả |
|-----------|--------|
| Dashboard thống kê | Tổng quan số liệu hệ thống |
| Quản lý người dùng | Theo dõi tổng số người dùng, nhà tuyển dụng, ứng viên |

---

## Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│          HTML / CSS / JavaScript / Bootstrap         │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / REST API
┌──────────────────────▼──────────────────────────────┐
│                  Spring Boot Server                  │
│  ┌─────────────┐  ┌────────────┐  ┌──────────────┐  │
│  │ Controllers  │→│  Services  │→│ Repositories  │  │
│  │  (REST API)  │  │ (Business) │  │   (JPA/DB)   │  │
│  └─────────────┘  └────────────┘  └──────┬───────┘  │
│  ┌─────────────┐  ┌────────────┐         │          │
│  │   Security   │  │    DTOs    │         │          │
│  │(Spring Sec.) │  │(Validation)│         │          │
│  └─────────────┘  └────────────┘         │          │
└──────────────────────────────────────────┼──────────┘
                                           │ JDBC
┌──────────────────────────────────────────▼──────────┐
│                   MySQL 8.0 (Docker)                 │
│                   Database: qltd_db                  │
└─────────────────────────────────────────────────────┘
```

---

## Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
|-----------|-----------|
| Backend | Java 17, Spring Boot 4.1.0-M1 |
| Security | Spring Security 6, BCrypt |
| ORM | Spring Data JPA, Hibernate |
| Database | MySQL 8.0 |
| Template Engine | Thymeleaf |
| Frontend | HTML5, CSS3, JavaScript, Bootstrap |
| Build Tool | Maven |
| Containerization | Docker, Docker Compose |
| DB Admin | PhpMyAdmin |

---

## Yêu Cầu Hệ Thống

- **Java** 17 trở lên
- **Maven** 3.8+ (hoặc sử dụng Maven Wrapper đi kèm)
- **Docker** & **Docker Compose** (cho database)
- **Git**

---

## Cài Đặt & Khởi Chạy

### 1. Clone dự án

```bash
git clone https://github.com/<your-org>/Nhom08-QLTD.git
cd Nhom08-QLTD
```

### 2. Khởi động Database

```bash
docker-compose up -d
```

Lệnh trên sẽ khởi tạo:
- **MySQL 8.0** — Port `8085`
- **PhpMyAdmin** — Port `8086` (truy cập tại `http://localhost:8086`)

### 3. Chạy ứng dụng

**Linux / macOS:**
```bash
./mvnw spring-boot:run
```

**Windows:**
```bash
mvnw.cmd spring-boot:run
```

### 4. Truy cập ứng dụng

| Dịch vụ | URL |
|---------|-----|
| Ứng dụng chính | `http://localhost:8083` |
| PhpMyAdmin | `http://localhost:8086` |

### Tài khoản mặc định

| Vai trò | Email | Mật khẩu |
|---------|-------|-----------|
| Admin | `admin@careerviet.vn` | `admin123` |

> Tài khoản admin được tạo tự động khi khởi chạy lần đầu thông qua `DataInitializer`.

---

## Cấu Trúc Dự Án

```
Nhom08-QLTD/
├── src/
│   └── main/
│       ├── java/Nhom08/Project/
│       │   ├── QltdApplication.java          # Entry point
│       │   ├── config/
│       │   │   └── SecurityConfig.java       # Spring Security configuration
│       │   ├── controller/
│       │   │   ├── AuthController.java       # Authentication API
│       │   │   ├── UserController.java       # User profile API
│       │   │   ├── AdminController.java      # Admin API
│       │   │   └── PageController.java       # Page routing
│       │   ├── dto/
│       │   │   ├── LoginDTO.java
│       │   │   ├── UserRegisterDTO.java
│       │   │   ├── EmployerRegisterStep1DTO.java
│       │   │   └── EmployerRegisterStep2DTO.java
│       │   ├── entity/
│       │   │   ├── User.java                 # User entity
│       │   │   ├── Role.java                 # Role entity
│       │   │   └── Employer.java             # Employer entity
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── RoleRepository.java
│       │   │   └── EmployerRepository.java
│       │   └── service/
│       │       ├── AuthService.java          # Authentication logic
│       │       ├── CustomUserDetailsService.java
│       │       └── DataInitializer.java      # Seed data on startup
│       └── resources/
│           ├── application.properties        # App configuration
│           ├── static/                       # Frontend assets
│           │   ├── css/                      # Stylesheets
│           │   ├── js/                       # JavaScript
│           │   ├── images/                   # Images & logos
│           │   ├── fonts/                    # Custom fonts
│           │   ├── includes/                 # Reusable HTML components
│           │   ├── admin/                    # Admin pages
│           │   └── *.html                    # Main pages
│           └── templates/
│               └── 403.html                  # Error page
├── docker-compose.yml                        # Docker services
├── pom.xml                                   # Maven dependencies
└── README.md
```

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| `GET` | `/api/auth/check-email?email={email}` | Kiểm tra email khả dụng | Public |
| `POST` | `/api/auth/register/user` | Đăng ký ứng viên | Public |
| `POST` | `/api/auth/register/employer/step1` | Đăng ký NTD — Bước 1 | Public |
| `POST` | `/api/auth/register/employer/step2` | Đăng ký NTD — Bước 2 | Public |
| `POST` | `/api/auth/login` | Đăng nhập | Public |

### User (`/api/user`)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| `GET` | `/api/user/me` | Lấy thông tin user hiện tại | Public |

### Admin (`/api/admin`)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| `GET` | `/api/admin/stats` | Thống kê hệ thống | ROLE_ADMIN |

---

## Phân Quyền

Hệ thống sử dụng **Spring Security** với 3 vai trò:

| Vai trò | Mã | Quyền truy cập |
|---------|------|----------------|
| Quản trị viên | `ROLE_ADMIN` | `/admin/**`, `/api/admin/**` |
| Nhà tuyển dụng | `ROLE_EMPLOYER` | `/dashboard.html`, `/quan-ly-*.html`, `/employer/**` |
| Ứng viên | `ROLE_USER` | `/profile/**`, `/my-applications/**` |

Các trang công khai (trang chủ, tìm việc, đăng ký, đăng nhập) không yêu cầu xác thực.

---

## Giao Diện

| Trang | Đường dẫn | Mô tả |
|-------|-----------|--------|
| Trang chủ | `/index.html` | Banner, tìm kiếm, danh sách việc làm nổi bật |
| Tìm việc làm | `/tim-viec-lam.html` | Tìm kiếm nâng cao với bộ lọc |
| Nhà tuyển dụng | `/nha-tuyen-dung.html` | Landing page cho NTD |
| Đăng ký ứng viên | `/candidate-register.html` | Form đăng ký 1 bước |
| Đăng ký NTD | `/employer-register.html` | Form đăng ký 2 bước |
| Đăng nhập NTD | `/employer-login.html` | Đăng nhập nhà tuyển dụng |
| Dashboard NTD | `/dashboard.html` | Tổng quan tuyển dụng |
| Quản lý đăng tuyển | `/quan-ly-dang-tuyen.html` | CRUD tin tuyển dụng |
| Quản lý ứng viên | `/quan-ly-ung-vien.html` | Quản lý hồ sơ ứng tuyển |
| Chấm điểm CV | `/cham-diem-cv.html` | AI đánh giá CV |
| Tạo CV AI | `/tao-cv-ai.html` | Tạo CV với trợ lý AI |
| Chỉnh sửa CV | `/cv-editor.html` | Editor CV trực tuyến |
| Admin Dashboard | `/admin/dashboard.html` | Thống kê hệ thống |

---

## Thành Viên Nhóm

| STT | Họ và Tên | MSSV | Vai trò |
|-----|-----------|------|---------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

> **Nhóm 08** — Môn Quản Lý Tuyển Dụng

---

## License

Dự án được phát triển phục vụ mục đích học tập.

---

<p align="center">
  <b>CareerViet</b> &copy; 2025 — Nhóm 08
</p>
