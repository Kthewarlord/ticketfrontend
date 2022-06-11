<template>
    <div>
        <div>
            <div class="grid grid-cols-4">
                <h1 class="col-span-1 text-3xl font-semibold">ตั๋ว</h1>
                <div class="col-span-1"></div>
                <div class="col-span-2 items-center ml-2">
                    <div class="flex flex-wrap text-center items-center">
                        <button type="button" @click="clickrefresh()" class="p-1 lg:p-2 my-1 mx-auto bg-red-600 rounded-xl text-white shadow-lg hover:bg-red-500 flex flex-wrap items-center">
                            <div>รีเฟรช</div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                            </svg>  
                        </button>
                        <div class="px-2 ml-2 flex flex-wrap text-center border rounded-md">
                            <span class="my-1">
                                รีเฟรชล่าสุดเมื่อ:&nbsp; 
                            </span>
                            <span v-if="lastrefreshtime === null" class="my-1">
                                -
                            </span>
                            <span v-else class="my-1">
                                {{lastrefreshtime}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

          <!-- Statistic -->
          <div class="grid grid-cols-4 space-x-4 mt-4 mb-4 md:mb-5">
              <span class="border rounded-md h-24 md:h-32" v-for="(x,i) in shownStatistic" :key="i">
                    <div class="flex justify-start h-9 md:h-12">
                        <h1 class="text-xs sm:text-sm md:text-base">{{x.text}}</h1>
                    </div>
                    <div class="mx-auto mt-5 mb-1 sm:my-auto text-center h-15 md:h-20">
                        <span class="font-bold text-xl sm:text-3xl md:text-5xl">{{x.num}}</span>
                    </div>
              </span>
                  
          </div>
          <!-- Box -->
          <div class="border rounded-md mt-6 py-4">
              <!-- heading + search -->
              <div class="grid grid-cols-2 mt-3 mx-2">
                  <div class="py-1 px-3 flex flex-wrap items-center">
                      <h1 class="my-1 ml-2 mr-2 text-gray-400">ตั๋ววันที่</h1>
                      <div class="">
                            <div 
                                @click = onClickingselectDate()
                                name="date"
                                id="date"
                                type="text"
                                :placeholder="getDateStr()"
                                class="dateclass shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline hover:border-blue-300 focus:ring-2"
                            >
                                {{selectedticketdate}}
                            </div>
                      </div>
                  </div>
                  <div class="flex flex-row justify-start">
                      <div class="flex flex-row border md:rounded-lg rounded-md md:px-4 px-2 md:py-2 py-1 border-gray-300 items-center">
                          <input v-model="searchtext" class="outline-none w-full" type="text" placeholder="ค้นหา">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </div>
                  </div>
              </div>
              <!-- Table -->
              <div class="mt-4">
                  <div v-if="allticket == null">
                      ไม่เปิดให้จองตั๋ว หรือ ไม่สามารถโหลดข้อมูลได้
                  </div>
                  <div v-else-if="!allticket.length">
                        <div class="m-4 md:m-5 lg:m-6">ตั๋วของช่วงเวลานี้ยังไม่เปิดให้จอง</div>
                  </div>
                  <div v-else>
                      <div v-if="searchtext === ''">
                        <div class="h-68 overflow-y-auto overscroll-behavior-y: contain;">
                            <div class="sticky top-0 grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-white">
                                <span class="text-base col-start-1">
                                    ประเภท
                                </span>
                                <span class='text-sm md:text-base col-start-2 col-span-1 md:col-span-3'>
                                    ราคา
                                </span>
                                <span class="mx-auto text-base col-start-3 md:col-start-5 col-span-1 md:col-span-2">
                                    จำนวนตั๋วที่เหลือ
                                </span>
                            </div>
                            <div v-for="(i, index) in allticket" :key="index">
                                <div :class="{'grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-gray-200': index%2==0,'grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-white':index%2!=0}">
                                    <span class="text-md">
                                        {{i.ticketclass}}
                                    </span>
                                    <span class='text-sm md:text-base col-span-1 md:col-span-3'>
                                        {{i.ticketprice}}
                                    </span>
                                    <span class="mx-auto text-md col-span-1 md:col-span-2">
                                      <div v-if="i.ticketavailable > 0" class="flex flex-wrap">
                                          <div>{{i.ticketavailable}}</div>
                                      </div>
                                      <div v-else class="flex flex-wrap">
                                          <div>ตั๋วหมด</div>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="black">
                                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                          </svg>
                                      </div>
                                    </span>
                                    <div v-if="i.ticketavailable > 0" >
                                        <button type="button" @click="addTicket(i.ticketdate, i.ticketclass)" class="p-1 md:p-2 my-1 md:my-2 bg-green-600 rounded-xl text-white shadow-lg hover:bg-green-500 flex flex-wrap">
                                            <div>เพิ่ม</div>
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button type="button" class="p-1 md:p-2 my-1 md:my-2 bg-gray-700 rounded-xl text-white shadow-lg flex flex-wrap">
                                            <div>เพิ่ม</div>
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                      </div>
                      <div v-else>
                        <div class="h-68 overflow-y-auto overscroll-behavior-y: contain;">
                            <div class="sticky top-0 grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-white">
                                <span class="text-base col-start-1">
                                    ประเภท
                                </span>
                                <span class='text-sm md:text-base col-start-2 col-span-1 md:col-span-3'>
                                    ราคา
                                </span>
                                <span class="mx-auto text-base col-start-3 md:col-start-5 col-span-1 md:col-span-2">
                                    จำนวนตั๋วที่เหลือ
                                </span>
                            </div>
                            <div v-for="(i, index) in searchscope" :key="index">
                                <div :class="{'grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-gray-200': index%2==0,'grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-white':index%2!=0}">
                                    <span class="text-md">
                                        {{i.ticketclass}}
                                    </span>
                                    <span class='text-sm md:text-base col-span-1 md:col-span-3'>
                                        {{i.ticketprice}}
                                    </span>
                                    <span class="mx-auto text-md col-span-1 md:col-span-2">
                                      <div v-if="i.ticketavailable > 0" class="flex flex-wrap">
                                          <div>{{i.ticketavailable}}</div>
                                      </div>
                                      <div v-else class="flex flex-wrap">
                                          <div>ตั๋วหมด</div>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="black">
                                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                          </svg>
                                      </div>
                                    </span>
                                    <div v-if="i.ticketavailable > 0" >
                                        <button type="button" @click="addTicket(i.ticketdate, i.ticketclass)" class="p-1 md:p-2 my-1 md:my-2 bg-green-600 rounded-xl text-white shadow-lg hover:bg-green-500 flex flex-wrap">
                                            <div>เพิ่ม</div>
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button type="button" class="p-1 md:p-2 my-1 md:my-2 bg-gray-700 rounded-xl text-white shadow-lg flex flex-wrap">
                                            <div>เพิ่ม</div>
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    mounted()
    {
        this.getCurrentticket(this.selectedticketdate)
        this.getStat(dayjs().format('DD/MM/YYYY'))
    },
    data() {
        return {
            shownStatistic:[
                {
                    text:"ตั๋วทั้งหมด",
                    num:70
                },
                {
                    text:"ตั๋วที่ถูกซื้อ",
                    num:50
                },
                {
                    text:"ตั๋วที่เหลือ",
                    num:70
                },
                {
                    text:"จำนวนผู้ใช้",
                    num:79
                },
            ],
            searchtext:""
        }
    },
    computed:{
        ticketleft:{
            get () {
                return this.$store.state.ticketleft
            },
            set(value){
                this.$store.commit('setTicketleft',value)
            }
        },
        allticket:{
            get () {
                return this.$store.state.allticket
            },
            set(value){
                this.$store.commit('setAllticket',value)
            }
        },
        searchscope() {
          return this.allticket.filter(allticket => allticket.tickclass === this.searchtext || allticket.ticketprice === this.searchtext || allticket.ticketclass.match(this.searchtext) || allticket.ticketprice >= this.searchtext)
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
        },
        selectedticketdate:{
            get () {
                return this.$store.state.selectedticketdate
            },
            set(value){
                this.$store.commit('setSelectedTicketdate',value)
            }
        },
        lastrefreshtime:{
            get () {
                return this.$store.state.lastrefreshtime
            },
            set(value){
                this.$store.commit('setLastrefreshtime',value)
            }
        },
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
        getDateStr(){
            let devent = new Date(Date.now());
            devent.toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' });
            return devent
        },
        onClickingselectDate(){
            console.log("onClickingselectDate Clicked")
            this.$store.commit('changeCalendarDisplay',"block")
        },
        clickrefresh(){
            this.getCurrentticket(this.selectedticketdate)
            this.getStat(dayjs().format('DD/MM/YYYY'))
            const event = new Date(Date.now());
            // British English uses day-month-year order and 24-hour time without AM/PM
            this.$store.commit('setLastrefreshtime',event.toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }))
            //this.lastrefreshtime = event.toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' });
        },
        addTicket(tdate, tclass) {
            if(this.$store.state.isloggingin == true)
            {
                this.$store.commit('setLoginpopup','none')
                this.$nuxt.$options.router.push('/userhome');
            }
            else
            {
                
                this.$store.commit('setLoginpopup','block')
            }
        },
        async getCurrentticket(sdate)
        {
            console.log("sdate"+sdate)
            if(sdate instanceof Date)
            {
                console.log("sdate is a date!")
                sdate = `${dayjs(sdate).format('DD/MM/YYYY')}`
                console.log("New sdate ",sdate)
            }
            var getresult = [];
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
                    {
                        "date": sdate
                    }
                    )
                };
                
                getresult = await fetch(
                    `http://localhost:1942/getticketofdate`, requestOptions
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
            }
            else
            {
                console.log("getresult: ", getresult)
                //this.shownStatistic[0].num = getresult.length;
                this.$store.commit('setAllticket', getresult)
                //this.shownStatistic[2].num = this.getresult.length;
            }
        },
        async getStat(statdate)
        {
            var getresult = [];
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
                    {
                        "date": statdate
                    }
                    )
                };
                getresult = await fetch(
                    `http://localhost:1942/getstat`, requestOptions
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
                console.log("getstat getresult is null")
            }
            else
            {
                console.log("getresult: ", getresult)
                this.shownStatistic[0].num = getresult.todaytotalticket;
                this.shownStatistic[1].num = getresult.todayticketsold;
                this.shownStatistic[2].num = getresult.todayticketleft;
                this.shownStatistic[3].num = getresult.totaluser;
            }
        }
        
    }
}
</script>