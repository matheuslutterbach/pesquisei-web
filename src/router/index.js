import Vue from "vue";
import VueRouter from "vue-router";
import ListCidade from '../views/cidade/ListCidade.vue';
import ListBairro from '../views/bairro/ListBairro.vue';
import ListPesquisa from '../views/pesquisa/ListPesquisa.vue';
import DetalhePesquisa from '../views/pesquisa/DetalhePesquisa.vue';
import FormPesquisa from '../views/pesquisa/FormPesquisa.vue';
import ResultadoBairro from '../views/resultado/ResultadoBairro.vue';
import Login from '../views/login/Login.vue';

Vue.use(VueRouter);

const routes = [
    { path: "", name: "logo", component: ListPesquisa },
    { path: "/login/", name: "login", component: Login },
    { path: "/cidade", name: "cidade", component: ListCidade },
    { path: "/bairro", name: "bairro", component: ListBairro },
    { path: "/pesquisa", name: "pesquisa", component: ListPesquisa },
    { path: "/pesquisa/:id", name: "pesquisa-detalhe", component: DetalhePesquisa },
    { path: "/pesquisa-formulario/", name: "pesquisa-formulario", component: FormPesquisa },
    { path: "/pesquisa-resultado-bairro/:id", name: "pesquisa-resultado-bairro", component: ResultadoBairro },
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    //   redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', ''];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router;
