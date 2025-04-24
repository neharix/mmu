import { createRouter, createWebHistory } from "vue-router";
import guards from "@/router/guards.js";
import MainPage from "@/views/MainPage.vue";
import { useAuthStore } from "@/stores/auth.store";
import { useDashboardStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";
import { useTranslation } from "i18next-vue";
import { useUxStore } from "@/stores/ux.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
      meta: {
        layout: "EmptyLayout",
        title: "mainPage",
      },
      beforeEnter: guards.anonGuard,
    },
    {
      path: "/login",
      name: "login-page",
      component: () => import("../views/LoginViews/LoginView.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "login",
      },
      beforeEnter: guards.loginGuard,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("../views/LoginViews/ResetPasswordView.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "reinstatePassword",
      },
      beforeEnter: guards.loginGuard,
    },
    {
      path: "/otp-confirmation",
      name: "otp-confirmation",
      component: () => import("../views/LoginViews/OtpConfirmationView.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "otp",
      },
      beforeEnter: guards.loginGuard,
    },
    {
      path: "/new-password",
      name: "set-new-password",
      component: () => import("../views/LoginViews/NewPasswordView.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "newPassword",
      },
      beforeEnter: guards.loginGuard,
    },
    {
      path: "/workspace",
      name: "workspace",
      component: () => import("../views/WorkspaceViews/Workspace.vue"),
      meta: {
        layout: "MainLayout",
        title: "workspace",
        authRequired: true,
      },
      beforeEnter: guards.authGuard,
      children: [
        {
          path: "",
          name: "workspace-view",
          component: () => import("../views/WorkspaceViews/WorkspaceView.vue"),
          meta: {
            layout: "MainLayout",
            title: "workspace",
            authRequired: true,
          },
          beforeEnter: guards.authGuard,
        },
        {
          path: "education-centers",
          name: "education-centers",
          component: () =>
            import("../views/EducationCenterViews/EducationCenters.vue"),
          meta: {
            layout: "MainLayout",
            title: "educationCenters",
            authRequired: true,
          },
          children: [
            {
              path: "",
              name: "education-centers-list",
              component: () =>
                import(
                  "../views/EducationCenterViews/EducationCentersListView.vue"
                ),
              meta: {
                layout: "MainLayout",
                title: "educationCenters",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "add",
              name: "add-education-center",
              component: () =>
                import("../views/EducationCenterViews/AddEducationCenter.vue"),
              meta: {
                layout: "MainLayout",
                title: "addEducationCenter",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "edit/:id",
              name: "edit-high-school",
              component: () =>
                import("../views/EducationCenterViews/EditEducationCenter.vue"),
              meta: {
                layout: "MainLayout",
                title: "Ýokary okuw mekdebi üýtgetmek",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "view/:id",
              name: "about-high-school",
              component: () =>
                import(
                  "../views/EducationCenterViews/AboutEducationCenter.vue"
                ),
              meta: {
                layout: "MainLayout",
                title: "Ýokary okuw mekdebi",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
              children: [
                {
                  path: "",
                  name: "high-school",
                  component: () =>
                    import("../views/EducationCenterViews/EducationCenter.vue"),
                  beforeEnter: guards.authGuard,
                  meta: {
                    layout: "MainLayout",
                    title: "Ýokary okuw mekdebi",
                    authRequired: true,
                  },
                },
              ],
            },
          ],
          beforeEnter: guards.authGuard,
        },
        {
          path: "users",
          name: "users",
          component: () => import("../views/UserViews/Users.vue"),
          meta: {
            layout: "MainLayout",
            title: "users",
            authRequired: true,
          },
          children: [
            {
              path: "",
              name: "users-list",
              component: () => import("../views/UserViews/UsersListView.vue"),
              meta: {
                layout: "MainLayout",
                title: "users",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "add",
              name: "add-user",
              component: () => import("../views/UserViews/AddUserView.vue"),
              meta: {
                layout: "MainLayout",
                title: "addUser",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "edit/:id",
              name: "edit-user",
              component: () => import("../views/UserViews/EditUserView.vue"),
              meta: {
                layout: "MainLayout",
                title: "editUser",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
          ],
          beforeEnter: guards.authGuard,
        },
      ],
    },
    {
      path: "/403",
      name: "page-403",
      component: () => import("@/views/Errors/Page403.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "pageForbidden",
      },
      beforeEnter: async (to, from, next) => {
        const { t, i18next } = useTranslation();

        while (!i18next.isInitialized) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        let title = to.meta.title || "";
        document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

        return next();
      },
    },
    {
      path: "/429",
      name: "page-429",
      component: () => import("@/views/Errors/Page429.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "tooManyRequests",
      },
      beforeEnter: async (to, from, next) => {
        const { t, i18next } = useTranslation();

        while (!i18next.isInitialized) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        let title = to.meta.title || "";
        document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

        return next();
      },
    },
    {
      path: "/503",
      name: "page-503",
      component: () => import("@/views/Errors/Page503.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "serviceUnavailable",
      },
      beforeEnter: guards.errorGuard,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page-404",
      component: () => import("../views/Errors/Page404.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "pageNotFound",
      },
      beforeEnter: async (to, from, next) => {
        const { t, i18next } = useTranslation();

        while (!i18next.isInitialized) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        const uxStore = useUxStore();
        uxStore.errorPageStatus = "page-404";

        let title = to.meta.title || "";
        document.title = title.length > 0 ? t(title) + " | MMU" : "MMU";

        return next();
      },
    },
  ],
});

export default router;
