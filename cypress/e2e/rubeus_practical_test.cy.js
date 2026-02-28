const newsletter_section = "#inyqq"
const newsletter_form =  ".rbFormBox .rbFormContainer .rbFormEtapa";

const selectors = {
  name_input: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form input[name="pessoa.nome"]`,
  email_input: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form input[name="pessoa.emailPrincipal"]`,
  phone_input: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form .iti input[name="pessoa.telefonePrincipal"]`,
  submit_button: `${newsletter_form} .rbActionsFormContainer button#rbBtnNext.rbBtnNext`
}

// Exceção não tratada impedia fluxo padrão de testes do cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})

const success_status_codes = [200, 201];

describe('Teste do formulário de newsletter', () => {
  context('Quando todos os dados estão preenchidos e são válidos', () => {
    it('Deve realizar assinatura da newsletter com sucesso', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.get(selectors.name_input).type("Joe Doe");
      cy.get(selectors.email_input).type("valid@email.com");
      cy.get(selectors.phone_input).type("82922223333");

      cy.intercept("PATCH","/api/v2/sendData").as("newsletterSubscription");
      
      cy.get(selectors.submit_button).click();

      cy.wait("@newsletterSubscription").then((interception) => {
        if (!success_status_codes.includes(interception.response.statusCode)) {
          cy.screenshot("fully-filled-newsletter-form-fail").then(() => {
            throw new Error(`Falha na assinatura da newsletter: status ${interception.response.statusCode} - ${interception.response.statusMessage}`);
          });
        }
      });
      
      // Assert
      cy.get(selectors.name_input).should("have.value", "");
      cy.get(selectors.email_input).should("have.value", "");
      cy.get(selectors.phone_input).should("have.value", "");
      cy.get(selectors.submit_button).should("be.disabled");

      cy.screenshot("fully-filled-newsletter-form-success");
    })
  });

  context('Quando somente os dados obrigatórios estão preenchidos e são válidos', () => {
    it('Deve realizar assinatura da newsletter com sucesso', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.get(selectors.name_input).type("Joe Doe");
      cy.get(selectors.email_input).type("valid@email.com");

      cy.intercept("PATCH","/api/v2/sendData").as("newsletterSubscription");
      
      cy.get(selectors.submit_button).click();

      cy.wait("@newsletterSubscription").then((interception) => {
        if (!success_status_codes.includes(interception.response.statusCode)) {
          cy.screenshot("required-fields-filled-newsletter-form-fail").then(() => {
            throw new Error(`Falha na assinatura da newsletter: status ${interception.response.statusCode} - ${interception.response.statusMessage}`);
          });
        }
      });
      
      // Assert
      cy.get(selectors.name_input).should("have.value", "");
      cy.get(selectors.email_input).should("have.value", "");
      cy.get(selectors.phone_input).should("have.value", "");
      cy.get(selectors.submit_button).should("be.disabled");

      cy.screenshot("required-fields-filled-newsletter-form-success");
    })
  });

  context('Quando somente os dados obrigatórios estão preenchidos e o campo Email é inválido', () => {
    it('Deve ter o botão de submissão desabilitado e nenhuma requisição deve ser feita', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.get(selectors.name_input).type("Joe Doe");
      cy.get(selectors.email_input).type("invalid@email.com2");

      cy.intercept("PATCH","/api/v2/sendData").as("newsletterSubscription");
      
      // Assert
      cy.get(selectors.submit_button).should("be.disabled");
      cy.get("@newsletterSubscription.all").should("have.length", 0);

      cy.get(newsletter_section).screenshot("required-invalid-email-newsletter-form-disabled-button");
    })
  });

  context('Quando somente os dados obrigatórios estão preenchidos e o campo Telefone é inválido', () => {
    it('Deve ter o botão de submissão desabilitado e nenhuma requisição deve ser feita', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.get(selectors.name_input).type("Joe Doe");
      cy.get(selectors.email_input).type("invalid@email.com2");

      cy.intercept("PATCH","/api/v2/sendData").as("newsletterSubscription");
      
      // Assert
      cy.get(selectors.submit_button).should("be.disabled");
      cy.get("@newsletterSubscription.all").should("have.length", 0);

      cy.get(newsletter_section).screenshot("required-invalid-email-newsletter-form-disabled-button");
    })
  });

  context('Quando todos os campos do formulário estão vazios', () => {
    it('Deve ter o botão de submissão desabilitado e nenhuma requisição deve ser feita', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.intercept("PATCH", "/api/v2/sendData").as("newsletterSubscription");

      // Assert
      cy.get(selectors.submit_button).should("be.disabled");
      cy.get("@newsletterSubscription.all").should("have.length", 0);

      cy.get(newsletter_section).screenshot("empty-newsletter-form-disabled-button");
    })
  });

  context('Quando somente o campo de Nome está preenchido', () => {
    it('Deve ter o botão de submissão desabilitado e nenhuma requisição deve ser feita', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.get(selectors.name_input).type("Joe Doe");

      cy.intercept("PATCH", "/api/v2/sendData").as("newsletterSubscription");

      // Assert
      cy.get(selectors.submit_button).should("be.disabled");
      cy.get("@newsletterSubscription.all").should("have.length", 0);

      cy.get(newsletter_section).screenshot("name-filled-newsletter-form-disabled-button");
    })
  });
  
  context('Quando somente o campo de Email está preenchido e é válido', () => {
    it('Deve ter o botão de submissão desabilitado e nenhuma requisição deve ser feita', () => {
      // Arrange
      cy.visit('/site');

      // Act
      cy.get(selectors.email_input).type("valid@email.com");

      cy.intercept("PATCH", "/api/v2/sendData").as("newsletterSubscription");

      // Assert
      cy.get(selectors.submit_button).should("be.disabled");
      cy.get("@newsletterSubscription.all").should("have.length", 0);

      cy.get(newsletter_section).screenshot("valid-email-filled-newsletter-form-disabled-button");
    })
  });

})