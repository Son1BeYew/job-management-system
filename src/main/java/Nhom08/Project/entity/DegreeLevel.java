package Nhom08.Project.entity;
import jakarta.persistence.*;
@Entity @Table(name = "degree_levels")
public class DegreeLevel extends BaseOption {
    public DegreeLevel() {}
    public DegreeLevel(String value, String label, int sortOrder) { super(value, label, sortOrder); }
}
