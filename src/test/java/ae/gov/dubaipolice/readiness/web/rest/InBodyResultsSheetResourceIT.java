package ae.gov.dubaipolice.readiness.web.rest;

import ae.gov.dubaipolice.readiness.ReadinessapplicationApp;
import ae.gov.dubaipolice.readiness.domain.InBodyResultsSheet;
import ae.gov.dubaipolice.readiness.repository.InBodyResultsSheetRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InBodyResultsSheetResource} REST controller.
 */
@SpringBootTest(classes = ReadinessapplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InBodyResultsSheetResourceIT {

    private static final Integer DEFAULT_USER_ID = 1;
    private static final Integer UPDATED_USER_ID = 2;

    private static final Instant DEFAULT_DATETIMES = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATETIMES = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ORDER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ORDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_INBODY_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_INBODY_IMAGE = "BBBBBBBBBB";

    @Autowired
    private InBodyResultsSheetRepository inBodyResultsSheetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInBodyResultsSheetMockMvc;

    private InBodyResultsSheet inBodyResultsSheet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InBodyResultsSheet createEntity(EntityManager em) {
        InBodyResultsSheet inBodyResultsSheet = new InBodyResultsSheet()
            .userId(DEFAULT_USER_ID)
            .datetimes(DEFAULT_DATETIMES)
            .orderDate(DEFAULT_ORDER_DATE)
            .inbodyImage(DEFAULT_INBODY_IMAGE);
        return inBodyResultsSheet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InBodyResultsSheet createUpdatedEntity(EntityManager em) {
        InBodyResultsSheet inBodyResultsSheet = new InBodyResultsSheet()
            .userId(UPDATED_USER_ID)
            .datetimes(UPDATED_DATETIMES)
            .orderDate(UPDATED_ORDER_DATE)
            .inbodyImage(UPDATED_INBODY_IMAGE);
        return inBodyResultsSheet;
    }

    @BeforeEach
    public void initTest() {
        inBodyResultsSheet = createEntity(em);
    }

    @Test
    @Transactional
    public void createInBodyResultsSheet() throws Exception {
        int databaseSizeBeforeCreate = inBodyResultsSheetRepository.findAll().size();
        // Create the InBodyResultsSheet
        restInBodyResultsSheetMockMvc.perform(post("/api/in-body-results-sheets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inBodyResultsSheet)))
            .andExpect(status().isCreated());

        // Validate the InBodyResultsSheet in the database
        List<InBodyResultsSheet> inBodyResultsSheetList = inBodyResultsSheetRepository.findAll();
        assertThat(inBodyResultsSheetList).hasSize(databaseSizeBeforeCreate + 1);
        InBodyResultsSheet testInBodyResultsSheet = inBodyResultsSheetList.get(inBodyResultsSheetList.size() - 1);
        assertThat(testInBodyResultsSheet.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testInBodyResultsSheet.getDatetimes()).isEqualTo(DEFAULT_DATETIMES);
        assertThat(testInBodyResultsSheet.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testInBodyResultsSheet.getInbodyImage()).isEqualTo(DEFAULT_INBODY_IMAGE);
    }

    @Test
    @Transactional
    public void createInBodyResultsSheetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inBodyResultsSheetRepository.findAll().size();

        // Create the InBodyResultsSheet with an existing ID
        inBodyResultsSheet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInBodyResultsSheetMockMvc.perform(post("/api/in-body-results-sheets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inBodyResultsSheet)))
            .andExpect(status().isBadRequest());

        // Validate the InBodyResultsSheet in the database
        List<InBodyResultsSheet> inBodyResultsSheetList = inBodyResultsSheetRepository.findAll();
        assertThat(inBodyResultsSheetList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInBodyResultsSheets() throws Exception {
        // Initialize the database
        inBodyResultsSheetRepository.saveAndFlush(inBodyResultsSheet);

        // Get all the inBodyResultsSheetList
        restInBodyResultsSheetMockMvc.perform(get("/api/in-body-results-sheets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inBodyResultsSheet.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].datetimes").value(hasItem(DEFAULT_DATETIMES.toString())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].inbodyImage").value(hasItem(DEFAULT_INBODY_IMAGE)));
    }
    
    @Test
    @Transactional
    public void getInBodyResultsSheet() throws Exception {
        // Initialize the database
        inBodyResultsSheetRepository.saveAndFlush(inBodyResultsSheet);

        // Get the inBodyResultsSheet
        restInBodyResultsSheetMockMvc.perform(get("/api/in-body-results-sheets/{id}", inBodyResultsSheet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inBodyResultsSheet.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.datetimes").value(DEFAULT_DATETIMES.toString()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.inbodyImage").value(DEFAULT_INBODY_IMAGE));
    }
    @Test
    @Transactional
    public void getNonExistingInBodyResultsSheet() throws Exception {
        // Get the inBodyResultsSheet
        restInBodyResultsSheetMockMvc.perform(get("/api/in-body-results-sheets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInBodyResultsSheet() throws Exception {
        // Initialize the database
        inBodyResultsSheetRepository.saveAndFlush(inBodyResultsSheet);

        int databaseSizeBeforeUpdate = inBodyResultsSheetRepository.findAll().size();

        // Update the inBodyResultsSheet
        InBodyResultsSheet updatedInBodyResultsSheet = inBodyResultsSheetRepository.findById(inBodyResultsSheet.getId()).get();
        // Disconnect from session so that the updates on updatedInBodyResultsSheet are not directly saved in db
        em.detach(updatedInBodyResultsSheet);
        updatedInBodyResultsSheet
            .userId(UPDATED_USER_ID)
            .datetimes(UPDATED_DATETIMES)
            .orderDate(UPDATED_ORDER_DATE)
            .inbodyImage(UPDATED_INBODY_IMAGE);

        restInBodyResultsSheetMockMvc.perform(put("/api/in-body-results-sheets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInBodyResultsSheet)))
            .andExpect(status().isOk());

        // Validate the InBodyResultsSheet in the database
        List<InBodyResultsSheet> inBodyResultsSheetList = inBodyResultsSheetRepository.findAll();
        assertThat(inBodyResultsSheetList).hasSize(databaseSizeBeforeUpdate);
        InBodyResultsSheet testInBodyResultsSheet = inBodyResultsSheetList.get(inBodyResultsSheetList.size() - 1);
        assertThat(testInBodyResultsSheet.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testInBodyResultsSheet.getDatetimes()).isEqualTo(UPDATED_DATETIMES);
        assertThat(testInBodyResultsSheet.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testInBodyResultsSheet.getInbodyImage()).isEqualTo(UPDATED_INBODY_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingInBodyResultsSheet() throws Exception {
        int databaseSizeBeforeUpdate = inBodyResultsSheetRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInBodyResultsSheetMockMvc.perform(put("/api/in-body-results-sheets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inBodyResultsSheet)))
            .andExpect(status().isBadRequest());

        // Validate the InBodyResultsSheet in the database
        List<InBodyResultsSheet> inBodyResultsSheetList = inBodyResultsSheetRepository.findAll();
        assertThat(inBodyResultsSheetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInBodyResultsSheet() throws Exception {
        // Initialize the database
        inBodyResultsSheetRepository.saveAndFlush(inBodyResultsSheet);

        int databaseSizeBeforeDelete = inBodyResultsSheetRepository.findAll().size();

        // Delete the inBodyResultsSheet
        restInBodyResultsSheetMockMvc.perform(delete("/api/in-body-results-sheets/{id}", inBodyResultsSheet.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InBodyResultsSheet> inBodyResultsSheetList = inBodyResultsSheetRepository.findAll();
        assertThat(inBodyResultsSheetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
