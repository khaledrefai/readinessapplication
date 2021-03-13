package ae.gov.dubaipolice.readiness.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ae.gov.dubaipolice.readiness.web.rest.TestUtil;

public class MemberDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MemberData.class);
        MemberData memberData1 = new MemberData();
        memberData1.setId(1L);
        MemberData memberData2 = new MemberData();
        memberData2.setId(memberData1.getId());
        assertThat(memberData1).isEqualTo(memberData2);
        memberData2.setId(2L);
        assertThat(memberData1).isNotEqualTo(memberData2);
        memberData1.setId(null);
        assertThat(memberData1).isNotEqualTo(memberData2);
    }
}
