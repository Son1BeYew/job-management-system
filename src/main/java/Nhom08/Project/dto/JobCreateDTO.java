package Nhom08.Project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class JobCreateDTO {

    @NotBlank(message = "Chức danh không được để trống")
    private String title;

    private String jobCode;

    private String industry;

    @NotBlank(message = "Nơi làm việc không được để trống")
    private String location;

    private Boolean hideLocation = false;

    private String description;

    private String requirements;

    private BigDecimal salaryMin;

    private BigDecimal salaryMax;

    private String currency = "VND";

    private Boolean showSalary = true;

    private String videoUrl1;

    private String videoUrl2;

    @NotNull(message = "Hạn nộp hồ sơ không được để trống")
    private LocalDate deadline;

    private Boolean urgentRecruitment = false;

    private String resumeLanguage = "Tiếng Việt";

    private String employmentType;

    private Boolean workFromHome = false;

    private Boolean workAtOffice = true;

    private String benefits; // JSON string

    private String gender;

    private Integer ageMin;

    private Integer ageMax;

    private String experience;

    private String educationLevel;

    private String additionalInfo;

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getJobCode() {
        return jobCode;
    }

    public void setJobCode(String jobCode) {
        this.jobCode = jobCode;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getHideLocation() {
        return hideLocation;
    }

    public void setHideLocation(Boolean hideLocation) {
        this.hideLocation = hideLocation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public BigDecimal getSalaryMin() {
        return salaryMin;
    }

    public void setSalaryMin(BigDecimal salaryMin) {
        this.salaryMin = salaryMin;
    }

    public BigDecimal getSalaryMax() {
        return salaryMax;
    }

    public void setSalaryMax(BigDecimal salaryMax) {
        this.salaryMax = salaryMax;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Boolean getShowSalary() {
        return showSalary;
    }

    public void setShowSalary(Boolean showSalary) {
        this.showSalary = showSalary;
    }

    public String getVideoUrl1() {
        return videoUrl1;
    }

    public void setVideoUrl1(String videoUrl1) {
        this.videoUrl1 = videoUrl1;
    }

    public String getVideoUrl2() {
        return videoUrl2;
    }

    public void setVideoUrl2(String videoUrl2) {
        this.videoUrl2 = videoUrl2;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Boolean getUrgentRecruitment() {
        return urgentRecruitment;
    }

    public void setUrgentRecruitment(Boolean urgentRecruitment) {
        this.urgentRecruitment = urgentRecruitment;
    }

    public String getResumeLanguage() {
        return resumeLanguage;
    }

    public void setResumeLanguage(String resumeLanguage) {
        this.resumeLanguage = resumeLanguage;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public Boolean getWorkFromHome() {
        return workFromHome;
    }

    public void setWorkFromHome(Boolean workFromHome) {
        this.workFromHome = workFromHome;
    }

    public Boolean getWorkAtOffice() {
        return workAtOffice;
    }

    public void setWorkAtOffice(Boolean workAtOffice) {
        this.workAtOffice = workAtOffice;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getAgeMin() {
        return ageMin;
    }

    public void setAgeMin(Integer ageMin) {
        this.ageMin = ageMin;
    }

    public Integer getAgeMax() {
        return ageMax;
    }

    public void setAgeMax(Integer ageMax) {
        this.ageMax = ageMax;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
}
