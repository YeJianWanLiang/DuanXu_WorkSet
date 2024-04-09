import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import NavMenu from '../views/NavMenu.vue'
import ALintro from '../views/ALintro.vue'
import DSintro from "../views/DSintro.vue"
import ALcomp from '../views/ALcomp.vue'
import AEintro from '../views/AEintro.vue'


const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/ALintro',
            children: [
                {
                    path: '/ALintro',
                    name: 'ALintro',
                    component: ALintro,
                    meta: {
                        title: '算法介绍',
                    },
                },
                {
                    path: '/DSintro',
                    name: 'DSintro',
                    component: DSintro,
                    meta: {
                        title: '数据集介绍',
                    },
                },
                {
                    path: '/ALcomp',
                    name: 'ALcomp',
                    component: ALcomp,
                    meta: {
                        title: '算法对比',
                    },
                },
                {
                    path: '/AEintro',
                    name: 'AEintro',
                    component: AEintro,
                    meta: {
                        title: '评价指标',
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