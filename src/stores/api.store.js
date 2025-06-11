// eslint-disable no-unused-vars
import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance.js";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./auth.store";
import router from "@/router";
import { useUxStore } from "./ux.store";
import { useTranslation } from "i18next-vue";

export const useFilesStore = defineStore("files", () => {
  const authStore = useAuthStore();

  const fileId = ref(null);
  const isDownloading = ref(false);
  const downloadedProgress = ref(0);
  const downloadedSize = ref(0);
  const fileSize = ref(0);

  async function downloadFile(id, name) {
    fileId.value = id;
    isDownloading.value = true;
    try {
      const response = await fetch(
        `${axiosInstance.defaults.baseURL}/download/${id}/`,
        {
          headers: authStore.isAuthenticated
            ? {
                Authorization: `EDUSYSTEM ${authStore.token}`,
              }
            : undefined,
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }
      fileSize.value = parseInt(response.headers.get("Content-Length"), 10);
      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
        downloadedSize.value += value.length;
        if (fileSize.value) {
          downloadedProgress.value = Math.round(
            (downloadedSize.value / fileSize.value) * 100
          );
        }
      }
      const blob = new Blob(chunks, {
        type: response.headers.get("Content-Type"),
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = name;
      a.className = "hidden";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isDownloading.value = false;
      downloadedSize.value = 0;
      downloadedProgress.value = 0;
    }
  }
  async function _delete(id) {
    try {
      const response = await axiosInstance.delete(`/files/${id}/`);
    } catch (e) {
      console.error("Error", e);
    }
  }

  return {
    fileId,
    fileSize,
    isDownloading,
    downloadedSize,
    downloadedProgress,
    downloadFile,
    _delete,
  };
});

export const useDashboardStore = defineStore("root", () => {
  const data = ref({});
  const isLoading = ref(false);

  function clearData() {
    data.value = {};
  }
  async function get() {
    try {
      const response = await axiosInstance.get("/dashboard/");
      this.data = response.data;
    } catch (error) {
      console.error("Error", error);
    }
  }
  return { data, isLoading, clearData, get };
});

export const useUsersStore = defineStore("users", () => {
  const isLoading = ref(false);
  const dataTablePageCount = ref(1);
  const objectsCount = ref(0);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);

  const users = ref([]);

  const route = useRoute();

  async function getAll() {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "username";
    let search = route.query.search ? route.query.search : false;

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (search) {
      response = await axiosInstance.get("/profiles/", {
        params: { page, page_size: pageSize, order, column, search },
      });
    } else {
      response = await axiosInstance.get("/profiles/", {
        params: { page, page_size: pageSize, order, column },
      });
    }

    users.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
    objectsCount.value = response.data.count;
  }

  async function _delete(id) {
    try {
      const response = await axiosInstance.delete(`/profiles/${id}/`);
      deleteStatus.value = "success";
    } catch (error) {
      deleteStatus.value = "error";
    }
  }
  return {
    users,
    isLoading,
    dataTablePageCount,
    objectsCount,
    updateStatus,
    createStatus,
    deleteStatus,
    getAll,
    _delete,
  };
});

export const useEducationCentersStore = defineStore("education-centers", () => {
  const isLoading = ref(false);
  const dataTablePageCount = ref(1);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);
  const objectsCount = ref(0);

  const educationCenter = ref({});
  const aboutEducationCenter = ref({});
  const educationCenters = ref([]);
  const educationCenterFiles = ref([]);
  const educationCenterStaff = ref([]);

  const route = useRoute();

  const uxStore = useUxStore();
  const { t } = useTranslation();

  async function create(data) {
    try {
      const response = await axiosInstance.post("/education-centers/", data);
      if (response.status === 200) {
        createStatus.value = "success";
      } else {
        createStatus.value = "error";
      }
    } catch (e) {
      createStatus.value = "error";
    }
  }

  async function put(id, data) {
    try {
      const response = await axiosInstance.put(
        `/education-centers/${id}/`,
        data
      );
      if (response.status === 200) {
        updateStatus.value = "success";
      } else {
        updateStatus.value = "error";
      }
    } catch (e) {
      updateStatus.value = "error";
    }
  }

  async function get(id) {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/education-centers/${id}/`);
      console.log(response.status);
      if (!response.status) {
        router.go(-1);
        uxStore.addToast(
          t("notFoundToastError", { object: t("educationCenter") }),
          "error"
        );
      }
      educationCenter.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  async function getAbout(id) {
    try {
      const response = await axiosInstance.get(
        `/about-education-center/${id}/`
      );
      aboutEducationCenter.value = response.data;
    } catch (e) {
      console.error(e);
    }
  }
  async function getFiles(id, withoutQueries = false) {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "name";
    let search = route.query.search ? route.query.search : false;

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (!withoutQueries) {
      if (search) {
        response = await axiosInstance.get(`/education-centers/${id}/files/`, {
          params: { page, page_size: pageSize, order, column, search },
        });
      } else {
        response = await axiosInstance.get(`/education-centers/${id}/files/`, {
          params: { page, page_size: pageSize, order, column },
        });
      }
    } else {
      response = await axiosInstance.get(`/education-centers/${id}/files/`);
    }

    educationCenterFiles.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
  }
  async function getStaff(id, withoutQueries = false) {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "full_name";
    let search = route.query.search ? route.query.search : false;

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (!withoutQueries) {
      if (search) {
        response = await axiosInstance.get(`/education-centers/${id}/staff/`, {
          params: { page, page_size: pageSize, order, column, search },
        });
      } else {
        response = await axiosInstance.get(`/education-centers/${id}/staff/`, {
          params: { page, page_size: pageSize, order, column },
        });
      }
    } else {
      response = await axiosInstance.get(`/education-centers/${id}/staff/`);
    }

    educationCenterStaff.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
  }
  async function getAll() {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "name";
    let search = route.query.search ? route.query.search : false;

    let filters = {};

    if (route.query.region) {
      filters["region"] = route.query.region;
    }
    if (route.query.country) {
      filters["country"] = route.query.country;
    }

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (search) {
      response = await axiosInstance.get("/education-centers/", {
        params: {
          page,
          page_size: pageSize,
          order,
          column,
          search,
          ...filters,
        },
      });
    } else {
      response = await axiosInstance.get("/education-centers/", {
        params: { page, page_size: pageSize, order, column, ...filters },
      });
    }

    educationCenters.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
    objectsCount.value = response.data.count;
  }
  async function _delete(id) {
    try {
      const response = await axiosInstance.delete(`/education-centers/${id}/`);
      deleteStatus.value = "success";
    } catch (e) {
      console.error("Error:", e);
    }
  }

  return {
    educationCenter,
    educationCenters,
    educationCenterFiles,
    educationCenterStaff,
    aboutEducationCenter,
    isLoading,
    dataTablePageCount,
    updateStatus,
    createStatus,
    deleteStatus,
    objectsCount,
    get,
    put,
    create,
    getFiles,
    getStaff,
    getAbout,
    getAll,
    _delete,
  };
});

export const useRegionsStore = defineStore("regions", () => {
  const isLoading = ref(false);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);

  const regions = ref([]);

  async function getAll() {
    try {
      const response = await axiosInstance.get("/regions/");
      regions.value = response.data;
    } catch (e) {
      console.error("Error:", e);
    }
  }

  return {
    regions,
    isLoading,
    updateStatus,
    createStatus,
    deleteStatus,
    getAll,
  };
});

export const useCountriesStore = defineStore("countries", () => {
  const isLoading = ref(false);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);

  const countries = ref([]);

  async function getAll() {
    try {
      const response = await axiosInstance.get("/countries/");
      countries.value = response.data;
    } catch (e) {
      console.error("Error:", e);
    }
  }

  return {
    countries,
    isLoading,
    updateStatus,
    createStatus,
    deleteStatus,
    getAll,
  };
});

export const useSpecialFunctionsStore = defineStore("special-functions", () => {
  const serviceTogglerLoading = ref(false);
  const serviceStatus = ref(true);

  function setServiceAs(status) {
    serviceStatus.value = status;
  }

  async function toggleService() {
    try {
      serviceTogglerLoading.value = true;
      const response = await axiosInstance.get("/service-toggler/");
      serviceStatus.value = response.data.is_enabled;
    } catch (error) {
      console.error("Error", error);
    } finally {
      serviceTogglerLoading.value = false;
    }
  }
  return {
    serviceStatus,
    serviceTogglerLoading,
    setServiceAs,
    toggleService,
  };
});

export const useAchievementsStore = defineStore("achievements", () => {
  const isLoading = ref(false);
  const dataTablePageCount = ref(1);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);
  const objectsCount = ref(0);

  const achievement = ref({});
  const achievements = ref([]);

  const route = useRoute();

  const uxStore = useUxStore();
  const { t } = useTranslation();

  async function create(data) {
    try {
      const response = await axiosInstance.post("/achievements/", data);
      if (response.status === 200) {
        createStatus.value = "success";
      } else {
        createStatus.value = "error";
      }
    } catch (e) {
      createStatus.value = "error";
    }
  }

  async function put(id, data) {
    try {
      const response = await axiosInstance.put(`/achievements/${id}/`, data);
      if (response.status === 200) {
        updateStatus.value = "success";
      } else {
        updateStatus.value = "error";
      }
    } catch (e) {
      updateStatus.value = "error";
    }
  }

  async function get(id) {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/achievements/${id}/`);
      if (!response.status) {
        router.go(-1);
        uxStore.addToast(
          t("notFoundToastError", { object: t("achievement") }),
          "error"
        );
      }
      achievement.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  async function getAll() {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "name";
    let search = route.query.search ? route.query.search : false;

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (search) {
      response = await axiosInstance.get("/achievements/", {
        params: {
          page,
          page_size: pageSize,
          order,
          column,
          search,
        },
      });
    } else {
      response = await axiosInstance.get("/achievements/", {
        params: { page, page_size: pageSize, order, column },
      });
    }

    achievements.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
    objectsCount.value = response.data.count;
  }
  async function _delete(id) {
    try {
      const response = await axiosInstance.delete(`/achievements/${id}/`);
      deleteStatus.value = "success";
    } catch (e) {
      deleteStatus.value = "error";
      console.error("Error:", e);
    }
  }

  return {
    achievement,
    achievements,
    isLoading,
    dataTablePageCount,
    updateStatus,
    createStatus,
    deleteStatus,
    objectsCount,
    get,
    put,
    create,
    getAll,
    _delete,
  };
});

export const useSpecializationsStore = defineStore("specializations", () => {
  const isLoading = ref(false);
  const dataTablePageCount = ref(1);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);
  const objectsCount = ref(0);

  const specialization = ref({});
  const specializations = ref([]);

  const route = useRoute();

  const uxStore = useUxStore();
  const { t } = useTranslation();

  async function create(data) {
    try {
      const response = await axiosInstance.post("/specializations/", data);
      if (response.status === 200) {
        createStatus.value = "success";
      } else {
        createStatus.value = "error";
      }
    } catch (e) {
      createStatus.value = "error";
    }
  }

  async function put(id, data) {
    try {
      const response = await axiosInstance.put(`/specializations/${id}/`, data);
      if (response.status === 200) {
        updateStatus.value = "success";
      } else {
        updateStatus.value = "error";
      }
    } catch (e) {
      updateStatus.value = "error";
    }
  }

  async function get(id) {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/specializations/${id}/`);
      if (!response.status) {
        router.go(-1);
        uxStore.addToast(
          t("notFoundToastError", { object: t("specialization") }),
          "error"
        );
      }
      specialization.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  async function getAll() {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "name";
    let search = route.query.search ? route.query.search : false;

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (search) {
      response = await axiosInstance.get("/specializations/", {
        params: {
          page,
          page_size: pageSize,
          order,
          column,
          search,
        },
      });
    } else {
      response = await axiosInstance.get("/specializations/", {
        params: { page, page_size: pageSize, order, column },
      });
    }

    specializations.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
    objectsCount.value = response.data.count;
  }
  async function _delete(id) {
    try {
      const response = await axiosInstance.delete(`/specializations/${id}/`);
      deleteStatus.value = "success";
    } catch (e) {
      deleteStatus.value = "error";
      console.error("Error:", e);
    }
  }

  return {
    specialization,
    specializations,
    isLoading,
    dataTablePageCount,
    updateStatus,
    createStatus,
    deleteStatus,
    objectsCount,
    get,
    put,
    create,
    getAll,
    _delete,
  };
});

export const useDataTableStore = defineStore("data-table", () => {
  const isExporterLoading = ref(false);
  const isDeleting = ref(false);

  async function deleteSelectedItems(model, identificators) {
    isDeleting.value = true;
    try {
      const response = await axiosInstance.post("/delete/", {
        model,
        identificators,
      });
    } catch (e) {
      console.error("Error:", e);
    } finally {
      isDeleting.value = false;
    }
  }

  async function getExportedFile(model, identificators) {
    isExporterLoading.value = true;
    try {
      const response = await axiosInstance.post(
        `/export/`,
        {
          model,
          identificators,
        },
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["Content-Type"],
      });
      console.log(blob);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = `export-${model}.xlsx`;
      link.classList.add("hidden");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error", error);
    } finally {
      isExporterLoading.value = false;
    }
  }

  return {
    isExporterLoading,
    isDeleting,
    deleteSelectedItems,
    getExportedFile,
  };
});

export const useStudentsStore = defineStore("students", () => {
  const isLoading = ref(false);
  const dataTablePageCount = ref(1);
  const deleteStatus = ref(null);
  const updateStatus = ref(null);
  const createStatus = ref(null);
  const objectsCount = ref(0);

  const studentCourses = ref([]);
  const studentCertificates = ref([]);
  const student = ref({
    full_name: "",
  });
  const students = ref([]);

  const route = useRoute();

  const uxStore = useUxStore();
  const { t } = useTranslation();

  async function create(data) {
    try {
      const response = await axiosInstance.post("/students/", data);
      if (response.status === 200) {
        createStatus.value = "success";
      } else {
        createStatus.value = "error";
      }
    } catch (e) {
      createStatus.value = "error";
    }
  }

  async function put(id, data) {
    try {
      const response = await axiosInstance.put(`/students/${id}/`, data);
      if (response.status === 200) {
        updateStatus.value = "success";
      } else {
        updateStatus.value = "error";
      }
    } catch (e) {
      updateStatus.value = "error";
    }
  }

  async function get(id) {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/students/${id}/`);
      if (!response.status) {
        router.go(-1);
        uxStore.addToast(
          t("notFoundToastError", { object: t("student") }),
          "error"
        );
      }
      student.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  async function getCourses(id) {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/students/${id}/courses/`);
      if (!response.status) {
        router.go(-1);
        uxStore.addToast(
          t("notFoundToastError", { object: t("student") }),
          "error"
        );
      }
      studentCourses.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  async function getCertificates(id) {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get(`/students/${id}/certificates/`);
      if (!response.status) {
        router.go(-1);
        uxStore.addToast(
          t("notFoundToastError", { object: t("student") }),
          "error"
        );
      }
      studentCertificates.value = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  async function getAll() {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "full_name";
    let search = route.query.search ? route.query.search : false;

    let filters = {};

    if (route.query.region) {
      filters["region"] = route.query.region;
    }
    if (route.query.country) {
      filters["country"] = route.query.country;
    }

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (search) {
      response = await axiosInstance.get("/students/", {
        params: {
          page,
          page_size: pageSize,
          order,
          column,
          search,
          ...filters,
        },
      });
    } else {
      response = await axiosInstance.get("/students/", {
        params: { page, page_size: pageSize, order, column, ...filters },
      });
    }

    students.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
    objectsCount.value = response.data.count;
  }
  async function _delete(id) {
    try {
      const response = await axiosInstance.delete(`/students/${id}/`);
      deleteStatus.value = "success";
    } catch (e) {
      console.error("Error:", e);
    }
  }

  return {
    student,
    students,
    studentCourses,
    studentCertificates,
    isLoading,
    dataTablePageCount,
    updateStatus,
    createStatus,
    deleteStatus,
    objectsCount,
    get,
    put,
    getCourses,
    getCertificates,
    create,
    getAll,
    _delete,
  };
});
