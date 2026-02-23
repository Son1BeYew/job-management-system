package Nhom08.Project.entity;

import jakarta.persistence.*;

/**
 * Base class for all dropdown option entities.
 * Each subclass maps to its own dedicated table.
 */
@MappedSuperclass
public abstract class BaseOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String value;

    @Column(nullable = false, length = 200)
    private String label;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @Column
    private Boolean active = true;

    public BaseOption() {}

    public BaseOption(String value, String label, int sortOrder) {
        this.value     = value;
        this.label     = label;
        this.sortOrder = sortOrder;
        this.active    = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
