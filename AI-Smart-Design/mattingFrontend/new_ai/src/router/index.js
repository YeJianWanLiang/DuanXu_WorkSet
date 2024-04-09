import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import NavMenu from '../views/NavMenu.vue'
import AI_Upload from '../views/AI_Upload.vue'
import AI_Display from "../views/AI_Display.vue"
import Clarity_Upload from "../views/Clarity_Upload.vue"
import Clarity_Display from '../views/Clarity_Display.vue'


const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/AI_Upload',
            children: [
                {
                    path: '/AI_Upload',
                    name: 'AI_Upload',
                    component: AI_Upload,
                    meta: {
                        title: '智图设计-智能抠图',
                    },
                },
                {
                    path: '/AI_Display',
                    name: 'AI_Display',
                    component: AI_Display,
                    meta: {
                        title: '智图设计-智能抠图',
                    },
                },
                {
                    path: '/Clarity_Display',
                    name: 'Clarity_Display',
                    component: Clarity_Display,
                    meta: {
                        title: '智图设计-清晰处理',
                    },
                },
                {
                    path: '/Clarity_Upload',
                    name: 'Clarity_Upload',
                    component: Clarity_Upload,
                    meta: {
                        title: '智图设计-清晰处理',
                    },
                },
                {
                    path: '/NavMenu',
                    name: 'NavMenu',
                    component: NavMenu,
                },
            ]
        },
    ]
});

router.afterEach((to) => {
    document.title = to.meta.title;
})
export default router