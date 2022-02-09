import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import RegisterTodo from "../views/RegisterTodo.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "RegisterTodo",
    component: RegisterTodo,
  },
  {
    path: "/edit",
    name: "RegisterTodo",
    component: RegisterTodo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
