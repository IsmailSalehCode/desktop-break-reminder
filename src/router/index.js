import { createRouter, createWebHistory } from "vue-router";
import ViewCountDown from "../views/ViewCountDown.vue";

const routes = [
  {
    path: "/",
    component: ViewCountDown,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
