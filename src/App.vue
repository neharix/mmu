<template>
  <component :is="layout"></component>
</template>

<script setup>
import { defineAsyncComponent, onBeforeMount, onMounted, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import LoaderLayout from "@/layouts/LoaderLayout.vue";
import { useAuthStore } from "@/stores/auth.store.js";
import router from "@/router/index.js";
import { useTranslation } from "i18next-vue";
import axiosInstance from "./api/axiosInstance";

const layout = shallowRef(LoaderLayout)
const layoutName = ref('LoaderLayout');

const { i18next } = useTranslation();

i18next.on('languageChanged', (lng) => {
  console.log(lng);
  axiosInstance.defaults.headers["Accept-Language"] = lng;
  console.log(axiosInstance.defaults.headers["Accept-Language"]);
})

const route = useRoute();
watch(route, (newValue, oldValue) => {
  if (newValue.meta.layout !== layoutName.value) {
    layoutName.value = newValue.meta.layout ?? 'LoaderLayout';

    layout.value = defineAsyncComponent(
      () =>
        import(`@/layouts/${layoutName.value}.vue`)
    );
  }
});

const authStore = useAuthStore();

onBeforeMount(() => {
  if (!localStorage.getItem("sidebarExpanded")) {
    localStorage.setItem("sidebarExpanded", "1");
  }
})

onMounted(() => {
  if (route.meta.adminRequired || route.meta.staffRequired || route.meta.authRequired) {
    if (authStore.token) {
      if (!authStore.user) {
        authStore.fetchUser();
      }
    } else {
      router.push("/login");
    }
  }
});

</script>

<style scoped></style>
