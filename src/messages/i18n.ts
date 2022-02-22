import VueI18n from "vue-i18n";
import { messages } from "@/messages/message";

export const createI18n = (locale?: string): VueI18n => {
  return new VueI18n({
    locale: locale ?? "ja",
    messages: messages,
  });
};
