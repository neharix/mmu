import "./assets/css/fonts.css";
import "./assets/css/tailwind.css";
import "./assets/css/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import I18NextVue, { TranslationComponent } from "i18next-vue";
import i18next from "i18next";
import locales from "./locales/init";

i18next.init({
  lng: "tk",
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: false,
  resources: {
    tk: { translation: locales.tk },
    en: { translation: locales.en },
    ru: { translation: locales.ru },
  },
});

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(I18NextVue, { i18next });
app.use(VueApexCharts);

app.mount("#app");
