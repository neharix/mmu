import "./assets/css/fonts.css";
import "./assets/css/tailwind.css";
import "./assets/css/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import I18NextVue from "i18next-vue";
import i18next from "i18next";
import locales from "./locales/init";

let language = localStorage.getItem("language") || "tk";
i18next
  .init({
    lng: language,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: false,
    resources: {
      tk: { translation: locales.tk },
      en: { translation: locales.en },
      ru: { translation: locales.ru },
    },
  })
  .then(() => {
    localStorage.setItem("language", language);
  });

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(I18NextVue, { i18next });
app.use(router);
app.use(VueApexCharts);

app.mount("#app");
