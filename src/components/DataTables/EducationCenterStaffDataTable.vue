<script setup>
import { computed, defineProps, onBeforeMount, onMounted, ref, useTemplateRef, watch } from 'vue';
import TheToast from "@/components/TheToast.vue";
import useToast from "@/use/useToast.js";
import { useUsersStore } from "@/stores/api.store.js";
import { storeToRefs } from "pinia";
import router from "@/router/index.js";
import { onClickOutside } from '@vueuse/core';
import { useRoute } from 'vue-router';

const route = useRoute();
const { toasts, addToast } = useToast();
const usersStore = useUsersStore();
const { deleteStatus, updateStatus, createStatus } = storeToRefs(usersStore);

const props = defineProps({
  data: Array,
  totalPages: Number,
})
const emit = defineEmits(["update"]);


watch(props, (newVal, oldVal) => {
  data.value = newVal.data;
  filteredData.value = [...data.value];
})


const data = ref([]);
const filteredData = ref([]);
const selectedItem = ref(null);

const sortColumn = ref(route.query.column || "full_name");
const sortOrder = ref(route.query.order || 'asc');
const currentPage = ref(Number(route.query.page || 1));
const rowsPerPage = ref(localStorage.getItem("rowsPerPage") || 10);
const rowsPerPageOptions = [10, 20, 50, 100, 250, 500];
const searchQuery = ref(route.query.search ? route.query.search : "");
const isSearching = ref(!!route.query.search || false);
const selectedItems = ref([]);

if (props.data.length > 0) {
  data.value = props.data;
  filteredData.value = [...data.value];
}

const isAllSelected = computed(() => {
  if (data.value.length === selectedItems.value.length) {
    return true;
  }
  return false;
})

const selectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = data.value.map(item => item.id)
  }
}

const checkboxClicked = (id) => {
  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter(item => item !== id);
  } else {
    selectedItems.value.push(id);
  }
}

const applySearch = () => {
  router.push({ name: 'about-education-center', params: { id: route.params.id }, query: { ...route.query, search: searchQuery.value.toLowerCase() } }).then(() => {
    emit('update')
  });
};

const resetTable = () => {
  const newQuery = { ...route.query };
  delete newQuery.search;

  router.replace({ query: newQuery }).then(() => {
    emit('update');
    isSearching.value = false;
  });
};


const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
  }
};


const changeRowsPerPage = async (option) => {
  rowsPerPage.value = parseInt(option, 10);
  localStorage.setItem("rowsPerPage", rowsPerPage.value)
  if (currentPage.value === 1) {
    emit('update')
  } else {
    currentPage.value = 1;
  }
  isOpen.value = false;
};

const pagesBefore = computed(() => {
  const start = Math.max(2, currentPage.value - 2);
  return Array.from({ length: Math.max(0, currentPage.value - start) }, (_, i) => start + i);
});

const pagesAfter = computed(() => {
  const end = Math.min(props.totalPages - 1, currentPage.value + 2);
  return Array.from({ length: Math.max(0, end - currentPage.value) }, (_, i) => currentPage.value + i + 1);
});


const sort = (column) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortOrder.value = 'asc';
  }
};
const isOpen = ref(false);
const isActionsOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function toggleActionsMenu() {
  isActionsOpen.value = !isActionsOpen.value;
}


function closeMenu() {
  isOpen.value = false;
  isActionsOpen.value = false;
}


function openModalWrapper(headerText, content, id) {
  openModal(headerText, content);
  selectedItem.value = id;
}


function closeModal() {
  isModalOpen.value = false;
  selectedItem.value = null;
}


function submitModal() {
  isModalOpen.value = false;
  usersStore._delete(selectedItem.value).then(() => {
    emit('update');
  });
  selectedItem.value = null;
}

watch(deleteStatus, (newVal, oldVal) => {
  if (newVal) {
    if (newVal === 'success') {
      addToast('Ýokary okuw mekdebi üstünlikli ýok edildi', 'success');
    } else if (newVal === 'error') {
      addToast('Ýok etme prosesinde ýalňyşlyk ýüze çykdy', 'error');
    }
  }
  deleteStatus.value = null;
})

watch(currentPage, (newVal) => {
  router.push({ name: 'about-education-center', params: { id: route.params.id }, query: { ...route.query, page: newVal } }).then(() => {
    emit('update')
  });
})
watch(sortColumn, (newVal) => {
  setTimeout(() => {
    router.push({ name: 'about-education-center', params: { id: route.params.id }, query: { ...route.query, order: sortOrder.value, column: newVal } }).then(() => {
      emit('update');
    })
  }, 50)
})

watch(sortOrder, (newVal) => {
  router.push({ name: 'about-education-center', params: { id: route.params.id }, query: { ...route.query, order: newVal, column: sortColumn.value } }).then(() => {
    emit('update');
  })
})


onBeforeMount(() => {
  const rpp = localStorage.getItem('rowsPerPage');
  if (rpp) {
    rowsPerPage.value = parseInt(rpp);
  } else {
    localStorage.setItem("rowsPerPage", 10)
  }
})

onMounted(() => {
  if (updateStatus.value) {
    if (updateStatus.value === 'success') {
      addToast('Ýokary okuw mekdebi üstünlikli üýtgedildi', 'success');
    } else if (updateStatus.value === 'error') {
      addToast('Üýtgetme prosesinde ýalňyşlyk ýüze çykdy', 'error');
    }
  }
  updateStatus.value = null;

  if (createStatus.value) {
    if (createStatus.value === 'success') {
      addToast('Ýokary okuw mekdebi üstünlikli hasaba alyndy', 'success');
    } else if (createStatus.value === 'error') {
      addToast('Hasaba alma prosesinde ýalňyşlyk ýüze çykdy', 'error');
    }
  }
  createStatus.value = null;
})


const rowCountDropdown = useTemplateRef('rowCountDropdown');

onClickOutside(rowCountDropdown, event => {
  closeMenu();
});



</script>

<template>
  <div class="w-full">
    <div class="pt-1 dark:bg-[#112731] bg-white">
      <div class="flex items-center justify-between space-x-2 py-3">
        <div class="flex items-center">
          <div class="dropdown">
            <div tabindex="0" role="button"
              class="inline-flex text-center transition duration-200 ease-in w-full justify-center rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#113031] dark:text-gray-200 px-4 py-2 text-[0.75rem] text-sm font-medium text-gray-700 shadow-sm dark:hover:bg-[#113031] focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#2e5152] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#2e5152] select-none">
              {{ $t('rowCount') }}: {{ rowsPerPage }}
            </div>
            <ul tabindex="0"
              class="dropdown-content menu border border-white/10 bg-mbg dark:bg-mdbg rounded-box z-1 w-36 p-2 shadow-sm">
              <li>
                <button v-for="option in rowsPerPageOptions" :key="option" :value="option"
                  @click="changeRowsPerPage(option)"
                  class="w-full text-start text-gray-700 active:bg-gray-50 dark:active:bg-[#113031] dark:text-gray-200 block px-4 py-2 md:text-sm text-[0.75rem] hover:bg-gray-100 dark:hover:bg-[#113031] select-none">
                  {{ option }} {{ $t('rows') }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="lg:w-1/3 flex items-center space-x-2">
          <button @click="resetTable" :class="{ 'opacity-0': !isSearching }" :disabled="!isSearching"
            class="p-2 text-sm rounded-xl shadow-md bg-emerald-500 dark:bg-emerald-400 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6"
              viewBox="0 0 24 24" version="1.1">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Reload">
                  <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24">

                  </rect>
                  <path
                    d="M4,13 C4,17.4183 7.58172,21 12,21 C16.4183,21 20,17.4183 20,13 C20,8.58172 16.4183,5 12,5 C10.4407,5 8.98566,5.44609 7.75543,6.21762"
                    id="Path" stroke="currentColor" stroke-width="2" stroke-linecap="round">

                  </path>
                  <path
                    d="M9.2384,1.89795 L7.49856,5.83917 C7.27552,6.34441 7.50429,6.9348 8.00954,7.15784 L11.9508,8.89768"
                    id="Path" stroke="currentColor" stroke-width="2" stroke-linecap="round">

                  </path>
                </g>
              </g>
            </svg>
          </button>
          <input v-model="searchQuery" type="text" @keyup.enter="applySearch" :placeholder="$t('search')"
            class="w-full text-[0.8rem] md:text-sm dark:text-gray-300 transition duration-200 ease-in bg-transparent px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring focus:ring-emerald-300 dark:focus:ring-emerald-800 focus:outline-none" />

        </div>
      </div>
    </div>
    <div class="w-full overflow-x-auto rounded-lg">
      <table class="w-full min-w-full table-auto bg-white dark:bg-[#112731]">
        <thead class="bg-gray-200 dark:bg-[#113031]">
          <tr>
            <th class="px-6 border-y border-gray-300 dark:border-[#113031] select-none text-left">
              <button class="pt-2 select-none" @click="selectAll">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle :class="{ 'opacity-0': !isAllSelected, 'opacity-100': isAllSelected }"
                    class="transition duration-300 ease-out" cx="12" cy="12" r="3">
                  </circle>
                </svg>
              </button>
            </th>
            <th
              class="transition duration-200 ease-in border-y border-gray-300 dark:border-[#113031] dark:hover:bg-emerald-800 p-3 select-none cursor-pointer hover:bg-gray-300  text-left text-[0.8rem]"
              @click="sort('id')">
              {{ $t('id').toUpperCase() }}
              <span :class="sortColumn === 'id' ? (sortOrder === 'asc' ? 'rotate-180' : '') : 'opacity-25'"
                class="ml-2 transition-transform duration-200 inline-block">
                ▲
              </span>
            </th>
            <th
              class="transition duration-200 ease-in border-y border-gray-300 dark:border-[#113031] dark:hover:bg-emerald-800 p-3 select-none cursor-pointer hover:bg-gray-300  text-left text-[0.8rem]"
              @click="sort('full_name')">
              {{ $t('fullName').toUpperCase() }}
              <span :class="sortColumn === 'full_name' ? (sortOrder === 'asc' ? 'rotate-180' : '') : 'opacity-25'"
                class="ml-2 transition-transform duration-200 inline-block">
                ▲
              </span>
            </th>
            <th
              class="transition duration-200 ease-in border-y border-gray-300 dark:border-[#113031] dark:hover:bg-emerald-800 p-3 select-none cursor-pointer hover:bg-gray-300  text-left text-[0.8rem]"
              @click="sort('region')">
              {{ $t('region').toUpperCase() }}
              <span :class="sortColumn === 'region' ? (sortOrder === 'asc' ? 'rotate-180' : '') : 'opacity-25'"
                class="ml-2 transition-transform duration-200 inline-block">
                ▲
              </span>
            </th>
            <th
              class="transition duration-200 ease-in border-y border-gray-300 dark:border-[#113031] dark:hover:bg-emerald-800 p-3 select-none cursor-pointer hover:bg-gray-300  text-left text-[0.8rem]"
              @click="sort('country')">
              {{ $t('country').toUpperCase() }}
              <span :class="sortColumn === 'country' ? (sortOrder === 'asc' ? 'rotate-180' : '') : 'opacity-25'"
                class="ml-2 transition-transform duration-200 inline-block">
                ▲
              </span>
            </th>
            <th class="border-y border-gray-300 dark:border-[#113031] p-3 select-none text-center text-[0.8rem]">
              {{ $t("tools").toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id"
            class="transition ease-in hover:ease-out duration-200 hover:bg-gray-100 dark:hover:bg-[#113031]">
            <td class="border-y border-gray-300 dark:border-[#113031] px-6">
              <button class="select-none" @click="checkboxClicked(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle
                    :class="{ 'opacity-0': !selectedItems.includes(item.id), 'opacity-100': selectedItems.includes(item.id) }"
                    class="transition duration-300 ease-out" cx="12" cy="12" r="3">
                  </circle>
                </svg>
              </button>
            </td>
            <td class="border-y border-gray-300 dark:border-[#113031] px-4 py-2 break-words text-[0.8rem]">{{
              item.id
            }}
            </td>
            <td class="border-y border-gray-300 dark:border-[#113031] p-2 break-words text-[0.8rem]">{{
              item.full_name
            }}
            </td>
            <td class="border-y border-gray-300 dark:border-[#113031] p-2 break-words text-[0.8rem]">{{
              item.region.name
            }}
            </td>
            <td class="border-y border-gray-300 dark:border-[#113031] p-2 break-words text-[0.8rem]">{{
              item.country.name
            }}
            </td>
            <td class="border-y border-gray-300 dark:border-[#113031] p-2 break-words text-[0.8rem]">
              <div class="w-full flex items-center justify-center">
                <div class="inline-flex rounded-md shadow-xs" role="group">
                  <button type="button" :key="item.id" @click="console.log('i', item.id)" :title="$t('view')"
                    class="rounded-lg px-4 py-2 text-[0.8rem] font-medium bg-violet-400 hover:bg-violet-500 transition ease-in hover:ease-out duration-200 text-white dark:bg-violet-700 border border-gray-200 focus:z-10 focus:ring-2 focus:ring-violet-500 dark:border-gray-700 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true" role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-5">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="flex justify-center items-center mt-4 space-x-2 overflow-x-auto">
    <button class="select-none active-paginator-btn" v-if="currentPage !== 1" @click="changePage(currentPage - 1)">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <button class="select-none paginator-btn" v-if="currentPage > 3" @click="changePage(1)">
      1
    </button>

    <span v-if="currentPage > 4" class="px-2 select-none">...</span>

    <button class="select-none paginator-btn" v-for="page in pagesBefore" :key="'before-' + page"
      @click="changePage(page)">
      {{ page }}
    </button>

    <button class="select-none active-paginator-btn" v-if="totalPages !== 0">
      {{ currentPage }}
    </button>

    <button class="select-none paginator-btn" v-for="page in pagesAfter" :key="'after-' + page"
      @click="changePage(page)">
      {{ page }}
    </button>

    <span v-if="currentPage < totalPages - 3" class="px-2 select-none">...</span>

    <button class="select-none paginator-btn" v-if="currentPage < totalPages - 2" @click="changePage(totalPages)">
      {{ totalPages }}
    </button>

    <button class="select-none active-paginator-btn" v-if="currentPage !== totalPages && totalPages !== 0"
      @click="changePage(currentPage + 1)">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
  <teleport to="body">
    <div class="toast-container w-5/6 fixed top-25
       md:top-auto md:bottom-5 right-5 md:w-1/4 flex flex-col-reverse space-y-2">
      <TransitionGroup name="toast">
        <the-toast v-for="toast in toasts" :key="toast.id" :message="toast.message" :type="toast.type"
          :duration="toast.duration" :onClose="() => (toasts = toasts.filter((t) => t.id !== toast.id))"></the-toast>
      </TransitionGroup>
    </div>
  </teleport>
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


.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
