<script setup>
import { storeToRefs } from "pinia";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { onMounted } from "vue";
import TheSpinner from "@/components/TheSpinner.vue";
import { useAchievementsStore } from "@/stores/api.store";
import AchievementsDataTable from "@/components/DataTables/AchievementsDataTable.vue";



const achievementsStore = useAchievementsStore();

const { achievements, dataTablePageCount } = storeToRefs(achievementsStore);

onMounted(() => {
  achievementsStore.isLoading = true;
  achievementsStore.getAll().then(() => {
    achievementsStore.isLoading = false;
  })
})


function updateData() {
  achievementsStore.isLoading = true;
  achievementsStore.getAll().then(() => {
    achievementsStore.isLoading = false;
  })
}

const breadcrumbPaths = [
  { name: "achievements", routeName: "achievements-list" },
  { name: "add", routeName: "add-achievement" },
]

</script>

<template>
  <div class="w-full">
    <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
    <div v-if="achievementsStore.isLoading"
      class="flex w-full h-[58vh] items-center justify-center dark:bg-[#112731] bg-white rounded-lg border border-gray-200 dark:border-0">
      <the-spinner class="w-24"></the-spinner>
    </div>
    <div v-else>
      <AchievementsDataTable :data="achievements" @update="updateData" :total-pages="dataTablePageCount" />
    </div>
  </div>
</template>

<style scoped></style>
