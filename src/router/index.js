import { async } from "@firebase/util";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history : createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/home/Home.vue")},
        { path: "/sign-up", component: () => import("../views/SignUp.vue")},
        { path: "/sign-in", component: () => import("../views/SignIn.vue")},
        { path: "/feed", component: () => import("../views/Feed.vue"),
        
        meta:{
            requiresAuth:true
        }},
        //go to converter or translator
        {path: "/translator", component: () => import("../views/Translator.vue")},
        {path: "/converter", component: () => import("../views/Converter.vue")},
        {path: "/tools" , component: () => import("../views/Toolpage.vue")},

        //gotobillbuddy.vue
        {path: "/billbuddy", component: () => import("../views/BillBuddy.vue")},
        {path: "/itinerary", component: () => import("../views/itinerary.vue")},
        {path: "/profile", component: () => import("../views/Profile.vue")},
        {path: "/add-trip", component: () => import("../views/addtrip.vue")},
        {path: "/tools", component: () => import ("../views/Toolpage.vue")}
    ],
});

const getCurrentUser = () => {
    return new Promise ((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async(to, from, next) =>{
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        }
        else {
            alert ("You don't have access!");
            next('/');
        }
    }
    else{
        next();
    }
})

export default router;