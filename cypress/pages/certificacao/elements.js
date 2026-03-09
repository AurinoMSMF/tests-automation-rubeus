const registration_section = "#ipffg";
const registration_form = ".rbFormBox .rbFormContainer .rbFormEtapa";

const elements = {
  registration_section: registration_section,
  registration_form: registration_form,
  name_input: `${registration_section} .rbFormContent .rbPadding10 .rb-content-form input[name="pessoa.nome"]`,
  email_input: `${registration_section} .rbFormContent .rbPadding10 .rb-content-form input[name="pessoa.emailPrincipal"]`,
  invalid_email_alert: `${registration_section} .rbFormContent .rbPadding10 .rb-content-form span.validationMessage`,
  phone_input: `${registration_section} .rbFormContent .rbPadding10 .rb-content-form .iti input[name="pessoa.telefonePrincipal"]`,
  invalid_phone_number_alert: `${registration_section} .rbFormContent .rbPadding10 .rb-content-form.display-column-rb.col.s12 span.validationMessage`,
  submit_button: `${registration_section} .rbActionsFormContainer button#rbBtnNext.rbBtnNext`,
};

export default elements;
