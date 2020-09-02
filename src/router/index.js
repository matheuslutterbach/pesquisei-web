import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import ListCidade from '../views/cidade/ListCidade.vue';
import ListBairro from '../views/bairro/ListBairro.vue';

Vue.use(VueRouter);

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/cidade", name: "cidade", component: ListCidade },
    { path: "/bairro", name: "bairro", component: ListBairro },
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
