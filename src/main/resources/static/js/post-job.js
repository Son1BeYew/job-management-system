// ===== AUTO-FILL EMPLOYER INFO =====
async function loadEmployerInfo() {
    try {
        const response = await fetch('/api/jobs/employer-info', {
            credentials: 'include' // Important: Send session cookies
        });
        if (response.ok) {
            const info = await response.json();
            console.log('✅ Employer info loaded:', info);
            
            // Store for later use
            window.employerInfo = info;
            
            // Show company info in form
            showCompanyInfo(info);
        } else {
            console.error('❌ Failed to load employer info. Status:', response.status);
            console.error('❌ Response:', await response.text());
            alert('Không thể tải thông tin công ty. Vui lòng đăng nhập lại.');
            // window.location.href = '/employer-login.html';
        }
    } catch (error) {
        console.error('❌ Error loading employer info:', error);
        alert('Lỗi kết nối: ' + error.message);
    }
}

// ===== FORM SUBMISSION =====
document.getElementById('jobPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';
    
    // Collect form data
    const formData = collectFormData();
    
    try {
        const response = await fetch('/api/jobs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showSuccess('✅ Đăng tin tuyển dụng thành công!');
            setTimeout(() => {
                window.location.href = '/quan-ly-dang-tuyen';
            }, 1500);
        } else {
            showError(result.error || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Không thể kết nối đến server. Vui lòng thử lại.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// ===== COLLECT FORM DATA =====
function collectFormData() {
    // Get all form values
    const formData = {
        title: document.getElementById('title').value.trim(),
        jobCode: document.getElementById('jobCode').value.trim(),
        industry: document.getElementById('industry').value,
        location: document.getElementById('location').value.trim(),
        hideLocation: document.getElementById('hideLocation').checked,
        description: document.getElementById('description').value.trim(),
        requirements: document.getElementById('requirements').value.trim(),
        videoUrl1: document.getElementById('videoUrl1').value.trim(),
        videoUrl2: document.getElementById('videoUrl2').value.trim(),
        currency: document.getElementById('currency').value,
        salaryMin: parseSalary(document.getElementById('salaryMin').value),
        salaryMax: parseSalary(document.getElementById('salaryMax').value),
        showSalary: !document.getElementById('salaryDisplayText').textContent.includes('Ẩn'),
        deadline: document.getElementById('deadline').value,
        workFromHome: document.getElementById('workFromHome').checked,
        workAtOffice: document.getElementById('workAtOffice').checked,
        gender: document.querySelector('input[name="gender"]:checked')?.value || 'Nam/Nữ',
        ageMin: parseAge(document.getElementById('ageMin').value),
        ageMax: parseAge(document.getElementById('ageMax').value),
        experience: document.getElementById('experience').value,
        educationLevel: document.getElementById('educationLevel').value,
        additionalInfo: document.getElementById('additionalInfo').value.trim(),
        urgentRecruitment: document.querySelector('input[name="urgentRecruitment"]:checked')?.value === 'true',
        resumeLanguage: 'Tiếng Việt' // Default for now
    };
    
    // Collect benefits (checkboxes)
    const benefitsChecked = Array.from(document.querySelectorAll('input[name="benefits"]:checked'))
        .map(cb => cb.value);
    formData.benefits = JSON.stringify(benefitsChecked);
    
    // Collect languages
    const languagesChecked = Array.from(document.querySelectorAll('input[name="languages"]:checked'))
        .map(cb => cb.value);
    formData.resumeLanguage = languagesChecked.join(', ');
    
    return formData;
}

// ===== HELPER FUNCTIONS =====
function parseSalary(value) {
    if (!value) return null;
    return parseFloat(value);
}

function parseAge(value) {
    if (!value) return null;
    return parseInt(value);
}

// ===== SALARY DISPLAY TOGGLE =====
const salaryDisplayBtn = document.querySelector('.btn-salary-display');
if (salaryDisplayBtn) {
    salaryDisplayBtn.addEventListener('click', () => {
        const textElement = document.getElementById('salaryDisplayText');
        if (textElement.textContent === 'Hiện thị') {
            textElement.textContent = 'Ẩn';
            salaryDisplayBtn.style.background = '#dc3545';
        } else {
            textElement.textContent = 'Hiện thị';
            salaryDisplayBtn.style.background = '#2c3e8f';
        }
    });
}

// ===== MESSAGE HELPERS =====
function showSuccess(message) {
    showMessage(message, 'success');
}

function showError(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
    
    const msgDiv = document.createElement('div');
    msgDiv.className = type === 'success' ? 'success-message' : 'error-message';
    msgDiv.textContent = message;
    
    const container = document.querySelector('.post-job-container');
    container.insertBefore(msgDiv, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        msgDiv.remove();
    }, 5000);
}

// ===== SHOW COMPANY INFO =====
function showCompanyInfo(info) {
    const section = document.getElementById('companyInfoSection');
    if (!section) return;
    
    // Populate fields
    document.getElementById('displayCompanyName').textContent = info.companyName || '-';
    document.getElementById('displayAddress').textContent = info.address || '-';
    document.getElementById('displayContactName').textContent = info.contactName || '-';
    document.getElementById('displayContactPhone').textContent = info.contactPhone || '-';
    document.getElementById('displayEmail').textContent = info.email || '-';
    
    // Show section
    section.style.display = 'block';
}

// ===== VALIDATION =====
function validateForm() {
    const title = document.getElementById('title').value.trim();
    const location = document.getElementById('location').value.trim();
    const deadline = document.getElementById('deadline').value;
    const description = document.getElementById('description').value.trim();
    const requirements = document.getElementById('requirements').value.trim();
    
    if (!title) {
        showError('Vui lòng nhập chức danh tuyển dụng');
        return false;
    }
    
    if (!location) {
        showError('Vui lòng nhập nơi làm việc');
        return false;
    }
    
    if (!deadline) {
        showError('Vui lòng chọn hạn nộp hồ sơ');
        return false;
    }
    
    if (description.length < 50) {
        showError('Mô tả công việc phải có ít nhất 50 ký tự');
        return false;
    }
    
    if (requirements.length < 50) {
        showError('Kỹ năng yêu cầu phải có ít nhất 50 ký tự');
        return false;
    }
    
    // Validate deadline is in future
    const deadlineDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (deadlineDate < today) {
        showError('Hạn nộp hồ sơ phải là ngày trong tương lai');
        return false;
    }
    
    return true;
}

// Override submit to include validation
document.getElementById('jobPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';
    
    const formData = collectFormData();
    
    try {
        const response = await fetch('/api/jobs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showSuccess('✅ Đăng tin tuyển dụng thành công!');
            setTimeout(() => {
                window.location.href = '/quan-ly-dang-tuyen';
            }, 1500);
        } else {
            showError(result.error || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Không thể kết nối đến server. Vui lòng thử lại.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// ===== INIT ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    loadEmployerInfo();
    
    // Set minimum deadline to today
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        const today = new Date().toISOString().split('T')[0];
        deadlineInput.min = today;
    }
});

// ===== EDITOR TOOLBAR (Simple Implementation) =====
document.querySelectorAll('.btn-editor').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Editor button clicked:', btn.textContent);
        // TODO: Implement actual text formatting
        alert('Tính năng đang được phát triển');
    });
});

// ===== VIDEO PREVIEW =====
document.querySelectorAll('.btn-preview').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const url = input.value.trim();
        
        if (!url) {
            alert('Vui lòng nhập link video');
            return;
        }
        
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            alert('Chỉ hỗ trợ YouTube video');
            return;
        }
        
        window.open(url, '_blank');
    });
});
