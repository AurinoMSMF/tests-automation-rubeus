import Site from "../pages/site/index";

const newsletter_section = "#inyqq";

// Exceção não tratada impedia fluxo padrão de testes do cypress
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Teste do formulário de newsletter", () => {
  beforeEach(() => {
    // Arrange
    Site.visitPage();
  });

  context("Quando todos os dados estão preenchidos", () => {
    context("E todos os dados são válidos", () => {
      it("Deve realizar assinatura da newsletter com sucesso", () => {
        // Act
        Site.fillAllNewsletterFormFields();

        Site.submitNewsletterForm();

        Site.verifyNewsletterFormSubmissionRequest(
          "fully-filled-newsletter-form-fail",
        );

        // Assert
        Site.verifyNewsletterFormIsCleared();

        cy.screenshot("fully-filled-newsletter-form-success");
      });
    });

    context("E o campo Email é inválido", () => {
      it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
        // Act
        Site.fillAllNewsletterFormFields({ valid_email: false });

        // Assert
        Site.verifyButtonDisability();
        Site.verifyInvalidEmailAlert();

        cy.get(newsletter_section).screenshot(
          "fully-filled-invalid-email-newsletter-form-disabled-button",
        );
      });
    });

    context("E o campo Telefone é inválido", () => {
      context("Porque tem mais digitos do que permitido", () => {
        it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
          // Act
          Site.fillAllNewsletterFormFields({ phone_number_type: "shorter" });

          // Assert
          Site.verifyButtonDisability();
          Site.verifyInvalidPhoneNumberAlert();

          cy.get(newsletter_section).screenshot(
            "required-invalid-email-newsletter-form-disabled-button",
          );
        });
      });

      context("Porque tem menos digitos do que permitido", () => {
        it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
          // Act
          Site.fillAllNewsletterFormFields({ phone_number_type: "longer" });

          // Assert
          Site.verifyButtonDisability();
          Site.verifyInvalidPhoneNumberAlert();

          cy.get(newsletter_section).screenshot(
            "required-invalid-email-newsletter-form-disabled-button",
          );
        });
      });
    });
  });

  context("Quando somente os dados obrigatórios estão preenchidos", () => {
    context("E todos os dados são válidos", () => {
      it("Deve realizar assinatura da newsletter com sucesso", () => {
        // Act
        Site.fillRequiredFormFields();

        Site.submitNewsletterForm();

        Site.verifyNewsletterFormSubmissionRequest(
          "required-fields-filled-newsletter-form-fail",
        );

        // Assert
        Site.verifyNewsletterFormIsCleared();

        cy.screenshot("required-fields-filled-newsletter-form-success");
      });
    });

    context("E o campo Email é inválido", () => {
      it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
        // Act
        Site.fillRequiredFormFields({ valid_email: false });

        // Assert
        Site.verifyButtonDisability();
        Site.verifyInvalidEmailAlert();

        cy.get(newsletter_section).screenshot(
          "required-invalid-email-newsletter-form-disabled-button",
        );
      });
    });
  });

  context("Quando todos os campos do formulário estão vazios", () => {
    it("Deve ter o botão de submissão desabilitado e nenhuma requisição deve ser feita", () => {
      // Act
      // Assert
      Site.verifyButtonDisability();

      cy.get(newsletter_section).screenshot(
        "empty-newsletter-form-disabled-button",
      );
    });
  });

  context("Quando somente o campo de Nome está preenchido", () => {
    it("Deve impedir a submissão do formulário mantendo o botão desabilitado", () => {
      // Act
      Site.fillNameField();

      // Assert
      Site.verifyButtonDisability();

      cy.get(newsletter_section).screenshot(
        "name-filled-newsletter-form-disabled-button",
      );
    });
  });

  context("Quando somente o campo de Email está preenchido", () => {
    context("E o Email é válido", () => {
      it("Deve impedir a submissão do formulário mantendo o botão desabilitado", () => {
        // Act
        Site.fillValidEmail();

        // Assert
        Site.verifyButtonDisability();

        cy.get(newsletter_section).screenshot(
          "valid-email-filled-newsletter-form-disabled-button",
        );
      });
    });
    context("E o Email é inválido", () => {
      it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
        // Act
        Site.fillInvalidEmail();

        // Assert
        Site.verifyButtonDisability();

        cy.get(newsletter_section).screenshot(
          "invalid-email-filled-newsletter-form-disabled-button",
        );
      });
    });
  });
});
