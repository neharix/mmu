<script setup>
import { storeToRefs } from "pinia";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { onMounted } from "vue";
import TheSpinner from "@/components/TheSpinner.vue";
import { useSpecializationsStore } from "@/stores/api.store";
import SpecializationsDataTable from "@/components/DataTables/SpecializationsDataTable.vue";



const specializationsStore = useSpecializationsStore();

const { specializations, dataTablePageCount } = storeToRefs(specializationsStore);

onMounted(() => {
  specializationsStore.isLoading = true;
  specializationsStore.getAll().then(() => {
    specializationsStore.isLoading = false;
  })
})


function updateData() {
  specializationsStore.isLoading = true;
  specializationsStore.getAll().then(() => {
    specializationsStore.isLoading = false;
  })
}

const breadcrumbPaths = [
  { name: "specializations", routeName: "specializations-list" },
  { name: "add", routeName: "add-specialization" },
]

</script>

<template>
  <div class="w-full">
    <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
    <div v-if="specializationsStore.isLoading"
      class="flex w-full h-[58vh] items-center justify-center dark:bg-[#112731] bg-white rounded-lg border border-gray-200 dark:border-0">
      <the-spinner class="w-24"></the-spinner>
    </div>
    <div v-else>
      <SpecializationsDataTable :data="specializations" @update="updateData" :total-pages="dataTablePageCount" />
    </div>
  </div>
</template>

<style scoped></style>
