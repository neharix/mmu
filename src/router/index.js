import { createRouter, createWebHistory } from "vue-router";
import guards from "@/router/guards.js";
import MainPage from "@/views/MainPage.vue";
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
        // {
        //   path: "importer/:model",
        //   name: "importer",
        //   component: () => import("../views/SpecialViews/ImporterView.vue"),
        // },
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
              name: "edit-education-center",
              component: () =>
                import("../views/EducationCenterViews/EditEducationCenter.vue"),
              meta: {
                layout: "MainLayout",
                title: "editEducationCenter",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "view/:id",
              name: "about-education-center",
              component: () =>
                import(
                  "../views/EducationCenterViews/AboutEducationCenter.vue"
                ),
              meta: {
                layout: "MainLayout",
                title: "educationCenter",
                authRequired: true,
              },
              beforeEnter: guards.authGuard,
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
        {
          path: "regions",
          name: "regions",
          component: () => import("../views/RegionViews/Regions.vue"),
          meta: {
            layout: "MainLayout",
            title: "regions",
            adminRequired: true,
          },
          children: [
            {
              path: "",
              name: "regions-list",
              component: () =>
                import("../views/RegionViews/RegionsListView.vue"),
              meta: {
                layout: "MainLayout",
                title: "regions",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "add",
              name: "add-region",
              component: () => import("../views/RegionViews/AddRegion.vue"),
              meta: {
                layout: "MainLayout",
                title: "addRegion",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "edit/:id",
              name: "edit-region",
              component: () => import("../views/RegionViews/EditRegion.vue"),
              meta: {
                layout: "MainLayout",
                title: "editRegion",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
          ],
          beforeEnter: guards.authGuard,
        },
        {
          path: "achievements",
          name: "achievements",
          component: () => import("../views/AchievementViews/Achievements.vue"),
          meta: {
            layout: "MainLayout",
            title: "achievements",
            adminRequired: true,
          },
          children: [
            {
              path: "",
              name: "achievements-list",
              component: () =>
                import("../views/AchievementViews/AchievementsListView.vue"),
              meta: {
                layout: "MainLayout",
                title: "achievements",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "add",
              name: "add-achievement",
              component: () =>
                import("../views/AchievementViews/AddAchievement.vue"),
              meta: {
                layout: "MainLayout",
                title: "addAchievement",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "edit/:id",
              name: "edit-achievement",
              component: () =>
                import("../views/AchievementViews/EditAchievement.vue"),
              meta: {
                layout: "MainLayout",
                title: "editAchievement",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
          ],
          beforeEnter: guards.authGuard,
        },
        {
          path: "specializations",
          name: "specializations",
          component: () =>
            import("../views/SpecializationViews/Specializations.vue"),
          meta: {
            layout: "MainLayout",
            title: "specializations",
            adminRequired: true,
          },
          children: [
            {
              path: "",
              name: "specializations-list",
              component: () =>
                import(
                  "../views/SpecializationViews/SpecializationsListView.vue"
                ),
              meta: {
                layout: "MainLayout",
                title: "specializations",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "add",
              name: "add-specialization",
              component: () =>
                import("../views/SpecializationViews/AddSpecialization.vue"),
              meta: {
                layout: "MainLayout",
                title: "addSpecialization",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "edit/:id",
              name: "edit-specialization",
              component: () =>
                import("../views/SpecializationViews/EditSpecialization.vue"),
              meta: {
                layout: "MainLayout",
                title: "editSpecialization",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
          ],
          beforeEnter: guards.authGuard,
        },
        {
          path: "students",
          name: "students",
          component: () => import("../views/StudentViews/Students.vue"),
          meta: {
            layout: "MainLayout",
            title: "students",
            adminRequired: true,
          },
          children: [
            {
              path: "",
              name: "students-list",
              component: () =>
                import("../views/StudentViews/StudentsListView.vue"),
              meta: {
                layout: "MainLayout",
                title: "students",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "add",
              name: "add-student",
              component: () => import("../views/StudentViews/AddStudent.vue"),
              meta: {
                layout: "MainLayout",
                title: "addStudent",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "edit/:id",
              name: "edit-student",
              component: () => import("../views/StudentViews/EditStudent.vue"),
              meta: {
                layout: "MainLayout",
                title: "editStudent",
                adminRequired: true,
              },
              beforeEnter: guards.authGuard,
            },
            {
              path: "view/:id",
              name: "about-student",
              component: () => import("../views/StudentViews/Student.vue"),
              meta: {
                layout: "MainLayout",
                title: "viewStudent",
                adminRequired: true,
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
