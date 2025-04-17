import { createRouter, createWebHistory } from "vue-router";
import guards from "@/router/guards.js";
import MainPage from "@/views/MainPage.vue";

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
                title: "Ýokary okuw mekdebi goşmak",
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
      beforeEnter: guards.defaultGuard,
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/Errors/Page404.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "pageNotFound",
      },
      beforeEnter: guards.defaultGuard,
    },
  ],
});

export default router;
