package ae.gov.dubaipolice.readiness.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A InbodyData.
 */
@Entity
@Table(name = "inbody_data")
public class InbodyData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_id")
    private Integer userID;

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "column_value")
    private String columnValue;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserID() {
        return userID;
    }

    public InbodyData userID(Integer userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getColumnName() {
        return columnName;
    }

    public InbodyData columnName(String columnName) {
        this.columnName = columnName;
        return this;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getColumnValue() {
        return columnValue;
    }

    public InbodyData columnValue(String columnValue) {
        this.columnValue = columnValue;
        return this;
    }

    public void setColumnValue(String columnValue) {
        this.columnValue = columnValue;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InbodyData)) {
            return false;
        }
        return id != null && id.equals(((InbodyData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InbodyData{" +
            "id=" + getId() +
            ", userID=" + getUserID() +
            ", columnName='" + getColumnName() + "'" +
            ", columnValue='" + getColumnValue() + "'" +
            "}";
    }
}
