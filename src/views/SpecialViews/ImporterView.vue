<script setup>
import router from '@/router';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
onBeforeMount(() => {
  const models = ["user", "education-center"]
  if (!models.includes(route.params.model)) {
    router.push({ name: "workspace-view" })
  }
})

</script>
<template>
  <div class="bg-mbg dark:bg-mdbg rounded-xl shadow-md px-3 py-4">
    <div>
      <label for="importInput">{{ $t('uploadExcel') }}</label>
      <input type="file mt-4" class="file-uploader" id="importInput">
    </div>
  </div>
</template>
