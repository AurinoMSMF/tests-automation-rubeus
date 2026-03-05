const newsletter_section = "#inyqq";
const newsletter_form = ".rbFormBox .rbFormContainer .rbFormEtapa";

const elements = {
  newsletter_section: newsletter_section,
  newsletter_form: newsletter_form,
  name_input: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form input[name="pessoa.nome"]`,
  email_input: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form input[name="pessoa.emailPrincipal"]`,
  invalid_email_alert: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form span.validationMessage`,
  phone_input: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form .iti input[name="pessoa.telefonePrincipal"]`,
  invalid_phone_number_alert: `${newsletter_form} .rbFormContent .rbPadding10 .rb-content-form.display-column-rb.col.s12 span.validationMessage`,
  submit_button: `${newsletter_form} .rbActionsFormContainer button#rbBtnNext.rbBtnNext`,
};

export default elements;
