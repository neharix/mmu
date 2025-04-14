import { defineStore } from "pinia";
import axiosInstance from "@/api/axiosInstance.js";
import router from "@/router/index.js";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const role = ref("empty");
  const token = ref(localStorage.getItem("access_token") || null);
  const isLoading = ref(true);
  const loginStatus = ref(null);
  const isAuthenticated = ref(false);

  const censoredEmail = ref(null);
  const userForOtp = ref(null);
  const isOtpAvailable = ref(false);

  async function login(credentials) {
    try {
      const response = await axiosInstance.post("/token/", credentials);

      token.value = response.data.access;

      localStorage.setItem("access_token", token.value);
      axiosInstance.defaults.headers["Authorization"] = `BMDU ${token.value}`;
      isAuthenticated.value = true;
    } catch (error) {
      loginStatus.value = "Ulanyjy ady ýa-da açar sözi ýalňyş girizildi";
      isAuthenticated.value = false;
      console.error("Login failed", error);
    }
  }

  async function tryToGetOtpForUser(username) {
    try {
      const response = await axiosInstance.get(`/try-otp/${username}/`);
      censoredEmail.value = response.data.email;
      userForOtp.value = response.data.username;
      isOtpAvailable.value = true;
    } catch (error) {
      console.error("OTP failed", error);
      isOtpAvailable.value = false;
    }
  }

  async function logout() {
    token.value = null;
    user.value = null;
    role.value = "empty";
    isAuthenticated.value = false;
    localStorage.removeItem("access_token");
    delete axiosInstance.defaults.headers["Authorization"];
    router.push("/login");
  }

  async function fetchUser() {
    try {
      const response = await axiosInstance.get("/user/");
      user.value = response.data;
      if (response.status === 200) {
        isAuthenticated.value = true;
        role.value = user.value.is_superuser ? "root" : "user";
      } else {
        isAuthenticated.value = false;
      }
      isLoading.value = false;
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  }

  return {
    user,
    role,
    isLoading,
    token,
    loginStatus,
    isAuthenticated,
    censoredEmail,
    userForOtp,
    isOtpAvailable,
    tryToGetOtpForUser,
    login,
    logout,
    fetchUser,
  };
});
