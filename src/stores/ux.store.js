import { useTranslation } from "i18next-vue";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUxStore = defineStore("ux", () => {
  const { i18next } = useTranslation();

  const language = ref("tk");
  const theme = ref(localStorage.getItem("theme") || "light");
  const sidebarExpand = ref(localStorage.getItem("sidebarExpanded") || "1");
  const sidebarHover = ref(false);
  const isLoading = ref(false);

  function changeLanguage(language) {
    i18next.changeLanguage(language);
    theme.value = language;
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

  const sidebarExpanded = computed(() => {
    return sidebarExpand.value === "1";
  });

  return {
    language,
    theme,
    sidebarExpand,
    sidebarExpanded,
    sidebarHover,
    isLoading,
    changeLanguage,
    toggleTheme,
    toggleSidebar,
    minimizeSidebar,
    expandSidebar,
    mouseLeaveSidebar,
    mouseOverSidebar,
  };
});
