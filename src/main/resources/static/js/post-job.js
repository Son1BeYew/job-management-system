// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const existing = document.getElementById('job-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'job-toast';
    toast.style.cssText = `
        position: fixed; top: 24px; right: 24px; z-index: 9999;
        padding: 14px 20px; border-radius: 10px; font-size: 15px;
        font-weight: 600; display: flex; align-items: center; gap: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.18); max-width: 380px;
        animation: slideInRight 0.3s ease;
        ${type === 'success'
            ? 'background: #1a8c5b; color: #fff;'
            : 'background: #dc3545; color: #fff;'}
    `;

    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, type === 'success' ? 2000 : 4000);
}

// Inject toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(40px); }
        to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to   { opacity: 0; transform: translateX(40px); }
    }
    .btn-submit-loading {
        opacity: 0.7; cursor: not-allowed; position: relative;
    }
    .btn-submit-loading::after {
        content: '';
        display: inline-block; width: 14px; height: 14px;
        border: 2px solid #fff; border-top-color: transparent;
        border-radius: 50%; animation: spin 0.7s linear infinite;
        margin-left: 8px; vertical-align: middle;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);


// ===== AUTO-FILL EMPLOYER INFO =====
async function loadEmployerInfo() {
    try {
        const response = await fetch('/api/jobs/employer-info', { credentials: 'include' });

        if (response.status === 403) {
            // Chưa đăng nhập hoặc không phải employer
            showToast('Vui lòng đăng nhập với tài khoản nhà tuyển dụng.', 'error');
            setTimeout(() => { window.location.href = '/employer-login.html'; }, 2000);
            return;
        }

        if (response.ok) {
            const info = await response.json();
            window.employerInfo = info;
            showCompanyInfo(info);
        } else {
            console.warn('Không tải được thông tin công ty:', response.status);
        }
    } catch (error) {
        console.error('Lỗi kết nối khi tải thông tin công ty:', error);
    }
}


// ===== SHOW COMPANY INFO =====
function showCompanyInfo(info) {
    const section = document.getElementById('companyInfoSection');
    if (!section) return;

    document.getElementById('displayCompanyName').textContent = info.companyName || '—';
    document.getElementById('displayAddress').textContent     = info.address     || '—';
    document.getElementById('displayContactName').textContent = info.contactName || '—';
    document.getElementById('displayContactPhone').textContent = info.contactPhone || '—';
    document.getElementById('displayEmail').textContent       = info.email       || '—';

    section.style.display = 'block';
}


// ===== COLLECT FORM DATA =====
function collectFormData() {
    const employmentTypes = Array.from(
        document.querySelectorAll('input[name="employmentType"]:checked')
    ).map(cb => cb.value).join(', ');

    const benefits = JSON.stringify(
        Array.from(document.querySelectorAll('input[name="benefits"]:checked'))
            .map(cb => cb.value)
    );

    const resumeLanguage = Array.from(
        document.querySelectorAll('input[name="languages"]:checked')
    ).map(cb => cb.value).join(', ') || 'tieng-viet';

    return {
        title:              document.getElementById('title').value.trim(),
        jobCode:            document.getElementById('jobCode').value.trim() || null,
        industry:           document.getElementById('industry').value || null,
        location:           document.getElementById('location').value.trim(),
        hideLocation:       document.getElementById('hideLocation').checked,
        description:        document.getElementById('description').value.trim(),
        requirements:       document.getElementById('requirements').value.trim(),
        videoUrl1:          document.getElementById('videoUrl1').value.trim() || null,
        videoUrl2:          document.getElementById('videoUrl2').value.trim() || null,
        currency:           document.getElementById('currency').value,
        salaryMin:          parseSalary(document.getElementById('salaryMin').value),
        salaryMax:          parseSalary(document.getElementById('salaryMax').value),
        showSalary:         !document.getElementById('salaryDisplayText').textContent.includes('Ẩn'),
        deadline:           document.getElementById('deadline').value,
        urgentRecruitment:  document.querySelector('input[name="urgentRecruitment"]:checked')?.value === 'true',
        workFromHome:       document.getElementById('workFromHome').checked,
        workAtOffice:       document.getElementById('workAtOffice').checked,
        gender:             document.querySelector('input[name="gender"]:checked')?.value || 'Nam/Nữ',
        ageMin:             parseAge(document.getElementById('ageMin').value),
        ageMax:             parseAge(document.getElementById('ageMax').value),
        experience:         document.getElementById('experience').value || null,
        educationLevel:     document.getElementById('educationLevel').value || null,
        degreeLevel:        document.getElementById('degreeLevel').value || null,
        additionalInfo:     document.getElementById('additionalInfo').value.trim() || null,
        employmentType:     employmentTypes,
        benefits:           benefits,
        resumeLanguage:     resumeLanguage,
    };
}


// ===== HELPERS =====
function parseSalary(value) {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
}

function parseAge(value) {
    const num = parseInt(value, 10);
    return isNaN(num) ? null : num;
}


// ===== VALIDATION =====
function validateForm() {
    const fields = [
        { id: 'title',        msg: 'Vui lòng nhập chức danh tuyển dụng' },
        { id: 'location',     msg: 'Vui lòng nhập nơi làm việc' },
        { id: 'deadline',     msg: 'Vui lòng chọn hạn nộp hồ sơ' },
        { id: 'description',  msg: 'Mô tả công việc phải có ít nhất 50 ký tự', minLen: 50 },
        { id: 'requirements', msg: 'Kỹ năng yêu cầu phải có ít nhất 50 ký tự',  minLen: 50 },
    ];

    for (const { id, msg, minLen } of fields) {
        const el = document.getElementById(id);
        const value = el?.value?.trim() || '';
        if (!value || (minLen && value.length < minLen)) {
            showToast(msg, 'error');
            el?.focus();
            return false;
        }
    }

    const deadline = new Date(document.getElementById('deadline').value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deadline < today) {
        showToast('Hạn nộp hồ sơ phải là ngày trong tương lai', 'error');
        document.getElementById('deadline')?.focus();
        return false;
    }

    return true;
}


// ===== SALARY TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {

    // Salary display toggle
    const salaryBtn = document.querySelector('.btn-salary-display');
    if (salaryBtn) {
        salaryBtn.addEventListener('click', () => {
            const text = document.getElementById('salaryDisplayText');
            const isShowing = text.textContent === 'Hiện thị';
            text.textContent = isShowing ? 'Ẩn' : 'Hiện thị';
            salaryBtn.style.background = isShowing ? '#dc3545' : '#2c3e8f';
        });
    }

    // Set min deadline = today
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        deadlineInput.min = new Date().toISOString().split('T')[0];
    }

    // Load employer info
    loadEmployerInfo();

    // Editor toolbar (simple)
    document.querySelectorAll('.btn-editor').forEach(btn => {
        btn.addEventListener('click', () => {
            // Find textarea sibling
            const toolbar = btn.closest('.editor-toolbar');
            const textarea = toolbar?.nextElementSibling;
            if (!textarea || textarea.tagName !== 'TEXTAREA') return;

            const start = textarea.selectionStart;
            const end   = textarea.selectionEnd;
            const selected = textarea.value.substring(start, end);
            const label = btn.textContent.trim();

            let wrapped = selected;
            if (label === 'B')      wrapped = `**${selected}**`;
            else if (label === 'I') wrapped = `_${selected}_`;
            else if (label === '• List') wrapped = `• ${selected}`;
            else if (label === '1. List') wrapped = `1. ${selected}`;

            textarea.value =
                textarea.value.substring(0, start) + wrapped + textarea.value.substring(end);
            textarea.focus();
        });
    });

    // Video preview
    document.querySelectorAll('.btn-preview').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.previousElementSibling?.value?.trim();
            if (!url) { showToast('Vui lòng nhập link video', 'error'); return; }
            if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
                showToast('Chỉ hỗ trợ link YouTube', 'error'); return;
            }
            window.open(url, '_blank');
        });
    });

    // ===== FORM SUBMIT =====
    const form = document.getElementById('jobPostForm');
    if (!form) { console.error('Form #jobPostForm không tìm thấy!'); return; }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const submitBtn = form.querySelector('.btn-submit');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-submit-loading');
        submitBtn.innerHTML = 'Đang đăng tuyển...';

        const formData = collectFormData();

        try {
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showToast(`✅ Đăng tin tuyển dụng thành công! (Job #${result.jobId})`, 'success');
                setTimeout(() => {
                    window.location.href = '/quan-ly-dang-tuyen.html';
                }, 2000);
            } else if (response.status === 403) {
                showToast('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.', 'error');
                setTimeout(() => { window.location.href = '/employer-login.html'; }, 2000);
            } else {
                const errorMsg = result.error || result.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
                showToast(errorMsg, 'error');
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-submit-loading');
                submitBtn.innerHTML = originalHTML;
            }
        } catch (err) {
            console.error('Lỗi khi gửi form:', err);
            showToast('Không thể kết nối đến server. Vui lòng thử lại.', 'error');
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-submit-loading');
            submitBtn.innerHTML = originalHTML;
        }
    });
});
