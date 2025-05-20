<script setup>

import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { useRoute } from "vue-router";
import TabBar from "@/components/Tabs/TabBar.vue";
import TabItem from "@/components/Tabs/TabItem.vue";
import TabContent from "@/components/Tabs/TabContent.vue";
import { onMounted, ref } from "vue";
import { useEducationCentersStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";

const route = useRoute();
const educationCentersStore = useEducationCentersStore();
const { aboutEducationCenter } = storeToRefs(educationCentersStore);

const breadcrumbPaths = [
  { path: "/high-schools", name: "Ýokary okuw mekdepleri" },
  { name: "Görmek", current: true },
]

const selectedTab = ref("desc");

onMounted(() => {
  educationCentersStore.isLoading = true;
  educationCentersStore.getAbout(route.params.id).then(() => {
    educationCentersStore.isLoading = false;
    console.log(aboutEducationCenter.value);
  })
})


</script>

<template>
  <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
  <!-- <div class="my-2 select-none" :class="{'opacity-0' : !highSchool.name }">
    {{ highSchool.name ? highSchool.name : "h" }}
  </div> -->
  <!-- <div class="flex md:flex-row flex-col mb-4 md:space-x-2 space-x-0">
    <router-link :to="`/high-schools/view/${route.params.id}`" v-slot="{ isExactActive }">
      <p class="text-[0.8rem] px-4 py-2 my-2 rounded-lg text-center select-none" :class="{'link-active': isExactActive,
         'link-inactive-primary': !isExactActive }">
        ÝOM barada</p>
    </router-link>
    <router-link :to="`/high-schools/view/${route.params.id}/faculties`" v-slot="{ isExactActive }">
      <p class="text-[0.8rem] px-4 py-2 my-2 rounded-lg text-center select-none" :class="{'link-active': isExactActive,
         'link-inactive-primary': !isExactActive }">
        Fakultetler</p>
    </router-link>
    <router-link :to="`/high-schools/view/${route.params.id}/departments`" v-slot="{ isExactActive }">
      <p class="text-[0.8rem] px-4 py-2 my-2 rounded-lg text-center select-none" :class="{'link-active': isExactActive,
         'link-inactive-primary': !isExactActive }">
        Kafedralar</p>
    </router-link>
    <router-link :to="`/high-schools/view/${route.params.id}/specializations`" v-slot="{ isExactActive }">
      <p class="text-[0.8rem] px-4 py-2 my-2 rounded-lg text-center select-none" :class="{'link-active': isExactActive,
         'link-inactive-primary': !isExactActive }">
        Hünarler</p>
    </router-link>
  </div> -->
  <div class="bg-mbg dark:bg-mdbg rounded-xl px-3 py-4">
    <tab-bar>
      <tab-item :is-active="selectedTab === 'desc'" @click="selectedTab = 'desc'">
        <span></span>{{ $t('mainInfo') }}
      </tab-item>
      <tab-item :is-active="selectedTab === 'ms'" @click="selectedTab = 'ms'">
        {{ $t('materialSupply') }}
      </tab-item>
    </tab-bar>
    <div class="p-4">
      <tab-content :is-active="selectedTab === 'desc'">
        <div class="grid grid-cols-2">
          <div>10</div>
          <div>20</div>
        </div>
      </tab-content>
      <tab-content :is-active="selectedTab === 'ms'">
        Bye
      </tab-content>
    </div>
  </div>
</template>

<style scoped></style>
