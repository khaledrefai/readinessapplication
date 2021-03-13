package ae.gov.dubaipolice.readiness.web.rest;

import ae.gov.dubaipolice.readiness.domain.InBodyResultsSheet;
import ae.gov.dubaipolice.readiness.repository.InBodyResultsSheetRepository;
import ae.gov.dubaipolice.readiness.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ae.gov.dubaipolice.readiness.domain.InBodyResultsSheet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InBodyResultsSheetResource {

    private final Logger log = LoggerFactory.getLogger(InBodyResultsSheetResource.class);

    private static final String ENTITY_NAME = "inBodyResultsSheet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InBodyResultsSheetRepository inBodyResultsSheetRepository;

    public InBodyResultsSheetResource(InBodyResultsSheetRepository inBodyResultsSheetRepository) {
        this.inBodyResultsSheetRepository = inBodyResultsSheetRepository;
    }

    /**
     * {@code POST  /in-body-results-sheets} : Create a new inBodyResultsSheet.
     *
     * @param inBodyResultsSheet the inBodyResultsSheet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inBodyResultsSheet, or with status {@code 400 (Bad Request)} if the inBodyResultsSheet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/in-body-results-sheets")
    public ResponseEntity<InBodyResultsSheet> createInBodyResultsSheet(@RequestBody InBodyResultsSheet inBodyResultsSheet) throws URISyntaxException {
        log.debug("REST request to save InBodyResultsSheet : {}", inBodyResultsSheet);
        if (inBodyResultsSheet.getId() != null) {
            throw new BadRequestAlertException("A new inBodyResultsSheet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InBodyResultsSheet result = inBodyResultsSheetRepository.save(inBodyResultsSheet);
        return ResponseEntity.created(new URI("/api/in-body-results-sheets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /in-body-results-sheets} : Updates an existing inBodyResultsSheet.
     *
     * @param inBodyResultsSheet the inBodyResultsSheet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inBodyResultsSheet,
     * or with status {@code 400 (Bad Request)} if the inBodyResultsSheet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inBodyResultsSheet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/in-body-results-sheets")
    public ResponseEntity<InBodyResultsSheet> updateInBodyResultsSheet(@RequestBody InBodyResultsSheet inBodyResultsSheet) throws URISyntaxException {
        log.debug("REST request to update InBodyResultsSheet : {}", inBodyResultsSheet);
        if (inBodyResultsSheet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InBodyResultsSheet result = inBodyResultsSheetRepository.save(inBodyResultsSheet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, inBodyResultsSheet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /in-body-results-sheets} : get all the inBodyResultsSheets.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inBodyResultsSheets in body.
     */
    @GetMapping("/in-body-results-sheets")
    public ResponseEntity<List<InBodyResultsSheet>> getAllInBodyResultsSheets(Pageable pageable) {
        log.debug("REST request to get a page of InBodyResultsSheets");
        Page<InBodyResultsSheet> page = inBodyResultsSheetRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /in-body-results-sheets/:id} : get the "id" inBodyResultsSheet.
     *
     * @param id the id of the inBodyResultsSheet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inBodyResultsSheet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/in-body-results-sheets/{id}")
    public ResponseEntity<InBodyResultsSheet> getInBodyResultsSheet(@PathVariable Long id) {
        log.debug("REST request to get InBodyResultsSheet : {}", id);
        Optional<InBodyResultsSheet> inBodyResultsSheet = inBodyResultsSheetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inBodyResultsSheet);
    }

    /**
     * {@code DELETE  /in-body-results-sheets/:id} : delete the "id" inBodyResultsSheet.
     *
     * @param id the id of the inBodyResultsSheet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/in-body-results-sheets/{id}")
    public ResponseEntity<Void> deleteInBodyResultsSheet(@PathVariable Long id) {
        log.debug("REST request to delete InBodyResultsSheet : {}", id);
        inBodyResultsSheetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
