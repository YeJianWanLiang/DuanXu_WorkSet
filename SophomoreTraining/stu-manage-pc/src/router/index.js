import VueRouter from 'vue-router'
import store from '../store'
// 数据采集
import BasicData from '../views/DataCollection/BasicData.vue'
import DailyActivity from '../views/DataCollection/DailyActivity.vue'
import GradeData from '../views/DataCollection/GradeData.vue'
import QuestionSurvey from '../views/DataCollection/QuestionSurvey.vue'
import SignIn from '../views/DataCollection/SignIn.vue'
// 学生跟踪管理
import Evaluation from '../views/StudentManage/Evaluation.vue'
import Growth from '../views/StudentManage/Growth.vue'
import ImageAnalysis from '../views/StudentManage/ImageAnalysis.vue'
import MentalWarning from '../views/StudentManage/MentalWarning.vue'
import RecentCare from '../views/StudentManage/RecentCare.vue'
// 学生跟踪管理
import CharacterManage from '../views/UserManage/CharacterManage.vue'
import StudentAndParent from '../views/UserManage/StudentAndParent.vue'
import UserManage from '../views/UserManage/UserManage.vue'
// 基础信息配置
import BasicInformation from '../views/BasicInformation/BasicInformation.vue'
// 登陆界面
import Login from '../views/LoginWelcome/Login.vue'
// 欢迎页面
import Welcome from '../views/LoginWelcome/Welcome.vue'

// 主页面
import Main from '../views/Main.vue'

const router = new VueRouter({
    routes: [
        // {
        //     path: '/',
        //     redirect: 'BasicData',
        // },
        {
            path: '/',
            name: 'Login',
            component: Login,
            meta: {
                title: '华大学生成长跟踪系统-登录页面',
                requireAuth: false,
            },
        },
        {
            path: '/Main',
            name: 'Main',
            component: Main,
            meta: {
                requireAuth: true,
            },
            children: [
                {
                    path: '/Welcome',
                    name: 'Welcome',
                    component: Welcome,
                    meta: {
                        title: '华大学生成长跟踪系统-欢迎页面',
                        requireAuth: true,
                    },
                },
                {
                    path: '/BasicData',
                    name: 'BasicData',
                    component: BasicData,
                    meta: { title: '华大学生成长跟踪系统-入学基础数据', requireAuth: true, },
                },
                {
                    path: '/DailyActivity',
                    name: 'DailyActivity',
                    component: DailyActivity,
                    meta: { title: '华大学生成长跟踪系统-日常活动', requireAuth: true, },
                },
                {
                    path: '/GradeData',
                    name: 'GradeData',
                    component: GradeData,
                    meta: { title: '华大学生成长跟踪系统-成绩统计数据', requireAuth: true, },
                },
                {
                    path: '/QuestionSurvey',
                    name: 'QuestionSurvey',
                    component: QuestionSurvey,
                    meta: { title: '华大学生成长跟踪系统-小问卷调查', requireAuth: true, },
                },
                {
                    path: '/SignIn',
                    name: 'SignIn',
                    component: SignIn,
                    meta: { title: '华大学生成长跟踪系统-上课签到统计', requireAuth: true, },
                },
                {
                    path: '/Evaluation',
                    name: 'Evaluation',
                    component: Evaluation,
                    meta: { title: '华大学生成长跟踪系统-学生评价', requireAuth: true, },
                },
                {
                    path: '/Growth',
                    name: 'Growth',
                    component: Growth,
                    meta: { title: '华大学生成长跟踪系统-学生成长', requireAuth: true, },
                },
                {
                    path: '/ImageAnalysis',
                    name: 'ImageAnalysis',
                    component: ImageAnalysis,
                    meta: { title: '华大学生成长跟踪系统-学生画像分析', requireAuth: true, },
                },
                {
                    path: '/MentalWarning',
                    name: 'MentalWarning',
                    component: MentalWarning,
                    meta: { title: '华大学生成长跟踪系统-学生心理预警', requireAuth: true, },
                },
                {
                    path: '/RecentCare',
                    name: 'RecentCare',
                    component: RecentCare,
                    meta: { title: '华大学生成长跟踪系统-学生近况与关怀', requireAuth: true, },
                },
                {
                    path: '/CharacterManage',
                    name: 'CharacterManage',
                    component: CharacterManage,
                    meta: { title: '华大学生成长跟踪系统-角色管理', requireAuth: true, },
                },
                {
                    path: '/StudentAndParent',
                    name: 'StudentAndParent',
                    component: StudentAndParent,
                    meta: { title: '华大学生成长跟踪系统-学生和家长管理', requireAuth: true, },
                },
                {
                    path: '/UserManage',
                    name: 'UserManage',
                    component: UserManage,
                    meta: { title: '华大学生成长跟踪系统-用户管理', requireAuth: true, },
                },
                {
                    path: '/BasicInformation',
                    name: 'BasicInformation',
                    component: BasicInformation,
                    meta: { title: '华大学生成长跟踪系统-基础信息配置', requireAuth: true, },
                },
            ]
        },

        // 
    ]
})
// 路由守卫钩子函数 判断登录的response
router.beforeEach((to, _from, next) => {
    let isLogin = store.getters.getUserName;
    if (to.meta.requireAuth) { // 校验路由，除了登录之外的页面都要校验
        if (isLogin != '?') { // 是否有登录过
            next();
        } else {
            alert('密码错误或未登录'); // 未登录或密码错误，跳转到login页面
            next({
                path: '/',
                query: {redirect :to.fullPath},
            })
        }
    } else { // 如果是 login 路由
        next();
    }
})
router.afterEach((to) => {
    document.title = to.meta.title;
})


export default router