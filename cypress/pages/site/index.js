import elements from "./elements";

class Site {
  visitPage() {
    cy.visit("/site");
  }

  getValidEmail() {
    return "valid@email.com";
  }

  getInvalidEmail() {
    return "invalid@email.com2";
  }

  fillValidEmail() {
    cy.get(elements.email_input).type(this.getValidEmail());
  }

  fillInvalidEmail() {
    cy.get(elements.email_input).type(this.getInvalidEmail());
  }

  getValidPhoneNumber() {
    return "82922223333";
  }

  fillValidPhoneNumber() {
    cy.get(elements.phone_input).type(this.getValidPhoneNumber());
  }

  getInvalidPhoneNumber(type) {
    if (type == "shorter") return "821111333";
    if (type == "longer") return "821111444445";
  }

  fillInvalidPhoneNumber(type) {
    cy.get(elements.phone_input).type(this.getInvalidPhoneNumber(type));
  }

  fillNameField() {
    cy.get(elements.name_input).type("Joe Doe");
  }

  fillAllNewsletterFormFields({
    valid_email = true,
    phone_number_type = "valid",
  } = {}) {
    this.fillNameField();
    valid_email ? this.fillValidEmail() : this.fillInvalidEmail();
    switch (phone_number_type) {
      case "valid":
        this.fillValidPhoneNumber();
        break;
      case "shorter":
        this.fillInvalidPhoneNumber("shorter");
        break;
      case "longer":
        this.fillInvalidPhoneNumber("longer");
    }
  }

  fillRequiredFormFields({ valid_email = true } = {}) {
    this.fillNameField();
    valid_email ? this.fillValidEmail() : this.fillInvalidEmail();
  }

  submitNewsletterForm() {
    cy.intercept("PATCH", "/api/v2/sendData").as("newsletterSubscription");

    cy.get(elements.submit_button).click();
  }

  verifyNewsletterFormSubmissionRequest(screenshot_name) {
    const expected_success_status_codes = [200, 201];
    cy.wait("@newsletterSubscription").then((interception) => {
      if (
        !expected_success_status_codes.includes(
          interception.response.statusCode,
        )
      ) {
        cy.screenshot(screenshot_name).then(() => {
          throw new Error(
            `Falha na assinatura da newsletter: status ${interception.response.statusCode} - ${interception.response.statusMessage}`,
          );
        });
      }
    });
  }

  verifyNewsletterFormIsCleared() {
    cy.get(elements.name_input).should("have.value", "");
    cy.get(elements.email_input).should("have.value", "");
    cy.get(elements.phone_input).should("have.value", "");
    cy.get(elements.submit_button).should("be.disabled");
  }

  verifyButtonDisability() {
    cy.get(elements.submit_button).should("be.disabled");
  }

  verifyInvalidEmailAlert() {
    cy.get(elements.invalid_email_alert);
  }

  verifyInvalidPhoneNumberAlert() {
    cy.get(elements.invalid_phone_number_alert);
  }
}

export default new Site();
