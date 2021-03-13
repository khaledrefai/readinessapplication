package ae.gov.dubaipolice.readiness.web.rest;

import ae.gov.dubaipolice.readiness.domain.MemberData;
import ae.gov.dubaipolice.readiness.repository.MemberDataRepository;
import ae.gov.dubaipolice.readiness.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ae.gov.dubaipolice.readiness.domain.MemberData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MemberDataResource {

    private final Logger log = LoggerFactory.getLogger(MemberDataResource.class);

    private static final String ENTITY_NAME = "memberData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MemberDataRepository memberDataRepository;

    public MemberDataResource(MemberDataRepository memberDataRepository) {
        this.memberDataRepository = memberDataRepository;
    }

    /**
     * {@code POST  /member-data} : Create a new memberData.
     *
     * @param memberData the memberData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new memberData, or with status {@code 400 (Bad Request)} if the memberData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/member-data")
    public ResponseEntity<MemberData> createMemberData(@RequestBody MemberData memberData) throws URISyntaxException {
        log.debug("REST request to save MemberData : {}", memberData);
        if (memberData.getId() != null) {
            throw new BadRequestAlertException("A new memberData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MemberData result = memberDataRepository.save(memberData);
        return ResponseEntity.created(new URI("/api/member-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /member-data} : Updates an existing memberData.
     *
     * @param memberData the memberData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated memberData,
     * or with status {@code 400 (Bad Request)} if the memberData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the memberData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/member-data")
    public ResponseEntity<MemberData> updateMemberData(@RequestBody MemberData memberData) throws URISyntaxException {
        log.debug("REST request to update MemberData : {}", memberData);
        if (memberData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MemberData result = memberDataRepository.save(memberData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, memberData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /member-data} : get all the memberData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of memberData in body.
     */
    @GetMapping("/member-data")
    public List<MemberData> getAllMemberData() {
        log.debug("REST request to get all MemberData");
        return memberDataRepository.findAll();
    }

    /**
     * {@code GET  /member-data/:id} : get the "id" memberData.
     *
     * @param id the id of the memberData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the memberData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/member-data/{id}")
    public ResponseEntity<MemberData> getMemberData(@PathVariable Long id) {
        log.debug("REST request to get MemberData : {}", id);
        Optional<MemberData> memberData = memberDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(memberData);
    }

    /**
     * {@code DELETE  /member-data/:id} : delete the "id" memberData.
     *
     * @param id the id of the memberData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/member-data/{id}")
    public ResponseEntity<Void> deleteMemberData(@PathVariable Long id) {
        log.debug("REST request to delete MemberData : {}", id);
        memberDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
