# CODEBASE.md - CareerViet Homepage Clone

> **Last Updated**: 2026-02-01  
> **Project**: Nhom08-QLTD - CareerViet Homepage Implementation  
> **Version**: 1.0.0

---

## 📋 Project Overview

### Purpose
Clone giao diện trang chủ CareerViet.vn với đầy đủ chức năng tương tác, sử dụng HTML/CSS/JavaScript thuần túy, tích hợp sẵn sàng với Spring Boot backend.

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Spring Boot 3.x (Java)
- **Build Tool**: Maven
- **Server**: Embedded Tomcat
- **Assets**: AI-generated images, SVG icons

### Key Features
1. ✅ Responsive job search homepage
2. ✅ Interactive slider & tabs
3. ✅ Mock job listings (19,490 opportunities)
4. ✅ Smooth animations & transitions
5. ✅ SEO-optimized structure

---

## 📁 File Structure

```
c:/Nhom08-QLTD/
├── src/main/resources/static/          # Frontend assets
│   ├── index.html                      # Main homepage (46KB)
│   ├── css/
│   │   └── style.css                   # Styles with animations (25KB)
│   ├── js/
│   │   └── main.js                     # Interactive features (8KB)
│   └── images/                         # Generated assets (24 files)
│       ├── logo.png                    # CareerViet logo
│       ├── banner-people.png           # Hero section professionals
│       ├── qr-code.png                 # QR code for mobile app
│       ├── zalo-icon.png               # Chat button icon
│       ├── app-store.png               # iOS download badge
│       ├── google-play.png             # Android download badge
│       ├── dmca-badge.png              # Footer certifications
│       └── company-[1-17].png          # Company logo placeholders
│
├── pom.xml                             # Maven configuration
├── README-HOMEPAGE.md                  # User documentation
├── SUMMARY.md                          # Implementation summary
├── CODEBASE.md                         # This file
├── open-homepage.bat                   # Quick start script
└── .agent/                             # AI agent configuration
    └── ARCHITECTURE.md                 # System architecture
```

---

## 🔗 File Dependencies

### Critical Dependencies

#### `index.html` depends on:
- `css/style.css` - All styling and animations
- `js/main.js` - Interactive functionality
- `images/*.png` - All visual assets
- Google Fonts API (Inter font family)

#### `style.css` depends on:
- CSS Variables defined in `:root`
- Inter font from Google Fonts
- SVG data URIs for patterns

#### `main.js` depends on:
- DOM elements from `index.html`
- Modern browser APIs (IntersectionObserver, etc.)

### Asset Dependencies

```
index.html
├── css/style.css
├── js/main.js
├── images/logo.png
├── images/banner-people.png
├── images/qr-code.png
├── images/zalo-icon.png
├── images/app-store.png
├── images/google-play.png
├── images/dmca-badge.png
└── images/company-[1-17].png
```

---

## 🎯 Core Components

### 1. Header Component
**File**: `index.html` (lines 11-50)  
**Styles**: `style.css` (.header, .nav, .header-actions)  
**Features**:
- Sticky navigation
- Logo with hover effect
- Navigation menu (7 items)
- Notification & login links
- Employer CTA button

**Dependencies**:
- `images/logo.png`
- CSS animations (slideDown)

---

### 2. Hero Section
**File**: `index.html` (lines 52-180)  
**Styles**: `style.css` (.hero, .search-box, .hero-banner)  
**JavaScript**: `main.js` (slider, search handlers)

**Sub-components**:
- **Search Box** (left column)
  - Job search input
  - Reset & advanced search buttons
  - Primary CTA: "TÌM VIỆC NGAY"
  - Secondary CTA: "ĐĂNG NGAY"
  
- **Banner Slider** (right column)
  - Auto-advance (5s interval)
  - Manual control dots
  - Feature icons (7 items)
  - QR code section

**Dependencies**:
- `images/banner-people.png`
- `images/qr-code.png`
- JavaScript slider logic

---

### 3. Job Listings Section
**File**: `index.html` (lines 190-350)  
**Styles**: `style.css` (.job-listings, .job-card, .tabs)  
**JavaScript**: `main.js` (tab switching, card interactions)

**Structure**:
```
Job Listings
├── Tabs (3)
│   ├── Việc Làm Nổi Bật (active)
│   ├── Việc Làm VIP ($1000+)
│   └── Việc Làm Từ Top Headhunter
└── Job Grid (2 columns)
    └── Job Cards (8 items)
        ├── Company logo
        ├── Job title
        ├── Company name
        ├── Salary
        ├── Location
        └── Badges (TOP/URGENT)
```

**Dependencies**:
- `images/company-[1-8].png`
- Tab switching logic in `main.js`

---

### 4. Job Categories Section
**File**: `index.html` (lines 360-480)  
**Styles**: `style.css` (.job-categories, .category-tab)  
**JavaScript**: `main.js` (category tab switching)

**Categories**:
1. Bán hàng / Kinh doanh
2. Tiếp thị / Marketing
3. Hành chính / Thư ký

**Dependencies**:
- `images/company-[9-17].png`
- Category tab logic

---

### 5. Footer Component
**File**: `index.html` (lines 490-600)  
**Styles**: `style.css` (.footer, .footer-column)

**Structure** (6 columns):
1. Dành cho ứng viên (10 links)
2. Nhà tuyển dụng (5 links)
3. Trung tâm trợ giúp (8 links)
4. Website đối tác (3 links)
5. Xây dựng sự nghiệp (8 links)
6. App downloads & social links

**Dependencies**:
- `images/app-store.png`
- `images/google-play.png`
- `images/dmca-badge.png`

---

## 🎨 Design System

### CSS Variables (`:root`)
```css
--primary-orange: #FF6B00     /* Brand color */
--primary-teal: #00BFA5       /* CTA buttons */
--primary-blue: #2E3B8E       /* Employer section */
--dark-blue: #1A2456          /* Dark accents */
--text-dark: #2C3E50          /* Primary text */
--text-gray: #6C757D          /* Secondary text */
--light-gray: #F5F7FA         /* Backgrounds */
--white: #FFFFFF              /* Pure white */
```

### Typography Scale
```css
H1: 36px / 800 weight (Banner title)
H2: 28px / 800 weight (Section titles)
H3: 16px / 700 weight (Job titles)
H4: 14px / 700 weight (Footer headings)
Body: 14-16px / 400-600 weight
```

### Spacing System
- Container max-width: 1200px
- Section padding: 40-60px vertical
- Card padding: 20px
- Gap between elements: 15-30px

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.08)
--shadow-md: 0 4px 16px rgba(0,0,0,0.12)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.16)
```

---

## ⚡ JavaScript Architecture

### Event Handlers

#### Search Functionality
```javascript
// File: main.js, lines 40-65
- searchButton.click → validate & search
- resetButton.click → clear input
- searchInput.keypress(Enter) → trigger search
```

#### Tab Management
```javascript
// File: main.js, lines 10-38
- Job tabs → switch between Nổi Bật/VIP/Headhunter
- Category tabs → switch between Bán hàng/Marketing/Hành chính
```

#### Slider Control
```javascript
// File: main.js, lines 70-85
- Auto-advance: setInterval(5000ms)
- Manual control: dot.click → change slide
```

#### Scroll Effects
```javascript
// File: main.js, lines 120-135
- Header shadow on scroll
- IntersectionObserver for fade-in animations
```

### Utility Functions
```javascript
formatSalary(min, max, currency)  // Format salary display
formatDate(date)                   // Format Vietnamese date
debounce(func, wait)               // Debounce search input
addToFavorites(jobId)              // Save job (mock)
shareJob(jobId)                    // Share job (mock)
applyForJob(jobId)                 // Apply for job (mock)
```

---

## 🔄 Data Flow

### Mock Data Structure
```javascript
{
  title: "Job Title",
  company: "Company Name",
  salary: "12 Tr - 30 Tr VNĐ" | "Cạnh Tranh",
  location: "Hồ Chí Minh" | "Hà Nội" | "Hà Tĩnh",
  badge: "TOP" | "URGENT" | null
}
```

### State Management
- **Current Tab**: Stored in DOM (active class)
- **Current Slide**: JavaScript variable `currentSlide`
- **Search Query**: Input value (not persisted)

---

## 🚀 Performance Optimizations

### CSS
- ✅ Hardware-accelerated transforms
- ✅ Will-change hints for animations
- ✅ Optimized repaints (transform/opacity only)
- ✅ Efficient selectors (no deep nesting)

### JavaScript
- ✅ Event delegation where possible
- ✅ Debounced search input
- ✅ IntersectionObserver for lazy animations
- ✅ Minimal DOM queries (cached references)

### Assets
- ✅ Optimized image sizes
- ✅ SVG icons (inline, no HTTP requests)
- ✅ Font subsetting ready
- ✅ Lazy loading ready (commented)

---

## 📱 Responsive Breakpoints

```css
/* Desktop: Default (> 1024px) */
.hero-content { grid-template-columns: 360px 1fr; }
.job-grid { grid-template-columns: repeat(2, 1fr); }

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .hero-content { grid-template-columns: 1fr; }
  .job-grid { grid-template-columns: 1fr; }
}

/* Mobile: < 768px */
@media (max-width: 768px) {
  .nav { display: none; }
  .footer-content { grid-template-columns: repeat(2, 1fr); }
}

/* Small Mobile: < 480px */
@media (max-width: 480px) {
  .banner-title { font-size: 24px; }
  .footer-content { grid-template-columns: 1fr; }
}
```

---

## 🔧 Configuration

### Spring Boot Integration
**File**: `pom.xml`
- Static resources served from `/static`
- Default port: 8080
- Access URL: `http://localhost:8080/index.html`

### Build Commands
```bash
# Run development server
mvn spring-boot:run

# Build production
mvn clean package

# Quick start (Windows)
.\open-homepage.bat
```

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **Mock Data Only**: All job listings are hardcoded
2. **Single Slide**: Banner slider has only 1 slide
3. **Placeholder Logos**: Company logos are duplicated placeholders
4. **No Backend**: Search/apply functions show alerts only
5. **IE11**: Requires polyfills for modern JS

### Future Enhancements
- [ ] Connect to REST API
- [ ] Database integration
- [ ] User authentication
- [ ] Advanced search modal
- [ ] Job detail pages
- [ ] Application workflow

---

## 🔐 Security Considerations

### Current Implementation
- ✅ No external dependencies (security by isolation)
- ✅ No user input stored
- ✅ No cookies/localStorage used
- ✅ CSP-ready (no inline scripts in HTML)

### Production Recommendations
- [ ] Add Content Security Policy headers
- [ ] Implement CSRF protection
- [ ] Sanitize user inputs
- [ ] Add rate limiting
- [ ] Enable HTTPS only

---

## 📊 Metrics

### Code Statistics
- **HTML**: 600 lines, 46KB
- **CSS**: 850 lines, 25KB
- **JavaScript**: 250 lines, 8KB
- **Total**: ~79KB (excluding images)

### Asset Count
- Images: 24 files
- SVG icons: 15+ inline
- External fonts: 1 (Inter)

### Browser Support
- Chrome 90+: ✅ Full support
- Firefox 88+: ✅ Full support
- Safari 14+: ✅ Full support
- Edge 90+: ✅ Full support
- IE11: ⚠️ Partial (needs polyfills)

---

## 🧪 Testing Checklist

### Manual Testing
- [x] Header navigation works
- [x] Search form validates input
- [x] Tabs switch correctly
- [x] Slider auto-advances
- [x] Hover effects work
- [x] Responsive on mobile
- [x] Footer links present
- [x] Images load correctly

### Browser Testing
- [x] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## 📚 Related Documentation

- **README-HOMEPAGE.md**: User guide & setup instructions
- **SUMMARY.md**: Implementation summary & features
- **ARCHITECTURE.md**: System architecture & agent setup
- **pom.xml**: Maven dependencies & build config

---

## 🔄 Change Log

### Version 1.0.0 (2026-02-01)
- ✅ Initial implementation
- ✅ Complete homepage clone
- ✅ All sections implemented
- ✅ Responsive design
- ✅ Interactive features
- ✅ Mock data integration
- ✅ Documentation complete

---

## 👥 Maintenance

### File Ownership
- **Frontend**: `src/main/resources/static/**`
- **Documentation**: `*.md` files
- **Build**: `pom.xml`, `mvnw*`

### Update Frequency
- **Mock Data**: Update when adding new features
- **Styles**: Update for design changes
- **Scripts**: Update for new interactions
- **Docs**: Update after major changes

---

**Last Review**: 2026-02-01  
**Next Review**: When adding backend integration  
**Maintained By**: Nhom08-QLTD Team
