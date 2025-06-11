import router from "@/router";
import { useTranslation } from "i18next-vue";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export const useUxStore = defineStore("ux", () => {
  const { i18next, t } = useTranslation();
  const route = useRoute();

  const language = ref("tk");
  const theme = ref(localStorage.getItem("theme") || "light");
  const sidebarExpand = ref(localStorage.getItem("sidebarExpanded") || "1");
  const sidebarHover = ref(false);
  const isLoading = ref(false);
  const errorPageStatus = ref(null);
  const toasts = ref([]);

  const isDark = computed(() => {
    return theme.value === "dark";
  });

  function changeLanguage(lng) {
    i18next.changeLanguage(lng);
    language.value = lng;
    let title = route.meta.title || "";
    document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

    localStorage.setItem("language", language.value);
  }

  function toggleTheme() {
    const html = document.documentElement;
    const prevTheme = html.classList.contains("dark") ? "dark" : "light";
    html.classList.remove(prevTheme);
    html.classList.add(prevTheme === "dark" ? "light" : "dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
    theme.value = localStorage.getItem("theme");

    html.classList.add(theme.value);
    html.classList.remove(theme.value === "dark" ? "light" : "dark");
  }
  function toggleSidebar() {
    sidebarExpand.value = sidebarExpand.value === "1" ? "0" : "1";
    localStorage.setItem(
      "sidebarExpanded",
      String(Number(sidebarExpand.value))
    );
  }
  function minimizeSidebar() {
    sidebarExpand.value = "0";
    localStorage.setItem(
      "sidebarExpanded",
      String(Number(sidebarExpand.value))
    );
  }
  function expandSidebar() {
    sidebarExpand.value = "1";
    localStorage.setItem(
      "sidebarExpanded",
      String(Number(sidebarExpand.value))
    );
  }
  function mouseOverSidebar() {
    sidebarHover.value = true;
  }
  function mouseLeaveSidebar() {
    sidebarHover.value = false;
  }

  function goToError(errorPage) {
    errorPageStatus.value = errorPage;
    router.push({ name: errorPage });
  }

  const sidebarExpanded = computed(() => {
    return sidebarExpand.value === "1";
  });

  function addToast(message, _type) {
    const id = toasts.value.length;
    toasts.value.push({ id, message, _type });
    setTimeout(() => {
      try {
        toasts.value.splice(
          toasts.value[
            toasts.value.indexOf(toasts.value.find((obj) => obj.id === id))
          ],
          1
        );
      } catch (e) {
        console.warn(e);
      }
    }, 5000);
  }
  function deleteToast(id) {
    toasts.value.splice(
      toasts.value[
        toasts.value.indexOf(toasts.value.find((obj) => obj.id === id))
      ],
      1
    );
  }

  return {
    language,
    theme,
    sidebarExpand,
    sidebarExpanded,
    sidebarHover,
    isLoading,
    isDark,
    errorPageStatus,
    toasts,
    changeLanguage,
    toggleTheme,
    toggleSidebar,
    minimizeSidebar,
    expandSidebar,
    mouseLeaveSidebar,
    mouseOverSidebar,
    goToError,
    addToast,
    deleteToast,
  };
});
