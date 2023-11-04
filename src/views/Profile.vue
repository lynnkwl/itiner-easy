<template>
    <h1>Hello</h1>
    <h2>Hello 2</h2>
    <h3>Hello 3</h3>
    <h4>Hello 4</h4>
    <div class="card">
        <a class="card-title">
            hello this is a card
        </a>
        <a class="card-action">
            this is my card body
        </a>
    </div>
    <button class="btn" @click="logout">Log Out</button>


<!-- profile -->
<div class="p-16">
<div class="p-8 bg-white shadow mt-24">
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
        <p class="font-bold text-gray-700 text-xl">22</p>
        <p class="text-gray-400">Trips</p>
      </div>
      <div>
           <p class="font-bold text-gray-700 text-xl">10</p>
        <p class="text-gray-400">Followers</p>
      </div>
          <div>
           <p class="font-bold text-gray-700 text-xl">89</p>
        <p class="text-gray-400">Following</p>
      </div>
    </div>
    <div class="relative">
      <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
</svg>
      </div>
    </div>

    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
<button class="btn btn-outline text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
  Follow
</button>
    

    </div>
  </div>

  <!-- user name and country -->
  <div class="mt-20 text-center border-b pb-12">
    <h1 class="text-4xl font-medium text-gray-700">Jessica Jones</h1>
    <p class="font-light text-gray-600 mt-3">Singapore</p>
  </div>

  <div class="mt-12 flex flex-col justify-center">
    <p class="text-gray-600 text-center font-light lg:px-16">Love travelling, eating and sleeping!</p>
  </div>

</div>
</div>


</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router'; //import router
const auth = getAuth();


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in', user.uid + " " + user.email)
        const uid = user.uid;
    } else {
        console.log('User is signed out')
    }
});
export default {
    name: "Profile",
    methods: {
        logout() {
            console.log("logging out")
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log("signed out")
                const router = useRouter() // get reference to vue router
                router.push("/sign-in") // redirect to feed
            }).catch((error) => {
                // An error happened.
                console.log("error signing out", error)
            });
        }
    }
}

</script>