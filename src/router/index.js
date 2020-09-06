import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import ListCidade from '../views/cidade/ListCidade.vue';
import ListBairro from '../views/bairro/ListBairro.vue';
import ListPesquisa from '../views/pesquisa/ListPesquisa.vue';
import DetalhePesquisa from '../views/pesquisa/DetalhePesquisa.vue';
import FormPesquisa from '../views/pesquisa/FormPesquisa.vue';

Vue.use(VueRouter);

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/cidade", name: "cidade", component: ListCidade },
    { path: "/bairro", name: "bairro", component: ListBairro },
    { path: "/pesquisa", name: "pesquisa", component: ListPesquisa },
    { path: "/pesquisa/:id", name: "pesquisa-detalhe", component: DetalhePesquisa },
    { path: "/pesquisa-formulario/", name: "pesquisa-formulario", component: FormPesquisa },
    { path: "/pesquisa-formulario/:id", name: "pesquisa-formulario-editar", component: FormPesquisa },
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
