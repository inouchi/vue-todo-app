import VueI18n from "vue-i18n";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

export const setupVeeValidation = (i18n: VueI18n): void => {
  extend("required", {
    ...required,
    message: (_, values) => i18n.t("validations.required", values).toString(),
  });
};
