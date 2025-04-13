<script setup>

import RadialBarChart from "@/components/Charts/RadialBarChart.vue";
import DoubleBarChart from "@/components/Charts/DoubleBarChart.vue";
import GridCell from "@/components/GridCell.vue";
import useDashboard from "@/use/useDashboard.js";

const { data } = useDashboard();
</script>

<template>
  <!--  <div>-->
  <!--    <the-leaflet-map></the-leaflet-map>-->
  <!--  </div>-->
  <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
    <grid-cell link="/education-centers" label="Okuw merkezleri" :data-value="data.education_centers_count"
      icon-bg-class="bg-green-200 dark:bg-green-500/75">
      <svg class="w-6 stroke-green-500 dark:stroke-green-900" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_901_948)">
          <path
            d="M21 28V2C21 1.447 20.553 1 20 1H2C1.447 1 1 1.447 1 2V31H8V25H14V31H31V8C31 8 31 7 30 7H24M16 6V8M26 12V14M26 18V20M11 6V8M6 6V8M16 12V14M11 12V14M6 12V14M16 18V20M11 18V20M6 18V20"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_901_948">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </grid-cell>
    <grid-cell link="/nationalities" label="Milletler" :data-value="data.nationalities_count"
      icon-bg-class="bg-red-200 dark:bg-red-500/75">
      <svg class="w-6 h-8 stroke-red-500 dark:stroke-red-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </grid-cell>
    <grid-cell link="/students" label="Talyplar" :data-value="data.students_count"
      icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
      <svg class="w-6 h-8 stroke-sky-500 dark:stroke-sky-900" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </grid-cell>
    <grid-cell label="Gyzlar" :data-value="data.female_students_count" icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
      <svg class="w-6 h-8 stroke-sky-500 dark:stroke-sky-900" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </grid-cell>
    <grid-cell label="Oglanlar" :data-value="data.male_students_count" icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
      <svg class="w-6 h-8 stroke-sky-500 dark:stroke-sky-900" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </grid-cell>
  </div>
  <div class="mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">

    <double-bar-chart :admissions="data.admissions"></double-bar-chart>
    <radial-bar-chart :studentsCount="data.students_count" :femaleCount="data.female_students_count"
      :maleCount="data.male_students_count"></radial-bar-chart>
    <div class="space-y-6">
      <h2 class="my-8 text-2xl select-none">Okuwy tamamlaýanlar</h2>
      <grid-cell label="Gyzlar" :data-value="data.female_graduates" icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
        <svg class="w-6 h-8 stroke-sky-500 dark:stroke-sky-900" xmlns="http://www.w3.org/2000/svg" width="14"
          height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </grid-cell>
      <grid-cell label="Oglanlar" :data-value="data.male_graduates" icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
        <svg class="w-6 h-8 stroke-sky-500 dark:stroke-sky-900" xmlns="http://www.w3.org/2000/svg" width="14"
          height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </grid-cell>
    </div>

  </div>


</template>

<style scoped></style>
