<template>
    <div>
        <!-- ประวัติ -->
        <div class="border-2 border-black border-solid m-2">
            <div class="border-b-2 border-dashed border-black mt-1 mb-2 pb-2">
                <span class="mx-1 text-md font-bold">ประวัติการซื้อ</span>
            </div>
            <div>
                <div class="flex my-0.5">
                    <div class="h-80 overflow-y-auto overscroll-behavior-y: contain; w-full">
                        <div class="sticky top-0 flex sm:grid sm:grid-cols-7 gap-1 md:gap-2 justify-items-center items-center shadow appearance-none w-full bg-white">
                            <span class="mx-auto text-xs sm:text-sm md:text-base sm:col-start-1">
                                ประเภท
                            </span>
                            <span class='mx-auto text-xs sm:text-sm md:text-base sm:col-start-2 sm:col-span-2'>
                                วันที่
                            </span>
                            <span class="mx-auto text-xs sm:text-sm md:text-base sm:col-start-4 sm:col-span-2">
                                ราคา
                            </span>
                            <span class="mx-auto text-xs sm:text-sm md:text-base sm:col-start-6 sm:col-span-2">
                                จำนวนที่ซื้อ
                            </span>
                        </div>
                        <div v-if="this.tickethistory === null">
                            <span class="mx-3">ยังไม่มีประวัติการซื้อ</span>
                        </div>
                        <div v-else>
                            <div v-for="(i, index) in this.tickethistory" :key="index">
                                <div class="flex w-full">
                                    <span class="mx-auto text-xs sm:text-sm md:text-base">วันที่ซื้อ:&nbsp;{{i.buydate}}&nbsp;&nbsp;รวมตั๋วทุกประเภท:&nbsp;{{i.totalticket}}&nbsp;&nbsp;รวมราคา:&nbsp;{{i.totalprice}}</span>
                                </div>
                                <div v-for="j in i.transactiondetails" :key="j.ticketclass">
                                    <div class="grid grid-cols-7 items-center py-1 mb-1 shadow appearance-none border rounded w-full">
                                        <span class="text-xs sm:text-sm md:text-base mt-1 md:mt-2 mb-auto mx-auto col-start-1">
                                            {{j.ticketclass}}
                                        </span>
                                        <span class='text-xs sm:text-sm md:text-base mt-1 md:mt-2 mb-auto mx-auto col-start-2 col-span-2'>
                                            {{j.ticketdate}}
                                        </span>
                                        <span class="flex flex-wrap text-xs sm:text-sm md:text-base mt-1 md:mt-2 mb-auto mx-auto col-start-4 col-span-2">
                                            {{j.ticketprice}}
                                        </span>
                                        <span class="flex flex-wrap text-xs sm:text-sm md:text-base mt-1 md:mt-2 mb-auto mx-auto col-start-6 col-span-2">
                                            {{j.ticketbuy}}
                                        </span>
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
        this.getTicketTransaction()
        //this.getStat(dayjs().format('DD/MM/YYYY'))
    },
    data() {
        return {
            tickethistory:[],
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
        async getTicketTransaction()
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
                        "buyerusername": this.$store.state.username
                    }
                    )
                };
                
                getresult = await fetch(
                    `http://localhost:1942/gettransaction`, requestOptions
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
                this.tickethistory = getresult;
                //this.shownStatistic[0].num = getresult.length;
                //this.$store.commit('setAllticket', getresult)
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
                        "id": 1
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