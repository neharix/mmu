<script setup>

const props = defineProps({
  positionClasses: String,
  isVisible: Boolean,
  onlySmoothText: {
    type: Boolean,
    required: false,
    default: false,
  },
})

</script>
<template>
  <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
    @after-leave="el => (el.style.display = 'none')">
    <div class="absolute z-10 mt-24 "
      :class="[onlySmoothText ? 'bg-transparent' : 'bg-white dark:bg-[#171131ef] rounded-lg  shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 ring-opacity-5', positionClasses]"
      v-show="isVisible">
      <div class="p-2 select-none transition-all">
        <slot name="default"></slot>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
