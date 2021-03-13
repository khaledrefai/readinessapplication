package ae.gov.dubaipolice.readiness.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A InBodyResultsSheet.
 */
@Entity
@Table(name = "in_body_results_sheet")
public class InBodyResultsSheet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "datetimes")
    private Instant datetimes;

    @Column(name = "order_date")
    private Instant orderDate;

    @Column(name = "inbody_image")
    private String inbodyImage;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public InBodyResultsSheet userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Instant getDatetimes() {
        return datetimes;
    }

    public InBodyResultsSheet datetimes(Instant datetimes) {
        this.datetimes = datetimes;
        return this;
    }

    public void setDatetimes(Instant datetimes) {
        this.datetimes = datetimes;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public InBodyResultsSheet orderDate(Instant orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public String getInbodyImage() {
        return inbodyImage;
    }

    public InBodyResultsSheet inbodyImage(String inbodyImage) {
        this.inbodyImage = inbodyImage;
        return this;
    }

    public void setInbodyImage(String inbodyImage) {
        this.inbodyImage = inbodyImage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InBodyResultsSheet)) {
            return false;
        }
        return id != null && id.equals(((InBodyResultsSheet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InBodyResultsSheet{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", datetimes='" + getDatetimes() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", inbodyImage='" + getInbodyImage() + "'" +
            "}";
    }
}
