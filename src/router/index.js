import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import ListCidade from '../views/cidade/ListCidade.vue';
import ListBairro from '../views/bairro/ListBairro.vue';
import ListPesquisa from '../views/pesquisa/ListPesquisa.vue';
import DetalhePesquisa from '../views/pesquisa/DetalhePesquisa.vue';
import FormPesquisa from '../views/pesquisa/FormPesquisa.vue';
import Resultado from '../views/resultado/Resultado.vue';
import Login from '../views/login/Login.vue';

Vue.use(VueRouter);

const routes = [
    { path: "", name: "login", component: Login },
    { path: "/login/", name: "login", component: Login },
    { path: "/home", name: "home", component: Home },
    { path: "/cidade", name: "cidade", component: ListCidade },
    { path: "/bairro", name: "bairro", component: ListBairro },
    { path: "/pesquisa", name: "pesquisa", component: ListPesquisa },
    { path: "/pesquisa/:id", name: "pesquisa-detalhe", component: DetalhePesquisa },
    { path: "/pesquisa-formulario/", name: "pesquisa-formulario", component: FormPesquisa },
    { path: "/pesquisa-resultado/:id", name: "pesquisa-resultado", component: Resultado },
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    //   redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router;
