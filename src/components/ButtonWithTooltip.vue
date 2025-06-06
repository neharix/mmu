<script setup>
import { ref } from 'vue';


defineEmits(['clicked'])
const props = defineProps({
  class: {
    type: String,
    required: false,
    default: '',
  },
  textValue: String,
  positionClasses: String,
  disableTooltip: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const timerId = ref(null);

const isTooltipVisible = ref(false);

function mouseEnter() {
  if (!props.disableTooltip) {
    timerId.value = setTimeout(() => { isTooltipVisible.value = true }, 500)
  }
}

function mouseLeave() {
  if (!props.disableTooltip) {
    if (timerId.value) {
      clearTimeout(timerId.value);
      timerId.value = null;
    }
    isTooltipVisible.value = false;
  }
}

</script>
<template>
  <button class="p-2 dark:text-gray-100" @click="$emit('clicked')">
    <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <slot name="btn-content"></slot>
    </div>
  </button>

  <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
    @after-leave="el => (el.style.display = 'none')">
    <div :class="positionClasses"
      class="absolute z-10 mt-24 rounded-lg bg-white dark:bg-[#112731] shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 text-gray-800 dark:text-gray-100 ring-opacity-5"
      v-show="isTooltipVisible">
      <div class="p-2 select-none transition-all">
        {{ textValue }}
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
