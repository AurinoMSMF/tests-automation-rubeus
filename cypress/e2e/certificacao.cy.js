import Certificacao from "../pages/certificacao/index";

const registration_section = "#ipffg";

// Exceção não tratada impedia fluxo padrão de testes do cypress
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Teste do formulário de inscrição", () => {
  beforeEach(() => {
    // Arrange
    Certificacao.visitPage();
  });

  context("Quando todos os dados estão preenchidos", () => {
    context("E todos os dados são válidos", () => {
      it("Deve realizar a inscrição com sucesso", () => {
        // Act
        Certificacao.fillAllRegistrationFormFields();

        Certificacao.submitRegistrationForm();

        Certificacao.verifyRegistrationFormSubmissionRequest(
          "fully-filled-registration-form-fail",
        );

        // Assert
        Certificacao.verifyRegistrationFormIsCleared();

        cy.screenshot("fully-filled-registration-form-success");
      });
    });

    context("E o campo Email é inválido", () => {
      it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
        // Act
        Certificacao.fillAllRegistrationFormFields({ valid_email: false });

        // Assert
        Certificacao.verifyButtonDisability();
        Certificacao.verifyInvalidEmailAlert();

        cy.get(registration_section).screenshot(
          "fully-filled-invalid-email-registration-form-disabled-button",
        );
      });
    });

    context("E o campo Telefone é inválido", () => {
      context("Porque tem mais digitos do que permitido", () => {
        it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
          // Act
          Certificacao.fillAllRegistrationFormFields({
            phone_number_type: "shorter",
          });

          // Assert
          Certificacao.verifyButtonDisability();
          Certificacao.verifyInvalidPhoneNumberAlert();

          cy.get(registration_section).screenshot(
            "required-invalid-email-registration-form-disabled-button",
          );
        });
      });

      context("Porque tem menos digitos do que permitido", () => {
        it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
          // Act
          Certificacao.fillAllRegistrationFormFields({
            phone_number_type: "longer",
          });

          // Assert
          Certificacao.verifyButtonDisability();
          Certificacao.verifyInvalidPhoneNumberAlert();

          cy.get(registration_section).screenshot(
            "required-invalid-email-registration-form-disabled-button",
          );
        });
      });
    });
  });

  context("Quando somente os dados obrigatórios estão preenchidos", () => {
    context("E todos os dados são válidos", () => {
      it("Deve realizar assinatura da registration com sucesso", () => {
        // Act
        Certificacao.fillRequiredFormFields();

        Certificacao.submitRegistrationForm();

        Certificacao.verifyRegistrationFormSubmissionRequest(
          "required-fields-filled-registration-form-fail",
        );

        // Assert
        Certificacao.verifyRegistrationFormIsCleared();

        cy.screenshot("required-fields-filled-registration-form-success");
      });
    });

    context("E o campo Email é inválido", () => {
      it("Deve impedir a submissão do formulário mantendo o botão desabilitado e um aviso deve surgir para alertar sobre o campo", () => {
        // Act
        Certificacao.fillRequiredFormFields({ valid_email: false });

        // Assert
        Certificacao.verifyButtonDisability();
        Certificacao.verifyInvalidEmailAlert();

        cy.get(registration_section).screenshot(
          "required-invalid-email-registration-form-disabled-button",
        );
      });
    });
  });
});
