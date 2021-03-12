package ae.gov.dubaipolice.readiness;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ae.gov.dubaipolice.readiness");

        noClasses()
            .that()
            .resideInAnyPackage("ae.gov.dubaipolice.readiness.service..")
            .or()
            .resideInAnyPackage("ae.gov.dubaipolice.readiness.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..ae.gov.dubaipolice.readiness.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
