<script setup>

import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { useRoute } from "vue-router";
import TabBar from "@/components/Tabs/TabBar.vue";
import TabItem from "@/components/Tabs/TabItem.vue";
import TabContent from "@/components/Tabs/TabContent.vue";
import { onMounted, ref, watch } from "vue";
import { useEducationCentersStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";
import TheSpinner from "@/components/TheSpinner.vue";
import EducationCenterFilesDataTable from "@/components/DataTables/EducationCenterFilesDataTable.vue";
import EducationCenterStaffDataTable from "@/components/DataTables/EducationCenterStaffDataTable.vue";
import router from "@/router";

const route = useRoute();
const educationCentersStore = useEducationCentersStore();
const { aboutEducationCenter, educationCenterFiles, educationCenterStaff, dataTablePageCount } = storeToRefs(educationCentersStore);

const breadcrumbPaths = [
  { name: "educationCenters", routeName: "education-centers-list" },
  { name: "view", routeName: "about-education-center" },
]

const selectedTab = ref(sessionStorage.getItem("aboutEducationCenterSelectedTab") || "desc");

onMounted(async () => {
  educationCentersStore.isLoading = true;
  await educationCentersStore.getAbout(route.params.id, true);
  await educationCentersStore.getFiles(route.params.id, true);
  await educationCentersStore.getStaff(route.params.id, true);

  educationCentersStore.isLoading = false;

})


function selectTab(tabName) {
  selectedTab.value = tabName;
  sessionStorage.setItem("aboutEducationCenterSelectedTab", selectedTab.value);
}

function updateFiles(){
  educationCentersStore.isLoading = true;
  educationCentersStore.getFiles(route.params.id).then(()=>{
    educationCentersStore.isLoading = false;
  });
}

function updateStaff(){
  educationCentersStore.isLoading = true;
  educationCentersStore.getStaff(route.params.id).then(()=>{
    educationCentersStore.isLoading = false;
  });
}

watch(selectedTab, (newVal, oldVal) => {
  if (oldVal === "fl") {
    router.push({name: route.name, query: {}})
  }
})

watch(selectedTab, (newVal, oldVal) => {
  if (oldVal === "wr") {
    router.push({name: route.name, query: {}})
  }
})


</script>

<template>
  <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
  <div class="bg-mbg dark:bg-mdbg rounded-xl shadow-md px-3 py-4">
    <tab-bar>
      <tab-item :is-active="selectedTab === 'desc'" @click="selectTab('desc')">
        {{ $t('mainInfo') }}
      </tab-item>
      <tab-item :is-active="selectedTab === 'ms'" @click="selectTab('ms')">
        {{ $t('materialSupply') }}
      </tab-item>
      <tab-item :is-active="selectedTab === 'wr'" @click="selectTab('wr')">
        {{ $t('workers') }}
      </tab-item>
      <tab-item :is-active="selectedTab === 'st'" @click="selectTab('st')">
        {{ $t('students') }}
      </tab-item>
      <tab-item :is-active="selectedTab === 'fl'" @click="selectTab('fl')">
        {{ $t('filesArchive') }}
      </tab-item>
    </tab-bar>
    <div v-if="educationCentersStore.isLoading"
      class="flex w-full h-[58vh] items-center justify-center dark:bg-[#112731] bg-white rounded-lg border border-gray-200 dark:border-0">
      <the-spinner class="w-24"></the-spinner>
    </div>
    <div class="p-4" v-else>
      <tab-content :is-active="selectedTab === 'desc'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('name') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.name }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('phoneNumber') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.phone_number }}</div>
            </div>
          </div>
        </div>
        <div>
          <h4 class="text-lg select-none ml-2">{{ $t('location') }}:</h4>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('country') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.country }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('region') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.region }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('address') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.address }}</div>
            </div>
          </div>
        </div>
        <div>
          <h4 class="text-lg select-none ml-2">{{ $t('coordinates') }}:</h4>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('lat') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.lat }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('lng') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.lng }}</div>
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content :is-active="selectedTab === 'ms'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('buildingsCount') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.buildings_count }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('roomsCount') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.rooms_count }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('capacityP') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.capacity }}</div>
            </div>
          </div>
          <div
            class="dark:bg-emerald-900/50 bg-gray-100 inset-shadow-2xs shadow-inner rounded-lg flex justify-between items-center p-4">
            <div>
              <div class="text-sm my-2 select-none">{{ $t('booksCount') }}</div>
              <div class="font-bold mt-2 text-lg select-none">{{ aboutEducationCenter.books_count }}</div>
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content :is-active="selectedTab === 'wr'">
        <EducationCenterStaffDataTable :data="educationCenterStaff" :total-pages="dataTablePageCount" @update="updateStaff"/>
      </tab-content>
      <tab-content :is-active="selectedTab === 'st'">

      </tab-content>
      <tab-content :is-active="selectedTab === 'fl'">
        <EducationCenterFilesDataTable :data="educationCenterFiles" :total-pages="dataTablePageCount" @update="updateFiles"/>
      </tab-content>
    </div>
  </div>
</template>

<style scoped></style>
