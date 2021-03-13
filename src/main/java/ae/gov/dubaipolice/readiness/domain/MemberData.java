package ae.gov.dubaipolice.readiness.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A MemberData.
 */
@Entity
@Table(name = "member_data")
public class MemberData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "test_date")
    private Instant testDate;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "user_birthday")
    private String userBirthday;

    @Column(name = "user_age")
    private Integer userAge;

    @Column(name = "user_height")
    private Float userHeight;

    @Column(name = "order_date")
    private Instant orderDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTestDate() {
        return testDate;
    }

    public MemberData testDate(Instant testDate) {
        this.testDate = testDate;
        return this;
    }

    public void setTestDate(Instant testDate) {
        this.testDate = testDate;
    }

    public Integer getUserId() {
        return userId;
    }

    public MemberData userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public MemberData userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserGender() {
        return userGender;
    }

    public MemberData userGender(String userGender) {
        this.userGender = userGender;
        return this;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender;
    }

    public String getUserBirthday() {
        return userBirthday;
    }

    public MemberData userBirthday(String userBirthday) {
        this.userBirthday = userBirthday;
        return this;
    }

    public void setUserBirthday(String userBirthday) {
        this.userBirthday = userBirthday;
    }

    public Integer getUserAge() {
        return userAge;
    }

    public MemberData userAge(Integer userAge) {
        this.userAge = userAge;
        return this;
    }

    public void setUserAge(Integer userAge) {
        this.userAge = userAge;
    }

    public Float getUserHeight() {
        return userHeight;
    }

    public MemberData userHeight(Float userHeight) {
        this.userHeight = userHeight;
        return this;
    }

    public void setUserHeight(Float userHeight) {
        this.userHeight = userHeight;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public MemberData orderDate(Instant orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberData)) {
            return false;
        }
        return id != null && id.equals(((MemberData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MemberData{" +
            "id=" + getId() +
            ", testDate='" + getTestDate() + "'" +
            ", userId=" + getUserId() +
            ", userName='" + getUserName() + "'" +
            ", userGender='" + getUserGender() + "'" +
            ", userBirthday='" + getUserBirthday() + "'" +
            ", userAge=" + getUserAge() +
            ", userHeight=" + getUserHeight() +
            ", orderDate='" + getOrderDate() + "'" +
            "}";
    }
}
