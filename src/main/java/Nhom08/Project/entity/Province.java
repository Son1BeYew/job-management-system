package Nhom08.Project.entity;
import jakarta.persistence.*;
@Entity @Table(name = "provinces")
public class Province extends BaseOption {
    public Province() {}
    public Province(String value, String label, int sortOrder) { super(value, label, sortOrder); }
}
