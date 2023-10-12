import { async } from "@firebase/util";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history : createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home.vue")},
        { path: "/register", component: () => import("../views/Register.vue")},
        { path: "/sign-in", component: () => import("../views/SignIn.vue")},
        { path: "/feed", component: () => import("../views/Feed.vue"),
        
        meta:{
            requiresAuth:true
        }},
        //go to toolpage.vue
        {path: "/toolpage", component: () => import("../views/ToolPage.vue")},
        //gotobillbuddy.vue
        {path: "/billbuddy", component: () => import("../views/BillBuddy.vue")},
        {path: "/itinerary", component: () => import("../views/itinerary.vue")},
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