import { useDashboardStore } from "@/stores/api.store";
import { useAuthStore } from "@/stores/auth.store.js";
import { storeToRefs } from "pinia";
import { useTranslation } from "i18next-vue";
import { useUxStore } from "@/stores/ux.store";

async function loginGuard(to, from, next) {
  const authStore = useAuthStore();
  const dashboardStore = useDashboardStore();
  const { isAuthenticated } = storeToRefs(authStore);

  const { t, i18next } = useTranslation();

  if (isAuthenticated.value) {
    dashboardStore.clearData();
    return next({ name: "workspace-view" });
  }

  while (!i18next.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  let title = to.meta.title || "";
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  return next();
}

async function anonGuard(to, from, next) {
  const { t, i18next } = useTranslation();

  while (!i18next.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  let titleMeta = to.meta.title || "";
  let title = t(titleMeta);
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  return next();
}

async function defaultGuard(to, from, next) {
  const { t, i18next } = useTranslation();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  if (!user.value) {
    await authStore.fetchUser();
  }

  while (!i18next.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  while (authStore.isLoading) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  let titleMeta = to.meta.title || "";
  let title = t(titleMeta);
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  return next();
}

async function authGuard(to, from, next) {
  const { t, i18next } = useTranslation();
  const authStore = useAuthStore();
  const uxStore = useUxStore();
  if (!authStore.user) {
    await authStore.fetchUser();
  }

  while (!i18next.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  while (authStore.isLoading) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  if (to.meta.adminRequired && authStore.role !== "root") {
    return uxStore.goToError("page-403");
  }

  if (to.meta.staffRequired && authStore.role === "root") {
    return uxStore.goToError("page-403");
  }

  let title = to.meta.title || "";
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  return next();
}

async function errorGuard(to, from, next) {
  const { t, i18next } = useTranslation();

  while (!i18next.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  let title = to.meta.title || "";
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  return next();
}

export default {
  loginGuard,
  authGuard,
  defaultGuard,
  anonGuard,
  errorGuard,
};
