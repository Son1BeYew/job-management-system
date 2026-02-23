# DB_CONVENTIONS.md — Quy ước Dữ liệu Động

> **MANDATORY:** AI đọc file này TRƯỚC khi tạo/sửa bất kỳ form, dropdown, checkbox list, hay bảng dữ liệu nào.

---

## ⚠️ NGUYÊN TẮC CỐT LÕI

> **Mọi danh sách lựa chọn (dropdown, checkbox, radio) đều phải lấy từ DB.**
> **KHÔNG được hardcode trong:**
> - HTML (`<option value="...">`)
> - Java backend (List.of(...) trong controller/service)
> - JavaScript (mảng/object cố định)

---

## 📦 Bảng DB Chứa Dữ Liệu Động

Tất cả entity kế thừa `BaseOption` (`id`, `value`, `label`, `sort_order`, `active`).

| Bảng DB             | Entity Java         | Repository                    | Dùng cho                          |
|---------------------|---------------------|-------------------------------|-----------------------------------|
| `industries`        | `Industry`          | `IndustryRepository`          | Dropdown **Ngành nghề**           |
| `experience_levels` | `ExperienceLevel`   | `ExperienceLevelRepository`   | Dropdown **Kinh nghiệm**          |
| `education_levels`  | `EducationLevel`    | `EducationLevelRepository`    | Dropdown **Cấp bậc học vấn**      |
| `degree_levels`     | `DegreeLevel`       | `DegreeLevelRepository`       | Dropdown **Bằng cấp yêu cầu**     |
| `job_benefits`      | `JobBenefit`        | `JobBenefitRepository`        | Checkbox list **Phúc lợi**        |
| `provinces`         | `Province`          | `ProvinceRepository`          | Datalist **Tỉnh / Thành phố**     |

---

## 🔌 API Endpoint

```
GET /api/jobs/form-options
```

Trả về JSON chứa tất cả options, lấy từ DB:

```json
{
  "industries":      [{ "value": "CNTT", "label": "Công nghệ thông tin" }, ...],
  "experiences":     [{ "value": "1-2 năm", "label": "1 - 2 năm" }, ...],
  "educationLevels": [...],
  "degreeLevels":    [...],
  "benefits":        [...],
  "provinces":       ["Hồ Chí Minh", "Hà Nội", ...]
}
```

Frontend (`post-job.js`) gọi `loadFormOptions()` khi trang load → populate vào DOM.

---

## ✅ Cách Thêm/Sửa Dữ Liệu (KHÔNG sửa code)

### Thêm ngành nghề mới:
```sql
INSERT INTO industries (value, label, sort_order, active)
VALUES ('Blockchain', 'Blockchain / Web3', 20, 1);
```

### Ẩn tạm một option:
```sql
UPDATE industries SET active = 0 WHERE value = 'Khác';
```

### Thay đổi thứ tự hiển thị:
```sql
UPDATE industries SET sort_order = 1 WHERE value = 'CNTT';
UPDATE industries SET sort_order = 2 WHERE value = 'Tài chính';
```

### Thêm phúc lợi mới:
```sql
INSERT INTO job_benefits (value, label, sort_order, active)
VALUES ('Cổ phần', 'Cổ phần công ty (ESOP)', 14, 1);
```

---

## 🏗️ Kiến Trúc Flow

```
DB bảng riêng (industries, provinces, ...)
        ↓  JPA Repository
SpringBoot Controller (GET /api/jobs/form-options)
        ↓  JSON response
JavaScript loadFormOptions()
        ↓  populate vào DOM
<select>, <datalist>, checkbox list
```

---

## 📋 Seed Dữ Liệu Ban Đầu

Data mặc định được seed tự động khi app khởi động lần đầu qua:
```
DataInitializer.java → seedIndustries(), seedExperienceLevels(), ...
```

Seed chỉ chạy khi bảng **rỗng** (`count() == 0`), không duplicate.

---

## 🚫 Anti-patterns — TUYỆT ĐỐI KHÔNG LÀM

```html
<!-- ❌ SAI: hardcode trong HTML -->
<select id="industry">
  <option value="CNTT">Công nghệ thông tin</option>
  <option value="Marketing">Marketing</option>
</select>
```

```java
// ❌ SAI: hardcode trong Java controller
options.put("industries", List.of(
    Map.of("value", "CNTT", "label", "Công nghệ thông tin")
));
```

```js
// ❌ SAI: hardcode trong JavaScript
const INDUSTRIES = ['CNTT', 'Marketing', 'Kinh doanh'];
```

---

## ✅ Pattern Đúng

```html
<!-- ✅ ĐÚNG: HTML chỉ có placeholder -->
<select id="industry" name="industry" required>
    <option value="">Đang tải...</option>
</select>
```

```java
// ✅ ĐÚNG: Java query từ DB
options.put("industries", toMap(industryRepository.findByActiveTrueOrderBySortOrderAsc()));
```

```js
// ✅ ĐÚNG: JavaScript fetch từ API
const res  = await fetch('/api/jobs/form-options');
const opts = await res.json();
populateSelect('industry', opts.industries, 'Chọn ngành nghề');
```

---

## 📁 Files Liên Quan

| File | Vai trò |
|------|---------|
| `entity/BaseOption.java` | Abstract base với id, value, label, sort_order, active |
| `entity/Industry.java` ... `Province.java` | 6 entity → 6 bảng DB riêng |
| `repository/*Repository.java` | 6 repository tương ứng |
| `service/DataInitializer.java` | Seed data lần đầu |
| `controller/JobController.java` | `GET /api/jobs/form-options` |
| `static/js/post-job.js` | `loadFormOptions()` populate DOM |

---

*Cập nhật: 2026-02-23 | Áp dụng cho: job posting form, search filters, và mọi form tương tự trong tương lai.*
