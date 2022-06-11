<template>
    <div>
        <div class="mb-10 md:mb-7 lg:mb-0 transition-all" :class="ward_11.bg">
            <div class="flex justify-between">
                <div class="flex flex-auto">
                    <div @click="clicktoHome()">
                        <img class="w-28 h-28 md:w-32 md:h-32" src="@/assets/logo_3.png" alt="Logoicon">
                    </div>
                    <div class="px-4 py-2 text-xs md:text-base hidden sm:block" :class="ward_11.text">
                        <h1 class="py-2">{{ward_11.title}}</h1>
                        <h2 class="py-2">{{ward_11.thai_name}}</h2>
                    </div>
                </div>
                <div class="flex my-auto">
                    <div v-if="isLoggingIn==true">
                        <div class="flex flex-col my-1 mx-3">
                            <!--<span v-bind:class="logio.logouttextclass">{{logio.logid}}</span>-->
                            <span v-bind:class="logio.logouttextclass">{{firstname}}</span>
                            <button @click="clickLogout()" type="button" v-bind:class="logio.logoutbuttonclass">{{logio.logoutbuttontext}}</button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="flex flex-col my-1 mx-3">
                            <!-- <span v-bind:class="logio.logintextclass">{{logio.logintext}}</span>
                            <span v-bind:class="logio.logintextclass">{{logio.logintext2}}</span> -->
                            <button @click="clickLogin()" type="button" v-bind:class="logio.loginbuttonclass">{{logio.loginbuttontext}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-red-400 h=1/12 w=full">
            <div class="py-1/10"></div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        isLoggingIn(){
            return this.$store.state.isloggingin
        },
        firstname:{
            get () {
                return this.$store.state.firstname
            },
            set(value){
                this.$store.commit('setFirstname',value)
            }
        },
    },
    data() {
        return {
            trcs:{
                title:"The Thai Red Cross Society",
                thai_name:"สภากาชาดไทย",
                bg:"bg-red-700", 
                text:"text-gray-100",
                img_src:"https://yt3.ggpht.com/ytc/AKedOLS8Nw0hOclZTP0Xa67hOVNj8SCpuHOHc1SrYeLOyQ=s900-c-k-c0x00ffffff-no-rj"
            },
            ward_11:{
                title:"จองตั๋ว",
                thai_name:"จองตั๋วออนไลน์",
                bg:"bg-green-800",
                text:"text-gray-100",
                img_src:"@/assets/ticket_logo.jpg"
            },
            logio:{
                logoutbuttonclass:"px-1.5 py-1 my-1 mx-auto bg-red-700 rounded-xl text-sm text-white shadow-lg hover:bg-red-500",
                logoutbuttontext:"ออกจากระบบ",
                logouttextclass:"my-1 mx-auto text-sm text-gray-100",
                logid:"100004",
                logname:'--',
                loginbuttontext:"เข้าสู่ระบบ",
                loginbuttonclass:"px-1.5 py-1 my-1 mx-auto bg-blue-600 rounded-xl text-sm text-white shadow-lg hover:bg-blue-400",
                logintext:"ผู้ที่ผ่านการคัดกรองแล้ว",
                logintext2:"สามารถเข้าสู่ระบบได้ที่นี่",
                logintextclass:"my-1 mx-auto text-sm text-gray-100"
            }
        }
    },
    methods:{
        clickLogout(){
            //this.$cookies.removeAll()
            this.$store.commit('setIsLoggingIn',false)
            this.$store.commit('setFirstname','-')
            this.$store.commit('setUsername',null)
            this.$store.commit('setPassword',null)
            //this.$store.dispatch('user_id/logoutAll')
            this.$nuxt.$options.router.push('/')
        },
        async clickLogin(){
            this.$store.commit('setLoginpopup','block')
            //Set Login (Will be moved to login page in the future)
            //   this.$store.commit('setIsLoggingIn', true)

            //Link to Login page
            //this.$nuxt.$options.router.push('/login')
        },
        clicktoHome(){
            if(this.$store.state.user_id.isloggingin == true)
            {
                this.$nuxt.$options.router.push('/userhome')
                /*
                const x = this.$cookies.get('user_type')
                //console.log(x)
                if(x == 0)
                {
                    this.$nuxt.$options.router.push('/user')
                }
                if(x == 1)
                {
                    this.$nuxt.$options.router.push('/admin')
                }
                */
            }
            else
            {
                this.$nuxt.$options.router.push('/')
            }
        }
    }
}
</script>