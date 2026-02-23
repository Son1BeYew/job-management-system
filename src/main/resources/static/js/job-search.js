// ===================================================
// JOB SEARCH PAGE - Full API Integration
// ===================================================

let allJobs = [];
let searchDebounceTimer = null;

document.addEventListener('DOMContentLoaded', function () {

    // Read keyword from URL params (e.g. from homepage search)
    const urlParams = new URLSearchParams(window.location.search);
    const initKeyword  = urlParams.get('keyword')  || '';
    const initLocation = urlParams.get('location') || '';

    const keywordInput  = document.getElementById('searchKeyword');
    const locationInput = document.getElementById('searchLocation');

    if (keywordInput  && initKeyword)  keywordInput.value  = initKeyword;
    if (locationInput && initLocation) locationInput.value = initLocation;

    // Load initial list
    loadJobs(initKeyword, initLocation);

    // ── Search button + Enter ──────────────────────────
    const searchBtn = document.querySelector('.btn-search-main');
    if (searchBtn) searchBtn.addEventListener('click', triggerSearch);

    [keywordInput, locationInput].forEach(inp => {
        if (inp) inp.addEventListener('keypress', e => { if (e.key === 'Enter') triggerSearch(); });
    });

    // ── Filters ──────────────────────────────────────
    ['filterSalary', 'filterLevel', 'filterPosted', 'filterType', 'filterExp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => applyClientFilters());
    });

    // ── Clear filters ─────────────────────────────────
    const clearBtn = document.querySelector('.btn-clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ['filterSalary', 'filterLevel', 'filterPosted', 'filterType', 'filterExp'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.selectedIndex = 0;
            });
            if (keywordInput)  keywordInput.value  = '';
            if (locationInput) locationInput.value = '';
            loadJobs('', '');
        });
    }

    // ── Sort ──────────────────────────────────────────
    const sortSelect = document.querySelector('.sort-dropdown select');
    if (sortSelect) sortSelect.addEventListener('change', () => applyClientFilters());
});

// ─────────────────────────────────────────────────────
// TRIGGER SEARCH
// ─────────────────────────────────────────────────────
function triggerSearch() {
    const keyword  = (document.getElementById('searchKeyword')?.value  || '').trim();
    const location = (document.getElementById('searchLocation')?.value || '').trim();
    loadJobs(keyword, location);
}

// ─────────────────────────────────────────────────────
// LOAD JOBS FROM API
// ─────────────────────────────────────────────────────
async function loadJobs(keyword, location) {
    const listEl = document.getElementById('jobList');
    if (!listEl) return;

    listEl.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#999;font-size:15px;">
        <div style="font-size:32px;margin-bottom:12px;">⏳</div>
        Đang tìm kiếm việc làm phù hợp...
    </div>`;

    try {
        let url = '/api/jobs/active';
        if (keyword) {
            url = `/api/jobs/search?keyword=${encodeURIComponent(keyword)}`;
        }

        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

        allJobs = await resp.json();

        // Client-side location filter (API search chỉ có keyword)
        if (location) {
            const loc = location.toLowerCase();
            allJobs = allJobs.filter(j => (j.location || '').toLowerCase().includes(loc));
        }

        applyClientFilters();

    } catch (err) {
        console.error('Error loading jobs:', err);
        listEl.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#dc3545;">
            <div style="font-size:32px;margin-bottom:12px;">❌</div>
            Không thể tải danh sách việc làm. 
            <button onclick="triggerSearch()" style="margin-top:12px;padding:8px 20px;background:#e84141;
            color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Thử lại</button>
        </div>`;
    }
}

// ─────────────────────────────────────────────────────
// CLIENT-SIDE FILTERS + SORT
// ─────────────────────────────────────────────────────
function applyClientFilters() {
    let filtered = [...allJobs];
    const today  = new Date();

    // Filter: Mức lương
    const salary = document.getElementById('filterSalary')?.value || 'Tất cả';
    if (salary !== 'Tất cả') {
        filtered = filtered.filter(j => {
            const min = j.salaryMin || 0;
            const max = j.salaryMax || 0;
            const avg = (min + max) / 2 || min || max;
            const m   = avg / 1_000_000; // in triệu
            if (salary === 'Dưới 10 triệu')  return m > 0 && m < 10;
            if (salary === '10 - 15 triệu')  return m >= 10 && m <= 15;
            if (salary === '15 - 20 triệu')  return m > 15 && m <= 20;
            if (salary === '20 - 30 triệu')  return m > 20 && m <= 30;
            if (salary === 'Trên 30 triệu')  return m > 30;
            return true;
        });
    }

    // Filter: Hình thức
    const type = document.getElementById('filterType')?.value || 'Tất cả';
    if (type !== 'Tất cả') {
        const typeMap = { 'Toàn thời gian': 'FULL_TIME', 'Bán thời gian': 'PART_TIME', 'Remote': 'REMOTE' };
        filtered = filtered.filter(j => j.employmentType === typeMap[type] || (j.employmentType || '').includes(type));
    }

    // Filter: Kinh nghiệm
    const exp = document.getElementById('filterExp')?.value || 'Tất cả';
    if (exp !== 'Tất cả') {
        filtered = filtered.filter(j => {
            const e = (j.experience || '').toLowerCase();
            if (exp === 'Chưa có kinh nghiệm') return e.includes('chưa') || e.includes('không') || e === '';
            if (exp === 'Dưới 1 năm')           return e.includes('dưới 1') || e.includes('< 1');
            if (exp === '1-2 năm')               return e.includes('1') || e.includes('2');
            if (exp === '3-5 năm')               return e.includes('3') || e.includes('4') || e.includes('5');
            if (exp === 'Trên 5 năm')            return e.includes('5+') || e.includes('trên 5');
            return true;
        });
    }

    // Filter: Đăng trong vòng
    const posted = document.getElementById('filterPosted')?.value || 'Tất cả';
    if (posted !== 'Tất cả') {
        const days = posted === '24 giờ qua' ? 1 : posted === '7 ngày qua' ? 7 : 30;
        const cutoff = new Date(today - days * 86400000);
        filtered = filtered.filter(j => j.createdAt && new Date(j.createdAt) >= cutoff);
    }

    // Sort
    const sortVal = document.querySelector('.sort-dropdown select')?.value || 'Ngày cập nhật';
    if (sortVal === 'Ngày cập nhật') {
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortVal === 'Mức lương') {
        filtered.sort((a, b) => (b.salaryMax || b.salaryMin || 0) - (a.salaryMax || a.salaryMin || 0));
    }

    renderJobs(filtered);
}

// ─────────────────────────────────────────────────────
// RENDER JOB CARDS - CareerViet style
// ─────────────────────────────────────────────────────
function renderJobs(jobs) {
    const listEl  = document.getElementById('jobList');
    const titleEl = document.getElementById('resultsTitle');

    if (titleEl) {
        const kw = (document.getElementById('searchKeyword')?.value || '').trim();
        titleEl.textContent = kw
            ? `${jobs.length} việc làm cho "${kw}"`
            : `${jobs.length} việc làm đang tuyển dụng`;
    }

    if (!jobs || jobs.length === 0) {
        listEl.innerHTML = `
            <div class="jc-empty">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p style="font-size:16px;font-weight:600;color:#555;margin:12px 0 6px;">Không tìm thấy việc làm phù hợp</p>
                <p style="font-size:14px;color:#999;">Hãy thử thay đổi từ khóa hoặc xóa bộ lọc</p>
                <button onclick="document.querySelector('.btn-clear-filters')?.click()"
                    style="margin-top:16px;padding:10px 28px;background:#e84141;color:#fff;
                    border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:14px;">
                    Xóa bộ lọc
                </button>
            </div>`;
        return;
    }

    listEl.innerHTML = jobs.map((job, idx) => {
        const salary   = formatSalaryCard(job.salaryMin, job.salaryMax, job.currency);
        const company  = job.employer?.companyName || 'Công ty đang ẩn tên';
        const isUrgent = job.urgentRecruitment;
        const isNew    = job.createdAt && (Date.now() - new Date(job.createdAt)) < 3 * 86400000;

        // Format deadline & createdAt
        const deadlineStr = job.deadline ? formatDate(job.deadline) : null;
        const updatedStr  = job.createdAt ? formatDate(job.createdAt.split('T')[0]) : null;

        // Benefits from description keywords (fallback)
        const benefits = job.benefits ? job.benefits.split(',').map(b => b.trim()).filter(Boolean)
            : (job.urgentRecruitment ? ['Thưởng KPI', 'Bảo hiểm'] : []);

        return `
        <div class="job-card-search jcs-card" data-id="${job.id}"
             style="animation: jcFadeUp .3s ease ${Math.min(idx * 0.06, 0.5)}s both;">
            <div class="job-card-header-search">

                <!-- Logo -->
                <div class="jcs-logo">
                    <i class="fa-regular fa-building" style="font-size:28px;color:#ced4da;"></i>
                </div>

                <!-- Content -->
                <div class="job-card-content">
                    <h3 class="jcs-title">
                        <a href="job-detail.html?id=${job.id}" class="jcs-title-link">${job.title}</a>
                        ${isUrgent ? '<span class="badge-hot">URGENT</span>' : isNew ? '<span class="badge-new">MỚI</span>' : ''}
                    </h3>
                    <p class="company-name-search">${company}</p>

                    <div class="jcs-meta">
                        <span class="jcs-salary">
                            <i class="fa-solid fa-dollar-sign"></i> ${salary}
                        </span>
                        <span class="jcs-location">
                            <i class="fa-solid fa-location-dot"></i> ${job.location || 'Chưa xác định'}
                        </span>
                        ${job.employmentType ? `<span class="jcs-type">
                            <i class="fa-regular fa-clock"></i> ${formatType(job.employmentType)}
                        </span>` : ''}
                    </div>

                    <div class="job-footer">
                        <span class="deadline">
                            ${deadlineStr ? `<i class="fa-regular fa-clock"></i> Hạn nộp: ${deadlineStr}` : ''}
                            ${deadlineStr && updatedStr ? ' &nbsp;|&nbsp; ' : ''}
                            ${updatedStr ? `<i class="fa-regular fa-calendar-days"></i> Cập nhật: ${updatedStr}` : ''}
                        </span>
                        ${benefits.length > 0 ? `<div class="job-badges">
                            ${benefits.slice(0,4).map(b => `<span class="badge-icon">
                                <i class="${getBenefitIcon(b)}"></i> ${b}
                            </span>`).join('')}
                        </div>` : ''}
                    </div>
                </div>

                <!-- Actions -->
                <div class="job-actions">
                    <button class="btn-favorite jcs-fav" onclick="toggleFav(this,${job.id})" title="Lưu">
                        <i class="fa-regular fa-heart" style="font-size:16px;color:#999;"></i>
                    </button>
                    <a href="job-detail.html?id=${job.id}" class="btn-apply">ỨNG TUYỂN NGAY</a>
                </div>
            </div>
        </div>`;
    }).join('');

    // Inject styles once
    if (!document.getElementById('jcsStyles')) {
        const s = document.createElement('style');
        s.id = 'jcsStyles';
        s.textContent = `
            @keyframes jcFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

            .jcs-card { transition: box-shadow .2s, transform .2s; }
            .jcs-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,.1); }

            .jcs-logo {
                width: 76px; height: 76px; border: 1px solid #e9ecef; border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                background: #f8f9fa; flex-shrink: 0;
            }

            .jcs-title { font-size: 16px; font-weight: 700; margin-bottom: 5px; display: flex; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
            .jcs-title-link { color: #e84141; text-decoration: none; line-height: 1.4; }
            .jcs-title-link:hover { text-decoration: underline; }

            .badge-new { background: #28a745; color: #fff; padding: 2px 7px; border-radius: 4px; font-size: 10px; font-weight: 700; flex-shrink:0; }

            .jcs-meta { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 10px; }
            .jcs-salary { color: #e84141; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
            .jcs-location { color: #555; font-size: 13px; display: flex; align-items: center; gap: 4px; }
            .jcs-type { color: #888; font-size: 13px; display: flex; align-items: center; gap: 4px; }

            .deadline { font-size: 12px; color: #888; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }

            .badge-icon {
                display: inline-flex; align-items: center; gap: 4px;
                font-size: 12px; color: #555; background: #f5f5f5;
                padding: 3px 10px; border-radius: 20px; border: 1px solid #e9ecef;
                font-weight: 500;
            }

            .jcs-fav { border: 1px solid #ddd; border-radius: 6px; background: #fff; width: 36px; height: 36px;
                display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .18s; }
            .jcs-fav:hover { border-color: #e84141; background: #fff5f5; }
            .jcs-fav.saved svg { fill: #e84141; stroke: #e84141; }

            .jc-empty { text-align: center; padding: 80px 20px; }

            .btn-apply { display: inline-block !important; text-decoration: none !important; text-align: center; }
        `;
        document.head.appendChild(s);
    }
}

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────
function formatSalaryCard(min, max, currency) {
    if (!min && !max) return 'Thỏa thuận';
    const fmt = n => (n / 1_000_000).toFixed(0) + ' Tr';
    const cur = currency === 'USD' ? 'USD' : 'VNĐ';
    if (min && max) return `${fmt(min)} - ${fmt(max)} ${cur}`;
    if (min) return `Từ ${fmt(min)} ${cur}`;
    return `Đến ${fmt(max)} ${cur}`;
}

function formatDate(str) {
    if (!str) return '';
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
}

function formatType(type) {
    return { FULL_TIME: 'Toàn thời gian', PART_TIME: 'Bán thời gian', REMOTE: 'Remote', CONTRACT: 'Hợp đồng' }[type] || type;
}

function toggleFav(btn, jobId) {
    btn.classList.toggle('saved');
    const favs = JSON.parse(localStorage.getItem('favJobs') || '[]');
    const i = favs.indexOf(jobId);
    if (btn.classList.contains('saved')) { if (i < 0) favs.push(jobId); }
    else { if (i > -1) favs.splice(i, 1); }
    localStorage.setItem('favJobs', JSON.stringify(favs));
}

// Map benefit keyword → Font Awesome icon class
function getBenefitIcon(benefit) {
    const b = benefit.toLowerCase();
    if (b.includes('bảo hiểm') || b.includes('bao hiem') || b.includes('insurance')) return 'fa-solid fa-shield-halved';
    if (b.includes('du lịch') || b.includes('du lich') || b.includes('travel'))       return 'fa-solid fa-plane';
    if (b.includes('laptop') || b.includes('máy tính') || b.includes('computer'))     return 'fa-solid fa-laptop';
    if (b.includes('thưởng') || b.includes('bonus') || b.includes('kpi'))              return 'fa-solid fa-dollar-sign';
    if (b.includes('xe') || b.includes('ô tô') || b.includes('car'))                   return 'fa-solid fa-car';
    if (b.includes('ăn') || b.includes('bữa') || b.includes('meal'))                   return 'fa-solid fa-utensils';
    if (b.includes('nhà ở') || b.includes('housing'))                                  return 'fa-solid fa-house';
    if (b.includes('y tế') || b.includes('sức khỏe') || b.includes('health'))          return 'fa-solid fa-heart-pulse';
    if (b.includes('đào tạo') || b.includes('training') || b.includes('học'))          return 'fa-solid fa-graduation-cap';
    if (b.includes('phụ cấp') || b.includes('phu cap') || b.includes('allowance'))     return 'fa-solid fa-hand-holding-dollar';
    if (b.includes('remote') || b.includes('từ xa'))                                   return 'fa-solid fa-house-laptop';
    if (b.includes('thể thao') || b.includes('gym') || b.includes('sport'))            return 'fa-solid fa-dumbbell';
    return 'fa-solid fa-circle-check'; // default
}
