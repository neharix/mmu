import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance.js";
import { ref } from "vue";

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

  const users = ref([]);

  async function getAll() {
    try {
      isLoading.value = true;
      const response = await axiosInstance.get("/profiles/");
      users.value = response.data;
    } catch (error) {
      console.error("Error", error);
    } finally {
      isLoading.value = false;
    }
  }
  return { users, getAll, isLoading };
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
  return { serviceStatus, serviceTogglerLoading, setServiceAs, toggleService };
});

export const useEducationCentersStore = defineStore("education-centers", () => {
  const educationCenters = ref([]);

  return { educationCenters };
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
