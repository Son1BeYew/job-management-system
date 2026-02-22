# 📋 FEATURES.md — Theo Dõi Tiến Độ Tính Năng

> **Dự án:** CareerViet — Hệ Thống Quản Lý Tuyển Dụng (Nhóm 08)  
> **Cập nhật lần cuối:** 2026-02-22  
> **Cách dùng:** Khi hoàn thành một tính năng, cập nhật trạng thái từ `🔲 Chưa làm` → `✅ Hoàn thành` và ghi ngày hoàn thành.

---

## Bảng Trạng Thái Tổng Quan

| Ký hiệu | Ý nghĩa |
|---------|---------|
| ✅ | Đã hoàn thành — có backend + frontend |
| 🚧 | Đang làm — UI có nhưng backend chưa xong / ngược lại |
| ⬜ | Chưa làm |
| ❌ | Dừng lại / Không làm |

---

## 1. 🔐 Xác Thực & Phân Quyền (Authentication)

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 1.1 | Đăng ký ứng viên (Candidate) | ✅ | 2026-02 | `POST /api/auth/register/user` — validation đủ, lưu DB |
| 1.2 | Đăng ký NTD Bước 1 (email + mật khẩu) | ✅ | 2026-02 | `POST /api/auth/register/employer/step1` — lưu session |
| 1.3 | Đăng ký NTD Bước 2 (thông tin công ty) | ✅ | 2026-02 | `POST /api/auth/register/employer/step2` — tạo Employer entity |
| 1.4 | Đăng nhập (tất cả roles) | ✅ | 2026-02 | `POST /api/auth/login` — Spring Security session |
| 1.5 | Kiểm tra email tồn tại | ✅ | 2026-02 | `GET /api/auth/check-email` — realtime validate |
| 1.6 | Đăng xuất | ⬜ | — | Chưa có endpoint `/logout` |
| 1.7 | Trang 403 Forbidden | ✅ | — | `/templates/403.html` — Thymeleaf |
| 1.8 | Phân quyền 3 role (ADMIN/EMPLOYER/CANDIDATE) | ✅ | 2026-02 | Spring Security config hoàn chỉnh |
| 1.9 | Redirect sau login theo role | ✅ | 2026-02 | Admin→`/admin/dashboard`, Employer→`/dashboard`, User→home |

---

## 2. 👤 Quản Lý Người Dùng (User)

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 2.1 | Lấy thông tin user đang đăng nhập | ✅ | 2026-02 | `GET /api/user/me` — trả về role, displayName, employer info |
| 2.2 | Hiển thị header động (login/logout state) | ✅ | 2026-02 | `main.js` — gọi `/api/user/me` để cập nhật header |
| 2.3 | Cập nhật hồ sơ cá nhân | ⬜ | — | Chưa có endpoint PUT |
| 2.4 | Đổi mật khẩu | ⬜ | — | Chưa làm |
| 2.5 | Tạo tài khoản admin mặc định | ✅ | 2026-02 | `DataInitializer.java` — seed `admin@careerviet.vn` / `admin123` |

---

## 3. 🏢 Nhà Tuyển Dụng (Employer)

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 3.1 | Landing page NTD | ✅ | 2026-02 | `/nha-tuyen-dung.html` — UI hoàn chỉnh |
| 3.2 | Dashboard NTD | 🚧 | — | `/dashboard.html` — UI có, data chưa kết nối đầy đủ |
| 3.3 | Lấy thông tin công ty (auto-fill form) | ✅ | 2026-02 | `GET /api/jobs/employer-info` — điền sẵn khi đăng tin |
| 3.4 | Đăng tin tuyển dụng mới | ✅ | 2026-02 | `POST /api/jobs/create` + `/post-job.html` + `post-job.js` |
| 3.5 | Xem danh sách tin đã đăng | ✅ | 2026-02 | `GET /api/jobs/my-jobs` — trả về jobs của employer |
| 3.6 | Cập nhật tin tuyển dụng | ✅ | 2026-02 | `PUT /api/jobs/{id}` — kiểm tra quyền sở hữu |
| 3.7 | Xóa tin tuyển dụng | ✅ | 2026-02 | `DELETE /api/jobs/{id}` — kiểm tra quyền sở hữu |
| 3.8 | Quản lý tin tuyển dụng (UI) | 🚧 | — | `/quan-ly-dang-tuyen.html` — UI có, cần kết nối API |
| 3.9 | Quản lý ứng viên (UI) | 🚧 | — | `/quan-ly-ung-vien.html` — UI có, backend chưa làm |
| 3.10 | Xem hồ sơ ứng viên đã nộp | ⬜ | — | Chưa có entity Application |

---

## 4. 💼 Tin Tuyển Dụng / Việc Làm (Jobs)

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 4.1 | Xem tất cả tin active (public) | ✅ | 2026-02 | `GET /api/jobs/active` |
| 4.2 | Xem chi tiết tin tuyển dụng | ✅ | 2026-02 | `GET /api/jobs/{id}` |
| 4.3 | Tìm kiếm việc làm (backend) | ✅ | 2026-02 | `GET /api/jobs/search?keyword=` |
| 4.4 | Tìm kiếm việc làm (UI + filter) | 🚧 | — | `/tim-viec-lam.html` + `job-search.js` — cần kiểm tra kết nối |
| 4.5 | Lọc theo ngành, lương, địa điểm | ⬜ | — | Backend chưa có filter API |
| 4.6 | Đánh dấu tin tuyển dụng khẩn | ✅ | 2026-02 | Field `urgentRecruitment` trong Job entity |
| 4.7 | Job status: DRAFT / ACTIVE / CLOSED | ✅ | 2026-02 | Field `status` trong Job entity |
| 4.8 | Nộp hồ sơ ứng tuyển | ⬜ | — | Chưa có entity Application / endpoint |

---

## 5. 🤖 AI Features

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 5.1 | Trang chấm điểm CV (UI) | 🚧 | — | `/cham-diem-cv.html` — UI hoàn chỉnh, backend chưa có |
| 5.2 | Upload CV để chấm điểm (backend) | ⬜ | — | Chưa implement |
| 5.3 | Trang tạo CV bằng AI (UI) | 🚧 | — | `/tao-cv-ai.html` — có giao diện chọn template |
| 5.4 | Tạo CV bằng AI (backend) | ⬜ | — | Chưa implement, cần tích hợp AI API |
| 5.5 | CV Editor (chỉnh sửa trực tiếp) | 🚧 | — | `/cv-editor.html` — WYSIWYG editor có, chưa kết nối AI |
| 5.6 | Xuất CV dạng PDF | ⬜ | — | Chưa làm |

---

## 6. 🛡️ Admin

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 6.1 | Admin Dashboard (UI) | ✅ | 2026-02 | `/admin/dashboard.html` — Thymeleaf fragment |
| 6.2 | Thống kê số lượng user | ✅ | 2026-02 | `GET /api/admin/stats` — tổng user, employer, candidate, admin |
| 6.3 | Quản lý tài khoản người dùng | ⬜ | — | Backend chưa có endpoint CRUD user |
| 6.4 | Duyệt / khóa nhà tuyển dụng | ⬜ | — | Chưa làm |
| 6.5 | Quản lý tin tuyển dụng (admin) | ⬜ | — | Chưa làm |

---

## 7. 🎨 Giao Diện & Frontend

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 7.1 | Trang chủ (`index.html`) | ✅ | 2026-02 | Banner, search bar, danh sách việc làm nổi bật |
| 7.2 | Header component (includes) | ✅ | 2026-02 | `/includes/` — reusable header/footer |
| 7.3 | Header cập nhật theo trạng thái login | ✅ | 2026-02 | `main.js` xử lý dynamic header |
| 7.4 | Trang đăng ký ứng viên | ✅ | 2026-02 | `/candidate-register.html` |
| 7.5 | Trang đăng ký NTD (2 step) | ✅ | 2026-02 | `/employer-register.html` + `/employer-register-step-2.html` |
| 7.6 | Trang đăng nhập NTD | ✅ | 2026-02 | `/employer-login.html` |
| 7.7 | Trang đăng tin tuyển dụng | ✅ | 2026-02 | `/post-job.html` — form đầy đủ nhiều trường |
| 7.8 | Trang tìm việc làm | 🚧 | — | `/tim-viec-lam.html` — UI xong, filter chưa hoạt động đủ |
| 7.9 | Responsive design | 🚧 | — | Cần kiểm tra lại trên mobile |

---

## 8. ⚙️ Hạ Tầng & Cấu Hình

| # | Tính năng | Trạng thái | Ngày hoàn thành | Ghi chú |
|---|-----------|-----------|-----------------|---------|
| 8.1 | Docker Compose (MySQL + PhpMyAdmin) | ✅ | 2026-02 | `docker-compose.yml` — port 8085/8086 |
| 8.2 | Spring Security config | ✅ | 2026-02 | `SecurityConfig.java` — phân quyền route rõ ràng |
| 8.3 | Maven build | ✅ | — | `pom.xml` — Java 17, Spring Boot |
| 8.4 | Seed data khi khởi chạy | ✅ | 2026-02 | `DataInitializer.java` — tạo roles + admin account |
| 8.5 | CI/CD pipeline | ⬜ | — | Chưa thiết lập |

---

## 📊 Tổng Kết Tiến Độ

```
✅ Hoàn thành : 26 tính năng
🚧 Đang làm   :  9 tính năng
⬜ Chưa làm   : 14 tính năng
─────────────────────────────
   Tổng        : 49 tính năng
```

> **Tiến độ ước tính:** ~53% hoàn thành

---

## 📝 Nhật Ký Cập Nhật

| Ngày | Người cập nhật | Nội dung |
|------|---------------|---------|
| 2026-02-22 | AI (Antigravity) | Khởi tạo file, phân tích toàn bộ codebase và ghi nhận trạng thái hiện tại |

---

> 🔔 **Hướng dẫn cập nhật:** Khi hoàn thành một tính năng, nhắn với AI: *"cập nhật docs, đã xong [tên tính năng]"* để AI sửa file này tự động.
