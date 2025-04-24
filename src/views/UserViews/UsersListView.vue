<script setup>
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import TheSpinner from "@/components/TheSpinner.vue";
import { useUsersStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import UsersDataTable from "@/components/DataTables/UsersDataTable.vue";
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

onMounted(() => {
  usersStore.isLoading = true;
  usersStore.getAll().then(() => {
    usersStore.isLoading = false;
  })
})

// const authStore = useAuthStore()
// const nationalizationsStore = useNationalizationsStore()
// const { nationalizationsAdditional } = storeToRefs(nationalizationsStore);
// const { user } = storeToRefs(authStore);
// const uxStore = useUxStore();

// onMounted(() => {
//   uxStore.isLoading = true;
//   nationalizationsStore.getAllAdditional().then(() => {
//     uxStore.isLoading = false;
//   })
// })


const breadcrumbPaths = [
  { routeName: "users-list", name: "users" },
  { routeName: "add-user", name: "add" },
]

</script>

<template>
  <div class="w-full">
    <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
    <div v-if="usersStore.isLoading"
      class="flex w-full h-[58vh] items-center justify-center dark:bg-[#112731] bg-white rounded-lg border border-gray-200 dark:border-0">
      <the-spinner class="w-24"></the-spinner>
    </div>
    <div v-else>
      <users-data-table :data="users" @update="usersStore.getAll()"></users-data-table>
    </div>
  </div>
</template>

<style scoped></style>
