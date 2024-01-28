import { createRouter, createWebHistory } from "vue-router";
import ViewCountDown from "../views/ViewCountDown.vue";
import ViewSettings from "../views/ViewSettings.vue";

const routes = [
  {
    path: "/",
    component: ViewCountDown,
  },
  {
    path: "/settings",
    component: ViewSettings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
