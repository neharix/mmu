// eslint-disable no-unused-vars
import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance.js";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./auth.store";

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
  return {
    fileId,
    fileSize,
    isDownloading,
    downloadedSize,
    downloadedProgress,
    downloadFile,
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

  const aboutEducationCenter = ref({});
  const educationCenters = ref([]);
  const educationCenterFiles = ref([]);
  const educationCenterStaff = ref([]);

  const route = useRoute();

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
    console.log(educationCenterStaff.value);
    dataTablePageCount.value = response.data.results.total_pages;
  }

  async function getAll() {
    let order = route.query.order ? route.query.order : "asc";
    let column = route.query.column ? route.query.column : "name";
    let search = route.query.search ? route.query.search : false;

    let page = route.query.page ? route.query.page : 1;
    let pageSize = localStorage.getItem("rowsPerPage");
    let response = null;
    if (search) {
      response = await axiosInstance.get("/education-centers/", {
        params: { page, page_size: pageSize, order, column, search },
      });
    } else {
      response = await axiosInstance.get("/education-centers/", {
        params: { page, page_size: pageSize, order, column },
      });
    }

    educationCenters.value = response.data.results.data;
    dataTablePageCount.value = response.data.results.total_pages;
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
    educationCenters,
    educationCenterFiles,
    educationCenterStaff,
    aboutEducationCenter,
    isLoading,
    dataTablePageCount,
    updateStatus,
    createStatus,
    deleteStatus,
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
    response = await axiosInstance.get("/regions/");
    regions.value = response.data;
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

export const useDataTableStore = defineStore("data-table", () => {
  const isExporterLoading = ref(false);
  const exportFile = ref(null);
  const exportFileContentType = ref(null);

  function resetExportStates() {
    exportFile.value = null;
    exportFileContentType.value = null;
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
      exportFile.value = response.data;
      exportFileContentType.value = response.headers["Content-Type"];
    } catch (error) {
      console.error("Error", error);
    } finally {
      isExporterLoading.value = false;
    }
  }

  return {
    exportFile,
    exportFileContentType,
    getExportedFile,
    resetExportStates,
  };
});

export const useHighSchoolsStore = defineStore({
  id: "high-schools",
  state: () => ({
    highSchools: [],
    highSchoolsResponse: [],
    highSchoolAbout: {},
    deleteStatus: null,
    updateStatus: null,
    createStatus: null,
    facultyRemoveStatus: null,
    highSchool: {},
  }),
  actions: {
    async getAll() {
      try {
        const response = await axiosInstance.get("/high-schools/");
        this.highSchoolsResponse = response.data;
      } catch (error) {
        console.error("Error", error);
      }
    },
    async getAllAdditional() {
      try {
        const response = await axiosInstance.get(
          "/high-schools-with-additional/"
        );
        this.highSchools = response.data;
      } catch (error) {
        console.error("Error", error);
      }
    },
    async create(data) {
      try {
        const response = await axiosInstance.post("/create-high-school/", data);
        this.createStatus = "success";
      } catch (error) {
        this.createStatus = "error";
      }
    },
    async delete(id) {
      try {
        const response = await axiosInstance.delete(`/high-schools/${id}/`);
        this.deleteStatus = "success";
      } catch (error) {
        this.deleteStatus = "error";
      }
    },
    async get(id) {
      try {
        const response = await axiosInstance.get(`/high-schools/${id}/`);
        this.highSchool = response.data;
      } catch (error) {
        console.error("Error", error);
      }
    },
    async getAbout(id) {
      try {
        const response = await axiosInstance.get(`/high-school-about/${id}/`);
        this.highSchoolAbout = response.data;
      } catch (error) {
        console.error("Error", error);
      }
    },
    async put(id, data) {
      try {
        const response = await axiosInstance.put(
          `/update-high-school/${id}/`,
          data
        );
        this.updateStatus = "success";
      } catch (error) {
        console.error("Error", error);
        this.updateStatus = "error";
      }
    },
  },
});
