import { useFilterStore } from "@/stores/api.store";
import { useAuthStore } from "@/stores/auth.store.js";
import { storeToRefs } from "pinia";
import { useTranslation } from "i18next-vue";

async function loginGuard(to, from, next) {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (isAuthenticated.value) {
    router.push("/");
  }
  const { t, i18next } = useTranslation();

  let title = to.meta.title || "";
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
    return next("/403");
  }

  if (to.meta.staffRequired && authStore.role === "root") {
    return next("/403");
  }

  let title = to.meta.title || "";
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  return next();
}

async function filterGuard(to, from, next) {
  const { t, i18next } = useTranslation();

  let title = to.meta.title || "";
  document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

  const authStore = useAuthStore();
  await authStore.fetchUser();

  const filterStore = useFilterStore();

  while (!i18next.isInitialized) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  while (authStore.isLoading) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  if (to.meta.adminRequired && authStore.role !== "root") {
    return next("/403");
  }

  if (to.meta.staffRequired && authStore.role === "root") {
    return next("/403");
  }

  await filterStore.get();

  while (filterStore.isLoading) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return next();
}

export default { loginGuard, authGuard, defaultGuard, filterGuard };
