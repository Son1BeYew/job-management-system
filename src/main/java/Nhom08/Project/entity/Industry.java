package Nhom08.Project.entity;
import jakarta.persistence.*;
@Entity @Table(name = "industries")
public class Industry extends BaseOption {
    public Industry() {}
    public Industry(String value, String label, int sortOrder) { super(value, label, sortOrder); }
}
