<script setup>

import RadialBarChart from "@/components/Charts/RadialBarChart.vue";
import DoubleBarChart from "@/components/Charts/DoubleBarChart.vue";
import GridCell from "@/components/GridCell.vue";
import useDashboard from "@/use/useDashboard.js";

const { data } = useDashboard();
</script>

<template>
  <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
    <grid-cell link="/workspace/education-centers" :label="$t('educationCenters')"
      :data-value="data.education_centers_count" icon-bg-class="bg-green-200 dark:bg-green-500/75">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Zm0-10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4m-4 4h4m-4 4h4m-4 4h4">
        </path>
      </svg>
    </grid-cell>
    <grid-cell link="/workspace/nationalities" :label="$t('nationalities')" :data-value="data.nationalities_count"
      icon-bg-class="bg-red-200 dark:bg-red-500/75">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path
            d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
          </path>
          <circle cx="12" cy="10" r="3"></circle>
        </g>
      </svg>
    </grid-cell>
    <grid-cell link="/students" :label="$t('students')" :data-value="data.students_count"
      icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M18 21a8 8 0 0 0-16 0"></path>
          <circle cx="10" cy="8" r="5"></circle>
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
        </g>
      </svg>
    </grid-cell>
    <grid-cell :label="$t('females')" :data-value="data.female_students_count"
      icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M18 21a8 8 0 0 0-16 0"></path>
          <circle cx="10" cy="8" r="5"></circle>
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
        </g>
      </svg>
    </grid-cell>
    <grid-cell :label="$t('males')" :data-value="data.male_students_count"
      icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M18 21a8 8 0 0 0-16 0"></path>
          <circle cx="10" cy="8" r="5"></circle>
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
        </g>
      </svg>
    </grid-cell>
  </div>
  <div class="mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">

    <double-bar-chart :admissions="data.admissions"></double-bar-chart>
    <radial-bar-chart :studentsCount="data.students_count" :femaleCount="data.female_students_count"
      :maleCount="data.male_students_count"></radial-bar-chart>
    <div class="space-y-6">
      <h2 class="my-8 text-2xl select-none">{{ $t('graduates') }}</h2>
      <grid-cell :label="$t('females')" :data-value="data.female_graduates"
        icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M18 21a8 8 0 0 0-16 0"></path>
          <circle cx="10" cy="8" r="5"></circle>
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
        </g>
      </svg>
      </grid-cell>
      <grid-cell :label="$t('males')" :data-value="data.male_graduates" icon-bg-class="bg-sky-200 dark:bg-sky-500/75">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" class="iconify iconify--lucide w-6 dark:text-neutral-200">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M18 21a8 8 0 0 0-16 0"></path>
          <circle cx="10" cy="8" r="5"></circle>
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
        </g>
      </svg>
      </grid-cell>
    </div>

  </div>


</template>

<style scoped></style>
