package Nhom08.Project.entity;
import jakarta.persistence.*;
@Entity @Table(name = "experience_levels")
public class ExperienceLevel extends BaseOption {
    public ExperienceLevel() {}
    public ExperienceLevel(String value, String label, int sortOrder) { super(value, label, sortOrder); }
}
