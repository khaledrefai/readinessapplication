package ae.gov.dubaipolice.readiness.web.rest;

import ae.gov.dubaipolice.readiness.ReadinessapplicationApp;
import ae.gov.dubaipolice.readiness.domain.InbodyData;
import ae.gov.dubaipolice.readiness.repository.InbodyDataRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InbodyDataResource} REST controller.
 */
@SpringBootTest(classes = ReadinessapplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InbodyDataResourceIT {

    private static final Integer DEFAULT_USER_ID = 1;
    private static final Integer UPDATED_USER_ID = 2;

    private static final String DEFAULT_COLUMN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COLUMN_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_VALUE = "BBBBBBBBBB";

    @Autowired
    private InbodyDataRepository inbodyDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInbodyDataMockMvc;

    private InbodyData inbodyData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InbodyData createEntity(EntityManager em) {
        InbodyData inbodyData = new InbodyData()
            .userID(DEFAULT_USER_ID)
            .columnName(DEFAULT_COLUMN_NAME)
            .columnValue(DEFAULT_COLUMN_VALUE);
        return inbodyData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InbodyData createUpdatedEntity(EntityManager em) {
        InbodyData inbodyData = new InbodyData()
            .userID(UPDATED_USER_ID)
            .columnName(UPDATED_COLUMN_NAME)
            .columnValue(UPDATED_COLUMN_VALUE);
        return inbodyData;
    }

    @BeforeEach
    public void initTest() {
        inbodyData = createEntity(em);
    }

    @Test
    @Transactional
    public void createInbodyData() throws Exception {
        int databaseSizeBeforeCreate = inbodyDataRepository.findAll().size();
        // Create the InbodyData
        restInbodyDataMockMvc.perform(post("/api/inbody-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inbodyData)))
            .andExpect(status().isCreated());

        // Validate the InbodyData in the database
        List<InbodyData> inbodyDataList = inbodyDataRepository.findAll();
        assertThat(inbodyDataList).hasSize(databaseSizeBeforeCreate + 1);
        InbodyData testInbodyData = inbodyDataList.get(inbodyDataList.size() - 1);
        assertThat(testInbodyData.getUserID()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testInbodyData.getColumnName()).isEqualTo(DEFAULT_COLUMN_NAME);
        assertThat(testInbodyData.getColumnValue()).isEqualTo(DEFAULT_COLUMN_VALUE);
    }

    @Test
    @Transactional
    public void createInbodyDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inbodyDataRepository.findAll().size();

        // Create the InbodyData with an existing ID
        inbodyData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInbodyDataMockMvc.perform(post("/api/inbody-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inbodyData)))
            .andExpect(status().isBadRequest());

        // Validate the InbodyData in the database
        List<InbodyData> inbodyDataList = inbodyDataRepository.findAll();
        assertThat(inbodyDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInbodyData() throws Exception {
        // Initialize the database
        inbodyDataRepository.saveAndFlush(inbodyData);

        // Get all the inbodyDataList
        restInbodyDataMockMvc.perform(get("/api/inbody-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inbodyData.getId().intValue())))
            .andExpect(jsonPath("$.[*].userID").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].columnName").value(hasItem(DEFAULT_COLUMN_NAME)))
            .andExpect(jsonPath("$.[*].columnValue").value(hasItem(DEFAULT_COLUMN_VALUE)));
    }
    
    @Test
    @Transactional
    public void getInbodyData() throws Exception {
        // Initialize the database
        inbodyDataRepository.saveAndFlush(inbodyData);

        // Get the inbodyData
        restInbodyDataMockMvc.perform(get("/api/inbody-data/{id}", inbodyData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inbodyData.getId().intValue()))
            .andExpect(jsonPath("$.userID").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.columnName").value(DEFAULT_COLUMN_NAME))
            .andExpect(jsonPath("$.columnValue").value(DEFAULT_COLUMN_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingInbodyData() throws Exception {
        // Get the inbodyData
        restInbodyDataMockMvc.perform(get("/api/inbody-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInbodyData() throws Exception {
        // Initialize the database
        inbodyDataRepository.saveAndFlush(inbodyData);

        int databaseSizeBeforeUpdate = inbodyDataRepository.findAll().size();

        // Update the inbodyData
        InbodyData updatedInbodyData = inbodyDataRepository.findById(inbodyData.getId()).get();
        // Disconnect from session so that the updates on updatedInbodyData are not directly saved in db
        em.detach(updatedInbodyData);
        updatedInbodyData
            .userID(UPDATED_USER_ID)
            .columnName(UPDATED_COLUMN_NAME)
            .columnValue(UPDATED_COLUMN_VALUE);

        restInbodyDataMockMvc.perform(put("/api/inbody-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInbodyData)))
            .andExpect(status().isOk());

        // Validate the InbodyData in the database
        List<InbodyData> inbodyDataList = inbodyDataRepository.findAll();
        assertThat(inbodyDataList).hasSize(databaseSizeBeforeUpdate);
        InbodyData testInbodyData = inbodyDataList.get(inbodyDataList.size() - 1);
        assertThat(testInbodyData.getUserID()).isEqualTo(UPDATED_USER_ID);
        assertThat(testInbodyData.getColumnName()).isEqualTo(UPDATED_COLUMN_NAME);
        assertThat(testInbodyData.getColumnValue()).isEqualTo(UPDATED_COLUMN_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingInbodyData() throws Exception {
        int databaseSizeBeforeUpdate = inbodyDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInbodyDataMockMvc.perform(put("/api/inbody-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inbodyData)))
            .andExpect(status().isBadRequest());

        // Validate the InbodyData in the database
        List<InbodyData> inbodyDataList = inbodyDataRepository.findAll();
        assertThat(inbodyDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInbodyData() throws Exception {
        // Initialize the database
        inbodyDataRepository.saveAndFlush(inbodyData);

        int databaseSizeBeforeDelete = inbodyDataRepository.findAll().size();

        // Delete the inbodyData
        restInbodyDataMockMvc.perform(delete("/api/inbody-data/{id}", inbodyData.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InbodyData> inbodyDataList = inbodyDataRepository.findAll();
        assertThat(inbodyDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
