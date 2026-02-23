package Nhom08.Project.entity;
import jakarta.persistence.*;
@Entity @Table(name = "job_benefits")
public class JobBenefit extends BaseOption {
    public JobBenefit() {}
    public JobBenefit(String value, String label, int sortOrder) { super(value, label, sortOrder); }
}
