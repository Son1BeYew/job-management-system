package Nhom08.Project.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for Step 2: Company information
 */
public class EmployerRegisterStep2DTO {

    @NotBlank(message = "Tên công ty không được để trống")
    private String companyName;

    @NotBlank(message = "Loại hình hoạt động không được để trống")
    private String businessType;

    @NotBlank(message = "Số nhân viên không được để trống")
    private String employeeCount;

    private String country = "Việt Nam";

    @NotBlank(message = "Tỉnh/TP không được để trống")
    private String province;

    @NotBlank(message = "Địa chỉ công ty không được để trống")
    private String address;

    private String description;

    @NotBlank(message = "Tên người liên hệ không được để trống")
    private String contactName;

    @NotBlank(message = "Điện thoại không được để trống")
    private String contactPhone;

    private String taxCode;

    // Getters and Setters
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(String employeeCount) {
        this.employeeCount = employeeCount;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }
}
