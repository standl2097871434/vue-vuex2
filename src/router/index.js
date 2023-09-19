import { createRouter, createWebHistory } from 'vue-router';
import Upload from "@/components/Upload.vue";
import home from "@/view/home.vue";
import Upload2 from "@/components/Upload2.vue";
import Manage from "@/components/Manage.vue";
import play from "@/view/play.vue";
import face from "@/view/face.vue";
// import MainPage from "@/components/MainPage.vue";

const routes = [
    { path: '/', component: face },
    { path: '/home',component: home},
    { path: '/manage',component: Manage},
    { path: '/play',component: play}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
