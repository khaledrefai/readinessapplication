package ae.gov.dubaipolice.readiness.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ae.gov.dubaipolice.readiness.web.rest.TestUtil;

public class InBodyResultsSheetTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InBodyResultsSheet.class);
        InBodyResultsSheet inBodyResultsSheet1 = new InBodyResultsSheet();
        inBodyResultsSheet1.setId(1L);
        InBodyResultsSheet inBodyResultsSheet2 = new InBodyResultsSheet();
        inBodyResultsSheet2.setId(inBodyResultsSheet1.getId());
        assertThat(inBodyResultsSheet1).isEqualTo(inBodyResultsSheet2);
        inBodyResultsSheet2.setId(2L);
        assertThat(inBodyResultsSheet1).isNotEqualTo(inBodyResultsSheet2);
        inBodyResultsSheet1.setId(null);
        assertThat(inBodyResultsSheet1).isNotEqualTo(inBodyResultsSheet2);
    }
}
