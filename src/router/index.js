import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import guards from "@/router/guards.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login-page",
      component: () => import("../views/LoginViews/LoginView.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "login",
        adminRequired: false,
      },
      beforeEnter: guards.loginGuard,
    },
    {
      path: "/reinstate-password",
      name: "reinstate-password",
      component: () => import("../views/LoginViews/ReinstatePasswordView.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "reinstatePassword",
        adminRequired: false,
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
        adminRequired: false,
      },
      beforeEnter: guards.loginGuard,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "MainLayout",
        title: "Baş sahypa",
      },
      beforeEnter: guards.defaultGuard,
    },
    {
      path: "/education-centers",
      name: "education-centers",
      component: () =>
        import("../views/EducationCenterViews/EducationCenters.vue"),
      meta: {
        layout: "MainLayout",
        title: "Ýokary okuw mekdepleri",
        adminRequired: true,
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
            title: "Okuw merkezleri",
            adminRequired: true,
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
            adminRequired: true,
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
            adminRequired: true,
          },
          beforeEnter: guards.authGuard,
        },
        {
          path: "view/:id",
          name: "about-high-school",
          component: () =>
            import("../views/EducationCenterViews/AboutEducationCenter.vue"),
          meta: {
            layout: "MainLayout",
            title: "Ýokary okuw mekdebi",
            adminRequired: true,
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
                adminRequired: true,
              },
            },
          ],
        },
      ],
      beforeEnter: guards.authGuard,
    },
    {
      path: "/403",
      name: "page-403",
      component: () => import("@/views/Errors/Page403.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "403 | Rugsat ýok",
      },
      beforeEnter: guards.defaultGuard,
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/Errors/Page404.vue"),
      meta: {
        layout: "EmptyLayout",
        title: "404 | Sahypa tapylmady",
      },
    },
  ],
});

export default router;
