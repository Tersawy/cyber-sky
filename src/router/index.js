import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  // 
  {
    path: '/course/:id/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/veritfy',
    name: 'Veritfy',
    component: () => import('../views/veritfy.vue'),
  },
  {
    path: '/success/:sessionId',
    name: 'success-payment',
    component: () => import('../views/SuccessPayment.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/cancel/:sessionId',
    name: 'cancel-payment',
    component: () => import('../views/CancelPayment.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/meeting/:slug/payment',
    name: 'PaymentMeeting',
    component: () => import('../views/Payment.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Messages.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/courses/:id',
    name: 'Course',
    component: () => import('../views/Course.vue')
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue')
  },
  {
    path: '/service',
    name: 'TermsOfService',
    component: () => import('../views/TermsOfService.vue')
  },
  {
    path: '/user/courses',
    name: 'UserCourse',
    component: () => import('../views/user/UserCourse.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/user/messages',
    name: 'Messages',
    component: () => import('../views/user/Messages.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/course/:id/content',
    name: 'EducationContent',
    component: () => import('../views/EducationContent.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import("../views/Blog.vue")
  },
  {
    path: '/post/:id/',
    name: 'post',
    component: () => import("../views/Post.vue")
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import("../views/user/Profile.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: '/paths',
    name: 'paths',
    component: () => import("../views/Paths.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
