import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'

Vue.use(Router)
const router =  new Router({
  mode: "hash",
  routes: [
    // {
    //   path: "/",
    //   redirect: "/login"
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log('to',to);
//   console.log('form',from);
//   if (JSON.stringify(to.query) !== "{}" && from.fullPath == "/") {
//     Object.keys(to.query).forEach(el => {
//       if (el == "rt_url") {
//         sessionStorage.itokens = `http://${Base64.atob(to.query["rt_url"])}`;
//       }
//     });

//     req.systemTabLogin();
//   }

//   if (to.name === "login" ) {
//     next();
//   } else {
//     router.push("/login");
//   }
// });

export default router;

