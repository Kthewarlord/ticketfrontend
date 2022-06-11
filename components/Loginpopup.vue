<template>
    <div>
        <div id="loginpopup" :style="{display : loginpopup}">
            <div class="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div class="overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div class="container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div class="flex p-1 w-full bg-purple-700">
                        <div class="flex-1">
                        </div>
                        <div class="flex-1 text-center">
                            <span class="py-2 px-2 lg:text-2xl md:text-lg text-md text-white font-bold">เข้าสู่ระบบ</span>
                        </div>
                        <div class="flex-1">
                            <button @click="closeloginpopup()" class="flex items-center py-2 px-2 ml-auto mr-1 max-w-md rounded-xl shadow-md bg-red-700 md:text-md text-sm text-white hover:bg-red-500">X ปิด</button>
                        </div>
                        
                    </div>
                    <div class="pt-2 pb-4 px-2 rounded-md shadow-md bg-white-100 h-72 overflow-y-auto overscroll-behavior-y: contain;">
                        <form autocomplete="off" @submit.prevent>
                            <div class = "p-2 my-auto">
                            <div class="container">
                                <!--
                                <h1 class="h1 text-2xl font-weight-bold">
                                กรอกข้อมูลของคุณ
                                </h1>
                                -->
                                <div class="row mt-2 mb-3 g-3">
                                <div class="block m-1 p-1">
                                    <label class="font-weight-bold lg:text-lg md:text-md text-sm px-1 pt-2 pb-3 mb-2" for="username"> ชื่อผู้ใช้ </label>
                                    <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-300 focus:ring-2"
                                    placeholder="ชื่อผู้ใช้"
                                    minlength="2"
                                    maxlength="50"
                                    name="username"
                                    id="iusername"
                                    type="text"
                                    v-model="username"
                                    required
                                    />
                                    <div class="text-red-400 hidden">โปรดระบุข้อมูล</div>
                                </div>
                                </div>
                                <div class="row mt-2 mb-3 g-3">
                                <div class="block m-1 p-1">
                                    <label class="font-weight-bold lg:text-lg md:text-md text-sm px-1 pt-2 pb-3 mb-2" for="password"> รหัสผ่าน </label>
                                    <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-300 focus:ring-2"
                                    placeholder="รหัสผ่าน"
                                    minlength="2"
                                    maxlength="50"
                                    name="password"
                                    id="ipassword"
                                    type="password"
                                    v-model="password"
                                    required
                                    />
                                    <div class="text-red-400 hidden">โปรดระบุข้อมูล</div>
                                </div>
                                </div>
                                <div class="row mt-3 mb-2 px-1">
                                <button type="button" @click="loginCheck()" class="px-2 py-3 w-full m-auto bg-blue-700 rounded-xl text-white md:text-base text-sm shadow-lg hover:bg-blue-500 hover:text-white">เข้าสู่ระบบ</button>
                                </div>
                                <div class="row mt-3 mb-2 px-1">
                                    <button type="button" @click="register()" class="px-2 py-3 w-full m-auto bg-purple-700 rounded-xl text-white md:text-base text-sm shadow-lg hover:bg-purple-500 hover:text-white">สมัครสมาชิก</button>
                                </div>    
                            </div>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted()
    {
        //document.getElementById("successfulupload").style.display = "none";
        //this.atkradiocheck()
    },
    data(){
        return {
            atkpopupresult:3,
        }
    },
    computed:{
        loginpopup:{
            get () {
                return this.$store.state.loginpopup
            },
            set(value){
                this.$store.commit('setLoginpopup',value)
            }
        },
        atkresult:{
            get () {
                return this.$store.state.atkresult
            },
            set(value){
                this.$store.commit('setAtkResult',value)
            }
        },
        atkpic:{
            get () {
                return this.$store.state.atkpic
            },
            set(value){
                this.$store.commit('setAtkPic',value)
            }
        },
        username:{
            get () {
                return this.$store.state.username
            },
            set(value){
                this.$store.commit('setUsername',value)
            }
        },
        password:{
            get () {
                return this.$store.state.password
            },
            set(value){
                this.$store.commit('setPassword',value)
            }
        }
    },
    methods: {
        closeloginpopup(){
            this.loginpopup = "none"
            this.$store.commit('setLoginpopup','none')
            if(this.loginpopup == "none")
            {
                console.log("loginpopup set to none")
            }
            else
            {
                alert('ปิดไม่สำเร็จ');
            }

        },
        async loginCheck(){
            if(this.$store.state.isloggingin == true)
            {
                this.closeloginpopup()
                this.$store.commit('setAtkResult',this.atkpopupresult)
            }
            else
            {
                //check if the username password ok
                //Form Validation
                if( document.getElementById("iusername").checkValidity()
                    && document.getElementById("ipassword").checkValidity()
                    == true)
                {
                    var getresult = null;
                    const formResults = {
                        "username" : this.username,
                        "password" : this.password,
                    }
                    console.log(formResults)
                    try 
                    {
                        const requestOptions = {
                            method: "POST",
                            headers: {
                            "Content-Type":"application/json",
                            "Accept": "application/json",
                            "Connection":"keep-alive" 
                            },
                            body: JSON.stringify(
                                formResults
                            )
                        };
                        
                        getresult = await fetch(
                            `http://localhost:1942/login`, requestOptions
                        ).then((response) => {
                                if (response.ok) {
                                    return response.json();
                                }
                                else {
                                    throw new Error('Website API Response Error');
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                    if(getresult == null)
                    {
                        console.log("getresult is null")
                        alert('การเข้าสู่ระบบล้มเหลว')
                    }
                    else
                    {
                        console.log("getresult: ", getresult)
                        if(getresult.text == 'Results not found')
                        {
                            alert('การเข้าสู่ระบบล้มเหลว')
                        }
                        else
                        {
                            alert('การเข้าสู่ระบบสำเร็จ')
                            this.$store.commit('setIsLoggingIn', true)
                            if(this.$store.state.isloggingin == true)
                            {
                                console.log("Logged In")
                            }
                            else
                            {
                                alert('Unable to Login');
                            }
                            this.$store.commit('setFirstname',getresult.firstname)
                            this.$store.commit('setUsername',getresult.username)
                            this.$store.commit('setLoginpopup','none')
                            this.$store.commit('setRegispopup','none')
                            // go to another Page
                            this.$nuxt.$options.router.push('/userhome');
                        }
                    }
                }
                else
                {
                    alert('กรุณาตรวจสอบข้อมูลที่กรอกอีกครั้ง');
                }
            }
            

        },
        register(){
            this.closeloginpopup()
            this.$store.commit('setRegispopup',"block")
        },
        
    }
}
</script>

<style>
.imagePreviewWrapper {
    width: 600px;
    height: 600px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>