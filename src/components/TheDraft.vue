<template>
  <div class="flex flex-col md:flex-row gap-4 md:gap-8 p-4 max-w-screen-lg mx-auto">
    <!-- Левая панель -->
    <div class="w-full md:w-1/2 border p-4 rounded bg-gray-50">
      <h2 class="text-lg font-bold mb-2 text-center md:text-left">Доступные элементы</h2>
      <Draggable v-model="leftPanel" :group="{ name: 'panels', pull: true, put: true }" item-key="id"
        class="min-h-[100px]" ghost-class="drag-ghost" chosen-class="drag-chosen">
        <template #item="{ element }">
          <div class="draggable-item">
            {{ element.name }} (ID: {{ element.id }})
          </div>
        </template>
      </Draggable>
    </div>

    <!-- Правая панель -->
    <div class="w-full md:w-1/2 border p-4 rounded bg-green-50">
      <h2 class="text-lg font-bold mb-2 text-center md:text-left">Выбранные элементы</h2>
      <Draggable v-model="rightPanel" :group="{ name: 'panels', pull: true, put: true }" item-key="id"
        class="min-h-[100px]" ghost-class="drag-ghost" chosen-class="drag-chosen">
        <template #item="{ element }">
          <div class="draggable-item">
            {{ element.name }} (ID: {{ element.id }})
          </div>
        </template>
      </Draggable>

      <div class="flex flex-col sm:flex-row gap-2 mt-4">
        <button class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="acceptSelection">
          Принять
        </button>
        <button class="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          @click="clearRightPanel">
          Очистить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LGeoJson } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import Draggable from 'vuedraggable'

const items = [
  { id: 1, name: 'Компонент A' },
  { id: 2, name: 'Компонент B' },
  { id: 3, name: 'Компонент C' },
  { id: 4, name: 'Компонент D' },
]

const leftPanel = ref(items)

const rightPanel = ref([])

const acceptSelection = () => {
  const ids = rightPanel.value.map(item => item.id)
  alert('Выбранные ID: ' + ids.join(', '))
}

const clearRightPanel = () => {
  leftPanel.value = items;
  rightPanel.value = [];
}
</script>

<style scoped>
.draggable-item {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  background-color: white;
  cursor: grab;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
}

.draggable-item:hover {
  background-color: #f3f4f6;
}

.drag-ghost {
  opacity: 0.5;
}

.drag-chosen {
  background-color: #dbeafe;
  border-color: #60a5fa;
  transform: scale(1.02);
}
</style>
