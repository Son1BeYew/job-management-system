package Nhom08.Project.entity;
import jakarta.persistence.*;
@Entity @Table(name = "education_levels")
public class EducationLevel extends BaseOption {
    public EducationLevel() {}
    public EducationLevel(String value, String label, int sortOrder) { super(value, label, sortOrder); }
}
