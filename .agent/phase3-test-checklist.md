# Phase 3: Test Chức Năng Đăng Tin Tuyển Dụng

## ✅ Part 3.1 & 3.2: Frontend Data Collection & API Integration (HOÀN THÀNH)

### Đã thực hiện:
1. ✅ Fix duplicate submit event listener
2. ✅ Fix checkbox name conflict (employmentType vs benefits)
3. ✅ Add employmentType collection logic
4. ✅ Validation form đã có sẵn (title, location, deadline, description, requirements)
5. ✅ API integration với credentials: 'include'

---

## 🧪 Part 3.3: Test Backend Processing

### Checklist:

#### 3.3.1: Kiểm tra Authentication
- [ ] Đăng nhập với tài khoản **Employer**
- [ ] Vào trang `/quan-ly-dang-tuyen/post-job`
- [ ] Kiểm tra thông tin công ty có hiển thị không (Section xanh đầu trang)
- [ ] Check console log: `✅ Employer info loaded:` phải hiện

#### 3.3.2: Test Form Validation (Frontend)
- [ ] Submit form với Title rỗng → Phải báo lỗi "Vui lòng nhập chức danh"
- [ ] Submit với Description < 50 ký tự → Phải báo lỗi
- [ ] Submit với Deadline trong quá khứ → Phải báo lỗi
- [ ] Submit với Location rỗng → Phải báo lỗi

#### 3.3.3: Test Submit Thành Công
**Điền đầy đủ form:**
```
- Title: "Senior Java Developer"
- Industry: "CNTT"
- Location: "Quận 1, TP.HCM"
- Description: "Mô tả công việc chi tiết ít nhất 50 ký tự bla bla bla..."
- Requirements: "Kỹ năng yêu cầu chi tiết ít nhất 50 ký tự bla bla bla..."
- Salary Min: 20000000
- Salary Max: 30000000
- Currency: VND
- Deadline: (chọn ngày trong tương lai)
- Employment Type: Chọn ít nhất 1 checkbox "Hình thức"
- Benefits: Chọn ít nhất 1 checkbox "Phúc lợi"
- Gender: Nam/Nữ
- Experience: 2-5 năm
```

**Expected:**
- [ ] Nút "Đăng Tuyển Dụng" đổi thành "Đang xử lý..."
- [ ] Hiện thông báo "✅ Đăng tin tuyển dụng thành công!"
- [ ] Redirect về `/quan-ly-dang-tuyen` sau 1.5s
- [ ] Tin mới xuất hiện trong danh sách

#### 3.3.4: Test Backend Response
**Check Network Tab (F12):**
- [ ] Request URL: `/api/jobs/create`
- [ ] Method: POST
- [ ] Headers: `Content-Type: application/json`
- [ ] Request Payload: Check JSON có đầy đủ fields không
- [ ] Response Status: 200 OK
- [ ] Response Body: 
  ```json
  {
    "success": true,
    "message": "Đăng tin tuyển dụng thành công",
    "jobId": <number>
  }
  ```

#### 3.3.5: Verify Database
**Check DB (MySQL Workbench hoặc console):**
```sql
SELECT * FROM jobs ORDER BY id DESC LIMIT 1;
```
- [ ] Record mới có `title` = "Senior Java Developer"
- [ ] `employer_id` = ID của employer đang đăng nhập
- [ ] `status` = "ACTIVE"
- [ ] `employment_type` có giá trị đúng (vd: "chinh-thuc, ban-thoi-gian")
- [ ] `benefits` có JSON array đúng
- [ ] `created_at` = thời điểm hiện tại

---

## 🧪 Part 3.4: Test Error Handling

### 3.4.1: Backend Validation Error
**Scenario:** Submit với field required bị null (hack frontend validation)
- [ ] Open DevTools Console
- [ ] Thực thi: `document.getElementById('title').value = ''`
- [ ] Delete validation code tạm thời
- [ ] Submit form
- [ ] **Expected:** Response 400 Bad Request với message lỗi cụ thể

### 3.4.2: Unauthorized Access
**Scenario:** Submit khi chưa đăng nhập
- [ ] Logout
- [ ] Access `/quan-ly-dang-tuyen/post-job` trực tiếp
- [ ] **Expected:** Redirect về `/employer-login.html`

### 3.4.3: Network Error
**Scenario:** Mất kết nối server
- [ ] Stop server (`Ctrl+C` trong terminal running mvnw)
- [ ] Submit form
- [ ] **Expected:** Hiển thị "Không thể kết nối đến server. Vui lòng thử lại."
- [ ] Nút submit reset về trạng thái ban đầu

---

## 📝 Test Report Template

```
### Test Run: [Ngày giờ]
**Tester:** [Tên bạn]

#### Part 3.3.1: Authentication
- Status: ✅ Pass / ❌ Fail
- Notes: ...

#### Part 3.3.2: Frontend Validation
- Status: ✅ Pass / ❌ Fail
- Notes: ...

#### Part 3.3.3: Submit Success
- Status: ✅ Pass / ❌ Fail
- Job ID Created: ...
- Notes: ...

#### Part 3.3.4: Backend Response
- Status: ✅ Pass / ❌ Fail
- Response Time: ...ms
- Notes: ...

#### Part 3.3.5: Database Verification
- Status: ✅ Pass / ❌ Fail
- SQL Result: ...
- Notes: ...

#### Part 3.4: Error Handling
- Validation Error: ✅ Pass / ❌ Fail
- Unauthorized: ✅ Pass / ❌ Fail
- Network Error: ✅ Pass / ❌ Fail
- Notes: ...

### Overall Result: ✅ PASS / ❌ FAIL / ⚠️ PARTIAL
### Bugs Found: [List bugs nếu có]
```

---

## 🚀 Bước Tiếp Theo (Sau khi Phase 3 Pass)

1. **Phase 4:** Fix bugs phát hiện từ testing
2. **Phase 5:** Tối ưu UX (loading states, better error messages)
3. **Phase 6:** Integration với trang danh sách tin (quan-ly-dang-tuyen)
